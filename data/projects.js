/* ------------------------------------------------------------------
   PROJECTS — the showcase.
   Add a project = add one object to this array. No HTML edits needed.

   id         url slug → project.html?id=<id>
   category   "game" | "plugin" | "tool"
   status     "released" | "jam" | "prototype" | "in-progress"
   event      id from data/events.js (links a jam game to its jam)
   cover      card + page hero image (16:9 looks best)
   gallery    extra screenshots, shown on the detail page
   youtube    video id only, e.g. "q2zIybkrBh4"
   body       sections on the detail page; empty ones are hidden

   Anything left as "" or [] simply doesn't render.
   Search for TODO to find what's still missing.
   ------------------------------------------------------------------ */
window.PROJECTS = [
  {
    id: "polywar",
    title: "PolyWar",
    tagline: "A free 4-player online FPS, live on Steam.",
    category: "game",
    status: "released",
    featured: true,
    year: 2024,
    date: "5 Nov 2024",
    engine: "Unity",
    platforms: ["Windows"],
    tech: ["Unity", "C#", "Photon PUN2"],            // TODO: add the networking stack (Photon PUN2 / Mirror?)
    team: "solo",                         // TODO: solo or team? how many?
    role: "",                         // TODO: e.g. "Design, gameplay programming"
    publisher: "Pickle Games",
    tags: ["FPS", "PvP", "Multiplayer", "Low-poly"],
    cover: "assets/img/polywar/3.jpg",
    gallery: [
      "assets/img/polywar/1.jpg",
      "assets/img/polywar/2.jpg",
      "assets/img/polywar/4.jpg"
    ],
    youtube: "-yvXLmuMJEU",
    links: {
      steam: "https://store.steampowered.com/app/3262490/PolyWar/",
      itch: "https://yavuzyunusoglu.itch.io/polywar"
    },
    body: {
      about:
        "PolyWar is a free-to-play online PvP shooter. One player hosts a room, up to three others join, " +
        "and a five-minute round starts. Whoever has the most kills when the timer runs out wins.",
      role: "I made this game solo with tutorials and ready to use assets.",                       // TODO: what did YOU build?
      process: "",                    // TODO: how networking / matchmaking was solved
      learned: "I made this game to learn networking and multiplayer design, and learn how steam publishing works."                     // TODO: what shipping on Steam taught you
    }
  },

  {
    id: "manisa-2077",
    title: "Manisa 2077",
    tagline: "Made in 26 hours at Manisa Doge Game Jam.",
    category: "game",
    status: "jam",
    year: 2025,
    date: "Feb 2025",
    event: "manisa-doge-2025",
    engine: "Unity",
    platforms: ["Windows"],
    tech: [],
    team: "Team",                     
    role: "Developer",
    tags: ["Game jam", "26 hours"],
    cover: "assets/img/manisa-2077/cover.jpg",
    gallery: [
      "assets/img/manisa-2077/ss_1.png",
      "assets/img/manisa-2077/ss_2.png",
      "assets/img/manisa-2077/ss_3.png",
      "assets/img/manisa-2077/ss_4.png",
      "assets/img/manisa-2077/ss_5.png"
    ],
    youtube: "g_ufDSNyD4k",
    links: { itch: "https://yavuzyunusoglu.itch.io/manisa-2077" },
    extraLinks: [
      { label: "Jam vlog on YouTube", url: "https://www.youtube.com/watch?v=GkjsdBTMimg" }
    ],
    body: {
      about: "",                      // TODO: one paragraph — what is the game?
      role: "",
      process:
        "Our team built this during a 26-hour game development event in Manisa. We were prep students at the " +
        "time, so we also turned the whole weekend into a vlog for a class assignment.",
      learned: ""
    }
  },

  {
    id: "look-up",
    title: "Look Up",
    tagline: "3D parkour. Finish fast, then do it faster.",
    category: "game",
    status: "released",
    year: 2024,
    engine: "Unreal Engine",
    platforms: ["Windows"],
    tech: ["Unreal Engine", "Blueprints"],
    team: "solo",
    role: "",
    tags: ["3D", "Parkour", "Speedrun"],
    cover: "assets/img/look-up/2.jpg",
    gallery: [
      "assets/img/look-up/1.jpg",
      "assets/img/look-up/3.jpg",
      "assets/img/look-up/4.jpg",
      "assets/img/look-up/5.jpg",
      "assets/img/look-up/6.jpg"
    ],
    youtube: "q2zIybkrBh4",
    links: { itch: "https://yavuzyunusoglu.itch.io/lookup" },
    body: {
      about:
        "A 3D parkour and speedrun game set in a city street. There is one course and one goal: " +
        "reach the end as fast as you can, then try to beat your own time.",
      role: "",
      process: "",
      learned: "This was my first project in Unreal Engine."                     // TODO: first Unreal project after the course?
    }
  },

  {
    id: "finger-race",
    title: "Finger Race",
    tagline: "One phone, two players, fastest thumb wins.",
    category: "game",
    status: "released",
    year: 2024,
    engine: "Unity",                      
    platforms: ["Android"],
    tech: [],
    team: "solo",
    role: "",
    tags: ["Local multiplayer", "Arcade", "Low-poly"],
    cover: "assets/img/finger-race/cover.jpg",
    gallery: [
      "assets/img/finger-race/1.jpg",
      "assets/img/finger-race/2.jpg",
      "assets/img/finger-race/3.jpg",
      "assets/img/finger-race/4.jpg",
      "assets/img/finger-race/5.jpg",
      "assets/img/finger-race/6.jpg"
    ],
    youtube: "NMKQKmzK6jk",
    links: { itch: "https://yavuzyunusoglu.itch.io/finger-race" },
    body: {
      about:
        "A two-player race on a single device: whoever taps the screen fastest wins. Low-poly 3D vehicles, built for Android.",
      role: "",
      process: "",
      learned: ""
    }
  },

  {
    id: "speed-touch",
    title: "Speed Touch",
    tagline: "Ten seconds. Hit the target score, earn more time.",
    category: "game",
    status: "released",
    year: 2022,
    engine: "Unity",
    platforms: ["Windows"],
    tech: [],
    team: "solo",
    role: "",
    tags: ["Arcade", "High score"],
    cover: "assets/img/speed-touch/1.jpg",
    gallery: ["assets/img/speed-touch/2.jpg"],
    youtube: "",
    links: { itch: "https://yavuzyunusoglu.itch.io/speed-touch" },
    body: {
      about:
        "A ten-second score attack. Reach the target score before the timer ends and you earn extra time. " +
        "Three difficulty levels ask for 30, 40 and 50 points.",
      role: "",
      process: "",
      learned: "That project was my first mobile publishing game. I learned how to set up the Android build in Unity, and how to publish on Google Play."
    }
  },

  {
    id: "burney-life",
    title: "Burney Life",
    tagline: "My first jam game. WASD, don't die, push the score.",
    category: "game",
    status: "jam",
    year: 2021,
    date: "Apr 2021",
    event: "low-effort-jam-9",
    engine: "",
    platforms: ["Windows"],
    tech: [],
    team: "With Friends",
    role: "Developer",
    tags: ["Game jam", "Arcade"],
    cover: "",
    icon: "assets/img/burney-life/icon.png",
    gallery: [],
    youtube: "",
    links: { itch: "https://yavuzyunusoglu.itch.io/burney-life" },
    body: {
      about:
        "A small survival arcade game made for Low Effort Jam 9. Move with WASD, stay alive and get the highest score you can.",
      role: "",
      process: "",
      learned: ""
    }
  },

  {
    id: "speedrunland",
    title: "Speedrunland",
    tagline: "A short course where the only rival is your last run.",
    category: "game",
    status: "released",
    year: 2021,
    engine: "",
    platforms: ["Windows"],
    tech: [],
    team: "solo",
    role: "",
    tags: ["3D", "Speedrun"],
    cover: "assets/img/speedrunland/2.jpg",
    gallery: ["assets/img/speedrunland/1.jpg", "assets/img/speedrunland/3.jpg"],
    youtube: "",
    links: { itch: "https://yavuzyunusoglu.itch.io/speed-runland" },
    body: {
      about: "Finish the course as quickly as you can and race against yourself. WASD to move, Shift to run.",
      role: "",
      process: "",
      learned: "This was my first project in 3D. I learned how to make a playable level, and how to implement a speedrun timer."
    }
  },

  {
    id: "unturned-plugins",
    title: "Unturned Plugins",
    tagline: "Server plugins since 2021 — some sold, some open source.",
    category: "plugin",
    status: "released",
    year: 2021,
    date: "2021 → now",
    engine: "RocketMod",
    platforms: ["Unturned servers"],
    tech: ["C#", "RocketMod", "Discord API"],
    team: "Solo",
    role: "Design & code",
    tags: ["Commercial", "Open source", "Freelance"],
    cover: "assets/img/unturned-plugins/1.png",
    gallery: [
      "assets/img/unturned-plugins/1.png",
      "assets/img/unturned-plugins/2.png",
      "assets/img/unturned-plugins/3.png",
      "assets/img/unturned-plugins/4.png",
      "assets/img/unturned-plugins/5.png",
      "assets/img/unturned-plugins/6.png",
      "assets/img/unturned-plugins/7.png",
      "assets/img/unturned-plugins/8.png",
      "assets/img/unturned-plugins/9.png"
    ],
    youtube: "",
    links: { github: "https://github.com/YavuzYunusoglu" },
    extraLinks: [
      { label: "Unturned_Police_Help", url: "https://github.com/YavuzYunusoglu/Unturned_Police_Help" },
      { label: "Unturned-Welcome-UI", url: "https://github.com/YavuzYunusoglu/Unturned-Welcome-UI" },
      { label: "PolisAteslemeBildirimi", url: "https://github.com/YavuzYunusoglu/PolisAteslemeBildirimi" },
      { label: "JobsUI", url: "https://github.com/YavuzYunusoglu/JobsUI" },
      { label: "Phone System", url: "https://unturnedstore.com/products/1511" },
      { label: "Bank System", url: "https://unturnedstore.com/products/1663" },
      { label: "Hud & Character System", url: "https://unturnedstore.com/products/1604" },
      { label: "Thief System", url: "https://unturnedstore.com/products/1734" },
      { label: "AdminSpecList", url: "https://github.com/YavuzYunusoglu/AdminSpecList" }
    ],
    body: {
      about:
        "Unturned plugins give me pocket money with commercial and freelance work. I made a FiveM like roleplay phone system, a bank system, a character hud and a thief system.\n\n" +
        "The open-source ones are smaller: calling police for help, a welcome screen, gunshot alerts for police, " +
        "a jobs UI and a spectator list for admins.",
      role: "",
      process: "",
      learned: ""
    }
  },

  {
    id: "ragdoll-demo",
    title: "Unity Ragdoll Demo",
    tagline: "A physics-based character for Unity.",
    category: "tool",
    status: "prototype",
    year: 2026,
    engine: "Unity",
    platforms: ["Unity"],
    tech: ["Unity", "C#"],
    team: "Solo",
    role: "",
    tags: ["Physics", "Character", "Prototype"],
    cover: "assets/img/ragdoll-demo/cover.png",
    gallery: [],
    youtube: "",
    links: { github: "https://github.com/YavuzYunusoglu/UnityRagdollDemo" },
    body: {
      about: "A demo of a physics-based character controller for Unity.",
      role: "",
      process: "",
      learned: ""
    }
  },

  {
    id: "slot-machine",
    title: "Game Design Slot Machine",
    tagline: "Pull the lever, get a game idea. 110 billion of them.",
    category: "tool",
    status: "released",
    year: 2026,
    engine: "",
    platforms: ["Web"],
    tech: ["HTML", "CSS", "JavaScript"],
    team: "Solo",
    role: "",
    tags: ["Design tool", "Bilingual"],
    cover: "assets/img/slot-machine/cover.png",
    gallery: [],
    youtube: "",
    links: { github: "https://github.com/YavuzYunusoglu/game-design-slot-machine" },
    body: {
      about:
        "A bilingual (EN/TR) game idea generator for jams and design exercises. Pull the lever and the reels " +
        "spin up a new idea — more than 110 billion possible combinations. " +
        "(The machine at the top of this site is a small tribute to it.)",
      role: "",
      process: "",
      learned: ""
    }
  },
];
