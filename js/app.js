// ============================================================
// APP.JS — Entry point: navigation, theme, 24h toggle
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Populate city dropdown grouped by continent
  const select = document.getElementById('citySelect');
  const continents = [...new Set(CITIES.map(c => c.continent))].sort();
  continents.forEach(continent => {
    const group = document.createElement('optgroup');
    group.label = continent;
    CITIES.filter(c => c.continent === continent)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = `${city.flag} ${city.name}, ${city.country}`;
        group.appendChild(opt);
      });
    select.appendChild(group);
  });

  // Init modules
  Clocks.init(Storage.load());
  Converter.init();

  // Add city
  document.getElementById('addCityBtn').addEventListener('click', () => {
    const cityId = select.value;
    if (!cityId) { showToast('Please select a city first'); return; }
    const city = CITIES.find(c => c.id === cityId);
    if (Clocks.add(cityId)) { showToast(`${city.flag} ${city.name} added!`); select.value = ''; }
  });
  select.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('addCityBtn').click(); });

  // Clear all
  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Remove all cities?')) Clocks.clearAll();
  });

  // Sort dropdown
  const sortBtn = document.getElementById('sortBtn');
  const sortDropdown = document.getElementById('sortDropdown');
  sortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sortDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => sortDropdown.classList.remove('open'));
  sortDropdown.querySelectorAll('.sort-option').forEach(btn => {
    btn.addEventListener('click', () => {
      sortDropdown.querySelectorAll('.sort-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Clocks.applySort(btn.dataset.sort);
      sortDropdown.classList.remove('open');
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = themeToggle.querySelector('.theme-icon');
  const savedTheme  = localStorage.getItem('globaltime_theme') || 'dark';
  applyTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next); localStorage.setItem('globaltime_theme', next);
  });
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // 24h toggle — update everything on change
  const toggle24 = document.getElementById('toggle24h');
  const saved24h  = localStorage.getItem('globaltime_24h') === 'true';
  toggle24.checked = saved24h;
  toggle24.addEventListener('change', () => {
    localStorage.setItem('globaltime_24h', toggle24.checked);
    // Force re-render of all clock cards immediately
    document.querySelectorAll('.clock-card').forEach(card => {
      const city = CITIES.find(c => c.id === card.dataset.cityId);
      if (!city) return;
      const parts = getTimeParts(city.timezone, is24h());
      card.querySelector('.hours').textContent   = parts.hour;
      card.querySelector('.minutes').textContent = parts.minute;
      card.querySelector('.seconds').textContent = parts.second;
      card.querySelector('.clock-ampm').textContent = parts.ampm;
    });
    // Also re-render converter if visible
    Converter.renderSliders();
  });

  // Nav
  const navBtns = document.querySelectorAll('.nav-btn');
  const views   = document.querySelectorAll('.view');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      views.forEach(v => v.classList.toggle('active', v.id === `view-${btn.dataset.view}`));
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === '1') document.querySelector('[data-view="clocks"]').click();
    if (e.key === '2') document.querySelector('[data-view="converter"]').click();
    if (e.key === 't' || e.key === 'T') themeToggle.click();
  });
});
