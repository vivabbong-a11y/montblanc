/* =========================================================
   Montblanc 소개 페이지: interactions
   - Header state, mobile menu
   - Reveal on scroll (IntersectionObserver)
   - GSAP + ScrollTrigger: star ring rotation, scroll-fill text,
     pinned horizontal timeline (desktop), counters
   - Collections carousel (vanilla, keyboard usable)
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* ---------- Header: solid on scroll + mobile menu ---------- */
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-solid', window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const setMenu = (open) => {
    if (!header || !toggle) return;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const label = toggle.querySelector('.visually-hidden');
    if (label) label.textContent = open ? '메뉴 닫기' : '메뉴 열기';
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
  }

  /* ---------- Hero intro ---------- */
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-ready'));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // small stagger for siblings revealed together
        const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
        const index = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = `${Math.min(index, 5) * 0.1}s`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('.count[data-count]');
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    if (reduceMotion.matches || !hasGsap) { el.textContent = String(target); return; }
    const obj = { v: 0 };
    window.gsap.to(obj, {
      v: target, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); }
    });
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => {
      if (!reduceMotion.matches && hasGsap) el.textContent = '0';
      cio.observe(el);
    });
  }

  /* ---------- Scroll-fill text: split into words ---------- */
  const fill = document.querySelector('[data-fill]');
  let fillWords = [];
  if (fill && hasGsap && !reduceMotion.matches) {
    const words = fill.textContent.trim().split(/\s+/);
    fill.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = w;
      fill.appendChild(span);
      if (i < words.length - 1) fill.appendChild(document.createTextNode(' '));
    });
    fill.classList.add('is-split');
    fillWords = [...fill.querySelectorAll('.w')];
  }

  /* ---------- Collections carousel ---------- */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const cards = track ? [...track.children] : [];
    const section = carousel.closest('section');
    const btns = section ? section.querySelectorAll('.carousel-btn') : [];
    const currentEl = section ? section.querySelector('[data-current]') : null;
    const totalEl = section ? section.querySelector('[data-total]') : null;
    const pad = (n) => String(n).padStart(2, '0');
    if (totalEl) totalEl.textContent = pad(cards.length);

    const currentIndex = () => {
      if (!track || !cards.length) return 0;
      const start = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).scrollPaddingInlineStart || 0);
      let best = 0; let bestDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - start);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    };
    const update = () => {
      if (!track) return;
      const i = currentIndex();
      if (currentEl) currentEl.textContent = pad(i + 1);
      const maxScroll = track.scrollWidth - track.clientWidth - 2;
      btns.forEach((b) => {
        const dir = Number(b.dataset.dir);
        b.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= maxScroll;
      });
    };
    const go = (dir) => {
      if (!track || !cards.length) return;
      const next = Math.min(cards.length - 1, Math.max(0, currentIndex() + dir));
      const delta = cards[next].getBoundingClientRect().left - cards[currentIndex()].getBoundingClientRect().left;
      track.scrollBy({ left: delta, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };
    btns.forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.dir))));
    if (track) {
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      });
      let raf = 0;
      track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
      window.addEventListener('resize', update);
      update();
    }
  }

  /* ---------- GSAP scroll animations ---------- */
  if (!hasGsap) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Motion allowed (any width)
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Hero image slow zoom-out on scroll
    const heroImg = document.querySelector('.hero__media img');
    if (heroImg) {
      gsap.fromTo(heroImg, { scale: 1.08 }, {
        scale: 1, yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    // Star ring: rotate 0 → 60° across the story section
    const ring = document.querySelector('.emblem__ring');
    if (ring) {
      gsap.to(ring, {
        rotation: 60, ease: 'none', transformOrigin: '50% 50%',
        scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    }

    // Scroll-fill paragraph
    if (fillWords.length) {
      gsap.to(fillWords, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: fill, start: 'top 80%', end: 'bottom 45%', scrub: true }
      });
    }

    // Closing star: slow rotation
    const closingStar = document.querySelector('.closing__star');
    if (closingStar) {
      gsap.fromTo(closingStar, { rotation: -30 }, {
        rotation: 30, ease: 'none',
        scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  });

  // Desktop + motion allowed: pinned horizontal timeline
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const section = document.querySelector('.history');
    const track = section ? section.querySelector('.history__track') : null;
    const bar = section ? section.querySelector('.history__progress span') : null;
    if (!section || !track) return undefined;

    section.classList.add('is-horizontal');
    const items = [...track.querySelectorAll('.year-item')];
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; }
      }
    });

    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        containerAnimation: tween,
        start: 'left 60%',
        end: 'right 60%',
        toggleClass: { targets: item, className: 'is-active' }
      });
    });

    return () => {
      section.classList.remove('is-horizontal');
      items.forEach((i) => i.classList.remove('is-active'));
      gsap.set(track, { clearProps: 'transform' });
    };
  });

  // Recalculate after fonts/images settle
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
