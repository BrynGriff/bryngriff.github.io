import express, { Express, Request, Response } from 'express';
import cheerio, {Cheerio} from 'cheerio';
import axios, {AxiosResponse} from 'axios';
import { TimeoutError } from 'puppeteer';

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https');
const port = 6000
const commandersJSON = require('./commanders.json');
const puppeteer = require('puppeteer');
const fs = require('fs');
const EdhrecUrl = (commanderName: string) => `https://edhrec.com/commanders/${commanderName}`;

let commanderParams: string = "type:creature+type:legendary+legal:commander+layout:normal";

// Banned tags and colors
let bannedTags:string[] = ["Combo", "Multiplayer", "Competitive", "Casual", "Primer", "Theme/Gimmick", "Midrange", "Budget"];
let colorTags:string[] = ["BRG (Jund)", "RUG (Temur)", "BG (Golgari)", "BR (Rakdos)", "RG (Gruul)", "BUG (Sultai)", "WUB (Esper)", "UR (Izzet)", "RW (Boros)", "RUW (Jeskai, America)", "GWU (Bant)", "GU (Simic)", "BGW (Abzan, Junk)", "UB (Dimir)", "WU (Azorius)", "RBW (Mardu)", "GW (Selesnya)", "WB (Orzhov)", "RGW (Naya)", "UBR (Grixis)", "RGWU",
"Mono-Red", "Mono-Green", "Mono-Blue", "Mono-White", "Mono-Black"];

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors());

(async () => StartScraping())()


//You can use this to check if your server is working
app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to your server")
})


//Route that handles login logic
app.post('/login', (req: Request, res: Response) =>{
    console.log(req.body.username) 
    console.log(req.body.password) 
})

//Route that handles signup logic
app.post('/signup', (req: Request, res: Response) =>{
console.log(req.body.fullname);
console.log(req.body.username);
console.log(req.body.password);
})

//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})

function SimplifyName(fullname: string)
{
    let name = fullname.replace(/[.,\/#!$%\^'&\*;:{}=\-_`~()]/g,"");
    name = name.replace(/\s+/g, '-').toLowerCase();
    return name;

}

type Commander = {
	colors: string[];
	name: string;
	keywords: string[];
	cmc: number;
	oracle_text: string;
	keywordLength: number;
}

type CommanderList = {
	next_page: string;
	has_more: boolean;
	data: Commander;
}

type StoredCommanders = {
    commanders: Commander[];
    timeSaved: number;
}

async function GetCommandersFromScryfall() : Promise<Commander[]>
{
    let commandersInColor: CommanderList;
    commandersInColor = await ScryfallSearch(commanderParams) as CommanderList;
	//console.log(JSON.stringify(commandersInColor));
    let dataList: Commander[] = [];
	return await GatherCards(commandersInColor, dataList);
}

async function ScryfallSearch(params: string) {
    let url = 'https://api.scryfall.com/cards/search?q=' + params;
    console.log("Getting from " + url);

    let obj: CommanderList;
    await axios.get(url).then((response:AxiosResponse) => {
        obj = response.data;
    });
    
    return obj!;
}

async function GatherCards(json: CommanderList, dataList: Commander[])
{
	console.log(dataList.length);
	dataList = dataList.concat(json.data);
	if (json.has_more)
	{
		console.log("There is more");
		let commanders: CommanderList;
		commanders = await get(json.next_page) as CommanderList;
		dataList = await GatherCards(commanders, dataList);
		return dataList;
	}
	else
	{
		return dataList;
	}
}

async function get(url: string){
    console.log("Getting from " + url);
    let obj: CommanderList;
    await axios.get(url).then((response:AxiosResponse) => {
        obj = response.data;
    });
    
    return obj!;
}

let completed = 0;
async function StartScraping()
{
    let lastSave = 0;
    let rawdata = fs.readFileSync('commanders.json');
    let commanderData = JSON.parse(rawdata);
    if (typeof(commanderData.timeSaved) != 'undefined')
    {
        lastSave = commanderData.timeSaved;
    }

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    let commanders: Commander[];
    if (currentTime - lastSave > 100000000)
    {
        console.log("Saving the commanders");
        commanders = await GetCommandersFromScryfall();
        let storedCommanders: StoredCommanders = {} as StoredCommanders;
        storedCommanders.commanders = commanders;
        storedCommanders.timeSaved = currentTime;
        fs.writeFileSync('commanders.json', JSON.stringify(storedCommanders));
    }
    else
    {
        commanders = commanderData.commanders;
    }


    let map = new Map<string, number>();

    //let commanders: Commander[] = [];
    await PopulateCommandersToMap(commanders, map);
    FilterBannedTags(map);

    let sortedMap = new Map([...map].sort((a, b) => 
    a[1] - b[1]
    ));

    let shouldSkip = false;
    sortedMap.forEach((value: number, key: string) => {
        if (!shouldSkip)
        {
            console.log(key + ": " + value);
        }
    });
}

function FilterBannedTags(map: Map<string, number>)
{
    for (let x of map)
    {
        if (bannedTags.includes(x[0]) || colorTags.includes(x[0]))
        {
            map.delete(x[0]);
        }
    }
}

async function PopulateCommandersToMap(commanders: Commander[], map: Map<string, number>)
{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request: any) => {
        if (['image'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

    let startIndex = 0;
    let failedRequests: number[] = [];
    for (let i = startIndex; i < 300; i++)
    {
        try{
            await PopulateCommanderToMap(i, map, commanders, failedRequests, page);
        }
        catch (error)
        {
            failedRequests.push(i);
            console.error(error);
        }
    }
    while (failedRequests.length > 0)
    {
        let secondFailedRequests: number[] = [];
        for (let i = 0; i < failedRequests.length; i++)
        {
            await PopulateCommanderToMap(failedRequests[i], map, commanders, secondFailedRequests, page);
        }
        failedRequests = secondFailedRequests;
    }
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Use puppeteer
async function PopulateCommanderToMap(index: number, map: Map<string, number>, commanders: Commander[], failedRequests: number[], page:any)
{
    let simplifiedName = SimplifyName(commanders[index].name)
    //let simplifiedName = "prosper-tome-bound";
    let url:string = "" + simplifiedName;
    
    console.log("Scraping " + commanders[index].name);

    page.goto(EdhrecUrl(simplifiedName));

    await page.waitForFunction(`document.name != "EDHREC"`);

    await page.waitForTimeout(1000);
    await Promise.race([
        page.waitForSelector('select[class="form-control"]'),
        page.waitForTimeout(2000)
    ]);

    let data = await page.evaluate(() => {
        let themes: string[] = [];

        let selection = document.querySelector('select[class="form-control"]');

        if (!selection)
        {
            return{
                themes
            }
        }
        let children = selection!.childNodes;


        children.forEach(function (value, i) {
            if (i != 0)
            {
                let themeAmount = value.textContent;
                let theme = themeAmount!.substring(0, themeAmount!.indexOf("(") - 1);
                if (theme == '')
                {
                    return{
                        themes
                    }
                }
                themes.push(theme);
            }
        });

        return{
            themes
        }
    });

    if (data.themes.length == 0)
    {
        return;
    }

    data.themes.forEach(function (value: string, i: number) {
        PopulateMapWithTag(value, map);
    });

    console.log(data);
    console.log("\n");

}

function PopulateMapWithTag(tag: string, map: Map<string, number>)
{
    if (bannedTags.includes(tag) || colorTags.includes(tag))
    {
        return;
    }

    let tagCount = map.get(tag);
    if (typeof(tagCount) != 'undefined')
    {
        map.set(tag, tagCount + 1);
    }
    else
    {
        map.set(tag, 1);
    }
}