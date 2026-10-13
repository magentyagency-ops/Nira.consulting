(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav shadow on scroll */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Dropdowns: hover on desktop, click/keyboard everywhere */
  const dds = $$('.dd');
  const closeAll = (except) => dds.forEach((d) => {
    if (d === except) return;
    d.classList.remove('is-open');
    $('.dd__trigger', d).setAttribute('aria-expanded', 'false');
  });
  dds.forEach((dd) => {
    const trigger = $('.dd__trigger', dd);
    let t;
    const open = () => { clearTimeout(t); closeAll(dd); dd.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { t = setTimeout(() => { dd.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }, 120); };
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', close);
    trigger.addEventListener('click', () => (dd.classList.contains('is-open') ? (dd.classList.remove('is-open'), trigger.setAttribute('aria-expanded', 'false')) : open()));
    $$('a', dd).forEach((a) => a.addEventListener('click', () => closeAll()));
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.dd')) closeAll(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

  /* Mobile menu */
  const burger = $('.nav__burger');
  const mobile = $('#mobile-menu');
  const setMobile = (open) => {
    mobile.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    $('use', burger).setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  burger.addEventListener('click', () => setMobile(mobile.hidden));
  $$('a', mobile).forEach((a) => a.addEventListener('click', () => setMobile(false)));

  /* How-it-works tabs */
  const befores = [
    'Chaque facture était recopiée à la main.',
    'Les demandes attendaient dans une boîte mail.',
    'Les questions s\'empilaient sans réponse.',
    'Les relances étaient oubliées ou faites trop tard.',
    'Chaque réponse demandait des jours de copier-coller.',
    'L\'équipe jonglait entre 4 outils en même temps.',
  ];
  const tabs = $$('.tab');
  const panels = $$('.steps[data-panel]');
  const before = $('#how-before');
  const selectTab = (i) => {
    tabs.forEach((t, j) => { t.classList.toggle('is-active', i === j); t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    // keep the active tab visible when the tab bar scrolls (mobile)
    const bar = tabs[i].parentElement;
    if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: tabs[i].offsetLeft - (bar.clientWidth - tabs[i].offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    before.style.opacity = 0;
    setTimeout(() => { before.innerHTML = `<b>Avant</b> ${befores[i]}`; before.style.opacity = 1; }, reduced ? 0 : 180);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(i));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      tabs[n].focus(); selectTab(n);
    });
  });

  /* Testimonials carousel */
  const quotes = $$('.quote');
  const chips = $$('.qchip');
  let q = 0, timer;
  const showQuote = (i) => {
    q = (i + quotes.length) % quotes.length;
    quotes.forEach((el, j) => el.classList.toggle('is-on', j === q));
    chips.forEach((el, j) => el.classList.toggle('is-on', j === q));
  };
  const auto = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => showQuote(q + 1), 7000); };
  $('.quotes__nav--prev').addEventListener('click', () => { showQuote(q - 1); auto(); });
  $('.quotes__nav--next').addEventListener('click', () => { showQuote(q + 1); auto(); });
  chips.forEach((c) => c.addEventListener('click', () => { showQuote(+c.dataset.go); auto(); }));
  auto();

  /* FAQ: one open at a time */
  const details = $$('.faq details');
  details.forEach((d) => d.addEventListener('toggle', () => { if (d.open) details.forEach((o) => o !== d && (o.open = false)); }));

  /* Counters */
  const count = (el) => {
    const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = pre + end + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      $$('[data-count]', e.target).forEach(count);
      io.unobserve(e.target);
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* Video modal */
  const videoModal = $('#video-modal');
  const videoPlayer = $('#nira-video');
  const openVideoBtns = $$('.js-open-video');
  const closeVideoBtns = $$('.js-close-video');

  const openVideoModal = (e) => {
    if (e) e.preventDefault();
    if (!videoModal) return;
    videoModal.removeAttribute('hidden');
    // force reflow for smooth transition
    void videoModal.offsetWidth;
    videoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (videoPlayer) {
      videoPlayer.currentTime = 0;
      const playPromise = videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: video remains paused until user clicks play
        });
      }
    }
  };

  const closeVideoModal = () => {
    if (!videoModal || !videoModal.classList.contains('is-open')) return;
    videoModal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (videoPlayer) {
      videoPlayer.pause();
    }
    setTimeout(() => {
      if (!videoModal.classList.contains('is-open')) {
        videoModal.setAttribute('hidden', '');
      }
    }, 250);
  };

  openVideoBtns.forEach((btn) => btn.addEventListener('click', openVideoModal));
  closeVideoBtns.forEach((btn) => btn.addEventListener('click', closeVideoModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });


  /* Projects map: the map covers its frame; select a project to zoom on it, drag or use the buttons to move around */
  const geoRoot = $('.geo');
  if (geoRoot) {
    const stage = $('.geo__stage', geoRoot);
    const map = $('.geo__map', stage);
    const canvas = $('.geo__canvas', stage);
    const pins = $$('.geo__pin', stage);
    const ids = pins.map((p) => p.dataset.id);
    const tabs = $$('.geo__tab', geoRoot);
    const count = $('.geo__count b', geoRoot);
    const RATIO = 380.6 / 1000; // svg viewBox height / width
    const FOCUS = 1.5;
    let current = 0;
    let touched = false;
    let view = { z: 1, tx: 0, ty: 0 };
    let size = { W: 0, H: 0, cw: 0, ch: 0 };

    const apply = () => {
      const { W, H, cw, ch } = size;
      view.tx = Math.min(0, Math.max(W - cw * view.z, view.tx));
      view.ty = Math.min(0, Math.max(H - ch * view.z, view.ty));
      canvas.style.setProperty('--z', view.z);
      canvas.style.transform = `translate(${view.tx}px, ${view.ty}px) scale(${view.z})`;
    };
    const centerOn = (x, y, z) => {
      view.z = Math.min(4, Math.max(1, z));
      view.tx = size.W / 2 - x * view.z;
      view.ty = size.H / 2 - y * view.z;
      apply();
    };
    const fit = () => {
      const W = stage.clientWidth, H = stage.clientHeight;
      const cw = Math.max(W, H / RATIO);
      size = { W, H, cw, ch: cw * RATIO };
      canvas.style.width = `${cw}px`;
      apply();
    };
    const pinXY = (pin) => [parseFloat(pin.style.left) / 100 * size.cw, parseFloat(pin.style.top) / 100 * size.ch];
    // world view: centred on the projects rather than on the middle of the map
    const overview = () => {
      const pts = pins.map(pinXY);
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      centerOn((Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2, 1);
    };

    const select = (i, zoom = true) => {
      current = (i + ids.length) % ids.length;
      const id = ids[current];
      $$('.geo__country, .geo__arcs path, .geo__pin', stage).forEach((el) => el.classList.toggle('is-active', el.dataset.id === id));
      $$('.case', geoRoot).forEach((el) => { el.hidden = el.dataset.id !== id; });
      tabs.forEach((t) => { const on = t.dataset.id === id; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on); });
      count.textContent = String(current + 1).padStart(2, '0');
      // restart the arc draw
      $$('.geo__arcs path.is-active', stage).forEach((a) => { a.style.animation = 'none'; a.getBoundingClientRect(); a.style.animation = ''; });
      if (zoom) centerOn(...pinXY(pins[current]), FOCUS);
    };

    const stopAuto = () => { touched = true; geoRoot.classList.remove('is-auto'); };
    const pick = (i) => { stopAuto(); select(i); };

    /* drag to pan (a drag never counts as a click on a pin or country) */
    let drag = null, moved = false;
    map.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty, id: e.pointerId };
      moved = false;
    });
    map.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      if (!moved) { moved = true; map.setPointerCapture(drag.id); map.classList.add('is-dragging'); stage.classList.add('was-dragged'); stopAuto(); }
      view.tx = drag.tx + dx; view.ty = drag.ty + dy;
      apply();
    });
    const endDrag = () => { drag = null; map.classList.remove('is-dragging'); };
    map.addEventListener('pointerup', endDrag);
    map.addEventListener('pointercancel', endDrag);
    map.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);

    pins.forEach((p, i) => p.addEventListener('click', () => pick(i)));
    $$('.geo__country', stage).forEach((c) => c.addEventListener('click', () => pick(ids.indexOf(c.dataset.id))));
    tabs.forEach((t) => t.addEventListener('click', () => pick(ids.indexOf(t.dataset.id))));
    $$('.geo__arrow', geoRoot).forEach((b) => b.addEventListener('click', () => pick(current + Number(b.dataset.dir))));
    $$('.geo__ctrl button', stage).forEach((b) => b.addEventListener('click', () => {
      stopAuto();
      if (b.dataset.zoom === 'reset') return overview();
      const cx = (size.W / 2 - view.tx) / view.z, cy = (size.H / 2 - view.ty) / view.z;
      centerOn(cx, cy, view.z * (b.dataset.zoom === 'in' ? 1.5 : 1 / 1.5));
    }));
    $('.geo__layout', geoRoot).addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      pick(current + (e.key === 'ArrowRight' ? 1 : -1));
      const t = tabs[current]; if (t) t.focus();
    });
    $('.geo__tabs', geoRoot).addEventListener('animationend', (e) => {
      if (e.animationName === 'geo-bar' && geoRoot.classList.contains('is-auto')) select(current + 1);
    });

    let rz;
    window.addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { fit(); if (view.z > 1) centerOn(...pinXY(pins[current]), view.z); }); }, { passive: true });

    fit();
    select(0, false);
    overview();
    // zoom on the first project + autoplay once the map has swept in
    const startGeo = () => setTimeout(() => { if (touched) return; select(0); if (!reduced) geoRoot.classList.add('is-auto'); }, reduced ? 0 : 1600);
    if ('IntersectionObserver' in window) {
      const gio = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        gio.disconnect(); startGeo();
      }, { threshold: 0.35 });
      gio.observe(stage);
    } else startGeo();
  }

  $('#year').textContent = new Date().getFullYear();
})();
