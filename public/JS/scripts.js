
/* ── LOADER ──────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 1700);
});

/* ── CURSOR (desktop) ────────────────────────────────────── */
const cDot   = document.getElementById('cDot');
const cRing  = document.getElementById('cRing');
const cLabel = document.getElementById('cLabel');

if (cDot) {
  let mx = -100, my = -100, rx = -100, ry = -100;
  let clicking = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cDot.style.left = mx + 'px';
    cDot.style.top  = my + 'px';
    cLabel.style.left = mx + 'px';
    cLabel.style.top  = (my + 28) + 'px';
  });

  document.addEventListener('mousedown', () => {
    clicking = true;
    cRing.classList.add('click');
  });
  document.addEventListener('mouseup', () => {
    clicking = false;
    cRing.classList.remove('click');
  });

  (function tick() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    cRing.style.left = rx + 'px';
    cRing.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  // Expand on interactive elements
  document.querySelectorAll('a, button, .proj, .service-item, .play-circle').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cRing.classList.add('expand');
      const lbl = el.dataset.cursor;
      if (lbl) { cLabel.textContent = lbl; cLabel.classList.add('show'); }
    });
    el.addEventListener('mouseleave', () => {
      cRing.classList.remove('expand');
      cLabel.classList.remove('show');
    });
  });
}

/* ── NAVBAR ──────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ─────────────────────────────────────────── */
const burger   = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
function closeMobile() {
  mobileNav.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── SMOOTH ANCHOR ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -140px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ── PARALLAX (subtle, hero only) ───────────────────────── */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  }
}, { passive: true });

// Mes Realisations 

document.getElementById("playBtn").onclick = function() {
  window.open("https://drive.google.com/drive/folders/16nkPYsV7lsfxNFkvvOhS2UBckTpuag-K", "_blank");
};

/* ── COUNTER ANIMATION ───────────────────────────────────── */
function countUp(el, target, suffix = '', duration = 2000) {
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const val = Math.round(ease * target);
    el.innerHTML = el.innerHTML.replace(/\d+/, val);
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const resultsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cells = entry.target.querySelectorAll('.result-number');
      const targets = [3, 10, 8];
      cells.forEach((c, i) => countUp(c, targets[i]));
      resultsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const resultsGrid = document.querySelector('.results-grid');
if (resultsGrid) resultsObs.observe(resultsGrid);


