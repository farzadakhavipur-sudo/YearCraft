// ------------------------------
// src/storage.js
// ------------------------------
/**
 * Local storage access layer with schema versioning.
 * If the stored schema is outdated, the migrator upgrades it automatically.
 */
export const SCHEMA_VERSION = 1;

const DEFAULT_DATA = {
  version: SCHEMA_VERSION,
  days: {},
  countdowns: [],
  persona: 'academic',
  theme: 'apple-dark'
};

function migrate(old) {
  // 👉 add future migrations here based on version numbers
  return { ...DEFAULT_DATA, ...old, version: SCHEMA_VERSION };
}

export function loadAppData() {
  try {
    const raw = localStorage.getItem('yearcraft_data');
    if (!raw) return { ...DEFAULT_DATA };
    const parsed = JSON.parse(raw);
    if (!parsed.version || parsed.version < SCHEMA_VERSION) {
      const migrated = migrate(parsed);
      saveAppData(migrated);
      return migrated;
    }
    return parsed;
  } catch (e) {
    // corrupted JSON → reset
    console.warn('YearCraft → corrupted data, resetting.', e);
    localStorage.removeItem('yearcraft_data');
    return { ...DEFAULT_DATA };
  }
}

export function saveAppData(data) {
  try {
    localStorage.setItem('yearcraft_data', JSON.stringify({ ...data, version: SCHEMA_VERSION }));
  } catch (e) {
    console.error('YearCraft → unable to save data', e);
  }
}

// ------------------------------
// src/utils.js
// ------------------------------
export function formatNum(n) {
  return new Intl.NumberFormat('fa-IR').format(n);
}

export function parseTimeToHours(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) + (m || 0) / 60;
}

export function checkTimeOverlaps(todos) {
  const valid = todos.filter(t => t.startTime && t.endTime);
  for (let i = 0; i < valid.length; i++) {
    const startA = parseTimeToHours(valid[i].startTime);
    const endA = parseTimeToHours(valid[i].endTime);
    for (let j = i + 1; j < valid.length; j++) {
      const startB = parseTimeToHours(valid[j].startTime);
      const endB = parseTimeToHours(valid[j].endTime);
      const overlap = Math.max(0, Math.min(endA, endB) - Math.max(startA, startB));
      if (overlap > 0) return true;
    }
  }
  return false;
}

// ------------------------------
// src/main.js
// ------------------------------
import { loadAppData, saveAppData } from './storage.js';
import { parseTimeToHours, checkTimeOverlaps, formatNum } from './utils.js';

// expose for legacy inline handlers until full migration is done
autoExpose({ loadAppData, saveAppData, parseTimeToHours, checkTimeOverlaps, formatNum });

/**
 * Attach helpers to window so existing inline «onclick=…» keeps working.
 * This shim will be removed once all handlers are migrated to addEventListener.
 */
function autoExpose(obj) {
  Object.entries(obj).forEach(([k, v]) => (window[k] = v));
}

// Load initial state and kick‑off rendering pipeline
window.appData = loadAppData();
window.YCState = {
  currentPersona: window.appData.persona,
  currentTheme: window.appData.theme,
  currentLang: 'fa',
  currentCalSystem: 'jalali',
  activeTab: 'home'
};

// TODO: import and initialise UI modules (homeView, yearView, …)

console.info('YearCraft Phase 1 skeleton loaded.');

// Hot‑reload support (Vite)
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('🔁 YearCraft modules updated');
  });
}

// ------------------------------
// index.html (snippet)
// ------------------------------
// <script type="module" src="/src/main.js"></script>
