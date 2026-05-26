'use strict';

const APP_VERSION = '1.5.30';

const CHANGELOG = [
  { v: '1.5.30', date: '2026-05-26', items: [
    'Switch sound: upload a custom audio file (≤ 2 MB) in Settings → CONTROLS → SWITCH SOUND',
    'Plays on every SETUP ↔ GAME mode toggle; stored as base64 in localStorage, decoded on first audio interaction',
    'UPLOAD button replaces the sound; × button removes it',
  ]},
  { v: '1.5.29', date: '2026-05-26', items: [
    'Configurable GAME long-press action: VOL (quick volume), CUE (add to queue), or OFF — Settings → CONTROLS',
    'Cue Stack: long-press in CUE mode queues up to 3 pads; TAB key (or ▶ TAB button) fires the next one',
    'Cue strip appears above the pad grid while queue is active; tap an entry to remove it; ✕ clears all',
  ]},
  { v: '1.5.28', date: '2026-05-26', items: [
    'Enter Key Stop Mode: Settings → CONTROLS → ENTER STOP — TOTAL (stop all) or SERIAL (LIFO: stop last started)',
    'SERIAL mode tracks play order across scene pads, set pads, hotkeys, combo pads, and loop pads',
    'Enter key is now handled in GAME mode when no input is focused',
  ]},
  { v: '1.5.27', date: '2026-05-26', items: [
    'Quick Rename: 500 ms long-press on an assigned pad in SETUP mode opens a compact rename overlay',
    'Enter = save, Esc = cancel, tap outside box = cancel; movement > 8 px cancels before timer fires',
    'Works for both scene-grid pads and set-strip pads; subsequent tap-click is suppressed after long-press',
  ]},
  { v: '1.5.26', date: '2026-05-26', items: [
    'Library PADS tab: save any configured pad as a reusable template (◈ TEMPLATE button in PAD EDITOR)',
    'Templates stored locally; browse in Library → PADS with type badge, file/track info, saved date',
    'ASSIGN: navigates to board (SETUP mode) with banner; tap any scene or set slot to apply the template',
    'ESC cancels assign mode; 2-tap confirm delete per template',
  ]},
  { v: '1.5.25', date: '2026-05-26', items: [
    'Audio ducking: LOOP pads automatically reduce volume when a SINGLE or PLAYLIST pad plays',
    'Duck amount configurable in Settings → DUCKING (0–100%, default 30%)',
    'Duck ramps in/out over 0.3 s; immediate restore when ducking disabled; respects multiple concurrent fg pads',
    'Ducking uses a dedicated gain node per loop pad, independent of per-pad volume',
  ]},
  { v: '1.5.24', date: '2026-05-26', items: [
    'V1 backup import: detect and auto-convert V1 backups (numeric version, no sos field)',
    'Mode mapping: once→single, loop→loop, list→playlist, combo→combo',
    'Combo steps: board-index references resolved to hashes; per-chip vol/fade/loop preserved',
    'Playlist: file array and shuffle flag migrated; icons silently dropped (incompatible icon set)',
    'Import modal shows V1 migration notice with icon-drop warning',
  ]},
  { v: '1.5.23', date: '2026-05-26', items: [
    'PAD EDITOR: full-screen 3-column editor replaces the bottom-sheet for configured pads in SETUP mode',
    'LEFT: identity (name, hotkey capture), behavior (SOLO/LOOP/LIST/COMBO mode cards), visual (icon)',
    'CENTER: sound section with file chip + waveform visualization, playlist tracks for LIST, combo steps for COMBO',
    'RIGHT: volume slider, fade in slider (0–30 s), fade out slider (0–30 s) with live waveform update',
    'Per-pad fade in/out now editable in the inspector (was previously global-defaults-only)',
    'Toolbar: mini pad preview, live name display, PREVIEW toggle, CANCEL, SAVE (Ctrl+S), DELETE with confirm',
    'FROM LIB and ADD TRACK use dedicated sub-overlays (same z-level as editor)',
    'ESC closes sub-overlays first, then editor; navigate away also closes editor',
  ]},
  { v: '1.5.22', date: '2026-05-26', items: [
    'Combo pads: type COMBO ◆ — ordered list of steps, each step plays audio chips in parallel',
    'Per-chip: volume, fade-in, loop (background) toggle; per-step: pause duration + action (NONE/STOP-ALL/FADE-ALL)',
    'Combo editor overlay: add/remove steps and chips, reorder not required — chips and steps are sequential',
    'Combo pads tap to start / tap again to stop; is-playing badge while running',
    'Background (loop) chips keep playing across subsequent steps until combo ends or STOP-ALL action',
    'Hotkeys work for combo pads same as all other types',
  ]},
  { v: '1.5.21', date: '2026-05-26', items: [
    'Pad icons: assign any of 1,476 pixel-art icons to a pad in SETUP mode (VISUAL section in pad opts)',
    'Icon picker: searchable by name, filterable by 15 categories, full-screen overlay',
    'Icons show in pad cell (replaces waveform mini when set); color matches pad type accent',
    'Library ICONS tab: browse all icons without assigning',
  ]},
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
  if (_peOpen) closePadEditor();
  if (_assigningTemplate && screenId !== 'board') _cancelAssignTemplate();
  if (S.screen === 'board' && screenId !== 'board') {
    audioStopAll(0); _onFgStopAll(); _playOrderClear();
    _comboClearAll(); _cueClear();
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
    audioStopAll(0); _onFgStopAll();
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
      <main class="lib-main lib-main-stub"><p class="stub-sub" style="margin-top:40px">Loading icons…</p></main>
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
  else if (_libTab === 'icons') renderIconsTab();
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
  else if (tab === 'pads')  renderPadsTab();
  else if (tab === 'audio') renderAudioList();
  else if (tab === 'icons') renderIconsTab();
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


function renderPadsTab() {
  const container = document.getElementById('tab-pads');
  if (!container) return;
  const templates = loadPadTemplates();
  const canAssign = _bdBoard && S.boardMode === 'setup';

  const statusCount = document.getElementById('lib-status-count');
  if (statusCount) statusCount.textContent = templates.length
    ? `${templates.length} template${templates.length !== 1 ? 's' : ''}`
    : 'No templates';

  if (!templates.length) {
    container.innerHTML = `<main class="lib-main"><p class="lib-empty" style="margin-top:40px">No pad templates yet.<br>Open a pad in SETUP mode and tap ◈ TEMPLATE to save one.</p></main>`;
    return;
  }

  const typeLabel = { single:'SOLO', loop:'LOOP', playlist:'LIST', combo:'COMBO' };
  const typeColor = { single:'var(--text-dim)', loop:'var(--mode-setup)', playlist:'#b48af7', combo:'var(--gold)' };

  container.innerHTML = `<main class="lib-main"><div class="lib-bd-list" id="lib-pt-list">
    ${templates.map(t => {
      const isCfm = !!_ptDeleteCfm[t.id];
      const typLbl = typeLabel[t.type] || t.type.toUpperCase();
      const typClr = typeColor[t.type] || 'var(--text-dim)';
      const date   = t.saved ? new Date(t.saved).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'2-digit' }) : '—';
      let detail = '';
      if (t.type === 'playlist' && t.files?.length)   detail = `${t.files.length} track${t.files.length !== 1 ? 's' : ''}`;
      else if (t.type === 'combo' && t.steps?.length) detail = `${t.steps.length} step${t.steps.length !== 1 ? 's' : ''}`;
      else if (t.hash) detail = (t.name || '').slice(0, 28);
      return `<div class="lib-bd-row" data-pt-id="${t.id}">
        <div class="lib-bd-info">
          <div class="lib-bd-name" style="display:flex;align-items:center;gap:8px">
            ${t.iconId ? `<span style="line-height:1">${renderPadIcon(t.iconId, 14, typClr)}</span>` : ''}
            <span>${escHtml(t.name)}</span>
            <span class="audio-badge" style="background:${typClr};color:var(--bg);font-size:9px">${typLbl}</span>
          </div>
          <div class="lib-bd-meta">${detail ? escHtml(detail) + ' · ' : ''}vol ${t.volume ?? 80}% · saved ${date}</div>
        </div>
        <div class="lib-bd-acts">
          ${canAssign
            ? `<button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="lib-pt-assign" data-pt-id="${t.id}">ASSIGN</button>`
            : ''}
          <button class="act-btn danger${isCfm ? ' is-confirm' : ''}" data-action="lib-pt-delete" data-pt-id="${t.id}" title="Delete template">${isCfm ? 'SURE?' : '×'}</button>
        </div>
      </div>`;
    }).join('')}
  </div></main>`;
}

function handleLibPtDelete(ptId) {
  if (_ptDeleteCfm[ptId]) {
    delete _ptDeleteCfm[ptId];
    removePadTemplate(ptId);
    renderPadsTab();
  } else {
    const old = Object.keys(_ptDeleteCfm)[0];
    if (old) {
      delete _ptDeleteCfm[old];
      const btn = document.querySelector(`.act-btn.danger[data-pt-id="${old}"]`);
      if (btn) { btn.classList.remove('is-confirm'); btn.textContent = '×'; }
    }
    _ptDeleteCfm[ptId] = true;
    const btn = document.querySelector(`.act-btn.danger[data-pt-id="${ptId}"]`);
    if (btn) { btn.classList.add('is-confirm'); btn.textContent = 'SURE?'; }
  }
}

function handleLibPtAssign(ptId) {
  const templates = loadPadTemplates();
  const t = templates.find(x => x.id === ptId);
  if (!t) return;
  _assigningTemplate = t;
  navigate('board');
  _showAssignBanner();
}

function _showAssignBanner() {
  document.getElementById('pt-assign-banner')?.remove();
  if (!_assigningTemplate) return;
  const banner = document.createElement('div');
  banner.id = 'pt-assign-banner';
  banner.className = 'assign-banner';
  banner.innerHTML = `<span class="assign-banner-text">Tap a pad slot to assign <strong>${escHtml(_assigningTemplate.name)}</strong></span>
    <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pt-assign-cancel">CANCEL</button>`;
  document.getElementById('app').prepend(banner);
}

function _cancelAssignTemplate() {
  _assigningTemplate = null;
  document.getElementById('pt-assign-banner')?.remove();
}

async function _applyTemplateToSlot(slot, isSet) {
  if (!_assigningTemplate || !_bdBoard) return;
  const t = _assigningTemplate;
  _cancelAssignTemplate();
  const newPad = {
    id: 'p_' + Math.random().toString(36).slice(2, 10), slot,
    name: t.name, hotkey: t.hotkey || '', type: t.type || 'single',
    volume: t.volume ?? 80, fadeIn: t.fadeIn || 0, fadeOut: t.fadeOut || 0,
    hash: t.hash || null,
  };
  if (t.type === 'playlist' && t.files?.length) { newPad.files = [...t.files]; if (t.shuffle) newPad.shuffle = true; }
  if (t.type === 'combo'    && t.steps?.length) newPad.steps = t.steps.map(s => ({ ...s, chips: (s.chips||[]).map(c => ({ ...c })) }));
  if (t.iconId) newPad.iconId = t.iconId;
  if (isSet && _bdSet) {
    const updated = { ..._bdSet, pads: [...(_bdSet.pads || []).filter(p => p.slot !== slot), newPad] };
    await setPut(updated);
    _bdSet = updated;
  } else if (_bdScene) {
    const updated = { ..._bdScene, pads: [...(_bdScene.pads || []).filter(p => p.slot !== slot), newPad] };
    await scenePut(updated);
    _bdScene = updated;
  }
  renderBoard();
  showToast(`"${t.name}" applied.`);
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

function renderIconsTab() {
  const el = document.getElementById('tab-icons');
  if (!el) return;
  if (typeof PAD_ICONS === 'undefined') {
    el.innerHTML = '<main class="lib-main lib-main-stub"><p class="stub-sub">Icon library not loaded.</p></main>';
    return;
  }
  const cats = ['all', ...new Set(PAD_ICONS.map(i => i.cat))];
  let libSearch = '', libCat = 'all';

  function buildGrid() {
    const q = libSearch.toLowerCase();
    const icons = PAD_ICONS.filter(i =>
      (libCat === 'all' || i.cat === libCat) && (!q || i.label.toLowerCase().includes(q)));
    return icons.length
      ? `<div class="ip-grid lib-ip-grid">${icons.map(i =>
          `<div class="ip-cell" title="${escAttr(i.label)}">${padIconSvg(i.id, 24, 'var(--text-dim)')}</div>`
        ).join('')}</div>`
      : '<p class="lib-empty">No icons found.</p>';
  }

  el.innerHTML = `<main class="lib-main" style="display:flex;flex-direction:column;overflow:hidden">
    <div class="lib-icons-top">
      <input class="ip-search" id="lib-ip-search" type="text" placeholder="Search icons…" autocomplete="off">
      <select class="ip-cat-select" id="lib-ip-cat">
        ${cats.map(c => `<option value="${escAttr(c)}">${c === 'all' ? 'All' : escHtml(c)}</option>`).join('')}
      </select>
    </div>
    <div class="lib-ip-wrap" id="lib-ip-wrap">${buildGrid()}</div>
  </main>`;

  document.getElementById('lib-ip-search')?.addEventListener('input', e => {
    libSearch = e.target.value; document.getElementById('lib-ip-wrap').innerHTML = buildGrid();
  });
  document.getElementById('lib-ip-cat')?.addEventListener('change', e => {
    libCat = e.target.value; document.getElementById('lib-ip-wrap').innerHTML = buildGrid();
  });
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

// Icon picker state
let _ipOpen      = false;
let _ipCtx       = null;   // 'pad-opts' | 'library' | null
let _ipSearch    = '';
let _ipCat       = 'all';
let _editingIconId = null; // iconId being edited in pad opts sheet (null = none)

// Quick-volume long-press state
let _lpTimer  = null;
let _lpFired  = false;
let _lpStartX = 0;
let _lpStartY = 0;
let _lpPadId  = null;
let _lpSlot   = null;
let _lpIsSet  = false;
let _lpNewVol = null;

// Quick-rename long-press state (SETUP mode)
let _qrTimer  = null;
let _qrFired  = false;
let _qrSlot   = null;
let _qrIsSet  = false;
let _qrOpen   = false;
let _qrStartX = 0;
let _qrStartY = 0;

// Combo pad runtime state
/** @type {Object.<string,{stopped:boolean,bgIds:Set<string>,fgIds:Set<string>,fgRem:number,stepIdx:number,pauseTimer:any}>} */
const _comboState = {};

// Pad template storage
function loadPadTemplates()    { try { return JSON.parse(localStorage.getItem('sos-pad-templates') || '[]'); } catch { return []; } }
function savePadTemplates(ts)  { localStorage.setItem('sos-pad-templates', JSON.stringify(ts)); }
function addPadTemplate(t)     { const ts = loadPadTemplates(); ts.push(t); savePadTemplates(ts); return ts; }
function removePadTemplate(id) { const ts = loadPadTemplates().filter(t => t.id !== id); savePadTemplates(ts); return ts; }

let _assigningTemplate = null;  // template being assigned to a slot
let _ptDeleteCfm = {};           // templateId → true if confirm pending

// Ducking state
const _fgPlayIds = new Set(); // padIds currently playing as foreground (single/playlist)
function _duckEnabled()  { return localStorage.getItem('sos-duck-enabled') === '1'; }
function _duckAmt()      { return Math.max(0, Math.min(100, +(localStorage.getItem('sos-duck-amount') ?? '30'))) / 100; }
function _onFgStart(id)  { _fgPlayIds.add(id); _playOrderAdd(id); if (_fgPlayIds.size === 1 && _duckEnabled()) audioDuck(_duckAmt()); }
function _onFgEnd(id)    { _fgPlayIds.delete(id); _playOrderRemove(id); if (_fgPlayIds.size === 0) audioUnduck(); }
function _onFgStopAll()  { _fgPlayIds.clear(); audioUnduck(0); }

// Play order tracking for SERIAL Enter-stop mode
const _playOrder = [];
function _playOrderAdd(id)    { const i = _playOrder.indexOf(id); if (i !== -1) _playOrder.splice(i, 1); _playOrder.push(id); }
function _playOrderRemove(id) { const i = _playOrder.indexOf(id); if (i !== -1) _playOrder.splice(i, 1); }
function _playOrderClear()    { _playOrder.length = 0; }

// Cue stack (GAME mode long-press CUE action)
const _cueStack = []; // [{padId, slot, isSet}]

function _cueAdd(padId, slot, isSet) {
  if (_cueStack.some(e => e.padId === padId)) { showToast('Already in cue'); return; }
  if (_cueStack.length >= 3) { showToast('Cue full (max 3)'); return; }
  _cueStack.push({ padId, slot, isSet });
  renderCueStrip();
}

function _cueFire() {
  if (!_cueStack.length) return;
  const { slot, isSet } = _cueStack.shift();
  renderCueStrip();
  if (isSet) handleQaPadTap(slot);
  else handleBdPadTap(slot);
}

function _cueClear() {
  _cueStack.length = 0;
  renderCueStrip();
}

function renderCueStrip() {
  const el = document.getElementById('bd-cue-strip');
  if (!el) return;
  if (!_cueStack.length || S.boardMode !== 'game') { el.innerHTML = ''; return; }
  const allPads = [...(_bdScene?.pads || []), ...(_bdSet?.pads || [])];
  el.innerHTML = `<div class="cue-strip">
    <span class="cue-label">CUE</span>
    ${_cueStack.map((entry, i) => {
      const pad  = allPads.find(p => p.id === entry.padId);
      const name = pad?.name || '?';
      return `<div class="cue-item${i === 0 ? ' is-next' : ''}" data-action="cue-remove" data-pad-id="${escAttr(entry.padId)}">
        <span class="cue-idx">${i + 1}</span>
        <span class="cue-name">${escHtml(name)}</span>
      </div>`;
    }).join('')}
    <button class="cue-fire-btn" data-action="cue-fire">▶ TAB</button>
    <button class="cue-clear-btn" data-action="cue-clear">✕</button>
  </div>`;
}

// Combo editor state
let _ceOpen      = false;
let _cePadId     = null;
let _ceIsSet     = false;
let _ceSteps     = [];    // [{chips:[{name,hash,vol,fadeIn,loop}], dur:number, action:null|'stop-all'|'fade-all'}]
let _ceSavedSteps = null; // deep copy saved on editor open, restored on BACK
let _ceCpOpen    = false;
let _ceCpStepIdx = null;

// Pad editor state
let _peOpen          = false;
let _pePadSlot       = null;
let _peIsSet         = false;
let _peEditPad       = null;
let _peLibEntry      = null;
let _peCaptureKey    = false;
let _peDeleteCfm     = false;
let _pePickerOpen    = false;   // audio-from-lib picker
let _peTrackPickerOpen = false; // playlist-add picker

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
    <div id="bd-cue-strip"></div>
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
  renderCueStrip();
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
  const isCombo    = pad.type === 'combo';
  const playing    = isCombo ? !!_comboState[pad.id] : audioIsPlaying(pad.id);
  const isLoop     = pad.type === 'loop';
  const isPlaylist = pad.type === 'playlist';
  const accentVar  = isLoop     ? 'var(--pad-loop)'
                   : isPlaylist ? 'var(--pad-playlist)'
                   : isCombo    ? 'var(--pad-combo)'
                   : 'var(--pad-single)';
  const waveHash   = isCombo ? (pad.steps?.[0]?.chips?.[0]?.hash || null) : pad.hash;
  const iconHtml   = pad.iconId && typeof padIconSvg === 'function'
    ? `<div class="pad-icon">${padIconSvg(pad.iconId, 32, accentVar)}</div>`
    : `<div class="pad-wave">${_waveMiniFromHash(waveHash)}</div>`;
  return `<div class="pad is-assigned${playing ? ' is-playing' : ''}${isLoop ? ' is-loop' : ''}${isPlaylist ? ' is-playlist' : ''}${isCombo ? ' is-combo' : ''}" data-pad-slot="${pad.slot}" data-pad-id="${escAttr(pad.id)}" data-action="bd-pad-tap">
    ${isLoop     ? `<span class="pad-loop-badge">↻</span>` : ''}
    ${isPlaylist ? `<span class="pad-loop-badge pad-pl-badge">☰</span>` : ''}
    ${isCombo    ? `<span class="pad-loop-badge pad-combo-badge">◆</span>` : ''}
    ${iconHtml}
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
  const playing = pad.type === 'combo' ? !!_comboState[pad.id] : audioIsPlaying(pad.id);
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

/* ── COMBO PLAYBACK ──────────────────────────────────────────── */

/** @param {Object} pad */
function _comboStart(pad) {
  if (_comboState[pad.id]) return;
  const state = { stopped: false, bgIds: new Set(), fgIds: new Set(), fgRem: 0, stepIdx: 0, pauseTimer: null };
  _comboState[pad.id] = state;
  _playOrderAdd(pad.id);
  _comboPlayStep(pad, state, 0);
}

/**
 * @param {Object} pad
 * @param {Object} state
 * @param {number} stepIdx
 */
function _comboPlayStep(pad, state, stepIdx) {
  if (state.stopped) return;
  const steps = pad.steps || [];
  if (stepIdx >= steps.length) { _comboFinish(pad.id); return; }

  const step = steps[stepIdx];
  state.stepIdx = stepIdx;

  // Apply step action before starting chips
  if (step.action === 'stop-all') {
    state.bgIds.forEach(id => audioStop(id, { fade: 0 }));
    state.bgIds.clear();
    audioStopAll(0);
  } else if (step.action === 'fade-all') {
    state.bgIds.forEach(id => audioStop(id, { fade: 1 }));
    state.bgIds.clear();
    audioStopAll(1);
  }

  const chips   = step.chips || [];
  const bgChips = chips.filter(c =>  c.loop);
  const fgChips = chips.filter(c => !c.loop);

  // Start background (loop) chips
  bgChips.forEach((chip, i) => {
    const subId = `${pad.id}:bg:${stepIdx}:${i}`;
    state.bgIds.add(subId);
    audioPlay(subId, chip.hash, { type: 'loop', volume: chip.vol ?? 80, fadeIn: chip.fadeIn || 0 });
  });

  // Start foreground chips
  state.fgRem = fgChips.length;
  if (fgChips.length === 0) {
    const dur = (step.dur || 0) * 1000;
    if (dur > 0) {
      state.pauseTimer = setTimeout(() => {
        state.pauseTimer = null;
        if (!state.stopped) _comboPlayStep(pad, state, stepIdx + 1);
      }, dur);
    } else {
      _comboPlayStep(pad, state, stepIdx + 1);
    }
    return;
  }
  fgChips.forEach((chip, i) => {
    const subId = `${pad.id}:${stepIdx}:${i}`;
    state.fgIds.add(subId);
    audioPlay(subId, chip.hash, { type: 'single', volume: chip.vol ?? 80, fadeIn: chip.fadeIn || 0 });
  });
}

/** @param {string} padId */
function _comboStop(padId) {
  const state = _comboState[padId];
  if (!state) return;
  state.stopped = true;
  if (state.pauseTimer) { clearTimeout(state.pauseTimer); state.pauseTimer = null; }
  state.bgIds.forEach(id => audioStop(id, { fade: 0.5 }));
  state.bgIds.clear();
  state.fgIds.forEach(id => audioStop(id, { fade: 0 }));
  state.fgIds.clear();
  delete _comboState[padId];
  _playOrderRemove(padId);
  const el = document.querySelector(`[data-pad-id="${CSS.escape(padId)}"]`);
  el?.classList.remove('is-playing');
}

/** @param {string} padId */
function _comboFinish(padId) {
  const state = _comboState[padId];
  if (!state) return;
  state.bgIds.forEach(id => audioStop(id, { fade: 0.5 }));
  state.bgIds.clear();
  state.fgIds.clear();
  delete _comboState[padId];
  _playOrderRemove(padId);
  const el = document.querySelector(`[data-pad-id="${CSS.escape(padId)}"]`);
  el?.classList.remove('is-playing');
}

/** Clear all running combos (call when leaving board or switching scenes) */
function _comboClearAll() {
  for (const padId of Object.keys(_comboState)) {
    const state = _comboState[padId];
    if (state.pauseTimer) clearTimeout(state.pauseTimer);
  }
  for (const k in _comboState) delete _comboState[k];
}

function _handleEnterStop() {
  const mode = localStorage.getItem('sos-enter-stop-mode') || 'total';
  if (mode === 'total') {
    audioStopAll(0); _onFgStopAll(); _playOrderClear(); _comboClearAll();
    document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing'));
    return;
  }
  // SERIAL: stop the most recently started pad (LIFO)
  const allPads = [...(_bdScene?.pads || []), ...(_bdSet?.pads || [])];
  const ids = [..._playOrder].reverse();
  for (const padId of ids) {
    if (_comboState[padId]) {
      _comboStop(padId);
      return;
    }
    if (audioIsPlaying(padId)) {
      const pad = allPads.find(p => p.id === padId);
      audioStop(padId, { fade: pad?.fadeOut || 0 });
      if (_fgPlayIds.has(padId)) _onFgEnd(padId);
      else _playOrderRemove(padId);
      document.querySelector(`[data-pad-id="${CSS.escape(padId)}"]`)?.classList.remove('is-playing');
      return;
    }
    _playOrderRemove(padId);
  }
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
  const isCombo = t === 'combo';
  const nSteps  = _ceSteps.length;
  const nChips  = _ceSteps.reduce((n, s) => n + (s.chips || []).length, 0);
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
        <button class="pad-type-btn${t === 'combo'    ? ' is-active' : ''}" data-action="bd-opts-type" data-type="combo">COMBO ◆</button>
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
    <div class="pad-opts-section" id="combo-section"${isCombo ? '' : ' style="display:none"'}>
      <div class="pad-opts-row">
        <span class="pad-opts-label">Steps</span>
        <span id="combo-step-info" style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim)">${nSteps} step${nSteps !== 1 ? 's' : ''}, ${nChips} chip${nChips !== 1 ? 's' : ''}</span>
      </div>
      <button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%;margin-top:4px" data-action="bd-opts-combo-edit">EDIT COMBO STEPS</button>
    </div>
    <div class="pad-opts-section">
      <div class="pad-opts-row">
        <span class="pad-opts-label">Icon</span>
        <div class="pad-icon-preview" id="pad-icon-preview">${pad.iconId && typeof padIconSvg === 'function' ? padIconSvg(pad.iconId, 24, 'var(--gold)') : '<span style="font-family:var(--font-mono);font-size:11px;color:var(--text-mute)">none</span>'}</div>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-left:6px" data-action="bd-opts-icon-pick">CHANGE</button>
        ${pad.iconId ? `<button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-left:4px" data-action="bd-opts-icon-clear">✕</button>` : ''}
      </div>
    </div>
    <div class="pad-opts-actions">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" id="pad-opts-change-btn" data-action="bd-opts-change"${(isList || isCombo) ? ' style="display:none"' : ''}>Change Audio</button>
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
  _editingIconId = pad.iconId || null;
  _ceSteps = (pad.steps || []).map(s => ({ chips: (s.chips || []).map(c => ({ ...c })), dur: s.dur || 0, action: s.action || null }));
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
    if (_editingIconId) base.iconId = _editingIconId;
    else delete base.iconId;
    if (type === 'combo') {
      base.steps = _ceSteps.map(s => ({ chips: (s.chips || []).map(c => ({ ...c })), dur: s.dur || 0, action: s.action || null }));
      return base;
    }
    if (!isList) return base;
    base.files   = files;
    base.shuffle = shuffle;
    base.hash    = files?.length ? files[0].hash : (p.hash || null);
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
  audioStopAll(0); _onFgStopAll(); _playOrderClear();
  _comboClearAll(); _cueClear();
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
  _editingIconId = pad.iconId || null;
  _ceSteps = (pad.steps || []).map(s => ({ chips: (s.chips || []).map(c => ({ ...c })), dur: s.dur || 0, action: s.action || null }));
  document.getElementById('bd-content')?.insertAdjacentHTML('beforeend', _padOptsHTML(pad));
  document.getElementById('pad-opts-name')?.focus();
}

async function handleQaPadTap(slot) {
  const pad = _bdSet?.pads.find(p => p.slot === slot);
  if (_assigningTemplate && S.boardMode === 'setup') {
    await _applyTemplateToSlot(slot, true);
    return;
  }
  if (S.boardMode === 'setup') {
    if (pad) openPadEditor(slot, true);
    else openSetPadPicker(slot);
    return;
  }
  if (!pad) return;
  const el = document.querySelector(`[data-pad-id="${CSS.escape(pad.id)}"]`);
  if (pad.type === 'combo') {
    if (_comboState[pad.id]) {
      _comboStop(pad.id);
    } else {
      if (!pad.steps?.length) { showToast('No steps configured — edit combo steps first.'); return; }
      _comboStart(pad);
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (pad.type === 'playlist') {
    if (!pad.files?.length) return;
    if (audioIsPlaying(pad.id)) {
      delete _plState[pad.id];
      audioStop(pad.id, { fade: pad.fadeOut || 0 });
      if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
      el?.classList.remove('is-playing');
    } else {
      if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
      const hash = _plCurrentHash(pad);
      if (!hash) return;
      audioPlay(pad.id, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      _onFgStart(pad.id);
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (!pad.hash) return;
  if (audioIsPlaying(pad.id)) {
    audioStop(pad.id, { fade: pad.fadeOut || 0 });
    if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
    else _playOrderRemove(pad.id);
    el?.classList.remove('is-playing');
  } else {
    audioPlay(pad.id, pad.hash, {
      type: pad.type || 'single', volume: pad.volume ?? 80,
      fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
    });
    if ((pad.type || 'single') !== 'loop') _onFgStart(pad.id);
    else _playOrderAdd(pad.id);
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
  playSwitchSound();
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
  if (_assigningTemplate && S.boardMode === 'setup') {
    await _applyTemplateToSlot(slot, false);
    return;
  }
  if (S.boardMode === 'setup') {
    if (pad) openPadEditor(slot, false);
    else openPadPicker(slot);
    return;
  }
  // GAME mode
  if (!pad) return;
  const el = document.querySelector(`[data-pad-id="${CSS.escape(pad.id)}"]`);
  if (pad.type === 'combo') {
    if (_comboState[pad.id]) {
      _comboStop(pad.id);
    } else {
      if (!pad.steps?.length) { showToast('No steps configured — edit combo steps first.'); return; }
      _comboStart(pad);
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (pad.type === 'playlist') {
    if (!pad.files?.length) return;
    if (audioIsPlaying(pad.id)) {
      delete _plState[pad.id]; // reset position before audioStop so audio:ended won't auto-advance
      audioStop(pad.id, { fade: pad.fadeOut || 0 });
      if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
      el?.classList.remove('is-playing');
    } else {
      if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
      const hash = _plCurrentHash(pad);
      if (!hash) return;
      audioPlay(pad.id, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      _onFgStart(pad.id);
      el?.classList.add('is-playing');
      _resetAutoStop();
    }
    return;
  }
  if (!pad.hash) return;
  if (audioIsPlaying(pad.id)) {
    audioStop(pad.id, { fade: pad.fadeOut || 0 });
    if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
    else _playOrderRemove(pad.id);
    el?.classList.remove('is-playing');
  } else {
    audioPlay(pad.id, pad.hash, {
      type:    pad.type || 'single',
      volume:  pad.volume  ?? 80,
      fadeIn:  pad.fadeIn  || 0,
      fadeOut: pad.fadeOut || 0,
    });
    if ((pad.type || 'single') !== 'loop') _onFgStart(pad.id);
    else _playOrderAdd(pad.id);
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

/* ── SWITCH SOUND ───────────────────────────────────────────── */

async function uploadSwitchSound() {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'audio/*';
  inp.onchange = async () => {
    const file = inp.files[0]; if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('File too large (max 2 MB)'); return; }
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = '';
    const chunk = 65536;
    for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
    localStorage.setItem('sos-switch-sound-b64', btoa(bin));
    localStorage.setItem('sos-switch-sound-name', file.name);
    await loadSwitchSound();
    _renderSwitchSoundRow();
    showToast('Switch sound loaded');
  };
  inp.click();
}

function deleteSwitchSound() {
  localStorage.removeItem('sos-switch-sound-b64');
  localStorage.removeItem('sos-switch-sound-name');
  clearSwitchSoundBuf();
  _renderSwitchSoundRow();
}

function _renderSwitchSoundRow() {
  const nameEl   = document.getElementById('sett-sw-snd-name');
  const clearBtn = document.getElementById('sett-sw-snd-clear');
  if (!nameEl) return;
  const name = localStorage.getItem('sos-switch-sound-name') || '';
  nameEl.textContent = name || 'none';
  nameEl.style.color = name ? 'var(--text)' : 'var(--text-mute)';
  if (clearBtn) clearBtn.style.display = name ? '' : 'none';
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

/* ── QUICK RENAME (SETUP mode long-press) ───────────────────── */

function openQuickRename(slot, isSet) {
  closeQuickRename(false);
  const pad = isSet ? _bdSet?.pads.find(p => p.slot === slot)
                    : _bdScene?.pads.find(p => p.slot === slot);
  if (!pad) return;
  _qrSlot  = slot;
  _qrIsSet = isSet;
  _qrOpen  = true;

  const el = document.createElement('div');
  el.id        = 'qr-overlay';
  el.className = 'qr-overlay';
  el.innerHTML = `
    <div class="qr-box">
      <div class="qr-title">RENAME PAD</div>
      <input class="qr-input" id="qr-input" type="text" value="${escAttr(pad.name || '')}" maxlength="40" autocomplete="off" spellcheck="false">
      <div class="qr-hint">Enter = save · Esc = cancel</div>
    </div>
  `;
  document.body.appendChild(el);

  const input = document.getElementById('qr-input');
  if (input) {
    input.focus();
    input.select();
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); closeQuickRename(true); }
      if (e.key === 'Escape') { closeQuickRename(false); }
    });
  }
  el.addEventListener('pointerdown', e => {
    if (!e.target.closest('.qr-box')) closeQuickRename(false);
  });
}

async function closeQuickRename(save = true) {
  if (!_qrOpen) return;
  const input = document.getElementById('qr-input');
  const name  = save && input ? input.value.trim() : null;
  document.getElementById('qr-overlay')?.remove();
  _qrOpen = false;

  if (!name) { _qrSlot = null; _qrIsSet = false; return; }
  const slot  = _qrSlot;
  const isSet = _qrIsSet;
  _qrSlot  = null;
  _qrIsSet = false;

  if (!isSet && _bdScene) {
    _bdScene.pads = _bdScene.pads.map(p => p.slot === slot ? { ...p, name } : p);
    await scenePut(_bdScene); renderPadGrid();
  } else if (isSet && _bdSet) {
    _bdSet.pads = _bdSet.pads.map(p => p.slot === slot ? { ...p, name } : p);
    await setPut(_bdSet); renderSetStrip();
  }
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

/**
 * Convert a V1 combo step to V1.5 chip format.
 * @param {object} step  V1 step: {pads:[padIdx,...], chipOpts:[{vol,fade}|null,...], dur, fadeOutAll}
 * @param {Array}  v1pads  V1 board.pads sparse array
 * @param {Object} hashToName  hash → display name
 * @returns {{chips:Array, dur:number, action:string|null}}
 */
function _convertV1Step(step, v1pads, hashToName) {
  const chips = [];
  const rawPads = step.pads || [];
  const chipOpts = step.chipOpts || [];
  for (let i = 0; i < rawPads.length; i++) {
    const v1p = v1pads[rawPads[i]];
    if (!v1p) continue;
    const hash = (v1p.files || [])[0] || null;
    if (!hash) continue;
    const opt    = chipOpts[i] || {};
    const isLoop = v1p.mode === 'loop' && (!v1p.loopCount || v1p.loopCount === 0);
    chips.push({
      name:   v1p.name || hashToName[hash] || '',
      hash,
      vol:    opt.vol  != null ? opt.vol   : (v1p.volume  ?? 80),
      fadeIn: opt.fade != null ? opt.fade  : (v1p.fadeIn  || 0),
      loop:   isLoop,
    });
  }
  return { chips, dur: step.dur || 0, action: step.fadeOutAll ? 'fade-all' : null };
}

/**
 * Convert a full V1 backup object to V1.5 import format.
 * V1 boards have a flat pads[] array; V1.5 wraps each board in one default scene.
 * Icons are dropped (incompatible icon sets).
 * @param {object} v1data
 * @returns {object}  V1.5-shaped import object
 */
function _convertV1ToV15(v1data) {
  const hashToName = {};
  for (const e of v1data.library || []) {
    if (e.hash && e.name) hashToName[e.hash] = e.name;
  }

  const v15boards = [], v15scenes = [];

  for (const v1b of v1data.boards || []) {
    const boardId = 'b_v1_' + v1b.id;
    const sceneId = 's_v1_' + v1b.id;
    const v1pads  = v1b.pads || [];

    const pads15 = [];
    for (let slot = 0; slot < v1pads.length; slot++) {
      const v1p = v1pads[slot];
      if (!v1p) continue;

      const type = v1p.mode === 'once'  ? 'single'
                 : v1p.mode === 'loop'  ? 'loop'
                 : v1p.mode === 'list'  ? 'playlist'
                 : v1p.mode === 'combo' ? 'combo'
                 : 'single';

      const firstHash = (v1p.files || [])[0] || null;
      const pad = {
        id:      'p_v1_' + v1b.id + '_' + slot,
        slot,
        name:    v1p.name    || '',
        hotkey:  v1p.key     || '',
        type,
        volume:  v1p.volume  ?? 80,
        fadeIn:  v1p.fadeIn  || 0,
        fadeOut: v1p.fadeOut || 0,
      };

      // icon: V1 uses a different icon set — drop silently
      if (type === 'combo') {
        pad.steps = (v1p.steps || []).map(s => _convertV1Step(s, v1pads, hashToName));
        pad.hash  = firstHash;
      } else if (type === 'playlist') {
        pad.files   = (v1p.files || []).map(h => ({ hash: h, name: hashToName[h] || h }));
        pad.hash    = firstHash;
        if (v1p.shuffle) pad.shuffle = true;
      } else {
        pad.hash = firstHash;
      }
      pads15.push(pad);
    }

    v15boards.push({
      id: boardId, name: v1b.name, _app: 'v1_5',
      scenes: [{ id: sceneId, name: 'Scene 1' }],
      sets: [], activeSceneId: sceneId, gridCols: 4,
      created: v1b.createdAt || Date.now(), updated: Date.now(),
    });
    v15scenes.push({
      id: sceneId, boardId, name: 'Scene 1',
      pads: pads15, gridCols: 4, created: Date.now(),
    });
  }

  // Only import audio-type library entries (skip V1 pad templates + SVG icons)
  const v15lib = (v1data.library || []).filter(e => !e.type || e.type === 'audio');

  return { sos: 'v1_5', version: 'v1-migrated', boards: v15boards, scenes: v15scenes, sets: [], library: v15lib, _v1migrated: true };
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

  // Detect V1 backup: numeric version, no sos field, has boards + library arrays
  if (!data.sos && typeof data.version !== 'undefined' && Array.isArray(data.boards) && Array.isArray(data.library)) {
    showToast('V1 backup detected — converting…');
    data = _convertV1ToV15(data);
  }

  if (data.sos !== 'v1_5' || !Array.isArray(data.boards) || !Array.isArray(data.library)) {
    showToast('Not a recognized backup file.'); return;
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
  const v1Banner = _importData?._v1migrated
    ? `<div class="imp-section" style="margin-bottom:12px"><div class="imp-section-title" style="color:var(--active)">V1 MIGRATION</div>${
        row('imp-new', 'V1 backup detected and converted automatically')
      }${row('imp-skip', '· Icons not migrated (incompatible icon set)')}</div>`
    : '';
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
        ${v1Banner}<div class="imp-section"><div class="imp-section-title">AUDIO</div>${audioSection}</div>
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

/* ── ICON PICKER ─────────────────────────────────────────────── */

function _ipCategories() {
  if (typeof PAD_ICONS === 'undefined') return [];
  return ['all', ...new Set(PAD_ICONS.map(i => i.cat))];
}

function _ipFilteredIcons() {
  if (typeof PAD_ICONS === 'undefined') return [];
  const q = _ipSearch.toLowerCase();
  return PAD_ICONS.filter(i =>
    (_ipCat === 'all' || i.cat === _ipCat) &&
    (!q || i.label.toLowerCase().includes(q) || i.id.toLowerCase().includes(q))
  );
}

function _ipRenderGrid() {
  const el = document.getElementById('ip-grid');
  if (!el) return;
  const icons = _ipFilteredIcons();
  if (!icons.length) { el.innerHTML = '<p class="ip-empty">No icons found.</p>'; return; }
  el.innerHTML = icons.map(i =>
    `<div class="ip-cell" data-action="ip-select" data-icon-id="${escAttr(i.id)}" title="${escAttr(i.label)}">
      ${padIconSvg(i.id, 24, 'var(--text-dim)')}
    </div>`
  ).join('');
}

function openIconPicker(ctx) {
  if (_ipOpen) return;
  _ipOpen   = true;
  _ipCtx    = ctx;
  _ipSearch = '';
  _ipCat    = 'all';
  const cats = _ipCategories();
  document.body.insertAdjacentHTML('beforeend', `<div class="ip-overlay" id="icon-picker">
    <div class="ip-top">
      <button class="ip-back" data-action="ip-back">← BACK</button>
      <input class="ip-search" id="ip-search" type="text" placeholder="Search icons…" autocomplete="off">
      <select class="ip-cat-select" id="ip-cat">
        ${cats.map(c => `<option value="${escAttr(c)}">${c === 'all' ? 'All categories' : escHtml(c)}</option>`).join('')}
      </select>
    </div>
    <div class="ip-grid" id="ip-grid"></div>
  </div>`);
  _ipRenderGrid();
  document.getElementById('ip-search')?.addEventListener('input', e => {
    _ipSearch = e.target.value;
    _ipRenderGrid();
  });
  document.getElementById('ip-cat')?.addEventListener('change', e => {
    _ipCat = e.target.value;
    _ipRenderGrid();
  });
}

function closeIconPicker() {
  _ipOpen = false;
  _ipCtx  = null;
  document.getElementById('icon-picker')?.remove();
}

function handleIconSelect(iconId) {
  _editingIconId = iconId;
  if (_ipCtx === 'pad-opts') {
    const preview = document.getElementById('pad-icon-preview');
    if (preview && typeof padIconSvg === 'function') preview.innerHTML = padIconSvg(iconId, 24, 'var(--gold)');
    closeIconPicker();
  } else if (_ipCtx === 'pad-editor') {
    const slot0 = document.getElementById('pe-icon-slot-0');
    if (slot0 && typeof padIconSvg === 'function') {
      slot0.classList.add('has-icon');
      slot0.innerHTML = padIconSvg(iconId, 20, 'var(--pad-loop)');
    }
    if (!document.getElementById('pe-icon-clear-btn')) {
      document.querySelector('[data-action="pe-icon-change"].sb-btn')
        ?.insertAdjacentHTML('afterend', `<button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%;margin-top:4px" id="pe-icon-clear-btn" data-action="pe-icon-clear">✕ REMOVE ICON</button>`);
    }
    closeIconPicker();
  } else if (_ipCtx === 'library') {
    closeIconPicker();
  }
}

/* ── COMBO EDITOR ────────────────────────────────────────────── */

/**
 * @param {string} padId
 * @param {boolean} isSet
 */
function openComboEditor(padId, isSet) {
  if (_ceOpen) return;
  _ceOpen  = true;
  _cePadId = padId;
  _ceIsSet = isSet;
  // _ceSteps was already initialized in openPadOpts / openSetPadOpts
  // Save a deep copy for BACK (discard)
  _ceSavedSteps = _ceSteps.map(s => ({ chips: (s.chips || []).map(c => ({ ...c })), dur: s.dur || 0, action: s.action || null }));
  _renderComboEditor();
}

function closeComboEditor() {
  _ceOpen       = false;
  _cePadId      = null;
  _ceSavedSteps = null;
  document.getElementById('combo-editor')?.remove();
}

function handleCeBack() {
  // Restore _ceSteps to the saved copy (discard edits)
  if (_ceSavedSteps) _ceSteps = _ceSavedSteps;
  _ceSavedSteps = null;
  closeComboEditor();
  // Update step-info span in pad opts if open
  _ceUpdateStepInfo();
}

function handleCeSave() {
  // Read pause-duration values from DOM before closing
  document.querySelectorAll('.ce-dur-input').forEach(input => {
    const si = +input.dataset.step;
    if (_ceSteps[si]) _ceSteps[si].dur = Math.max(0, +input.value || 0);
  });
  _ceSavedSteps = null;
  closeComboEditor();
  _ceUpdateStepInfo();
}

function _ceUpdateStepInfo() {
  const el = document.getElementById('combo-step-info');
  if (!el) return;
  const n = _ceSteps.length;
  const c = _ceSteps.reduce((acc, s) => acc + (s.chips || []).length, 0);
  el.textContent = `${n} step${n !== 1 ? 's' : ''}, ${c} chip${c !== 1 ? 's' : ''}`;
}

function _renderComboEditor() {
  document.getElementById('combo-editor')?.remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="combo-editor" id="combo-editor">
    <div class="ce-top-bar">
      <button class="ip-back" data-action="ce-back">← BACK</button>
      <span class="ce-title">COMBO STEPS</span>
      <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="ce-save">SAVE</button>
    </div>
    <div class="ce-body" id="ce-body">
      ${_ceSteps.map((step, si) => _ceStepHTML(step, si)).join('')}
      ${!_ceSteps.length ? '<p class="lib-empty" style="margin:24px auto">No steps yet. Tap + ADD STEP below.</p>' : ''}
    </div>
    <div class="ce-footer">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%" data-action="ce-add-step">+ ADD STEP</button>
    </div>
  </div>`);
}

/** @param {{chips:Array, dur:number, action:string|null}} step @param {number} si @returns {string} */
function _ceStepHTML(step, si) {
  const actions = [
    { val: null,         label: 'NONE'     },
    { val: 'stop-all',  label: 'STOP ALL' },
    { val: 'fade-all',  label: 'FADE ALL' },
  ];
  const actionBtns = actions.map(a =>
    `<button class="pad-type-btn${(step.action === a.val || (!step.action && a.val === null)) ? ' is-active' : ''}" data-action="ce-step-action" data-step="${si}" data-act="${a.val === null ? '' : a.val}">${a.label}</button>`
  ).join('');

  const chipsHTML = (step.chips || []).map((chip, ci) => `
    <div class="ce-chip">
      <span class="ce-chip-name">${escHtml(chip.name || '—')}</span>
      <span class="ce-chip-vol">${chip.vol ?? 80}%</span>
      <button class="pad-type-btn ce-loop-btn${chip.loop ? ' is-active' : ''}" data-action="ce-chip-loop" data-step="${si}" data-chip="${ci}" title="Loop (background)">↻</button>
      <button class="act-btn" data-action="ce-chip-remove" data-step="${si}" data-chip="${ci}">×</button>
    </div>`).join('');

  return `<div class="ce-step" data-step="${si}">
    <div class="ce-step-header">
      <span class="ce-step-num">STEP ${si + 1}</span>
      <div class="ce-step-acts">
        <div class="pad-type-picker ce-action-picker">${actionBtns}</div>
        <button class="act-btn danger" data-action="ce-delete-step" data-step="${si}">×</button>
      </div>
    </div>
    <div class="ce-chips" id="ce-chips-${si}">
      ${chipsHTML}
    </div>
    <div class="ce-step-footer">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="ce-add-chip" data-step="${si}">+ ADD CHIP</button>
      <div class="ce-dur-row">
        <span class="pad-opts-label" style="font-size:12px">PAUSE</span>
        <input class="audio-name-input ce-dur-input" type="number" min="0" max="60" step="0.5"
               value="${step.dur || 0}" style="width:52px;text-align:right" data-step="${si}">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-mute)">s</span>
      </div>
    </div>
  </div>`;
}

function handleCeAddStep() {
  _ceSteps.push({ chips: [], dur: 0, action: null });
  _renderComboEditor();
}

/** @param {number} si */
function handleCeDeleteStep(si) {
  _ceSteps.splice(si, 1);
  _renderComboEditor();
}

/**
 * @param {number} si
 * @param {number} ci
 */
function handleCeChipRemove(si, ci) {
  if (_ceSteps[si]) _ceSteps[si].chips.splice(ci, 1);
  // Re-render just the chips container
  const el = document.getElementById(`ce-chips-${si}`);
  if (el) {
    const chipsHTML = (_ceSteps[si]?.chips || []).map((chip, ci2) => `
      <div class="ce-chip">
        <span class="ce-chip-name">${escHtml(chip.name || '—')}</span>
        <span class="ce-chip-vol">${chip.vol ?? 80}%</span>
        <button class="pad-type-btn ce-loop-btn${chip.loop ? ' is-active' : ''}" data-action="ce-chip-loop" data-step="${si}" data-chip="${ci2}" title="Loop">↻</button>
        <button class="act-btn" data-action="ce-chip-remove" data-step="${si}" data-chip="${ci2}">×</button>
      </div>`).join('');
    el.innerHTML = chipsHTML;
  }
}

/**
 * @param {number} si
 * @param {number} ci
 */
function handleCeChipLoop(si, ci) {
  const chip = _ceSteps[si]?.chips[ci];
  if (!chip) return;
  chip.loop = !chip.loop;
  const btn = document.querySelector(`[data-action="ce-chip-loop"][data-step="${si}"][data-chip="${ci}"]`);
  if (btn) btn.classList.toggle('is-active', !!chip.loop);
}

/**
 * @param {number} si
 * @param {string|null} act
 */
function handleCeStepAction(si, act) {
  if (!_ceSteps[si]) return;
  _ceSteps[si].action = act || null;
  // Update button states in that step's action picker
  document.querySelectorAll(`[data-action="ce-step-action"][data-step="${si}"]`).forEach(btn => {
    const btnAct = btn.dataset.act || null;
    btn.classList.toggle('is-active', btnAct === (act || null));
  });
}

/** @param {number} si */
function openCeChipPicker(si) {
  if (_ceCpOpen) return;
  _ceCpOpen    = true;
  _ceCpStepIdx = si;
  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  document.body.insertAdjacentHTML('beforeend', `<div class="combo-editor" id="ce-chip-picker">
    <div class="ce-top-bar">
      <button class="ip-back" data-action="ce-cp-back">← BACK</button>
      <span class="ce-title">ADD CHIP — STEP ${si + 1}</span>
    </div>
    <div class="pad-picker-list" id="ce-cp-list" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="ce-cp-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);
}

function closeCeChipPicker() {
  _ceCpOpen    = false;
  _ceCpStepIdx = null;
  document.getElementById('ce-chip-picker')?.remove();
}

/**
 * @param {string} hash
 * @param {string} name
 */
function handleCeCpPick(hash, name) {
  const si = _ceCpStepIdx;
  closeCeChipPicker();
  if (si === null || !_ceSteps[si]) return;
  _ceSteps[si].chips.push({ name, hash, vol: 80, fadeIn: 0, loop: false });
  // Re-render just this step's chip list
  const el = document.getElementById(`ce-chips-${si}`);
  if (el) {
    el.innerHTML = _ceSteps[si].chips.map((chip, ci) => `
      <div class="ce-chip">
        <span class="ce-chip-name">${escHtml(chip.name || '—')}</span>
        <span class="ce-chip-vol">${chip.vol ?? 80}%</span>
        <button class="pad-type-btn ce-loop-btn${chip.loop ? ' is-active' : ''}" data-action="ce-chip-loop" data-step="${si}" data-chip="${ci}" title="Loop">↻</button>
        <button class="act-btn" data-action="ce-chip-remove" data-step="${si}" data-chip="${ci}">×</button>
      </div>`).join('');
  }
}

/* ── PAD EDITOR ──────────────────────────────────────────────── */

/**
 * @param {number} slot  pad slot index
 * @param {boolean} isSet  true = set pad, false = scene pad
 */
function openPadEditor(slot, isSet) {
  closePadPicker();
  closePadOpts();
  closePadEditor();
  const pads = isSet ? _bdSet?.pads : _bdScene?.pads;
  const pad  = pads?.find(p => p.slot === slot);
  if (!pad) { isSet ? openSetPadPicker(slot) : openPadPicker(slot); return; }
  _peOpen    = true;
  _pePadSlot = slot;
  _peIsSet   = isSet;
  _peEditPad = { ...pad };
  _peLibEntry = _libEntries.find(e => e.hash === pad.hash) || null;
  _editingPlaylistFiles = (pad.files || []).map(f => ({ ...f }));
  _editingIconId = pad.iconId || null;
  _ceSteps = (pad.steps || []).map(s => ({
    chips: (s.chips || []).map(c => ({ ...c })),
    dur: s.dur || 0,
    action: s.action || null,
  }));
  document.body.insertAdjacentHTML('beforeend', _renderPadEditor());
  document.getElementById('pe-name-input')?.focus();
}

function closePadEditor() {
  if (_peCaptureKey) {
    document.removeEventListener('keydown', _peHandleKeyCapture);
    _peCaptureKey = false;
  }
  closePeAudioPicker();
  closePeTrackPicker();
  _peOpen        = false;
  _pePadSlot     = null;
  _peEditPad     = null;
  _peLibEntry    = null;
  _peDeleteCfm   = false;
  document.getElementById('pad-editor')?.remove();
}

/** @returns {string} */
function _renderPadEditor() {
  const pad  = _peEditPad;
  const t    = pad.type || 'single';
  const vol  = pad.volume ?? 80;
  const fi   = pad.fadeIn  || 0;
  const fo   = pad.fadeOut || 0;
  const name = pad.name || '—';
  const key  = pad.hotkey || '';
  const slot = _pePadSlot;
  const entry = _peLibEntry;
  const typeColor = t === 'loop' ? 'var(--pad-loop)' : t === 'playlist' ? 'var(--pad-playlist)' : t === 'combo' ? 'var(--pad-combo)' : 'var(--pad-single)';
  const typeLbl   = t === 'single' ? 'SOLO' : t === 'loop' ? 'LOOP' : t === 'playlist' ? 'LIST' : 'COMBO';

  return `<div class="pe-overlay" id="pad-editor">

  <div class="pe-topbar">
    <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-cancel" style="gap:6px">← BACK</button>
    <div class="pe-topbar-title">PAD EDITOR · ${escHtml(_bdBoard?.name || '')}</div>
    <div class="pe-topbar-badge"><div class="pe-mode-badge">SETUP</div></div>
  </div>

  <div class="pe-toolbar">
    <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-cancel">← CANCEL</button>
    <div class="pe-toolbar-sep"></div>
    <div class="pe-mini-pad">
      <div style="position:absolute;top:0;bottom:0;left:0;width:3px;background:${typeColor}"></div>
      ${_editingIconId && typeof padIconSvg === 'function' ? `<div style="padding:2px">${padIconSvg(_editingIconId, 22, typeColor)}</div>` : `<div style="font-family:var(--font-ui);font-size:9px;color:${typeColor};margin-top:2px">${typeLbl}</div>`}
      <div style="font-family:var(--font-ui);font-size:9px;color:${typeColor};letter-spacing:.04em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:56px;width:100%;text-align:center">${escHtml(pad.name || '—')}</div>
    </div>
    <div class="pe-name-strip">
      <div class="pe-name-meta">EDITING ${_peIsSet ? 'SET' : 'SCENE'}-PAD · POSITION ${slot + 1}</div>
      <div class="pe-name-row">
        <span id="pe-toolbar-name" style="font-family:var(--font-ui);font-size:17px;color:var(--text);letter-spacing:.04em">${escHtml(name)}</span>
        ${key ? `<span style="font-family:var(--font-mono);font-size:11px;padding:1px 5px;background:var(--sunk);border:1px solid var(--border-soft);color:var(--text-dim)">${escHtml(key)}</span>` : ''}
        <span style="font-family:var(--font-mono);font-size:11px;padding:1px 5px;background:var(--sunk);border:1px solid var(--border-soft);color:${typeColor}">${typeLbl}</span>
        ${entry ? `<span style="font-family:var(--font-mono);font-size:11px;color:var(--text-mute)">· ${fmtDur(entry.duration)} · ${fmtSize(entry.size)}</span>` : ''}
      </div>
    </div>
    <div class="pe-toolbar-actions">
      <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-preview" id="pe-preview-btn">▶ PREVIEW</button>
      <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-save-template" title="Save as template">◈ TEMPLATE</button>
      <button class="sb-btn sb-btn-sm sb-btn-filled" data-action="pe-save">✦ SAVE</button>
    </div>
    <div class="pe-toolbar-sep"></div>
    <button class="sb-btn sb-btn-sm sb-btn-danger${_peDeleteCfm ? ' is-confirm' : ''}" id="pe-delete-btn" data-action="pe-delete">${_peDeleteCfm ? 'CONFIRM' : '⚠ DELETE'}</button>
  </div>

  <div class="pe-body">

    <aside class="pe-left">
      <div class="pe-phdr active">▸ IDENTITY</div>
      <div class="pe-sec">
        <div class="pe-field">
          <div class="pe-field-lbl">
            <span class="pe-lbl">NAME</span>
            <span class="pe-hint">shown on pad · searchable</span>
          </div>
          <input class="audio-name-input" id="pe-name-input" type="text" value="${escAttr(name)}"
            oninput="document.getElementById('pe-toolbar-name').textContent=this.value||'—'" style="font-size:14px">
        </div>
        <div class="pe-field">
          <div class="pe-field-lbl">
            <span class="pe-lbl">HOTKEY</span>
            <span class="pe-hint">supports numpad</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="pe-keycap-wrap">
              <div class="pe-keycap-shd"></div>
              <div class="pe-keycap${key ? ' is-active' : ''}" id="pe-keycap" data-hotkey="${escAttr(key)}">${escHtml(key || '—')}</div>
            </div>
            <button class="sb-btn sb-btn-sm sb-btn-ghost" id="pe-capture-btn" data-action="pe-key-capture" style="padding:3px 8px">CAPTURE</button>
            <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-key-clear" style="padding:3px 8px">CLEAR</button>
          </div>
        </div>
      </div>

      <div class="pe-phdr">▸ BEHAVIOR</div>
      <div class="pe-sec">
        <div class="pe-field">
          <span class="pe-lbl" style="margin-bottom:6px">MODE</span>
          <div class="pe-modes" id="pe-modes">${_peModeCardsHTML(t)}</div>
          <div id="pe-mode-hint" style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-top:8px">${_peModeHint(t)}</div>
        </div>
        <div id="pe-shuffle-row" style="margin-top:8px;${t === 'playlist' ? '' : 'display:none'}">
          <span class="pe-lbl" style="display:block;margin-bottom:6px">SHUFFLE</span>
          <div class="pad-type-picker">
            <button class="pad-type-btn${pad.shuffle ? ' is-active' : ''}" data-action="pe-shuffle" data-shuffle="1">ON</button>
            <button class="pad-type-btn${!pad.shuffle ? ' is-active' : ''}" data-action="pe-shuffle" data-shuffle="0">OFF</button>
          </div>
        </div>
      </div>

      <div class="pe-phdr">▸ VISUAL</div>
      <div class="pe-sec">
        <div class="pe-icon-slots" id="pe-icon-slots">
          <div class="pe-icon-slot${_editingIconId ? ' has-icon' : ''}" id="pe-icon-slot-0" data-action="pe-icon-change" title="Change icon">
            ${_editingIconId && typeof padIconSvg === 'function' ? padIconSvg(_editingIconId, 20, 'var(--pad-loop)') : '<span style="font-size:13px">+</span>'}
          </div>
          <div class="pe-icon-slot" style="opacity:.3;cursor:default"></div>
          <div class="pe-icon-slot" style="opacity:.3;cursor:default"></div>
          <div class="pe-icon-slot" style="opacity:.3;cursor:default"></div>
        </div>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%" data-action="pe-icon-change">BROWSE ICON LIBRARY</button>
        ${_editingIconId ? `<button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%;margin-top:4px" id="pe-icon-clear-btn" data-action="pe-icon-clear">✕ REMOVE ICON</button>` : ''}
      </div>
    </aside>

    <main class="pe-center" id="pe-center">
      ${_peCenterHTML(pad, entry)}
    </main>

    <aside class="pe-right">
      <div class="pe-phdr active">▸ AUDIO</div>
      <div class="pe-insp-sec">
        <div class="pe-param">
          <div class="pe-param-row">
            <span class="pe-lbl">VOLUME</span>
            <span class="pe-lbl" id="pe-vol-val" style="color:var(--text);font-family:var(--font-mono)">${vol}</span>
          </div>
          <input class="pe-range" type="range" id="pe-volume" min="0" max="100" step="1" value="${vol}"
            oninput="document.getElementById('pe-vol-val').textContent=this.value">
        </div>
      </div>
      <div class="pe-phdr">▸ FADE</div>
      <div class="pe-insp-sec">
        <div class="pe-param">
          <div class="pe-param-row">
            <span class="pe-lbl">FADE IN</span>
            <span class="pe-lbl" id="pe-fi-val" style="color:var(--text);font-family:var(--font-mono)">${_peFadeLbl(fi)}</span>
          </div>
          <input class="pe-range" type="range" id="pe-fade-in" min="0" max="30" step="0.5" value="${fi}"
            oninput="document.getElementById('pe-fi-val').textContent=_peFadeLbl(+this.value);_peUpdateWave()">
        </div>
        <div class="pe-param">
          <div class="pe-param-row">
            <span class="pe-lbl">FADE OUT</span>
            <span class="pe-lbl" id="pe-fo-val" style="color:var(--text);font-family:var(--font-mono)">${_peFadeLbl(fo)}</span>
          </div>
          <input class="pe-range" type="range" id="pe-fade-out" min="0" max="30" step="0.5" value="${fo}"
            oninput="document.getElementById('pe-fo-val').textContent=_peFadeLbl(+this.value);_peUpdateWave()">
        </div>
      </div>
    </aside>

  </div>

  <div class="pe-status">
    <span class="pe-status-sep" style="color:var(--mode-setup)">EDIT · ${t.toUpperCase()} PAD</span>
    <span class="pe-status-sep">${escHtml(_bdBoard?.name || '')} · position ${slot + 1}</span>
    <span style="margin-left:auto;display:flex;gap:14px">
      <span>ESC cancel</span>
      <span>Ctrl+S save</span>
    </span>
  </div>
</div>`;
}

/** @param {string} t  pad type */
function _peModeCardsHTML(t) {
  return [
    { id: 'single',   lbl: 'SOLO',  sub: 'once',      color: 'var(--pad-single)',   icon: '▶' },
    { id: 'loop',     lbl: 'LOOP',  sub: '∞',          color: 'var(--pad-loop)',     icon: '↻' },
    { id: 'playlist', lbl: 'LIST',  sub: 'N tracks',   color: 'var(--pad-playlist)', icon: '☰' },
    { id: 'combo',    lbl: 'COMBO', sub: 'sequence',   color: 'var(--pad-combo)',    icon: '◆' },
  ].map(m => `<div class="pe-mode-card${t === m.id ? ' is-active' : ''}" data-action="pe-type" data-type="${m.id}">
    <div class="pe-mode-card-icon" style="color:${m.color}">${m.icon}</div>
    <div class="pe-mode-card-name" style="${t === m.id ? `color:${m.color}` : ''}">${m.lbl}</div>
    <div class="pe-mode-card-sub">${m.sub}</div>
  </div>`).join('');
}

/** @param {string} t */
function _peModeHint(t) {
  return t === 'single'   ? '// Plays once · stops on its own.'
       : t === 'loop'     ? '// Loops continuously until stopped.'
       : t === 'playlist' ? '// Plays tracks in order. Shuffle optional.'
                          : '// Executes steps in sequence.';
}

/** @param {number} s  seconds */
function _peFadeLbl(s) {
  if (!s) return 'off';
  return s < 1 ? `${Math.round(s * 10) / 10}s` : `${+s.toFixed(1)}s`;
}

/**
 * @param {object} pad
 * @param {object|null} entry
 * @returns {string}
 */
function _peCenterHTML(pad, entry) {
  const t       = pad.type || 'single';
  const isList  = t === 'playlist';
  const isCombo = t === 'combo';

  const secHdr = label => `<div class="pe-sec-hdr">
    <span style="font-family:var(--font-ui);font-size:11px;letter-spacing:.18em">${label}</span>
    <div class="pe-sec-hdr-line"></div>
  </div>`;

  const typeColor = t === 'loop' ? 'var(--pad-loop)' : t === 'playlist' ? 'var(--pad-playlist)' : t === 'combo' ? 'var(--pad-combo)' : 'var(--pad-single)';

  const fileChip = entry
    ? `<div class="pe-file-chip" id="pe-file-chip" style="border-left-color:${typeColor}">
        <div class="pe-file-info">
          <div class="pe-file-name">${escHtml(entry.name)}</div>
          <div class="pe-file-meta">${fmtDur(entry.duration)} · ${fmtSize(entry.size)}</div>
        </div>
        <div class="pe-file-acts">
          <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-audio-from-lib">FROM LIB</button>
          <button class="sb-btn sb-btn-sm sb-btn-danger" style="padding:3px 10px" data-action="pe-audio-unlink">UNLINK</button>
        </div>
      </div>`
    : `<div class="pe-file-chip no-file" id="pe-file-chip">
        <div class="pe-file-info">
          <div class="pe-file-name" style="color:var(--text-mute)">no audio linked</div>
        </div>
        <div class="pe-file-acts">
          <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="pe-audio-from-lib">FROM LIB</button>
        </div>
      </div>`;

  if (isCombo) {
    const nSteps = _ceSteps.length;
    const nChips = _ceSteps.reduce((n, s) => n + (s.chips || []).length, 0);
    return `${secHdr('COMBO SEQUENCE')}
      <div class="pe-combo-area">
        <div class="pe-combo-info" id="combo-step-info">${nSteps} step${nSteps !== 1 ? 's' : ''}, ${nChips} chip${nChips !== 1 ? 's' : ''}</div>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" style="width:100%" data-action="bd-opts-combo-edit">EDIT COMBO STEPS ▸</button>
      </div>`;
  }

  if (isList) {
    return `${secHdr('PLAYLIST TRACKS')}
      <div id="pl-tracks">${_renderPlaylistTracksHTML()}</div>
      <button class="sb-btn sb-btn-sm sb-btn-ghost" style="margin-top:6px" data-action="bd-opts-pl-add">+ ADD TRACK</button>`;
  }

  // SOLO / LOOP
  const statsHTML = entry ? `<div class="pe-stats">
    <div><div class="pe-stat-lbl">DURATION</div><div class="pe-stat-val">${fmtDur(entry.duration)}</div></div>
    <div><div class="pe-stat-lbl">FILE SIZE</div><div class="pe-stat-val">${fmtSize(entry.size)}</div></div>
    <div><div class="pe-stat-lbl">PEAK</div><div class="pe-stat-val">—</div></div>
    <div><div class="pe-stat-lbl">RMS</div><div class="pe-stat-val">—</div></div>
  </div>` : '';

  return `${secHdr('SOUND')}
    ${fileChip}
    <div class="pe-wave-wrap" id="pe-wave-wrap">${_peWaveHTML(entry, pad.fadeIn || 0, pad.fadeOut || 0)}</div>
    ${statsHTML}`;
}

/**
 * @param {object|null} entry
 * @param {number} fi  fadeIn seconds
 * @param {number} fo  fadeOut seconds
 * @returns {string}
 */
function _peWaveHTML(entry, fi, fo) {
  const peaks = entry?.peaks;
  if (!peaks?.length) return `<div class="pe-wave-empty">— no audio —</div>`;
  const dur  = entry?.duration || 0;
  const N    = peaks.length;
  const fiBars = dur > 0 ? Math.round(N * Math.min(fi, dur) / dur) : 0;
  const foBars = dur > 0 ? Math.round(N * Math.min(fo, dur) / dur) : 0;
  const bars = peaks.map((v, i) => {
    const h   = Math.max(4, Math.round(v * 100));
    const cls = i < fiBars ? ' fi' : i >= N - foBars ? ' fo' : '';
    return `<div class="pe-wave-bar${cls}" style="height:${h}%"></div>`;
  }).join('');
  return `<div class="pe-wave-bars">${bars}</div>`;
}

function _peUpdateWave() {
  const wrap = document.getElementById('pe-wave-wrap');
  if (!wrap) return;
  const fi = +(document.getElementById('pe-fade-in')?.value || 0);
  const fo = +(document.getElementById('pe-fade-out')?.value || 0);
  wrap.innerHTML = _peWaveHTML(_peLibEntry, fi, fo);
}

function handlePeCancel() {
  if (_peEditPad) audioStop(_peEditPad.id, { fade: 0 });
  closePadEditor();
}

async function handlePeSave() {
  if (!_peEditPad) return;
  const name    = (document.getElementById('pe-name-input')?.value || '').trim();
  const keycap  = document.getElementById('pe-keycap');
  const hotkey  = keycap?.dataset.hotkey || '';
  const type    = document.querySelector('.pe-mode-card.is-active')?.dataset.type || _peEditPad.type || 'single';
  const volume  = Math.max(0, Math.min(100, +(document.getElementById('pe-volume')?.value ?? 80)));
  const fadeIn  = Math.max(0, +(document.getElementById('pe-fade-in')?.value || 0));
  const fadeOut = Math.max(0, +(document.getElementById('pe-fade-out')?.value || 0));
  const isList  = type === 'playlist';
  const shuffle = isList ? document.querySelector('[data-action="pe-shuffle"].is-active')?.dataset.shuffle === '1' : undefined;
  const files   = isList ? _editingPlaylistFiles.map(f => ({ hash: f.hash, name: f.name })) : undefined;

  function _applyPad(p) {
    const base = { ...p, name, hotkey, type, volume, fadeIn, fadeOut };
    if (_editingIconId) base.iconId = _editingIconId; else delete base.iconId;
    if (type === 'combo') {
      base.steps = _ceSteps.map(s => ({ chips: (s.chips || []).map(c => ({ ...c })), dur: s.dur || 0, action: s.action || null }));
      delete base.files; delete base.shuffle;
      return base;
    }
    if (!isList) { delete base.files; delete base.shuffle; return base; }
    base.files   = files;
    base.shuffle = shuffle;
    base.hash    = files?.length ? files[0].hash : (p.hash || null);
    return base;
  }

  const slot  = _pePadSlot;
  const isSet = _peIsSet;
  closePadEditor();
  if (!isSet && _bdScene) {
    _bdScene.pads = _bdScene.pads.map(p => p.slot === slot ? _applyPad(p) : p);
    await scenePut(_bdScene); renderPadGrid();
  } else if (isSet && _bdSet) {
    _bdSet.pads = _bdSet.pads.map(p => p.slot === slot ? _applyPad(p) : p);
    await setPut(_bdSet); renderSetStrip();
  }
}

function handlePeDelete() {
  if (!_peDeleteCfm) {
    _peDeleteCfm = true;
    const btn = document.getElementById('pe-delete-btn');
    if (btn) btn.textContent = 'CONFIRM';
    setTimeout(() => {
      _peDeleteCfm = false;
      const b = document.getElementById('pe-delete-btn');
      if (b) b.textContent = '⚠ DELETE';
    }, 3000);
    return;
  }
  _peClearPad();
}

async function _peClearPad() {
  const slot  = _pePadSlot;
  const isSet = _peIsSet;
  if (_peEditPad) audioStop(_peEditPad.id, { fade: 0 });
  closePadEditor();
  if (!isSet && _bdScene) {
    _bdScene.pads = _bdScene.pads.filter(p => p.slot !== slot);
    await scenePut(_bdScene); renderPadGrid();
  } else if (isSet && _bdSet) {
    _bdSet.pads = _bdSet.pads.filter(p => p.slot !== slot);
    await setPut(_bdSet); renderSetStrip();
  }
}

function handlePeSaveTemplate() {
  const pad = _peEditPad;
  if (!pad) return;
  const name = document.getElementById('pe-name')?.value?.trim() || pad.name || 'Unnamed';
  const tmpl = {
    id: 'pt_' + Math.random().toString(36).slice(2, 10),
    name,
    type:    document.querySelector('[data-action="pe-type"].is-active')?.dataset.type || pad.type || 'single',
    hotkey:  document.getElementById('pe-hotkey-input')?.value || pad.hotkey || '',
    volume:  +(document.getElementById('pe-volume')?.value  ?? pad.volume  ?? 80),
    fadeIn:  +(document.getElementById('pe-fade-in')?.value  || pad.fadeIn  || 0),
    fadeOut: +(document.getElementById('pe-fade-out')?.value || pad.fadeOut || 0),
    hash:    pad.hash   || null,
    files:   pad.files  || [],
    steps:   pad.steps  || [],
    iconId:  _editingIconId  || null,
    shuffle: pad.shuffle || false,
    saved:   Date.now(),
  };
  addPadTemplate(tmpl);
  showToast(`Template saved: "${name}"`);
}

function handlePePreview() {
  const pad = _peEditPad;
  if (!pad) return;
  const btn = document.getElementById('pe-preview-btn');
  if (audioIsPlaying(pad.id)) {
    audioStop(pad.id, { fade: +(document.getElementById('pe-fade-out')?.value || 0) });
    if (btn) btn.textContent = '▶ PREVIEW';
  } else if (pad.hash) {
    const vol = +(document.getElementById('pe-volume')?.value ?? 80);
    const fi  = +(document.getElementById('pe-fade-in')?.value  || 0);
    const fo  = +(document.getElementById('pe-fade-out')?.value || 0);
    audioPlay(pad.id, pad.hash, { type: pad.type || 'single', volume: vol, fadeIn: fi, fadeOut: fo });
    if (btn) btn.textContent = '■ STOP';
  }
}

function handlePeStartCapture() {
  if (_peCaptureKey) return;
  _peCaptureKey = true;
  const keycap = document.getElementById('pe-keycap');
  const btn    = document.getElementById('pe-capture-btn');
  if (keycap) { keycap.classList.add('capturing'); keycap.textContent = '...'; }
  if (btn)    btn.textContent = 'CAPTURING';
  document.addEventListener('keydown', _peHandleKeyCapture, { once: true });
}

function _peHandleKeyCapture(e) {
  _peCaptureKey = false;
  const keycap = document.getElementById('pe-keycap');
  const btn    = document.getElementById('pe-capture-btn');
  if (keycap) keycap.classList.remove('capturing');
  if (btn)    btn.textContent = 'CAPTURE';
  if (e.key === 'Escape') {
    const prev = _peEditPad?.hotkey || '';
    if (keycap) {
      keycap.classList.toggle('is-active', !!prev);
      keycap.dataset.hotkey = prev;
      keycap.textContent    = prev || '—';
    }
    return;
  }
  e.preventDefault();
  const key = e.code || e.key;
  if (keycap) {
    keycap.dataset.hotkey = key;
    keycap.classList.add('is-active');
    keycap.textContent = key;
  }
}

function handlePeKeyClear() {
  const keycap = document.getElementById('pe-keycap');
  if (keycap) {
    keycap.classList.remove('is-active');
    keycap.dataset.hotkey = '';
    keycap.textContent    = '—';
  }
}

function handlePeTypeChange(type) {
  if (!_peEditPad) return;
  _peEditPad.type = type;
  // Update mode cards
  document.querySelectorAll('.pe-mode-card').forEach(c =>
    c.classList.toggle('is-active', c.dataset.type === type));
  const typeColor = type === 'loop' ? 'var(--pad-loop)' : type === 'playlist' ? 'var(--pad-playlist)' : type === 'combo' ? 'var(--pad-combo)' : 'var(--pad-single)';
  document.querySelectorAll('.pe-mode-card.is-active .pe-mode-card-name').forEach(el => el.style.color = typeColor);
  const hint = document.getElementById('pe-mode-hint');
  if (hint) hint.textContent = _peModeHint(type);
  // Show/hide shuffle row
  const shuffleRow = document.getElementById('pe-shuffle-row');
  if (shuffleRow) shuffleRow.style.display = type === 'playlist' ? '' : 'none';
  // Re-render center panel
  const center = document.getElementById('pe-center');
  if (center) center.innerHTML = _peCenterHTML(_peEditPad, _peLibEntry);
  // Update toolbar type badge
  const typeLbl = type === 'single' ? 'SOLO' : type === 'loop' ? 'LOOP' : type === 'playlist' ? 'LIST' : 'COMBO';
  document.querySelector('.pe-name-row .pe-mode-badge-inline, .pe-name-row [data-typelbl]')?.remove();
}

// Audio picker sub-overlay (FROM LIB)
function openPeAudioPicker() {
  if (_pePickerOpen) return;
  _pePickerOpen = true;
  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  document.body.insertAdjacentHTML('beforeend', `<div class="combo-editor" id="pe-audio-picker">
    <div class="ce-top-bar">
      <button class="ip-back" data-action="pe-ap-back">← BACK</button>
      <span class="ce-title">SELECT AUDIO</span>
    </div>
    <div class="pad-picker-list" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="pe-ap-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);
}

function closePeAudioPicker() {
  _pePickerOpen = false;
  document.getElementById('pe-audio-picker')?.remove();
}

function handlePeAudioPick(hash, name) {
  closePeAudioPicker();
  if (!_peEditPad) return;
  _peEditPad.hash = hash;
  _peLibEntry = _libEntries.find(e => e.hash === hash) || null;
  const center = document.getElementById('pe-center');
  if (center) center.innerHTML = _peCenterHTML(_peEditPad, _peLibEntry);
  // Update toolbar meta
  const entry = _peLibEntry;
  const metaEl = document.querySelector('#pad-editor .pe-name-row span:last-child');
  // Re-render toolbar name row is complex; just update wave
  _peUpdateWave();
}

function handlePeAudioUnlink() {
  if (!_peEditPad) return;
  _peEditPad.hash = null;
  _peLibEntry = null;
  const center = document.getElementById('pe-center');
  if (center) center.innerHTML = _peCenterHTML(_peEditPad, null);
}

// Playlist track picker sub-overlay
function openPeTrackPicker() {
  if (_peTrackPickerOpen) return;
  _peTrackPickerOpen = true;
  const sorted = _libEntries.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  document.body.insertAdjacentHTML('beforeend', `<div class="combo-editor" id="pe-track-picker">
    <div class="ce-top-bar">
      <button class="ip-back" data-action="pe-tp-back">← BACK</button>
      <span class="ce-title">ADD TRACK</span>
    </div>
    <div class="pad-picker-list" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch">
      ${sorted.map(e => `<div class="pad-picker-item" data-action="pe-tp-pick" data-hash="${e.hash}" data-name="${escAttr(e.name)}">
        <div class="pad-picker-wave">${_waveMini(e.peaks)}</div>
        <span class="pad-picker-item-name">${escHtml(e.name)}</span>
        <span class="pad-picker-item-dur">${fmtDur(e.duration)}</span>
      </div>`).join('')}
      ${!sorted.length ? '<p class="lib-empty">No audio in library yet.</p>' : ''}
    </div>
  </div>`);
}

function closePeTrackPicker() {
  _peTrackPickerOpen = false;
  document.getElementById('pe-track-picker')?.remove();
}

function handlePeTrackPick(hash, name) {
  closePeTrackPicker();
  _editingPlaylistFiles.push({ hash, name });
  _renderPlaylistTracks();
}

/* ── SCREEN: SETTINGS ───────────────────────────────────────── */

/** @returns {string} */
function settingsHTML() {
  const theme        = S.theme || '';
  const defVol       = localStorage.getItem('sos-def-volume')    ?? '80';
  const defFadeIn    = localStorage.getItem('sos-def-fadein')    ?? '0';
  const duckEnabled  = localStorage.getItem('sos-duck-enabled')  === '1';
  const duckAmount   = localStorage.getItem('sos-duck-amount')   ?? '30';
  const defFadeOut  = localStorage.getItem('sos-def-fadeout')   ?? '0';
  const startMode   = localStorage.getItem('sos-start-mode')    || 'setup';
  const wakeLock    = localStorage.getItem('sos-wake-lock')     === '1';
  const autoStop    = localStorage.getItem('sos-auto-stop')     === '1';
  const autoStopMin = localStorage.getItem('sos-auto-stop-min') || '30';
  const masterVol     = localStorage.getItem('sos-master-vol')       ?? '100';
  const enterStopMode = localStorage.getItem('sos-enter-stop-mode')  || 'total';
  const lpAction      = localStorage.getItem('sos-lp-action')        || 'vol';
  const swSndName     = localStorage.getItem('sos-switch-sound-name') || '';
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
      <div class="sett-title">${pi('audio', 12, 'var(--gold)')} DUCKING</div>
      <div class="sett-row">
        <label class="sett-label">Duck loops when playing</label>
        <div class="sett-btn-group">
          ${seg('sett-duck-toggle','val','1','ON',   duckEnabled)}
          ${seg('sett-duck-toggle','val','0','OFF', !duckEnabled)}
        </div>
      </div>
      <div class="sett-row" id="sett-duck-amount-row" style="${duckEnabled ? '' : 'opacity:0.4;pointer-events:none'}">
        <label class="sett-label">Duck to</label>
        <input type="range" id="sett-duck-amount" class="sett-vol-slider"
               min="0" max="100" value="${escAttr(duckAmount)}" style="flex:1;min-width:60px">
        <span class="sett-unit" id="sett-duck-amount-val" style="min-width:32px;text-align:right">${duckAmount}%</span>
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
      <div class="sett-title">${pi('keyboard', 12, 'var(--gold)')} CONTROLS</div>
      <div class="sett-row">
        <label class="sett-label">Enter key stops</label>
        <div class="sett-btn-group">
          ${seg('sett-enter-stop','mode','total', 'TOTAL',  enterStopMode==='total')}
          ${seg('sett-enter-stop','mode','serial','SERIAL', enterStopMode==='serial')}
        </div>
      </div>
      <div class="sett-hint" style="font-family:var(--font-mono);font-size:10px;color:var(--text-mute);padding:2px 0 4px">
        TOTAL = stop all &nbsp;|&nbsp; SERIAL = stop last started (LIFO)
      </div>
      <div class="sett-row">
        <label class="sett-label">Long-press (GAME)</label>
        <div class="sett-btn-group">
          ${seg('sett-lp-action','act','vol', 'VOL', lpAction==='vol')}
          ${seg('sett-lp-action','act','cue', 'CUE', lpAction==='cue')}
          ${seg('sett-lp-action','act','off', 'OFF', lpAction==='off')}
        </div>
      </div>
      <div class="sett-hint" style="font-family:var(--font-mono);font-size:10px;color:var(--text-mute);padding:2px 0 4px">
        VOL = quick volume &nbsp;|&nbsp; CUE = add to queue (TAB fires next)
      </div>
      <div class="sett-row">
        <label class="sett-label">Switch sound</label>
        <span id="sett-sw-snd-name" class="sett-unit" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:${swSndName ? 'var(--text)' : 'var(--text-mute)'}">${swSndName ? escHtml(swSndName) : 'none'}</span>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" data-action="sett-sw-snd-upload" style="flex-shrink:0">UPLOAD</button>
        <button class="sb-btn sb-btn-sm sb-btn-ghost" id="sett-sw-snd-clear" data-action="sett-sw-snd-clear" style="flex-shrink:0;${swSndName ? '' : 'display:none'}">×</button>
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
  const duckSlider = document.getElementById('sett-duck-amount');
  const duckValEl  = document.getElementById('sett-duck-amount-val');
  if (duckSlider) {
    duckSlider.oninput = () => {
      const v = +duckSlider.value;
      if (duckValEl) duckValEl.textContent = v + '%';
      localStorage.setItem('sos-duck-amount', String(v));
      if (_duckEnabled() && _fgPlayIds.size > 0) audioDuck(v / 100, 0.1);
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
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    if (_peOpen) { e.preventDefault(); handlePeSave(); return; }
  }
  if (e.key === 'Escape') {
    if (_qrOpen)               { closeQuickRename(false); return; }
    if (_peTrackPickerOpen)    { closePeTrackPicker(); return; }
    if (_pePickerOpen)         { closePeAudioPicker(); return; }
    if (_ceCpOpen)             { closeCeChipPicker(); return; }
    if (_ceOpen)               { handleCeBack(); return; }
    if (_peOpen)               { handlePeCancel(); return; }
    if (_assigningTemplate)    { _cancelAssignTemplate(); return; }
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
        if (pad.type === 'combo') {
          if (_comboState[pad.id]) {
            _comboStop(pad.id);
          } else if (pad.steps?.length) {
            _comboStart(pad);
            padEl?.classList.add('is-playing');
          }
        } else if (pad.type === 'playlist') {
          if (!pad.files?.length) return;
          if (audioIsPlaying(pad.id)) {
            delete _plState[pad.id];
            audioStop(pad.id, { fade: pad.fadeOut || 0 });
            if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
            padEl?.classList.remove('is-playing');
          } else {
            if (!_plState[pad.id]) _plState[pad.id] = _plInit(pad);
            const hash = _plCurrentHash(pad);
            if (hash) {
              audioPlay(pad.id, hash, { type: 'single', volume: pad.volume ?? 80, fadeIn: pad.fadeIn || 0 });
              _onFgStart(pad.id);
              padEl?.classList.add('is-playing');
            }
          }
        } else if (pad.hash) {
          if (audioIsPlaying(pad.id)) {
            audioStop(pad.id, { fade: pad.fadeOut || 0 });
            if (_fgPlayIds.has(pad.id)) _onFgEnd(pad.id);
            else _playOrderRemove(pad.id);
            padEl?.classList.remove('is-playing');
          } else {
            audioPlay(pad.id, pad.hash, {
              type: pad.type || 'single', volume: pad.volume ?? 80,
              fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
            });
            if ((pad.type || 'single') !== 'loop') _onFgStart(pad.id);
            else _playOrderAdd(pad.id);
            padEl?.classList.add('is-playing');
          }
        }
      }
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      _handleEnterStop();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      _cueFire();
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

/* ── LONG-PRESS: GAME MODE (quick volume / cue) ─────────────── */

document.addEventListener('pointerdown', e => {
  if (S.screen !== 'board' || S.boardMode !== 'game') return;
  const targetEl = e.target.closest('[data-pad-id][data-pad-slot]')
                || e.target.closest('[data-pad-id][data-set-pad-slot]');
  if (!targetEl) return;
  const padId   = targetEl.dataset.padId;
  const lpAction = localStorage.getItem('sos-lp-action') || 'vol';
  if (lpAction === 'off') return;
  if (lpAction === 'vol' && !audioIsPlaying(padId)) return;

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
    if (!pad) return;
    if (lpAction === 'cue') {
      _cueAdd(pad.id, slot, isSet);
    } else {
      openPadVolSlider(pad, targetEl);
    }
  }, 500);
});

document.addEventListener('pointerup',     () => { if (_lpTimer) { clearTimeout(_lpTimer); _lpTimer = null; } });
document.addEventListener('pointercancel', () => { if (_lpTimer) { clearTimeout(_lpTimer); _lpTimer = null; } });
document.addEventListener('pointermove', e => {
  if (!_lpTimer) return;
  const dx = e.clientX - _lpStartX, dy = e.clientY - _lpStartY;
  if (dx * dx + dy * dy > 64) { clearTimeout(_lpTimer); _lpTimer = null; }
});

/* ── LONG-PRESS: QUICK RENAME (SETUP mode) ──────────────────── */

document.addEventListener('pointerdown', e => {
  if (S.screen !== 'board' || S.boardMode !== 'setup') return;
  if (_bdOptsSlot !== null || _bdPickerSlot !== null || _peOpen) return;
  const targetEl = e.target.closest('.pad.is-assigned[data-pad-slot]')
                || e.target.closest('.set-pad.is-assigned[data-set-pad-slot]');
  if (!targetEl) return;

  _qrStartX = e.clientX;
  _qrStartY = e.clientY;
  _qrFired  = false;
  const slot  = targetEl.dataset.padSlot  !== undefined ? +targetEl.dataset.padSlot  : +targetEl.dataset.setPadSlot;
  const isSet = targetEl.dataset.setPadSlot !== undefined;

  _qrTimer = setTimeout(() => {
    _qrTimer = null;
    _qrFired = true;
    openQuickRename(slot, isSet);
  }, 500);
});

document.addEventListener('pointerup',     () => { if (_qrTimer) { clearTimeout(_qrTimer); _qrTimer = null; } });
document.addEventListener('pointercancel', () => { if (_qrTimer) { clearTimeout(_qrTimer); _qrTimer = null; } });
document.addEventListener('pointermove', e => {
  if (!_qrTimer) return;
  const dx = e.clientX - _qrStartX, dy = e.clientY - _qrStartY;
  if (dx * dx + dy * dy > 64) { clearTimeout(_qrTimer); _qrTimer = null; }
});

document.addEventListener('click', e => {
  // close import modal on backdrop click
  if (_importModalOpen && !e.target.closest('#import-modal')) { closeImportModal(); return; }

  // Full-screen overlays: handle their actions, skip all outside-click-close logic
  if (_ipOpen || _ceOpen || _ceCpOpen || _peOpen || _pePickerOpen || _peTrackPickerOpen) {
    const actEl = e.target.closest('[data-action]');
    if (actEl) handleAction(actEl.dataset.action, actEl);
    return;
  }

  // close changelog on backdrop click
  if (_clOpen && !e.target.closest('#cl-modal')) { closeChangelog(); return; }

  // suppress the click that immediately follows a long-press
  if (_lpFired) { _lpFired = false; return; }
  if (_qrFired) { _qrFired = false; return; }

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
    case 'lib-pt-assign':     handleLibPtAssign(el.dataset.ptId); break;
    case 'lib-pt-delete':     handleLibPtDelete(el.dataset.ptId); break;
    case 'pt-assign-cancel':  _cancelAssignTemplate(); break;

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
    case 'bd-stop-all':       audioStopAll(0); _onFgStopAll(); document.querySelectorAll('.pad.is-playing, .set-pad.is-playing').forEach(e => e.classList.remove('is-playing')); break;
    case 'bd-rename-board':   handleBdRenameBoard(); break;

    // pad picker
    case 'bd-picker-close':   closePadPicker(); break;
    case 'bd-picker-pick':    handlePadPick(el.dataset.hash, el.dataset.name); break;

    // pad opts
    case 'bd-opts-save':      handlePadOptsSave(); break;
    case 'bd-opts-clear':     handlePadOptsClear(); break;
    case 'bd-opts-change':    handlePadOptsChange(); break;
    case 'bd-opts-type': {
      const type    = el.dataset.type;
      document.querySelectorAll('.pad-type-btn[data-type]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.type === type));
      const isList  = type === 'playlist';
      const isCombo = type === 'combo';
      const plSec   = document.getElementById('pl-section');
      if (plSec) plSec.style.display = isList ? '' : 'none';
      const comboSec = document.getElementById('combo-section');
      if (comboSec) comboSec.style.display = isCombo ? '' : 'none';
      const chBtn   = document.getElementById('pad-opts-change-btn');
      if (chBtn) chBtn.style.display = (isList || isCombo) ? 'none' : '';
      if (isCombo && !_ceSteps.length) _ceSteps = [];
      break;
    }
    case 'bd-opts-shuffle':
      document.querySelectorAll('[data-action="bd-opts-shuffle"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.shuffle === el.dataset.shuffle));
      break;
    case 'bd-opts-pl-add':   _peOpen ? openPeTrackPicker() : openPlaylistTrackPicker(); break;
    case 'bd-opts-pl-remove': {
      const idx = +el.dataset.idx;
      _editingPlaylistFiles.splice(idx, 1);
      _renderPlaylistTracks();
      break;
    }
    case 'bd-opts-icon-pick': openIconPicker(_peOpen ? 'pad-editor' : 'pad-opts'); break;
    case 'bd-opts-icon-clear': {
      _editingIconId = null;
      const preview = document.getElementById('pad-icon-preview');
      if (preview) preview.innerHTML = '<span style="font-family:var(--font-mono);font-size:11px;color:var(--text-mute)">none</span>';
      el.remove();
      break;
    }
    case 'ip-back':    closeIconPicker(); break;
    case 'ip-select':  handleIconSelect(el.dataset.iconId); break;

    // pad editor
    case 'pe-cancel':        handlePeCancel(); break;
    case 'pe-save':          handlePeSave(); break;
    case 'pe-delete':        handlePeDelete(); break;
    case 'pe-preview':       handlePePreview(); break;
    case 'pe-save-template': handlePeSaveTemplate(); break;
    case 'pe-key-capture':   handlePeStartCapture(); break;
    case 'pe-key-clear':     handlePeKeyClear(); break;
    case 'pe-type':          handlePeTypeChange(el.dataset.type); break;
    case 'pe-shuffle':
      document.querySelectorAll('[data-action="pe-shuffle"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.shuffle === el.dataset.shuffle));
      break;
    case 'pe-icon-change':   openIconPicker('pad-editor'); break;
    case 'pe-icon-clear': {
      _editingIconId = null;
      const slot0 = document.getElementById('pe-icon-slot-0');
      if (slot0) { slot0.classList.remove('has-icon'); slot0.innerHTML = '<span style="font-size:13px">+</span>'; }
      document.getElementById('pe-icon-clear-btn')?.remove();
      break;
    }
    case 'pe-audio-from-lib': openPeAudioPicker(); break;
    case 'pe-audio-unlink':   handlePeAudioUnlink(); break;
    case 'pe-ap-back':        closePeAudioPicker(); break;
    case 'pe-ap-pick':        handlePeAudioPick(el.dataset.hash, el.dataset.name); break;
    case 'pe-tp-back':        closePeTrackPicker(); break;
    case 'pe-tp-pick':        handlePeTrackPick(el.dataset.hash, el.dataset.name); break;

    // combo editor
    case 'bd-opts-combo-edit': {
      let padId, isSet;
      if (_peOpen && _peEditPad) {
        padId = _peEditPad.id;
        isSet = _peIsSet;
      } else {
        const slot = _bdOptsSlot !== null ? _bdOptsSlot : _bdSetOptsSlot;
        isSet = _bdSetOptsSlot !== null;
        const pad  = isSet ? _bdSet?.pads.find(p => p.slot === slot) : _bdScene?.pads.find(p => p.slot === slot);
        padId = pad?.id;
      }
      if (padId) openComboEditor(padId, isSet);
      break;
    }
    case 'ce-back':          handleCeBack(); break;
    case 'ce-save':          handleCeSave(); break;
    case 'ce-add-step':      handleCeAddStep(); break;
    case 'ce-delete-step':   handleCeDeleteStep(+el.dataset.step); break;
    case 'ce-add-chip':      openCeChipPicker(+el.dataset.step); break;
    case 'ce-chip-remove':   handleCeChipRemove(+el.dataset.step, +el.dataset.chip); break;
    case 'ce-chip-loop':     handleCeChipLoop(+el.dataset.step, +el.dataset.chip); break;
    case 'ce-step-action':   handleCeStepAction(+el.dataset.step, el.dataset.act || null); break;
    case 'ce-cp-back':       closeCeChipPicker(); break;
    case 'ce-cp-pick':       handleCeCpPick(el.dataset.hash, el.dataset.name); break;

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

    case 'sett-duck-toggle': {
      const on = el.dataset.val === '1';
      localStorage.setItem('sos-duck-enabled', on ? '1' : '0');
      document.querySelectorAll('[data-action="sett-duck-toggle"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.val === el.dataset.val));
      const row = document.getElementById('sett-duck-amount-row');
      if (row) { row.style.opacity = on ? '' : '0.4'; row.style.pointerEvents = on ? '' : 'none'; }
      if (!on) audioUnduck(0.3); // restore immediately if disabled while ducked
      break;
    }

    case 'cue-fire':   _cueFire(); break;
    case 'cue-clear':  _cueClear(); break;
    case 'cue-remove': {
      const idx = _cueStack.findIndex(e => e.padId === el.dataset.padId);
      if (idx !== -1) { _cueStack.splice(idx, 1); renderCueStrip(); }
      break;
    }

    case 'sett-enter-stop':
      localStorage.setItem('sos-enter-stop-mode', el.dataset.mode);
      document.querySelectorAll('[data-action="sett-enter-stop"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.mode === el.dataset.mode));
      break;
    case 'sett-lp-action':
      localStorage.setItem('sos-lp-action', el.dataset.act);
      document.querySelectorAll('[data-action="sett-lp-action"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.act === el.dataset.act));
      break;
    case 'sett-sw-snd-upload': uploadSwitchSound(); break;
    case 'sett-sw-snd-clear':  deleteSwitchSound(); break;

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

// When audio ends naturally: handle combo fg chips, advance playlist, or remove is-playing
document.addEventListener('audio:ended', e => {
  const padId = e.detail.padId;

  // Combo sub-pad: id contains ':'
  if (padId.includes(':')) {
    if (padId.includes(':bg:')) return; // bg/loop chips won't end naturally; ignore if they do
    // Foreground chip ended — extract parent combo padId
    const comboPadId = padId.slice(0, padId.indexOf(':'));
    const state = _comboState[comboPadId];
    if (!state || state.stopped) return;
    state.fgIds.delete(padId);
    state.fgRem = Math.max(0, state.fgRem - 1);
    if (state.fgRem === 0) {
      const pad = _findPadById(comboPadId);
      if (!pad) { _comboFinish(comboPadId); return; }
      const step = (pad.steps || [])[state.stepIdx];
      const dur  = (step?.dur || 0) * 1000;
      if (dur > 0) {
        state.pauseTimer = setTimeout(() => {
          state.pauseTimer = null;
          if (!state.stopped) _comboPlayStep(pad, state, state.stepIdx + 1);
        }, dur);
      } else {
        _comboPlayStep(pad, state, state.stepIdx + 1);
      }
    }
    return;
  }

  // Regular pad: playlist advance or remove is-playing
  const pad = _findPadById(padId);
  if (pad?.type === 'playlist' && pad.files?.length && _plState[padId]) {
    _plAdvance(padId, pad.files.length);
    const hash = _plCurrentHash(pad);
    if (hash) {
      audioPlay(padId, hash, {
        type: 'single', volume: pad.volume ?? 80,
        fadeIn: pad.fadeIn || 0, fadeOut: pad.fadeOut || 0,
      });
      // _fgPlayIds already contains padId from the previous track; keep it
      return; // keep is-playing class
    }
  }
  if (_fgPlayIds.has(padId)) _onFgEnd(padId);
  const el = document.querySelector(`[data-pad-id="${CSS.escape(padId)}"]`);
  el?.classList.remove('is-playing');
});
