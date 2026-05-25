'use strict';

const APP_VERSION = '1.5.4';

const CHANGELOG = [
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
  boardMode(v) { S.boardMode = v; },
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
  set.screen(screenId);
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

let _libTab       = 'audio';
let _libSearchQ   = '';
let _libFolder    = null;
let _libFilter    = 'all';
let _libDeleteCfm = null;
let _libUploading = false;
let _libEntries   = [];

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
    <div class="lib-tab${_libTab==='boards'?' is-active':''}" data-action="lib-tab" data-tab="boards">BOARDS</div>
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
        <div class="sidebar-footer">
          <button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%" data-action="lib-new-folder">+ NEW FOLDER</button>
        </div>
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
      <main class="lib-main lib-main-stub"><p class="stub-sub" style="margin-top:40px">Boards — coming in Slice 5</p></main>
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
  renderAudioList();
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

function handleLibNewFolder() { alert('Folder management — coming soon'); }

/* ── SCREEN: BOARD LIST ──────────────────────────────────────── */

let _blBoards    = [];
let _blDeleteCfm = null;

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

async function handleBlCreate() {
  const raw  = prompt('Board name:');
  const name = (raw || '').trim();
  if (!name) return;
  const board = await boardCreate(name);
  set.boardId(board.id);
  await _blRefresh();
  renderBoardList();
}

async function handleBlOpen(boardId) {
  set.boardId(boardId);
  navigate('board');
}

async function handleBlDelete(id) {
  if (_blDeleteCfm === id) {
    _blDeleteCfm = null;
    const board = _blBoards.find(b => b.id === id);
    if (board?.scenes) {
      for (const s of board.scenes) await sceneDelete(s.id);
    }
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

let _bdBoard      = null;
let _bdScene      = null;
let _bdPickerSlot = null;
let _bdOptsSlot   = null;

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
    <div class="bd-mode-toggle">
      <button class="bd-mode-btn${isSetup ? ' is-active' : ''}" data-action="bd-mode" data-mode="setup">SETUP</button>
      <button class="bd-mode-btn${isGame  ? ' is-active' : ''}" data-action="bd-mode" data-mode="game">GAME</button>
    </div>
  </div>
  <div class="bd-scene-bar" id="bd-scene-bar"></div>
  <div class="bd-content" id="bd-content">
    <div class="bd-grid-wrap" id="bd-grid-wrap"></div>
  </div>
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

  if (!_libEntries.length) await _libRefresh();

  renderBoardUI();
}

function renderBoardUI() {
  if (!_bdBoard) return;

  const nameEl = document.getElementById('bd-board-name');
  if (nameEl) nameEl.textContent = _bdBoard.name;

  renderSceneBar();
  renderPadGrid();

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
  return `<div class="pad is-assigned" data-pad-slot="${pad.slot}" data-action="bd-pad-tap">
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
  _bdPickerSlot = null;
  document.getElementById('pad-picker')?.remove();
}

async function handlePadPick(hash, name) {
  if (_bdPickerSlot === null || !_bdScene) return;
  const slot = _bdPickerSlot;
  closePadPicker();

  const existing = _bdScene.pads.find(p => p.slot === slot);
  const newPad   = existing
    ? { ...existing, hash, name: existing.name || name }
    : { id: _newId('p'), slot, type: 'single', name, hash, hotkey: '', volume: 1, fadeIn: 0, fadeOut: 0 };

  _bdScene.pads = existing
    ? _bdScene.pads.map(p => p.slot === slot ? newPad : p)
    : [..._bdScene.pads, newPad];

  await scenePut(_bdScene);
  renderPadGrid();
}

/* pad options bottom sheet */

function openPadOpts(slot) {
  closePadPicker();
  closePadOpts();
  const pad = _bdScene?.pads.find(p => p.slot === slot);
  if (!pad) { openPadPicker(slot); return; }
  _bdOptsSlot = slot;

  document.getElementById('bd-content')?.insertAdjacentHTML('beforeend', `<div class="pad-opts" id="pad-opts">
    <div class="pad-opts-title">${escHtml(pad.name || '—')}</div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Name</span>
      <input class="audio-name-input" id="pad-opts-name" type="text" value="${escAttr(pad.name || '')}" style="flex:1;min-width:0">
    </div>
    <div class="pad-opts-row">
      <span class="pad-opts-label">Hotkey</span>
      <input class="audio-name-input" id="pad-opts-hotkey" type="text" value="${escAttr(pad.hotkey || '')}" maxlength="4" style="width:60px">
    </div>
    <div class="pad-opts-actions">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="bd-opts-change">Change Audio</button>
      <button class="sb-btn sb-btn-sm sb-btn-danger" data-action="bd-opts-clear">Clear</button>
      <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="bd-opts-save">Save</button>
    </div>
  </div>`);

  document.getElementById('pad-opts-name')?.focus();
}

function closePadOpts() {
  _bdOptsSlot = null;
  document.getElementById('pad-opts')?.remove();
}

async function handlePadOptsSave() {
  if (_bdOptsSlot === null || !_bdScene) return;
  const slot   = _bdOptsSlot;
  const name   = document.getElementById('pad-opts-name')?.value.trim() || '';
  const hotkey = document.getElementById('pad-opts-hotkey')?.value.trim() || '';
  closePadOpts();
  _bdScene.pads = _bdScene.pads.map(p => p.slot === slot ? { ...p, name, hotkey } : p);
  await scenePut(_bdScene);
  renderPadGrid();
}

async function handlePadOptsClear() {
  if (_bdOptsSlot === null || !_bdScene) return;
  const slot = _bdOptsSlot;
  closePadOpts();
  _bdScene.pads = _bdScene.pads.filter(p => p.slot !== slot);
  await scenePut(_bdScene);
  renderPadGrid();
}

function handlePadOptsChange() {
  const slot = _bdOptsSlot;
  closePadOpts();
  openPadPicker(slot);
}

/* scene management */

async function handleBdSceneSwitch(sceneId) {
  if (!_bdBoard || sceneId === _bdScene?.id) return;
  closePadPicker();
  closePadOpts();
  _bdBoard.activeSceneId = sceneId;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  _bdScene = await sceneGet(sceneId);
  renderBoardUI();
}

async function handleBdSceneAdd() {
  if (!_bdBoard) return;
  const raw  = prompt('Scene name:');
  const name = (raw || '').trim();
  if (!name) return;
  closePadPicker();
  closePadOpts();
  _bdScene = await sceneAdd(_bdBoard, name);
  renderBoardUI();
}

async function handleBdSceneOpts(sceneId) {
  const s    = _bdBoard?.scenes?.find(x => x.id === sceneId);
  if (!s) return;
  const choice = prompt(`"${s.name}"\n1 = Rename   2 = Delete`);
  if (choice === '1') await handleBdSceneRename(sceneId);
  else if (choice === '2') await handleBdSceneDelete(sceneId);
}

async function handleBdSceneRename(sceneId) {
  const s    = _bdBoard?.scenes?.find(x => x.id === sceneId);
  if (!s) return;
  const raw  = prompt('New name:', s.name);
  const name = (raw || '').trim();
  if (!name || name === s.name) return;

  _bdBoard.scenes   = _bdBoard.scenes.map(x => x.id === sceneId ? { ...x, name } : x);
  _bdBoard.updated  = Date.now();
  await boardPut(_bdBoard);

  if (_bdScene?.id === sceneId) { _bdScene.name = name; await scenePut(_bdScene); }
  else { const sc = await sceneGet(sceneId); if (sc) { sc.name = name; await scenePut(sc); } }

  renderBoardUI();
}

async function handleBdSceneDelete(sceneId) {
  if (!_bdBoard) return;
  if ((_bdBoard.scenes || []).length <= 1) { alert('Cannot delete the last scene.'); return; }
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

async function handleBdMode(mode) {
  set.boardMode(mode);
  document.querySelectorAll('.bd-mode-btn').forEach(btn =>
    btn.classList.toggle('is-active', btn.dataset.mode === mode));
  const sMode = document.getElementById('bd-status-mode');
  if (sMode) { sMode.textContent = mode.toUpperCase(); sMode.style.color = `var(--mode-${mode})`; }
  closePadPicker();
  closePadOpts();
  renderSceneBar();
  renderPadGrid();
}

async function handleBdPadTap(slot) {
  if (S.boardMode !== 'setup') return; // GAME mode playback: Slice 4
  const pad = _bdScene?.pads.find(p => p.slot === slot);
  if (pad) openPadOpts(slot);
  else openPadPicker(slot);
}

async function handleBdRenameBoard() {
  if (!_bdBoard) return;
  const raw  = prompt('Board name:', _bdBoard.name);
  const name = (raw || '').trim();
  if (!name || name === _bdBoard.name) return;
  _bdBoard.name    = name;
  _bdBoard.updated = Date.now();
  await boardPut(_bdBoard);
  const nameEl = document.getElementById('bd-board-name');
  if (nameEl) nameEl.textContent = name;
  const sName = document.getElementById('bd-status-name');
  if (sName) sName.textContent = name;
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
  settings:     () => stubHTML('SETTINGS'),
  tips:         () => stubHTML('TIPS & TRICKS'),
  about:        () => stubHTML('ABOUT'),
};

/** @type {Partial<Record<ScreenId, () => void>>} */
const SCREEN_MOUNTS = {
  intro:        mountIntro,
  menu:         mountMenu,
  'board-list': mountBoardList,
  board:        mountBoard,
  library:      mountLibrary,
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

/* ── EVENT DELEGATION ───────────────────────────────────────── */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (_clOpen)          { closeChangelog(); return; }
    if (_bdPickerSlot !== null) { closePadPicker(); return; }
    if (_bdOptsSlot   !== null) { closePadOpts();   return; }
  }
});

document.addEventListener('click', e => {
  // close changelog on backdrop click
  if (_clOpen && !e.target.closest('#cl-modal')) { closeChangelog(); return; }

  // clear lib delete confirm
  if (_libDeleteCfm) {
    if (!e.target.closest(`[data-action="lib-delete"][data-hash="${_libDeleteCfm}"]`)) {
      const old = document.querySelector(`.act-btn.danger[data-hash="${_libDeleteCfm}"]`);
      if (old) { old.classList.remove('is-confirm'); old.textContent = '×'; }
      _libDeleteCfm = null;
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
  if (_bdPickerSlot !== null && !e.target.closest('#pad-picker')) {
    closePadPicker();
    return;
  }

  // close pad opts when clicking outside it (but not on the pad itself)
  if (_bdOptsSlot !== null && !e.target.closest('#pad-opts') && !e.target.closest(`[data-pad-slot="${_bdOptsSlot}"]`)) {
    closePadOpts();
    return;
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
    case 'backup':            alert('Backup — coming in Slice 7'); break;
    case 'import':            alert('Import — coming in Slice 7'); break;
    case 'check-update':
      navigator.serviceWorker?.getRegistration?.()?.then(reg => {
        if (!reg) return;
        reg.update().then(() => {
          const w = reg.waiting || reg.installing;
          if (w) { w.postMessage({ type: 'SKIP_WAITING' }); }
          else { alert(`v ${APP_VERSION} — already up to date.`); }
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
    case 'lib-new-folder':    handleLibNewFolder(); break;

    // board list
    case 'bl-create':         handleBlCreate(); break;
    case 'bl-open':           handleBlOpen(el.dataset.boardId); break;
    case 'bl-delete':         handleBlDelete(el.dataset.boardId); break;

    // board
    case 'bd-mode':           handleBdMode(el.dataset.mode); break;
    case 'bd-scene-switch':   handleBdSceneSwitch(el.dataset.sceneId); break;
    case 'bd-scene-add':      handleBdSceneAdd(); break;
    case 'bd-scene-opts':     handleBdSceneOpts(el.dataset.sceneId); break;
    case 'bd-pad-tap':        handleBdPadTap(+el.dataset.padSlot); break;
    case 'bd-rename-board':   handleBdRenameBoard(); break;

    // pad picker
    case 'bd-picker-close':   closePadPicker(); break;
    case 'bd-picker-pick':    handlePadPick(el.dataset.hash, el.dataset.name); break;

    // pad opts
    case 'bd-opts-save':      handlePadOptsSave(); break;
    case 'bd-opts-clear':     handlePadOptsClear(); break;
    case 'bd-opts-change':    handlePadOptsChange(); break;
  }
}

/* ── INIT ───────────────────────────────────────────────────── */

async function init() {
  applyTheme(S.theme);
  await openDB();
  renderScreen(S.screen);
  if ('serviceWorker' in navigator) {
    const hadController = !!navigator.serviceWorker.controller;
    // Auto-reload page when a new SW takes control (skipWaiting + clients.claim in sw.js)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hadController) window.location.reload();
    });
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.update(); // proactively check for a newer sw.js on every load
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
