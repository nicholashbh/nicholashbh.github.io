/* Shared behaviour for every page on the site.
   Loaded once from assets/js/site.js instead of being pasted into each
   page's markup. Both blocks below exit immediately when the elements
   they target are absent, so this is safe on every page.
   Do not paste this into a page; edit it here. */

(function () {
  var btn = document.querySelector('.nav__toggle');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
    btn.textContent = open ? 'Menu' : 'Close';
  });
})();

/* Hero background loop. It is decoration, so it has to earn its bytes:
   nothing is fetched unless the hero is in its two-column layout, the
   visitor has not asked for reduced motion, and the connection is neither
   metered nor slow. Every path that opts out — including no JavaScript at all — keeps the
   CSS poster still, which is the clip's own first frame, so the hero never
   falls back to an empty box. */
(function () {
  var stage = document.querySelector('.hero-stage__bg');
  if (!stage) return;
  var video = stage.querySelector('video');
  if (!video || !video.canPlayType) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 56.24em)').matches) return;   /* stacked hero: see site.css */

  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return;
    if (/^(slow-)?2g$/.test(conn.effectiveType || '')) return;
  }

  var sources = video.querySelectorAll('source[data-src]');
  if (!sources.length) return;
  Array.prototype.forEach.call(sources, function (s) {
    s.setAttribute('src', s.getAttribute('data-src'));
  });

  /* Fade in only once frames are actually on screen. Fading on canplay would
     show a moment of empty video element on a slow decode. */
  video.addEventListener('playing', function () {
    video.setAttribute('data-playing', 'true');
  });

  /* video.error is only set when the element itself gives up — a single
     <source> failing over to the next one does not set it. If it does give
     up, drop the element and let the poster stand. */
  video.addEventListener('error', function () {
    if (video.error) video.remove();
  });

  function play() {
    var p = video.play();
    if (p && p.catch) { p.catch(function () { /* autoplay declined; poster stands */ }); }
  }

  video.load();
  play();

  /* Stop decoding when the hero is off screen or the tab is in the
     background. A muted decorative loop is not worth a laptop battery. */
  var onScreen = true;
  function sync() {
    if (onScreen && !document.hidden) { play(); } else { video.pause(); }
  }
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { onScreen = e.isIntersecting; });
      sync();
    }, { threshold: 0 }).observe(stage);
  }
})();

/* Count-up on the decision numbers. Runs once, when the row scrolls into
   view. Skipped entirely under prefers-reduced-motion, and skipped if
   IntersectionObserver is unavailable — in both cases the final value is
   already in the markup, so nothing is ever hidden. Tabular numerals keep
   the width fixed, so the row does not reflow while counting. */
(function () {
  var els = document.querySelectorAll('.stats .count');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var DURATION = 800;
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  function run(el) {
    var to = parseInt(el.getAttribute('data-to'), 10);
    if (isNaN(to)) return;
    var start = null;

    /* Do NOT zero the element here. If requestAnimationFrame never runs — a
       backgrounded tab, a throttled or non-compositing renderer — the real
       figure must stay on screen. "0 residents currently in training" is
       wrong information, which is strictly worse than no animation. So the
       reset to zero happens inside the first frame, and a timer forces the
       final value if the frames stall midway. */
    var settle = setTimeout(function () { el.textContent = String(to); }, DURATION + 1200);

    function step(ts) {
      if (start === null) { start = ts; el.textContent = '0'; }
      var p = Math.min((ts - start) / DURATION, 1);
      el.textContent = String(Math.round(easeOut(p) * to));
      if (p < 1) { requestAnimationFrame(step); }
      else { clearTimeout(settle); el.textContent = String(to); }
    }
    requestAnimationFrame(step);
  }

  function runAll() {
    els.forEach(run);
  }

  /* Observe the ROW, not each numeral: the four should count together, and a
     block-level container has far more reliable intersection geometry than an
     inline span. */
  var row = document.querySelector('.stats');
  var fired = false;
  function once() { if (fired) return; fired = true; runAll(); }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.disconnect();
      once();
    });
  }, { threshold: 0.25 });
  io.observe(row);

  /* Belt and braces: if the row is already on screen at load, the observer's
     first callback handles it — but if IO is throttled or never fires, a
     scroll listener picks it up. Either way the final value is already in the
     markup, so a total failure costs nothing but the animation. */
  function checkNow() {
    if (fired) return;
    var r = row.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { io.disconnect(); once(); }
  }
  window.addEventListener('scroll', checkNow, { passive: true });
  window.addEventListener('load', checkNow);
})();
