'use strict';

const APP_VERSION = '1.5.0';

/* ── STATE ──────────────────────────────────────────────────── */

/** @typedef {'intro'|'menu'|'board'|'library'|'settings'|'tips'|'about'} ScreenId */

/** @type {{screen: ScreenId, theme: string}} */
const S = {
  screen: 'intro',
  theme: localStorage.getItem('sos-theme') || '',
};

const set = {
  /** @param {ScreenId} v */
  screen(v) { S.screen = v; bus.emit('screen', v); },
  /** @param {string} v */
  theme(v)  { S.theme = v; localStorage.setItem('sos-theme', v); bus.emit('theme', v); },
};

/* ── PUB/SUB ────────────────────────────────────────────────── */

const bus = (() => {
  /** @type {Record<string, Function[]>} */
  const L = {};
  return {
    /** @param {string} e @param {Function} fn */
    on(e, fn)  { (L[e] = L[e] || []).push(fn); },
    /** @param {string} e @param {*} d */
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

/* ── NAVIGATION ─────────────────────────────────────────────── */

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
 * @param {{icon:string, label:string, sub:string, target:ScreenId, active:boolean}} opts
 * @returns {string}
 */
function menuRow({ icon, label, sub, target, active }) {
  return `<div class="mopt${active ? ' mp' : ''}" data-target="${target}">
    <div class="mico">${pi(icon, 22, 'currentColor')}</div>
    <div class="mopt-text">
      <div class="mlbl">${label}</div>
      <div class="msub">${sub}</div>
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
      <div class="ver-label">
        <span>v ${APP_VERSION}</span>
        ${pi('info', 11)}
      </div>
    </div>
    <div class="mopts">
      ${menuRow({ icon: 'rune',     label: 'BOARD',          sub: 'No board yet',                    target: 'board',    active: false })}
      ${menuRow({ icon: 'scroll',   label: 'LIBRARY',        sub: 'Audio, icons &amp; boards',       target: 'library',  active: false })}
      ${menuRow({ icon: 'cog',      label: 'SETTINGS',       sub: 'Theme, font size &amp; start mode', target: 'settings', active: false })}
      ${menuRow({ icon: 'keyboard', label: 'TIPS &amp; TRICKS', sub: 'Controls and key bindings',   target: 'tips',     active: false })}
      ${menuRow({ icon: 'info',     label: 'ABOUT',          sub: 'What this is and how it works',   target: 'about',    active: false })}
    </div>
    <div class="m-bkp-row">
      <button class="m-bkp-btn" data-action="backup">
        ${pi('save', 14, 'currentColor')}
        BACKUP
        <span class="m-bkp-age">· never</span>
      </button>
      <button class="m-bkp-btn import" data-action="import">
        ${pi('download', 14, 'currentColor')}
        IMPORT
      </button>
    </div>
  </div>`;
}

function mountMenu() {
  new AnimatedFlame(document.getElementById('flame-smm'), {
    size: 84, interactive: true,
  });
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
  intro:    introHTML,
  menu:     menuHTML,
  board:    () => stubHTML('BOARD'),
  library:  () => stubHTML('LIBRARY'),
  settings: () => stubHTML('SETTINGS'),
  tips:     () => stubHTML('TIPS & TRICKS'),
  about:    () => stubHTML('ABOUT'),
};

/** @type {Partial<Record<ScreenId, () => void>>} */
const SCREEN_MOUNTS = {
  intro: mountIntro,
  menu:  mountMenu,
};

/* ── RENDER ─────────────────────────────────────────────────── */

/** @param {ScreenId} screenId */
function renderScreen(screenId) {
  const app = document.getElementById('app');
  const renderer = SCREENS[screenId];
  if (!renderer) return;
  app.innerHTML = `<div class="screen screen-${screenId}">${renderer()}</div>`;
  const mount = SCREEN_MOUNTS[screenId];
  if (mount) mount();
}

bus.on('screen', renderScreen);

/* ── EVENT DELEGATION ───────────────────────────────────────── */

document.addEventListener('click', e => {
  const navEl = e.target.closest('[data-target]');
  if (navEl) { navigate(navEl.dataset.target); return; }
  const actEl = e.target.closest('[data-action]');
  if (actEl)  handleAction(actEl.dataset.action);
});

/** @param {string} action */
function handleAction(action) {
  if (action === 'backup') alert('Backup — coming in Slice 7');
  if (action === 'import') alert('Import — coming in Slice 7');
}

/* ── INIT ───────────────────────────────────────────────────── */

function init() {
  applyTheme(S.theme);
  renderScreen(S.screen);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

document.addEventListener('DOMContentLoaded', init);
