// ============================================================
// CLOCKS.JS — Clock card rendering and live tick
// ============================================================
const Clocks = (() => {
  let activeCityIds = [];
  let originalOrder = [];

  function render() {
    const grid = document.getElementById('clocksGrid');
    const empty = document.getElementById('emptyState');
    grid.querySelectorAll('.clock-card').forEach(el => el.remove());
    if (activeCityIds.length === 0) { empty.style.display = 'flex'; return; }
    empty.style.display = 'none';
    activeCityIds.forEach(id => {
      const city = CITIES.find(c => c.id === id);
      if (!city) return;
      grid.appendChild(createCard(city));
    });
  }

  function createCard(city) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.cityId = city.id;
    card.innerHTML = `
      <div class="card-header">
        <div class="city-info">
          <span class="city-flag">${city.flag}</span>
          <div>
            <div class="city-name">${city.name}</div>
            <div class="city-country">${city.country}</div>
          </div>
        </div>
        <button class="remove-btn" title="Remove" data-id="${city.id}">✕</button>
      </div>
      <div class="clock-display">
        <div class="clock-time">
          <span class="hours">--</span>:<span class="minutes">--</span><span class="seconds-sep">:</span><span class="seconds">--</span>
          <span class="clock-ampm"></span>
        </div>
        <div class="clock-date"></div>
      </div>
      <div class="clock-meta">
        <span class="clock-timezone">${city.timezone}</span>
        <span class="daynight-badge">--</span>
        <span class="utc-offset">${getUTCOffset(city.timezone)}</span>
      </div>
    `;
    card.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation(); remove(city.id);
    });
    updateCard(card, city);
    return card;
  }

  function updateCard(card, city) {
    const parts = getTimeParts(city.timezone, is24h());
    const day = isDay(city.timezone);
    card.querySelector('.hours').textContent   = parts.hour;
    card.querySelector('.minutes').textContent = parts.minute;
    card.querySelector('.seconds').textContent = parts.second;
    card.querySelector('.clock-ampm').textContent = parts.ampm;
    card.querySelector('.clock-date').textContent =
      `${parts.dayName}, ${parts.monthName} ${parts.day}, ${parts.year}`;
    const badge = card.querySelector('.daynight-badge');
    badge.textContent = day ? '☀ Day' : '🌙 Night';
    badge.className = 'daynight-badge ' + (day ? 'day' : 'night');
  }

  function tick() {
    document.querySelectorAll('.clock-card').forEach(card => {
      const city = CITIES.find(c => c.id === card.dataset.cityId);
      if (city) updateCard(card, city);
    });
  }

  function add(cityId) {
    if (activeCityIds.includes(cityId)) { showToast('City already added!'); return false; }
    activeCityIds.push(cityId);
    originalOrder.push(cityId);
    Storage.save(activeCityIds);
    render();
    return true;
  }

  function remove(cityId) {
    activeCityIds = activeCityIds.filter(id => id !== cityId);
    originalOrder = originalOrder.filter(id => id !== cityId);
    Storage.save(activeCityIds);
    const card = document.querySelector(`.clock-card[data-city-id="${cityId}"]`);
    if (card) {
      card.style.transform = 'scale(0.9)'; card.style.opacity = '0';
      card.style.transition = 'all 0.25s ease';
      setTimeout(() => { card.remove(); checkEmpty(); }, 250);
    }
  }

  function checkEmpty() {
    const empty = document.getElementById('emptyState');
    if (activeCityIds.length === 0) empty.style.display = 'flex';
  }

  function applySort(type) {
    if (type === 'alpha-asc') {
      activeCityIds.sort((a, b) => {
        const ca = CITIES.find(c => c.id === a), cb = CITIES.find(c => c.id === b);
        return (ca?.name || '').localeCompare(cb?.name || '');
      });
      showToast('Sorted A → Z');
    } else if (type === 'alpha-desc') {
      activeCityIds.sort((a, b) => {
        const ca = CITIES.find(c => c.id === a), cb = CITIES.find(c => c.id === b);
        return (cb?.name || '').localeCompare(ca?.name || '');
      });
      showToast('Sorted Z → A');
    } else if (type === 'utc-asc') {
      activeCityIds.sort((a, b) => {
        const ca = CITIES.find(c => c.id === a), cb = CITIES.find(c => c.id === b);
        return getTimezoneOffsetHours(ca?.timezone) - getTimezoneOffsetHours(cb?.timezone);
      });
      showToast('Sorted West → East');
    } else if (type === 'utc-desc') {
      activeCityIds.sort((a, b) => {
        const ca = CITIES.find(c => c.id === a), cb = CITIES.find(c => c.id === b);
        return getTimezoneOffsetHours(cb?.timezone) - getTimezoneOffsetHours(ca?.timezone);
      });
      showToast('Sorted East → West');
    } else if (type === 'custom') {
      activeCityIds = [...originalOrder];
      showToast('Restored original order');
    }
    Storage.save(activeCityIds);
    render();
  }

  function clearAll() {
    activeCityIds = []; originalOrder = [];
    Storage.save(activeCityIds); render(); showToast('All cities removed');
  }

  function init(savedIds) {
    activeCityIds = savedIds.filter(id => CITIES.some(c => c.id === id));
    originalOrder = [...activeCityIds];
    render();
    setInterval(tick, 1000);
  }

  function getActiveCityIds() { return [...activeCityIds]; }
  return { init, add, remove, applySort, clearAll, getActiveCityIds };
})();
