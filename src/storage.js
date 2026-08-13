// ========= src/storage.js =========
export const DATA_VERSION = 1;

function getDefaultData() {
  return {
    version: DATA_VERSION,
    days: {},
    countdowns: [],
    persona: 'academic',
    theme: 'apple-dark'
  };
}

export function loadData() {
  try {
    const raw = localStorage.getItem('yearcraft_data');
    if (!raw) return getDefaultData();
    const obj = JSON.parse(raw);
    if (obj.version !== DATA_VERSION) {
      // TODO: data migration logic when schema upgrades
    }
    return obj;
  } catch (e) {
    return getDefaultData();
  }
}

export function saveData(appData) {
  try {
    localStorage.setItem('yearcraft_data', JSON.stringify({ ...appData, version: DATA_VERSION }));
  } catch (e) {
    /* ignore quota / serialization errors */
  }
}

// ========= src/utils.js =========
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
      if (startA < endB && startB < endA) return true;
    }
  }
  return false;
}

export const formatNum = n => new Intl.NumberFormat('fa-IR').format(n);

// ========= src/main.js =========
import { loadData, saveData } from './storage.js';
import { checkTimeOverlaps } from './utils.js';

// Temporary global state to keep existing UI functional while migrating
export const YCState = {
  activeTab: 'home',
  currentLang: 'fa',
  currentPersona: 'academic',
  currentTheme: 'apple-dark',
};

export let appData = loadData();
window.appData = appData; // expose for legacy inline scripts if needed

// Save before window unload (basic persistence until full refactor is done)
window.addEventListener('beforeunload', () => saveData(appData));

// Placeholder: re‑export legacy helpers until moved
window.checkTimeOverlaps = checkTimeOverlaps;

// TODO: progressively migrate UI rendering into separate view modules
console.info('YearCraft refactor phase‑1 bootstrap loaded');
