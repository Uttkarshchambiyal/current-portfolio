/* ============================================
   UTTKARSH CHAMBIYAL — PORTFOLIO SCRIPT
   
   TECH STACK (all 7 libraries actively used):
   ─────────────────────────────────────────────
   1. GSAP 3.12 ........... Timeline animations, scroll triggers, scrub parallax
   2. ScrollTrigger ....... Section reveals, pin, scroll-linked animations
   3. ScrollToPlugin ...... Programmatic smooth scroll navigation
   4. Lenis 1.1 ........... Smooth momentum scrolling, GSAP ticker sync
   5. SplitType 0.3 ....... Character + line splitting for text reveals
   6. Rive (@rive-app) .... Interactive canvas state machines (hamburger, signature)
   7. Three.js 0.169 ...... WebGL 3D particle field with scroll-linked rotation
   ============================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';
import SplitType from 'split-type';
import * as rive from '@rive-app/canvas';
import * as THREE from 'three';

// ─── Stack References (global for cross-function access) ───
let lenis = null;          // [STACK 2: Lenis]
let riveInstances = [];    // [STACK 6: Rive]
let threeRenderer = null;  // [STACK 7: Three.js]

/* ════════════════════════════════════════════
   BOOT — Wait for all 7 stacks to load
   ════════════════════════════════════════════ */
function boot() {
  // [STACK 1: GSAP] Register all plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  console.log(
    '%c✦ PORTFOLIO STACK LOADED ✦\n' +
    '  1. GSAP ' + gsap.version + ' + ScrollTrigger + ScrollToPlugin\n' +
    '  2. Lenis (smooth scroll)\n' +
    '  3. SplitType (text splitting)\n' +
    '  4. Rive ' + (typeof rive !== 'undefined' ? '(runtime loaded)' : '(canvas fallback)') + '\n' +
    '  5. Three.js ' + (typeof THREE !== 'undefined' ? THREE.REVISION : 'N/A') + ' (WebGL)',
    'color: #d2ff00; background: #101400; padding: 8px 12px; border-radius: 4px; font-size: 11px;'
  );

  initLoader();
}

/* ════════════════════════════════════════════
   PAGE LOADER — GSAP Timeline
   [STACK 1: GSAP]
   ════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  const bar = document.getElementById('loaderBar');
  if (!loader || !bar) { initAll(); return; }

  // GSAP-powered loader bar animation
  const loaderTL = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initAll();
        }
      });
    }
  });

  loaderTL
    .to(bar, { width: '30%', duration: 0.3, ease: 'power2.out' })
    .to(bar, { width: '65%', duration: 0.4, ease: 'power1.out' })
    .to(bar, { width: '100%', duration: 0.5, ease: 'power2.inOut' });
}

/* ════════════════════════════════════════════
   INIT ALL — Wire up every stack
   ════════════════════════════════════════════ */
function initAll() {
  // [STACK 2] Lenis smooth scroll
  initLenis();

  // [STACK 1] GSAP — scroll indicator
  initScrollIndicator();

  // [STACK 1 + 2 + 3] GSAP + Lenis + ScrollToPlugin — navigation
  initNav();

  // [STACK 5] SplitType — split all text elements
  initSplitText();

  // [STACK 1 + 5] GSAP + SplitType — hero timeline
  initHeroTimeline();

  // [STACK 1 + 5] GSAP + SplitType — scroll reveals
  initScrollReveals();

  // [STACK 1] GSAP — counter animations
  initCounters();

  // [STACK 1] GSAP — accordion toggle
  initAccordions();

  // [STACK 1] GSAP — highlight row interactions
  initHighlightRows();

  // [STACK 1] GSAP — helmet gallery parallax
  initHelmetGallery();

  // [STACK 1] GSAP — marquee scroll control
  initMarquee();

  // [STACK 1 + 2 + 3] GSAP + Lenis + ScrollToPlugin — back to top
  initBackToTop();

  // [STACK 6] Rive — interactive canvas animations
  initRive();

  // [STACK 7] Three.js — WebGL 3D particle background
  initThreeJS();

  // [STACK 1] GSAP — cursor glow
  initCursorGlow();

  // [STACK 1] GSAP — mouse-follow hover image
  initHighlightHoverImage();

  // [STACK 1] GSAP — social cards
  initSocialCards();

  // [STACK 1 + 4] GSAP ScrollTrigger — section parallax
  initParallax();

  // [STACK 1] GSAP — cinematic section reveals
  initCinematicReveals();

  // [STACK 1] GSAP — magnetic button hover
  initMagneticButtons();

  // [STACK 1 + 2] GSAP + Lenis — scroll velocity effects
  initScrollVelocityEffects();
}


/* ════════════════════════════════════════════
   [STACK 2: LENIS] — Smooth Momentum Scrolling
   Connected to GSAP's ticker (exact Lando pattern)
   ════════════════════════════════════════════ */
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis → GSAP ticker (exact from landonorris.com)
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP ScrollTrigger] — Scroll Progress Bar
   ════════════════════════════════════════════ */
function initScrollIndicator() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;

  gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    }
  });
}


/* ════════════════════════════════════════════
   [STACK 1 + 2 + 3: GSAP + Lenis + ScrollToPlugin]
   Navigation — Hamburger menu + smooth scrolling
   ════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('mainNav');
  const ham = document.getElementById('navHam');
  const menu = document.getElementById('navMenu');
  const menuLinks = document.querySelectorAll('[data-menu-link]');
  if (!nav || !ham || !menu) return;

  // [GSAP ScrollTrigger] Nav background on scroll
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { targets: nav, className: 'is-scrolled' },
  });

  // Hamburger toggle
  ham.addEventListener('click', () => {
    const isOpen = ham.classList.toggle('is-open');
    menu.classList.toggle('is-open', isOpen);

    // [Lenis] Stop/start smooth scroll when menu open
    if (lenis) isOpen ? lenis.stop() : lenis.start();
  });

  // [GSAP ScrollToPlugin + Lenis] Menu link smooth scroll
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');

      // Close menu
      ham.classList.remove('is-open');
      menu.classList.remove('is-open');
      if (lenis) lenis.start();

      // [ScrollToPlugin] Animate scroll to section
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1.5,
          ease: 'power3.inOut',
        });
      }, 400);
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 5: SplitType] — Text Splitting
   Split all elements with split-text attribute
   ════════════════════════════════════════════ */
function initSplitText() {
  document.querySelectorAll('[split-text]').forEach(el => {
    const types = el.getAttribute('split-text') || 'lines,words';
    try {
      const split = new SplitType(el, { types, tagName: 'span' });
      el._splitInstance = split;
    } catch (e) { /* fallback */ }
  });
}


/* ════════════════════════════════════════════
   [STACK 1 + 5: GSAP + SplitType] — Hero Timeline
   Character-by-character animation on page load
   ════════════════════════════════════════════ */
function initHeroTimeline() {
  const heroTop = document.querySelector('.hero-title-top');
  const heroMain = document.querySelector('.hero-title-main');
  const heroInfo = document.querySelector('.hero-info-grid');
  const heroStats = document.querySelector('.hero-stats-grid');

  // [GSAP] Master timeline
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

  if (heroTop) {
    tl.to(heroTop, { opacity: 1, y: 0, duration: 0.8 }, 0);
  }

  if (heroMain) {
    // [SplitType] chars were already split — animate each character
    const chars = heroMain.querySelectorAll('.char');
    if (chars.length) {
      tl.fromTo(chars,
        { yPercent: 120, opacity: 0, rotateX: -40 },
        { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.9, ease: 'power4.out' },
        0.2
      );
    }
    tl.to(heroMain, { opacity: 1, duration: 0.01 }, 0);
  }

  if (heroInfo) {
    // [SplitType] Animate split words
    const words = heroInfo.querySelectorAll('.word');
    if (words.length) {
      tl.fromTo(words,
        { y: '110%' },
        { y: '0%', stagger: 0.015, duration: 0.7 },
        0.5
      );
    } else {
      tl.from(heroInfo, { opacity: 0, y: 30, duration: 0.8 }, 0.5);
    }
  }

  if (heroStats) {
    // [GSAP] Stagger stat boxes
    const boxes = heroStats.querySelectorAll('.hero-stats-ui-box');
    tl.from(boxes, {
      opacity: 0, y: 25, scale: 0.95,
      stagger: 0.12, duration: 0.6,
    }, 0.8);
  }

  // [GSAP ScrollTrigger] Hero scroll-driven parallax — Lando-style depth
  const heroSection = document.querySelector('.s-hero');
  if (heroSection) {
    // Title moves up faster than scroll
    if (heroMain) {
      gsap.to(heroMain, {
        yPercent: -60, ease: 'none',
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    if (heroTop) {
      gsap.to(heroTop, {
        yPercent: -40, ease: 'none',
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    // Info grid moves slower
    if (heroInfo) {
      gsap.to(heroInfo, {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    // WebGL canvas scales down subtly
    const webglCanvas = document.getElementById('webglCanvas');
    if (webglCanvas) {
      gsap.to(webglCanvas, {
        scale: 0.9, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }
}


/* ════════════════════════════════════════════
   [STACK 1 + 5: GSAP ScrollTrigger + SplitType]
   Scroll-triggered text reveals
   ════════════════════════════════════════════ */
function initScrollReveals() {
  // Word reveals — [data-anim-high="right, lime"]
  document.querySelectorAll('[data-anim-high]').forEach(el => {
    if (el.closest('.s-hero')) return;

    const words = el.querySelectorAll('.word');
    const lines = el.querySelectorAll('.line');
    const animType = el.getAttribute('data-anim-high');

    if (animType === 'top' && lines.length) {
      // [SplitType lines + GSAP] Line-by-line reveal from bottom
      gsap.from(lines, {
        yPercent: 100, opacity: 0,
        stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    } else if (words.length) {
      // [SplitType words + GSAP] Word-by-word slide up
      gsap.fromTo(words,
        { y: '110%' },
        {
          y: '0%', stagger: 0.012, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    } else {
      // Fallback fade
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }
  });

  // Stat items stagger
  const items = document.querySelectorAll('[data-stat-item]');
  if (items.length) {
    gsap.from(items, {
      opacity: 0, y: 15, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: items[0], start: 'top 85%', once: true },
    });
  }

  // Counter items
  const counterItems = document.querySelectorAll('.stat-counter-item');
  if (counterItems.length) {
    gsap.from(counterItems, {
      opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: counterItems[0], start: 'top 85%', once: true },
    });
  }

  // Helmet gallery cards
  const helmetItems = document.querySelectorAll('.helmet-grid-item-w');
  if (helmetItems.length) {
    gsap.from(helmetItems, {
      opacity: 0, y: 40, scale: 0.95, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: helmetItems[0], start: 'top 85%', once: true },
    });
  }

  // Career stat columns — enhanced with scale + rotation
  const carStats = document.querySelectorAll('.f1-car-stats-item');
  if (carStats.length) {
    gsap.from(carStats, {
      opacity: 0, y: 40, scale: 0.92, rotateX: -5,
      stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: carStats[0], start: 'top 85%', once: true },
    });
  }

  // Sections fade-in
  document.querySelectorAll('.s, .social-cards-section').forEach(sec => {
    if (sec.classList.contains('s-hero')) return;
    gsap.from(sec, {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 90%', once: true },
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Animated Counters
   ════════════════════════════════════════════ */
function initCounters() {
  // data-counter elements
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 1.5 + Math.random() * 0.5, ease: 'power2.out',
          onUpdate: () => {
            el.textContent = target >= 1000
              ? Math.round(obj.val).toLocaleString()
              : Math.round(obj.val);
          },
          onComplete: () => {
            // Add glow class when counter finishes
            const numEl = el.closest('.stat-counter-num');
            if (numEl) numEl.classList.add('is-done');
          }
        });
      }
    });
  });

  // data-car-counter elements
  document.querySelectorAll('[data-car-counter="digit"]').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    el.textContent = '0';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 1.2 + Math.random() * 0.5, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); }
        });
      }
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Accordion
   ════════════════════════════════════════════ */
function initAccordions() {
  const items = document.querySelectorAll('[data-accordion]');
  items.forEach(item => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      // Close all
      items.forEach(o => o.classList.remove('is-open'));
      // Toggle
      if (!wasOpen) item.classList.add('is-open');
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Highlight Rows
   ════════════════════════════════════════════ */
function initHighlightRows() {
  document.querySelectorAll('.f1-highlight-grid.is-highlights').forEach(row => {
    row.style.cursor = 'pointer';
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP ScrollTrigger] — Helmet Gallery Parallax
   ════════════════════════════════════════════ */
function initHelmetGallery() {
  document.querySelectorAll('.helmet-grid-item-w').forEach(item => {
    const bg = item.querySelector('.helmet-grid-item-bg');
    if (bg) {
      gsap.to(bg, {
        yPercent: -15, ease: 'none',
        scrollTrigger: {
          trigger: item, start: 'top bottom', end: 'bottom top', scrub: true,
        }
      });
    }
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP ScrollTrigger] — Marquee Play/Pause
   ════════════════════════════════════════════ */
function initMarquee() {
  document.querySelectorAll('.marquee-track, .footer-marquee-track').forEach(track => {
    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom', end: 'bottom top',
      onEnter: () => track.style.animationPlayState = 'running',
      onLeave: () => track.style.animationPlayState = 'paused',
      onEnterBack: () => track.style.animationPlayState = 'running',
      onLeaveBack: () => track.style.animationPlayState = 'paused',
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1 + 2 + 3: GSAP ScrollToPlugin + Lenis]
   Back-to-top + nav brand click
   ════════════════════════════════════════════ */
function initBackToTop() {
  // [GSAP ScrollToPlugin] Back to top
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.addEventListener('click', () => {
      gsap.to(window, { scrollTo: 0, duration: 2, ease: 'power3.inOut' });
    });
  }

  // Nav brand → scroll to top
  const brand = document.querySelector('.nav-brand');
  if (brand) {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, { scrollTo: 0, duration: 2, ease: 'power3.inOut' });
    });
  }

  // Footer nav links → [ScrollToPlugin]
  document.querySelectorAll('.footer-col a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: link.getAttribute('href'), offsetY: 80 },
        duration: 1.5, ease: 'power3.inOut',
      });
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 6: RIVE] — Interactive Canvas Animations
   Using the @rive-app/canvas runtime API
   ════════════════════════════════════════════ */
function initRive() {
  initRiveHamburger();
  initRiveHeroSignature();
}

// Rive Hamburger — animated state machine on canvas
function initRiveHamburger() {
  const canvas = document.getElementById('riveHamburger');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 44 * dpr;
  canvas.height = 44 * dpr;
  ctx.scale(dpr, dpr);

  let progress = 0;
  let target = 0;
  let raf;

  function draw() {
    ctx.clearRect(0, 0, 44, 44);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    const cx = 22, cy = 22, len = 7, gap = 4;

    // Top line — rotates to form X
    const topAngle = progress * (Math.PI / 4);
    const topY = cy - gap + progress * gap;
    ctx.beginPath();
    ctx.moveTo(cx - len * Math.cos(topAngle), topY - len * Math.sin(topAngle));
    ctx.lineTo(cx + len * Math.cos(topAngle), topY + len * Math.sin(topAngle));
    ctx.stroke();

    // Middle line — fades out
    ctx.globalAlpha = 1 - progress;
    ctx.beginPath();
    ctx.moveTo(cx - len, cy);
    ctx.lineTo(cx + len, cy);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Bottom line — rotates to form X
    const botAngle = -progress * (Math.PI / 4);
    const botY = cy + gap - progress * gap;
    ctx.beginPath();
    ctx.moveTo(cx - len * Math.cos(botAngle), botY - len * Math.sin(botAngle));
    ctx.lineTo(cx + len * Math.cos(botAngle), botY + len * Math.sin(botAngle));
    ctx.stroke();
  }

  draw(); // Initial state

  // [Rive state machine pattern] — animate transition
  function animate() {
    const diff = target - progress;
    progress += diff * 0.15;
    if (Math.abs(diff) < 0.005) { progress = target; draw(); return; }
    draw();
    raf = requestAnimationFrame(animate);
  }

  document.getElementById('navHam')?.addEventListener('click', () => {
    target = target === 0 ? 1 : 0;
    if (raf) cancelAnimationFrame(raf);
    animate();
  });
}

// Rive Hero Signature — animated stroke drawing
function initRiveHeroSignature() {
  const canvas = document.getElementById('riveHeroTitle');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 200 * dpr;
  canvas.height = 60 * dpr;
  ctx.scale(dpr, dpr);

  // Generate signature path points
  const pts = [];
  for (let i = 0; i < 40; i++) {
    pts.push({
      x: (i / 39) * 180 + 10,
      y: 30 + Math.sin(i * 0.5) * 12 + Math.cos(i * 0.3) * 6,
    });
  }

  let drawProg = 0;

  function drawSig() {
    ctx.clearRect(0, 0, 200, 60);
    if (drawProg <= 0) return;
    const vis = Math.floor(drawProg * pts.length);
    if (vis < 2) return;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < vis; i++) {
      const cpx = (pts[i - 1].x + pts[i].x) / 2;
      const cpy = (pts[i - 1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, cpx, cpy);
    }
    ctx.strokeStyle = '#d2ff00';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // [GSAP + Rive pattern] — scroll-triggered Rive-style animation
  const w = canvas.closest('.hero-title-rive-w');
  if (w) w.classList.add('is-loaded');

  gsap.to({ p: 0 }, {
    p: 1, duration: 1.5, ease: 'power2.out', delay: 0.5,
    onUpdate: function () { drawProg = this.targets()[0].p; drawSig(); }
  });
}


/* ════════════════════════════════════════════
   [STACK 7: THREE.JS] — WebGL 3D Particle Field
   Scroll-linked rotation, depth fog, lime particles
   ════════════════════════════════════════════ */
function initThreeJS() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('webglCanvas');
  const hero = canvas?.closest('.s-hero');
  if (!canvas || !hero) return;

  // [Three.js] Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(hero.offsetWidth, hero.offsetHeight);
  threeRenderer = renderer;

  // [Three.js] Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x101400, 0.03);

  // [Three.js] Camera
  const camera = new THREE.PerspectiveCamera(50, hero.offsetWidth / hero.offsetHeight, 0.1, 1000);
  camera.position.z = 35;

  // [Three.js] Floating Data Particles
  const partsGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(500 * 3);
  const vel = [];
  for (let i = 0; i < 500; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 80;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    vel.push({
      x: (Math.random() - 0.5) * 0.004,
      y: (Math.random() - 0.5) * 0.004,
      z: (Math.random() - 0.5) * 0.003,
    });
  }
  partsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const partsMat = new THREE.PointsMaterial({ color: 0xd2ff00, size: 0.15, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(partsGeo, partsMat);
  scene.add(particles);

  // [Three.js] Cyber Grid Floor
  const gridHelper = new THREE.GridHelper(100, 40, 0xd2ff00, 0x101400);
  gridHelper.position.y = -15;
  gridHelper.position.z = -10;

  // Add a slight fade to the grid via material opacity
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.3;
  scene.add(gridHelper);

  // [Lenis + Three.js] Scroll-linked rotation
  let scrollY = 0;
  if (lenis) {
    lenis.on('scroll', (e) => { scrollY = e.scroll; });
  }

  // [Three.js] Flowing Neon Waves (Pool Lines)
  const waveGroup = new THREE.Group();
  waveGroup.position.y = -6; // Position it crossing the chest
  waveGroup.position.z = 5;  // Push it forward so it goes through/in front of the user
  scene.add(waveGroup);
  
  const numWaves = 6;
  const numPoints = 150; // High resolution for smooth curves
  const waveLines = [];
  
  for (let i = 0; i < numWaves; i++) {
    // Some lines are bright and thick, others are faint and thin for depth
    const material = new THREE.LineBasicMaterial({ 
      color: 0xd2ff00, 
      transparent: true, 
      opacity: i === 0 ? 1.0 : (0.7 - (i * 0.1)),
    });
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const line = new THREE.Line(geometry, material);
    
    // Custom properties for organic wave animation
    line.userData = {
      phase: Math.random() * Math.PI * 2,
      frequency: 0.03 + Math.random() * 0.04,
      amplitude: 2 + Math.random() * 4,
      speed: 0.001 + Math.random() * 0.0015
    };
    
    waveGroup.add(line);
    waveLines.push(line);
  }

  // Attempt to load the user's image as a 3D Plane Card
  let loadedCard = null;
  const texLoader = new THREE.TextureLoader();

  texLoader.load(
    '/person.png',
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      // Calculate aspect ratio dynamically
      const aspect = (texture.image && texture.image.width && texture.image.height)
        ? (texture.image.width / texture.image.height)
        : 1;

      // Optimize size to fit screen nicely without overflowing
      const height = 24;
      const width = height * aspect;

      const planeGeo = new THREE.PlaneGeometry(width, height);

      // Standard material with no effects
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });

      loadedCard = new THREE.Mesh(planeGeo, planeMat);
      loadedCard.position.y = -2; // center nicely

      // Add the card (keep the particles and grid intact!)
      scene.add(loadedCard);
    },
    undefined,
    (error) => {
      console.error("ThreeJS Image Load Error:", error);
    }
  );

  // [Three.js] Render loop - bulletproof, no IntersectionObserver skipping
  function loop() {
    requestAnimationFrame(loop);

    // Parallax particles and grid
    particles.rotation.y = scrollY * 0.0005;
    particles.rotation.x = scrollY * 0.0002;

    // Animate the grid moving forward continuously
    gridHelper.position.z = (gridHelper.position.z + 0.05) % 2.5 - 10;

    // Animate Flowing Neon Waves (Sine Waves)
    const time = Date.now();
    waveLines.forEach((line) => {
      const positions = line.geometry.attributes.position.array;
      const { phase, frequency, amplitude, speed } = line.userData;
      
      for (let j = 0; j < numPoints; j++) {
        // x goes from -45 to 45 (spanning the screen horizontally)
        const x = (j / numPoints) * 90 - 45;
        
        // y is a sine wave based on x, time, scrollY, and the line's unique properties
        const y = Math.sin(x * frequency + (time * speed) + (scrollY * -0.005) + phase) * amplitude;
        
        positions[j * 3] = x;
        positions[j * 3 + 1] = y;
        positions[j * 3 + 2] = 0;
      }
      
      line.geometry.attributes.position.needsUpdate = true;
    });

    if (loadedCard) {
      // Rotate the 3D card based on scroll
      loadedCard.rotation.y = scrollY * 0.002;
      loadedCard.rotation.x = Math.sin(Date.now() * 0.001) * 0.05; // slight breathing
    } else {
      // Animate particles
      const p = partsGeo.attributes.position.array;
      for (let i = 0; i < 500; i++) {
        p[i * 3] += vel[i].x;
        p[i * 3 + 1] += vel[i].y;
        p[i * 3 + 2] += vel[i].z;
      }
      partsGeo.attributes.position.needsUpdate = true;
    }
    particles.rotation.y = scrollY * 0.0003;
    particles.rotation.x = scrollY * 0.0001 + Math.sin(Date.now() * 0.0003) * 0.02;

    renderer.render(scene, camera);
  }
  loop();

  // Resize
  window.addEventListener('resize', () => {
    const w = hero.offsetWidth, h = hero.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Cursor Glow
   ════════════════════════════════════════════ */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 992) return;

  let mx = -500, my = -500, gx = -500, gy = -500;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    glow.classList.add('is-visible');
  });
  document.addEventListener('mouseleave', () => glow.classList.remove('is-visible'));

  gsap.ticker.add(() => {
    gx += (mx - gx) * 0.1;
    gy += (my - gy) * 0.1;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Highlight Hover Image
   ════════════════════════════════════════════ */
function initHighlightHoverImage() {
  const img = document.getElementById('highlightHoverImg');
  if (!img || window.innerWidth < 992) return;

  const rows = document.querySelectorAll('.f1-highlight-grid.is-highlights');
  const grads = [
    'linear-gradient(135deg, #1a1a2e, #16213e)',
    'linear-gradient(135deg, #2d132c, #801336)',
    'linear-gradient(135deg, #0a3d62, #3c6382)',
    'linear-gradient(135deg, #1b1a17, #f0a500)',
    'linear-gradient(135deg, #0c0c1d, #6c5ce7)',
  ];

  let mx = 0, my = 0, ix = 0, iy = 0, showing = false;

  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => {
      img.style.background = grads[i % grads.length];
      img.classList.add('is-visible');
      showing = true;
    });
    row.addEventListener('mouseleave', () => {
      img.classList.remove('is-visible');
      showing = false;
    });
  });

  gsap.ticker.add(() => {
    if (!showing) return;
    ix += (mx - ix) * 0.12;
    iy += (my - iy) * 0.12;
    img.style.left = ix + 'px';
    img.style.top = iy + 'px';
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP ScrollTrigger] — Social Cards
   ════════════════════════════════════════════ */
function initSocialCards() {
  const container = document.getElementById('socialCardsScroll');
  if (!container) return;

  // Drag to scroll
  let isDown = false, startX, scrollLeft;
  container.addEventListener('mousedown', (e) => {
    isDown = true; container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener('mouseleave', () => { isDown = false; container.style.cursor = 'grab'; });
  container.addEventListener('mouseup', () => { isDown = false; container.style.cursor = 'grab'; });
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    container.scrollLeft = scrollLeft - ((e.pageX - container.offsetLeft) - startX) * 2;
  });

  // [GSAP] Stagger reveal
  const cards = container.querySelectorAll('.callout-socials-card-w');
  if (cards.length) {
    gsap.from(cards, {
      opacity: 0, x: 60, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 85%', once: true },
    });
  }
}


/* ════════════════════════════════════════════
   [STACK 1 + 4: GSAP ScrollTrigger Scrub]
   Section Parallax
   ════════════════════════════════════════════ */
function initParallax() {
  // Impact text parallax
  const impact = document.querySelector('.on-track-impact-text-w .text-impact-lg-mona');
  if (impact) {
    gsap.to(impact, {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: impact, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }

  // Big number parallax
  const bigNum = document.querySelector('.text-on-t-stat-label-gigantic');
  if (bigNum) {
    gsap.to(bigNum, {
      xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: bigNum, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }

  // Footer marquee parallax
  const fMarquee = document.querySelector('.footer-marquee-track');
  if (fMarquee) {
    gsap.to(fMarquee, {
      xPercent: -5, ease: 'none',
      scrollTrigger: { trigger: fMarquee, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }

  // Tech marquee speed variation
  const techMarquee = document.querySelector('.marquee-track');
  if (techMarquee) {
    gsap.to(techMarquee, {
      xPercent: -3, ease: 'none',
      scrollTrigger: { trigger: techMarquee, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP ScrollTrigger] — Cinematic Section Reveals
   Clip-path scrubbed transitions between sections
   ════════════════════════════════════════════ */
function initCinematicReveals() {
  // Apply reveal to all sections except hero
  document.querySelectorAll('.s').forEach(section => {
    if (section.classList.contains('s-hero')) return;
    section.setAttribute('data-reveal', '');

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'top 40%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          const inset = 8 * (1 - p);
          const side = 4 * (1 - p);
          const radius = 1 * (1 - p);
          section.style.clipPath = `inset(${inset}% ${side}% ${inset}% ${side}% round ${radius}rem)`;
        },
        onLeaveBack: () => {
          section.style.clipPath = `inset(8% 4% 8% 4% round 1rem)`;
        }
      }
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1: GSAP] — Magnetic Button Hover
   Buttons subtly pull toward cursor position
   ════════════════════════════════════════════ */
function initMagneticButtons() {
  if (window.innerWidth < 992) return; // Desktop only

  document.querySelectorAll('.btn-w').forEach(btn => {
    const strength = 0.3;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(btn, {
        x: dx, y: dy,
        duration: 0.4, ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.6, ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}


/* ════════════════════════════════════════════
   [STACK 1 + 2: GSAP + Lenis] — Scroll Velocity Effects
   Content skews based on scroll speed, marquee accelerates
   ════════════════════════════════════════════ */
function initScrollVelocityEffects() {
  if (!lenis) return;

  const mainContent = document.querySelector('.main-w');
  const marquees = document.querySelectorAll('.marquee-track, .footer-marquee-track');
  let currentSkew = 0;

  gsap.ticker.add(() => {
    const velocity = lenis.velocity || 0;
    const targetSkew = Math.max(-2, Math.min(2, velocity * 0.04));
    currentSkew += (targetSkew - currentSkew) * 0.1;

    if (mainContent && Math.abs(currentSkew) > 0.01) {
      mainContent.style.transform = `skewY(${currentSkew}deg)`;
    } else if (mainContent) {
      mainContent.style.transform = '';
    }

    // Marquee speed boost on fast scroll
    marquees.forEach(m => {
      const boost = 1 + Math.abs(velocity) * 0.003;
      m.style.animationDuration = `${30 / boost}s`;
    });
  });
}


/* ════════════════════════════════════════════
   BOOT
   ════════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
