/* Shared helpers: interface text, theme, ribbon/header/footer, reveal, formatting, covers. */
(function () {
  var P = window.PROFILE || {};
  var PROJECTS = window.PROJECTS || [];

  var site = (window.site = {});

  site.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  site.has = function (v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== "";
  };
  site.paras = function (text) {
    return String(text).split(/\n\s*\n/).map(function (p) { return "<p>" + site.esc(p.trim()) + "</p>"; }).join("");
  };
  site.project = function (id) {
    for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].id === id) return PROJECTS[i];
    return null;
  };
  site.projectUrl = function (id) { return "project.html?id=" + encodeURIComponent(id); };
  site.param = function (name) {
    try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; }
  };

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  site.month = function (iso) {
    if (!iso) return "";
    var d = String(iso).split("-");
    if (d.length < 2) return d[0];
    return MONTHS[parseInt(d[1], 10) - 1] + " " + d[0];
  };
  site.day = function (iso) {
    var d = String(iso).split("-");
    if (d.length < 3) return site.month(iso);
    return parseInt(d[2], 10) + " " + MONTHS[parseInt(d[1], 10) - 1] + " " + d[0];
  };

  /* ---------- Interface text (data/content.js) ---------- */
  var C = window.CONTENT || {};
  site.t = function (path) {
    var v = C;
    String(path).split(".").forEach(function (k) { v = v == null ? v : v[k]; });
    return v == null ? "" : v;
  };
  site.fmt = function (str, vars) {
    vars = vars || {};
    var base = { name: P.name, location: P.location, since: P.since, year: new Date().getFullYear(), status: P.status };
    return String(str == null ? "" : str).replace(/\{(\w+)\}/g, function (m, k) {
      if (vars[k] != null) return vars[k];
      return base[k] != null ? base[k] : "";
    });
  };
  site.tf = function (path, vars) { return site.fmt(site.t(path), vars); };
  /* Fill [data-t] (text) and [data-t-aria] (aria-label) from content.js; empty text hides the element. */
  site.fill = function (root) {
    (root || document).querySelectorAll("[data-t]").forEach(function (el) {
      var v = site.tf(el.getAttribute("data-t"));
      el.textContent = v;
      if (!site.has(v)) el.hidden = true;
    });
    (root || document).querySelectorAll("[data-t-aria]").forEach(function (el) {
      el.setAttribute("aria-label", site.tf(el.getAttribute("data-t-aria")));
    });
  };

  site.STATUS = site.t("status") || {};
  site.CATEGORY = site.t("category") || {};
  var CAT_ICON = { game: "gamepad", plugin: "plug", tool: "code" };

  site.initials = function (title) {
    var words = String(title).replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2);
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  /* Cover image, or a generated tile when a project has no art yet. */
  site.cover = function (p, opts) {
    opts = opts || {};
    if (site.has(p.cover)) {
      return '<img src="' + site.esc(p.cover) + '" alt="' + site.esc(opts.alt != null ? opts.alt : "") + '" loading="' + (opts.eager ? "eager" : "lazy") + '" decoding="async">';
    }
    if (site.has(p.youtube) && !opts.noVideoThumb) {
      return '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(p.youtube) + '/hqdefault.jpg" alt="" loading="lazy" decoding="async">';
    }
    var inner = site.has(p.icon)
      ? '<img class="pixel" src="' + site.esc(p.icon) + '" alt="">'
      : "<b>" + site.esc(site.initials(p.title)) + "</b>";
    return '<div class="gen-cover ' + site.esc(p.category) + '" aria-hidden="true">' + inner + icon(CAT_ICON[p.category] || "gamepad") + "</div>";
  };

  site.badge = function (status) {
    if (!site.STATUS[status]) return "";
    return '<span class="badge ' + status + '">' + site.STATUS[status] + "</span>";
  };

  /* YouTube embed. YouTube refuses to play (error 153) when the request carries no
     Referer, which is always the case for a page opened as a file (file://).
     Online we send the referrer + origin it asks for; offline we link out instead. */
  site.youtube = function (id, title, autoplay) {
    var watch = "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
    if (!/^https?:$/.test(location.protocol)) {
      return '<a class="yt-out" href="' + watch + '" target="_blank" rel="noopener">' +
        '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg" alt="" loading="lazy">' +
        "<span>" + icon("play") + " " + site.esc(site.t("video.watchOnYoutube")) + "</span></a>";
    }
    var src = "https://www.youtube.com/embed/" + encodeURIComponent(id) +
      "?rel=0&playsinline=1" + (autoplay ? "&autoplay=1" : "") + "&origin=" + encodeURIComponent(location.origin);
    return '<iframe src="' + src + '" title="' + site.esc(title) + '" referrerpolicy="strict-origin-when-cross-origin"' +
      (autoplay ? "" : ' loading="lazy"') + ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  };

  /* ---------- Theme ---------- */
  var KEY = "yavuz-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.querySelector(".theme-switch");
    if (btn) {
      btn.setAttribute("aria-pressed", t === "night" ? "true" : "false");
      btn.setAttribute("aria-label", site.t(t === "night" ? "theme.toDay" : "theme.toNight"));
    }
  }
  site.initTheme = function () {
    var cur = document.documentElement.getAttribute("data-theme") || "day";
    applyTheme(cur);
    var btn = document.querySelector(".theme-switch");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "night" ? "day" : "night";
      applyTheme(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked */ }
    });
  };

  /* ---------- Chrome: ribbon, header, footer ---------- */
  var PAGE = document.body.getAttribute("data-page") || "home";

  // A strip of tiny arcade classics, spread across the top of the page
  var SCENE =
    '<div class="level">' +
      '<div class="scene s-tetris"><i class="tet"><i class="tet-row0"></i><i class="tet-row1"></i><i class="tet-piece"></i></i></div>' +
      '<div class="scene s-kong"><i class="girder g-top"></i><i class="girder g-low"></i><i class="ladder"></i><i class="ape"></i><i class="barrel"></i></div>' +
      '<div class="scene s-hunt"><i class="duck"></i><i class="hunt"><i class="dog"></i><i class="grass"></i></i></div>' +
      '<div class="scene s-pac"><i class="maze"><i class="dots"></i><i class="pellet"></i><i class="eaten"></i>' +
        '<i class="ghost g1"></i><i class="ghost g2"></i><i class="pacman"></i></i></div>' +
      '<div class="scene mario">' +
        '<i class="cloud"></i>' +
        '<i class="brick b1"></i><i class="qblock"></i><i class="brick b2"></i><i class="coin"></i>' +
        '<i class="walker"></i><i class="runner"></i>' +
        '<i class="pipe"></i><i class="pole"></i><i class="castle"></i>' +
      "</div>" +
    "</div>";

  site.initRibbon = function () {
    var box = document.querySelector("[data-ribbon]");
    if (!box) return;
    box.setAttribute("aria-hidden", "true");
    box.innerHTML = '<div class="wrap">' + SCENE + "</div>";
  };

  site.initHeader = function () {
    var box = document.querySelector("[data-header]");
    if (!box) return;
    var B = site.t("brand") || {};
    var nav = (site.t("nav") || []).map(function (n) {
      var href = String(n.href || "");
      var local = href.charAt(0) === "#";
      var url = local && PAGE !== "home" ? "index.html" + href : href;
      var current = (PAGE === "devlog" && href === "devlog.html") || (PAGE === "project" && href === "#work");
      return '<a href="' + site.esc(url) + '"' + (current ? ' aria-current="page"' : "") + ">" + site.esc(site.fmt(n.label)) + "</a>";
    }).join("");
    box.innerHTML = '<div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="' + site.esc(site.fmt(B.label)) + '">' +
      (site.has(B.mark) ? '<span class="brand-mark">' + site.esc(B.mark) + "</span>" : "") +
      "<span>" + site.esc(B.word) + "<b>" + site.esc(B.dot) + "</b></span></a>" +
      '<nav class="nav" aria-label="' + site.esc(site.t("navLabel")) + '">' + nav + "</nav>" +
      '<button class="theme-switch" type="button" aria-pressed="false"><span><i></i></span></button></div>';
  };

  site.initFooter = function () {
    var box = document.querySelector("[data-footer]");
    if (!box) return;
    var links = (site.t("footer." + PAGE) || []).map(function (l) {
      var text = site.esc(site.fmt(l.label));
      return site.has(l.href) ? '<a href="' + site.esc(l.href) + '">' + text + "</a>" : text;
    }).join(" · ");
    box.innerHTML = '<div class="wrap"><span>' + site.esc(site.tf("footer.copyright")) + "</span>" + (links ? "<span>" + links + "</span>" : "") + "</div>";
  };

  site.setDescription = function (path, vars) {
    var d = site.tf(path, vars), m = document.querySelector('meta[name="description"]');
    if (m && site.has(d)) m.setAttribute("content", d);
  };

  site.setTitle = function (path, vars) {
    var t = site.tf(path, vars);
    if (site.has(t)) document.title = t;
  };

  /* ---------- Reveal on scroll ---------- */
  site.reveal = function (root) {
    var els = (root || document).querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  };

  // Scripts sit at the end of <body>, so the chrome can be drawn right away (no flash of empty header).
  site.initRibbon();
  site.initHeader();
  site.initFooter();
  site.fill();
  site.initTheme();
  if (PAGE === "lost") site.setTitle("meta.lost");
})();
