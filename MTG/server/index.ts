import express, { Express, Request, Response } from 'express';
import cheerio, {Cheerio} from 'cheerio';
import axios, {AxiosResponse} from 'axios';

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https');
const port = 5000
const commandersJSON = require('./commanders.json');

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

let completed = 0;
async function StartScraping()
{
    let numberToGet = 50;
    let startIndex = 0;
    let map = new Map<string, number>();

    for (let i = startIndex; i < numberToGet; i++)
    {
        await PopulateCommanderToMap(i, map);
    }

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

async function PopulateCommanderToMap(index: number, map: Map<string, number>)
{
    let simplifiedName = SimplifyName(commandersJSON.data[index].name)
    let url:string = "https://tappedout.net/mtg-decks/search/?q=&general=" + simplifiedName + "&price_min=&price_max=&o=-rating&submit=Filter+results";
    console.log(index + ": " + simplifiedName);
    try
    {
        await axios(url).then((response:AxiosResponse) => {
    
            const html_data = response.data;
            const $ = cheerio.load(html_data);
            const parentElem = '#body > div:nth-child(4) > div > div.col-sm-8.col-lg-9.col-xs-12';
            let childPath = "> div > div.contents.col-xs-12.col-sm-5 > div > div.col-xs-6.col-sm-12.hidden-xs > h5";
    
            let bannedTags:string[] = ["Combo", "Multiplayer", "Competitive", "Casual", "Primer", "Theme/Gimmick", "Midrange", "Budget"];
            let colorTags:string[] = ["BRG (Jund)", "RUG (Temur)", "BG (Golgari)", "BR (Rakdos)", "RG (Gruul)", "BUG (Sultai)", "WUB (Esper)", "UR (Izzet)", "RW (Boros)", "RUW (Jeskai, America)", "GWU (Bant)", "GU (Simic)", "BGW (Abzan, Junk)", "UB (Dimir)", "WU (Azorius)", "RBW (Mardu)", "GW (Selesnya)", "WB (Orzhov)", "RGW (Naya)", "UBR (Grixis)",
            "Mono-Red", "Mono-Green", "Mono-Blue", "Mono-White", "Mono-Black"];
    
            $(parentElem).children().each((deckIndex, deckElem) =>{
                let deckElemString = parentElem.slice() + ' > div:nth-child(' + (deckIndex + 1) + ')';
                if (deckIndex >= 2)
                {
                    let tagElem = deckElemString + childPath;
                    $(tagElem).children().each((childIndex, childElem) =>{
                        let tag = $(childElem).text();
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
                    })
                }
            })
    
            completed++;
        });
    }
    catch(error)
    {
        console.error("Error on " + simplifiedName);
    }
    
}