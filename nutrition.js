/**
 * nutrition.js — Nutrition page logic
 */

const Nutrition = (() => {
  // State
  let selectedOptions = {};

  // ── Render all meals ──────────────────────────────────────────────────────
  function render() {
    const list = document.getElementById('mealsList');
    list.innerHTML = '';

    NUTRITION.meals.forEach(meal => {
      const sel = selectedOptions[meal.id];
      const card = document.createElement('div');
      card.className = 'meal-card' + (sel ? ' has-selection' : '');
      card.id = 'mealCard-' + meal.id;

      const optionsHTML = meal.options.map(opt => {
        const isSelected = sel && sel.id === opt.id;
        return `
          <div class="option-card ${isSelected ? 'selected' : ''}" id="opt-${opt.id}"
               onclick="Nutrition.selectOption(${meal.id},'${opt.id}')">
            <div class="opt-top">
              <div class="opt-radio-wrap">
                <div class="opt-radio ${isSelected ? 'checked'}">
                  <div class="opt-radio-inner"></div>
                </div>
                <span class="opt-name">${opt.label}</span>
              </div>
              <span class="opt-kcal">${opt.cal} kcal</span>
            </div>
            <div class="opt-macros">
              <span class="opt-macro" style="color:var(--blue)"><b>${opt.p}g</b> P</span>
              <span class="opt-macro" style="color:var(--accent)"><b>${opt.c}g</b> C</span>
              <span class="opt-macro" style="color:var(--orange)"><b>${opt.f}g</b> F</span>
            </div>
            <div class="opt-foods">
              ${opt.foods.map(f => `<span class="food-tag">${f}</span>`).join('')}
            </div>
          </div>`;
      }).join('');

      card.innerHTML = `
        <div class="meal-header" onclick="Nutrition.toggleMeal(${meal.id})">
          <div>
            <div class="meal-info-name">${meal.name}</div>
            <div class="meal-info-sub">🕐 ${meal.time} · ${meal.options.length} خيارات</div>
          </div>
          <div class="meal-right">
            ${sel ? `<div class="meal-kcal-badge">${sel.cal} kcal</div>` : ''}
            <div class="meal-chevron" id="chev-${meal.id}">▼</div>
          </div>
        </div>
        <div class="meal-options" id="mealOpts-${meal.id}">
          <div class="opt-section-label">اختر وجبتك</div>
          ${optionsHTML}
        </div>`;

      list.appendChild(card);
    });

    updateRings();
  }

  // ── Toggle meal accordion ─────────────────────────────────────────────────
  function toggleMeal(id) {
    const opts = document.getElementById('mealOpts-' + id);
    const chev = document.getElementById('chev-' + id);
    const isOpen = opts.classList.contains('open');

    // Close all
    document.querySelectorAll('.meal-options').forEach(o => o.classList.remove('open'));
    document.querySelectorAll('.meal-chevron').forEach(c => c.classList.remove('open'));

    if (!isOpen) {
      opts.classList.add('open');
      chev.classList.add('open');
    }
  }

  // ── Select / deselect a meal option ──────────────────────────────────────
  function selectOption(mealId, optId) {
    const meal = NUTRITION.meals.find(m => m.id === mealId);
    const opt  = meal.options.find(o => o.id === optId);
    const curr = selectedOptions[mealId];

    if (curr && curr.id === optId) {
      delete selectedOptions[mealId];
    } else {
      selectedOptions[mealId] = opt;
    }

    render();
    // Re-open after re-render
    const opts = document.getElementById('mealOpts-' + mealId);
    const chev = document.getElementById('chev-' + mealId);
    opts.classList.add('open');
    chev.classList.add('open');
  }

  // ── Update macro rings & numbers ──────────────────────────────────────────
  function updateRings() {
    const totals = Object.values(selectedOptions).reduce(
      (a, o) => ({ cal: a.cal + o.cal, p: a.p + o.p, c: a.c + o.c, f: a.f + o.f }),
      { cal: 0, p: 0, c: 0, f: 0 }
    );

    const { targetCalories: maxCal, protein: maxP, carbs: maxC, fat: maxF } = NUTRITION;
    const CIRC = 213.6;

    // Calorie bar
    document.getElementById('calConsumed').textContent = totals.cal;
    document.getElementById('calBar').style.width = Math.min(totals.cal / maxCal * 100, 100) + '%';

    // Rings
    function setRing(id, textId, val, max) {
      const pct = Math.min(val / max, 1);
      document.getElementById(id).setAttribute('stroke-dasharray', `${pct * CIRC} ${CIRC}`);
      document.getElementById(textId).textContent = val;
    }
    setRing('ringP', 'ringPText', totals.p, maxP);
    setRing('ringC', 'ringCText', totals.c, maxC);
    setRing('ringF', 'ringFText', totals.f, maxF);

    // Numbers
    document.getElementById('macroP').textContent = totals.p + 'g';
    document.getElementById('macroC').textContent = totals.c + 'g';
    document.getElementById('macroF').textContent = totals.f + 'g';
  }

  // Public API
  return { render, toggleMeal, selectOption };
})();
