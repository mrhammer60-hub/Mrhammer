/**
 * app.js — Main app controller
 * Handles: page switching, profile panel, swipe gesture, init
 */

const App = (() => {
  let currentPage  = 'home';
  let touchStartX  = null;
  let mouseStartX  = null;

  // ── Page switching ────────────────────────────────────────────────────────
  function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.getElementById('nav-'  + page).classList.add('active');
    currentPage = page;
  }

  // ── Profile panel ─────────────────────────────────────────────────────────
  function openProfile() {
    document.getElementById('profileOverlay').classList.add('open');
  }
  function closeProfile() {
    document.getElementById('profileOverlay').classList.remove('open');
  }

  // ── Swipe right → open profile ────────────────────────────────────────────
  function initSwipe() {
    const app = document.getElementById('app');

    // Touch
    app.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    app.addEventListener('touchend', e => {
      if (touchStartX !== null) {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (diff > 80) openProfile();
        touchStartX = null;
      }
    }, { passive: true });

    // Mouse (desktop testing)
    app.addEventListener('mousedown', e => { mouseStartX = e.clientX; });
    app.addEventListener('mouseup', e => {
      if (mouseStartX !== null) {
        const diff = e.clientX - mouseStartX;
        if (diff > 80 && !document.getElementById('profileOverlay').classList.contains('open')) {
          openProfile();
        }
        mouseStartX = null;
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    Nutrition.render();
    Workout.render();
    Progress.renderChart('weight');
    initSwipe();
  }

  return { switchPage, openProfile, closeProfile, init };
})();

// Global helpers (called from HTML onclick attributes)
function switchPage(page)  { App.switchPage(page); }
function openProfile()     { App.openProfile(); }
function closeProfile()    { App.closeProfile(); }

// Bootstrap
document.addEventListener('DOMContentLoaded', () => App.init());
