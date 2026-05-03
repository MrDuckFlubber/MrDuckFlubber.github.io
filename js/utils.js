// ============================================================
// UTILS.JS — Shared helpers (time formatting, localStorage, toast)
// ============================================================

function formatInTZ(date, timezone, options) {
  try {
    return new Intl.DateTimeFormat('en-US', { timeZone: timezone, ...options }).format(date);
  } catch { return '--'; }
}

function getTimeParts(timezone, use24) {
  const now = new Date();
  const fmt = (opts) => formatInTZ(now, timezone, opts);
  let hour, ampm;
  if (use24) {
    hour = fmt({ hour: '2-digit', hour12: false });
    ampm = '';
  } else {
    const h12 = fmt({ hour: 'numeric', hour12: true });
    ampm = h12.includes('AM') ? 'AM' : 'PM';
    hour = fmt({ hour: '2-digit', hour12: false });
    // convert to 12h display
    const h = parseInt(hour, 10) % 12 || 12;
    hour = String(h).padStart(2, '0');
  }
  const minute  = fmt({ minute: '2-digit' });
  const second  = fmt({ second: '2-digit' });
  const dayName = fmt({ weekday: 'short' });
  const monthName = fmt({ month: 'short' });
  const day     = fmt({ day: 'numeric' });
  const year    = fmt({ year: 'numeric' });
  return { hour, minute, second, ampm, dayName, monthName, day, year };
}

function isDay(timezone) {
  try {
    const h = parseInt(formatInTZ(new Date(), timezone, { hour: 'numeric', hour12: false }), 10);
    return h >= 6 && h < 18;
  } catch { return true; }
}

function getUTCOffset(timezone) {
  const now = new Date();
  try {
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate  = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const diff = (tzDate - utcDate) / 60000;
    const sign = diff >= 0 ? '+' : '-';
    const absMin = Math.abs(diff);
    const h = String(Math.floor(absMin / 60)).padStart(2, '0');
    const m = String(absMin % 60).padStart(2, '0');
    return `UTC${sign}${h}:${m}`;
  } catch { return 'UTC'; }
}

function getTimezoneOffsetHours(timezone) {
  try {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate  = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    return (tzDate - utcDate) / 3600000;
  } catch { return 0; }
}

function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

const Storage = {
  KEY: 'globaltime_cities',
  load() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || ['tokyo', 'london', 'new-york']; }
    catch { return ['tokyo', 'london', 'new-york']; }
  },
  save(cityIds) { localStorage.setItem(this.KEY, JSON.stringify(cityIds)); }
};

function is24h() {
  return document.getElementById('toggle24h')?.checked || false;
}
