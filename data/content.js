/* ------------------------------------------------------------------
   CONTENT — every piece of interface text on the site.
   Headings, buttons, labels, nav, footer, page titles, 404 page…
   Your own info lives in profile.js; this file is the wording around it.

   {placeholders} are filled in automatically:
     {name} {location} {since} {year}
     {years} {games} {jams} {abroad}   (hero facts + ticker only)
   An empty string ("") hides that piece of text.
   ------------------------------------------------------------------ */
window.CONTENT = {
  // Browser tab titles + search description
  meta: {
    home: "{name} — Game Developer",
    homeDescription: "Portfolio of {name}, a game design student and developer from Türkiye. Games, jams, Game plugins and tools.",
    project: "{title} — {name}",
    projectMissing: "Not found — {name}",
    devlog: "Devlog — {name}",
    devlogPost: "{title} — Devlog — {name}",
    lost: "Lost — {name}"
  },

  skipLink: "Skip to content",

  // Logo at the top left
  brand: { mark: "Y", word: "yavuz", dot: ".", label: "{name} — home" },

  // Main menu. "#id" = section on the home page.
  navLabel: "Main",
  nav: [
    { label: "Work",    href: "#work" },
    { label: "Jams",    href: "#jams" },
    { label: "Downloads", href: "#downloads" },
    { label: "Contact", href: "#contact" }
  ],

  theme: { toNight: "Switch to night theme", toDay: "Switch to day theme" },

  hero: {
    kicker: "Game design student · Unity · C#",
    primary:   { label: "See my games", href: "#work" },
    secondary: { label: "Get in touch", href: "#contact" },
    facts: [
      { value: "{years} yrs", label: "making games" },
      { value: "{games}",     label: "games released" },
      { value: "{jams}",      label: "game jams",     one: "game jam" },
      { value: "{abroad}",    label: "events abroad", one: "event abroad" }
    ],
    // The 3D sign next to the name. Characters in the middle get the green colour.
    visual: {
      glyph: "</>",
      label: "",                                  // small caption under it, "" = none
      tokens: ["{ }", "C#", "void", ";", "#", "( )"]  // floating bits around it
    },
    ticker: [
      "{games} games released",
      "{jams} game jams",
      "Unity · C#",
      "Game Developer since {since}",
    ]
  },

  work: {
    number: "01 — Work",
    title: "Things I've made",
    text: "The games, plugins and tools that are made by me. Click any card for the details.",
    featured: "Featured",
    onSteam: "On Steam",
    readMore: "Read the breakdown",
    empty: "Nothing here yet.",
    filterLabel: "Filter projects",
    filters: { all: "All", game: "Games", jam: "Jam games", plugin: "Plugins", tool: "Tools & prototypes" }
  },

  jams: {
    number: "02 — Jams & events",
    title: "Stamps in the passport",
    text: "Game jams and events I've taken part in, at home and abroad.",
    international: "International",
    domestic: "Türkiye",
    stamp: "stamp",
    stamps: "stamps",
    empty: "Blank page. Next jam goes here.",
    jam: "Game jam",
    event: "Event",
    details: "Details"
  },

  about: {
    number: "03 — About",
    title: "My Capabilities",
    toolbox: "Toolbox",
    school: "School",
    basedIn: "Based in",
    since: "Since"
  },

  certificates: {
    number: "04 — Certificates",
    title: "Certificates I have",
    verify: "Verify",
    copy: "Copy",
    copied: "Copied",
    copyFail: "Select & copy"
  },

  downloads: {
    number: "05 — Downloads",
    title: "Take it with you",
    text: "My CV and portfolio as PDF files.",
    format: "PDF",
    download: "Download",
    open: "Open",
    soon: "Coming soon"
  },

  // YouTube videos (project pages). When the site is opened as a file, YouTube
  // refuses to embed, so a link is shown instead.
  video: { watchOnYoutube: "Watch on YouTube" },

  // devlog.html (not linked from the menu right now)
  devlog: {
    pageKicker: "Devlog",
    pageTitle: "Notes from the desk",
    pageText: "Short posts about what I'm building, what broke and what I'd do differently.",
    empty: "First post coming soon.",
    back: "All posts",
    about: "About {title}",
    older: "Older",
    newer: "Newer",
    pager: "More posts",
    video: "Video"
  },

  contact: {
    number: "06 — Contact",
    title: "Let’s make something.",
    text: "A team that’s one person short, a project that needs a designer who can code, or just a question about something on this page. Write to me.",
    copy: "Copy",
    copied: "Copied",
    copyFail: "Select & copy"
  },

  footer: {
    copyright: "© {year} {name}",
    home:    [{ label: "Hosted on GitHub Pages" }, { label: "Back to top ↑", href: "#main" }],
    project: [{ label: "All projects", href: "index.html#work" }, { label: "Contact", href: "index.html#contact" }],
    devlog:  [{ label: "Home", href: "index.html" }, { label: "Contact", href: "index.html#contact" }],
    lost:    []
  },

  // Labels used on cards and project pages
  status:   { released: "Released", jam: "Jam game", prototype: "Prototype", "in-progress": "In progress" },
  category: { game: "Game", plugin: "Plugin", tool: "Tool" },

  project: {
    back: "All work",
    links: { steam: "Steam page", itch: "Play on itch.io", github: "Source on GitHub", play: "Play in browser" },
    sections: { about: "What it is", role: "What I did", process: "How it was built", learned: "What I learned" },
    noWriteup: "The write-up for this one is on its way.",
    screenshots: "Screenshots",
    openShot: "Open screenshot {n}",
    watch: "Watch trailer",
    playVideo: "Play the {title} video",
    spec: "Spec sheet",
    specRows: {
      status: "Status", released: "Released", type: "Type", engine: "Engine",
      platforms: "Platforms", team: "Team", role: "Role", publisher: "Publisher", madeAt: "Made at"
    },
    previous: "Previous",
    next: "Next",
    pager: "More projects",
    viewer: { label: "Screenshot viewer", close: "Close", prev: "Previous screenshot", next: "Next screenshot" },
    missing: {
      big: "?",
      title: "No project by that name",
      text: "The link might be old, or the project moved. Everything I've made is on the home page.",
      button: "Back to the work"
    }
  },

  lost: {
    big: "404",
    title: "You fell off the map.",
    text: "This page doesn't exist — maybe it never did. The checkpoint is right here.",
    button: "Respawn at home"
  }
};
