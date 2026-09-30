/* Devlog: list at devlog.html, single post at devlog.html?post=<id> */
(function () {
  var s = window.site, esc = s.esc, has = s.has, t = s.t, tf = s.tf;
  var POSTS = (window.DEVLOG || [])
    .filter(function (p) { return !p.draft; })
    .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

  function card(p) {
    return '<a class="log reveal" href="devlog.html?post=' + encodeURIComponent(p.id) + '"><time class="mono" datetime="' + esc(p.date) + '">' + esc(s.day(p.date)) + "</time>" +
      "<h3>" + esc(p.title) + "</h3>" + (has(p.excerpt) ? "<p>" + esc(p.excerpt) + "</p>" : "") +
      (has(p.tags) ? '<div class="chips">' + p.tags.map(function (t) { return '<span class="chip">#' + esc(t) + "</span>"; }).join("") + "</div>" : "") + "</a>";
  }

  function block(b) {
    if (typeof b === "string") return "<p>" + esc(b) + "</p>";
    if (b.h) return "<h2>" + esc(b.h) + "</h2>";
    if (b.list) return "<ul>" + b.list.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
    if (b.img) return '<figure><img src="' + esc(b.img) + '" alt="' + esc(b.alt || b.caption || "") + '" loading="lazy">' + (has(b.caption) ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
    if (b.youtube) return '<div class="screen"><div class="screen-inner live">' + s.youtube(b.youtube, t("devlog.video")) + "</div></div>";
    if (b.code) return "<pre><code>" + esc(b.code) + "</code></pre>";
    return "";
  }

  function list(root) {
    s.setTitle("meta.devlog");
    root.innerHTML = '<header class="page-head"><span class="mono" style="color:var(--orange-text)">' + esc(t("devlog.pageKicker")) + "</span><h1>" + esc(t("devlog.pageTitle")) + "</h1>" +
      (has(t("devlog.pageText")) ? "<p>" + esc(t("devlog.pageText")) + "</p>" : "") + "</header>" +
      '<div class="logs section" style="padding-top:40px">' + (POSTS.length ? POSTS.map(card).join("") : '<p class="p-todo">' + esc(t("devlog.empty")) + "</p>") + "</div>";
  }

  function post(root, p) {
    s.setTitle("meta.devlogPost", { title: p.title });
    var proj = p.project && s.project(p.project);
    var i = POSTS.indexOf(p);
    var newer = POSTS[i - 1], older = POSTS[i + 1];
    root.innerHTML = '<p class="crumbs"><a href="devlog.html">' + icon("back") + " " + esc(t("devlog.back")) + "</a></p>" +
      '<article class="post" style="margin-top:20px"><div class="meta"><time class="mono" datetime="' + esc(p.date) + '">' + esc(s.day(p.date)) + "</time>" +
      (has(p.tags) ? p.tags.map(function (t) { return '<span class="chip">#' + esc(t) + "</span>"; }).join("") : "") + "</div>" +
      "<h1>" + esc(p.title) + "</h1>" +
      (proj ? '<a class="btn btn-ghost btn-sm" href="' + s.projectUrl(proj.id) + '">' + esc(tf("devlog.about", { title: proj.title })) + " " + icon("arrow") + "</a>" : "") +
      '<div class="post-body">' + (p.body || []).map(block).join("") + "</div></article>" +
      ((newer || older) ? '<nav class="pager section" aria-label="' + esc(t("devlog.pager")) + '">' +
        (older ? '<a href="devlog.html?post=' + encodeURIComponent(older.id) + '"><span class="mono">' + icon("left") + " " + esc(t("devlog.older")) + "</span><b>" + esc(older.title) + "</b></a>" : "<span></span>") +
        (newer ? '<a class="next" href="devlog.html?post=' + encodeURIComponent(newer.id) + '"><span class="mono">' + esc(t("devlog.newer")) + " " + icon("right") + "</span><b>" + esc(newer.title) + "</b></a>" : "") +
        "</nav>" : "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector("[data-devlog]");
    var id = s.param("post");
    var p = null;
    POSTS.forEach(function (x) { if (x.id === id) p = x; });
    if (id && p) post(root, p); else list(root);
    s.reveal(root);
  });
})();
