/* Project detail page: project.html?id=<id> */
(function () {
  var PROJECTS = window.PROJECTS || [];
  var EVENTS = window.EVENTS || [];
  var s = window.site, esc = s.esc, has = s.has, t = s.t, tf = s.tf;

  var LINK_LABEL = t("project.links") || {};
  var LINK_ICON = { steam: "steam", itch: "itch", github: "github", play: "play" };
  var SEC = t("project.sections") || {};
  var SECTIONS = ["about", "role", "process", "learned"].map(function (k) { return [k, SEC[k] || ""]; });
  var ROW = t("project.specRows") || {};

  function notFound(root) {
    var M = t("project.missing") || {};
    s.setTitle("meta.projectMissing");
    root.innerHTML = '<section class="lost"><div><div class="big">' + esc(M.big) + "</div><h1>" + esc(M.title) + "</h1>" +
      (has(M.text) ? "<p>" + esc(M.text) + "</p>" : "") +
      '<a class="btn btn-primary" href="index.html#work">' + icon("back") + " " + esc(M.button) + "</a></div></section>";
  }

  function media(p) {
    var poster = has(p.cover) ? p.cover : (p.gallery && p.gallery[0]) || "";
    var fake = { title: p.title, category: p.category, cover: poster, icon: p.icon };
    if (has(p.youtube)) {
      var thumb = poster || "https://i.ytimg.com/vi/" + encodeURIComponent(p.youtube) + "/hqdefault.jpg";
      return '<div class="screen"><div class="screen-inner" data-video="' + esc(p.youtube) + '">' +
        '<img src="' + esc(thumb) + '" alt="" loading="eager">' +
        '<button class="play" type="button" aria-label="' + esc(tf("project.playVideo", { title: p.title })) + '"><span>' + icon("play") + " " + esc(t("project.watch")) + "</span></button></div></div>";
    }
    return '<div class="screen"><div class="screen-inner">' + s.cover(fake, { eager: true, alt: p.title }) + "</div></div>";
  }

  function spec(p) {
    var ev = null;
    EVENTS.forEach(function (e) { if (e.id === p.event) ev = e; });
    var rows = [
      [ROW.status, s.STATUS[p.status]],
      [ROW.released, p.date || p.year],
      [ROW.type, s.CATEGORY[p.category]],
      [ROW.engine, p.engine],
      [ROW.platforms, (p.platforms || []).join(", ")],
      [ROW.team, p.team],
      [ROW.role, p.role],
      [ROW.publisher, p.publisher]
    ].filter(function (r) { return has(r[0]) && has(r[1]); });
    var html = "<h2>" + esc(t("project.spec")) + "</h2><dl>" + rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
    if (ev) {
      html += "<div><dt>" + esc(ROW.madeAt) + "</dt><dd>" + (has(ev.link) ? '<a href="' + esc(ev.link) + '" target="_blank" rel="noopener">' + esc(ev.name) + "</a>" : esc(ev.name)) +
        (has(ev.duration) ? " · " + esc(ev.duration) : "") + "</dd></div>";
    }
    html += "</dl>";
    if (has(p.tech)) html += '<div class="chips">' + p.tech.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>";
    if (has(p.extraLinks)) {
      html += '<ul class="extra">' + p.extraLinks.map(function (l) {
        return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + icon("external") + "</a></li>";
      }).join("") + "</ul>";
    }
    return '<aside class="spec">' + html + "</aside>";
  }

  function body(p) {
    var b = p.body || {};
    var out = SECTIONS.filter(function (sec) { return has(sec[1]) && has(b[sec[0]]); }).map(function (sec, i) {
      return '<section class="p-section reveal"><h2><span class="mono">0' + (i + 1) + "</span>" + esc(sec[1]) + "</h2>" + s.paras(b[sec[0]]) + "</section>";
    }).join("");
    if (!out) out = '<p class="p-todo">' + esc(t("project.noWriteup")) + "</p>";
    if (has(p.gallery)) {
      out += '<section class="p-section reveal"><h2><span class="mono">▣</span>' + esc(t("project.screenshots")) + '</h2><div class="gallery">' +
        p.gallery.map(function (src, i) {
          return '<button type="button" data-shot="' + i + '" aria-label="' + esc(tf("project.openShot", { n: i + 1 })) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>';
        }).join("") + "</div></section>";
    }
    return "<div>" + out + "</div>";
  }

  function pager(p) {
    var i = PROJECTS.indexOf(p);
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];
    if (PROJECTS.length < 2) return "";
    return '<nav class="pager section" aria-label="' + esc(t("project.pager")) + '">' +
      '<a href="' + s.projectUrl(prev.id) + '"><span class="mono">' + icon("left") + " " + esc(t("project.previous")) + "</span><b>" + esc(prev.title) + "</b></a>" +
      '<a class="next" href="' + s.projectUrl(next.id) + '"><span class="mono">' + esc(t("project.next")) + " " + icon("right") + "</span><b>" + esc(next.title) + "</b></a></nav>";
  }

  function render(root, p) {
    s.setTitle("meta.project", { title: p.title });
    var desc = document.querySelector('meta[name="description"]');
    if (desc && has(p.tagline)) desc.setAttribute("content", p.title + ": " + p.tagline);

    var links = p.links || {};
    var actions = Object.keys(LINK_ICON).filter(function (k) { return has(links[k]) && has(LINK_LABEL[k]); }).map(function (k, i) {
      return '<a class="btn ' + (i === 0 ? "btn-primary" : "btn-ghost") + '" href="' + esc(links[k]) + '" target="_blank" rel="noopener">' +
        icon(LINK_ICON[k]) + " " + esc(LINK_LABEL[k]) + "</a>";
    }).join("");

    root.innerHTML =
      '<p class="crumbs"><a href="index.html#work">' + icon("back") + " " + esc(t("project.back")) + '</a><span class="mono">/ ' + esc(s.CATEGORY[p.category] || "") + "</span></p>" +
      '<header class="p-hero"><div><div class="kicker">' + s.badge(p.status) +
      (has(p.tags) ? p.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") : "") + "</div>" +
      "<h1>" + esc(p.title) + "</h1>" + (has(p.tagline) ? '<p class="tagline">' + esc(p.tagline) + "</p>" : "") + "</div>" +
      (actions ? '<div class="p-actions">' + actions + "</div>" : "") + "</header>" +
      '<div class="p-media">' + media(p) + "</div>" +
      '<div class="p-body">' + body(p) + spec(p) + "</div>" +
      pager(p);

    var screen = root.querySelector("[data-video]");
    if (screen) screen.querySelector(".play").addEventListener("click", function () {
      var id = screen.getAttribute("data-video");
      screen.classList.add("live");
      screen.innerHTML = s.youtube(id, p.title, true);
    });

    lightbox(root, p.gallery || []);
    s.reveal(root);
  }

  function lightbox(root, shots) {
    var box = document.querySelector(".lightbox");
    if (!box || !shots.length) return;
    var img = box.querySelector("img"), count = box.querySelector(".lb-count");
    var idx = 0, opener = null;
    box.querySelector(".lb-close").innerHTML = icon("close");
    box.querySelector(".lb-prev").innerHTML = icon("left");
    box.querySelector(".lb-next").innerHTML = icon("right");
    if (shots.length < 2) { box.querySelector(".lb-prev").hidden = true; box.querySelector(".lb-next").hidden = true; }

    function show(i) {
      idx = (i + shots.length) % shots.length;
      img.src = shots[idx];
      count.textContent = idx + 1 + " / " + shots.length;
    }
    function open(i, from) { opener = from; show(i); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); }
    function close() { box.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }

    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-shot]");
      if (b) open(parseInt(b.getAttribute("data-shot"), 10), b);
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector("[data-project]");
    var p = s.project(s.param("id"));
    if (p) render(root, p); else notFound(root);
  });
})();
