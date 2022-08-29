var projectData = `[
  {
    "name": "persist",
    "fullName": "Persist",
    "displayName": "Persist",
    "engine": "Unity Engine",
    "year": 2022,
    "videoLink": "https://www.youtube.com/embed/C45PUbWLfM8",
    "downloadLink": "https://dreamfallstudio.itch.io/persist",
    "content": "<h1>Overview</h1>Persist is a third-person multiplayer roguelike dungeon crawler game made in Unity Engine. I was the lead programmer of this project; my main roles included creation and upkeep of all backend combat and gameloop features (items, stats, buffs, UI) as well as the network programming. Our team was comprised of 7 people - 5 artists and 2 programmers. It was the largest project I have worked on, taking approximately 1 year to develop from the initial prototype to a free release on itch.io. Many underlying systems from the game had already been featured in previous projects (Forgotten Constructs, Mages of the Abyss) so a large amount of this development time was dedicated to refining existing systems as well as creating brand new ones.<div class='between-line'></div><h1>Content</h1>Persist is the most feature-rich project I worked on at Media Design School, featuring 4 boss encounters, 21 enemies, 21 items and 14 spells. Players can choose what rooms to enter next and also what items they are given (out of a choice of 3). They can also earn perk points by leveling up to increase different stats. We designed this with the intention of giving the players the ability to fully customize different builds in each run supplemented by a small amount of randomness to make each run feel unique.<div class='between-line'></div><h1>Networking</h1>The networked multiplayer was the most integral aspect of developing this game, and every other system had to be adjusted or created to fit the server-client architecture. Multiplayer was handled with Unity Mirror, though some aspects were heavily tweaked such as the lobby system. Combat and player actions were handled using an improved version of the state machine system I created for Forgotten Constructs, tweaked to sync states over the network.<div class='between-line'></div><h1>Inspirations</h1>Persist was inspired by several titles that we referred back to from time to time to gauge the level of polish we could still add in our timeframe. The roguelike dungeon crawler elements were inspired by games such as Risk of Rain, Dead Cells and the Binding of Isaac. The fast-paced hack-and-slash combat was inspired by games like Kingdom Hearts, Devil May Cry and the Souls series."
  },
  {
    "name": "constructs",
    "fullName": "Forgotten Constructs",
    "displayName": "Constructs",
    "engine": "Unity Engine",
    "year": 2021,
    "content": "<h1>Overview</h1>Forgotten Constructs is a sidescroller co-op action game made in Unity Engine. I was co-programmer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included the creation of the state-based combat system, movement, grappling, enemy spawning and progression mechanics. This project was moved up from being one of our prototypes to being one of our two 'mini-productions', created over 4 weeks following a 1 week prototype. This was my first 3D combat-focused prototype, so many game systems were created from scratch instead of being re-used from other projects.<div class='between-line'></div><h1>Content</h1>The main focus of Forgotten Constructs is the cooperative multiplayer, where one player takes control of a melee-focused knight and the second player takes control of a range-focused archer. The game features a Metroidvania style progression, where the players progress and collect items and abilities that allow them to access more areas. The players can encounter enemies inside locked rooms and must defeat them before progressing. As they progress players will find new ways to help them reach areas, such as a grappling hook and an air dash ability.<div class='between-line'></div><h1>Combat System</h1>The games' combat system was created using the first iteration of the state machine system I created that would eventually be used in Persist. This allows certain actions to overlap, certain actions to queue, as well as making some actions sequential with specific transition timings, such as combo attack of the melee knight. This was expanded in future projects to add much more functionality such as advanced queuing, network state cloning and further integration with character systems.<div class='between-line'></div><h1>Cooperation</h1>As this project was essentially a fleshed out prototype the cooperative aspect of the game could have been explored further. Aside from one attack performed by the final boss that traps a player, all the content of the game could theoretically be completed with just one player. Some ideas to explore this further include character specific abilities to expand on the Metroidvania aspects of the game and give each player character their own role in the progression, or systems that require both players to act in sync to achieve a goal, such as an enemy or puzzle mechanic."
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