# 🌍 GlobalTime — World Clock App

## Features

### Clocks Page
- Live local time display for any city, updating every second
- 30+ cities available, grouped by continent in a dropdown
- Day / Night badge and ☀ / 🌙 indicator per card
- Add and remove cities freely
- Sort all cities in a number of ways
- Clear all cities at once
- City list persists between sessions via `localStorage`

### Converter Page
- Search any two cities by name
- Draggable timeline sliders, drag either city's bar to scrub through the day
- Instantly see what time it is in the other city as you drag
- Day / Night shading on each slider (dark = night, light = day)
- Shows UTC offset for each city and the hour difference between them
- Flags a +1 day / -1 day offset when the cities are on different calendar days
- Syncs to real time automatically when you stop dragging

### Global Controls
- **Dark / Light theme** toggle — persists via `localStorage`
- **12h / 24h** time format toggle — persists via `localStorage`
- **Keyboard shortcuts:** `1` = Clocks · `2` = Converter · `T` = Theme

---

## Project Structure

```
globaltime/
├── index.html          ← Single-page app shell (2 views)
├── README.md
├── css/
│   └── style.css       ← All styles — dark/light themes, responsive, slider UI
└── js/
    ├── data.js         ← City and timezone data (30 cities)
    ├── utils.js        ← Shared helpers (time formatting, localStorage, toast)
    ├── clocks.js       ← Clock card rendering and live tick
    ├── converter.js    ← Slider-based timezone converter
    └── app.js          ← Entry point — navigation, theme, 24h toggle
```

---

## Running the App

No installation needed. Just open the file:

```bash
open index.html
```

Or drag `index.html` into any browser. Everything runs client-side.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Syne + DM Mono via Google Fonts |
| Time zones | Native `Intl.DateTimeFormat` API — zero libraries |
| Persistence | `localStorage` |

---

## Design Notes

- No frameworks, no build step, no `node_modules`
- All timezone math uses the browser's built-in `Intl` API
- Fully responsive down to mobile widths
- Modular JS — each feature lives in its own file as an IIFE module
