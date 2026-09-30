/* ------------------------------------------------------------------
   DOWNLOADS — PDFs people can take with them (CV, portfolio…).

   1. Put the PDF in assets/files/  (e.g. assets/files/cv.pdf)
   2. Write its path in `file` below.
   While `file` is "", the card shows as "coming soon" and can't be clicked.

   title     big text on the card
   text      one line about what's inside ("" = hidden)
   file      path to the PDF
   filename  name the file gets when downloaded ("" = keep the original)
   meta      small extra info, e.g. "2 pages · Updated Oct 2026" ("" = hidden)
   seal      letters on the paper icon

   Don't upload documents that show your date of birth, address or ID numbers.
   ------------------------------------------------------------------ */
window.DOWNLOADS = [
  {
    title: "CV",
    text: "Education, experience and skills on one page.",
    file: "",                                 // TODO: "assets/files/cv.pdf"
    filename: "Yavuz-Yunusoglu-CV.pdf",
    meta: "",
    seal: "CV"
  },
  {
    title: "Portfolio",
    text: "Selected games and projects with screenshots.",
    file: "",                                 // TODO: "assets/files/portfolio.pdf"
    filename: "Yavuz-Yunusoglu-Portfolio.pdf",
    meta: "",
    seal: "PF"
  }

  // Add more the same way:
  // { title: "Game design document — Gene Lab", text: "", file: "assets/files/gene-lab-gdd.pdf", filename: "", meta: "", seal: "GD" },
];
