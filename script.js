/* ============================================================
   AVIK KAYAL — PORTFOLIO SCRIPTS
   script.js
   ============================================================ */

/* ─── 1. CUSTOM CURSOR ─── */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
})();


/* ─── 2. HAMBURGER MOBILE MENU ─── */
(function initHamburger() {
  const ham      = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!ham || !navLinks) return;

  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate burger spans
    const spans = ham.querySelectorAll('span');
    const open  = navLinks.classList.contains('open');
    if (spans.length >= 3) {
      spans[0].style.transform  = open ? 'translateY(6.5px) rotate(45deg)'  : '';
      spans[1].style.opacity    = open ? '0' : '1';
      spans[2].style.transform  = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    })
  );
})();


/* ─── 3. THEME TOGGLE ─── */
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  let dark = true;

  btn.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.textContent = dark ? '🌙' : '☀️';
  });
})();


/* ─── 4. NAV SCROLL BACKGROUND ─── */
(function initNavScroll() {
  const nav  = document.getElementById('navbar');
  if (!nav) return;

  let dark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    nav.style.background = scrolled
      ? (dark() ? 'rgba(10,10,12,0.95)' : 'rgba(240,237,232,0.95)')
      : (dark() ? 'rgba(10,10,12,0.72)' : 'rgba(240,237,232,0.80)');
  }, { passive: true });
})();


/* ─── 5. TYPING EFFECT ─── */
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases  = [
    'Storyteller', 'Graphics Designer', 'Web Developer',
    'ECE B.Tech Student', 'Writer', 'Voice Artist', 'Video Editor'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 55 : 95);
  }

  setTimeout(type, 1200);
})();


/* ─── 6. SCROLL REVEAL ─── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();


/* ─── 7. SKILL BARS ─── */
(function initSkillBars() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  obs.observe(grid);
})();


/* ─── 8. HERO PARTICLES ─── */
(function initParticles() {
  const canvas  = document.getElementById('hero-particles');
  const section = document.getElementById('home');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Build particles
  const COUNT = 60;
  const particles = Array.from({ length: COUNT }, () => ({
    x:   Math.random() * 2000,
    y:   Math.random() * 1000,
    r:   Math.random() * 1.5 + 0.25,
    vx:  (Math.random() - 0.5) * 0.22,
    vy:  (Math.random() - 0.5) * 0.22,
    a:   Math.random() * 0.42 + 0.07,
    red: Math.random() < 0.28,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      const px = ((p.x % W) + W) % W;
      const py = ((p.y % H) + H) % H;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.red
        ? `rgba(232,19,43,${p.a})`
        : `rgba(245,240,235,${p.a * 0.4})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ─── 9. PORTFOLIO FILTER TABS ─── */
(function initPortfolioFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pf-card');
  if (!btns.length || !cards.length) return;

  // Scroll reveal for cards on load
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.10 });
  cards.forEach(c => revealObs.observe(c));

  // Filter logic
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let delay = 0;

      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);

        if (!show) {
          card.style.transition = 'opacity .25s ease, transform .25s ease';
          card.style.opacity    = '0';
          card.style.transform  = 'translateY(16px) scale(0.97)';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        } else {
          if (card.style.display === 'none') {
            card.style.display    = '';
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(16px) scale(0.97)';
          }
          setTimeout(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease, border-color .4s ease, box-shadow .4s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0) scale(1)';
          }, delay);
          delay += 75;
        }
      });
    });
  });
})();


/* ─── 10. PORTFOLIO CARD 3D TILT ─── */
(function initCardTilt() {
  document.querySelectorAll('.pf-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .10s ease, box-shadow .4s ease, border-color .4s ease';
    });

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left  - rect.width  / 2;
      const y    = e.clientY - rect.top   - rect.height / 2;
      const tX   = (y  / rect.height) * 7;
      const tY   = -(x / rect.width)  * 7;
      card.style.transform = `translateY(-10px) scale(1.015) rotateX(${tX}deg) rotateY(${tY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .55s cubic-bezier(0.34,1.56,0.64,1), box-shadow .4s ease, border-color .4s ease';
      card.style.transform  = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
    });
  });
})();


/* ─── 11. CONTACT FORM ─── */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type=submit]');
  const success = document.getElementById('form-success');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  setTimeout(() => {
    btn.innerHTML       = '<i class="fas fa-check"></i> Sent!';
    if (success) success.style.display = 'block';
    e.target.reset();

    setTimeout(() => {
      btn.innerHTML      = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled       = false;
      if (success) success.style.display = 'none';
    }, 4000);
  }, 1500);
}