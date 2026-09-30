/* ------------------------------------------------------------------
   EVENTS — game jams, festivals, exchanges, talks.
   Rendered as passport stamps, split into International / Türkiye.

   kind      "jam" | "event"
   scope     "international" | "domestic"
   mode      "online" | "onsite"
   projects  ids from data/projects.js (stamp links to them)
   result    optional, e.g. "Top 10" — leave "" to hide
   ------------------------------------------------------------------ */
window.EVENTS = [
  {
    id: "manisa-doge-2025",
    kind: "jam",
    name: "Manisa Doge Game Jam",
    date: "2025-02-26",
    scope: "domestic",
    mode: "onsite",
    place: "Manisa, Türkiye",
    duration: "26 hours",
    team: "Team",                     // TODO: team size, e.g. "Team of 4"
    result: "",
    projects: ["manisa-2077"],
    note: "26 hours on site with the team. The theme was life with ai. We filmed the whole thing as a vlog for a class assignment.",
    link: "https://www.youtube.com/watch?v=GkjsdBTMimg",
    linkLabel: "Watch the vlog"
  },
  {
    id: "erasmus-make-me-shine",
    kind: "event",
    name: "Erasmus+ Youth Exchange — “Make me shine”",
    date: "2023-07-29",
    scope: "international",
    mode: "onsite",
    place: "Łódź, Poland",
    duration: "10 days",
    team: "40 participants · 5 countries",
    result: "Youthpass certified",
    projects: [],
    note:
      "Worked in mixed international groups from Italy, North Macedonia, Poland, Romania and Türkiye on " +
      "reuse and sustainability. My part: daily evaluations, preparing our national evening and running the project's social media.",
    link: "https://www.youthpass.eu/verify",
    linkLabel: "Verify Youthpass"
  },
  {
    id: "low-effort-jam-9",
    kind: "jam",
    name: "Low Effort Jam 9",
    date: "2021-04-12",
    scope: "international",
    mode: "online",
    place: "itch.io",
    duration: "4 days",
    team: "Team",
    result: "",
    projects: ["burney-life"],
    note: "My first game jam. 47 entries worldwide.",
    link: "https://itch.io/jam/low-effort-jam-9",
    linkLabel: "Jam page"
  }

  // Template — copy, fill, remove the comment marks:
  // {
  //   id: "global-game-jam-2027", kind: "jam", name: "Global Game Jam",
  //   date: "2027-01-22", scope: "domestic", mode: "onsite", place: "Muğla, Türkiye",
  //   duration: "48 hours", team: "Team of 4", result: "",
  //   projects: [], note: "", link: "", linkLabel: ""
  // },
];

/* ------------------------------------------------------------------
   CERTIFICATES
   Don't upload the PDFs themselves if they contain personal data
   (the Youthpass shows your date of birth). A verify link is enough.

   id / idLabel   shown as selectable text with a Copy button
   linkLabel      text of the link (default: certificates.verify in content.js)
   seal           letters in the round seal (default: initials of the title)
   ------------------------------------------------------------------ */
window.CERTIFICATES = [
  {
    title: "Unreal Engine Game Programming",
    issuer: "Udemy · Ömer Bektaş",
    date: "May 2024",
    detail: "67.5 hours",
    idLabel: "No.",
    id: "UC-e3f8331e-8bf0-4e41-982b-acf0d1525efe",
    url: "https://ude.my/UC-e3f8331e-8bf0-4e41-982b-acf0d1525efe"
  },
  {
    title: "Youthpass — Erasmus+ Youth Exchange",
    issuer: "European Commission · Foundation Tu brzoza",
    date: "Jul 2023",
    detail: "",
    idLabel: "ID",
    id: "1H9Q-933U-XNX8-G919",
    url: "https://www.youthpass.eu/verify"
  }
];
