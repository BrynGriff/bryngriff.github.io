//import fetch from 'node-fetch';
let commanderParams = "type:creature+type:legendary+legal:commander+layout:normal";
let stepList = [];
let commanderList = [];
let currentStep = 0;
let stepFunction;

BeginStep(0);

async function GetColors(colors)
{
	let commandersInColor;
	let includeColorless = colors.includes('C');

	if (includeColorless)
	{
		if (colors != 'C')
		{
			colors = colors.replace('C', '');
		}
	}

	let params = commanderParams + '+id:' + colors;
	commandersInColor = await search(params)
	//console.log(JSON.stringify(commandersInColor));
	await ProcessColors(commandersInColor);

	if (!includeColorless)
	{
		for (var i = commanderList.length - 1; i >= 0; i--) {
	    	if (commanderList[i].colors.length == 0) { 
	        	commanderList.splice(i, 1);
	   		}
		}
	}
}


async function ProcessColors(commandersInColor)
{
	commanderList = await GatherCards(commandersInColor, commanderList)

	for (let i = 0; i < commanderList.length; i++)
	{
		//console.log(commanderList[i].name);
	}
}

let maxSteps = 4;

// Begins a step in the quiz
function BeginStep(step)
{
	//console.log(commanderList);
	stepList[currentStep] = [...commanderList];
	switch(step)
	{
		case 0:
			console.log("Get some colours");
			stepFunction = GetColors;
			InputAnswer('W');
			break;
		case 1:
			stepFunction = FilterCost;
			console.log("High cost?");
			InputAnswer('all');
			break;

		case 2:
			stepFunction = FilterByWordy;
			console.log("Wordy commander?");
			InputAnswer('low');
			break;

		case 3:
			stepFunction = FilterByKeywords;
			console.log("Keywords?");
			InputAnswer('high');
			break;
		case maxSteps:
			console.log("Displaying cards");
			DisplayCards();
			break;
	}
}

function DebugEmpty(input)
{

}

function DisplayCards()
{
	console.log("Here are your cards!!!!");
	shuffle(commanderList);
	var body = document.getElementById('content');
	for (const commander of commanderList)
	{
		console.log("Here is " + commander.name);
		body.innerHTML += `<img src="` + commander.image_uris.normal + `" loading="lazy" style="max-width: 250px;">`;
	}
	//console.log(commanderList);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Run the step function based on input and go to next step
async function InputAnswer(input)
{
	await stepFunction(input);
	NextStep();
}

let previousStep;
function NextStep()
{
	previousStep = currentStep;
	currentStep++;

	// If theres less than 20 cards stop the filtering
	if (commanderList.length <= 20)
	{
		currentStep = maxSteps;
	}

	BeginStep(currentStep);
}

function PreviousStep()
{
	currentStep = previousStep;
	commanderList = [...stepList[currentStep]];
	BeginStep(currentStep);
}

// 'high', 'low', 'all'
function FilterByWordy(wordy)
{
	if (wordy != 'high' && wordy != 'low')
	{
		return;
	}

	let lowestLength = Infinity;
	let highestLength = -Infinity;
	let totalLength = 0;

	let allLengths = [];
	// Get lowest and highest list
	for (const commander of commanderList)
	{
		// If no oracle text length is 0
		if (typeof(commander.oracle_text) == 'undefined')
		{
			lowestLength = 0;
			continue;
		}

		// This code block is too long
		let length = commander.oracle_text.length;
		totalLength += length;
		allLengths.push(length);
		if (length < lowestLength)
		{
			lowestLength = length;
		}
		if (length > highestLength)
		{
			highestLength = length;
		}
	}

	allLengths.sort(function(a,b){
    	return a-b;
  	});

	let poolSize = Math.max(Math.floor(allLengths.length / 4), 50);
	// Low length is lower quarter
	let lowLength = allLengths[poolSize];

	// High length is upper third
	let highLength = allLengths[allLengths.length - poolSize];

	let filteredList = [];

	// Convert to bool
	let filterWordy = (wordy == 'low');
	for (const commander of commanderList)
	{
		let length;

		// If no oracle text length is 0;
		if (typeof(commander.oracle_text) == 'undefined')
		{
			length = 0;
		}
		else
		{
			length = commander.oracle_text.length;
		}

		// If we are keeping low
		if (filterWordy)
		{
			if (length <= lowLength)
			{
				filteredList.push(commander);
			}
		}
		else // If we are keeping high
		{
			if (length >= highLength)
			{
				filteredList.push(commander);
			}
		}
	}

	// Swap out the commander list with our filters
	commanderList = filteredList;
}

// 'high', 'low', 'mid', 'all'
function FilterCost(input)
{
	let inputs = input.split('+');

	// Pre caching choices
	let high = inputs.includes('high');
	let mid = inputs.includes('mid');
	let low = inputs.includes('low');

	// If no decisions were made continue
	if (!high && !mid && !low)
	{
		return;
	}

	let lowMax = 4;
	let highMin = 6;

	// Add to new list based on values
	let filteredList = [];
	for (const commander of commanderList)
	{
		if (high && commander.cmc >= highMin)
		{
			filteredList.push(commander);
			continue;
		}

		if (mid && commander.cmc <= highMin && commander.cmc >= lowMax)
		{
			filteredList.push(commander);
			continue;
		}

		if (low && commander.cmc <= lowMax)
		{
			filteredList.push(commander);
			continue;
		}
	}
	console.log(filteredList.length);
	commanderList = [...filteredList];
}

// 'high', 'low', 'all'
function FilterByKeywords(input)
{
	// Randomize the list for low keyword counts to appear randomly
	shuffle(commanderList);

	// Return if no input specified
	if (input != 'high' && input != 'low')
	{
		return;
	}

	// Store keyword length of every commander
	for (const commander of commanderList)
	{
		let length;
		if (typeof(commander.keywords) == 'undefined')
		{
			length = 0;
		}
		else
		{
			length = commander.keywords.length;
		}
		commander.keywordLength = length;
	}

	// Sort commander list by keyword length
	commanderList.sort(function(a, b){
		return a.keywordLength - b.keywordLength;
	});

	// Get top 5% or top 10
	let highPoolSize = Math.max(Math.floor(commanderList.length / 20), 10);

	// Get bottom 25% or bottom 10
	let lowPoolSize = Math.max(Math.floor(commanderList.length / 4), 10);

	// Get keyword breakpoints
	let highPoint = commanderList[commanderList.length - highPoolSize].keywordLength;
	let lowPoint = commanderList[lowPoolSize].keywordLength;

	let filteredList = [];

	// Add commanders to filtered list based on length
	for (let i = 0; i < commanderList.length; i++)
	{
		let length = commanderList[i].keywordLength;

		// Add to list if low keywords and input is low
		if (input == 'low' && length <= lowPoint)
		{
			filteredList.push(commanderList[i]);
		}

		if (input == 'high')
		{
			// Length of less than 2 is not a lot of keywords so only add if there are going to be less than 10
			if (length < 2 && i < (commanderList.length - 10))
			{
				continue;
			}

			// Add to list if high keywords
			if (length >= highPoint)
			{
				filteredList.push(commanderList[i]);
			}
		}
	}

	// Ignore this function if the list is somehow empty (it should never be)
	if (filteredList.length == 0)
	{
		return;
	}

	// Override commander list
	commanderList = filteredList;

}

async function GatherCards(json, dataList)
{
	console.log(dataList.length);
	dataList = dataList.concat(json.data);
	if (json.has_more)
	{
		console.log("There is more");
		let commanders;
		commanders = await get(json.next_page)
		dataList = await GatherCards(commanders, dataList);
		return dataList;
	}
	else
	{
		return dataList;
	}
}



async function search(params) {
    let url = 'https://api.scryfall.com/cards/search?q=' + params;
    console.log("Getting from " + url);
    let obj = await (await fetch(url)).json();
    
    return obj;
}

async function get(url){
    console.log("Getting from " + url);
    let obj = await (await fetch(url)).json();
    
    return obj;
}