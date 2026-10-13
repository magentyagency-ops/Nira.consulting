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
  const titles = [
    "Comment une facture reçue par email arrive dans votre ERP, sans une saisie",
    "Comment un nouveau lead atteint le bon commercial en quelques secondes",
    "Comment un ticket client trouve la bonne réponse, sans attendre",
  ];
  const tabs = $$('.tab');
  const panels = $$('.steps[data-panel]');
  const title = $('#how-title');
  const selectTab = (i) => {
    tabs.forEach((t, j) => { t.classList.toggle('is-active', i === j); t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    title.style.opacity = 0;
    setTimeout(() => { title.textContent = titles[i]; title.style.opacity = 1; }, reduced ? 0 : 180);
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


  /* Projects map: select a country, zoom toward it, autoplay until the visitor interacts */
  const geoRoot = $('.geo');
  if (geoRoot) {
    const geo = $('.geo__stage', geoRoot);
    const canvas = $('.geo__canvas', geo);
    const pins = $$('.geo__pin', geo);
    const ids = pins.map((p) => p.dataset.id);
    const tabs = $$('.geo__tab', geoRoot);
    const count = $('.geo__count b', geoRoot);
    const bar = $('.geo__progress i', geoRoot);
    let current = 0;
    let touched = false;

    const zoomTo = (pin) => {
      const z = window.innerWidth > 900 ? 1.45 : 1.4;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      const px = parseFloat(pin.style.left) / 100 * w;
      const py = parseFloat(pin.style.top) / 100 * h;
      const tx = Math.min(0, Math.max(w - w * z, w / 2 - px * z));
      const ty = Math.min(0, Math.max(h - h * z, h / 2 - py * z));
      canvas.style.setProperty('--z', z);
      canvas.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`;
    };

    const select = (i) => {
      current = (i + ids.length) % ids.length;
      const id = ids[current];
      $$('.geo__country, .geo__arcs path, .geo__pin', geo).forEach((el) => el.classList.toggle('is-active', el.dataset.id === id));
      $$('.case', geoRoot).forEach((el) => { el.hidden = el.dataset.id !== id; });
      tabs.forEach((t) => { const on = t.dataset.id === id; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on); });
      count.textContent = String(current + 1).padStart(2, '0');
      // restart the arc draw and progress animations
      $$('.geo__arcs path.is-active', geo).forEach((a) => { a.style.animation = 'none'; a.getBoundingClientRect(); a.style.animation = ''; });
      bar.style.animation = 'none'; bar.getBoundingClientRect(); bar.style.animation = '';
      zoomTo(pins[current]);
    };

    const stopAuto = () => { touched = true; geoRoot.classList.remove('is-auto'); };
    const pick = (id) => { stopAuto(); select(ids.indexOf(id)); };

    pins.forEach((p) => p.addEventListener('click', () => pick(p.dataset.id)));
    $$('.geo__country', geo).forEach((c) => c.addEventListener('click', () => pick(c.dataset.id)));
    tabs.forEach((t) => t.addEventListener('click', () => pick(t.dataset.id)));
    $$('.geo__arrow', geoRoot).forEach((b) => b.addEventListener('click', () => { stopAuto(); select(current + Number(b.dataset.dir)); }));
    bar.addEventListener('animationend', () => { if (geoRoot.classList.contains('is-auto')) select(current + 1); });
    window.addEventListener('resize', () => zoomTo(pins[current]), { passive: true });

    select(0);
    canvas.style.transform = 'none';
    canvas.style.setProperty('--z', 1);
    // start zoom + autoplay once the map has swept in
    const startGeo = () => setTimeout(() => { if (touched) return; select(0); if (!reduced) geoRoot.classList.add('is-auto'); }, reduced ? 0 : 1600);
    if ('IntersectionObserver' in window) {
      const gio = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        gio.disconnect(); startGeo();
      }, { threshold: 0.35 });
      gio.observe(geo);
    } else startGeo();
  }

  $('#year').textContent = new Date().getFullYear();
})();
