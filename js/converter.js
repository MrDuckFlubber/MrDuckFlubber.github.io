// ============================================================
// CONVERTER.JS — Slider-based timezone converter
// ============================================================
const Converter = (() => {
  let sourceCity = null, targetCity = null;
  let currentHour = new Date().getHours();
  let currentMinute = Math.floor(new Date().getMinutes() / 15) * 15;
  let clockInterval = null, isDragging = false, dragSource = null;

  function init() {
    buildCitySearches();
    setDefaultCities();
    startClock();
    document.getElementById('convertBtn').addEventListener('click', doConvert);
  }

  function buildCitySearches() {
    const si = document.getElementById('sourceSearchInput');
    const ti = document.getElementById('targetSearchInput');
    const sd = document.getElementById('sourceDropdown');
    const td = document.getElementById('targetDropdown');
    setupSearch(si, sd, city => { sourceCity = city; si.value = `${city.flag} ${city.name}`; sd.style.display = 'none'; renderSliders(); });
    setupSearch(ti, td, city => { targetCity = city; ti.value = `${city.flag} ${city.name}`; td.style.display = 'none'; renderSliders(); });
    document.addEventListener('click', e => {
      if (!si.contains(e.target)) sd.style.display = 'none';
      if (!ti.contains(e.target)) td.style.display = 'none';
    });
  }

  function setupSearch(input, dropdown, onSelect) {
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      dropdown.innerHTML = '';
      const matches = q.length < 1
        ? CITIES.slice(0, 12)
        : CITIES.filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 12);
      if (!matches.length) { dropdown.style.display = 'none'; return; }
      matches.forEach(city => {
        const item = document.createElement('div');
        item.className = 'search-dropdown-item';
        item.textContent = `${city.flag} ${city.name}, ${city.country}`;
        item.addEventListener('mousedown', e => { e.preventDefault(); onSelect(city); });
        dropdown.appendChild(item);
      });
      dropdown.style.display = 'block';
    });
    input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
  }

  function setDefaultCities() {
    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const local = CITIES.find(c => c.timezone === localTZ) || CITIES.find(c => c.id === 'new-york');
    const remote = CITIES.find(c => c.id === 'tokyo') || CITIES[0];
    sourceCity = local; targetCity = remote;
    document.getElementById('sourceSearchInput').value = `${local.flag} ${local.name}`;
    document.getElementById('targetSearchInput').value = `${remote.flag} ${remote.name}`;
    renderSliders();
  }

  function startDrag(e, source) {
    isDragging = true; dragSource = source;
    if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
    onDrag(e);
  }

  function onDrag(e) {
    if (!isDragging) return;
    const trackId = dragSource === 'source' ? 'sourceTrack' : 'targetTrack';
    const track = document.getElementById(trackId);
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const totalMinutes = Math.round(pct * 24 * 60 / 15) * 15;
    const hour = Math.floor(totalMinutes / 60) % 24;
    const minute = totalMinutes % 60;
    if (dragSource === 'source') {
      currentHour = hour; currentMinute = minute;
    } else if (sourceCity && targetCity) {
      const diff = getTimezoneOffsetHours(sourceCity.timezone) - getTimezoneOffsetHours(targetCity.timezone);
      const tgt = hour * 60 + minute;
      const src = ((tgt + diff * 60) % (24 * 60) + 24 * 60) % (24 * 60);
      currentHour = Math.floor(src / 60); currentMinute = src % 60;
    } else { currentHour = hour; currentMinute = minute; }
    renderSliders();
  }

  function endDrag() { if (isDragging) { isDragging = false; dragSource = null; startClock(); } }

  function startClock() {
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(() => {
      if (!isDragging) {
        const now = new Date(); currentHour = now.getHours(); currentMinute = now.getMinutes();
        renderSliders();
      }
    }, 10000);
  }

  function getTimeInTimezone(sH, sM, sTZ, tTZ) {
    const diff = getTimezoneOffsetHours(tTZ) - getTimezoneOffsetHours(sTZ);
    const total = sH * 60 + sM + diff * 60;
    const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
    return { hour: Math.floor(wrapped / 60), minute: Math.floor(wrapped % 60) };
  }

  function formatTime(hour, minute) {
    const use24 = is24h();
    if (use24) return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
    const ap = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:${String(minute).padStart(2,'0')} ${ap}`;
  }

  function getDateOffset(sH, sM, sTZ, tTZ) {
    const diff = getTimezoneOffsetHours(tTZ) - getTimezoneOffsetHours(sTZ);
    const total = sH * 60 + sM + diff * 60;
    if (total < 0) return -1;
    if (total >= 24 * 60) return +1;
    return 0;
  }

  function buildOffsetStr(offsetH) {
    const absH = Math.floor(Math.abs(offsetH));
    const absM = Math.round((Math.abs(offsetH) - absH) * 60);
    const sign = offsetH >= 0 ? '+' : '-';
    return absM > 0 ? `UTC${sign}${absH}:${String(absM).padStart(2,'0')}` : `UTC${sign}${absH}`;
  }

  function buildTimeBar(hour, minute, isDay) {
    const pct = ((hour * 60 + minute) / (24 * 60)) * 100;
    let ticks = '';
    for (let h = 0; h < 24; h += 6) {
      const tp = (h / 24) * 100;
      const label = h === 0 ? '12am' : h === 6 ? '6am' : h === 12 ? '12pm' : '6pm';
      ticks += `<div class="slider-tick" style="left:${tp}%">${label}</div>`;
    }
    return `
      <div class="slider-track-bg">
        <div class="slider-night-zone" style="width:25%"></div>
        <div class="slider-day-zone" style="width:50%"></div>
        <div class="slider-night-zone" style="width:25%"></div>
        <div class="slider-thumb ${isDay ? 'day' : 'night'}" style="left:${pct}%">
          <div class="slider-thumb-time">${formatTime(hour, minute)}</div>
        </div>
      </div>
      <div class="slider-ticks">${ticks}</div>
    `;
  }

  function renderSliders() {
    if (!sourceCity || !targetCity) return;
    const sH = currentHour, sM = currentMinute;
    const { hour: tH, minute: tM } = getTimeInTimezone(sH, sM, sourceCity.timezone, targetCity.timezone);
    const srcOff = getTimezoneOffsetHours(sourceCity.timezone);
    const tgtOff = getTimezoneOffsetHours(targetCity.timezone);
    const diffH = tgtOff - srcOff;
    const diffSign = diffH >= 0 ? '+' : '';
    const diffStr = Number.isInteger(diffH) ? `${diffSign}${diffH}h` : `${diffSign}${diffH.toFixed(1)}h`;
    const srcOffStr = buildOffsetStr(srcOff);
    const tgtOffStr = buildOffsetStr(tgtOff);
    const dayOff = getDateOffset(sH, sM, sourceCity.timezone, targetCity.timezone);
    const dayOffStr = dayOff === +1 ? '+1 day' : dayOff === -1 ? '-1 day' : '';
    const srcDay = sH >= 6 && sH < 18;
    const tgtDay = tH >= 6 && tH < 18;

    document.getElementById('converterResults').innerHTML = `
      <div class="slider-converter">
        <div class="slider-row" id="sourceSliderRow">
          <div class="slider-city-header">
            <div class="slider-city-info">
              <span class="slider-city-flag">${sourceCity.flag}</span>
              <div>
                <div class="slider-city-name">${sourceCity.name}</div>
                <div class="slider-city-tz">${srcOffStr} · ${sourceCity.timezone.replace(/_/g,' ')}</div>
              </div>
            </div>
            <div class="slider-city-time ${srcDay ? 'day' : 'night'}">${formatTime(sH, sM)}</div>
          </div>
          <div class="slider-track-wrap" id="sourceTrack">${buildTimeBar(sH, sM, srcDay)}</div>
        </div>
        <div class="slider-diff-badge">
          ${diffH === 0 ? 'Same time zone' : `${diffStr} difference`}
          ${dayOffStr ? `<span class="diff-day">${dayOffStr}</span>` : ''}
        </div>
        <div class="slider-row" id="targetSliderRow">
          <div class="slider-city-header">
            <div class="slider-city-info">
              <span class="slider-city-flag">${targetCity.flag}</span>
              <div>
                <div class="slider-city-name">${targetCity.name}</div>
                <div class="slider-city-tz">${tgtOffStr} · ${targetCity.timezone.replace(/_/g,' ')}</div>
              </div>
            </div>
            <div class="slider-city-time ${tgtDay ? 'day' : 'night'}">
              ${formatTime(tH, tM)}${dayOffStr ? `<span class="slider-day-offset">${dayOffStr}</span>` : ''}
            </div>
          </div>
          <div class="slider-track-wrap" id="targetTrack">${buildTimeBar(tH, tM, tgtDay)}</div>
        </div>
        <div class="slider-hint">Drag the timeline to scrub through the day</div>
      </div>
    `;

    const st = document.getElementById('sourceTrack');
    const tt = document.getElementById('targetTrack');
    if (st) {
      st.addEventListener('mousedown', e => startDrag(e, 'source'));
      st.addEventListener('touchstart', e => startDrag(e, 'source'), { passive: true });
    }
    if (tt) {
      tt.addEventListener('mousedown', e => startDrag(e, 'target'));
      tt.addEventListener('touchstart', e => startDrag(e, 'target'), { passive: true });
    }
  }

  function doConvert() {
    if (!sourceCity || !targetCity) { showToast('Please select cities'); return; }
    renderSliders(); showToast('Sliders updated!');
  }

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: true });
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  return { init, renderSliders };
})();
