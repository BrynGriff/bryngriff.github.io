import express, { Express, Request, Response } from 'express';
import cheerio, {Cheerio} from 'cheerio';
import axios, {AxiosResponse} from 'axios';

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https');
const port = 5000

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

StartScraping();

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

function StartScraping()
{
    let url:string = "https://tappedout.net/mtg-decks/search/?q=&jodah-archmage-eternal&price_min=&price_max=&o=-rating&submit=Filter+results";
    axios(url).then((response:AxiosResponse) => {
        const html_data = response.data;
        const $ = cheerio.load(html_data);
        const parentElem = '#body > div:nth-child(4) > div > div.col-sm-8.col-lg-9.col-xs-12';
        const shouldBeGood = '#body > div:nth-child(4) > div > div.col-sm-8.col-lg-9.col-xs-12 > div:nth-child(3)';
        let childPath = "> div > div.contents.col-xs-12.col-sm-5 > div > div.col-xs-6.col-sm-12.hidden-xs > h5";

        let opElem = "#body > div:nth-child(4) > div > div.col-sm-8.col-lg-9.col-xs-12 > div:nth-child(3) > div > div.contents.col-xs-12.col-sm-5 > div > div.col-xs-6.col-sm-12.hidden-xs > h5";

        console.log($(parentElem).children().each);
        
        const test = $(parentElem);

        let bannedTags:string[] = ["Combo", "Multiplayer", "Competitive", "Casual", "Primer", "Theme/Gimmick", "Midrange", "Budget"];
        let colorTags:string[] = ["BRG (Jund)", "RUG (Temur)", "BG (Golgari)", "BR (Rakdos)", "RG (Gruul)", "BUG (Sultai)", "WUB (Esper)", "UR (Izzet)", "RW (Boros)", "RUW (Jeskai, America)", "GWU (Bant)",
    "Mono-Red", "Mono-Green", "Mono-Blue", "Mono-White", "Mono-Black"];

        let map = new Map<string, number>();
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

        let sortedMap = new Map([...map].sort((a, b) => 
            b[1] - a[1]
        ));

        sortedMap.forEach((value: number, key: string) => {
            console.log(key + ": " + value);
        });


        //$(selectedElem).each((parentIndex: number, parentElem: string) =>{

        //})
      });
}