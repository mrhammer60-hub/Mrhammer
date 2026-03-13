/**
 * workout.js — Workout page + exercise detail logic
 */

const Workout = (() => {
  // State
  let completedExercises = [];
  let currentExercise    = null;
  let timerInterval      = null;
  let timerSecs          = 0;
  let setData            = {};   // { [exId]: [{weight, reps, done}] }
  let showingHistory     = false;

  // ── Render exercise list ──────────────────────────────────────────────────
  function render() {
    const list = document.getElementById('exercisesList');
    list.innerHTML = '';

    WORKOUT.exercises.forEach(ex => {
      const isDone = completedExercises.includes(ex.id);
      const muscleColor = ex.muscle === 'Chest' ? 'var(--orange)'
                        : ex.muscle === 'Shoulders' ? 'var(--blue)'
                        : 'var(--muted)';
      const levelClass = ex.level === 'advanced' ? 'badge-accent' : 'badge-green';

      const card = document.createElement('div');
      card.className = 'ex-card' + (isDone ? ' done' : '');
      if (!isDone) card.onclick = () => openDetail(ex.id);

      card.innerHTML = `
        <div class="ex-emoji">${ex.emoji}</div>
        <div class="ex-info">
          <div class="ex-info-top">
            <div class="ex-name-ar">${ex.nameAr}</div>
            ${isDone ? '<span class="ex-done-check">✓</span>' : ''}
          </div>
          <div class="ex-name-en">${ex.nameEn}</div>
          <div class="ex-tags">
            <span class="badge badge-blue">${ex.sets} sets</span>
            <span class="badge badge-accent">${ex.reps} reps</span>
            <span class="badge badge-muted">⏱ ${ex.rest}s</span>
            <span class="badge" style="background:${muscleColor}20;border:1px solid ${muscleColor}40;color:${muscleColor}">${ex.muscle}</span>
          </div>
        </div>`;
      list.appendChild(card);
    });

    const cnt = completedExercises.length;
    document.getElementById('wkProgressText').textContent = cnt + '/' + WORKOUT.exercises.length;
    document.getElementById('wkProgressBar').style.width  = (cnt / WORKOUT.exercises.length * 100) + '%';
  }

  // ── Open exercise detail overlay ──────────────────────────────────────────
  function openDetail(exId) {
    currentExercise = WORKOUT.exercises.find(e => e.id === exId);
    const ex = currentExercise;
    showingHistory  = false;

    document.getElementById('exDetailOverlay').classList.add('open');
    document.getElementById('exHeroEmoji').textContent  = ex.emoji;
    document.getElementById('exDetailName').textContent = ex.nameAr;
    document.getElementById('exDetailEn').textContent   = ex.nameEn;
    document.getElementById('exLevelBadge').textContent = ex.level;
    document.getElementById('exLevelBadge').className   = 'badge ' + (ex.level === 'advanced' ? 'badge-accent' : 'badge-green');
    document.getElementById('exRestVal').textContent     = ex.rest + 's';

    document.getElementById('exDetailMeta').innerHTML = `
      <span class="badge badge-blue">${ex.sets} sets</span>
      <span class="badge badge-accent">${ex.reps} reps</span>
      <span class="badge badge-muted">⏱ ${ex.rest}s راحة</span>
      <span class="badge badge-orange">${ex.muscle}</span>`;

    // History panel
    const lastWeek = ex.history[ex.history.length - 1];
    document.getElementById('historyBox').classList.remove('open');
    document.getElementById('histSets').innerHTML = lastWeek.sets.map((s, i) => `
      <div class="hist-set">
        <div class="hist-set-num">Set ${i + 1}</div>
        <div class="hist-set-w">${s.w}kg</div>
        <div class="hist-set-r">${s.r} reps</div>
      </div>`).join('');

    // Init set data if first time
    if (!setData[exId]) {
      setData[exId] = Array.from({ length: ex.sets }, () => ({ weight: '', reps: '', done: false }));
    }
    renderSetRows(ex);

    // Start timer
    clearInterval(timerInterval);
    timerSecs = 0;
    document.getElementById('exTimer').textContent = '00:00';
    timerInterval = setInterval(() => {
      timerSecs++;
      const m = String(Math.floor(timerSecs / 60)).padStart(2, '0');
      const s = String(timerSecs % 60).padStart(2, '0');
      document.getElementById('exTimer').textContent = m + ':' + s;
    }, 1000);
  }

  // ── Render set rows ───────────────────────────────────────────────────────
  function renderSetRows(ex) {
    const rows    = document.getElementById('setsRows');
    const data    = setData[ex.id];
    const lastWk  = ex.history[ex.history.length - 1];
    rows.innerHTML = '';

    data.forEach((s, i) => {
      const prev = lastWk.sets[i];
      const row  = document.createElement('div');
      row.className = 'set-row' + (s.done ? ' set-done' : '');

      row.innerHTML = `
        <div class="set-num">${i + 1}</div>
        <div class="set-input-wrap">
          <input type="number" class="set-input${s.done ? ' done' : ''}"
            value="${s.weight}" placeholder="${prev ? prev.w : 0}"
            oninput="Workout.updateSet(${ex.id},${i},'weight',this.value)">
          ${prev ? `<div class="set-prev">prev: ${prev.w}kg</div>` : ''}
        </div>
        <div class="set-input-wrap">
          <input type="number" class="set-input${s.done ? ' done' : ''}"
            value="${s.reps}" placeholder="${prev ? prev.r : ex.reps.split('-')[0]}"
            oninput="Workout.updateSet(${ex.id},${i},'reps',this.value)">
          ${prev ? `<div class="set-prev">prev: ${prev.r}</div>` : ''}
        </div>
        <div class="set-check-btn${s.done ? ' checked' : ''}"
             onclick="Workout.toggleSetDone(${ex.id},${i})">
          ${s.done ? '✓' : ''}
        </div>`;
      rows.appendChild(row);
    });
  }

  // ── Set data mutations ────────────────────────────────────────────────────
  function updateSet(exId, setIdx, field, val) {
    setData[exId][setIdx][field] = val;
  }

  function toggleSetDone(exId, setIdx) {
    setData[exId][setIdx].done = !setData[exId][setIdx].done;
    renderSetRows(currentExercise);
  }

  function toggleHistory() {
    showingHistory = !showingHistory;
    document.getElementById('historyBox').classList.toggle('open', showingHistory);
  }

  // ── Close detail ──────────────────────────────────────────────────────────
  function closeDetail() {
    document.getElementById('exDetailOverlay').classList.remove('open');
    clearInterval(timerInterval);
    currentExercise = null;
  }

  // ── Complete exercise ─────────────────────────────────────────────────────
  function complete() {
    if (currentExercise && !completedExercises.includes(currentExercise.id)) {
      completedExercises.push(currentExercise.id);
    }
    closeDetail();
    render();
  }

  // Public API
  return { render, openDetail, updateSet, toggleSetDone, toggleHistory, closeDetail, complete };
})();

// Global helpers called from HTML onclick attributes
function closeExDetail()    { Workout.closeDetail(); }
function completeExercise() { Workout.complete(); }
function toggleHistory()    { Workout.toggleHistory(); }
