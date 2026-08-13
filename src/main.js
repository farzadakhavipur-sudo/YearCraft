// =======================
// YearCraft v5.1 — Phase 1 Refactor Skeleton  
// =======================
// هدف: جداسازی منطق، مدل داده و UI در ماژول‌های ES6 برای افزایش خوانایی و نگه‌داری.
// این فایل یک «نمای کلی» از ساختار پیشنهادی است؛ هر بخش با کامنت
// // --- filename --- جدا شده است تا بتوانید به‌راحتی آن را به فایل‌های مستقل ببرید.
// ---------------------

// =====================
// --- src/constants.js
// =====================
export const VERSION = 2;               // نسخه جدید اسکیما داده
export const DEFAULT_STATE = {
  days: {},
  countdowns: [],
  okrs: [],
  persona: 'academic',
  theme: 'apple-dark',
  lang: 'fa'
};

// =====================
// --- src/utils/time.js
// =====================
export function parseTimeToHours(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) + (m || 0) / 60;
}

export function checkTimeOverlaps(todos) {
  const valid = todos.filter(t => t.startTime && t.endTime);
  for (let i = 0; i < valid.length; i++) {
    const startA = parseTimeToHours(valid[i].startTime);
    const endA   = parseTimeToHours(valid[i].endTime);
    for (let j = i + 1; j < valid.length; j++) {
      const startB = parseTimeToHours(valid[j].startTime);
      const endB   = parseTimeToHours(valid[j].endTime);
      const overlapped = Math.max(startA, startB) < Math.min(endA, endB);
      if (overlapped) return true;
    }
  }
  return false;
}

// =======================
// --- src/storage.js
// =======================
import { VERSION, DEFAULT_STATE } from './constants.js';

export function loadAppData() {
  try {
    const raw = localStorage.getItem('yearcraft_data');
    if (!raw) return { ...DEFAULT_STATE };
    const data = JSON.parse(raw);

    // مهاجرت نسخه‌ٔ قدیمی به جدید
    if (!data.__v) {
      // مثال: افزودن فیلد lang در نسخه 2
      data.lang = data.lang || 'fa';
      data.__v = VERSION;
    }

    return { ...DEFAULT_STATE, ...data };
  } catch (e) {
    console.warn('[YearCraft] Invalid data in localStorage. Resetting…');
    return { ...DEFAULT_STATE };
  }
}

export function saveAppData(appData) {
  try {
    localStorage.setItem('yearcraft_data', JSON.stringify(appData));
  } catch (e) {
    console.error('[YearCraft] Cannot save data', e);
  }
}

// ===================
// --- src/i18n.js
// ===================
const LANGS = {
  fa: {
    add_btn: 'افزودن',
    save_btn: 'ذخیره',
    today: 'امروز',
    // ... سایر برچسب‌ها
  },
  en: {
    add_btn: 'Add',
    save_btn: 'Save',
    today: 'Today',
  }
};

export function t(key, lang) {
  return LANGS[lang][key] || key;
}

// =====================
// --- src/state.js
// =====================
import { loadAppData, saveAppData } from './storage.js';
export const YCState = {
  data: loadAppData(),
  get currentLang() { return this.data.lang; },
  set currentLang(val) { this.data.lang = val; saveAppData(this.data); }
  // سایر Getters/Setters به همین ترتیب
};

// ==================
// --- src/ui.js
// ==================
import { YCState } from './state.js';
import { t } from './i18n.js';
import { checkTimeOverlaps } from './utils/time.js';

export function renderHomeView() {
  const el = document.getElementById('hero-weekday-title');
  if (!el) return;
  el.textContent = t('today', YCState.currentLang);
  // TODO: ادامه رندر سایر مؤلفه‌ها با استفاده از YCState
}

export function initEventListeners() {
  document.getElementById('btn-lang-toggle')?.addEventListener('click', () => {
    YCState.currentLang = YCState.currentLang === 'fa' ? 'en' : 'fa';
    renderHomeView();
  });
  // TODO: سایر رویدادها
}

// =====================
// --- src/main.js  (entry point)
// =====================
import { renderHomeView, initEventListeners } from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderHomeView();
});

// =====================
// پایان اسکلت فاز ۱
// فایل‌های اصلی اپ (HTML/CSS) باید به جای اسکریپت قدیمی، فقط <script type="module" src="/src/main.js"></script> را بارگذاری کنند.
// گام بعدی: انتقال تدریجی توابع از فایل قدیمی به ماژول‌های بالا و نوشتن تست واحد.
