import express, { Express, Request, Response } from 'express';
import cheerio, {Cheerio} from 'cheerio';
import axios, {AxiosResponse} from 'axios';

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https');
const port = 6000
const commandersJSON = require('./commanders.json');

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
    let commanders: Commander[] = await GetCommandersFromScryfall();
    let map = new Map<string, number>();

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
    let startIndex = 0;
    let failedRequests: number[] = [];
    for (let i = startIndex; i < 10; i++)
    {
        await PopulateCommanderToMap(i, map, commanders, failedRequests);
    }
    while (failedRequests.length > 0)
    {
        let secondFailedRequests: number[] = [];
        for (let i = 0; i < failedRequests.length; i++)
        {
            await PopulateCommanderToMap(failedRequests[i], map, commanders, secondFailedRequests);
        }
        failedRequests = secondFailedRequests;
    }
}

async function PopulateCommanderToMap(index: number, map: Map<string, number>, commanders: Commander[], failedRequests: number[])
{
    let simplifiedName = SimplifyName(commanders[index].name)
    let url:string = "https://tappedout.net/mtg-decks/search/?q=&general=" + simplifiedName + "&price_min=&price_max=&o=-rating&submit=Filter+results";
    console.log(index + ": " + simplifiedName);
    await (axios.get(url).then((response:AxiosResponse) => {

        const html_data = response.data;
        const $ = cheerio.load(html_data);
        const parentElem = '#body > div:nth-child(4) > div > div.col-sm-8.col-lg-9.col-xs-12';
        let childPath = "> div > div.contents.col-xs-12.col-sm-5 > div > div.col-xs-6.col-sm-12.hidden-xs > h5";

        $(parentElem).children().each((deckIndex, deckElem) =>{
            let deckElemString = parentElem.slice() + ' > div:nth-child(' + (deckIndex + 1) + ')';
            if (deckIndex >= 2)
            {
                let tagElem = deckElemString + childPath;
                $(tagElem).children().each((childIndex, childElem) =>{
                    let tag = $(childElem).text();
                    PopulateMapWithTag(tag, map);
                })
            }
        })

        completed++;
    }).catch(function (error) {
        failedRequests.push(index);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
    }))
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