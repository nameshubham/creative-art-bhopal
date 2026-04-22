'use strict';

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ---- HAMBURGER / MOBILE MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobile();
  });
}

function closeMobile() {
  if (!mobileMenu || !hamburger) return;
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- HERO PARALLAX (home page only) ---- */
const heroBgImg = document.querySelector('.hero-bg-img');
if (heroBgImg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBgImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

/* ---- HERO SHAPE MOUSE PARALLAX ---- */
const heroShapes = document.querySelectorAll('.hero-shape');
if (heroShapes.length) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroShapes.forEach((shape, i) => {
      const depth = (i + 1) * 8;
      shape.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  }, { passive: true });
}

/* ---- GALLERY FILTERS ---- */
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity       = match ? '1' : '0.2';
      item.style.transform     = match ? 'scale(1)' : 'scale(0.97)';
      item.style.transition    = 'opacity 0.4s ease, transform 0.4s ease';
      item.style.pointerEvents = match ? 'all' : 'none';
    });
  });
});

/* ---- LIGHTBOX ---- */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox)      lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* ---- FAQ ACCORDION ---- */
function toggleFaq(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    const btn = el.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('open');
    const btn = item.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

/* ---- CONTACT FORM ---- */
function submitForm(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submit  = document.getElementById('formSubmit');
  if (!form || !success || !submit) return;

  submit.textContent = 'Sending…';
  submit.disabled    = true;

  setTimeout(() => {
    form.reset();
    success.style.display  = 'block';
    submit.textContent     = 'Send Enquiry →';
    submit.disabled        = false;
    setTimeout(() => { success.style.display = 'none'; }, 6000);
  }, 1400);
}

/* ---- SERVICE CARD ICON colour on hover ---- */
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.querySelector('.service-icon');
  card.addEventListener('mouseenter', () => { if (icon) icon.style.filter = 'brightness(0) invert(1)'; });
  card.addEventListener('mouseleave', () => { if (icon) icon.style.filter = ''; });
});

/* ---- STICKY CTA — hide when footer visible ---- */
const stickyCta = document.getElementById('stickyCta');
const footer    = document.getElementById('footer');

if (stickyCta && footer) {
  stickyCta.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  const ctaObserver = new IntersectionObserver((entries) => {
    stickyCta.style.opacity   = entries[0].isIntersecting ? '0' : '1';
    stickyCta.style.transform = entries[0].isIntersecting ? 'translateY(100%)' : 'translateY(0)';
  }, { threshold: 0.1 });
  ctaObserver.observe(footer);
}

/* ---- DATE INPUT: set min to today ---- */
const dateInput = document.getElementById('fdate');
if (dateInput) {
  dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
}

console.log('%c✨ Creative Art Bhopal', 'font-size:18px;color:#C4714A;font-weight:bold');
console.log('%cCrafting creativity with soul.', 'font-size:12px;color:#6B5744');
