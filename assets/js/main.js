/* =====================================================================
   ASKAR TAU ELECTRO — логика сайта
   Шапка и подвал собираются здесь один раз для всех страниц.
   Тексты — в i18n.js, изображения — в images.js, контакты — в config.js.
   ===================================================================== */
(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};
  var IMG = window.SITE_IMAGES || {};
  var DICT = window.I18N || {};
  var LANGS = [["ru", "RU"], ["kk", "KZ"], ["en", "EN"]];
  var NAV = [
    ["index.html", "home"], ["about.html", "about"], ["products.html", "products"],
    ["services.html", "services"], ["production.html", "production"],
    ["portfolio.html", "portfolio"], ["contacts.html", "contacts"]
  ];
  var lang = (function () {
    try { var s = localStorage.getItem("atl-lang"); if (s && DICT[s]) return s; } catch (e) {}
    return CFG.defaultLang || "ru";
  })();
  var page = document.body.getAttribute("data-page") || "home";

  function t(key) {
    var d = DICT[lang] || {};
    return d[key] != null ? d[key] : (DICT.ru && DICT.ru[key] != null ? DICT.ru[key] : key);
  }
  function tl(obj) { // локализованное значение {ru,kk,en} или строка
    if (obj == null) return null;
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.ru || null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------------- ШАПКА ---------------- */
  function buildHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '" class="nav__link' + (n[1] === page ? " is-active" : "") +
        '"' + (n[1] === page ? ' aria-current="page"' : "") + ' data-i18n="nav.' + n[1] + '"></a>';
    }).join("");
    var langs = LANGS.map(function (l) {
      return '<button type="button" class="lang__btn" data-lang="' + l[0] + '" aria-label="' + l[1] + '">' + l[1] + "</button>";
    }).join("");
    el.className = "header";
    el.innerHTML =
      '<div class="container header__inner">' +
        '<a href="index.html" class="header__logo" aria-label="ASKAR TAU ELECTRO">' +
          '<img src="assets/brand/logo.webp" alt="ASKAR TAU ELECTRO" width="548" height="368">' +
        "</a>" +
        '<nav class="nav" id="main-nav" aria-label="Main">' + links +
          '<div class="nav__mobile-extra"><div class="lang">' + langs + '</div>' +
          '<a href="contacts.html#form" class="btn btn--primary" data-i18n="cta.request"></a></div>' +
        "</nav>" +
        '<div class="header__actions">' +
          '<a class="header__phone" data-header-phone hidden href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg><span></span></a>' +
          '<div class="lang lang--desktop">' + langs + "</div>" +
          '<a href="contacts.html#form" class="btn btn--primary btn--sm header__cta" data-i18n="cta.request"></a>' +
          '<button class="burger" type="button" aria-controls="main-nav" aria-expanded="false">' +
            '<span></span><span></span><span></span><span class="sr-only" data-i18n="nav.menu"></span></button>' +
        "</div>" +
      "</div>";
    var burger = el.querySelector(".burger");
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    el.querySelectorAll(".nav__link").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
    var onScroll = function () { el.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------------- ПОДВАЛ ---------------- */
  function buildFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var links = NAV.map(function (n) { return '<li><a href="' + n[0] + '" data-i18n="nav.' + n[1] + '"></a></li>'; }).join("");
    el.className = "footer";
    el.innerHTML =
      '<div class="container footer__grid">' +
        '<div class="footer__brand">' +
          '<a href="index.html" class="footer__logo"><img src="assets/brand/logo.webp" alt="ASKAR TAU ELECTRO" width="548" height="368" loading="lazy"></a>' +
          '<p class="footer__slogan" data-slogan></p>' +
          '<p class="footer__about" data-i18n="footer.about"></p>' +
        "</div>" +
        '<div><h3 class="footer__title" data-i18n="footer.nav"></h3><ul class="footer__links">' + links + "</ul></div>" +
        '<div><h3 class="footer__title" data-i18n="footer.contacts"></h3>' +
          '<ul class="footer__contacts">' +
            '<li><span class="footer__label" data-i18n="ct.phone"></span><span data-contact="phone"></span></li>' +
            '<li><span class="footer__label" data-i18n="ct.email"></span><span data-contact="email"></span></li>' +
            '<li><span class="footer__label" data-i18n="ct.address"></span><span data-contact="address"></span></li>' +
          "</ul><div class=\"social\" data-social></div></div>" +
      "</div>" +
      '<div class="container footer__bottom">' +
        '<p>© <span data-year></span> ASKAR TAU ELECTRO. <span data-i18n="footer.rights"></span></p>' +
        '<details class="credits"><summary data-i18n="footer.credits"></summary>' +
          '<p class="credits__note" data-i18n="footer.demoNote"></p><ul class="credits__list" data-credits></ul></details>' +
      "</div>";
  }

  /* ---------------- ИЗОБРАЖЕНИЯ ---------------- */
  var WIDTHS = [480, 768, 1080, 1600, 2200];
  function applyImages(root) {
    (root || document).querySelectorAll("img[data-img]").forEach(function (img) {
      var key = img.getAttribute("data-img");
      var d = IMG[key];
      if (!d) { console.warn("[images] нет записи для ключа:", key); return; }
      if (!img.dataset.ready) {
        var max = parseInt(img.getAttribute("data-max") || "2200", 10);
        if (d.unsplash) {
          var ws = WIDTHS.filter(function (w) { return w <= max; });
          img.srcset = ws.map(function (w) { return d.unsplash + "?auto=format&fit=crop&w=" + w + "&q=70 " + w + "w"; }).join(", ");
          img.src = d.unsplash + "?auto=format&fit=crop&w=" + ws[Math.min(2, ws.length - 1)] + "&q=70";
          if (!img.sizes) img.sizes = img.getAttribute("data-sizes") || "100vw";
        } else {
          img.src = d.local || d.src;
          if (d.small) { img.srcset = d.small + " 800w, " + d.src + " 1600w"; if (!img.sizes) img.sizes = img.getAttribute("data-sizes") || "(max-width: 900px) 100vw, 50vw"; }
        }
        if (!img.hasAttribute("loading")) img.loading = img.hasAttribute("data-eager") ? "eager" : "lazy";
        img.decoding = "async";
        img.style.objectPosition = d.pos || "50% 50%";
        img.addEventListener("load", function () { img.classList.add("is-loaded"); });
        if (img.complete && img.naturalWidth) img.classList.add("is-loaded");
        var holder = img.closest(".media");
        if (holder && !img.hasAttribute("data-nobadge") && d.demo) {
          var b = document.createElement("span");
          b.className = "badge " + (d.demo ? "badge--demo" : "badge--render");
          b.setAttribute("data-i18n", d.demo ? "badge.demo" : "badge.render");
          b.textContent = t(d.demo ? "badge.demo" : "badge.render");
          holder.appendChild(b);
        }
        img.dataset.ready = "1";
      }
      img.alt = tl(d.alt) || "";
    });
  }
  function buildCredits() {
    var ul = document.querySelector("[data-credits]");
    if (!ul) return;
    var used = {};
    document.querySelectorAll("img[data-img]").forEach(function (i) { used[i.getAttribute("data-img")] = 1; });
    var html = Object.keys(used).filter(function (k) { return IMG[k] && IMG[k].demo; }).map(function (k) {
      return '<li><a href="' + esc(IMG[k].credit) + '" target="_blank" rel="noopener">' + esc(tl(IMG[k].alt)) + "</a></li>";
    }).join("");
    ul.innerHTML = html || "<li>—</li>";
    var li = document.createElement("li");
    li.innerHTML = 'Unsplash License — <a href="https://unsplash.com/license" target="_blank" rel="noopener">unsplash.com/license</a>';
    ul.appendChild(li);
  }

  /* ---------------- КОНТАКТЫ И ЗАГЛУШКИ ---------------- */
  function placeholder() { return '<span class="ph">' + esc(t("ph.soon")) + "</span>"; }
  function contactHTML(kind) {
    var c = CFG.contacts || {};
    switch (kind) {
      case "phone": case "phone2":
        return c[kind] ? '<a href="tel:' + esc(c[kind].replace(/[^\d+]/g, "")) + '">' + esc(c[kind]) + "</a>" : placeholder();
      case "email":
        return c.email ? '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" : placeholder();
      case "whatsapp":
        return c.whatsapp ? '<a href="https://wa.me/' + esc(c.whatsapp) + '" target="_blank" rel="noopener">' + esc(c.phone || "+" + c.whatsapp) + "</a>" : placeholder();
      case "telegram":
        if (!c.telegram) return placeholder();
        var isNum = /^\+?\d+$/.test(c.telegram.replace(/\s/g, ""));
        var tg = c.telegram.replace(/\s/g, "").replace(/^@/, "");
        return '<a href="https://t.me/' + esc(isNum ? "+" + tg.replace(/^\+/, "") : tg) + '" target="_blank" rel="noopener">' +
          esc(isNum ? c.telegram : "@" + tg) + "</a>";
      case "address": var a = tl(c.address); return a ? esc(a) : placeholder();
      case "hours": var h = tl(c.workHours); return h ? esc(h) : placeholder();
      case "legalName": return (CFG.legal && CFG.legal.fullName) ? esc(CFG.legal.fullName) : placeholder();
      case "bin": return (CFG.legal && CFG.legal.bin) ? esc(CFG.legal.bin) : placeholder();
    }
    return placeholder();
  }
  function applyContacts() {
    document.querySelectorAll("[data-contact]").forEach(function (el) { el.innerHTML = contactHTML(el.getAttribute("data-contact")); });
    var s = CFG.social || {};
    document.querySelectorAll("[data-social]").forEach(function (el) {
      var items = [["instagram", "Instagram"], ["facebook", "Facebook"], ["youtube", "YouTube"]].filter(function (x) { return s[x[0]]; });
      el.innerHTML = items.map(function (x) { return '<a href="' + esc(s[x[0]]) + '" target="_blank" rel="noopener">' + x[1] + "</a>"; }).join("");
      el.hidden = !items.length;
    });
    var map = document.querySelector("[data-map]");
    var cc = CFG.contacts || {};
    var embed = cc.mapEmbedUrl;
    if (!embed && cc.mapPoint) {
      var la = cc.mapPoint.lat, lo = cc.mapPoint.lon, dx = 0.012, dy = 0.005;
      embed = "https://www.openstreetmap.org/export/embed.html?bbox=" + (lo - dx) + "%2C" + (la - dy) + "%2C" + (lo + dx) + "%2C" + (la + dy) +
        "&layer=mapnik&marker=" + la + "%2C" + lo;
    }
    if (map && embed && !map.querySelector("iframe")) {
      map.innerHTML = '<iframe src="' + esc(embed) + '" loading="lazy" title="Map" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
        (cc.map2gisUrl ? '<a class="map__open btn btn--primary btn--sm" href="' + esc(cc.map2gisUrl) + '" target="_blank" rel="noopener" data-i18n="ct.map.open">' + esc(t("ct.map.open")) + "</a>" : "");
      map.classList.add("has-map");
    }
    var mo = document.querySelector(".map__open"); if (mo) mo.textContent = t("ct.map.open");
    // Телефон в шапке и плавающая кнопка WhatsApp
    var hp = document.querySelector("[data-header-phone]");
    if (hp) { hp.hidden = !cc.phone; if (cc.phone) { hp.href = "tel:" + cc.phone.replace(/[^\d+]/g, ""); hp.querySelector("span").textContent = cc.phone; } }
    if (cc.whatsapp && !document.querySelector(".wa-float")) {
      var wa = document.createElement("a");
      wa.className = "wa-float"; wa.href = "https://wa.me/" + cc.whatsapp; wa.target = "_blank"; wa.rel = "noopener";
      wa.setAttribute("aria-label", "WhatsApp");
      wa.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.3 3.6 5.7 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';
      document.body.appendChild(wa);
    }
  }

  /* ---------------- ЯЗЫК ---------------- */
  function applyLang() {
    document.documentElement.lang = lang === "kk" ? "kk" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-list")).split("|").map(function (x) { return "<li>" + x + "</li>"; }).join("");
    });
    document.querySelectorAll("[data-slogan]").forEach(function (el) { el.textContent = tl(CFG.slogan) || ""; });
    document.title = t("meta." + page);
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", t("meta.desc"));
    document.querySelectorAll(".lang__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    applyImages(); applyContacts(); buildCredits();
    document.querySelectorAll(".badge[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
  }
  function bindLang() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".lang__btn");
      if (!b) return;
      lang = b.getAttribute("data-lang");
      try { localStorage.setItem("atl-lang", lang); } catch (err) {}
      applyLang();
    });
  }

  /* ---------------- АНИМАЦИЯ ПОЯВЛЕНИЯ ---------------- */
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- ФИЛЬТР ПОРТФОЛИО ---------------- */
  function portfolioFilter() {
    var btns = document.querySelectorAll("[data-filter]");
    if (!btns.length) return;
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        btns.forEach(function (x) { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        document.querySelectorAll("[data-cat]").forEach(function (it) {
          it.hidden = !(f === "all" || it.getAttribute("data-cat").split(" ").indexOf(f) > -1);
        });
      });
    });
  }

  /* ---------------- ЛАЙТБОКС ---------------- */
  function lightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox] img[data-img]"));
    if (!items.length) return;
    var box = document.createElement("div");
    box.className = "lightbox"; box.hidden = true;
    box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button class="lightbox__close" aria-label="Close">×</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Previous">‹</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__next" aria-label="Next">›</button>';
    document.body.appendChild(box);
    var bi = box.querySelector("img"), cap = box.querySelector("figcaption"), idx = 0;
    function visible() { return items.filter(function (i) { return !i.closest("[hidden]"); }); }
    function show(i) {
      var list = visible(); idx = (i + list.length) % list.length;
      var src = list[idx];
      var d = IMG[src.getAttribute("data-img")] || {};
      bi.src = d.full || (d.unsplash ? d.unsplash + "?auto=format&fit=max&w=2000&q=75" : (d.src || src.currentSrc || src.src));
      box.classList.toggle("lightbox--paper", !!d.drawing);
      bi.alt = src.alt; cap.textContent = src.alt;
      box.hidden = false; document.body.classList.add("no-scroll");
    }
    function close() { box.hidden = true; document.body.classList.remove("no-scroll"); }
    items.forEach(function (img) {
      var tile = img.closest("[data-lightbox]");
      tile.setAttribute("tabindex", "0"); tile.setAttribute("role", "button");
      var open = function () { show(visible().indexOf(img)); };
      tile.addEventListener("click", open);
      tile.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    box.querySelector(".lightbox__close").onclick = close;
    box.querySelector(".lightbox__prev").onclick = function (e) { e.stopPropagation(); show(idx - 1); };
    box.querySelector(".lightbox__next").onclick = function (e) { e.stopPropagation(); show(idx + 1); };
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------------- ФОРМА ЗАЯВКИ ---------------- */
  function form() {
    var f = document.querySelector("[data-request-form]");
    if (!f) return;
    var msg = f.querySelector(".form__msg");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (n) { return (f.elements[n] && f.elements[n].value || "").trim(); };
      if (!v("name") || !v("phone")) { msg.textContent = t("ct.f.err"); msg.className = "form__msg is-error"; return; }
      var c = CFG.contacts || {};
      var sel = f.elements.type; var typeTxt = sel && sel.selectedIndex > 0 ? sel.options[sel.selectedIndex].text : "";
      var lines = ["*" + t("ct.f.subject") + "*", "",
        t("ct.f.name") + ": " + v("name"), t("ct.f.phone") + ": " + v("phone")];
      if (v("email")) lines.push("Email: " + v("email"));
      if (typeTxt) lines.push(t("ct.f.type") + ": " + typeTxt);
      if (v("message")) lines.push("", v("message"));
      var body = lines.join("\n");
      var target = CFG.formTarget || "whatsapp";
      if (target === "whatsapp" && c.whatsapp) {
        var url = "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(body);
        var w = window.open(url, "_blank");
        if (!w) location.href = url;           // если браузер заблокировал новое окно
      } else if (c.email) {
        location.href = "mailto:" + c.email + "?subject=" + encodeURIComponent(t("ct.f.subject")) + "&body=" + encodeURIComponent(body.replace(/\*/g, ""));
      } else if (c.whatsapp) {
        location.href = "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(body);
      } else {
        msg.textContent = t("ct.f.pending"); msg.className = "form__msg is-pending"; return;
      }
      msg.textContent = t("ct.f.ok"); msg.className = "form__msg is-ok";
    });
  }

  /* ---------------- СТАРТ ---------------- */
  buildHeader();
  buildFooter();
  document.querySelectorAll("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  bindLang();
  applyLang();
  reveal();
  portfolioFilter();
  lightbox();
  form();
})();
