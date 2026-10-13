(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* Scroll lock shared by the mobile menu and the video modals */
  let locks = 0;
  const lockScroll = (on) => {
    locks = Math.max(0, locks + (on ? 1 : -1));
    root.style.overflow = document.body.style.overflow = locks ? 'hidden' : '';
  };

  /* Horizontal swipe on touch screens (vertical scrolling is left alone) */
  const onSwipe = (el, cb) => {
    let x0 = null, y0 = 0;
    el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) cb(dx < 0 ? 1 : -1);
    }, { passive: true });
  };

  /* Nav shadow on scroll */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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
  if (dds.length) {
    document.addEventListener('click', (e) => { if (!e.target.closest('.dd')) closeAll(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  }

  /* Mobile menu */
  const burger = $('.nav__burger');
  const mobile = $('#mobile-menu');
  if (burger && mobile) {
    const setMobile = (open) => {
      if (open === !mobile.hidden) return;
      mobile.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      $('use', burger).setAttribute('href', open ? '#i-close' : '#i-menu');
      // on phones the panel fills the screen below the bar (CSS reads --menu-top)
      if (open) mobile.style.setProperty('--menu-top', `${Math.max(0, Math.round(mobile.getBoundingClientRect().top))}px`);
      lockScroll(open);
    };
    burger.addEventListener('click', () => setMobile(mobile.hidden));
    $$('a', mobile).forEach((a) => a.addEventListener('click', () => setMobile(false)));
    document.addEventListener('click', (e) => { if (!mobile.hidden && !e.target.closest('#nav')) setMobile(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobile.hidden) { setMobile(false); burger.focus(); } });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setMobile(false); });
  }

  /* Use-case examples (tabs) */
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
  if (tabs.length && panels.length) {
    const selectTab = (i) => {
      tabs.forEach((t, j) => { t.classList.toggle('is-active', i === j); t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      // keep the active tab visible when the tab bar scrolls
      const bar = tabs[i].parentElement;
      if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: tabs[i].offsetLeft - (bar.clientWidth - tabs[i].offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      if (before) {
        before.style.opacity = 0;
        setTimeout(() => { before.innerHTML = `<b>Avant</b> ${befores[i]}`; before.style.opacity = 1; }, reduced ? 0 : 180);
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => selectTab(i));
      t.addEventListener('keydown', (e) => {
        const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        const n = (to + tabs.length) % tabs.length;
        tabs[n].focus(); selectTab(n);
      });
    });

    /* Deep links (#uc-factures, #uc-relances…) from the menu, the footer or another page:
       open the matching example and bring the whole section into view */
    const section = $('#cas-d-usage');
    const openUseCase = (hash, smooth) => {
      const i = tabs.findIndex((t) => t.id && `#${t.id}` === hash);
      if (i < 0) return false;
      selectTab(i);
      (section || tabs[i]).scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto', block: 'start' });
      return true;
    };
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#uc-"]');
      if (a && openUseCase(a.getAttribute('href'), true)) { e.preventDefault(); history.pushState(null, '', a.getAttribute('href')); }
    });
    window.addEventListener('hashchange', () => openUseCase(location.hash, true));
    if (/^#uc-/.test(location.hash)) {
      openUseCase(location.hash, false);
      window.addEventListener('load', () => openUseCase(location.hash, false), { once: true });
    }
  }

  /* Testimonials carousel */
  const quotes = $$('.quote');
  const chips = $$('.qchip');
  if (quotes.length) {
    let q = 0, timer;
    const showQuote = (i) => {
      q = (i + quotes.length) % quotes.length;
      quotes.forEach((el, j) => el.classList.toggle('is-on', j === q));
      chips.forEach((el, j) => { el.classList.toggle('is-on', j === q); el.setAttribute('aria-pressed', String(j === q)); });
    };
    const auto = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => showQuote(q + 1), 7000); };
    $('.quotes__nav--prev')?.addEventListener('click', () => { showQuote(q - 1); auto(); });
    $('.quotes__nav--next')?.addEventListener('click', () => { showQuote(q + 1); auto(); });
    chips.forEach((c) => c.addEventListener('click', () => { showQuote(+c.dataset.go); auto(); }));
    const viewport = $('.quotes__viewport');
    if (viewport) onSwipe(viewport, (d) => { showQuote(q + d); auto(); });
    auto();
  }

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

  /* Method reel preview: loads and plays only near the screen (saves data and battery on phones);
     the poster stays still for people who prefer reduced motion */
  const reel = $('.social-reel__vid');
  let reelVisible = false;
  const reelPlay = () => { if (reel && reelVisible && !reduced && !$('.video-modal.is-open')) reel.play()?.catch(() => {}); };
  if (reel) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { reelVisible = en.isIntersecting; if (reelVisible) reelPlay(); else reel.pause(); }, { rootMargin: '200px 0px' }).observe(reel);
    } else { reelVisible = true; reelPlay(); }
  }

  /* Video modals */
  let lastFocus = null;
  const openVideoModal = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const id = btn.getAttribute('aria-controls') || (btn.getAttribute('href') || '#video-modal').replace('#', '');
    const modal = document.getElementById(id);
    if (!modal || modal.classList.contains('is-open')) return;
    lastFocus = btn;
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('is-open');
    lockScroll(true);
    reel?.pause();
    $('.video-modal__close', modal)?.focus({ preventScroll: true });
    const player = $('video', modal);
    if (player) {
      player.currentTime = 0;
      player.play()?.catch(() => {});
    }
  };
  const closeVideoModal = (modal) => {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    lockScroll(false);
    $('video', modal)?.pause();
    setTimeout(() => { if (!modal.classList.contains('is-open')) modal.hidden = true; }, 250);
    lastFocus?.focus({ preventScroll: true });
    reelPlay();
  };
  $$('.js-open-video').forEach((btn) => btn.addEventListener('click', openVideoModal));
  $$('.js-close-video').forEach((btn) => btn.addEventListener('click', (e) => closeVideoModal(e.currentTarget.closest('.video-modal'))));
  document.addEventListener('keydown', (e) => {
    const open = $('.video-modal.is-open');
    if (!open) return;
    if (e.key === 'Escape') { closeVideoModal(open); return; }
    if (e.key !== 'Tab') return;
    // keep keyboard focus inside the dialog
    const items = [$('.video-modal__close', open), $('video', open)].filter(Boolean);
    const first = items[0], last = items[items.length - 1];
    if (!open.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Projects map: a still world map that covers its frame; picking a country lights it up and shows its project */
  const geoRoot = $('.geo');
  if (geoRoot) {
    const stage = $('.geo__stage', geoRoot);
    const canvas = $('.geo__canvas', stage);
    const pins = $$('.geo__pin', stage);
    const ids = pins.map((p) => p.dataset.id);
    const tabs = $$('.geo__tab', geoRoot);
    const counter = $('.geo__count b', geoRoot);
    const RATIO = 380.6 / 1000; // svg viewBox height / width
    let current = 0;

    // size the map to cover the frame, centred on the projects
    const fit = () => {
      const W = stage.clientWidth, H = stage.clientHeight;
      const cw = Math.max(W, H / RATIO), ch = cw * RATIO;
      const xs = pins.map((p) => parseFloat(p.style.left) / 100 * cw);
      const ys = pins.map((p) => parseFloat(p.style.top) / 100 * ch);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const tx = Math.min(0, Math.max(W - cw, W / 2 - cx));
      const ty = Math.min(0, Math.max(H - ch, H / 2 - cy));
      canvas.style.width = `${cw}px`;
      canvas.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    const select = (i) => {
      current = (i + ids.length) % ids.length;
      const id = ids[current];
      $$('.geo__country, .geo__arcs path, .geo__pin', stage).forEach((el) => el.classList.toggle('is-active', el.dataset.id === id));
      $$('.case', geoRoot).forEach((el) => { el.hidden = el.dataset.id !== id; });
      tabs.forEach((t) => { const on = t.dataset.id === id; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on); });
      counter.textContent = String(current + 1).padStart(2, '0');
      // replay the arc draw
      $$('.geo__arcs path.is-active', stage).forEach((a) => { a.style.animation = 'none'; a.getBoundingClientRect(); a.style.animation = ''; });
    };

    pins.forEach((p, i) => p.addEventListener('click', () => select(i)));
    $$('.geo__country', stage).forEach((c) => c.addEventListener('click', () => select(ids.indexOf(c.dataset.id))));
    tabs.forEach((t) => t.addEventListener('click', () => select(ids.indexOf(t.dataset.id))));
    $$('.geo__arrow', geoRoot).forEach((b) => b.addEventListener('click', () => select(current + Number(b.dataset.dir))));
    $('.geo__layout', geoRoot).addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      select(current + (e.key === 'ArrowRight' ? 1 : -1));
      tabs[current].focus();
    });
    const panel = $('.geo__panel', geoRoot);
    if (panel) onSwipe(panel, (d) => select(current + d));

    let rz;
    window.addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(fit); }, { passive: true });
    fit();
    select(0);
  }

  /* Legal pages: table of contents open on wide screens, folded on phones, current section highlighted */
  const toc = $('.legal__toc');
  if (toc) {
    const wide = window.matchMedia('(min-width: 901px)');
    const sync = () => { toc.open = wide.matches; };
    sync();
    wide.addEventListener('change', sync);
    const links = $$('a[href^="#"]', toc);
    links.forEach((a) => a.addEventListener('click', () => { if (!wide.matches) toc.open = false; }));
    const sections = $$('.legal__body section[id]');
    let spyFrame;
    const spy = () => {
      // current section = last one whose top has passed 35% of the screen (the last one once the page bottom is reached)
      let cur = sections[0];
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= innerHeight * 0.35) cur = s; });
      if (innerHeight + scrollY >= root.scrollHeight - 2) cur = sections[sections.length - 1];
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${cur.id}`));
    };
    if (sections.length) {
      window.addEventListener('scroll', () => { cancelAnimationFrame(spyFrame); spyFrame = requestAnimationFrame(spy); }, { passive: true });
      spy();
    }
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
