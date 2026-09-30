/* ------------------------------------------------------------------
   DEVLOG — short notes about what you're building.
   Newest first is not required; posts are sorted by date.

   body blocks:
     "plain string"                     → paragraph
     { h: "Heading" }                   → sub heading
     { list: ["a", "b"] }               → bullet list
     { img: "assets/img/...", caption } → image
     { youtube: "videoId" }             → video
     { code: "text" }                   → code block

   draft: true hides a post from the site.
   ------------------------------------------------------------------ */
window.DEVLOG = [
  {
    id: "portfolio-v1",
    title: "Putting everything in one place",
    date: "2026-09-29",
    tags: ["meta"],
    project: "",
    excerpt: "Six years of games, plugins and jams, finally on one page.",
    body: [
      "My games were on itch.io, one was on Steam, the plugins lived on GitHub and the jam vlog was on YouTube. " +
      "This site pulls all of it together.",
      "From here on I'll use this devlog for short notes on whatever I'm building — starting with Gene Lab."
    ]
  },

  // Template:
  // {
  //   id: "gene-lab-prototype",
  //   title: "Gene Lab: first playable",
  //   date: "2026-10-15",
  //   tags: ["gene-lab", "prototype"],
  //   project: "gen-lab",
  //   excerpt: "One sentence for the card.",
  //   body: ["Paragraph one.", { h: "What broke" }, "Paragraph two."],
  //   draft: true
  // },
];
