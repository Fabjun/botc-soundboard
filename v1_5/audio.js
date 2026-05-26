'use strict';
// Audio engine — V1.5. Ported from V1.
// Depends on: libGet(hash) from app.js (must be loaded after audio.js).

let ctx        = null;
let masterGain = null;
let _ctxInitDone = false;

const LRU_BUF_MAX_BYTES = 150 * 1024 * 1024;
const libBufs = {};
const _libBufLru = [];
let _libBufBytes = 0;
const _libBufLoading = {};

const srcs      = {};  // padId → AudioBufferSourceNode
const gains     = {};  // padId → GainNode (per-pad volume)
const duckGains = {};  // padId → GainNode (duck gain, loop pads only)
const _loopPadIds = new Set();
let _duckTarget = 1.0; // current duck level applied to new loop pads

function _bufDecodedBytes(buf) {
  return buf ? buf.length * buf.numberOfChannels * 4 : 0;
}

function _lruBufSet(hash) {
  const i = _libBufLru.indexOf(hash);
  if (i !== -1) {
    _libBufLru.splice(i, 1);
    _libBufLru.push(hash);
    return;
  }
  _libBufLru.push(hash);
  _libBufBytes += _bufDecodedBytes(libBufs[hash]);
  while (_libBufBytes > LRU_BUF_MAX_BYTES && _libBufLru.length > 1) {
    const evict = _libBufLru.shift();
    _libBufBytes -= _bufDecodedBytes(libBufs[evict]);
    delete libBufs[evict];
  }
}

function _initCtx() {
  if (_ctxInitDone) return;
  _ctxInitDone = true;
  // Bypass iOS silent/ringer switch: playing a tiny silent WAV via HTMLAudioElement
  // routes future Web Audio output through the media channel, not the ringer channel.
  const sil = Object.assign(document.createElement('audio'), {
    src: 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA',
  });
  sil.setAttribute('playsinline', '');
  sil.play().catch(() => {});
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = ctx.createGain();
  masterGain.gain.value = Math.max(0, Math.min(1, +(localStorage.getItem('sos-master-vol') ?? 100) / 100));
  masterGain.connect(ctx.destination);
  loadSwitchSound();
}

/** @param {number} v 0–100 */
function setMasterVolume(v) {
  const clamped = Math.max(0, Math.min(100, v));
  localStorage.setItem('sos-master-vol', String(clamped));
  if (masterGain) masterGain.gain.value = clamped / 100;
}

/** @returns {number} 0–100 */
function getMasterVolume() {
  return +(localStorage.getItem('sos-master-vol') ?? 100);
}

async function _ensureLibBuf(hash) {
  if (libBufs[hash]) return;
  if (!_libBufLoading[hash]) {
    _libBufLoading[hash] = libGet(hash).then(entry => {
      if (!entry?.buf) throw new Error('Audio not in library: ' + hash.slice(0, 8));
      if (!ctx) throw new Error('AudioContext not ready');
      return ctx.decodeAudioData(entry.buf); // detaches entry.buf, freeing the compressed copy
    }).then(buf => {
      libBufs[hash] = buf;
      _lruBufSet(hash);
    }).finally(() => { delete _libBufLoading[hash]; });
  }
  await _libBufLoading[hash];
}

/**
 * @param {GainNode} g
 * @param {number} targetVol  0–1
 * @param {number} fadeIn     seconds
 */
function fadeInGain(g, targetVol, fadeIn) {
  if (fadeIn > 0) {
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + fadeIn);
  } else {
    g.gain.setValueAtTime(targetVol, ctx.currentTime);
  }
}

/**
 * @param {string} padId
 * @param {string} hash
 * @param {{ type?: 'single'|'loop', volume?: number, fadeIn?: number, fadeOut?: number }} opts
 */
async function audioPlay(padId, hash, opts = {}) {
  const { type = 'single', volume = 80, fadeIn = 0, fadeOut = 0 } = opts;

  if (type === 'loop' && srcs[padId]) {
    audioStop(padId, { fade: fadeOut });
    return;
  }

  _initCtx();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  try {
    await _ensureLibBuf(hash);
  } catch (e) {
    console.error('audioPlay: buffer load failed:', e);
    return;
  }

  const buf = libBufs[hash];
  if (!buf) return;

  audioStop(padId, { immediate: true });

  const vol = Math.max(0, Math.min(1, volume / 100));
  const g = ctx.createGain();
  fadeInGain(g, vol, fadeIn);
  gains[padId] = g;

  if (type === 'loop') {
    const dg = ctx.createGain();
    dg.gain.setValueAtTime(_duckTarget, ctx.currentTime);
    dg.connect(masterGain || ctx.destination);
    duckGains[padId] = dg;
    _loopPadIds.add(padId);
    g.connect(dg);
  } else {
    g.connect(masterGain || ctx.destination);
  }

  const s = ctx.createBufferSource();
  s.buffer = buf;
  s.loop = (type === 'loop');
  s.connect(g);
  s.start(0);
  srcs[padId] = s;

  s.onended = () => {
    s.buffer = null;
    if (srcs[padId] === s) {
      delete srcs[padId];
      delete gains[padId];
      document.dispatchEvent(new CustomEvent('audio:ended', { detail: { padId } }));
    }
  };
}

/**
 * @param {string} padId
 * @param {{ fade?: number, immediate?: boolean }} [opts]
 */
function audioStop(padId, opts = {}) {
  const s = srcs[padId];
  const g = gains[padId];
  if (!s) return;

  const fade = opts.immediate ? 0 : (opts.fade || 0);

  _loopPadIds.delete(padId);
  delete duckGains[padId];

  if (fade > 0 && g) {
    g.gain.cancelScheduledValues(ctx.currentTime);
    g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + fade);
    try { s.onended = null; s.stop(ctx.currentTime + fade); } catch (_) {}
    const id = padId;
    setTimeout(() => {
      delete srcs[id];
      delete gains[id];
      document.dispatchEvent(new CustomEvent('audio:ended', { detail: { padId: id } }));
    }, fade * 1000 + 100);
  } else {
    try { s.onended = null; s.stop(); } catch (_) {}
    s.buffer = null;
    delete srcs[padId];
    delete gains[padId];
    document.dispatchEvent(new CustomEvent('audio:ended', { detail: { padId } }));
  }
}

/** @param {number} [fade] seconds */
function audioStopAll(fade = 0) {
  Object.keys(srcs).forEach(id => audioStop(id, { fade }));
}

/** @param {string} padId @returns {boolean} */
function audioIsPlaying(padId) {
  return !!srcs[padId];
}

/**
 * Live gain update for a playing pad (used by quick-volume slider).
 * @param {string} padId
 * @param {number} v  0–100
 */
function setPadVolume(padId, v) {
  const g = gains[padId];
  if (!g || !ctx) return;
  g.gain.setValueAtTime(Math.max(0, Math.min(1, v / 100)), ctx.currentTime);
}

/** @returns {string[]} */
function audioGetPlayingIds() {
  return Object.keys(srcs);
}

/**
 * Ramp all playing loop pads to a ducked gain level.
 * New loop pads started while ducking is active inherit the same level.
 * @param {number} amount  0–1 target gain
 * @param {number} [ramp]  seconds
 */
function audioDuck(amount, ramp = 0.3) {
  _duckTarget = Math.max(0, Math.min(1, amount));
  if (!ctx) return;
  for (const id of _loopPadIds) {
    const dg = duckGains[id];
    if (!dg) continue;
    dg.gain.cancelScheduledValues(ctx.currentTime);
    dg.gain.setValueAtTime(dg.gain.value, ctx.currentTime);
    dg.gain.linearRampToValueAtTime(_duckTarget, ctx.currentTime + ramp);
  }
}

/**
 * Restore all playing loop pads to full gain.
 * @param {number} [ramp]  seconds (0 = immediate)
 */
function audioUnduck(ramp = 0.3) {
  _duckTarget = 1.0;
  if (!ctx) return;
  for (const id of _loopPadIds) {
    const dg = duckGains[id];
    if (!dg) continue;
    dg.gain.cancelScheduledValues(ctx.currentTime);
    dg.gain.setValueAtTime(dg.gain.value, ctx.currentTime);
    dg.gain.linearRampToValueAtTime(1.0, ctx.currentTime + ramp);
  }
}

/* ── SWITCH SOUND ───────────────────────────────────────────── */

let _switchSoundBuf = null;

async function loadSwitchSound() {
  _switchSoundBuf = null;
  const b64 = localStorage.getItem('sos-switch-sound-b64');
  if (!b64 || !ctx) return;
  try {
    const bin   = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    _switchSoundBuf = await ctx.decodeAudioData(bytes.buffer);
  } catch (e) { console.warn('switch-sound decode failed', e); }
}

function playSwitchSound() {
  if (!_switchSoundBuf || !ctx) return;
  try {
    const src = ctx.createBufferSource();
    src.buffer = _switchSoundBuf;
    src.connect(masterGain || ctx.destination);
    src.start(0);
  } catch (e) {}
}

function clearSwitchSoundBuf() { _switchSoundBuf = null; }
