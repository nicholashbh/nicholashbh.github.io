/* Album lightbox.
   Built on <dialog>, so Escape, the backdrop and focus trapping are the
   browser's job rather than ours. Every control is a real <button> with a
   word on it — no icon glyphs anywhere on this site.

   Degrades honestly: with JavaScript off the thumbnails are still ordinary
   links to the full-size file, so the album remains browsable. */
(function () {
  var grid = document.querySelector('[data-gallery]');
  var dlg = document.getElementById('lightbox');
  if (!grid || !dlg || typeof dlg.showModal !== 'function') return;

  var shots = Array.prototype.slice.call(grid.querySelectorAll('[data-full]'));
  if (!shots.length) return;

  var img = dlg.querySelector('[data-lb-img]');
  var cap = dlg.querySelector('[data-lb-cap]');
  var count = dlg.querySelector('[data-lb-count]');
  var prev = dlg.querySelector('[data-lb-prev]');
  var next = dlg.querySelector('[data-lb-next]');
  var i = 0;
  var opener = null;

  function show(n) {
    i = (n + shots.length) % shots.length;
    var el = shots[i];
    img.src = el.getAttribute('data-full');
    img.alt = el.getAttribute('data-alt') || '';
    cap.textContent = el.getAttribute('data-cap') || '';
    count.textContent = (i + 1) + ' of ' + shots.length;
  }

  shots.forEach(function (el, n) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      opener = el;
      show(n);
      dlg.showModal();
    });
  });

  prev.addEventListener('click', function () { show(i - 1); });
  next.addEventListener('click', function () { show(i + 1); });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });

  /* Drop the full-size image so it is not left decoded in memory, and return
     focus to the thumbnail that opened the dialog — otherwise a keyboard user
     is dumped back at the top of the document. */
  function restore() {
    img.removeAttribute('src');
    if (opener) { opener.focus(); opener = null; }
  }

  /* `close` is the correct hook and fires in every browser that ships
     <dialog>. It is not the only hook, because it is queued rather than
     dispatched synchronously: the two paths we own call restore() directly,
     leaving only Escape to rely on the event. Calling restore() twice is
     harmless — the second call has nothing left to do. */
  dlg.addEventListener('close', restore);

  /* Clicking the backdrop closes. The check is on the dialog itself rather
     than a wrapper, because the backdrop is not a child node. */
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) { dlg.close(); restore(); }
  });

  var closeBtn = dlg.querySelector('.lightbox__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      /* the button is inside <form method="dialog">, so the close itself is
         the browser's; we only need the cleanup */
      setTimeout(restore, 0);
    });
  }
})();
