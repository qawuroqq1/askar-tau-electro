/* =====================================================================
   ASKAR TAU ELECTRO — визуальные эффекты
   Искры сварки в первом экране, параллакс, 3D-наклон карточек,
   свечение за курсором, появление фото «шторкой», бегущая строка,
   прогресс прокрутки, «магнитные» кнопки, кнопка «наверх».
   ===================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isMobile = window.matchMedia("(max-width: 680px)").matches;

  /* ---------- Прогресс прокрутки ---------- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress"; bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  /* ---------- Кнопка «наверх» ---------- */
  var top = document.createElement("button");
  top.className = "to-top"; top.type = "button"; top.setAttribute("aria-label", "Наверх");
  top.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  document.body.appendChild(top);

  var hero = document.querySelector(".hero");
  var heroMedia = hero && hero.querySelector(".hero__media");
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", h > 0 ? (y / h).toFixed(4) : 0);
      top.classList.toggle("is-on", y > 900);
      if (heroMedia && !reduce && y < window.innerHeight * 1.2) heroMedia.style.transform = "translate3d(0," + (y * 0.32).toFixed(1) + "px,0)";
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Молния ---------- */
  function addBolt(host) {
    var wrap = document.createElement("div");
    wrap.innerHTML = '<svg class="hero__bolt" viewBox="0 0 120 200" aria-hidden="true">' +
      '<path class="bolt-fill" d="M74 4 14 112h40l-12 84 64-120H66z"/><path d="M74 4 14 112h40l-12 84 64-120H66z"/></svg>';
    var svg = wrap.firstChild;
    host.insertBefore(svg, host.querySelector(".hero__inner, .container"));
    setTimeout(function () { svg.classList.add("is-drawn"); }, 2600);
  }

  /* ---------- Искры сварки (canvas) ---------- */
  function makeSparks(host, k) {
    var cv = document.createElement("canvas");
    cv.className = "hero__sparks"; cv.setAttribute("aria-hidden", "true");
    host.insertBefore(cv, host.querySelector(".hero__inner, .container"));
    var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, parts = [], running = true, last = 0;
    var MAX = Math.round((isMobile ? 70 : 170) * k);
    var ox = isMobile ? 0.85 : (k < 1 ? 0.8 : 0.78), oy = isMobile ? 0.3 : (k < 1 ? 0.5 : 0.52);
    function size() { W = host.clientWidth; H = host.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    function origin() { return { x: W * ox, y: H * oy }; }
    function spawn(n) {
      var o = origin();
      for (var i = 0; i < n && parts.length < MAX; i++) {
        var a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5, sp = 2 + Math.random() * 6;
        parts.push({ x: o.x + (Math.random() - 0.5) * 30, y: o.y + (Math.random() - 0.5) * 30,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 40 + Math.random() * 70, w: 0.6 + Math.random() * 1.6 });
      }
    }
    var dust = [];
    for (var d = 0; d < Math.round((isMobile ? 18 : 40) * k); d++) dust.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.3, s: Math.random() * 0.25 + 0.05, o: Math.random() * 0.5 + 0.1 });
    var burst = 0;
    function frame(t) {
      if (!running) return;
      var dt = Math.min((t - last) / 16.7 || 1, 3); last = t;
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < dust.length; j++) {
        var p = dust[j]; p.y -= p.s * 0.0015 * dt; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.fillStyle = "rgba(254,190,5," + p.o * 0.6 + ")"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.283); ctx.fill();
      }
      burst -= dt;
      if (burst < -60 - (1 - k) * 80) burst = 25 + Math.random() * 50;
      if (burst > 0) spawn(Math.max(1, Math.round((isMobile ? 2 : 4) * k)));
      ctx.globalCompositeOperation = "lighter";
      for (var i = parts.length - 1; i >= 0; i--) {
        var s = parts[i];
        s.life += dt; s.vy += 0.12 * dt; s.vx *= 0.99; s.x += s.vx * dt; s.y += s.vy * dt;
        var q = 1 - s.life / s.max;
        if (q <= 0 || s.y > H + 10) { parts.splice(i, 1); continue; }
        ctx.strokeStyle = "rgba(255," + Math.floor(170 + 70 * q) + "," + Math.floor(60 * q) + "," + q + ")";
        ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 2.2, s.y - s.vy * 2.2); ctx.stroke();
      }
      if (burst > 0) {
        var o = origin(), g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 90 + Math.random() * 30);
        g.addColorStop(0, "rgba(255,240,200,.55)"); g.addColorStop(0.3, "rgba(254,190,5,.22)"); g.addColorStop(1, "rgba(254,190,5,0)");
        ctx.fillStyle = g; ctx.fillRect(o.x - 130, o.y - 130, 260, 260);
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }
    function resume() { if (!running) { running = true; requestAnimationFrame(frame); } }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting) resume(); else running = false; }).observe(host);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) running = false; else resume(); });
    requestAnimationFrame(frame);
  }

  var pageHero = document.querySelector(".page-hero");
  if (hero && !reduce) makeSparks(hero, 0.7);
  if (pageHero) {
    // крупное контурное слово на фоне — название раздела
    var page = document.body.getAttribute("data-page");
    var word = document.createElement("div");
    word.className = "page-hero__word"; word.setAttribute("aria-hidden", "true"); word.setAttribute("data-i18n", "nav." + page);
    word.textContent = (window.I18N && window.I18N.ru && window.I18N.ru["nav." + page]) || "";
    pageHero.appendChild(word);
    var langBtnObs = function () { try { var l = localStorage.getItem("atl-lang") || "ru"; word.textContent = window.I18N[l]["nav." + page]; } catch (e) {} };
    langBtnObs(); document.addEventListener("click", function (e) { if (e.target.closest(".lang__btn")) setTimeout(langBtnObs, 0); });
    var phMedia = pageHero.querySelector(".media");
    window.addEventListener("scroll", function () {
      var y = window.scrollY; if (reduce || y > window.innerHeight) return;
      if (phMedia) phMedia.style.transform = "translate3d(0," + (y * 0.3).toFixed(1) + "px,0)";
      word.style.transform = "translate3d(" + (-y * 0.25).toFixed(1) + "px,0,0)";
    }, { passive: true });
  }

  /* ---------- Номера услуг поверх фото ---------- */
  document.querySelectorAll(".service").forEach(function (s, i) {
    var m = s.querySelector(".service__media"); if (m) m.setAttribute("data-num", (i + 1 < 10 ? "0" : "") + (i + 1));
  });

  /* ---------- Линия этапов производства заполняется ---------- */
  var steps = document.querySelector(".steps");
  if (steps) {
    var upd = function () {
      var r = steps.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      steps.style.setProperty("--prog", p.toFixed(3));
    };
    window.addEventListener("scroll", upd, { passive: true }); upd();
  }

  /* ---------- Крупные кнопки связи на странице «Контакты» ---------- */
  var qa = document.querySelector("[data-quick-actions]");
  if (qa && window.SITE_CONFIG) {
    var c = window.SITE_CONFIG.contacts || {};
    var L = function (k) { try { var l = localStorage.getItem("atl-lang") || "ru"; return window.I18N[l][k] || window.I18N.ru[k]; } catch (e) { return window.I18N.ru[k]; } };
    var icoPhone = '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
    var icoWa = '<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm6.4 18.4c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.5-4.8-5.6-5-.2-.2-1.3-1.8-1.3-3.4s.8-2.4 1.1-2.7c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l1 2.4c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.2.5.1.7-.1l1-1.2c.2-.3.5-.3.7-.2l2.3 1.1c.3.2.5.2.6.4.1.1.1.8-.2 1.6z"/></svg>';
    var icoTg = '<svg viewBox="0 0 24 24"><path d="M21.5 4.3 2.9 11.5c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5zM9.7 14.1l8.6-5.4c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.1z"/></svg>';
    var icoMail = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
    var build = function () {
      var h = "";
      if (c.phone) h += '<a class="qa qa--call" href="tel:' + c.phone.replace(/[^\d+]/g, "") + '">' + icoPhone + '<span>' + L("ct.q.call") + '<small>' + c.phone + '</small></span></a>';
      if (c.whatsapp) h += '<a class="qa qa--wa" href="https://wa.me/' + c.whatsapp + '" target="_blank" rel="noopener">' + icoWa + '<span>' + L("ct.q.wa") + '<small>' + (c.phone || "+" + c.whatsapp) + '</small></span></a>';
      if (c.telegram) { var tg = String(c.telegram).replace(/\s/g, ""); var isNum = /^\+?\d+$/.test(tg);
        h += '<a class="qa qa--tg" href="https://t.me/' + (isNum ? "+" + tg.replace(/^\+/, "") : tg.replace(/^@/, "")) + '" target="_blank" rel="noopener">' + icoTg + '<span>' + L("ct.q.tg") + '<small>' + (isNum ? c.telegram : "@" + tg.replace(/^@/, "")) + '</small></span></a>'; }
      if (c.email) h += '<a class="qa qa--mail" href="mailto:' + c.email + '">' + icoMail + '<span>' + L("ct.q.mail") + '<small>' + c.email + '</small></span></a>';
      qa.innerHTML = h; qa.hidden = !h;
    };
    build(); document.addEventListener("click", function (e) { if (e.target.closest(".lang__btn")) setTimeout(build, 0); });
  }

  /* ---------- Плитки портфолио появляются волной ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var tio = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = "none"; tio.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".tile").forEach(function (t, i) {
      t.style.opacity = 0; t.style.transform = "translateY(30px) scale(.97)"; t.style.transitionDelay = (i % 3) * 0.08 + "s"; tio.observe(t);
    });
  }

  /* ---------- Фото появляются «шторкой» ---------- */
  var wipes = document.querySelectorAll(".split-media .media, .service__media, .step__media, .mosaic .media, .about-intro .media");
  if (!reduce && "IntersectionObserver" in window) {
    // наблюдаем за родителем: у самого фото до анимации нулевая видимая площадь
    var wio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".wipe:not(.is-wiped)").forEach(function (m) { m.classList.add("is-wiped"); });
        wio.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    wipes.forEach(function (m, i) { m.classList.add("wipe"); m.style.transitionDelay = (i % 3) * 0.12 + "s"; wio.observe(m.parentElement); });
  }

  if (!finePointer || reduce) return;   // дальше — эффекты только для мыши

  /* ---------- 3D-наклон карточек и блик ---------- */
  document.querySelectorAll(".card, .product, .approach__item, .contact-card, .stat-ph").forEach(function (el) {
    el.classList.add("tilt");
    var spot = document.createElement("span"); spot.className = "spot"; el.appendChild(spot);
    var max = el.classList.contains("card") ? 4 : 6;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.add("is-tilting");
      el.style.setProperty("--mx", px * 100 + "%"); el.style.setProperty("--my", py * 100 + "%");
      el.style.transform = "perspective(900px) rotateX(" + ((0.5 - py) * max).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * max).toFixed(2) + "deg) translateY(-6px)";
    });
    el.addEventListener("pointerleave", function () { el.classList.remove("is-tilting"); el.style.transform = ""; });
  });

  /* ---------- Свечение за курсором в тёмных блоках ---------- */
  document.querySelectorAll(".section--dark, .cta, .hero, .section--navy").forEach(function (el) {
    el.classList.add("glow-follow");
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--gx", e.clientX - r.left + "px"); el.style.setProperty("--gy", e.clientY - r.top + "px");
      el.classList.add("is-hover");
    });
    el.addEventListener("pointerleave", function () { el.classList.remove("is-hover"); });
  });

  /* ---------- «Магнитные» кнопки ---------- */
  document.querySelectorAll(".hero__actions .btn, .cta__actions .btn").forEach(function (b) {
    b.classList.add("magnetic");
    b.addEventListener("pointermove", function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px," + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px)";
    });
    b.addEventListener("pointerleave", function () { b.style.transform = ""; });
  });
})();
