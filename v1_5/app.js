'use strict';

const APP_VERSION = '1.5.20';

const CHANGELOG = [
  { v: '1.5.20', date: '2026-05-26', items: [
    'Import fix: board ID collision now correctly remaps all scene/set IDs and boardId references',
    'Backup age indicator in main menu now shows time since last export',
  ]},
  { v: '1.5.19', date: '2026-05-26', items: [
    'One-time migration from V1 localStorage settings (runs on first V1.5 launch)',
    'Migrates: master volume, wake lock, auto-stop, auto-stop minutes, theme, start mode',
    'Theme names mapped (retro/modern→DEFAULT, verdant/neon/crimson→uppercase); start-mode "unlocked"→"setup"',
  ]},
  { v: '1.5.18', date: '2026-05-26', items: [
    'Pad drag-to-reorder: drag an assigned pad to any other slot in SETUP mode to swap/move it',
    'Ghost follows cursor; drop target highlighted; click after drag suppressed',
    'Works for both scene grid pads and set-strip pads',
  ]},
  { v: '1.5.17', date: '2026-05-26', items: [
    'Per-pad quick volume: long-press (500ms) on a playing pad in GAME mode opens a live gain slider',
    'Slider updates gain in real-time; saves new volume to pad on close',
    'Works for both scene pads and set-strip pads; move-to-cancel threshold 8px',
  ]},
  { v: '1.5.16', date: '2026-05-26', items: [
    'Library BOARDS tab: list all boards with scene/set counts, last-updated date, OPEN + 2-tap delete',
    'Active board highlighted in the list; OPEN navigates directly to the board',
  ]},
  { v: '1.5.15', date: '2026-05-25', items: [
    'Playlist pad: pad type LIST ☰ — ordered sequence of audio tracks, auto-advances on natural end',
    'Shuffle toggle per playlist pad; state resets on manual stop',
    'Pad opts: third type button (LIST ☰), shuffle row, track list with remove, ADD TRACK picker',
    'Hotkeys work with playlist pads; playlist pads shown with ☰ badge (violet)',
  ]},
  { v: '1.5.14', date: '2026-05-25', items: [
    'Master volume: live slider in Settings, applied via masterGain node in audio engine',
    'Persisted to localStorage; applied at AudioContext init so the engine always starts at the saved level',
  ]},
  { v: '1.5.13', date: '2026-05-25', items: [
    'Wake lock: keep screen on during game sessions (toggle in Settings)',
    'Start mode: board can open directly in GAME mode (setting: SETUP / GAME / REMEMBER)',
    'Auto-stop: stop all audio after N idle minutes (toggle + duration in Settings)',
    'Fix: board delete now also removes associated sets from IDB (data leak)',
  ]},
  { v: '1.5.12', date: '2026-05-25', items: [
    'Board create: replace prompt() with bottom sheet (matches scene/set add UX)',
    'Loop pads: show ↻ badge on pad cell in GAME mode',
    'Scene delete: replace alert() with showToast',
    'Tips & About: real content (controls guide, hotkeys, about text)',
    'Remove dead handleBdSceneRename (scene opts sheet handles this)',
    'Library: remove non-functional NEW FOLDER button',
  ]},
  { v: '1.5.11', date: '2026-05-25', items: [
    'Slice 8: Settings screen — theme picker, new-pad volume/fade defaults, about section',
    'Pad opts sheet: type selector (SINGLE / LOOP) and volume control',
    'Fix: new pads defaulted to volume 1 (near-silent) — now reads saved defaults (default 80)',
    'Hotkeys: GAME mode keydown fires the matching pad (any hotkey, not just NumPad)',
    'Navigate away from board now stops all audio',
    'bus.on("theme") wired — theme changes apply immediately without reload',
  ]},
  { v: '1.5.10', date: '2026-05-25', items: [
    'Slice 7: Export + Import — full board+audio backup',
    'Export: streaming JSON (one audio entry at a time — no RAM spike), share sheet on iOS / save picker on desktop / download fallback',
    'Import: parse backup, preview summary, execute — audio deduplicated by hash, name conflicts auto-renamed with _imported suffix, boards added with new ID if collision',
    'Toast notifications for export/import status',
  ]},
  { v: '1.5.9', date: '2026-05-25', items: [
    'Slice 6: Sets + Quick Access strip at bottom of board',
    'Create, rename, delete Sets; quick-access horizontal pad strip per set',
    'Set pad picker + opts (same as scene pads, shared picker element)',
    'Set pads play/stop audio in GAME mode; is-playing state on strip',
  ]},
  { v: '1.5.8', date: '2026-05-25', items: [
    'Slice 5: Complete scene model — no more browser prompt() dialogs',
    'Scene opts bottom sheet: inline name editing, grid-cols picker (2-5), 2-tap delete',
    'New scene bottom sheet replaces prompt for scene creation',
    'Board name: inline rename (click name → type → Enter/blur to save)',
    'Scene switch in GAME mode stops all active audio',
  ]},
  { v: '1.5.7', date: '2026-05-25', items: [
    'Slice 4: Audio Playback — GAME mode pad taps play/stop audio via audio.js engine',
    'audio.js: LRU buffer cache (150 MB max), in-flight dedup, iOS silent-switch bypass',
    'Stop All button in GAME mode top bar',
    'Pad is-playing active state (visual highlight + ring)',
  ]},
  { v: '1.5.6', date: '2026-05-25', items: [
    'Scrollbar styling: global ::-webkit-scrollbar + html scrollbar-color using design tokens (--border, --sunk, --gold-dim)',
  ]},
  { v: '1.5.5', date: '2026-05-25', items: [
    'Fix blank screen: openDB() now handles onblocked (DB upgrade blocked by another tab) and rejects with a clear message',
    'Fix blank screen: init() wrapped in try-catch — shows an error screen instead of silent blank',
    'Fix reload loop: replaced controllerchange-based auto-reload with updatefound+waiting banner (no reload loop)',
    'SW update banner: shows "UPDATE AVAILABLE — RELOAD" strip at top when a new SW is waiting',
  ]},
  { v: '1.5.4', date: '2026-05-25', items: [
    'Changelog modal: clicking version label in menu opens full changelog overlay',
    'Modal closes on backdrop click or × button; Escape key supported',
    'Check for updates button moved inside changelog modal footer',
  ]},
  { v: '1.5.3', date: '2026-05-25', items: [
    'SW auto-update: controllerchange → window.location.reload() (only when a previous SW was controlling)',
    'SW proactive check: reg.update() on every init so new versions are detected immediately',
    'Version label in menu: data-action="check-update" → reg.update() + reload if new SW waiting',
  ]},
  { v: '1.5.2', date: '2026-05-25', items: [
    'Slice 3: Board + Scene + Pad CRUD',
    'DB v1→v2: adds scenes and sets object stores',
    'Board List screen: create, open, delete boards (2-tap confirm)',
    'Board screen (SETUP): scene tabs, pad grid, pad picker (assign audio from library)',
    'Pad options panel (bottom sheet): rename, hotkey, change audio, clear',
    'Scene management: add scene, rename scene, delete scene via ⋯ menu',
    'Board rename: prompt from top-bar name tap',
    'Menu BOARD row: async sub-text update (board count) in mountMenu',
    '_waveMiniFromHash: waveform on pads from cached lib metadata',
    '_newId helper: stable string IDs (prefix_ts_rand) for boards/scenes/pads',
    '_app:"v1_5" tag on boards to coexist safely with V1 p-store entries',
  ]},
  { v: '1.5.1', date: '2026-05-25', items: [
    'Slice 2: Library screen with fully functional AUDIO tab (IDB CRUD)',
    'IDB layer: openDB (botc v1 schema), computeHash, libPut, libGet, libGetAllMeta, libUpdateMeta, libDelete, addToLib',
    'Audio upload: file picker, SHA-256 dedup, AudioContext decode for peaks, serial processing (iOS memory rule)',
    '_computePeaks (30 points), _waveMini (36×24 SVG), format helpers escHtml/escAttr/fmtSize/fmtDur/_cleanName',
    'Audio list: waveform mini, name, date, duration, size; filter All/In-use/Unused; folder facets; search',
    'Rename: inline input, commit on blur/Enter, cancel on Escape; libUpdateMeta never loads buf into heap',
    'Delete: 2-tap confirmation, clears on any other click',
    'PADS/BOARDS/ICONS tabs: stub placeholder',
    'New pixel icons: search, tag, book, edit',
    'init() awaits openDB() before first render',
  ]},
  { v: '1.5.0', date: '2026-05-25', items: [
    'Slice 1: Skeleton + Home Screen — index.html shell, styles.css with canonical tokens, pixelIcon system (8 icons)',
    'Intro screen: 140px cold-reactive AnimatedFlame, title and button react to cold state via lerpColor',
    'Menu screen: 84px interactive flame, 5 pixel-icon menu rows with staggered gold tints, backup/import row',
    'Stub screens, service worker (cache-first), PWA manifest, 3 themes (verdant/neon/crimson)',
  ]},
];
console.assert(CHANGELOG[0].v === APP_VERSION, 'CHANGELOG out of sync with APP_VERSION — add entry before bumping version');

/* ── STATE ──────────────────────────────────────────────────── */

/** @typedef {'intro'|'menu'|'board-list'|'board'|'library'|'settings'|'tips'|'about'} ScreenId */

/** @type {{screen:ScreenId, theme:string, boardId:string|null, boardMode:'setup'|'game'}} */
const S = {
  screen:    'intro',
  theme:     localStorage.getItem('sos-theme') || '',
  boardId:   localStorage.getItem('sos-board') || null,
  boardMode: 'setup',
};

const set = {
  /** @param {ScreenId} v */
  screen(v)    { S.screen = v;    bus.emit('screen', v); },
  /** @param {string} v */
  theme(v)     { S.theme = v;     localStorage.setItem('sos-theme', v); bus.emit('theme', v); },
  /** @param {string|null} v */
  boardId(v)   { S.boardId = v;   localStorage.setItem('sos-board', v || ''); },
  /** @param {'setup'|'game'} v */
  boardMode(v) { S.boardMode = v; localStorage.setItem('sos-last-mode', v); },
};

/* ── PUB/SUB ────────────────────────────────────────────────── */

const bus = (() => {
  /** @type {Record<string, Function[]>} */
  const L = {};
  return {
    on(e, fn)  { (L[e] = L[e] || []).push(fn); },
    emit(e, d) { (L[e] || []).forEach(fn => fn(d)); },
  };
})();

/* ── PIXEL ICON SYSTEM ──────────────────────────────────────── */

const _ICONS = [
  {id:'rune',     d:['7 2','8 2','6 3','7 3','8 3','9 3','6 4','9 4','5 5','10 5','5 6','10 6','4 7','11 7','4 8','7 8','8 8','11 8','3 9','12 9','2 10','3 10','4 10','5 10','6 10','7 10','8 10','9 10','10 10','11 10','12 10','13 10','7 11','8 11','7 12','8 12','6 13','7 13','8 13','9 13']},
  {id:'scroll',   d:['3 3','4 3','5 3','6 3','7 3','8 3','9 3','10 3','11 3','2 4','12 4','3 5','4 5','5 5','6 5','7 5','8 5','9 5','10 5','11 5','3 6','5 6','6 6','7 6','8 6','9 6','10 6','11 6','3 7','5 7','7 7','8 7','9 7','11 7','3 8','5 8','6 8','7 8','8 8','9 8','10 8','11 8','3 9','5 9','6 9','7 9','8 9','9 9','11 9','3 10','11 10','3 11','4 11','5 11','6 11','7 11','8 11','9 11','10 11','11 11','2 12','12 12','3 13','4 13','5 13','6 13','7 13','8 13','9 13','10 13','11 13']},
  {id:'cog',      d:['7 2','8 2','5 3','7 3','8 3','10 3','5 4','7 4','8 4','10 4','4 5','5 5','11 5','2 6','3 6','5 6','6 6','7 6','8 6','9 6','10 6','12 6','13 6','2 7','3 7','5 7','6 7','9 7','10 7','12 7','13 7','2 8','3 8','5 8','6 8','9 8','10 8','12 8','13 8','2 9','3 9','5 9','6 9','7 9','8 9','9 9','10 9','12 9','13 9','4 10','5 10','11 10','5 11','7 11','8 11','10 11','5 12','7 12','8 12','10 12','7 13','8 13']},
  {id:'keyboard', d:['2 4','3 4','4 4','5 4','6 4','7 4','8 4','9 4','10 4','11 4','12 4','13 4','2 5','13 5','2 6','3 6','5 6','6 6','8 6','9 6','11 6','12 6','13 6','2 7','13 7','2 8','4 8','5 8','7 8','8 8','10 8','11 8','13 8','2 9','13 9','2 10','4 10','5 10','6 10','7 10','8 10','9 10','10 10','11 10','13 10','2 11','3 11','4 11','5 11','6 11','7 11','8 11','9 11','10 11','11 11','12 11','13 11']},
  {id:'info',     d:['6 2','7 2','8 2','9 2','5 3','10 3','4 4','7 4','8 4','11 4','4 5','11 5','4 6','7 6','8 6','11 6','4 7','6 7','7 7','8 7','11 7','4 8','7 8','8 8','11 8','4 9','7 9','8 9','11 9','4 10','7 10','8 10','11 10','5 11','7 11','8 11','10 11','6 12','7 12','8 12','9 12']},
  {id:'flame',    d:['7 1','8 1','6 2','7 2','8 2','9 2','5 3','6 3','8 3','9 3','10 3','5 4','6 4','7 4','8 4','9 4','10 4','11 4','4 5','5 5','7 5','9 5','10 5','11 5','4 6','5 6','6 6','9 6','10 6','11 6','12 6','3 7','4 7','5 7','6 7','7 7','9 7','10 7','11 7','12 7','3 8','4 8','5 8','6 8','7 8','8 8','10 8','11 8','12 8','3 9','4 9','5 9','6 9','7 9','8 9','9 9','10 9','11 9','12 9','3 10','4 10','5 10','6 10','7 10','8 10','9 10','10 10','11 10','12 10','4 11','5 11','6 11','7 11','8 11','9 11','10 11','11 11','5 12','6 12','7 12','8 12','9 12','10 12','6 13','7 13','8 13','9 13']},
  {id:'save',     d:['3 3','4 3','5 3','6 3','7 3','8 3','9 3','10 3','11 3','3 4','11 4','12 4','3 5','5 5','6 5','7 5','8 5','12 5','3 6','5 6','7 6','12 6','3 7','12 7','3 8','12 8','3 9','5 9','6 9','7 9','8 9','9 9','12 9','3 10','5 10','9 10','12 10','3 11','5 11','9 11','12 11','3 12','4 12','5 12','6 12','7 12','8 12','9 12','10 12','11 12','12 12']},
  {id:'download', d:['7 2','8 2','7 3','8 3','7 4','8 4','7 5','8 5','5 6','7 6','8 6','10 6','5 7','6 7','7 7','8 7','9 7','10 7','6 8','7 8','8 8','9 8','7 9','8 9','3 12','4 12','5 12','6 12','7 12','8 12','9 12','10 12','11 12','12 12']},
  {id:'search',   d:['5 3','6 3','7 3','8 3','4 4','9 4','3 5','10 5','3 6','10 6','3 7','10 7','3 8','10 8','4 9','9 9','5 10','6 10','7 10','8 10','10 10','11 11','12 11','12 12','13 12']},
  {id:'tag',      d:['3 6','4 6','5 6','6 6','7 6','8 6','9 6','10 6','3 7','10 7','11 7','3 8','11 8','12 8','3 9','12 9','3 10','11 10','12 10','3 11','10 11','11 11','3 12','4 12','5 12','6 12','7 12','8 12','9 12','10 12','5 9','6 9']},
  {id:'book',     d:['3 3','4 3','5 3','6 3','7 3','9 3','10 3','11 3','12 3','3 4','7 4','9 4','12 4','3 5','7 5','9 5','12 5','3 6','7 6','9 6','12 6','3 7','7 7','9 7','12 7','3 8','7 8','9 8','12 8','3 9','7 9','9 9','12 9','3 10','7 10','9 10','12 10','3 11','7 11','9 11','12 11','3 12','4 12','5 12','6 12','7 12','9 12','10 12','11 12','12 12']},
  {id:'edit',     d:['10 2','11 2','9 3','10 3','11 3','12 3','8 4','9 4','10 4','11 4','7 5','8 5','9 5','10 5','6 6','7 6','8 6','9 6','5 7','6 7','7 7','8 7','4 8','5 8','6 8','7 8','3 9','4 9','5 9','6 9','3 10','4 10','5 10','3 11','4 11','5 11','3 12','4 12']},
];

const _BY_ID = {};
for (let i = 0; i < _ICONS.length; i++) _BY_ID[_ICONS[i].id] = _ICONS[i];

/**
 * @param {string} id
 * @param {number} [size=16]
 * @param {string} [color='currentColor']
 * @returns {string}
 */
function pixelIcon(id, size, color) {
  size  = size  || 16;
  color = color || 'currentColor';
  const def = _BY_ID[id];
  if (!def) return `<svg width="${size}" height="${size}" viewBox="0 0 16 16"></svg>`;
  let r = '';
  for (let i = 0; i < def.d.length; i++) {
    const p = def.d[i].split(' ');
    r += `<rect x="${p[0]}" y="${p[1]}" width="1" height="1" fill="${color}"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" shape-rendering="crispEdges" style="display:block">${r}</svg>`;
}

const pi = pixelIcon;

/* ── FORMAT HELPERS ─────────────────────────────────────────── */

/** @param {string} s @returns {string} */
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/** @param {string} s @returns {string} safe for HTML attribute values */
function escAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
}

/** @param {number} bytes @returns {string} */
function fmtSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024)    return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

/** @param {number} secs @returns {string} */
function fmtDur(secs) {
  if (!secs) return '—';
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
  return m + ':' + String(s).padStart(2, '0');
}

/** @param {string} filename @returns {string} filename without extension */
function _cleanName(filename) {
  return filename.replace(/\.[^/.]+$/, '');
}

/** @returns {{volume:number,fadeIn:number,fadeOut:number}} */
function _defaultPadOpts() {
  return {
    volume:  +(localStorage.getItem('sos-def-volume')  ?? 80),
    fadeIn:  +(localStorage.getItem('sos-def-fadein')  ?? 0),
    fadeOut: +(localStorage.getItem('sos-def-fadeout') ?? 0),
  };
}

/* ── INDEXED DB — LIB ────────────────────────────────────────── */

let db = null;

function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('botc', 2);
    r.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('lib'))    d.createObjectStore('lib',    { keyPath: 'hash' });
      if (!d.objectStoreNames.contains('p'))      d.createObjectStore('p',      { keyPath: 'id' });
      if (!d.objectStoreNames.contains('scenes')) d.createObjectStore('scenes', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('sets'))   d.createObjectStore('sets',   { keyPath: 'id' });
    };
    r.onsuccess = e => { db = e.target.result; res(); };
    r.onerror   = e => rej(e.target.error || new Error('IndexedDB failed to open'));
    r.onblocked = () => rej(new Error('DB upgrade blocked — please close other tabs using this app, then reload'));
  });
}

/** @param {ArrayBuffer} buf @returns {Promise<string>} SHA-256 hex */
async function computeHash(buf) {
  const h = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** @param {Object} entry @returns {Promise<void>} */
function libPut(entry) {
  return new Promise((res, rej) => {
    const tx = db.transaction('lib', 'readwrite');
    tx.objectStore('lib').put(entry).onsuccess = () => res();
    tx.onerror = ev => rej(new Error(ev.target?.error?.message ?? 'libPut failed'));
  });
}

/** @param {string} hash @returns {Promise<Object|null>} */
function libGet(hash) {
  return new Promise(res => {
    const req = db.transaction('lib', 'readonly').objectStore('lib').get(hash);
    req.onerror   = () => res(null);
    req.onsuccess = e  => res(e.target.result || null);
  });
}

/** @returns {Promise<Array>} all entries without the buf field */
function libGetAllMeta() {
  return new Promise(res => {
    const result = [];
    const req = db.transaction('lib', 'readonly').objectStore('lib').openCursor();
    req.onerror   = () => res([]);
    req.onsuccess = e  => {
      const cursor = e.target.result;
      if (!cursor) { res(result); return; }
      const { hash, name, type, size, added, folder, origName, duration, peaks, updatedAt } = cursor.value;
      result.push({ hash, name, type, size, added, folder, origName, duration, peaks, updatedAt });
      cursor.continue();
    };
  });
}

/**
 * Patches metadata fields without loading the audio buf into JS heap.
 * @param {string} hash
 * @param {Object} updates
 * @returns {Promise<void>}
 */
function libUpdateMeta(hash, updates) {
  return new Promise(res => {
    const tx    = db.transaction('lib', 'readwrite');
    const store = tx.objectStore('lib');
    store.get(hash).onsuccess = e => {
      if (!e.target.result) { res(); return; }
      store.put({ ...e.target.result, ...updates }).onsuccess = () => res();
    };
    tx.onerror = () => res();
  });
}

/** @param {string} hash @returns {Promise<void>} */
function libDelete(hash) {
  return new Promise(res => {
    const tx = db.transaction('lib', 'readwrite');
    tx.onerror = e => { console.error('libDelete failed:', e.target?.error); res(); };
    tx.objectStore('lib').delete(hash).onsuccess = () => res();
  });
}

/**
 * @param {ArrayBuffer} buf
 * @param {string} name
 * @param {string} [type]
 * @returns {Promise<{hash:string, isDuplicate:boolean}>}
 */
async function addToLib(buf, name, type = '') {
  const hash = await computeHash(buf);
  if (await libGet(hash)) return { hash, isDuplicate: true };
  const entry = { hash, name, origName: name, buf, size: buf.byteLength, type, added: Date.now() };
  let _ac = null;
  try {
    _ac = new (window.AudioContext || window.webkitAudioContext)();
    const decoded = await _ac.decodeAudioData(buf.slice(0));
    entry.duration = decoded.duration;
    entry.peaks    = _computePeaks(decoded);
  } catch (err) {
    console.warn('addToLib: decode failed:', err);
  } finally {
    if (_ac) _ac.close();
  }
  await libPut(entry);
  return { hash, isDuplicate: false };
}

/* ── INDEXED DB — BOARDS + SCENES ───────────────────────────── */

/** @param {string} prefix @returns {string} */
function _newId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

/** @param {Object} board @returns {Promise<void>} */
function boardPut(board) {
  return new Promise((res, rej) => {
    const tx = db.transaction('p', 'readwrite');
    tx.objectStore('p').put(board).onsuccess = () => res();
    tx.onerror = ev => rej(new Error(ev.target?.error?.message ?? 'boardPut failed'));
  });
}

/** @param {string} id @returns {Promise<Object|null>} */
function boardGet(id) {
  return new Promise(res => {
    const req = db.transaction('p', 'readonly').objectStore('p').get(id);
    req.onerror   = () => res(null);
    req.onsuccess = e  => res(e.target.result || null);
  });
}

/** @returns {Promise<Array>} all V1.5 boards, newest-updated first */
function boardGetAll() {
  return new Promise(res => {
    const result = [];
    const req = db.transaction('p', 'readonly').objectStore('p').openCursor();
    req.onerror   = () => res([]);
    req.onsuccess = e  => {
      const cursor = e.target.result;
      if (!cursor) { result.sort((a, b) => (b.updated || 0) - (a.updated || 0)); res(result); return; }
      if (cursor.value._app === 'v1_5') result.push(cursor.value);
      cursor.continue();
    };
  });
}

/** @param {string} id @returns {Promise<void>} */
function boardDelete(id) {
  return new Promise(res => {
    const tx = db.transaction('p', 'readwrite');
    tx.onerror = () => res();
    tx.objectStore('p').delete(id).onsuccess = () => res();
  });
}

/** @param {Object} scene @returns {Promise<void>} */
function scenePut(scene) {
  return new Promise((res, rej) => {
    const tx = db.transaction('scenes', 'readwrite');
    tx.objectStore('scenes').put(scene).onsuccess = () => res();
    tx.onerror = ev => rej(new Error(ev.target?.error?.message ?? 'scenePut failed'));
  });
}

/** @param {string} id @returns {Promise<Object|null>} */
function sceneGet(id) {
  return new Promise(res => {
    const req = db.transaction('scenes', 'readonly').objectStore('scenes').get(id);
    req.onerror   = () => res(null);
    req.onsuccess = e  => res(e.target.result || null);
  });
}

/** @param {string} id @returns {Promise<void>} */
function sceneDelete(id) {
  return new Promise(res => {
    const tx = db.transaction('scenes', 'readwrite');
    tx.onerror = () => res();
    tx.objectStore('scenes').delete(id).onsuccess = () => res();
  });
}

/* ── SETS IDB ───────────────────────────────────────────────── */

/** @param {Object} set @returns {Promise<void>} */
function setPut(set) {
  return new Promise((res, rej) => {
    const tx = db.transaction('sets', 'readwrite');
    tx.objectStore('sets').put(set).onsuccess = () => res();
    tx.onerror = ev => rej(new Error(ev.target?.error?.message ?? 'setPut failed'));
  });
}

/** @param {string} id @returns {Promise<Object|null>} */
function setGet(id) {
  return new Promise(res => {
    const req = db.transaction('sets', 'readonly').objectStore('sets').get(id);
    req.onerror   = () => res(null);
    req.onsuccess = e  => res(e.target.result || null);
  });
}

/** @param {string} id @returns {Promise<void>} */
function setDelete(id) {
  return new Promise(res => {
    const tx = db.transaction('sets', 'readwrite');
    tx.onerror = () => res();
    tx.objectStore('sets').delete(id).onsuccess = () => res();
  });
}

/**
 * Creates a new set on a board (mutates + saves board).
 * @param {Object} board
 * @param {string} name
 * @returns {Promise<Object>} the new set
 */
async function setCreate(board, name) {
  const id  = _newId('st');
  const set = { id, boardId: board.id, name, pads: [], created: Date.now() };
  board.sets       = [...(board.sets || []), { id, name }];
  board.activeSetId = id;
  board.updated    = Date.now();
  await setPut(set);
  await boardPut(board);
  return set;
}

/**
 * Creates a board with one default scene.
 * @param {string} name
 * @returns {Promise<Object>}
 */
async function boardCreate(name) {
  const boardId = _newId('b');
  const sceneId = _newId('s');
  await scenePut({ id: sceneId, boardId, name: 'Scene 1', pads: [], gridCols: 4, created: Date.now() });
  const board = {
    id: boardId, name, _app: 'v1_5',
    scenes: [{ id: sceneId, name: 'Scene 1' }],
    activeSceneId: sceneId, gridCols: 4,
    created: Date.now(), updated: Date.now(),
  };
  await boardPut(board);
  return board;
}

/**
 * Adds a new scene to an existing board (mutates + saves board).
 * @param {Object} board
 * @param {string} name
 * @returns {Promise<Object>} the new scene
 */
async function sceneAdd(board, name) {
  const id = _newId('s');
  const scene = { id, boardId: board.id, name, pads: [], gridCols: board.gridCols || 4, created: Date.now() };
  board.scenes = [...(board.scenes || []), { id, name }];
  board.activeSceneId = id;
  board.updated = Date.now();
  await scenePut(scene);
  await boardPut(board);
  return scene;
}

/* ── AUDIO UTILS ─────────────────────────────────────────────── */

/**
 * @param {AudioBuffer} audioBuffer
 * @param {number} [N=30]
 * @returns {number[]}
 */
function _computePeaks(audioBuffer, N = 30) {
  const data = audioBuffer.getChannelData(0);
  const step = Math.floor(data.length / N) || 1;
  const peaks = [];
  for (let i = 0; i < N; i++) {
    let max = 0;
    const start = i * step;
    for (let j = 0; j < step; j++) { const v = Math.abs(data[start + j] || 0); if (v > max) max = v; }
    peaks.push(+max.toFixed(3));
  }
  return peaks;
}

/**
 * @param {number[]|undefined} peaks
 * @returns {string} 36×24 SVG waveform
 */
function _waveMini(peaks) {
  if (!peaks || !peaks.length) {
    return `<span style="opacity:.2;line-height:0">${pi('flame', 16, 'var(--text-dim)')}</span>`;
  }
  const W = 36, H = 24, barW = W / peaks.length;
  const bars = peaks.map((v, i) => {
    const bh = Math.max(1, Math.round(v * H * 0.9));
    return `<rect x="${+(i * barW).toFixed(1)}" y="${+((H - bh) / 2).toFixed(1)}" width="${+Math.max(0.5, barW - 0.3).toFixed(1)}" height="${bh}"/>`;
  }).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="var(--text-dim)" style="display:block">${bars}</svg>`;
}

/**
 * @param {string|null} hash
 * @returns {string} SVG waveform from lib metadata cache
 */
function _waveMiniFromHash(hash) {
  if (!hash) return _waveMini(null);
  const entry = _libEntries.find(e => e.hash === hash);
  return _waveMini(entry?.peaks);
}

/* ── NAVIGATION + THEME ─────────────────────────────────────── */

/** @param {string} name */
function applyTheme(name) {
  document.body.className = document.body.className.replace(/\btheme-\w+\b/g, '').trim();
  if (name) document.body.classList.add('theme-' + name);
}

/** @param {ScreenId} screenId */
function navigate(screenId) {
  if (S.screen === 'board' && screenId !== 'board') {
    audioStopAll(0);
    document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing'));
    _releaseWakeLock();
    _cancelAutoStop();
  }
  set.screen(screenId);
}

/* ── WAKE LOCK ──────────────────────────────────────────────── */

let _wakeLock = null;

function _wakeLockEnabled() { return localStorage.getItem('sos-wake-lock') === '1'; }

async function _acquireWakeLock() {
  if (!('wakeLock' in navigator) || _wakeLock) return;
  try {
    _wakeLock = await navigator.wakeLock.request('screen');
    _wakeLock.addEventListener('release', () => { _wakeLock = null; });
  } catch (_) { _wakeLock = null; }
}

function _releaseWakeLock() {
  if (_wakeLock) { _wakeLock.release(); _wakeLock = null; }
}

/* ── AUTO-STOP ──────────────────────────────────────────────── */

let _autoStopTimer = null;

function _autoStopEnabled() { return localStorage.getItem('sos-auto-stop') === '1'; }
function _autoStopMs() { return Math.max(1, +(localStorage.getItem('sos-auto-stop-min') || 30)) * 60000; }

function _resetAutoStop() {
  if (_autoStopTimer) { clearTimeout(_autoStopTimer); _autoStopTimer = null; }
  if (!_autoStopEnabled()) return;
  _autoStopTimer = setTimeout(() => {
    _autoStopTimer = null;
    audioStopAll(0);
    document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing'));
    showToast('Auto-stop — all audio stopped.');
  }, _autoStopMs());
}

function _cancelAutoStop() {
  if (_autoStopTimer) { clearTimeout(_autoStopTimer); _autoStopTimer = null; }
}

/* ── SCREEN: INTRO ──────────────────────────────────────────── */

/** @returns {string} */
function introHTML() {
  return `<div class="su-wrap">
    <div class="cb-wrap" style="margin-bottom:16px">
      <div class="flame-box"><div id="flame-su"></div></div>
      <span class="cb-tl"></span><span class="cb-tr"></span>
      <span class="cb-bl"></span><span class="cb-br"></span>
    </div>
    <div class="title-row" style="margin-top:18px">
      <span class="su-spark">✦</span>
      <h1 id="su-title" class="su-h1">Soundboard of Storytelling</h1>
      <span class="su-spark">✦</span>
    </div>
    <p class="su-sub">A tool for Game-Masters<br>and other creative Creatures</p>
    <button id="unlock-btn" class="unlock-btn" data-target="menu">TAP TO START</button>
  </div>`;
}

function mountIntro() {
  const title = document.getElementById('su-title');
  const btn   = document.getElementById('unlock-btn');
  new AnimatedFlame(document.getElementById('flame-su'), {
    size: 140, interactive: true,
    onColdChange(cold) {
      if (title) {
        title.style.color = lerpColor('#F5C242', '#9FD8EE', cold);
        const wg = `0 0 6px rgba(245,194,66,.55),0 0 18px rgba(245,194,66,.32),0 0 36px rgba(245,194,66,.18)`;
        const cg = `0 0 6px rgba(159,216,238,${(.55 - cold * .2).toFixed(3)}),0 0 18px rgba(159,216,238,${(.32 - cold * .12).toFixed(3)})`;
        title.style.textShadow = cold < 0.5 ? wg : cg;
      }
      if (btn) {
        btn.textContent       = cold > 0.85 ? 'TAP TO THAW' : 'TAP TO START';
        btn.style.borderColor = lerpColor('#2A8A4F', '#5BAFD8', cold);
        btn.style.color       = lerpColor('#3FD083', '#9FD8EE', cold);
      }
    },
  });
}

/* ── SCREEN: MENU ───────────────────────────────────────────── */

/**
 * @param {{icon:string, label:string, sub:string, target:ScreenId, active:boolean, subId?:string}} opts
 * @returns {string}
 */
function menuRow({ icon, label, sub, target, active, subId }) {
  return `<div class="mopt${active ? ' mp' : ''}" data-target="${target}">
    <div class="mico">${pi(icon, 22, 'currentColor')}</div>
    <div class="mopt-text">
      <div class="mlbl">${label}</div>
      <div class="msub"${subId ? ` id="${subId}"` : ''}>${sub}</div>
    </div>
  </div>`;
}

/** @returns {string} */
function menuHTML() {
  return `<div class="smm-wrap">
    <div class="smm-title">
      <div class="cb-wrap" style="margin-bottom:16px">
        <div class="flame-box"><div id="flame-smm"></div></div>
        <span class="cb-tl"></span><span class="cb-tr"></span>
        <span class="cb-bl"></span><span class="cb-br"></span>
      </div>
      <div class="title-row">
        <span class="su-spark" style="font-size:14px">✦</span>
        <h1 class="smm-h1">Soundboard of Storytelling</h1>
        <span class="su-spark" style="font-size:14px">✦</span>
      </div>
      <p class="su-sub" style="margin-top:4px">A tool for Game-Masters and other creative Creatures</p>
      <div class="pix-div" style="margin-top:10px">◆</div>
      <div class="ver-label" data-action="show-changelog" title="Show changelog">
        <span>v ${APP_VERSION}</span>
        ${pi('info', 11)}
      </div>
    </div>
    <div class="mopts">
      ${menuRow({ icon: 'rune',     label: 'BOARD',             sub: '…',                                 target: 'board-list', active: false, subId: 'menu-board-sub' })}
      ${menuRow({ icon: 'scroll',   label: 'LIBRARY',           sub: 'Audio, icons &amp; boards',         target: 'library',    active: false })}
      ${menuRow({ icon: 'cog',      label: 'SETTINGS',          sub: 'Theme, font size &amp; start mode', target: 'settings',   active: false })}
      ${menuRow({ icon: 'keyboard', label: 'TIPS &amp; TRICKS', sub: 'Controls and key bindings',         target: 'tips',       active: false })}
      ${menuRow({ icon: 'info',     label: 'ABOUT',             sub: 'What this is and how it works',     target: 'about',      active: false })}
    </div>
    <div class="m-bkp-row">
      <button class="m-bkp-btn" data-action="backup">
        ${pi('save', 14, 'currentColor')} BACKUP <span class="m-bkp-age">· never</span>
      </button>
      <button class="m-bkp-btn import" data-action="import">
        ${pi('download', 14, 'currentColor')} IMPORT
      </button>
    </div>
  </div>`;
}

async function mountMenu() {
  new AnimatedFlame(document.getElementById('flame-smm'), { size: 84, interactive: true });
  _updateBkpAge();
  const boards = await boardGetAll();
  const subEl  = document.getElementById('menu-board-sub');
  if (subEl) {
    if (!boards.length) {
      subEl.textContent = 'No boards yet';
    } else {
      const active = S.boardId ? boards.find(b => b.id === S.boardId) : null;
      subEl.textContent = active
        ? `${boards.length} board${boards.length !== 1 ? 's' : ''} · ${active.name}`
        : `${boards.length} board${boards.length !== 1 ? 's' : ''}`;
    }
  }
}

/* ── SCREEN: LIBRARY ─────────────────────────────────────────── */

let _libTab         = 'audio';
let _libSearchQ     = '';
let _libFolder      = null;
let _libFilter      = 'all';
let _libDeleteCfm   = null;
let _libBdDeleteCfm = null;
let _libUploading   = false;
let _libEntries     = [];

/** @returns {Promise<void>} */
async function _libRefresh() {
  _libEntries = await libGetAllMeta();
}

/** @returns {string} */
function libraryHTML() {
  return `
  <div class="lib-top-bar">
    <div class="lib-top-col">
      <button class="lib-menu-btn" data-target="menu">${pi('scroll', 18, 'currentColor')}<span>MENU</span></button>
    </div>
    <div class="lib-top-col lib-top-center">
      <span class="lib-title">LIBRARY</span>
      <span class="lib-breadcrumb-sep">·</span>
      <span id="lib-breadcrumb" class="lib-breadcrumb">${_libFolder ? escHtml(_libFolder) : 'all files'}</span>
    </div>
    <div class="lib-top-col lib-top-right">
      <div class="act-btn" style="font-family:var(--font-ui);font-size:14px;letter-spacing:0">?</div>
    </div>
  </div>

  <div class="lib-tabs">
    <div class="lib-tab${_libTab==='audio'?' is-active':''}" data-action="lib-tab" data-tab="audio">AUDIO <span class="lib-tab-count" id="lc-audio">—</span></div>
    <div class="lib-tab${_libTab==='pads'?' is-active':''}" data-action="lib-tab" data-tab="pads">PADS</div>
    <div class="lib-tab${_libTab==='boards'?' is-active':''}" data-action="lib-tab" data-tab="boards">BOARDS <span class="lib-tab-count" id="lc-boards">—</span></div>
    <div class="lib-tab${_libTab==='icons'?' is-active':''}" data-action="lib-tab" data-tab="icons">ICONS</div>
  </div>

  <div class="lib-body">
    <div class="tab-panel${_libTab==='audio'?' is-active':''}" id="tab-audio">
      <aside class="lib-sidebar">
        <div class="sb-panel-header is-active">${pi('tag',12,'currentColor')} FILTER</div>
        <div class="lib-sidebar-scroll">
          <div class="facet-row${_libFilter==='all'?' is-active':''}" data-action="lib-filter" data-filter="all">
            <span style="flex:1">All sounds</span><span class="facet-n" id="fc-all">—</span>
          </div>
          <div class="facet-row${_libFilter==='used'?' is-active':''}" data-action="lib-filter" data-filter="used">
            <span class="facet-dot" style="background:var(--pad-loop)"></span>
            <span style="flex:1">In use</span><span class="facet-n">—</span>
          </div>
          <div class="facet-row${_libFilter==='unused'?' is-active':''}" data-action="lib-filter" data-filter="unused">
            <span class="facet-dot" style="background:var(--text-mute)"></span>
            <span style="flex:1">Unused</span><span class="facet-n">—</span>
          </div>
        </div>
        <div class="sb-panel-header">${pi('book',12,'currentColor')} FOLDERS</div>
        <div class="lib-sidebar-scroll" id="lib-folders">
          <div class="facet-row${!_libFolder?' is-active':''}" data-action="lib-folder" data-folder="">
            <span style="flex:1">All folders</span><span class="facet-n">—</span>
          </div>
        </div>
        <div style="flex:1"></div>
      </aside>
      <main class="lib-main">
        <div class="lib-toolbar">
          <div class="search-bar">
            ${pi('search', 13, 'var(--text-mute)')}
            <input id="lib-search" class="search-input" type="text" placeholder="Search sounds…" value="${escAttr(_libSearchQ)}">
          </div>
          <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="lib-upload">
            ${pi('download', 13, 'currentColor')} UPLOAD AUDIO
          </button>
        </div>
        <div id="lib-audio-list" class="lib-list-area">
          <p class="lib-empty">Loading…</p>
        </div>
      </main>
    </div>

    <div class="tab-panel${_libTab==='pads'?' is-active':''}" id="tab-pads">
      <main class="lib-main lib-main-stub"><p class="stub-sub" style="margin-top:40px">PAD templates — coming in Slice 5</p></main>
    </div>
    <div class="tab-panel${_libTab==='boards'?' is-active':''}" id="tab-boards">
      <main class="lib-main">
        <div class="lib-bd-list" id="lib-bd-list"><p class="lib-empty">Loading…</p></div>
      </main>
    </div>
    <div class="tab-panel${_libTab==='icons'?' is-active':''}" id="tab-icons">
      <main class="lib-main lib-main-stub"><p class="stub-sub" style="margin-top:40px">Icon library — coming in Slice 6</p></main>
    </div>
  </div>

  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">LIBRARY</span>
    <span class="sb-status-section" id="lib-status-tab">${_libTab.toUpperCase()}</span>
    <span id="lib-status-count" class="sb-status-section">—</span>
  </div>`;
}

async function mountLibrary() {
  const searchEl = document.getElementById('lib-search');
  if (searchEl) {
    searchEl.oninput = e => { _libSearchQ = e.target.value; renderAudioList(); };
  }

  const input = document.getElementById('lib-audio-input');
  if (input) {
    input.onchange = async () => {
      if (!input.files.length || _libUploading) return;
      _libUploading = true;
      const files = Array.from(input.files);
      input.value = '';
      const statusEl = document.getElementById('lib-status-count');
      let added = 0, dupes = 0;
      for (let i = 0; i < files.length; i++) {
        if (statusEl) statusEl.textContent = `Uploading ${i + 1}/${files.length}…`;
        try {
          const buf = await files[i].arrayBuffer();
          const res = await addToLib(buf, _cleanName(files[i].name), files[i].type);
          if (res.isDuplicate) dupes++; else added++;
        } catch (err) {
          console.error('Upload error:', err);
        }
      }
      _libUploading = false;
      await _libRefresh();
      renderAudioList();
      if (statusEl && added) {
        statusEl.textContent = `+${added} added${dupes ? ` · ${dupes} dupe${dupes > 1 ? 's' : ''} skipped` : ''}`;
        setTimeout(() => renderAudioList(), 3000);
      }
    };
  }

  await _libRefresh();
  if (_libTab === 'boards') renderBoardsTab();
  else renderAudioList();
}

function renderAudioList() {
  _libDeleteCfm = null;
  const listEl = document.getElementById('lib-audio-list');
  if (!listEl) return;

  const entries = _libEntries;

  const countEl = document.getElementById('lc-audio');
  if (countEl) countEl.textContent = entries.length || 0;

  const fcAllEl = document.getElementById('fc-all');
  if (fcAllEl) fcAllEl.textContent = entries.length;

  const statusCount = document.getElementById('lib-status-count');
  if (statusCount) {
    const totalSize = entries.reduce((s, e) => s + (e.size || 0), 0);
    statusCount.textContent = entries.length
      ? `${entries.length} file${entries.length !== 1 ? 's' : ''} · ${fmtSize(totalSize)}`
      : 'No audio files';
  }

  const folders = [...new Set(entries.map(e => e.folder).filter(Boolean))].sort();
  const foldersEl = document.getElementById('lib-folders');
  if (foldersEl) {
    foldersEl.innerHTML = `
      <div class="facet-row${!_libFolder ? ' is-active' : ''}" data-action="lib-folder" data-folder="">
        <span style="flex:1">All folders</span><span class="facet-n">${entries.length}</span>
      </div>
      ${folders.map(f => `<div class="facet-row${_libFolder === f ? ' is-active' : ''}" data-action="lib-folder" data-folder="${escAttr(f)}">
        <span style="flex:1">${escHtml(f)}</span><span class="facet-n">${entries.filter(e => e.folder === f).length}</span>
      </div>`).join('')}`;
  }

  const usedHashes = new Set();
  const scopeFiltered = _libFilter === 'used'   ? entries.filter(e =>  usedHashes.has(e.hash))
                      : _libFilter === 'unused' ? entries.filter(e => !usedHashes.has(e.hash))
                      : entries;
  const folderFiltered = _libFolder ? scopeFiltered.filter(e => e.folder === _libFolder) : scopeFiltered;
  const q = _libSearchQ.toLowerCase().trim();
  const searched = q ? folderFiltered.filter(e => (e.name || '').toLowerCase().includes(q)) : folderFiltered;
  const sorted = searched.slice().sort((a, b) => (b.added || 0) - (a.added || 0));

  if (!sorted.length) {
    const msg = entries.length === 0
      ? 'No audio files yet. Tap UPLOAD AUDIO to add some.'
      : q  ? `No files matching "${escHtml(q)}".`
      : _libFolder ? `No files in folder "${escHtml(_libFolder)}".`
      : 'No files match the current filter.';
    listEl.innerHTML = `<p class="lib-empty">${msg}</p>`;
    return;
  }

  listEl.innerHTML = sorted.map(e => audioRowHTML(e)).join('');
}

/**
 * @param {{hash:string,name:string,origName:string,size:number,duration:number,added:number,peaks:number[]}} e
 * @returns {string}
 */
function audioRowHTML(e) {
  const date  = e.added ? new Date(e.added).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'2-digit' }) : '—';
  const isCfm = _libDeleteCfm === e.hash;
  return `<div class="audio-row" data-hash="${e.hash}">
    <div class="audio-col-wave">${_waveMini(e.peaks)}</div>
    <div class="audio-col-name">
      <span class="audio-name">${escHtml(e.name)}</span>
      ${e.origName && e.origName !== e.name ? `<span class="audio-orig">${escHtml(e.origName)}</span>` : ''}
    </div>
    <div class="audio-col-date">${date}</div>
    <div class="audio-col-dur">${fmtDur(e.duration)}</div>
    <div class="audio-col-size">${fmtSize(e.size)}</div>
    <div class="audio-col-acts">
      <button class="act-btn" data-action="lib-rename" data-hash="${e.hash}" title="Rename">${pi('edit',12,'currentColor')}</button>
      <button class="act-btn danger${isCfm?' is-confirm':''}" data-action="lib-delete" data-hash="${e.hash}" title="Delete">${isCfm?'SURE?':'×'}</button>
    </div>
  </div>`;
}

function handleLibTab(tab) {
  _libTab = tab;
  document.querySelectorAll('.lib-tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('is-active', p.id === 'tab-' + tab));
  const s = document.getElementById('lib-status-tab');
  if (s) s.textContent = tab.toUpperCase();
  if (tab === 'boards') renderBoardsTab();
  else if (tab === 'audio') renderAudioList();
}

function handleLibFilter(filter) {
  _libFilter = filter || 'all';
  document.querySelectorAll('.facet-row[data-action="lib-filter"]').forEach(r =>
    r.classList.toggle('is-active', r.dataset.filter === _libFilter));
  renderAudioList();
}

function handleLibFolder(folder) {
  _libFolder = folder || null;
  const bc = document.getElementById('lib-breadcrumb');
  if (bc) bc.textContent = _libFolder ? _libFolder : 'all files';
  renderAudioList();
}

async function handleLibDelete(hash) {
  if (_libDeleteCfm === hash) {
    _libDeleteCfm = null;
    await libDelete(hash);
    await _libRefresh();
    renderAudioList();
  } else {
    if (_libDeleteCfm) {
      const old = document.querySelector(`.act-btn.danger[data-hash="${_libDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
    }
    _libDeleteCfm = hash;
    const btn = document.querySelector(`.act-btn.danger[data-hash="${hash}"]`);
    if (btn) { btn.classList.add('is-confirm'); btn.textContent = 'SURE?'; }
  }
}

async function handleLibRename(hash) {
  const nameEl = document.querySelector(`.audio-row[data-hash="${hash}"] .audio-name`);
  if (!nameEl) return;
  const currentName = nameEl.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.className = 'audio-name-input';
  nameEl.replaceWith(input);
  input.focus();
  input.select();
  const commit = async () => {
    const newName = input.value.trim() || currentName;
    if (newName !== currentName) await libUpdateMeta(hash, { name: newName, updatedAt: Date.now() });
    await _libRefresh();
    renderAudioList();
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); input.removeEventListener('blur', commit); input.blur(); commit(); }
    if (e.key === 'Escape') { input.removeEventListener('blur', commit); input.blur(); renderAudioList(); }
  });
}


async function renderBoardsTab() {
  _libBdDeleteCfm = null;
  const listEl = document.getElementById('lib-bd-list');
  if (!listEl) return;

  const boards = await boardGetAll();

  const countEl = document.getElementById('lc-boards');
  if (countEl) countEl.textContent = boards.length || 0;

  const statusCount = document.getElementById('lib-status-count');
  if (statusCount) statusCount.textContent = boards.length
    ? `${boards.length} board${boards.length !== 1 ? 's' : ''}`
    : 'No boards';

  if (!boards.length) {
    listEl.innerHTML = `<p class="lib-empty">No boards yet. Create one on the Board List screen.</p>`;
    return;
  }

  listEl.innerHTML = boards.map(b => {
    const isActive = b.id === S.boardId;
    const sceneN   = b.scenes?.length || 0;
    const setN     = b.sets?.length   || 0;
    const date     = b.updated
      ? new Date(b.updated).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'2-digit' })
      : b.created
        ? new Date(b.created).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'2-digit' })
        : '—';
    const isCfm = _libBdDeleteCfm === b.id;
    return `<div class="lib-bd-row${isActive ? ' is-active' : ''}" data-board-id="${b.id}">
      <div class="lib-bd-info">
        <div class="lib-bd-name">${escHtml(b.name)}</div>
        <div class="lib-bd-meta">${sceneN} scene${sceneN !== 1 ? 's' : ''} · ${setN} set${setN !== 1 ? 's' : ''} · ${date}</div>
      </div>
      <div class="lib-bd-acts">
        <button class="sb-btn sb-btn-sm${isActive ? ' sb-btn-filled' : ' sb-btn-ghost'}" data-action="lib-bd-open" data-board-id="${b.id}">OPEN</button>
        <button class="act-btn danger${isCfm ? ' is-confirm' : ''}" data-action="lib-bd-delete" data-board-id="${b.id}" title="Delete board">${isCfm ? 'SURE?' : '×'}</button>
      </div>
    </div>`;
  }).join('');
}

async function handleLibBdDelete(boardId) {
  if (_libBdDeleteCfm === boardId) {
    _libBdDeleteCfm = null;
    const board = (await boardGetAll()).find(b => b.id === boardId);
    if (board?.scenes) { for (const s  of board.scenes) await sceneDelete(s.id); }
    if (board?.sets)   { for (const st of board.sets)   await setDelete(st.id);  }
    await boardDelete(boardId);
    if (S.boardId === boardId) set.boardId(null);
    renderBoardsTab();
  } else {
    if (_libBdDeleteCfm) {
      const old = document.querySelector(`.act-btn.danger[data-board-id="${_libBdDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
    }
    _libBdDeleteCfm = boardId;
    const btn = document.querySelector(`.act-btn.danger[data-board-id="${boardId}"]`);
    if (btn) { btn.classList.add('is-confirm'); btn.textContent = 'SURE?'; }
  }
}

/* ── SCREEN: BOARD LIST ──────────────────────────────────────── */

let _blBoards     = [];
let _blDeleteCfm  = null;
let _blCreateOpen = false;

async function _blRefresh() {
  _blBoards = await boardGetAll();
}

/** @returns {string} */
function boardListHTML() {
  return `
  <div class="lib-top-bar">
    <div class="lib-top-col">
      <button class="lib-menu-btn" data-target="menu">${pi('scroll', 18, 'currentColor')}<span>MENU</span></button>
    </div>
    <div class="lib-top-col lib-top-center">
      <span class="lib-title">BOARDS</span>
    </div>
    <div class="lib-top-col lib-top-right" style="width:80px"></div>
  </div>
  <div class="bl-body" id="bl-body">
    <p class="lib-empty">Loading…</p>
  </div>
  <div id="bl-sheet-wrap"></div>
  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">BOARDS</span>
    <span class="sb-status-section" id="bl-status">—</span>
  </div>`;
}

async function mountBoardList() {
  await _blRefresh();
  renderBoardList();
}

function renderBoardList() {
  _blDeleteCfm = null;
  const el = document.getElementById('bl-body');
  if (!el) return;

  const statusEl = document.getElementById('bl-status');
  if (statusEl) statusEl.textContent = `${_blBoards.length} board${_blBoards.length !== 1 ? 's' : ''}`;

  if (!_blBoards.length) {
    el.innerHTML = `<div class="bl-empty-state">
      <p class="lib-empty">No boards yet.</p>
      <button class="sb-btn sb-btn-filled" data-action="bl-create">+ CREATE BOARD</button>
    </div>`;
    return;
  }

  el.innerHTML = `<div class="bl-list">
    ${_blBoards.map(b => boardCardHTML(b)).join('')}
    <div class="bl-new-row">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="bl-create">+ NEW BOARD</button>
    </div>
  </div>`;
}

/** @param {Object} b @returns {string} */
function boardCardHTML(b) {
  const isCfm    = _blDeleteCfm === b.id;
  const isActive = S.boardId === b.id;
  const nScenes  = (b.scenes || []).length;
  return `<div class="bl-card${isActive ? ' is-active' : ''}">
    <div class="bl-card-inner" data-action="bl-open" data-board-id="${b.id}">
      <div class="bl-card-icon">${pi('rune', 20, 'currentColor')}</div>
      <div class="bl-card-text">
        <div class="bl-card-name">${escHtml(b.name)}</div>
        <div class="bl-card-sub">${nScenes} scene${nScenes !== 1 ? 's' : ''}${isActive ? ' · active' : ''}</div>
      </div>
    </div>
    <button class="act-btn danger${isCfm ? ' is-confirm' : ''}" data-action="bl-delete" data-board-id="${b.id}" title="Delete board">${isCfm ? 'SURE?' : '×'}</button>
  </div>`;
}

function openBoardCreate() {
  if (_blCreateOpen) return;
  _blCreateOpen = true;
  const wrap = document.getElementById('bl-sheet-wrap');
  if (!wrap) return;
  wrap.innerHTML = `<div class="scene-opts" id="bl-create-sheet">
    <div class="scene-opts-header">
      <span class="scene-opts-title">${pi('rune', 12, 'var(--mode-setup)')} NEW BOARD</span>
      <button class="act-btn" data-action="bl-create-close">×</button>
    </div>
    <div class="scene-opts-body">
      <div class="scene-opts-row">
        <label class="scene-opts-label">NAME</label>
        <input class="scene-opts-input" id="bl-create-name" type="text"
               placeholder="Board name" maxlength="40" autocomplete="off">
      </div>
      <div class="scene-opts-actions">
        <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bl-create-confirm">CREATE</button>
      </div>
    </div>
  </div>`;
  document.getElementById('bl-create-name')?.focus();
}

function closeBoardCreate() {
  _blCreateOpen = false;
  const wrap = document.getElementById('bl-sheet-wrap');
  if (wrap) wrap.innerHTML = '';
}

async function handleBoardCreateConfirm() {
  const name = (document.getElementById('bl-create-name')?.value || '').trim();
  if (!name) return;
  closeBoardCreate();
  const board = await boardCreate(name);
  set.boardId(board.id);
  navigate('board');
}

async function handleBlOpen(boardId) {
  set.boardId(boardId);
  navigate('board');
}

async function handleBlDelete(id) {
  if (_blDeleteCfm === id) {
    _blDeleteCfm = null;
    const board = _blBoards.find(b => b.id === id);
    if (board?.scenes) { for (const s of board.scenes) await sceneDelete(s.id); }
    if (board?.sets)   { for (const st of board.sets)   await setDelete(st.id); }
    await boardDelete(id);
    if (S.boardId === id) set.boardId(null);
    await _blRefresh();
    renderBoardList();
  } else {
    if (_blDeleteCfm) {
      const old = document.querySelector(`.act-btn.danger[data-board-id="${_blDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
    }
    _blDeleteCfm = id;
    const btn = document.querySelector(`.act-btn.danger[data-board-id="${id}"]`);
    if (btn) { btn.classList.add('is-confirm'); btn.textContent = 'SURE?'; }
  }
}

/* ── SCREEN: BOARD ───────────────────────────────────────────── */

let _bdBoard        = null;
let _bdScene        = null;
let _bdSet          = null;
let _bdPickerSlot   = null;  // scene pad picker slot
let _bdSetPickerSlot = null; // set pad picker slot
let _bdOptsSlot     = null;  // scene pad opts slot
let _bdSetOptsSlot  = null;  // set pad opts slot
let _bdSceneOptsId  = null;
let _bdSceneOptsCfm = false;
let _bdSceneAddOpen = false;
let _bdSetOptsId    = null;
let _bdSetOptsCfm   = false;
let _bdSetAddOpen   = false;

// Playlist pad state
const _plState = {};             // padId → { order: number[], pos: number }
let _editingPlaylistFiles = [];  // files being edited in pad opts sheet
let _bdPickerMode = 'single';    // 'single' | 'playlist-add'

// Quick-volume long-press state
let _lpTimer  = null;
let _lpFired  = false;
let _lpStartX = 0;
let _lpStartY = 0;
let _lpPadId  = null;
let _lpSlot   = null;
let _lpIsSet  = false;
let _lpNewVol = null;

// Drag-to-reorder state (SETUP mode)
let _dragSlot     = null;
let _dragIsSet    = false;
let _dragActive   = false;
let _dragDidDrop  = false;
let _dragStartX   = 0;
let _dragStartY   = 0;
let _dragOffX     = 0;
let _dragOffY     = 0;
let _dragGhost    = null;
let _dragTarget   = null;
let _dragSourceEl = null;

/** @returns {string} */
function boardHTML() {
  if (!S.boardId) {
    return `<div class="bd-no-board">
      <p class="stub-sub">No board selected.</p>
      <button class="sb-btn sb-btn-filled" data-target="board-list" style="margin-top:16px">SELECT BOARD</button>
    </div>`;
  }
  const isSetup = S.boardMode === 'setup';
  const isGame  = S.boardMode === 'game';
  return `
  <div class="bd-top-bar">
    <button class="bd-back-btn" data-target="board-list">${pi('rune', 15, 'currentColor')}<span>BOARDS</span></button>
    <div class="bd-title-area">
      <span class="bd-board-name" id="bd-board-name" data-action="bd-rename-board" title="Tap to rename">—</span>
    </div>
    ${isGame ? `<button class="bd-stop-all-btn" data-action="bd-stop-all" title="Stop all sounds">■ STOP ALL</button>` : ''}
    <div class="bd-mode-toggle">
      <button class="bd-mode-btn${isSetup ? ' is-active' : ''}" data-action="bd-mode" data-mode="setup">SETUP</button>
      <button class="bd-mode-btn${isGame  ? ' is-active' : ''}" data-action="bd-mode" data-mode="game">GAME</button>
    </div>
  </div>
  <div class="bd-scene-bar" id="bd-scene-bar"></div>
  <div class="bd-content" id="bd-content">
    <div class="bd-grid-wrap" id="bd-grid-wrap"></div>
  </div>
  <div class="bd-qa-wrap" id="bd-qa-wrap"></div>
  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">BOARD</span>
    <span class="sb-status-section" id="bd-status-name">—</span>
    <span class="sb-status-section" id="bd-status-scene">—</span>
    <span class="sb-status-section" id="bd-status-mode" style="color:var(--mode-${S.boardMode})">${S.boardMode.toUpperCase()}</span>
  </div>`;
}

async function mountBoard() {
  if (!S.boardId) return;
  _bdBoard = await boardGet(S.boardId);
  if (!_bdBoard) { navigate('board-list'); return; }

  const sceneId = _bdBoard.activeSceneId || _bdBoard.scenes?.[0]?.id;
  _bdScene = sceneId ? await sceneGet(sceneId) : null;

  const setId = _bdBoard.activeSetId || _bdBoard.sets?.[0]?.id || null;
  _bdSet = setId ? await setGet(setId) : null;

  if (!_libEntries.length) await _libRefresh();

  const sm = localStorage.getItem('sos-start-mode') || 'setup';
  if      (sm === 'game')     set.boardMode('game');
  else if (sm === 'remember') set.boardMode(localStorage.getItem('sos-last-mode') || 'setup');
  else                        set.boardMode('setup');

  if (S.boardMode === 'game') {
    if (_wakeLockEnabled()) _acquireWakeLock();
    _resetAutoStop();
  }

  renderBoardUI();
}

function renderBoardUI() {
  if (!_bdBoard) return;

  const nameEl = document.getElementById('bd-board-name');
  if (nameEl) nameEl.textContent = _bdBoard.name;

  renderSceneBar();
  renderPadGrid();
  renderQA();

  const sName  = document.getElementById('bd-status-name');
  const sScene = document.getElementById('bd-status-scene');
  const sMode  = document.getElementById('bd-status-mode');
  if (sName)  sName.textContent  = _bdBoard.name;
  if (sScene) sScene.textContent = _bdScene?.name || '—';
  if (sMode)  { sMode.textContent = S.boardMode.toUpperCase(); sMode.style.color = `var(--mode-${S.boardMode})`; }
}

function renderSceneBar() {
  const el = document.getElementById('bd-scene-bar');
  if (!el || !_bdBoard) return;
  const isSetup = S.boardMode === 'setup';
  el.innerHTML = (_bdBoard.scenes || []).map(s => {
    const active = s.id === _bdScene?.id;
    return `<div class="bd-scene-tab${active ? ' is-active' : ''}" data-action="bd-scene-switch" data-scene-id="${s.id}">
      <span class="bd-scene-tab-name">${escHtml(s.name)}</span>
      ${active && isSetup ? `<button class="bd-scene-opts-btn" data-action="bd-scene-opts" data-scene-id="${s.id}">⋯</button>` : ''}
    </div>`;
  }).join('') + (isSetup ? `<button class="bd-scene-add" data-action="bd-scene-add" title="Add scene">+</button>` : '');
}

function renderPadGrid() {
  const el = document.getElementById('bd-grid-wrap');
  if (!el) return;
  if (!_bdScene) { el.innerHTML = ''; return; }

  const cols    = _bdScene.gridCols || 4;
  const pads    = _bdScene.pads || [];
  const slotMap = new Map(pads.map(p => [p.slot, p]));

  const maxSlot = pads.length ? Math.max(...pads.map(p => p.slot)) : -1;
  const rows    = Math.max(3, Math.ceil((maxSlot + 1) / cols) + 1);
  const total   = rows * cols;

  let html = `<div class="bd-grid" style="--bd-cols:${cols}">`;
  for (let i = 0; i < total; i++) {
    const pad = slotMap.get(i);
    html += pad ? padCellHTML(pad) : emptyPadCellHTML(i);
  }
  html += '</div>';
  el.innerHTML = html;
}

/** @param {Object} pad @returns {string} */
function padCellHTML(pad) {
  const playing    = audioIsPlaying(pad.id);
  const isLoop     = pad.type === 'loop';
  const isPlaylist = pad.type === 'playlist';
  return `<div class="pad is-assigned${playing ? ' is-playing' : ''}${isLoop ? ' is-loop' : ''}${isPlaylist ? ' is-playlist' : ''}" data-pad-slot="${pad.slot}" data-pad-id="${escAttr(pad.id)}" data-action="bd-pad-tap">
    ${isLoop     ? `<span class="pad-loop-badge">↻</span>` : ''}
    ${isPlaylist ? `<span class="pad-loop-badge pad-pl-badge">☰</span>` : ''}
    <div class="pad-wave">${_waveMiniFromHash(pad.hash)}</div>
    <div class="pad-name">${escHtml(pad.name || '—')}</div>
    ${pad.hotkey ? `<span class="pad-hotkey">${escHtml(pad.hotkey)}</span>` : ''}
  </div>`;
}

/** @param {number} slot @returns {string} */
function emptyPadCellHTML(slot) {
  const isSetup = S.boardMode === 'setup';
  if (isSetup) {
    return `<div class="pad is-empty" data-pad-slot="${slot}" data-action="bd-pad-tap"><span class="pad-add">+</span></div>`;
  }
  return `<div class="pad is-empty is-game"></div>`;
}

/* ── QUICK ACCESS (QA) ──────────────────────────────────────── */

function renderQA() {
  const el = document.getElementById('bd-qa-wrap');
  if (!el) return;
  const isSetup = S.boardMode === 'setup';
  const sets    = _bdBoard?.sets || [];

  if (!sets.length) {
    el.innerHTML = isSetup
      ? `<div class="bd-qa-empty"><button class="bd-qa-add-set" data-action="bd-set-add">+ ADD SET</button></div>`
      : '';
    return;
  }

  el.innerHTML = `<div class="bd-set-bar" id="bd-set-bar"></div><div class="bd-set-strip" id="bd-set-strip"></div>`;
  renderSetBar();
  renderSetStrip();
}

function renderSetBar() {
  const el = document.getElementById('bd-set-bar');
  if (!el || !_bdBoard) return;
  const isSetup = S.boardMode === 'setup';
  el.innerHTML = (_bdBoard.sets || []).map(s => {
    const active = s.id === _bdSet?.id;
    return `<div class="bd-set-tab${active ? ' is-active' : ''}" data-action="bd-set-switch" data-set-id="${s.id}">
      <span class="bd-set-tab-name">${escHtml(s.name)}</span>
      ${active && isSetup ? `<button class="bd-set-opts-btn" data-action="bd-set-opts" data-set-id="${s.id}">⋯</button>` : ''}
    </div>`;
  }).join('') + (isSetup ? `<button class="bd-set-add" data-action="bd-set-add" title="Add set">+</button>` : '');
}

function renderSetStrip() {
  const el = document.getElementById('bd-set-strip');
  if (!el || !_bdSet) { if (el) el.innerHTML = ''; return; }

  const isSetup = S.boardMode === 'setup';
  const pads    = (_bdSet.pads || []).slice().sort((a, b) => a.slot - b.slot);
  const nextSlot = pads.length ? Math.max(...pads.map(p => p.slot)) + 1 : 0;

  let html = pads.map(p => setpadCellHTML(p)).join('');
  if (isSetup) {
    html += `<div class="set-pad is-empty" data-set-pad-slot="${nextSlot}" data-action="bd-set-pad-tap"><span class="set-pad-add">+</span></div>`;
  }
  el.innerHTML = html;
}

/** @param {Object} pad @returns {string} */
function setpadCellHTML(pad) {
  const playing = audioIsPlaying(pad.id);
  return `<div class="set-pad is-assigned${playing ? ' is-playing' : ''}" data-set-pad-slot="${pad.slot}" data-pad-id="${escAttr(pad.id)}" data-action="bd-set-pad-tap">
    <div class="set-pad-name">${escHtml(pad.name || '—')}</div>
  </div>`;
}

/* pad picker */

function openPadPicker(slot) {
  closePadOpts();
  closePadPicker();
  _bdPickerSlot = slot;
  const content = document.getElementById('bd-content');
  if (!content) return;

  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  content.insertAdjacentHTML('beforeend', `<div class="pad-picker" id="pad-picker">
    <div class="pad-picker-header">
      <span>Assign audio → slot ${slot + 1}</span>
      <button class="act-btn" data-action="bd-picker-close">×</button>
    </div>
    <div class="pad-picker-search">
      <div class="search-bar" style="margin:0;border-radius:0;clip-path:none;border-left:none;border-right:none;border-top:none">
        ${pi('search', 13, 'var(--text-mute)')}
        <input class="search-input" type="text" placeholder="Search…" id="pad-picker-q">
      </div>
    </div>
    <div class="pad-picker-list" id="pad-picker-list">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="bd-picker-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);

  const q = document.getElementById('pad-picker-q');
  if (q) {
    q.focus();
    q.oninput = () => {
      const term = q.value.toLowerCase().trim();
      document.querySelectorAll('.pad-picker-item').forEach(item => {
        const name = item.querySelector('.pad-picker-item-name')?.textContent || '';
        item.style.display = name.toLowerCase().includes(term) ? '' : 'none';
      });
    };
  }
}

function closePadPicker() {
  _bdPickerSlot    = null;
  _bdSetPickerSlot = null;
  _bdPickerMode    = 'single';
  document.getElementById('pad-picker')?.remove();
}

function openPlaylistTrackPicker() {
  // Don't close pad-opts — it stays open; just replace/open the picker overlay
  document.getElementById('pad-picker')?.remove();
  _bdPickerMode = 'playlist-add';
  const content = document.getElementById('bd-content');
  if (!content) return;
  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  content.insertAdjacentHTML('beforeend', `<div class="pad-picker" id="pad-picker">
    <div class="pad-picker-header">
      <span>Add track to playlist</span>
      <button class="act-btn" data-action="bd-picker-close">×</button>
    </div>
    <div class="pad-picker-search">
      <div class="search-bar" style="margin:0;border-radius:0;clip-path:none;border-left:none;border-right:none;border-top:none">
        ${pi('search', 13, 'var(--text-mute)')}
        <input class="search-input" type="text" placeholder="Search…" id="pad-picker-q">
      </div>
    </div>
    <div class="pad-picker-list" id="pad-picker-list">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="bd-picker-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);
  const q = document.getElementById('pad-picker-q');
  if (q) {
    q.focus();
    q.oninput = () => {
      const term = q.value.toLowerCase().trim();
      document.querySelectorAll('.pad-picker-item').forEach(item => {
        const name = item.querySelector('.pad-picker-item-name')?.textContent || '';
        item.style.display = name.toLowerCase().includes(term) ? '' : 'none';
      });
    };
  }
}

async function handlePadPick(hash, name) {
  if (_bdPickerMode === 'playlist-add') {
    _editingPlaylistFiles.push({ hash, name });
    document.getElementById('pad-picker')?.remove();
    _bdPickerMode = 'single';
    _renderPlaylistTracks();
    return;
  }
  if (_bdPickerSlot !== null && _bdScene) {
    const slot = _bdPickerSlot;
    closePadPicker();
    const existing = _bdScene.pads.find(p => p.slot === slot);
    const newPad   = existing
      ? { ...existing, hash, name: existing.name || name }
      : { id: _newId('p'), slot, type: 'single', name, hash, hotkey: '', ..._defaultPadOpts() };
    _bdScene.pads = existing
      ? _bdScene.pads.map(p => p.slot === slot ? newPad : p)
      : [..._bdScene.pads, newPad];
    await scenePut(_bdScene);
    renderPadGrid();
  } else if (_bdSetPickerSlot !== null && _bdSet) {
    const slot = _bdSetPickerSlot;
    closePadPicker();
    const existing = _bdSet.pads.find(p => p.slot === slot);
    const newPad   = existing
      ? { ...existing, hash, name: existing.name || name }
      : { id: _newId('p'), slot, type: 'single', name, hash, hotkey: '', ..._defaultPadOpts() };
    _bdSet.pads = existing
      ? _bdSet.pads.map(p => p.slot === slot ? newPad : p)
      : [..._bdSet.pads, newPad];
    await setPut(_bdSet);
    renderSetStrip();
  }
}

/* ── PLAYLIST HELPERS ──────────────────────────────────────── */

/** @param {Object} pad @returns {{order:number[],pos:number}} */
function _plInit(pad) {
  const n = (pad.files || []).length;
  const order = Array.from({ length: n }, (_, i) => i);
  if (pad.shuffle) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  }
  return { order, pos: 0 };
}

/** @param {Object} pad @returns {string|null} */
function _plCurrentHash(pad) {
  const st = _plState[pad.id];
  if (!st || !pad.files?.length) return null;
  return pad.files[st.order[st.pos]]?.hash || null;
}

/** @param {string} padId @param {number} len */
function _plAdvance(padId, len) {
  const st = _plState[padId];
  if (!st || !len) return;
  st.pos = (st.pos + 1) % len;
}

/** @param {string} padId @returns {Object|null} */
function _findPadById(padId) {
  return (_bdScene?.pads || []).find(p => p.id === padId)
      || (_bdSet?.pads   || []).find(p => p.id === padId)
      || null;
}

/** @returns {string} */
function _renderPlaylistTracksHTML() {
  if (!_editingPlaylistFiles.length) {
    return '<p class="pl-empty-hint">No tracks yet — use ADD TRACK below.</p>';
  }
  return _editingPlaylistFiles.map((f, i) =>
    `<div class="pl-track-item">
      <span class="pl-track-num">${i + 1}.</span>
      <span class="pl-track-name">${escHtml(f.name)}</span>
      <button class="act-btn" data-action="bd-opts-pl-remove" data-idx="${i}">×</button>
    </div>`
  ).join('');
}

function _renderPlaylistTracks() {
  const el = document.getElementById('pl-tracks');
  if (el) el.innerHTML = _renderPlaylistTracksHTML();
}

/* pad options bottom sheet */

/** @param {Object} pad @returns {string} */
function _padOptsHTML(pad) {
  const t       = pad.type || 'single';
  const vol     = pad.volume ?? 80;
  const shuffle = !!pad.shuffle;
  const isList  = t === 'playlist';
  return `<div class="pad-opts" id="pad-opts">
    <div class="pad-opts-title">${escHtml(pad.name || '—')}</div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Name</span>
      <input class="audio-name-input" id="pad-opts-name" type="text" value="${escAttr(pad.name || '')}" style="flex:1;min-width:0">
    </div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Type</span>
      <div class="pad-type-picker">
        <button class="pad-type-btn${t === 'single'   ? ' is-active' : ''}" data-action="bd-opts-type" data-type="single">SINGLE</button>
        <button class="pad-type-btn${t === 'loop'     ? ' is-active' : ''}" data-action="bd-opts-type" data-type="loop">LOOP ↻</button>
        <button class="pad-type-btn${t === 'playlist' ? ' is-active' : ''}" data-action="bd-opts-type" data-type="playlist">LIST ☰</button>
      </div>
    </div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Volume</span>
      <input class="audio-name-input" id="pad-opts-volume" type="number" min="0" max="100" value="${vol}" style="width:60px;text-align:right">
      <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-mute);margin-left:4px">%</span>
    </div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Hotkey</span>
      <input class="audio-name-input" id="pad-opts-hotkey" type="text" value="${escAttr(pad.hotkey || '')}" maxlength="4" style="width:60px">
    </div>
    <div class="pad-opts-section" id="pl-section"${isList ? '' : ' style="display:none"'}>
      <div class="pad-opts-row">
        <span class="pad-opts-label">Shuffle</span>
        <div class="pad-type-picker">
          <button class="pad-type-btn${shuffle  ? ' is-active' : ''}" data-action="bd-opts-shuffle" data-shuffle="1">ON</button>
          <button class="pad-type-btn${!shuffle ? ' is-active' : ''}" data-action="bd-opts-shuffle" data-shuffle="0">OFF</button>
        </div>
      </div>
      <div class="pl-tracks" id="pl-tracks">${_renderPlaylistTracksHTML()}</div>
      <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-top:4px" data-action="bd-opts-pl-add">+ ADD TRACK</button>
    </div>
    <div class="pad-opts-actions">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" id="pad-opts-change-btn" data-action="bd-opts-change"${isList ? ' style="display:none"' : ''}>Change Audio</button>
      <button class="sb-btn sb-btn-sm sb-btn-danger" data-action="bd-opts-clear">Clear</button>
      <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-opts-save">Save</button>
    </div>
  </div>`;
}

function openPadOpts(slot) {
  closePadPicker();
  closePadOpts();
  const pad = _bdScene?.pads.find(p => p.slot === slot);
  if (!pad) { openPadPicker(slot); return; }
  _bdOptsSlot = slot;
  _editingPlaylistFiles = (pad.files || []).map(f => ({ ...f }));
  document.getElementById('bd-content')?.insertAdjacentHTML('beforeend', _padOptsHTML(pad));
  document.getElementById('pad-opts-name')?.focus();
}

function closePadOpts() {
  _bdOptsSlot    = null;
  _bdSetOptsSlot = null;
  document.getElementById('pad-opts')?.remove();
}

async function handlePadOptsSave() {
  const name    = document.getElementById('pad-opts-name')?.value.trim() || '';
  const hotkey  = document.getElementById('pad-opts-hotkey')?.value.trim() || '';
  const type    = document.querySelector('.pad-type-btn.is-active')?.dataset.type || 'single';
  const volume  = Math.max(0, Math.min(100, +(document.getElementById('pad-opts-volume')?.value ?? 80)));
  const isList  = type === 'playlist';
  const files   = isList ? _editingPlaylistFiles.map(f => ({ hash: f.hash, name: f.name })) : undefined;
  const shuffle = isList ? document.querySelector('[data-action="bd-opts-shuffle"].is-active')?.dataset.shuffle === '1' : undefined;

  function _applyPad(p) {
    const base = { ...p, name, hotkey, type, volume };
    if (!isList) return base;
    base.files   = files;
    base.shuffle = shuffle;
    base.hash    = files?.length ? files[0].hash : (p.hash || null); // first track for waveform
    return base;
  }

  if (_bdOptsSlot !== null && _bdScene) {
    const slot = _bdOptsSlot; closePadOpts();
    _bdScene.pads = _bdScene.pads.map(p => p.slot === slot ? _applyPad(p) : p);
    await scenePut(_bdScene); renderPadGrid();
  } else if (_bdSetOptsSlot !== null && _bdSet) {
    const slot = _bdSetOptsSlot; closePadOpts();
    _bdSet.pads = _bdSet.pads.map(p => p.slot === slot ? _applyPad(p) : p);
    await setPut(_bdSet); renderSetStrip();
  }
}

async function handlePadOptsClear() {
  if (_bdOptsSlot !== null && _bdScene) {
    const slot = _bdOptsSlot; closePadOpts();
    _bdScene.pads = _bdScene.pads.filter(p => p.slot !== slot);
    await scenePut(_bdScene); renderPadGrid();
  } else if (_bdSetOptsSlot !== null && _bdSet) {
    const slot = _bdSetOptsSlot; closePadOpts();
    _bdSet.pads = _bdSet.pads.filter(p => p.slot !== slot);
    await setPut(_bdSet); renderSetStrip();
  }
}

function handlePadOptsChange() {
  if (_bdOptsSlot !== null) {
    const slot = _bdOptsSlot; closePadOpts(); openPadPicker(slot);
  } else if (_bdSetOptsSlot !== null) {
    const slot = _bdSetOptsSlot; closePadOpts(); openSetPadPicker(slot);
  }
}

/* scene management */

async function handleBdSceneSwitch(sceneId) {
  if (!_bdBoard || sceneId === _bdScene?.id) return;
  closePadPicker();
  closePadOpts();
  closeSceneOpts();
  closeSceneAdd();
  audioStopAll(0);
  document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing'));
  _bdBoard.activeSceneId = sceneId;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  _bdScene = await sceneGet(sceneId);
  renderBoardUI();
}

async function handleBdSceneAdd() { openSceneAdd(); }

async function handleBdSceneOpts(sceneId) { openSceneOpts(sceneId); }

async function handleBdSceneDelete(sceneId) {
  if (!_bdBoard) return;
  if ((_bdBoard.scenes || []).length <= 1) { showToast('Cannot delete the last scene.'); return; }
  _bdBoard.scenes  = _bdBoard.scenes.filter(x => x.id !== sceneId);
  if (_bdBoard.activeSceneId === sceneId) _bdBoard.activeSceneId = _bdBoard.scenes[0]?.id || null;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  await sceneDelete(sceneId);

  closePadPicker();
  closePadOpts();
  const newId = _bdBoard.activeSceneId;
  _bdScene = newId ? await sceneGet(newId) : null;
  renderBoardUI();
}

/* ── SET PAD PICKER + OPTS (context-aware shared picker) ──── */

function openSetPadPicker(slot) {
  closePadOpts();
  closePadPicker();
  _bdSetPickerSlot = slot;
  const content = document.getElementById('bd-content');
  if (!content) return;

  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  content.insertAdjacentHTML('beforeend', `<div class="pad-picker" id="pad-picker">
    <div class="pad-picker-header">
      <span>Assign audio → Set pad ${slot + 1}</span>
      <button class="act-btn" data-action="bd-picker-close">×</button>
    </div>
    <div class="pad-picker-search">
      <div class="search-bar" style="margin:0;border-radius:0;clip-path:none;border-left:none;border-right:none;border-top:none">
        ${pi('search', 13, 'var(--text-mute)')}
        <input class="search-input" type="text" placeholder="Search…" id="pad-picker-q">
      </div>
    </div>
    <div class="pad-picker-list" id="pad-picker-list">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="bd-picker-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);

  const q = document.getElementById('pad-picker-q');
  if (q) {
    q.focus();
    q.oninput = () => {
      const term = q.value.toLowerCase().trim();
      document.querySelectorAll('.pad-picker-item').forEach(item => {
        const name = item.querySelector('.pad-picker-item-name')?.textContent || '';
        item.style.display = name.toLowerCase().includes(term) ? '' : 'none';
      });
    };
  }
}

function openSetPadOpts(slot) {
  closePadPicker();
  closePadOpts();
  const pad = _bdSet?.pads.find(p => p.slot === slot);
  if (!pad) { openSetPadPicker(slot); return; }
  _bdSetOptsSlot = slot;
  _editingPlaylistFiles = (pad.files || []).map(f => ({ ...f }));
  document.getElementById('bd-content')?.insertAdjacentHTML('beforeend', _padOptsHTML(pad));
  document.getElementById('pad-opts-name')?.focus();
}

async function handleQaPadTap(slot) {
  const pad = _bdSet?.pads.find(p => p.slot === slot);
  if (S.boardMode === 'setup') {
    if (pad) openSetPadOpts(slot);
    else openSetPadPicker(slot);
    return;
  }
  if (!pad) return;
  const el = document.querySelector(`[data-pad-id="${CSS.escape(pad.id)}"]`);
  if (pad.type === 'playlist') {
    if (!pad.files?.length) return;
    if (audioIsPlaying(pad.id)) {
      delete _plState[pad.id];
      audioStop(pad.id, { fade: pad.fadeOut || 0 });
      el?.classList.remove('is-playing');
    } else {
      if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
      const hash = _plCurrentHash(pad);
      if (!hash) return;
      audioPlay(pad.id, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (!pad.hash) return;
  if (audioIsPlaying(pad.id)) {
    audioStop(pad.id, { fade: pad.fadeOut || 0 });
    el?.classList.remove('is-playing');
  } else {
    audioPlay(pad.id, pad.hash, {
      type: pad.type || 'single', volume: pad.volume ?? 80,
      fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
    });
    el?.classList.add('is-playing');
    _resetAutoStop();
  }
}

/* ── SET MANAGEMENT ───────────────────────────────────────── */

async function handleSetSwitch(setId) {
  if (!_bdBoard || setId === _bdSet?.id) return;
  closePadPicker();
  closePadOpts();
  closeSetOpts();
  closeSetAdd();
  _bdBoard.activeSetId = setId;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  _bdSet = await setGet(setId);
  renderSetBar();
  renderSetStrip();
}

function openSetAdd() {
  if (!_bdBoard) return;
  closePadPicker(); closePadOpts(); closeSetOpts(); closeSetAdd();
  _bdSetAddOpen = true;
  const qa = document.getElementById('bd-qa-wrap');
  if (!qa) return;
  qa.insertAdjacentHTML('beforeend', `
    <div class="set-opts" id="set-add-sheet">
      <div class="scene-opts-header">
        <span class="scene-opts-title">${pi('cog', 12, 'var(--mode-setup)')} NEW SET</span>
        <button class="act-btn" data-action="bd-set-add-close">×</button>
      </div>
      <div class="scene-opts-body">
        <div class="scene-opts-row">
          <label class="scene-opts-label">NAME</label>
          <input class="scene-opts-input" id="set-add-name" type="text"
                 placeholder="Set name" maxlength="40" autocomplete="off">
        </div>
        <div class="scene-opts-actions">
          <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-set-add-confirm">CREATE</button>
        </div>
      </div>
    </div>`);
  document.getElementById('set-add-name')?.focus();
}

function closeSetAdd() {
  _bdSetAddOpen = false;
  document.getElementById('set-add-sheet')?.remove();
}

async function handleSetAddConfirm() {
  const name = (document.getElementById('set-add-name')?.value || '').trim();
  if (!name) return;
  closeSetAdd();
  _bdSet = await setCreate(_bdBoard, name);
  renderQA();
}

function openSetOpts(setId) {
  closePadPicker(); closePadOpts(); closeSetAdd(); closeSetOpts();
  _bdSetOptsId  = setId;
  _bdSetOptsCfm = false;
  const s = _bdBoard?.sets?.find(x => x.id === setId);
  if (!s) return;
  const canDel = (_bdBoard?.sets || []).length > 0; // sets are optional, always deleteable
  const qa = document.getElementById('bd-qa-wrap');
  if (!qa) return;
  qa.insertAdjacentHTML('beforeend', `
    <div class="set-opts" id="set-opts-sheet">
      <div class="scene-opts-header">
        <span class="scene-opts-title">${pi('cog', 12, 'var(--mode-setup)')} SET</span>
        <button class="act-btn" data-action="bd-set-opts-close">×</button>
      </div>
      <div class="scene-opts-body">
        <div class="scene-opts-row">
          <label class="scene-opts-label">NAME</label>
          <input class="scene-opts-input" id="set-opts-name" type="text"
                 value="${escAttr(s.name)}" maxlength="40" autocomplete="off">
        </div>
        <div class="scene-opts-actions">
          <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-set-opts-save">SAVE</button>
          <button class="sb-btn sb-btn-sm sb-btn-danger" id="set-opts-del"
                  data-action="bd-set-opts-delete">DELETE</button>
        </div>
      </div>
    </div>`);
  document.getElementById('set-opts-name')?.focus();
}

function closeSetOpts() {
  _bdSetOptsId  = null;
  _bdSetOptsCfm = false;
  document.getElementById('set-opts-sheet')?.remove();
}

async function handleSetOptsSave() {
  if (!_bdSetOptsId || !_bdBoard) return;
  const name = (document.getElementById('set-opts-name')?.value || '').trim();
  if (!name) return;
  _bdBoard.sets = _bdBoard.sets.map(x => x.id === _bdSetOptsId ? { ...x, name } : x);
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  const sc = _bdSet?.id === _bdSetOptsId ? _bdSet : await setGet(_bdSetOptsId);
  if (sc) { sc.name = name; await setPut(sc); if (_bdSet?.id === _bdSetOptsId) _bdSet = sc; }
  closeSetOpts();
  renderSetBar();
}

async function handleSetOptsDelete() {
  if (!_bdSetOptsId || !_bdBoard) return;
  const delBtn = document.getElementById('set-opts-del');
  if (!_bdSetOptsCfm) {
    _bdSetOptsCfm = true;
    if (delBtn) { delBtn.textContent = 'CONFIRM?'; delBtn.classList.add('is-confirming'); }
    return;
  }
  const id = _bdSetOptsId;
  closeSetOpts();
  _bdBoard.sets = _bdBoard.sets.filter(x => x.id !== id);
  if (_bdBoard.activeSetId === id) _bdBoard.activeSetId = _bdBoard.sets[0]?.id || null;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  await setDelete(id);
  const newSetId = _bdBoard.activeSetId;
  _bdSet = newSetId ? await setGet(newSetId) : null;
  renderQA();
}

/* ── SCENE OPTS BOTTOM SHEET ──────────────────────────────── */

function _sceneOptsHTML(sceneId) {
  const s    = _bdBoard?.scenes?.find(x => x.id === sceneId);
  if (!s) return '';
  const cols = (_bdScene?.id === sceneId ? _bdScene.gridCols : null) || s.gridCols || 4;
  const canDel = (_bdBoard?.scenes || []).length > 1;
  return `<div class="scene-opts" id="scene-opts">
    <div class="scene-opts-header">
      <span class="scene-opts-title">${pi('cog', 12, 'var(--mode-setup)')} SCENE</span>
      <button class="act-btn" data-action="bd-scene-opts-close">×</button>
    </div>
    <div class="scene-opts-body">
      <div class="scene-opts-row">
        <label class="scene-opts-label">NAME</label>
        <input class="scene-opts-input" id="scene-opts-name" type="text"
               value="${escAttr(s.name)}" maxlength="40" autocomplete="off">
      </div>
      <div class="scene-opts-row">
        <label class="scene-opts-label">GRID</label>
        <div class="scene-cols-picker">
          ${[2,3,4,5].map(n =>
            `<button class="cols-btn${n === cols ? ' is-active' : ''}"
                     data-action="bd-scene-cols" data-cols="${n}">${n}</button>`
          ).join('')}
        </div>
      </div>
      <div class="scene-opts-actions">
        <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-scene-opts-save">SAVE</button>
        ${canDel
          ? `<button class="sb-btn sb-btn-sm sb-btn-danger" id="scene-opts-del"
                     data-action="bd-scene-opts-delete">DELETE</button>`
          : ''}
      </div>
    </div>
  </div>`;
}

function openSceneOpts(sceneId) {
  closePadPicker();
  closePadOpts();
  closeSceneAdd();
  closeSceneOpts();
  _bdSceneOptsId  = sceneId;
  _bdSceneOptsCfm = false;
  const content = document.getElementById('bd-content');
  if (!content) return;
  content.insertAdjacentHTML('beforeend', _sceneOptsHTML(sceneId));
  document.getElementById('scene-opts-name')?.focus();
}

function closeSceneOpts() {
  _bdSceneOptsId  = null;
  _bdSceneOptsCfm = false;
  document.getElementById('scene-opts')?.remove();
}

async function handleSceneOptsSave() {
  if (!_bdSceneOptsId || !_bdBoard) return;
  const name = (document.getElementById('scene-opts-name')?.value || '').trim();
  if (!name) return;
  const activeBtn = document.querySelector('.cols-btn.is-active');
  const cols = activeBtn ? +activeBtn.dataset.cols : 4;

  _bdBoard.scenes  = _bdBoard.scenes.map(x => x.id === _bdSceneOptsId ? { ...x, name } : x);
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);

  const sc = _bdScene?.id === _bdSceneOptsId ? _bdScene : await sceneGet(_bdSceneOptsId);
  if (sc) {
    sc.name = name; sc.gridCols = cols;
    await scenePut(sc);
    if (_bdScene?.id === _bdSceneOptsId) _bdScene = sc;
  }

  closeSceneOpts();
  renderBoardUI();
}

async function handleSceneOptsDelete() {
  if (!_bdSceneOptsId) return;
  const delBtn = document.getElementById('scene-opts-del');
  if (!_bdSceneOptsCfm) {
    _bdSceneOptsCfm = true;
    if (delBtn) { delBtn.textContent = 'CONFIRM?'; delBtn.classList.add('is-confirming'); }
    return;
  }
  const id = _bdSceneOptsId;
  closeSceneOpts();
  await handleBdSceneDelete(id);
}

function handleSceneCols(cols) {
  document.querySelectorAll('.cols-btn').forEach(btn =>
    btn.classList.toggle('is-active', +btn.dataset.cols === +cols));
}

/* ── SCENE ADD BOTTOM SHEET ───────────────────────────────── */

function openSceneAdd() {
  if (!_bdBoard) return;
  closePadPicker();
  closePadOpts();
  closeSceneOpts();
  closeSceneAdd();
  _bdSceneAddOpen = true;
  const content = document.getElementById('bd-content');
  if (!content) return;
  content.insertAdjacentHTML('beforeend', `
    <div class="scene-opts scene-add-sheet" id="scene-add-sheet">
      <div class="scene-opts-header">
        <span class="scene-opts-title">${pi('cog', 12, 'var(--mode-setup)')} NEW SCENE</span>
        <button class="act-btn" data-action="bd-scene-add-close">×</button>
      </div>
      <div class="scene-opts-body">
        <div class="scene-opts-row">
          <label class="scene-opts-label">NAME</label>
          <input class="scene-opts-input" id="scene-add-name" type="text"
                 placeholder="Scene name" maxlength="40" autocomplete="off">
        </div>
        <div class="scene-opts-actions">
          <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-scene-add-confirm">CREATE</button>
        </div>
      </div>
    </div>
  `);
  document.getElementById('scene-add-name')?.focus();
}

function closeSceneAdd() {
  _bdSceneAddOpen = false;
  document.getElementById('scene-add-sheet')?.remove();
}

async function handleSceneAddConfirm() {
  const name = (document.getElementById('scene-add-name')?.value || '').trim();
  if (!name) return;
  closeSceneAdd();
  _bdScene = await sceneAdd(_bdBoard, name);
  renderBoardUI();
}

function renderTopBar() {
  const el = document.querySelector('.bd-top-bar');
  if (!el || !_bdBoard) return;
  const isSetup = S.boardMode === 'setup';
  const isGame  = S.boardMode === 'game';
  el.innerHTML = `
    <button class="bd-back-btn" data-target="board-list">${pi('rune', 15, 'currentColor')}<span>BOARDS</span></button>
    <div class="bd-title-area">
      <span class="bd-board-name" id="bd-board-name" data-action="bd-rename-board" title="Tap to rename">${escHtml(_bdBoard.name)}</span>
    </div>
    ${isGame ? `<button class="bd-stop-all-btn" data-action="bd-stop-all" title="Stop all sounds">■ STOP ALL</button>` : ''}
    <div class="bd-mode-toggle">
      <button class="bd-mode-btn${isSetup ? ' is-active' : ''}" data-action="bd-mode" data-mode="setup">SETUP</button>
      <button class="bd-mode-btn${isGame  ? ' is-active' : ''}" data-action="bd-mode" data-mode="game">GAME</button>
    </div>`;
}

async function handleBdMode(mode) {
  set.boardMode(mode);
  const sMode = document.getElementById('bd-status-mode');
  if (sMode) { sMode.textContent = mode.toUpperCase(); sMode.style.color = `var(--mode-${mode})`; }
  closePadPicker();
  closePadOpts();
  closeSceneOpts();
  closeSceneAdd();
  closeSetOpts();
  closeSetAdd();
  if (mode === 'game') {
    if (_wakeLockEnabled()) _acquireWakeLock();
    _resetAutoStop();
  } else {
    _releaseWakeLock();
    _cancelAutoStop();
  }
  renderTopBar();
  renderSceneBar();
  renderPadGrid();
  renderQA();
}

async function handleBdPadTap(slot) {
  const pad = _bdScene?.pads.find(p => p.slot === slot);
  if (S.boardMode === 'setup') {
    if (pad) openPadOpts(slot);
    else openPadPicker(slot);
    return;
  }
  // GAME mode
  if (!pad) return;
  const el = document.querySelector(`[data-pad-id="${CSS.escape(pad.id)}"]`);
  if (pad.type === 'playlist') {
    if (!pad.files?.length) return;
    if (audioIsPlaying(pad.id)) {
      delete _plState[pad.id]; // reset position before audioStop so audio:ended won't auto-advance
      audioStop(pad.id, { fade: pad.fadeOut || 0 });
      el?.classList.remove('is-playing');
    } else {
      if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
      const hash = _plCurrentHash(pad);
      if (!hash) return;
      audioPlay(pad.id, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (!pad.hash) return;
  if (audioIsPlaying(pad.id)) {
    audioStop(pad.id, { fade: pad.fadeOut || 0 });
    el?.classList.remove('is-playing');
  } else {
    audioPlay(pad.id, pad.hash, {
      type:    pad.type || 'single',
      volume:  pad.volume  ?? 80,
      fadeIn:  pad.fadeIn  || 0,
      fadeOut: pad.fadeOut || 0,
    });
    el?.classList.add('is-playing');
    _resetAutoStop();
  }
}

function handleBdRenameBoard() {
  if (!_bdBoard) return;
  const span = document.getElementById('bd-board-name');
  if (!span || document.getElementById('bd-board-name-input')) return; // already editing

  const prev = _bdBoard.name;
  const input = document.createElement('input');
  input.type = 'text';
  input.id   = 'bd-board-name-input';
  input.className = 'bd-board-name-input';
  input.value = prev;
  input.maxLength = 40;
  input.setAttribute('autocomplete', 'off');
  span.replaceWith(input);
  input.focus();
  input.select();

  const commit = async () => {
    const name = input.value.trim() || prev;
    if (name !== prev) {
      _bdBoard.name    = name;
      _bdBoard.updated = Date.now();
      await boardPut(_bdBoard);
    }
    const newSpan = document.createElement('span');
    newSpan.id          = 'bd-board-name';
    newSpan.className   = 'bd-board-name';
    newSpan.dataset.action = 'bd-rename-board';
    newSpan.title       = 'Tap to rename';
    newSpan.textContent = _bdBoard.name;
    input.replaceWith(newSpan);
    const sName = document.getElementById('bd-status-name');
    if (sName) sName.textContent = _bdBoard.name;
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = prev; input.blur(); }
  });
  input.addEventListener('blur', commit, { once: true });
}

/* ── DRAG-TO-REORDER ────────────────────────────────────────── */

function _dragCancel() {
  _dragGhost?.remove();
  _dragGhost = null;
  document.querySelectorAll('.pad.is-dragging,.pad.is-drop-target,.set-pad.is-dragging,.set-pad.is-drop-target')
    .forEach(el => el.classList.remove('is-dragging', 'is-drop-target'));
  _dragSlot     = null;
  _dragSourceEl = null;
  _dragTarget   = null;
  _dragActive   = false;
}

async function _dragSwap(slotA, slotB, isSet) {
  if (isSet && _bdSet) {
    const pA = _bdSet.pads.find(p => p.slot === slotA);
    const pB = _bdSet.pads.find(p => p.slot === slotB);
    if (pA) pA.slot = slotB;
    if (pB) pB.slot = slotA;
    await setPut(_bdSet);
    renderSetStrip();
  } else if (!isSet && _bdScene) {
    const pA = _bdScene.pads.find(p => p.slot === slotA);
    const pB = _bdScene.pads.find(p => p.slot === slotB);
    if (pA) pA.slot = slotB;
    if (pB) pB.slot = slotA;
    await scenePut(_bdScene);
    renderPadGrid();
  }
}

/* ── QUICK VOLUME SLIDER ────────────────────────────────────── */

/**
 * @param {Object} pad
 * @param {Element} padEl
 */
function openPadVolSlider(pad, padEl) {
  document.getElementById('pad-vol-slider')?.remove();
  const vol = pad.volume ?? 80;
  _lpNewVol = vol;

  const rect = padEl.getBoundingClientRect();
  const top  = rect.top > window.innerHeight / 2
    ? rect.top - 88
    : rect.bottom + 8;
  const left = Math.max(8, Math.min(
    rect.left + rect.width / 2 - 80,
    window.innerWidth - 168
  ));

  const el = document.createElement('div');
  el.id        = 'pad-vol-slider';
  el.className = 'pad-vol-slider';
  el.style.cssText = `top:${top}px;left:${left}px`;
  el.innerHTML = `
    <div class="pvs-label">VOL <span id="pvs-val">${vol}</span>%</div>
    <input class="pvs-range" id="pvs-input" type="range" min="0" max="100" value="${vol}">
  `;
  document.body.appendChild(el);

  const input = document.getElementById('pvs-input');
  if (input) {
    input.oninput = () => {
      const v = +input.value;
      _lpNewVol = v;
      const valEl = document.getElementById('pvs-val');
      if (valEl) valEl.textContent = v;
      setPadVolume(pad.id, v);
    };
  }
}

/** @param {boolean} [save=true] */
function closePadVolSlider(save = true) {
  document.getElementById('pad-vol-slider')?.remove();
  if (save && _lpPadId !== null && _lpNewVol !== null) {
    const vol   = _lpNewVol;
    const slot  = _lpSlot;
    const isSet = _lpIsSet;
    if (!isSet && _bdScene) {
      _bdScene.pads = _bdScene.pads.map(p => p.slot === slot ? { ...p, volume: vol } : p);
      scenePut(_bdScene).catch(() => {});
    } else if (isSet && _bdSet) {
      _bdSet.pads = _bdSet.pads.map(p => p.slot === slot ? { ...p, volume: vol } : p);
      setPut(_bdSet).catch(() => {});
    }
  }
  _lpPadId  = null;
  _lpSlot   = null;
  _lpIsSet  = false;
  _lpNewVol = null;
}

/* ── CHANGELOG MODAL ────────────────────────────────────────── */

let _clOpen = false;

function showChangelog() {
  if (_clOpen) return;
  _clOpen = true;
  const html = `<div class="cl-overlay" id="cl-overlay">
    <div class="cl-modal" id="cl-modal">
      <div class="cl-header">
        <span class="cl-title">${pi('info', 13, 'var(--gold)')} CHANGELOG</span>
        <button class="act-btn" data-action="cl-close">×</button>
      </div>
      <div class="cl-body">
        ${CHANGELOG.map(entry => `<div class="cl-entry">
          <div class="cl-entry-header">
            <span class="cl-version">v ${escHtml(entry.v)}</span>
            <span class="cl-date">${escHtml(entry.date)}</span>
          </div>
          <div class="cl-items">
            ${entry.items.map(item => `<div class="cl-item"><span class="cl-bullet">·</span>${escHtml(item)}</div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
      <div class="cl-footer">
        <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="check-update">
          ${pi('download', 12, 'currentColor')} CHECK FOR UPDATES
        </button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function closeChangelog() {
  _clOpen = false;
  document.getElementById('cl-overlay')?.remove();
}

/* ── TOAST ──────────────────────────────────────────────────── */

let _toastTimer = null;
function showToast(msg) {
  let el = document.getElementById('sos-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sos-toast';
    el.className = 'sos-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el?.classList.remove('is-visible'), 2800);
}

/* ── EXPORT ─────────────────────────────────────────────────── */

function bufToBase64(buf) {
  if (!buf) return '';
  const bytes = new Uint8Array(buf);
  let s = ''; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk)
    s += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)));
  return btoa(s);
}

function base64ToBuf(b64) {
  const s = atob(b64), buf = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) buf[i] = s.charCodeAt(i);
  return buf.buffer;
}

async function buildExportBlob() {
  const boards = await boardGetAll();
  const scenes = [], sets = [];
  for (const b of boards) {
    for (const s of b.scenes || []) { const sc = await sceneGet(s.id); if (sc) scenes.push(sc); }
    for (const st of b.sets   || []) { const se = await setGet(st.id);   if (se) sets.push(se);   }
  }
  const meta = await libGetAllMeta();
  const header = { sos: 'v1_5', version: APP_VERSION, exported: new Date().toISOString(), boards, scenes, sets };
  const headerJson = JSON.stringify(header);
  const chunks = [headerJson.slice(0, -1) + ',"library":[']; // inject library array before closing }
  let first = true;
  for (const m of meta) {
    const entry = await libGet(m.hash);
    if (!entry?.buf) continue;
    const item = {
      hash: entry.hash, name: entry.name, origName: entry.origName || '',
      type: entry.type || '', size: entry.size || 0, added: entry.added || 0,
      data: bufToBase64(entry.buf),
      ...(entry.folder   != null ? { folder: entry.folder }     : {}),
      ...(entry.peaks    != null ? { peaks: entry.peaks }       : {}),
      ...(entry.duration != null ? { duration: entry.duration } : {}),
    };
    if (!first) chunks.push(',');
    chunks.push(JSON.stringify(item));
    first = false;
    // entry.buf and item.data can be GC'd after this iteration
  }
  chunks.push(']}');
  return new Blob(chunks, { type: 'application/json' });
}

async function doExport() {
  showToast('Preparing export…');
  await new Promise(r => setTimeout(r, 60));
  try {
    const blob = await buildExportBlob();
    const date = new Date().toISOString().slice(0, 10);
    const filename = `sos-backup-${date}.json`;
    const file = new File([blob], filename, { type: 'application/json' });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'SoS Backup' });
        _markExport(); return;
      } catch (e) { if (e.name === 'AbortError') return; }
    }
    if (window.showSaveFilePicker) {
      try {
        const fh = await window.showSaveFilePicker({ suggestedName: filename, types: [{ description: 'SoS Backup', accept: { 'application/json': ['.json'] } }] });
        const w = await fh.createWritable(); await w.write(blob); await w.close();
        _markExport(); showToast('Backup saved.'); return;
      } catch (e) { if (e.name === 'AbortError') return; }
    }
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    _markExport(); showToast('Saved to Downloads.');
  } catch (e) {
    console.error('Export failed:', e);
    showToast('Export failed — see console.');
  }
}

function _markExport() {
  localStorage.setItem('sos-last-export', String(Date.now()));
  _updateBkpAge();
}

function _updateBkpAge() {
  const el = document.querySelector('.m-bkp-age');
  if (!el) return;
  const ts = parseInt(localStorage.getItem('sos-last-export') || '0', 10);
  if (!ts) { el.textContent = '· never'; return; }
  const h = Math.floor((Date.now() - ts) / 3600000);
  el.textContent = h < 1 ? '· <1h ago' : `· ${h}h ago`;
}

/* ── IMPORT ─────────────────────────────────────────────────── */

let _importData = null;
let _importAudioChoices = {};
let _importModalOpen = false;

function triggerImport() {
  document.getElementById('import-file-input')?.click();
}

async function parseImportFile(inp) {
  const file = inp.files[0]; inp.value = ''; if (!file) return;
  showToast('Parsing file…');
  let data;
  try {
    let jsonStr = await file.text();
    data = JSON.parse(jsonStr);
    jsonStr = null; // allow GC before processing
  } catch (e) { showToast('Invalid file — could not parse.'); return; }
  if (data.sos !== 'v1_5' || !Array.isArray(data.boards) || !Array.isArray(data.library)) {
    showToast('Not a V1.5 backup file.'); return;
  }
  _importData = data;
  _importAudioChoices = {};

  const currentLib      = await libGetAllMeta();
  const currentHashes   = new Set(currentLib.map(e => e.hash));
  const currentNameMap  = Object.fromEntries(currentLib.map(e => [e.name, e.hash]));
  const currentBoardIds = new Set((await boardGetAll()).map(b => b.id));

  data.library.forEach(e => {
    if (currentHashes.has(e.hash))                                              _importAudioChoices[e.hash] = 'skip';
    else if (currentNameMap[e.name] && currentNameMap[e.name] !== e.hash)       _importAudioChoices[e.hash] = 'keep-both';
    else                                                                        _importAudioChoices[e.hash] = 'add';
  });

  const newAudio      = data.library.filter(e => _importAudioChoices[e.hash] === 'add').length;
  const skipAudio     = data.library.filter(e => _importAudioChoices[e.hash] === 'skip').length;
  const conflictAudio = data.library.filter(e => _importAudioChoices[e.hash] === 'keep-both').length;
  const newBoards     = data.boards.filter(b => !currentBoardIds.has(b.id)).length;
  const dupeBoards    = data.boards.length - newBoards;

  showImportModal({ newAudio, skipAudio, conflictAudio, newBoards, dupeBoards });
}

function showImportModal({ newAudio, skipAudio, conflictAudio, newBoards, dupeBoards }) {
  if (_importModalOpen) return;
  _importModalOpen = true;
  const row = (cls, text) => `<div class="imp-row-info ${cls}">${escHtml(text)}</div>`;
  const audioSection = [
    newAudio      ? row('imp-new',      `+ ${newAudio} new file${newAudio !== 1 ? 's' : ''} will be added`) : '',
    conflictAudio ? row('imp-conflict', `⚠ ${conflictAudio} name conflict${conflictAudio !== 1 ? 's' : ''} — auto-renamed with "_imported"`) : '',
    skipAudio     ? row('imp-skip',     `· ${skipAudio} already exist — skipped`) : '',
    !newAudio && !conflictAudio && !skipAudio ? row('imp-skip', 'No audio in backup') : '',
  ].join('');
  const boardSection = [
    newBoards  ? row('imp-new',  `+ ${newBoards} board${newBoards !== 1 ? 's' : ''} will be added`) : '',
    dupeBoards ? row('imp-skip', `· ${dupeBoards} already exist — added with new ID`) : '',
    !newBoards && !dupeBoards ? row('imp-skip', 'No boards in backup') : '',
  ].join('');
  document.body.insertAdjacentHTML('beforeend', `<div class="cl-overlay" id="import-overlay">
    <div class="cl-modal" id="import-modal">
      <div class="cl-header">
        <span class="cl-title">${pi('download', 13, 'var(--gold)')} IMPORT BACKUP</span>
        <button class="act-btn" data-action="import-cancel">×</button>
      </div>
      <div class="cl-body" style="padding:16px 16px 8px;gap:0">
        <div class="imp-section"><div class="imp-section-title">AUDIO</div>${audioSection}</div>
        <div class="imp-section" style="margin-top:12px"><div class="imp-section-title">BOARDS</div>${boardSection}</div>
      </div>
      <div class="cl-footer" style="gap:8px">
        <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="import-cancel">CANCEL</button>
        <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="import-execute">IMPORT</button>
      </div>
    </div>
  </div>`);
}

function closeImportModal() {
  _importModalOpen = false;
  _importData = null;
  _importAudioChoices = {};
  document.getElementById('import-overlay')?.remove();
}

async function executeImport() {
  if (!_importData) return;
  const data = _importData;
  closeImportModal();
  showToast('Importing…');
  await new Promise(r => setTimeout(r, 60));
  try {
    // 1. Audio — one at a time to avoid RAM spike
    for (const e of data.library) {
      const choice = _importAudioChoices[e.hash];
      if (choice === 'skip') continue;
      const buf = base64ToBuf(e.data);
      e.data = null; // free base64 string immediately
      const meta = { origName: e.origName || e.name, type: e.type || '', size: e.size || buf.byteLength,
                     added: e.added || Date.now(), buf,
                     ...(e.folder   != null ? { folder: e.folder }     : {}),
                     ...(e.peaks    != null ? { peaks: e.peaks }       : {}),
                     ...(e.duration != null ? { duration: e.duration } : {}) };
      if (choice === 'keep-both') {
        const ext  = e.name.includes('.') ? '.' + e.name.split('.').pop() : '';
        const base = e.name.includes('.') ? e.name.slice(0, e.name.lastIndexOf('.')) : e.name;
        await libPut({ hash: e.hash, name: base + '_imported' + ext, ...meta });
      } else {
        await libPut({ hash: e.hash, name: e.name, ...meta });
      }
    }
    // 2. Build ID remap table for boards with colliding IDs (before writing anything structural)
    const existBoardIds = new Set((await boardGetAll()).map(b => b.id));
    const boardRemap = {}; // oldId → { newBoardId, sceneMap, setMap }
    for (const b of data.boards) {
      if (existBoardIds.has(b.id)) {
        boardRemap[b.id] = {
          newBoardId: _newId('b'),
          sceneMap:   Object.fromEntries((b.scenes || []).map(s => [s.id, _newId('sc')])),
          setMap:     Object.fromEntries((b.sets   || []).map(s => [s.id, _newId('st')])),
        };
      }
    }
    // 3. Write boards
    for (const b of data.boards) {
      const r = boardRemap[b.id];
      if (r) {
        await boardPut({
          ...b,
          id:            r.newBoardId,
          name:          b.name + ' (imported)',
          scenes:        (b.scenes || []).map(s => ({ ...s, id: r.sceneMap[s.id] || s.id })),
          sets:          (b.sets   || []).map(s => ({ ...s, id: r.setMap[s.id]   || s.id })),
          activeSceneId: r.sceneMap[b.activeSceneId] || b.activeSceneId,
          activeSetId:   r.setMap[b.activeSetId]     || b.activeSetId,
        });
      } else {
        await boardPut({ ...b });
      }
    }
    // 4. Write scenes (remapped when board ID collided)
    for (const sc of data.scenes || []) {
      const r = boardRemap[sc.boardId];
      if (r) { const newId = r.sceneMap[sc.id]; if (newId) await scenePut({ ...sc, id: newId, boardId: r.newBoardId }); }
      else    { await scenePut(sc); }
    }
    // 5. Write sets (remapped when board ID collided)
    for (const se of data.sets || []) {
      const r = boardRemap[se.boardId];
      if (r) { const newId = r.setMap[se.id]; if (newId) await setPut({ ...se, id: newId, boardId: r.newBoardId }); }
      else    { await setPut(se); }
    }
    showToast('Import complete!');
  } catch (e) {
    console.error('Import failed:', e);
    showToast('Import failed — see console.');
  }
}

/* ── SCREEN: SETTINGS ───────────────────────────────────────── */

/** @returns {string} */
function settingsHTML() {
  const theme       = S.theme || '';
  const defVol      = localStorage.getItem('sos-def-volume')    ?? '80';
  const defFadeIn   = localStorage.getItem('sos-def-fadein')    ?? '0';
  const defFadeOut  = localStorage.getItem('sos-def-fadeout')   ?? '0';
  const startMode   = localStorage.getItem('sos-start-mode')    || 'setup';
  const wakeLock    = localStorage.getItem('sos-wake-lock')     === '1';
  const autoStop    = localStorage.getItem('sos-auto-stop')     === '1';
  const autoStopMin = localStorage.getItem('sos-auto-stop-min') || '30';
  const masterVol   = localStorage.getItem('sos-master-vol')    ?? '100';
  const themes = [
    { id: '',        label: 'DEFAULT' },
    { id: 'verdant', label: 'VERDANT' },
    { id: 'neon',    label: 'NEON'    },
    { id: 'crimson', label: 'CRIMSON' },
  ];
  const seg = (action, key, val, label, active) =>
    `<button class="sett-seg-btn${active ? ' is-active' : ''}" data-action="${action}" data-${key}="${val}">${label}</button>`;
  return `
  <div class="lib-top-bar">
    <div class="lib-top-col">
      <button class="lib-menu-btn" data-target="menu">${pi('scroll', 18, 'currentColor')}<span>MENU</span></button>
    </div>
    <div class="lib-top-col lib-top-center">
      <span class="lib-title">SETTINGS</span>
    </div>
    <div class="lib-top-col lib-top-right" style="width:80px"></div>
  </div>
  <div class="sett-body">

    <div class="sett-section">
      <div class="sett-title">${pi('flame', 12, 'var(--gold)')} THEME</div>
      <div class="sett-theme-picker">
        ${themes.map(t => `<button class="sett-theme-btn${theme === t.id ? ' is-active' : ''}" data-action="sett-theme" data-theme="${t.id}">${t.label}</button>`).join('')}
      </div>
    </div>

    <div class="sett-section">
      <div class="sett-title">${pi('rune', 12, 'var(--gold)')} BOARD</div>
      <div class="sett-row">
        <label class="sett-label">Start mode</label>
        <div class="sett-btn-group">
          ${seg('sett-start-mode','mode','setup','SETUP',   startMode==='setup')}
          ${seg('sett-start-mode','mode','game', 'GAME',    startMode==='game')}
          ${seg('sett-start-mode','mode','remember','REMEMBER', startMode==='remember')}
        </div>
      </div>
    </div>

    <div class="sett-section">
      <div class="sett-title">${pi('keyboard', 12, 'var(--gold)')} SESSION</div>
      <div class="sett-row">
        <label class="sett-label">Master volume</label>
        <input type="range" id="sett-master-vol" class="sett-vol-slider"
               min="0" max="100" value="${escAttr(masterVol)}" style="flex:1;min-width:60px">
        <span class="sett-unit" id="sett-master-vol-val" style="min-width:32px;text-align:right">${masterVol}%</span>
      </div>
      <div class="sett-row">
        <label class="sett-label">Keep screen on</label>
        <div class="sett-btn-group">
          ${seg('sett-wake-lock','val','1','ON',  wakeLock)}
          ${seg('sett-wake-lock','val','0','OFF', !wakeLock)}
        </div>
      </div>
      <div class="sett-row">
        <label class="sett-label">Auto-stop</label>
        <div class="sett-btn-group" style="margin-right:8px">
          ${seg('sett-auto-stop','val','1','ON',  autoStop)}
          ${seg('sett-auto-stop','val','0','OFF', !autoStop)}
        </div>
        <input class="audio-name-input sett-input" id="sett-auto-stop-min" type="number"
               min="1" max="120" value="${escAttr(autoStopMin)}" style="width:48px;text-align:right">
        <span class="sett-unit">min</span>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-left:8px"
                data-action="sett-auto-stop-save">SET</button>
      </div>
    </div>

    <div class="sett-section">
      <div class="sett-title">${pi('cog', 12, 'var(--gold)')} NEW PAD DEFAULTS</div>
      <div class="sett-row">
        <label class="sett-label">Volume</label>
        <input class="audio-name-input sett-input" id="sett-def-volume" type="number" min="0" max="100" value="${escAttr(defVol)}" style="width:60px;text-align:right">
        <span class="sett-unit">%</span>
      </div>
      <div class="sett-row">
        <label class="sett-label">Fade In</label>
        <input class="audio-name-input sett-input" id="sett-def-fadein" type="number" min="0" max="30" step="0.1" value="${escAttr(defFadeIn)}" style="width:60px;text-align:right">
        <span class="sett-unit">s</span>
      </div>
      <div class="sett-row">
        <label class="sett-label">Fade Out</label>
        <input class="audio-name-input sett-input" id="sett-def-fadeout" type="number" min="0" max="30" step="0.1" value="${escAttr(defFadeOut)}" style="width:60px;text-align:right">
        <span class="sett-unit">s</span>
      </div>
      <div class="sett-actions">
        <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="sett-defaults-save">SAVE DEFAULTS</button>
      </div>
    </div>

    <div class="sett-section">
      <div class="sett-title">${pi('info', 12, 'var(--gold)')} ABOUT</div>
      <div class="sett-about">
        <p class="sett-about-line">Soundboard of Storytelling v ${APP_VERSION}</p>
        <p class="sett-about-line">A tool for Game-Masters and other creative Creatures.</p>
        <p class="sett-about-line" style="margin-top:8px">
          <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="show-changelog">CHANGELOG</button>
          <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-left:8px" data-action="check-update">CHECK UPDATES</button>
        </p>
      </div>
    </div>

  </div>
  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">SETTINGS</span>
    <span class="sb-status-section">v ${APP_VERSION}</span>
  </div>`;
}

/* ── SCREEN: TIPS ───────────────────────────────────────────── */

/** @returns {string} */
function tipsHTML() {
  const tip = (title, body) => `<div class="tips-card">
    <div class="tips-card-title">${title}</div>
    <div class="tips-card-body">${body}</div>
  </div>`;
  return `
  <div class="lib-top-bar">
    <div class="lib-top-col">
      <button class="lib-menu-btn" data-target="menu">${pi('scroll', 18, 'currentColor')}<span>MENU</span></button>
    </div>
    <div class="lib-top-col lib-top-center">
      <span class="lib-title">TIPS &amp; TRICKS</span>
    </div>
    <div class="lib-top-col lib-top-right" style="width:80px"></div>
  </div>
  <div class="tips-body">

    ${tip(`${pi('cog',12,'var(--mode-setup)')} SETUP MODE`,
      `<p>Tap an empty pad to assign audio from the library.</p>
       <p>Tap a filled pad to open its options — rename it, set a hotkey, choose SINGLE or LOOP, and adjust volume.</p>
       <p>Use the ⋯ button next to a scene tab to rename the scene, change the grid column count, or delete it.</p>`)}

    ${tip(`${pi('rune',12,'var(--mode-game)')} GAME MODE`,
      `<p>Tap a pad to start playback. Tap again to stop (with fade-out if configured).</p>
       <p>LOOP pads (↻) play continuously until tapped again. SINGLE pads stop when the file ends.</p>
       <p>■ STOP ALL stops every playing sound immediately.</p>
       <p>Switching scenes stops all active audio automatically.</p>`)}

    ${tip(`${pi('keyboard',12,'var(--gold)')} HOTKEYS`,
      `<p>Assign a hotkey to any pad in its options sheet (SETUP mode).</p>
       <p>In GAME mode, pressing the assigned key triggers the pad — same as tapping it.</p>
       <p>Works great with a Bluetooth numpad: assign keys 1–9 and 0 to your most-used pads.</p>
       <p>Hotkeys are case-insensitive (A = a). Up to 4 characters, but 1-character keys are most reliable.</p>`)}

    ${tip(`${pi('scroll',12,'var(--gold)')} SETS (QUICK ACCESS)`,
      `<p>Sets are independent pad strips at the bottom of the board, visible across all scenes.</p>
       <p>Use them for sounds you need in every scene — ambience, stings, transitions.</p>
       <p>Create a set with + ADD SET in SETUP mode. Switch active set with the tabs above the strip.</p>`)}

    ${tip(`${pi('save',12,'var(--gold)')} BACKUP &amp; IMPORT`,
      `<p>Use BACKUP in the main menu to export all boards, scenes, sets, and audio files into a single .json file.</p>
       <p>IMPORT merges a backup into the current library — audio is deduplicated by hash, name conflicts are auto-renamed.</p>
       <p>Backups include the audio data, so they can be large. Store them safely.</p>`)}

  </div>
  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">TIPS</span>
    <span class="sb-status-section">Controls &amp; key bindings</span>
  </div>`;
}

/* ── SCREEN: ABOUT ──────────────────────────────────────────── */

/** @returns {string} */
function aboutHTML() {
  return `
  <div class="lib-top-bar">
    <div class="lib-top-col">
      <button class="lib-menu-btn" data-target="menu">${pi('scroll', 18, 'currentColor')}<span>MENU</span></button>
    </div>
    <div class="lib-top-col lib-top-center">
      <span class="lib-title">ABOUT</span>
    </div>
    <div class="lib-top-col lib-top-right" style="width:80px"></div>
  </div>
  <div class="tips-body">

    <div class="tips-card">
      <div class="tips-card-title">${pi('flame',12,'var(--gold)')} SOUNDBOARD OF STORYTELLING</div>
      <div class="tips-card-body">
        <p>A sound tool for Game-Masters and other creative Creatures.</p>
        <p>Built to work offline as a PWA — install it from your browser's share/add-to-home-screen menu for the best experience.</p>
        <p style="color:var(--text-mute)">Version ${APP_VERSION}</p>
      </div>
    </div>

    <div class="tips-card">
      <div class="tips-card-title">${pi('info',12,'var(--gold)')} DATA &amp; PRIVACY</div>
      <div class="tips-card-body">
        <p>Everything stays on your device. Audio files are stored in IndexedDB. Settings are in localStorage. Nothing is sent to any server.</p>
        <p>Use BACKUP (main menu) to export your data as a portable .json file.</p>
      </div>
    </div>

    <div class="tips-card">
      <div class="tips-card-title">${pi('cog',12,'var(--gold)')} TECHNICAL</div>
      <div class="tips-card-body">
        <p>No frameworks. No build step. Plain HTML, CSS, and JavaScript.</p>
        <p>Audio engine: Web Audio API with LRU PCM buffer cache (150 MB max). iOS silent-switch bypass via HTMLAudioElement.</p>
        <p>Service worker provides offline-first caching.</p>
      </div>
    </div>

    <div class="tips-card" style="text-align:center">
      <div class="tips-card-body" style="align-items:center">
        <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="show-changelog">VIEW CHANGELOG</button>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-top:8px" data-action="check-update">CHECK FOR UPDATES</button>
      </div>
    </div>

  </div>
  <div class="sb-status-bar">
    <span class="sb-status-section" style="color:var(--gold)">ABOUT</span>
    <span class="sb-status-section">v ${APP_VERSION}</span>
  </div>`;
}

function mountSettings() {
  const slider = document.getElementById('sett-master-vol');
  const valEl  = document.getElementById('sett-master-vol-val');
  if (slider) {
    slider.oninput = () => {
      const v = +slider.value;
      if (valEl) valEl.textContent = v + '%';
      setMasterVolume(v);
    };
  }
}

/* ── STUB SCREEN ────────────────────────────────────────────── */

/** @param {string} label @returns {string} */
function stubHTML(label) {
  return `<div class="stub-wrap">
    <div class="stub-label">${pi('rune', 24, 'var(--gold)')} ${label}</div>
    <p class="stub-sub">Coming soon</p>
    <button class="stub-back" data-target="menu">← MENU</button>
  </div>`;
}

/* ── SCREEN REGISTRY ────────────────────────────────────────── */

/** @type {Record<ScreenId, () => string>} */
const SCREENS = {
  intro:        introHTML,
  menu:         menuHTML,
  'board-list': boardListHTML,
  board:        boardHTML,
  library:      libraryHTML,
  settings:     settingsHTML,
  tips:         tipsHTML,
  about:        aboutHTML,
};

/** @type {Partial<Record<ScreenId, () => void>>} */
const SCREEN_MOUNTS = {
  intro:        mountIntro,
  menu:         mountMenu,
  'board-list': mountBoardList,
  board:        mountBoard,
  library:      mountLibrary,
  settings:     mountSettings,
};

/* ── RENDER ─────────────────────────────────────────────────── */

/** @param {ScreenId} screenId */
function renderScreen(screenId) {
  const app      = document.getElementById('app');
  const renderer = SCREENS[screenId];
  if (!renderer) return;
  const cssClass = 'screen-' + screenId.replace('-', '-'); // board-list → screen-board-list
  app.innerHTML  = `<div class="screen ${cssClass}">${renderer()}</div>`;
  const mount = SCREEN_MOUNTS[screenId];
  if (mount) mount();
}

bus.on('screen', renderScreen);
bus.on('theme', applyTheme);

/* ── EVENT DELEGATION ───────────────────────────────────────── */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (_importModalOpen)      { closeImportModal(); return; }
    if (_clOpen)               { closeChangelog(); return; }
    if (_bdPickerSlot !== null || _bdPickerMode === 'playlist-add') { closePadPicker(); return; }
    if (_bdOptsSlot   !== null) { closePadOpts();   return; }
    if (_bdSceneOptsId !== null){ closeSceneOpts(); return; }
    if (_bdSceneAddOpen)        { closeSceneAdd();  return; }
    if (_bdSetOptsId !== null)  { closeSetOpts();   return; }
    if (_bdSetAddOpen)          { closeSetAdd();    return; }
    if (_blCreateOpen)          { closeBoardCreate(); return; }
  }
  // GAME mode hotkeys
  if (S.screen === 'board' && S.boardMode === 'game' && !e.target.closest('input,textarea')) {
    const key = e.key.toUpperCase();
    if (key.length === 1 || (e.key.startsWith('Numpad') && e.key.length > 6)) {
      const k = e.key.length === 1 ? key : e.key.replace('Numpad','');
      const pad = _bdScene?.pads.find(p => p.hotkey?.toUpperCase() === k);
      if (pad) {
        e.preventDefault();
        const padEl = document.querySelector(`[data-pad-id="${CSS.escape(pad.id)}"]`);
        if (pad.type === 'playlist') {
          if (!pad.files?.length) return;
          if (audioIsPlaying(pad.id)) {
            delete _plState[pad.id];
            audioStop(pad.id, { fade: pad.fadeOut || 0 });
            padEl?.classList.remove('is-playing');
          } else {
            if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
            const hash = _plCurrentHash(pad);
            if (hash) {
              audioPlay(pad.id, hash, { type: 'single', volume: pad.volume ?? 80, fadeIn: pad.fadeIn || 0 });
              padEl?.classList.add('is-playing');
            }
          }
        } else if (pad.hash) {
          if (audioIsPlaying(pad.id)) {
            audioStop(pad.id, { fade: pad.fadeOut || 0 });
            padEl?.classList.remove('is-playing');
          } else {
            audioPlay(pad.id, pad.hash, {
              type: pad.type || 'single', volume: pad.volume ?? 80,
              fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
            });
            padEl?.classList.add('is-playing');
          }
        }
      }
    }
  }
});

/* ── PAD DRAG-TO-REORDER EVENTS ────────────────────────────── */

document.addEventListener('pointerdown', e => {
  if (S.screen !== 'board' || S.boardMode !== 'setup') return;
  const padEl    = e.target.closest('[data-pad-slot]');
  const setpadEl = e.target.closest('[data-set-pad-slot]');
  const targetEl = padEl || setpadEl;
  if (!targetEl) return;
  // Only assigned pads are draggable
  const isSet = !!setpadEl;
  const slot  = isSet ? +targetEl.dataset.setPadSlot : +targetEl.dataset.padSlot;
  const pad   = isSet ? _bdSet?.pads.find(p => p.slot === slot) : _bdScene?.pads.find(p => p.slot === slot);
  if (!pad) return;
  // Don't interfere if a sheet is open
  if (_bdOptsSlot !== null || _bdSetOptsSlot !== null || _bdSceneOptsId !== null || _bdSceneAddOpen || _bdSetOptsId !== null || _bdSetAddOpen) return;

  const rect  = targetEl.getBoundingClientRect();
  _dragSlot   = slot;
  _dragIsSet  = isSet;
  _dragStartX = e.clientX;
  _dragStartY = e.clientY;
  _dragOffX   = e.clientX - rect.left;
  _dragOffY   = e.clientY - rect.top;
  _dragActive = false;
  _dragSourceEl = targetEl;
});

document.addEventListener('pointermove', e => {
  if (_dragSlot === null) return;

  if (!_dragActive) {
    const dx = e.clientX - _dragStartX, dy = e.clientY - _dragStartY;
    if (dx * dx + dy * dy < 100) return; // 10px threshold
    _dragActive = true;
    // Create ghost clone
    const rect = _dragSourceEl.getBoundingClientRect();
    _dragGhost = _dragSourceEl.cloneNode(true);
    _dragGhost.className += ' pad-drag-ghost';
    _dragGhost.style.cssText = `position:fixed;pointer-events:none;z-index:700;width:${rect.width}px;height:${rect.height}px;left:${e.clientX - _dragOffX}px;top:${e.clientY - _dragOffY}px`;
    document.body.appendChild(_dragGhost);
    _dragSourceEl.classList.add('is-dragging');
    closePadPicker(); closePadOpts(); closeSceneOpts(); closeSceneAdd(); closeSetOpts(); closeSetAdd();
  }

  // Move ghost
  _dragGhost.style.left = (e.clientX - _dragOffX) + 'px';
  _dragGhost.style.top  = (e.clientY - _dragOffY) + 'px';

  // Find drop target under cursor (hide ghost first so it doesn't block elementFromPoint)
  _dragGhost.style.visibility = 'hidden';
  const under = document.elementFromPoint(e.clientX, e.clientY);
  _dragGhost.style.visibility = '';

  const attr     = _dragIsSet ? '[data-set-pad-slot]' : '[data-pad-slot]';
  const dropEl   = under?.closest(attr);
  const dropSlot = dropEl ? +dropEl.dataset[_dragIsSet ? 'setPadSlot' : 'padSlot'] : null;

  // Update highlight
  document.querySelectorAll('.pad.is-drop-target,.set-pad.is-drop-target')
    .forEach(el => el.classList.remove('is-drop-target'));
  _dragTarget = (dropSlot !== null && dropSlot !== _dragSlot) ? dropSlot : null;
  if (_dragTarget !== null) dropEl.classList.add('is-drop-target');
});

document.addEventListener('pointerup', () => {
  if (_dragSlot === null) return;
  if (_dragActive) {
    _dragDidDrop = true; // suppress the follow-on click
    if (_dragTarget !== null) _dragSwap(_dragSlot, _dragTarget, _dragIsSet);
    _dragCancel();
  } else {
    _dragSlot = null; _dragSourceEl = null;
  }
});

document.addEventListener('pointercancel', () => {
  if (_dragSlot !== null) { _dragCancel(); }
});

/* ── LONG-PRESS: QUICK VOLUME ───────────────────────────────── */

document.addEventListener('pointerdown', e => {
  if (S.screen !== 'board' || S.boardMode !== 'game') return;
  const targetEl = e.target.closest('[data-pad-id][data-pad-slot]')
                || e.target.closest('[data-pad-id][data-set-pad-slot]');
  if (!targetEl) return;
  const padId = targetEl.dataset.padId;
  if (!audioIsPlaying(padId)) return;

  _lpStartX = e.clientX;
  _lpStartY = e.clientY;
  _lpFired  = false;
  const slot  = targetEl.dataset.padSlot !== undefined ? +targetEl.dataset.padSlot : +targetEl.dataset.setPadSlot;
  const isSet = targetEl.dataset.setPadSlot !== undefined;

  _lpTimer = setTimeout(() => {
    _lpTimer = null;
    _lpFired = true;
    _lpPadId = padId;
    _lpSlot  = slot;
    _lpIsSet = isSet;
    const pad = isSet
      ? _bdSet?.pads.find(p => p.slot === slot)
      : _bdScene?.pads.find(p => p.slot === slot);
    if (pad) openPadVolSlider(pad, targetEl);
  }, 500);
});

document.addEventListener('pointerup',     () => { if (_lpTimer) { clearTimeout(_lpTimer); _lpTimer = null; } });
document.addEventListener('pointercancel', () => { if (_lpTimer) { clearTimeout(_lpTimer); _lpTimer = null; } });
document.addEventListener('pointermove', e => {
  if (!_lpTimer) return;
  const dx = e.clientX - _lpStartX, dy = e.clientY - _lpStartY;
  if (dx * dx + dy * dy > 64) { clearTimeout(_lpTimer); _lpTimer = null; }
});

document.addEventListener('click', e => {
  // close import modal on backdrop click
  if (_importModalOpen && !e.target.closest('#import-modal')) { closeImportModal(); return; }

  // close changelog on backdrop click
  if (_clOpen && !e.target.closest('#cl-modal')) { closeChangelog(); return; }

  // suppress the click that immediately follows a long-press (keep slider open)
  if (_lpFired) { _lpFired = false; return; }

  // suppress the click that follows a drag drop
  if (_dragDidDrop) { _dragDidDrop = false; return; }

  // close quick-volume slider on outside click
  if (document.getElementById('pad-vol-slider') && !e.target.closest('#pad-vol-slider')) {
    closePadVolSlider(true); return;
  }

  // clear lib delete confirm
  if (_libDeleteCfm) {
    if (!e.target.closest(`[data-action="lib-delete"][data-hash="${_libDeleteCfm}"]`)) {
      const old = document.querySelector(`.act-btn.danger[data-hash="${_libDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
      _libDeleteCfm = null;
    }
  }

  // clear boards-tab delete confirm
  if (_libBdDeleteCfm) {
    if (!e.target.closest(`[data-action="lib-bd-delete"][data-board-id="${_libBdDeleteCfm}"]`)) {
      const old = document.querySelector(`.act-btn.danger[data-board-id="${_libBdDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
      _libBdDeleteCfm = null;
    }
  }

  // clear board-list delete confirm
  if (_blDeleteCfm) {
    if (!e.target.closest(`[data-action="bl-delete"][data-board-id="${_blDeleteCfm}"]`)) {
      const old = document.querySelector(`.act-btn.danger[data-board-id="${_blDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
      _blDeleteCfm = null;
    }
  }

  // close pad picker when clicking outside it
  if ((_bdPickerSlot !== null || _bdSetPickerSlot !== null || _bdPickerMode === 'playlist-add') && !e.target.closest('#pad-picker')) {
    closePadPicker();
    return;
  }

  // close pad opts when clicking outside it (but not on the pad itself)
  if (_bdOptsSlot !== null && !e.target.closest('#pad-opts') && !e.target.closest(`[data-pad-slot="${_bdOptsSlot}"]`)) {
    closePadOpts();
    return;
  }

  // close scene opts when clicking outside it (but not on the ⋯ button)
  if (_bdSceneOptsId !== null && !e.target.closest('#scene-opts') && !e.target.closest('.bd-scene-opts-btn')) {
    closeSceneOpts();
    return;
  }

  // close scene-add sheet when clicking outside it (but not on the + button)
  if (_bdSceneAddOpen && !e.target.closest('#scene-add-sheet') && !e.target.closest('.bd-scene-add')) {
    closeSceneAdd();
    return;
  }

  // close set opts/add sheets when clicking outside them
  if (_bdSetOptsId !== null && !e.target.closest('#set-opts-sheet') && !e.target.closest('.bd-set-opts-btn')) {
    closeSetOpts(); return;
  }
  if (_bdSetAddOpen && !e.target.closest('#set-add-sheet') && !e.target.closest('.bd-set-add') && !e.target.closest('.bd-qa-add-set')) {
    closeSetAdd(); return;
  }

  if (_blCreateOpen && !e.target.closest('#bl-create-sheet') && !e.target.closest('[data-action="bl-create"]')) {
    closeBoardCreate(); return;
  }

  const navEl = e.target.closest('[data-target]');
  if (navEl) { navigate(navEl.dataset.target); return; }

  const actEl = e.target.closest('[data-action]');
  if (actEl) handleAction(actEl.dataset.action, actEl);
});

/* ── ACTIONS ────────────────────────────────────────────────── */

/** @param {string} action @param {HTMLElement} el */
function handleAction(action, el) {
  switch (action) {
    // menu / changelog
    case 'show-changelog':    showChangelog(); break;
    case 'cl-close':          closeChangelog(); break;
    case 'backup':            doExport(); break;
    case 'import':            triggerImport(); break;
    case 'import-cancel':     closeImportModal(); break;
    case 'import-execute':    executeImport(); break;
    case 'check-update':
      navigator.serviceWorker?.getRegistration?.()?.then(reg => {
        if (!reg) return;
        reg.update().then(() => {
          const w = reg.waiting || reg.installing;
          if (w) { w.postMessage({ type: 'SKIP_WAITING' }); }
          else { showToast(`v ${APP_VERSION} — already up to date.`); }
        });
      });
      break;

    // library
    case 'lib-upload':        document.getElementById('lib-audio-input')?.click(); break;
    case 'lib-tab':           handleLibTab(el.dataset.tab); break;
    case 'lib-filter':        handleLibFilter(el.dataset.filter); break;
    case 'lib-folder':        handleLibFolder(el.dataset.folder); break;
    case 'lib-rename':        handleLibRename(el.dataset.hash); break;
    case 'lib-delete':        handleLibDelete(el.dataset.hash); break;
    case 'lib-bd-open':       handleBlOpen(el.dataset.boardId); break;
    case 'lib-bd-delete':     handleLibBdDelete(el.dataset.boardId); break;

    // board list
    case 'bl-create':         openBoardCreate(); break;
    case 'bl-create-close':   closeBoardCreate(); break;
    case 'bl-create-confirm': handleBoardCreateConfirm(); break;
    case 'bl-open':           handleBlOpen(el.dataset.boardId); break;
    case 'bl-delete':         handleBlDelete(el.dataset.boardId); break;

    // board
    case 'bd-mode':           handleBdMode(el.dataset.mode); break;
    case 'bd-scene-switch':      handleBdSceneSwitch(el.dataset.sceneId); break;
    case 'bd-scene-add':         handleBdSceneAdd(); break;
    case 'bd-scene-opts':        handleBdSceneOpts(el.dataset.sceneId); break;
    case 'bd-scene-opts-close':  closeSceneOpts(); break;
    case 'bd-scene-opts-save':   handleSceneOptsSave(); break;
    case 'bd-scene-opts-delete': handleSceneOptsDelete(); break;
    case 'bd-scene-cols':        handleSceneCols(+el.dataset.cols); break;
    case 'bd-scene-add-close':   closeSceneAdd(); break;
    case 'bd-scene-add-confirm': handleSceneAddConfirm(); break;

    // sets
    case 'bd-set-switch':        handleSetSwitch(el.dataset.setId); break;
    case 'bd-set-add':           openSetAdd(); break;
    case 'bd-set-opts':          openSetOpts(el.dataset.setId); break;
    case 'bd-set-opts-close':    closeSetOpts(); break;
    case 'bd-set-opts-save':     handleSetOptsSave(); break;
    case 'bd-set-opts-delete':   handleSetOptsDelete(); break;
    case 'bd-set-add-close':     closeSetAdd(); break;
    case 'bd-set-add-confirm':   handleSetAddConfirm(); break;
    case 'bd-set-pad-tap':       handleQaPadTap(+el.dataset.setPadSlot); break;
    case 'bd-pad-tap':        handleBdPadTap(+el.dataset.padSlot); break;
    case 'bd-stop-all':       audioStopAll(0); document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing')); break;
    case 'bd-rename-board':   handleBdRenameBoard(); break;

    // pad picker
    case 'bd-picker-close':   closePadPicker(); break;
    case 'bd-picker-pick':    handlePadPick(el.dataset.hash, el.dataset.name); break;

    // pad opts
    case 'bd-opts-save':      handlePadOptsSave(); break;
    case 'bd-opts-clear':     handlePadOptsClear(); break;
    case 'bd-opts-change':    handlePadOptsChange(); break;
    case 'bd-opts-type': {
      document.querySelectorAll('.pad-type-btn').forEach(b =>
        b.classList.toggle('is-active', b.dataset.type === el.dataset.type));
      const isList = el.dataset.type === 'playlist';
      const plSec  = document.getElementById('pl-section');
      if (plSec) plSec.style.display = isList ? '' : 'none';
      const chBtn  = document.getElementById('pad-opts-change-btn');
      if (chBtn) chBtn.style.display = isList ? 'none' : '';
      break;
    }
    case 'bd-opts-shuffle':
      document.querySelectorAll('[data-action="bd-opts-shuffle"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.shuffle === el.dataset.shuffle));
      break;
    case 'bd-opts-pl-add':   openPlaylistTrackPicker(); break;
    case 'bd-opts-pl-remove': {
      const idx = +el.dataset.idx;
      _editingPlaylistFiles.splice(idx, 1);
      _renderPlaylistTracks();
      break;
    }

    // settings — board + session
    case 'sett-start-mode':
      localStorage.setItem('sos-start-mode', el.dataset.mode);
      document.querySelectorAll('[data-action="sett-start-mode"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.mode === el.dataset.mode));
      break;
    case 'sett-wake-lock': {
      const on = el.dataset.val === '1';
      localStorage.setItem('sos-wake-lock', on ? '1' : '0');
      document.querySelectorAll('[data-action="sett-wake-lock"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.val === el.dataset.val));
      if (on && S.screen === 'board' && S.boardMode === 'game') _acquireWakeLock();
      else _releaseWakeLock();
      break;
    }
    case 'sett-auto-stop': {
      const on = el.dataset.val === '1';
      localStorage.setItem('sos-auto-stop', on ? '1' : '0');
      document.querySelectorAll('[data-action="sett-auto-stop"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.val === el.dataset.val));
      if (on && S.screen === 'board' && S.boardMode === 'game') _resetAutoStop();
      else _cancelAutoStop();
      break;
    }
    case 'sett-auto-stop-save': {
      const min = Math.max(1, Math.min(120, +(document.getElementById('sett-auto-stop-min')?.value ?? 30)));
      localStorage.setItem('sos-auto-stop-min', String(min));
      if (_autoStopEnabled() && S.screen === 'board' && S.boardMode === 'game') _resetAutoStop();
      showToast(`Auto-stop: ${min} min`);
      break;
    }

    // settings — theme + defaults
    case 'sett-theme':
      set.theme(el.dataset.theme);
      document.querySelectorAll('.sett-theme-btn').forEach(b =>
        b.classList.toggle('is-active', b.dataset.theme === el.dataset.theme));
      break;
    case 'sett-defaults-save': {
      const vol     = Math.max(0, Math.min(100, +(document.getElementById('sett-def-volume')?.value  ?? 80)));
      const fadeIn  = Math.max(0, Math.min(30,  +(document.getElementById('sett-def-fadein')?.value  ?? 0)));
      const fadeOut = Math.max(0, Math.min(30,  +(document.getElementById('sett-def-fadeout')?.value ?? 0)));
      localStorage.setItem('sos-def-volume',  String(vol));
      localStorage.setItem('sos-def-fadein',  String(fadeIn));
      localStorage.setItem('sos-def-fadeout', String(fadeOut));
      showToast('Defaults saved.');
      break;
    }
  }
}

/* ── INIT ───────────────────────────────────────────────────── */

function _showSwUpdateBanner(waitingSW) {
  const b = document.createElement('div');
  b.className = 'sw-banner';
  b.innerHTML = `Update available — <button class="sw-banner-btn" id="sw-banner-btn">RELOAD</button>`;
  document.body.prepend(b);
  document.getElementById('sw-banner-btn').onclick = () => {
    waitingSW.postMessage({ type: 'SKIP_WAITING' });
  };
}

function _migrateFromV1() {
  if (localStorage.getItem('sos-migrated')) return;
  const get1  = k => localStorage.getItem(k);
  const set15 = (k, v) => { if (v !== null && get1(k) === null) localStorage.setItem(k, v); };

  set15('sos-master-vol',    get1('master-vol'));
  set15('sos-wake-lock',     get1('wake-lock-enabled'));
  set15('sos-auto-stop',     get1('auto-stop-enabled'));
  set15('sos-auto-stop-min', get1('auto-stop-minutes'));

  const themeMap = { retro: 'DEFAULT', modern: 'DEFAULT', verdant: 'VERDANT', neon: 'NEON', crimson: 'CRIMSON' };
  const v1Theme  = get1('theme');
  if (v1Theme !== null) set15('sos-theme', themeMap[v1Theme] || 'DEFAULT');

  const modeMap = { unlocked: 'setup', setup: 'setup', game: 'game', remember: 'remember' };
  const v1Mode  = get1('start-mode');
  if (v1Mode !== null) set15('sos-start-mode', modeMap[v1Mode] || 'setup');

  localStorage.setItem('sos-migrated', '1');
}

async function init() {
  _migrateFromV1();
  S.theme = localStorage.getItem('sos-theme') || '';
  applyTheme(S.theme);
  try {
    await openDB();
  } catch (err) {
    document.getElementById('app').innerHTML =
      `<div class="screen screen-intro"><div class="su-wrap" style="gap:16px">
        <p style="color:var(--blood-bright);font-family:var(--font-mono);font-size:12px;max-width:300px;text-align:center;line-height:1.7">
          ${escHtml(err.message)}
        </p>
        <button class="unlock-btn" style="margin-top:8px" onclick="location.reload()">RELOAD</button>
      </div></div>`;
    return;
  }
  renderScreen(S.screen);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      await reg.update();
      if (reg.waiting) _showSwUpdateBanner(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            _showSwUpdateBanner(nw);
          }
        });
      });
    } catch (e) { /* SW not critical */ }
  }
}

document.addEventListener('DOMContentLoaded', init);

// Re-acquire wake lock after the page returns to foreground (iOS releases it on hide)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible'
      && _wakeLockEnabled()
      && S.screen === 'board'
      && S.boardMode === 'game') {
    _acquireWakeLock();
  }
});

// When audio ends naturally: advance playlist or remove is-playing
document.addEventListener('audio:ended', e => {
  const padId = e.detail.padId;
  const pad = _findPadById(padId);
  if (pad?.type === 'playlist' && pad.files?.length && _plState[padId]) {
    _plAdvance(padId, pad.files.length);
    const hash = _plCurrentHash(pad);
    if (hash) {
      audioPlay(padId, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      return; // keep is-playing class
    }
  }
  const el = document.querySelector(`[data-pad-id="${CSS.escape(padId)}"]`);
  el?.classList.remove('is-playing');
});
