var projectData = `[
  {
    "name": "persist",
    "fullName": "Persist",
    "displayName": "Persist",
    "engine": "Unity Engine",
    "year": 2022,
    "videoLink": "https://www.youtube.com/embed/C45PUbWLfM8",
    "downloadLink": "https://dreamfallstudio.itch.io/persist",
    "content": "Persist is a third-person multiplayer roguelike dungeon crawler game. I was the lead programmer of this project; my main roles included creation and upkeep of all backend combat and gameloop features (items, stats, buffs, UI) as well as the network programming. It was the largest project I have worked on, taking approximately 1 year to develop from the initial prototype to a free release on itch.io. Many underlying systems from the game had already been featured in previous projects (Forgotten Constructs, Mages of the Abyss) so a large amount of this development time was dedicated to refining existing systems as well as creating brand new ones.<br><br>Persist is the most feature-rich project I worked on at Media Design School, featuring 4 boss encounters, 21 enemies, 21 items and 14 spells. Players can choose what rooms to enter next and also what items they are given (out of a choice of 3). They can also earn perk points by leveling up to increase different stats. We designed this with the intention of giving the players the ability to fully customize different builds in each run supplemented by a small amount of randomness to make each run feel unique.<br><br>The networked multiplayer was the most integral aspect of developing this game, and every other system had to be adjusted or created to fit the server-client architecture. Multiplayer was handled with Unity Mirror, though some aspects were heavily tweaked such as the lobby system. Combat and player actions were handled using an improved version of the state machine system I created for Forgotten Constructs, tweaked to sync states over the network.<br><br>Persist was inspired by several titles and as we refined the project we referred back to these inspirations from time to time to gauge the level of polish we still needed to add. The roguelike dungeon crawler elements were inspired by games such as Risk of Rain, Dead Cells and the Binding of Isaac. The fast-paced hack-and-slash combat was inspired by games such as Kingdom Hearts, Devil May Cry and the Souls series."
  },
  {
    "name": "constructs",
    "fullName": "Forgotten Constructs",
    "displayName": "Constructs",
    "engine": "Unity Engine",
    "year": 2021
  },
  {
    "name": "toystalgia",
    "fullName": "Toystalgia",
    "displayName": "Toystalgia",
    "engine": "Unity Engine",
    "year": 2021
  },
  {
    "name": "coldfront",
    "fullName": "Cold Front",
    "displayName": "Cold Front",
    "engine": "Unity Engine",
    "year": 2021
  },
  {
    "name": "starbent",
    "fullName": "Starbent",
    "displayName": "Starbent",
    "engine": "Game Maker",
    "year": 2019
  }
]`