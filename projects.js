var projectData = `[
  {
    "name": "persist",
    "fullName": "Persist",
    "displayName": "Persist",
    "engine": "Unity Engine",
    "year": 2022,
    "videoLink": "https://www.youtube.com/embed/C45PUbWLfM8",
    "downloadLink": "https://dreamfallstudio.itch.io/persist",
    "content": "<h1>Overview</h1>Persist is a third-person multiplayer roguelike dungeon crawler game made in Unity Engine. I was the lead programmer of this project; my main roles included creation and upkeep of all backend combat and gameloop features (items, stats, buffs, UI) as well as the network programming. Our team was composed of 5 artists and 2 programmers. It was the largest project I have worked on, taking approximately 1 year to develop from the initial prototype to a free release on itch.io. Many underlying systems from the game had already been featured in previous projects (Forgotten Constructs, Mages of the Abyss) so a large amount of this development time was dedicated to refining existing systems as well as creating brand new ones.<div class='between-line'></div><h1>Content</h1>Persist is the most feature-rich project I worked on at Media Design School, featuring 4 boss encounters, 21 enemies, 21 items and 14 spells. Players can choose what rooms to enter next and also what items they are given (out of a choice of 3). They can also earn perk points by leveling up to increase different stats. We designed this with the intention of giving the players the ability to fully customize different builds in each run supplemented by a small amount of randomness to make each run feel unique. The game is endless, and enemies will get progressively stronger until all players have been defeated.<div class='between-line'></div><h1>Character Building</h1>Giving the players freedom to take their character build in the direction they choose was a large part of our development philosophy when making design choices for Persist. Games often avoid allowing the player to become too powerful through stacking certain combinations together or simply stacking the same item. Items and stats in Persist are infinitely stackable, allowing players to learn the quirks and synergies of each item to create powerful (if not broken) combinations with enough game knowledge and a bit of luck. The game was designed with this exponential power increase in mind, as the enemies will still get stronger to be able to match the player.<div class='between-line'></div><h1>Networking</h1>The networked multiplayer was the most integral aspect of developing this game, and every other system had to be adjusted or created to fit the server-client architecture. Multiplayer was handled with Unity Mirror, though some aspects were heavily tweaked such as the lobby system. Combat and player actions were handled using an improved version of the state machine system I created for Forgotten Constructs, tweaked to sync states over the network.<div class='between-line'></div><h1>Inspirations</h1>Persist was inspired by several titles that we referred back to from time to time to gauge the level of polish we could still add in our timeframe. The roguelike dungeon crawler elements were inspired by games such as Risk of Rain, Dead Cells and the Binding of Isaac. The fast-paced hack-and-slash combat was inspired by games like Kingdom Hearts, Devil May Cry and the Souls series."
  },
  {
    "name": "constructs",
    "fullName": "Forgotten Constructs",
    "displayName": "Constructs",
    "engine": "Unity Engine",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1-bT6FMUEHGXGawK070WmJNtjXy-IeBMd/view?usp=sharing",
    "content": "<h1>Overview</h1>Forgotten Constructs is a sidescroller co-op action game made in Unity Engine. I was co-programmer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included the creation of the state-based combat system, movement, grappling, enemy spawning and progression mechanics. This project was moved up from being one of our prototypes to being one of our two 'mini-productions', created over 4 weeks following a 1 week prototype. This was my first 3D combat-focused prototype, so many game systems were created from scratch instead of being re-used from other projects.<div class='between-line'></div><h1>Content</h1>The main focus of Forgotten Constructs is the cooperative multiplayer, where one player takes control of a melee-focused knight and the second player takes control of a range-focused archer. The game features a Metroidvania style progression, where the players progress and collect items and abilities that allow them to access more areas. The players can encounter enemies inside locked rooms and must defeat them before progressing. As they progress players will find new ways to help them reach areas, such as a grappling hook and an air dash ability.<div class='between-line'></div><h1>Combat System</h1>The games' combat system was created using the first iteration of the state machine system I created that would eventually be used in Persist. This allows certain actions to overlap, certain actions to queue, as well as making some actions sequential with specific transition timings, such as combo attack of the melee knight. This was expanded in future projects to add much more functionality such as advanced queuing, network state cloning and further integration with character systems.<div class='between-line'></div><h1>Cooperation</h1>As this project was essentially a fleshed out prototype the cooperative aspect of the game could have been explored further. Aside from one attack performed by the final boss that traps a player, all the content of the game could theoretically be completed with just one player. Some ideas to explore this further include character specific abilities to expand on the Metroidvania aspects of the game and give each player character their own role in the progression, or systems that require both players to act in sync to achieve a goal, such as an enemy or puzzle mechanic."
  },
  {
    "name": "toystalgia",
    "fullName": "Toystalgia",
    "displayName": "Toystalgia",
    "engine": "Unity Engine",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1Q-Wy8U1ZWFsW4lHt_-zj6XDNG9VhjdSc/view?usp=sharing",
    "content": "<h1>Overview</h1>Toystalgia is an isometric puzzle game made in Unity Engine. I was co-programmer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included puzzle key mechanics, movement, gameloop and menu features. This project was moved up from being one of our prototypes to being one of our two 'mini-productions', created over 4 weeks following a 1 week prototype. The initial prototype was created from the prompt: 'All grown-ups were once children… but only few of them remember it.'<div class='between-line'></div><h1>Content</h1>Toystalgia is a key based puzzle game. The player must traverse to the end of each level by picking up toys which act as keys when placed near corresponding objects. The red toy lifts doors, the blue toy activates elevators, the green toy creates platforms and the purple toy opens portals. The game features 4 levels of varying length and complexity.<div class='between-line'></div><h1>Puzzle Mechanics</h1>The number of available toys allowed us to create some complex puzzles for Toystalgia. A limiting factor for this project was that most of the underlying functions of the toys were almost identical. Every toy acts as a key to open a path that cannot be crossed with the key that opened it, causing some of them to feel redundant. Something to explore in the future would be adding unique rules to each toy allowing certain paths to behave differently, or overhauling some of the toys entirely to make each one have a unique effect on the gameplay. <div class='between-line'></div><h1>Puzzle Creation</h1>This game featured the most paper planning out of all the prototypes I worked on. We used isometric paper to sketch out puzzles before building them in-engine to save time as we were under a large amount of time pressure for this project. Most puzzles we sketched made it into the game with some refinements and exploit fixes, and were put together with compatible puzzles to create a whole level."
  },
  {
    "name": "coldfront",
    "fullName": "Cold Front",
    "displayName": "Cold Front",
    "engine": "Unity Engine",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1rwTMUvPkLu8TKjjYj4xTkGbMiY923JWq/view?usp=sharing",
    "content": "<h1>Overview</h1>Cold Front is a third-person survival game made in Unity Engine. I was co-programmer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included overseeing temperature and stat systems, crafting mechanics, inventory systems and resource spawning. This project was one of three prototypes created during the 'Pre-production' phase at Media Design School. Persist was ultimately chosen to be taken into full production, but much was still learned from this prototype.<div class='between-line'></div><h1>Content</h1>Cold Front is a survival game where the player must move north to escape the valley while battling the cold and hunger. The player can pick up resources to create fires to stay warm and berries to eat. The player starts with a sled with a large amount of inventory space that can be dragged along on the journey. The sled slows the players' movement speed but allows them to stockpile resources to make emergency situations more manageable. The sled can be ditched at any time. During the night ice wraiths will move towards the player and start freezing them. They can be dispelled by moving near a campfire or using a fire rune to throw sparks at them.<div class='between-line'></div><h1>Temperature Mechanics</h1>A large amount of the development time was spent creating the temperature system. The temperature reacts to the time of day as well as temperature sources nearby, such as campfires and ice wraiths. Temperature receivers (such as the player) have an amount of insulation that will prevent them from getting cold as quickly. In the players' case insulation is determined by the hunger level. The temperature system receieved a lot of work as this game was a candidate to be moved forward into full production. As Persist was chosen instead, the game is unfortunately left with a very complex temperature system without much gameplay to utilize it.<div class='between-line'></div><h1>Future Plans</h1>If the game were to be put forward into full production, the plan was to create a survival roguelike game featuring a full combat system, where the player must constantly move north to escape an encroaching blizzard while surviving and fighting for resources and equipment. The game would have been region-based, where the player has a set amount of time in each region before it freezes over, and they must use that time to prepare themselves to defeat the boss guarding the entrance to the next region."
  },
  {
    "name": "starbent",
    "fullName": "Starbent",
    "displayName": "Starbent",
    "engine": "Game Maker",
    "year": 2019,
    "downloadLink": "https://drive.google.com/file/d/1OSVwrKkWiEELVDh5PsOJzude6RT1jUF6/view?usp=sharing",
    "content": "<h1>Overview</h1>Starbent is a 2D bullet hell game inspired by Space Invaders created in Game Maker Studio 2. I was the sole developer of this project, as such I created all the code and assets for the game, save for the sounds and 2 sprites. This was the first game project I worked on at Media Design School and was created in 2 months.<div class='between-line'></div><h1>Content</h1>In Starbent you fight waves of flying enemies which move in a space-invaders-like pattern. The player ship is able to move in a 2D space in the lower portion of the screen to dodge the assailment of bullets and bombs from the enemies while firing back. The player ship can activate a shield to block bullets for a short time which charges the ships' ultimate laser, capable of wiping out several columns of invaders. Between each wave of invaders, a boss will appear and fight the player with unique attacks and gimmicks. During the invader waves the player can shoot a UFO flying at the top to gain a temporary powerup. The game is endless, progressively getting harder until the player is destroyed.<div class='between-line'></div><h1>Idea Expansion</h1>For this project I was tasked with creating a Space Invaders game in Game Maker Studio 2. This idea of Space Invaders didn't initially appeal to me at first, so I thought of several ways to make the gameplay more unique and engaging. The first idea was allowing the player to move in a limited 2D space, followed by the shield and ultimate laser, followed by creating the first boss prototype. More ideas came from there to further refine and enhance the gameplay to a point where it doesn't just feel like a space invaders clone, despite looking like one on a surface level glance.<div class='between-line'></div><h1>Future Plans</h1>I considered taking this game into full production as a personal project at one point, though it would not have been possible with the workload I had from Media Design School. At this stage if I were to continue working on this game it would have to be rebuilt from the ground up to shake out some of the hacky inexperienced code choices. The game would have lost most of its Space Invader elements and become a more traditional bullet hell game, keeping the same artstyle. The main ship would have become one of several, with each ship featuring different abilities. More enemies, bosses and environments would have been added, as well as a complete story."
  }
]`