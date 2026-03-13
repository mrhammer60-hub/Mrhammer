/**
 * progress.js — Progress / chart logic
 */

const Progress = (() => {
  let activeMetric = 'weight';

  // ── Render chart ──────────────────────────────────────────────────────────
  function renderChart(metric) {
    activeMetric = metric;
    const data   = CHART_DATA[metric];
    const vals   = data.map(d => d.v);
    const min    = Math.min(...vals);
    const max    = Math.max(...vals);
    const color  = metric === 'weight' ? 'var(--white)'
                 : metric === 'fat'    ? 'var(--orange)'
                 : 'var(--blue)';

    const bars = document.getElementById('chartBars');
    bars.innerHTML = '';

    data.forEach((d, i) => {
      const h      = ((d.v - min) / (max - min || 1)) * 60 + 10;
      const isLast = i === data.length - 1;
      const col    = document.createElement('div');
      col.className = 'chart-bar-col';
      col.innerHTML = `
        <div class="chart-bar-val">${d.v}</div>
        <div class="chart-bar" style="height:${h}px;background:${isLast ? 'var(--accent)' : color + '60'}"></div>
        <div class="chart-bar-date">${d.d.split(' ')[0]}</div>`;
      bars.appendChild(col);
    });
  }

  return { renderChart };
})();

// Global helper called from HTML onclick
function setChart(metric, btn) {
  document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  Progress.renderChart(metric);
}
