export const projectJSON = `[
  {
    "name": "persist",
    "fullName": "Persist",
    "displayName": "Persist",
    "engine": "Unity Engine (C#)",
    "year": 2022,
    "videoLink": "https://www.youtube.com/embed/C45PUbWLfM8",
    "downloadLink": "https://dreamfallstudio.itch.io/persist",
    "content": [
      {
        "header": "Overview",
        "paragraph": "Persist is a third-person multiplayer roguelike dungeon crawler game made in Unity Engine. I was the lead programmer and co-designer of this project; my main roles included the creation and upkeep of all backend combat and gameloop features (items, stats, buffs, UI) as well as the network programming. Our team was composed of 5 artists and 2 programmers. It was the largest project I have worked on, taking approximately 1 year to develop from the initial prototype to a free release on itch.io. Many of the underlying systems from the game had already been featured in previous projects (Forgotten Constructs, Mages of the Abyss) so a large amount of this development time was dedicated to refining existing systems as well as creating brand new ones."
      },
      {
        "header": "Content",
        "paragraph": "Persist is the most feature-rich project I worked on at Media Design School, featuring 4 boss encounters, 21 enemies, 21 items, and 14 spells. Players can choose what rooms to enter next and also what items they are given (out of a choice of 3). They can also earn perk points by leveling up, used to increase different stats. We designed this with the intention of giving the players the ability to fully customise different builds in each run, augmented by a small amount of randomness to make each run feel unique. The game is endless, and enemies will get progressively stronger until all players have been defeated."
      },
      {
        "header": "Character Building",
        "paragraph": "Giving the players freedom to take their character build in the direction they choose was a large part of our development philosophy when making design choices for Persist. Games often avoid allowing the player to become too powerful through stacking certain combinations together or simply stacking the same item. Items and stats in Persist are infinitely stackable, allowing players to learn the quirks and synergies of each item to create powerful (if not broken) combinations with enough game knowledge and a bit of luck. The game was designed with this exponential power increase in mind, as the enemies will still get stronger to be able to match the player."
      },
      {
        "header": "Networking",
        "paragraph": "The networked multiplayer was the most integral aspect of developing this game, and every other system had to be adjusted or created to fit the server-client architecture. Multiplayer was handled with Unity Mirror, though some aspects were heavily tweaked, such as the lobby system. Combat and player actions were handled using an improved version of the state machine system I created for Forgotten Constructs, tweaked to sync states over the network."
      },
      {
        "header": "Inspirations",
        "paragraph": "Persist was inspired by several titles that we referred back to from time to time to gauge the level of polish we could still add in our timeframe. The roguelike dungeon crawler elements were inspired by games such as Risk of Rain, Dead Cells and the Binding of Isaac. The fast-paced hack-and-slash combat was inspired by games like Kingdom Hearts, Devil May Cry and the Souls series."
      }
    ]
  },
  {
    "name": "portfolio",
    "fullName": "Portfolio Site",
    "displayName": "Portfolio Site",
    "engine": "React, Typescript",
    "year": 2022,
    "downloadLink": "",
    "content": [
      {
        "header": "Overview",
        "paragraph": "The portfolio website I created to showcase my development was made from scratch in React with Typescript and hosted on Github Pages. I opted for this instead of using something such as Jekyll or Wordpress as it would allow me to personalise my portfolio. On top of this, the portfolio itself can act as another showcase of my development work."
      },
      {
        "header": "Content",
        "paragraph": "The design of the portfolio was kept simplistic, with few separate page designs apart from the main project pages. This was to keep the content of the portfolio clean and easy to navigate in a short space of time without needing to actively look for different pages. This is why the 'about me' section of the page and the main project showcase is all built into the homepage. The content of each project is fetched from a JSON file, as opposed to a database, to keep the page static."
      },
      {
        "header": "Responsiveness",
        "paragraph": "I assumed that people looking at my portfolio would do so on a variety of different screens and devices. As such, each page collapses down into a format that can be read and navigated easily on mobile. The images on the right of each project page collapse into a scrollable gallery at the top of the page. On the homepage, the number of columns on the project buttons decreases, and the layout becomes vertical."
      },
      {
        "header": "Transitions",
        "paragraph": "Because the page features a loading screen while content loads, elements had to be managed so they fired when the page loaded. To account for this and streamline transition creation, I created an element attribute that allows customizable transitions with length, direction, distance, and delay that executes in Javascript on page load. This allowed me to script images, headers, and buttons to load in sequence and with varying distance without having to create new CSS for each transition type."
      }
    ]
  },
  {
    "name": "constructs",
    "fullName": "Forgotten Constructs",
    "displayName": "Constructs",
    "engine": "Unity Engine (C#)",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1-bT6FMUEHGXGawK070WmJNtjXy-IeBMd/view?usp=sharing",
    "content": [
      {
        "header": "Overview",
        "paragraph": "Forgotten Constructs is a sidescroller co-op action game made in Unity Engine. I was co-programmer and co-designer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included the creation of the state-based combat system, movement, grappling, enemy spawning and progression mechanics. This project was moved up from being one of our prototypes to being one of our two 'mini-productions', created over 4 weeks following a 1 week prototype. This was my first 3D combat-focused prototype, so many game systems were created from scratch instead of being re-used from other projects."
      },
      {
        "header": "Content",
        "paragraph": "The main focus of Forgotten Constructs is the cooperative multiplayer, where one player takes control of a melee-focused knight and the second player takes control of a range-focused archer. The game features a Metroidvania style progression, where the players progress and collect items and abilities that allow them to access more areas. The players can encounter enemies inside locked rooms and must defeat them before progressing. As they progress players will find new ways to help them reach areas, such as a grappling hook and an air dash ability."
      },
      {
        "header": "Combat System",
        "paragraph": "The game's combat system was made using the first iteration of the state machine system I created that would eventually be used in Persist. This allows certain actions to overlap, certain actions to queue, as well as making some actions sequential with specific transition timings, such as combo attack of the melee knight. This was expanded in future projects to add much more functionality such as advanced queuing, network state cloning and further integration with character systems."
      },
      {
        "header": "Cooperation",
        "paragraph": "As this project was essentially a fleshed out prototype the cooperative aspect of the game could have been explored further. Aside from one attack performed by the final boss that traps a player, all the content of the game could theoretically be completed with just one player. Some ideas to explore this further include character specific abilities to expand on the Metroidvania aspects of the game and give each player character their own role in the progression, or systems that require both players to act in sync to achieve a goal, such as an enemy or puzzle mechanic."
      }
    ]
  },
  {
    "name": "toystalgia",
    "fullName": "Toystalgia",
    "displayName": "Toystalgia",
    "engine": "Unity Engine (C#)",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1Q-Wy8U1ZWFsW4lHt_-zj6XDNG9VhjdSc/view?usp=sharing",
    "content": [
      {
        "header": "Overview",
        "paragraph": "Toystalgia is an isometric puzzle game made in Unity Engine. I was co-programmer and co-designer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included puzzle key mechanics, movement, gameloop and menu features. This project was moved up from being one of our prototypes to being one of our two 'mini-productions', created over 4 weeks following a 1 week prototype. The initial prototype was created from the prompt: 'All grown-ups were once children… but only few of them remember it."
      },
      {
        "header": "Content",
        "paragraph": "Toystalgia is a key based puzzle game. The player must traverse to the end of each level by picking up toys which act as keys when placed near corresponding objects. The red toy lifts doors, the blue toy activates elevators, the green toy creates platforms and the purple toy opens portals. The game features 4 levels of varying length and complexity."
      },
      {
        "header": "Puzzle Mechanics",
        "paragraph": "The number of available toys allowed us to create some complex puzzles for Toystalgia. A limiting factor for this project was that most of the underlying functions of the toys were almost identical. Every toy acts as a key to open a path that cannot be crossed with the key that opened it, causing some of them to feel redundant. Something to explore in the future would be adding unique rules to each toy allowing certain paths to behave differently, or overhauling some of the toys entirely to make each one have a unique effect on the gameplay."
      },
      {
        "header": "Puzzle Creation",
        "paragraph": "This game featured the most paper planning out of all the prototypes I worked on. We used isometric paper to sketch out puzzles before building them in-engine to save time as we were under a large amount of time pressure for this project. Most puzzles we sketched made it into the game with some refinements and exploit fixes, and were put together with compatible puzzles to create a whole level."
      }
    ]
  },
  {
    "name": "coldfront",
    "fullName": "Cold Front",
    "displayName": "Cold Front",
    "engine": "Unity Engine (C#)",
    "year": 2021,
    "downloadLink": "https://drive.google.com/file/d/1rwTMUvPkLu8TKjjYj4xTkGbMiY923JWq/view?usp=sharing",
    "content": [
      {
        "header": "Overview",
        "paragraph": "Cold Front is a third-person survival game made in Unity Engine. I was co-programmer and co-designer of this project - our team consisted of 2 programmers and 5 artists. My main roles for this project included overseeing temperature and stat systems, crafting mechanics, inventory systems and resource spawning. This project was one of three prototypes created during the 'Pre-production' phase at Media Design School. Persist was ultimately chosen to be taken into full production, but much was still learned from this prototype."
      },
      {
        "header": "Content",
        "paragraph": "Cold Front is a survival game where the player must move north to escape the valley while battling the cold and hunger. The player can pick up resources to create fires to stay warm and berries to eat. The player starts with a sled with a large amount of inventory space that can be dragged along on the journey. The sled slows the player's movement speed but allows them to stockpile resources to make emergency situations more manageable. The sled can be ditched at any time. During the night ice wraiths will move towards the player and start freezing them. They can be dispelled by moving near a campfire or using a fire rune to throw sparks at them."
      },
      {
        "header": "Temperature Mechanics",
        "paragraph": "A large amount of the development time was spent creating the temperature system. The temperature reacts to the time of day as well as temperature sources nearby, such as campfires and ice wraiths. Temperature receivers (such as the player) have an amount of insulation that will prevent them from getting cold as quickly. In the player's case insulation is determined by the hunger level. The temperature system received a lot of work as this game was a candidate to be moved forward into full production. As Persist was chosen instead, the game is unfortunately left with a very complex temperature system without much gameplay to utilize it."
      },
      {
        "header": "Future Plans",
        "paragraph": "If the game were to be put forward into full production, the plan was to create a survival roguelike game featuring a full combat system, where the player must constantly move north to escape an encroaching blizzard while surviving and fighting for resources and equipment. The game would have been region-based, where the player has a set amount of time in each region before it freezes over, and they must use that time to prepare themselves to defeat the boss guarding the entrance to the next region."
      }
    ]
  },
  {
    "name": "starbent",
    "fullName": "Starbent",
    "displayName": "Starbent",
    "engine": "Game Maker",
    "year": 2019,
    "downloadLink": "https://drive.google.com/file/d/1OSVwrKkWiEELVDh5PsOJzude6RT1jUF6/view?usp=sharing",
    "content": [
      {
        "header": "Overview",
        "paragraph": "Starbent is a 2D bullet hell game inspired by Space Invaders created in Game Maker Studio 2. I was the sole developer of this project, as such I created all the code, assets and design for the game, save for the sounds and 2 sprites. This was the first game project I worked on at Media Design School and was created in 2 months."
      },
      {
        "header": "Content",
        "paragraph": "In Starbent you fight waves of flying enemies which move in a space-invaders-like pattern. The player ship is able to move in a 2D space in the lower portion of the screen to dodge the assailment of bullets and bombs from the enemies while firing back. The player ship can activate a shield to block bullets for a short time which charges the ship's ultimate laser, capable of wiping out several columns of invaders. Between each wave of invaders, a boss will appear and fight the player with unique attacks and gimmicks. During the invader waves the player can shoot a UFO flying at the top to gain a temporary powerup. The game is endless, progressively getting harder until the player is destroyed."
      },
      {
        "header": "Idea Expansion",
        "paragraph": "For this project I was tasked with creating a Space Invaders game in Game Maker Studio 2. This idea of Space Invaders didn't initially appeal to me at first, so I thought of several ways to make the gameplay more unique and engaging. The first idea was allowing the player to move in a limited 2D space, followed by the shield and ultimate laser, followed by creating the first boss prototype. More ideas came from there to further refine and enhance the gameplay to a point where it doesn't just feel like a space invaders clone, despite looking like one on a surface level glance."
      },
      {
        "header": "Future Plans",
        "paragraph": "I considered taking this game into full production as a personal project at one point, though it would not have been possible with the workload I had from Media Design School. At this stage if I were to continue working on this game it would have to be rebuilt from the ground up to shake out some of the hacky inexperienced code choices. The game would have lost most of its Space Invader elements and become a more traditional bullet hell game, keeping the same artstyle. The main ship would have become one of several, with each ship featuring different abilities. More enemies, bosses and environments would have been added, as well as a complete story."
      }
    ]
  }
]`

export const miniProjectData = `[
  {
    "name": "quantumhalt",
    "fullname": "Quantum Halt",
    "engine": "Unreal Engine 4",
    "imageExtension": "gif",
    "downloadLink": "",
    "description": "Quantum Halt is a time-based puzzle prototype made in Unreal Engine 4. I was the sole developer of this project, and the intent of it was to familiarise myself with Unreal Engine 4 and blueprints. The game consists of several puzzle rooms where the player must move boxes and freeze time to complete puzzles. Once all of the coins have been collected in a room, the player may continue. The files for this project were unfortunately lost, so there is no download available."

  },
  {
    "name": "killerround",
    "fullname": "Killer Round",
    "engine": "Unreal Engine 4",
    "imageExtension": "gif",
    "downloadLink": "https://drive.google.com/file/d/16kzQs83QrHUJA_MvIY6F1qndKw_HIjlx/view?usp=sharing",
    "description": "Killer Round is a high-speed arena shooter. The player travels at high speed around a changing arena surrounding a massive pillar, shooting robots with different weapons to get a high score. I was one of two programmers working on this project. I worked on the movement systems, created the level changing system, menus, UI, gun mechanics, and gun pickups. Unfortunately, the game's core loop never got fleshed out to the extent we wanted it to in the short time we had. There's no incentive to go fast, so it's more beneficial to play it slow and kill all the enemies from a distance. Still, the mechanics I did get to work on were good practise for Unreal."

  },
  {
    "name": "dronerepairkit",
    "fullname": "Drone Repair Kit",
    "engine": "Unity Engine - Modding",
    "imageExtension": "gif",
    "downloadLink": "https://thunderstore.io/package/Griff/Drone_Repair_Kit/",
    "description": "Drone Repair Kit is a mod for Risk of Rain 2. This project was the first mod I have created for a game, made to add to the community and test how I can increase mod support in my own projects. The mod adds an equipment item that replicates the functionality of the Drone Repair Kit item from Risk of Rain 1. When used it repairs all friendly drones and purchases broken drones for free. As of now, the mod has received over 20,000 downloads."

  },
    {
    "name": "mages",
    "fullname": "Mages of the Abyss",
    "engine": "Unity Engine (C#)",
    "imageExtension": "gif",
    "downloadLink": "https://drive.google.com/file/d/1QLpYheXkHTGJJPVc51rQHjA3DUzKBIfS/view?usp=sharing",
    "description": "Mages of the Abyss is an online PVP arena shooter. Players can pick between two classes of mage: arcane and blood mage, and fight in a small arena. I was one of two programmers working on this game, alongside five artists. This was my first project working with the Unity networking plugin Mirror, and the experience gained from creating this prototype paved the way to making Persist a fully networked multiplayer game. The game is lacking in content (classes, maps) but was built to be expandable if we had decided to move it into full production."

  },
  {
  "name": "meatman",
  "fullname": "Meat Man",
  "engine": "C++, SFML",
  "imageExtension": "png",
  "downloadLink": "https://drive.google.com/file/d/1yZJWHSog1cVKCwc35p_5zGzg_6H4F4EW/view?usp=sharing",
  "description": "Meat Man is a 2D platformer created with C++ and rendered with the SFML library. I was the sole developer of this project. This project was made to test my C++ skills, creating bounding box physics, platformer systems, and AI without any underlying engine. This project also allowed me to test a rudimentary level generation system and scene swapping system in C++. Levels are created through text files, with X representing tiles and O representing empty squares. There are also letters for the player spawn, enemies, gravity flippers, and checkpoints. The player's main tool is the ability to shoot enemies, break blocks, and flip gravity switches, causing the player to go upside down. The game features 3 levels and a bonus mode where the player is timed by a deadly wall following behind them."

  },
  {
  "name": "clothsim",
  "fullname": "Cloth Simulation",
  "engine": "C++, OpenGL",
  "imageExtension": "gif",
  "downloadLink": "https://drive.google.com/file/d/1W65ygEgoNukzQk1tckLa-2mPGxg3bfDi/view?usp=sharing",
  "description": "This is a simple cloth simulation created with C++ and rendered with OpenGL. This was made as another learning experience in C++ and a test in creating physics without external libraries. The curtain is made up of a set of nodes and joints and the physics of the cloth is calculated using Verlet integration. The curtain can be dragged around with the left mouse button and ripped if put under enough stress. The curtain can also be removed from the rail entirely. Right clicking allows the cloth to be directly torn. The cloth is affected by wind and torn pieces will blow away."

  },
  {
  "name": "stickyball",
  "fullname": "Sticky Ball",
  "engine": "Unity Engine - Mobile",
  "imageExtension": "png",
  "downloadLink": "https://play.google.com/store/apps/details?id=com.GriffLwlyn.StickyBall",
  "description": "Sticky Ball is a physics-based platformer made in the Unity Engine for Android on the Google Play Store. I was the sole developer of this project. The game was created to experiment with external API's such as the Google Play API as well as mobile controls in Unity. The player drags behind the ball to control the trajectory and power, then releases to let the ball fly. The ball will stick to any surface but will break on red surfaces. The goal is to get to the end of the level with the fewest jumps."

  },
    {
  "name": "pathfinding",
  "fullname": "Pathfinding & Node Searching",
  "engine": "C++, SFML",
  "imageExtension": "gif",
  "downloadLink": "https://drive.google.com/file/d/1FU-mX-9N9tCQqIneqlNe9qYU9jabJwOa/view?usp=sharing",
  "description": "This program demonstrates the A* pathfinding algorithm in C++. There is also another algorithm that searches through node trees. This was made to experiment with several different algorithms in C++ and basic tile-based map creation. The A* algorithm features an editor to create a map with a start and a finish, and the algorithm will attempt to reach the end through the shortest distance."

  },
  {
  "name": "geneticalgo",
  "fullname": "Genetic Algorithm",
  "engine": "C++, SFML",
  "imageExtension": "gif",
  "downloadLink": "https://www.dropbox.com/s/l0ggipsjzuqt5fx/GeneticAlgorithm.zip?dl=0",
  "description": "This is a basic genetic algorithm programmed in C++ and rendered in SFML. This was made as a machine-learning and generational structure test. This algorithm simulates the pink dot's survival in this forest, determined by its ability to value different resources and the distance it takes to reach them. There are 3 resources on the map: food, wood, and water. Food and wood both function identically in that they replenish when there are few on the map, but the survivor needs more food than wood each day to survive. Water is needed the most, but there are only 3 nodes on the map at any given time, and they change locations each day. The survivor requires enough food, water, and wood to survive each day and can only spend a certain amount of energy moving between nodes before having to go home. The survivor can mutate its priority for each resource node separately and how much it values closer nodes. The best 2 survivors in each generation will create the next generation with various mutations. Leaving the simulation running, the best mutated survivors in the later generations can survive for thousands of days."

  }
]`