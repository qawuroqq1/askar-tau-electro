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

  /* ---------- Молния в первом экране ---------- */
  if (hero) {
    var bolt = document.createElement("div");
    bolt.innerHTML = '<svg class="hero__bolt" viewBox="0 0 120 200" aria-hidden="true">' +
      '<path class="bolt-fill" d="M74 4 14 112h40l-12 84 64-120H66z"/><path d="M74 4 14 112h40l-12 84 64-120H66z"/></svg>';
    var svg = bolt.firstChild;
    hero.insertBefore(svg, hero.querySelector(".hero__inner"));
    setTimeout(function () { svg.classList.add("is-drawn"); }, 2600);
  }

  /* ---------- Искры сварки (canvas) ---------- */
  if (hero && !reduce) {
    var cv = document.createElement("canvas");
    cv.className = "hero__sparks"; cv.setAttribute("aria-hidden", "true");
    hero.insertBefore(cv, hero.querySelector(".hero__inner"));
    var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, parts = [], running = true, last = 0;
    var MAX = isMobile ? 70 : 170;
    function size() { W = hero.clientWidth; H = hero.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    // точка «сварки» — справа, где молния
    function origin() { return { x: W * (isMobile ? 0.85 : 0.78), y: H * (isMobile ? 0.3 : 0.52) }; }
    function spawn(n) {
      var o = origin();
      for (var i = 0; i < n && parts.length < MAX; i++) {
        var a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
        var sp = 2 + Math.random() * 6;
        parts.push({ x: o.x + (Math.random() - 0.5) * 30, y: o.y + (Math.random() - 0.5) * 30,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 40 + Math.random() * 70, w: 0.6 + Math.random() * 1.6 });
      }
    }
    // фоновые «пылинки»
    var dust = [];
    for (var d = 0; d < (isMobile ? 18 : 40); d++) dust.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.3, s: Math.random() * 0.25 + 0.05, o: Math.random() * 0.5 + 0.1 });
    var burst = 0;
    function frame(t) {
      if (!running) return;
      var dt = Math.min((t - last) / 16.7 || 1, 3); last = t;
      ctx.clearRect(0, 0, W, H);
      // пылинки
      for (var j = 0; j < dust.length; j++) {
        var p = dust[j]; p.y -= p.s * 0.0015 * dt; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.fillStyle = "rgba(254,190,5," + p.o * 0.6 + ")"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.283); ctx.fill();
      }
      // вспышки: короткие серии искр с паузами, как при сварке
      burst -= dt;
      if (burst < -60) burst = 25 + Math.random() * 50;
      if (burst > 0) spawn(isMobile ? 2 : 4);
      ctx.globalCompositeOperation = "lighter";
      for (var i = parts.length - 1; i >= 0; i--) {
        var s = parts[i];
        s.life += dt; s.vy += 0.12 * dt; s.vx *= 0.99; s.x += s.vx * dt; s.y += s.vy * dt;
        var k = 1 - s.life / s.max;
        if (k <= 0 || s.y > H + 10) { parts.splice(i, 1); continue; }
        ctx.strokeStyle = "rgba(255," + Math.floor(170 + 70 * k) + "," + Math.floor(60 * k) + "," + k + ")";
        ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 2.2, s.y - s.vy * 2.2); ctx.stroke();
      }
      // свечение точки сварки
      if (burst > 0) {
        var o = origin(), g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 90 + Math.random() * 30);
        g.addColorStop(0, "rgba(255,240,200,.55)"); g.addColorStop(0.3, "rgba(254,190,5,.22)"); g.addColorStop(1, "rgba(254,190,5,0)");
        ctx.fillStyle = g; ctx.fillRect(o.x - 130, o.y - 130, 260, 260);
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; requestAnimationFrame(frame); }
        if (!vis) running = false;
      }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) running = false; else if (!running) { running = true; requestAnimationFrame(frame); }
    });
    requestAnimationFrame(frame);
  }

  /* ---------- Фото появляются «шторкой» ---------- */
  var wipes = document.querySelectorAll(".split-media .media, .service__media, .step__media, .mosaic .media, .about-intro .media");
  if (!reduce && "IntersectionObserver" in window) {
    var wio = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-wiped"); wio.unobserve(e.target); } });
    }, { threshold: 0.2 });
    wipes.forEach(function (m, i) { m.classList.add("wipe"); m.style.transitionDelay = (i % 3) * 0.12 + "s"; wio.observe(m); });
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
