/* Home page: renders every section from the data/ files. */
(function () {
  var P = window.PROFILE || {};
  var PROJECTS = window.PROJECTS || [];
  var EVENTS = window.EVENTS || [];
  var CERTS = window.CERTIFICATES || [];
  var DOWNLOADS = window.DOWNLOADS || [];
  var s = window.site, esc = s.esc, has = s.has, t = s.t;

  function $(sel) { return document.querySelector(sel); }
  function set(sel, html) { var el = $(sel); if (el) el.innerHTML = html; return el; }

  /* ---------- Hero ---------- */
  function hero() {
    s.setTitle("meta.home");
    s.setDescription("meta.homeDescription");
    var name = String(P.name || "").split(" ");
    if (name.length > 1) {
      set("[data-first]", esc(name.slice(0, -1).join(" ")));
      set("[data-last]", esc(name[name.length - 1]));
    } else set("[data-first]", esc(P.name || ""));
    if (has(P.intro)) set("[data-intro]", esc(P.intro));

    var H = t("hero") || {};
    set("[data-cta]", [H.primary, H.secondary].map(function (b, i) {
      if (!b || !has(b.label)) return "";
      return '<a class="btn ' + (i ? "btn-ghost" : "btn-primary") + '" href="' + esc(b.href || "#") + '">' + esc(s.fmt(b.label)) + (i ? "" : " " + icon("down")) + "</a>";
    }).join(""));

    var stats = {
      years: new Date().getFullYear() - (P.since || 2020),
      games: PROJECTS.filter(function (p) { return p.category === "game" && p.status !== "in-progress"; }).length,
      jams: EVENTS.filter(function (e) { return e.kind === "jam"; }).length,
      abroad: EVENTS.filter(function (e) { return e.scope === "international"; }).length
    };
    set("[data-facts]", (H.facts || []).map(function (f) {
      var value = s.fmt(f.value, stats);
      var label = String(value).trim() === "1" && has(f.one) ? f.one : f.label;
      return "<div><b>" + esc(value) + "</b><span>" + esc(s.fmt(label, stats)) + "</span></div>";
    }).join(""));

    var run = (H.ticker || []).map(function (x) { return "<span>" + esc(s.fmt(x, stats)) + "</span>"; }).join("");
    set("[data-ticker]", run + run);
  }

  /* ---------- 3D </> sign ----------
     The glyph is drawn many times, each copy pushed back a little in Z:
     stacked together they read as one solid, extruded object. */
  function code3d() {
    var root = $("[data-code3d]");
    if (!root) return;
    var V = t("hero.visual") || {};
    var chars = Array.from(String(V.glyph || ""));
    if (!chars.length) { root.hidden = true; return; }
    var word = chars.map(function (c, i) {
      return '<span class="' + (i > 0 && i < chars.length - 1 ? "g-mid" : "g-end") + '">' + esc(c) + "</span>";
    }).join("");
    var LAYERS = 18, html = "";
    for (var i = LAYERS; i >= 0; i--) {
      html += '<div class="code3d-layer' + (i === 0 ? " face" : "") + '" style="--z:' + i + ";--k:" + (i / LAYERS).toFixed(3) + '">' + word + "</div>";
    }
    (V.tokens || []).forEach(function (tok, i) {
      html += '<span class="code3d-token" style="--i:' + i + '">' + esc(tok) + "</span>";
    });
    root.querySelector(".code3d-obj").innerHTML = html;
    if (has(V.label)) root.insertAdjacentHTML("beforeend", '<p class="code3d-label mono">' + esc(V.label) + "</p>");

    // tilt toward the pointer
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !(window.matchMedia && matchMedia("(pointer: fine)").matches)) return;
    var stage = root.querySelector(".code3d-stage");
    var raf = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) {
      var r = root.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.2)));
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        stage.style.setProperty("--rx", (-ty * 14).toFixed(2) + "deg");
        stage.style.setProperty("--ry", (tx * 20).toFixed(2) + "deg");
      });
    });
  }

  /* ---------- Work ---------- */
  function card(p) {
    var meta = [s.CATEGORY[p.category], p.engine, p.year].filter(has).join(" · ");
    return '<a class="card reveal" href="' + s.projectUrl(p.id) + '">' +
      '<div class="card-cover">' + s.cover(p) + s.badge(p.status) + "</div>" +
      '<div class="card-body"><h3>' + esc(p.title) + "</h3>" +
      (has(p.tagline) ? "<p>" + esc(p.tagline) + "</p>" : "") +
      '<div class="card-meta"><span>' + esc(meta) + "</span>" + icon("arrow") + "</div></div></a>";
  }

  function work() {
    var featured = PROJECTS.filter(function (p) { return p.featured; })[0];
    if (featured) {
      var links = featured.links || {};
      set("[data-featured]",
        '<a class="featured reveal" href="' + s.projectUrl(featured.id) + '">' +
        '<div class="featured-media">' + s.cover(featured, { eager: true, alt: featured.title }) + s.badge(featured.status) + "</div>" +
        '<div class="featured-body"><span class="mono">' + esc([t("work.featured"), links.steam ? t("work.onSteam") : "", featured.date].filter(has).join(" · ")) + "</span>" +
        "<h3>" + esc(featured.title) + "</h3><p>" + esc(featured.tagline) + "</p>" +
        (has(featured.tags) ? '<div class="chips">' + featured.tags.map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div>" : "") +
        '<span class="more">' + esc(t("work.readMore")) + " " + icon("arrow") + "</span></div></a>");
    }

    var rest = PROJECTS.filter(function (p) { return p !== featured; });
    var F = t("work.filters") || {};
    var filters = [
      { key: "all", test: function () { return true; } },
      { key: "game", test: function (p) { return p.category === "game"; } },
      { key: "jam", test: function (p) { return has(p.event); } },
      { key: "plugin", test: function (p) { return p.category === "plugin"; } },
      { key: "tool", test: function (p) { return p.category === "tool"; } }
    ].filter(function (f) { return has(F[f.key]) && (f.key === "all" || rest.some(f.test)); });

    var bar = set("[data-filters]", filters.map(function (f, i) {
      return '<button class="filter" type="button" data-f="' + f.key + '" aria-pressed="' + (i === 0) + '">' +
        esc(F[f.key]) + "<span>" + rest.filter(f.test).length + "</span></button>";
    }).join(""));
    var grid = $("[data-grid]");

    function render(key) {
      var f = filters.filter(function (x) { return x.key === key; })[0] || filters[0] || { test: function () { return true; } };
      var list = rest.filter(f.test);
      grid.innerHTML = list.length ? list.map(card).join("") : '<p class="grid-empty">' + esc(t("work.empty")) + "</p>";
      s.reveal(grid);
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      bar.querySelectorAll(".filter").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      render(b.getAttribute("data-f"));
    });
    render("all");
  }

  /* ---------- Passport ---------- */
  function stamp(e) {
    var meta = [];
    if (has(e.place)) meta.push("<span>" + icon("pin") + esc(e.place) + "</span>");
    if (has(e.duration)) meta.push("<span>" + icon("clock") + esc(e.duration) + "</span>");
    if (has(e.team)) meta.push("<span>" + icon("users") + esc(e.team) + "</span>");
    var links = (e.projects || []).map(function (id) {
      var p = s.project(id);
      return p ? '<a href="' + s.projectUrl(p.id) + '">' + esc(p.title) + " " + icon("arrow") + "</a>" : "";
    });
    if (has(e.link)) links.push('<a href="' + esc(e.link) + '" target="_blank" rel="noopener">' + esc(e.linkLabel || t("jams.details")) + " " + icon("external") + "</a>");
    return '<article class="stamp ' + esc(e.scope) + '">' +
      '<div class="stamp-top mono"><span class="kind">' + esc(t(e.kind === "jam" ? "jams.jam" : "jams.event")) + (e.mode ? " · " + esc(e.mode) : "") + "</span><span>" + esc(s.month(e.date)) + "</span></div>" +
      "<h4>" + esc(e.name) + "</h4>" +
      (has(e.note) ? "<p>" + esc(e.note) + "</p>" : "") +
      (meta.length ? '<div class="stamp-meta">' + meta.join("") + "</div>" : "") +
      (links.length ? '<div class="stamp-links">' + links.join("") + "</div>" : "") +
      (has(e.result) ? '<span class="result">' + esc(e.result) + "</span>" : "") +
      "</article>";
  }

  function passport() {
    var sorted = EVENTS.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    function page(scope) {
      var list = sorted.filter(function (e) { return e.scope === scope; });
      return '<div class="passport-page"><header><h3>' + esc(t("jams." + scope)) + '</h3><span class="mono">' + list.length + " " + esc(t(list.length === 1 ? "jams.stamp" : "jams.stamps")) + "</span></header>" +
        (list.length ? '<div class="stamps">' + list.map(stamp).join("") + "</div>" : '<p class="passport-empty">' + esc(t("jams.empty")) + "</p>") + "</div>";
    }
    set("[data-passport]", page("international") + page("domestic"));
  }

  /* ---------- About ---------- */
  function about() {
    set("[data-about]", (P.about || []).map(function (x) { return "<p>" + esc(x) + "</p>"; }).join(""));
    var tools = (P.tools || []).map(function (x) {
      return '<span class="chip">' + esc(x) + "</span>";
    }).join("");
    var rows = [[t("about.school"), P.school], [t("about.basedIn"), P.location], [t("about.since"), P.since]]
      .filter(function (r) { return has(r[0]) && has(r[1]); });
    set("[data-toolbox]", "<h3>" + icon("code") + " " + esc(t("about.toolbox")) + "</h3>" + '<div class="chips">' + tools + "</div>" +
      "<dl>" + rows.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>");
  }

  /* ---------- Certificates ----------
     Plain cards (not one big link) so every line can be selected and copied. */
  function certs() {
    if (!CERTS.length) { $("#certificates").hidden = true; return; }
    set("[data-certs]", CERTS.map(function (c) {
      var id = has(c.id)
        ? '<p class="cert-id"><span>' + esc(c.idLabel || "ID") + "</span><code>" + esc(c.id) + "</code>" +
          '<button class="copy-mini" type="button" data-copy="' + esc(c.id) + '">' + icon("copy") + "<span>" + esc(t("certificates.copy")) + "</span></button></p>"
        : "";
      return '<article class="cert"><span class="cert-seal" aria-hidden="true">' + esc(c.seal || s.initials(c.title)) + "</span><div>" +
        "<h3>" + esc(c.title) + "</h3><p>" + esc([c.issuer, c.date].filter(has).join(" · ")) + "</p>" +
        (has(c.detail) ? "<p>" + esc(c.detail) + "</p>" : "") + id +
        (has(c.url) ? '<a class="cert-link mono" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.linkLabel || t("certificates.verify")) + " " + icon("external") + "</a>" : "") +
        "</div></article>";
    }).join(""));
    document.querySelectorAll("[data-certs] [data-copy]").forEach(function (b) { copyButton(b, "certificates"); });
  }

  /* Copy button. If the clipboard is blocked, the text gets selected instead. */
  function copyButton(btn, scope) {
    btn.addEventListener("click", function () {
      var label = btn.querySelector("span");
      function done(ok) {
        label.textContent = t(scope + (ok ? ".copied" : ".copyFail"));
        if (!ok) {
          var target = btn.parentNode.querySelector("code, .mail");
          if (target) { var r = document.createRange(); r.selectNodeContents(target); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
        }
        setTimeout(function () { label.textContent = t(scope + ".copy"); }, 1800);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () { done(true); }, function () { done(false); });
      } else done(false);
    });
  }

  /* ---------- Downloads (CV, portfolio PDFs) ---------- */
  function downloads() {
    if (!DOWNLOADS.length) { $("#downloads").hidden = true; return; }
    var D = t("downloads") || {};
    set("[data-downloads]", DOWNLOADS.map(function (d) {
      var ready = has(d.file);
      var actions = ready
        ? '<div class="dl-actions"><a class="btn btn-primary btn-sm" href="' + esc(d.file) + '" download="' + esc(d.filename || "") + '">' + icon("download") + " " + esc(D.download) + "</a>" +
          (has(D.open) ? '<a class="btn btn-ghost btn-sm" href="' + esc(d.file) + '" target="_blank" rel="noopener">' + esc(D.open) + " " + icon("external") + "</a>" : "") + "</div>"
        : '<p class="dl-soon mono">' + esc(D.soon) + "</p>";
      return '<article class="dl' + (ready ? "" : " is-soon") + '">' +
        '<div class="dl-paper" aria-hidden="true"><span>' + esc(d.seal || s.initials(d.title)) + "</span><i>" + esc(D.format) + "</i></div>" +
        '<div class="dl-body"><h3>' + esc(d.title) + "</h3>" +
        (has(d.text) ? "<p>" + esc(d.text) + "</p>" : "") +
        (has(d.meta) ? '<p class="dl-meta mono">' + esc(d.meta) + "</p>" : "") +
        actions + "</div></article>";
    }).join(""));
  }

  /* ---------- Contact ---------- */
  function contact() {
    var K = t("contact") || {};
    var mail = has(P.email)
      ? '<div class="mail-row"><a class="mail" href="mailto:' + esc(P.email) + '">' + icon("mail") + esc(P.email) + "</a>" +
        '<button class="copy" type="button" data-copy="' + esc(P.email) + '">' + icon("copy") + "<span>" + esc(K.copy) + "</span></button></div>"
      : "";
    var links = (P.links || []).filter(function (l) { return has(l.url); }).map(function (l) {
      return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener"><span class="ico">' + icon(l.icon) + "</span>" +
        "<span><b>" + esc(l.label) + "</b><small>" + esc(l.handle || "") + '</small></span><span class="go">' + icon("external") + "</span></a></li>";
    }).join("");
    set("[data-contact]",
      "<div>" + (has(K.number) ? '<span class="mono">' + esc(s.fmt(K.number)) + "</span>" : "") +
      '<h2 style="margin-top:12px">' + esc(s.fmt(K.title)) + "</h2>" +
      (has(K.text) ? '<p class="lead">' + esc(s.fmt(K.text)) + "</p>" : "") +
      mail + '</div><ul class="links">' + links + "</ul>");

    var btn = $("[data-contact] [data-copy]");
    if (btn) copyButton(btn, "contact");
  }

  /* ---------- Nav highlight ---------- */
  function navSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = document.querySelectorAll('.nav a[href^="#"]');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        if (map[en.target.id]) map[en.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    hero(); code3d(); work(); passport(); about(); certs(); downloads(); contact(); navSpy();
    s.reveal();
  });
})();
