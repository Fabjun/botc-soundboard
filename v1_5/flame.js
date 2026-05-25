// AnimatedFlame — vanilla JS/SVG translation of v13-animated-flame.jsx (SoS_DESIGN_25052026)

const FLAME_TIP = [[7,0,2],[8,0,2],[7,1,1],[8,1,1]];
const FLAME_BODY = [
  [6,2,0],[7,2,2],[8,2,2],[9,2,0],
  [6,3,0],[7,3,2],[8,3,2],[9,3,0],
  [5,4,0],[6,4,1],[7,4,2],[8,4,2],[9,4,1],[10,4,0],
  [5,5,0],[6,5,1],[7,5,2],[8,5,2],[9,5,1],[10,5,0],
  [4,6,0],[5,6,1],[6,6,2],[7,6,2],[8,6,2],[9,6,2],[10,6,1],[11,6,0],
  [4,7,0],[5,7,1],[6,7,2],[7,7,2],[8,7,2],[9,7,2],[10,7,1],[11,7,0],
  [3,8,0],[4,8,1],[5,8,2],[6,8,2],[7,8,2],[8,8,2],[9,8,2],[10,8,2],[11,8,1],[12,8,0],
  [3,9,0],[4,9,1],[5,9,2],[6,9,2],[7,9,2],[8,9,2],[9,9,2],[10,9,2],[11,9,1],[12,9,0],
  [3,10,0],[4,10,1],[5,10,2],[6,10,2],[7,10,2],[8,10,2],[9,10,2],[10,10,2],[11,10,1],[12,10,0],
  [4,11,0],[5,11,1],[6,11,2],[7,11,2],[8,11,2],[9,11,2],[10,11,1],[11,11,0],
  [4,12,0],[5,12,1],[6,12,2],[7,12,2],[8,12,2],[9,12,2],[10,12,1],[11,12,0],
  [5,13,0],[6,13,1],[7,13,2],[8,13,2],[9,13,1],[10,13,0],
  [5,14,0],[6,14,0],[7,14,1],[8,14,1],[9,14,0],[10,14,0],
  [6,15,0],[7,15,0],[8,15,0],[9,15,0],
];
const ICE_FACETS = [
  [4,7],[5,8],[6,9],[7,10],[11,7],[10,8],[9,9],[6,11],[7,12],[8,13],
  [4,5],[11,5],[3,10],[12,10],[5,13],[10,13],
];
const CHIP_SOURCES = [
  [4,7],[5,5],[6,8],[7,10],[10,5],[11,7],[10,8],[9,9],
  [4,9],[5,11],[10,11],[6,13],[9,13],[5,8],[11,9],
];
const GLITTER_POS = [
  [4,5],[5,5],[10,5],[11,5],[5,7],[10,7],[4,9],[11,9],
  [6,11],[9,11],[5,13],[10,13],[7,8],[8,8],[3,10],[12,10],
];

const _WARM = { outer:'#C46818', mid:'#E8881E', core:'#F5C242', heart:'#FFE8A0' };
const _COLD = { outer:'#3F88B8', mid:'#5BAFD8', core:'#9FD8EE', heart:'#E8F8FF' };

function _lerp(a, b, t) { return a + (b - a) * t; }
function _hexRgb(hex) {
  const v = hex.replace('#','');
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}
function lerpColor(c1, c2, t) {
  const [r1,g1,b1] = _hexRgb(c1), [r2,g2,b2] = _hexRgb(c2);
  return `rgb(${Math.round(_lerp(r1,r2,t))},${Math.round(_lerp(g1,g2,t))},${Math.round(_lerp(b1,b2,t))})`;
}
function _colorAt(layer, cold) {
  if (layer === 0) return lerpColor(_WARM.outer, _COLD.outer, cold);
  if (layer === 1) return lerpColor(_WARM.mid,   _COLD.mid,   cold);
  return lerpColor(_WARM.core, _COLD.core, cold);
}

class AnimatedFlame {
  constructor(container, opts = {}) {
    const {
      size = 120, interactive = true,
      thawSeconds = 1.6, freezePerTap = 0.18,
      initialCold = 0, onColdChange,
    } = opts;
    this.size         = size;
    this.interactive  = interactive;
    this.thawSeconds  = thawSeconds;
    this.freezePerTap = freezePerTap;
    this.cold         = initialCold;
    this.time         = 0;
    this.lastTap      = performance.now() - thawSeconds * 1000 - 1000;
    this.particles    = [];
    this.glitter      = [];
    this.glitterTimer = 0;
    this.lick         = { side: 0, until: 0 };
    this.onColdChange = onColdChange || null;
    this._raf         = null;
    this._build(container);
    this._start();
  }

  _ns(tag, a = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(a)) el.setAttribute(k, String(v));
    return el;
  }

  _build(container) {
    const s = this.size, sh = s * 17 / 16;

    this.wrap = document.createElement('div');
    this.wrap.style.cssText = `position:relative;width:${s}px;height:${sh}px;flex-shrink:0;cursor:${this.interactive?'pointer':'default'};user-select:none`;

    // Halo — radial glow behind the flame, extends past wrap edges
    this.haloEl = document.createElement('div');
    const hi = Math.round(s * 0.32);
    this.haloEl.style.cssText = `position:absolute;inset:-${hi}px;pointer-events:none;border-radius:50%`;
    this.wrap.appendChild(this.haloEl);

    this.svg = this._ns('svg', { width:s, height:sh, viewBox:'0 0 16 17', 'shape-rendering':'crispEdges' });
    this.svg.style.cssText = 'position:relative;display:block;overflow:visible';

    // Body group — all non-particle pixels; sways + breathes
    this.bodyG = this._ns('g', {});
    this.svg.appendChild(this.bodyG);

    // Pre-created body pixel rects (fill updated each frame)
    this.bodyRects = FLAME_BODY.map(([x,y]) => {
      const r = this._ns('rect', {x,y,width:1,height:1,fill:'#000'});
      this.bodyG.appendChild(r); return r;
    });

    this.heartRect = this._ns('rect', {x:7,y:9,width:2,height:2,fill:_WARM.heart,opacity:0});
    this.bodyG.appendChild(this.heartRect);

    this.facetRects = ICE_FACETS.map(([x,y]) => {
      const r = this._ns('rect', {x,y,width:1,height:1,fill:'#fff',opacity:0});
      this.bodyG.appendChild(r); return r;
    });

    this.icicleRects = [[5,15],[6,16],[8,16],[10,15],[11,16]].map(([x,y]) => {
      const r = this._ns('rect', {x,y,width:1,height:1,fill:lerpColor(_COLD.mid,'#FFFFFF',0.4),opacity:0});
      this.bodyG.appendChild(r); return r;
    });

    // Tip pool — reused for flicker + extension + tongue-lick pixels
    this.tipPool = Array.from({length:15}, () => {
      const r = this._ns('rect', {x:0,y:0,width:1,height:1,fill:'#000',opacity:0});
      this.bodyG.appendChild(r); return r;
    });

    // Two continuous ember streams
    this.ember1 = this._ns('rect', {x:7,y:4,width:0.6,height:0.6,opacity:0});
    this.ember2 = this._ns('rect', {x:8,y:3,width:0.5,height:0.5,opacity:0});
    this.bodyG.appendChild(this.ember1);
    this.bodyG.appendChild(this.ember2);

    this.glitterPool = Array.from({length:8}, () => {
      const r = this._ns('rect', {x:0,y:0,width:1,height:1,fill:'#FFFFFF',opacity:0});
      this.bodyG.appendChild(r); return r;
    });

    // Particle group — outside bodyG so particles fly free of body sway
    this.particleG = this._ns('g', {});
    this.svg.appendChild(this.particleG);

    this.sparkPool = Array.from({length:20}, () => {
      const r = this._ns('rect', {x:0,y:0,width:1,height:1,fill:'#fff',opacity:0});
      this.particleG.appendChild(r); return r;
    });

    this.chipPool = Array.from({length:10}, () => {
      const g = this._ns('g', {});
      const r = this._ns('rect', {x:-0.5,y:-0.5,width:1,height:1,opacity:0});
      const h = this._ns('rect', {x:-0.25,y:-0.25,width:0.33,height:0.33,fill:'#FFF',opacity:0});
      g.appendChild(r); g.appendChild(h);
      this.particleG.appendChild(g);
      return {g, r, h};
    });

    // Frost vignette overlay
    this.frostEl = document.createElement('div');
    this.frostEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:50%';

    this.wrap.appendChild(this.svg);
    this.wrap.appendChild(this.frostEl);
    if (this.interactive) this.wrap.addEventListener('click', e => this._tap(e));
    container.appendChild(this.wrap);
  }

  _tap(e) {
    e.stopPropagation();
    this.lastTap = performance.now();
    const c = this.cold;

    // Sparks burst upward when warm
    if (c < 0.55) {
      const n = 9 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const a = -Math.PI/2 + (Math.random()-.5)*Math.PI*1.2;
        const sp = 7 + Math.random()*10, li = 0.7 + Math.random()*0.7;
        this.particles.push({ kind:'spark',
          x: 8+(Math.random()-.5)*3, y: 4+Math.random()*3,
          vx: Math.cos(a)*sp, vy: Math.sin(a)*sp,
          life: li, maxLife: li, size: 0.45+Math.random()*0.7, warmth: Math.random() });
      }
    }

    // Ice chips fly from surface pixels when frozen
    if (c > 0.7) {
      const n = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const [px,py] = CHIP_SOURCES[Math.floor(Math.random()*CHIP_SOURCES.length)];
        const a = Math.atan2(py-9, px-8) + (Math.random()-.5)*0.55;
        const sp = 5 + Math.random()*7, li = 0.9 + Math.random()*0.8;
        this.particles.push({ kind:'chip',
          x: px+.5, y: py+.5,
          vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 3,
          life: li, maxLife: li, size: 0.7+Math.random()*0.7,
          rot: Math.random()*360, spin: (Math.random()-.5)*700 });
      }
    }
    this.cold = Math.min(1, this.cold + this.freezePerTap);
  }

  _start() {
    let last = performance.now();
    const tick = now => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      this.time += dt;

      // Thaw after grace period
      if ((now - this.lastTap) / 1000 > this.thawSeconds && this.cold > 0)
        this.cold = Math.max(0, this.cold - dt * 0.45);

      // Update particles
      const ps = this.particles;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx*dt; p.y += p.vy*dt;
        if (p.kind === 'chip') { p.vy += 26*dt; p.rot += p.spin*dt; p.vx *= 1-dt*0.25; }
        else                   { p.vy -= 4*dt;  p.vx *= 1-dt*0.6; }
        if ((p.life -= dt) <= 0) ps.splice(i, 1);
      }

      // Random tongue-lick when warm
      if (this.cold < 0.55 && now > this.lick.until && Math.random() < dt*1.6)
        this.lick = { side: Math.random()<.5?-1:1, until: now+80+Math.random()*140 };

      // Frozen glitter spawns
      this.glitterTimer -= dt;
      if (this.cold > 0.7 && this.glitterTimer <= 0) {
        this.glitterTimer = 0.22 + Math.random()*0.5;
        const [gx,gy] = GLITTER_POS[Math.floor(Math.random()*GLITTER_POS.length)];
        this.glitter.push({x:gx, y:gy, life:0.42, maxLife:0.42});
      }
      for (let i = this.glitter.length-1; i >= 0; i--)
        if ((this.glitter[i].life -= dt) <= 0) this.glitter.splice(i, 1);

      if (this.onColdChange) this.onColdChange(this.cold);
      this._render(now);
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  _render(now) {
    const { cold, time } = this;
    const flicker = Math.max(0, 1 - cold * 1.4);

    // Body: sway (horizontal sine) + breath (vertical scale)
    const swayPx  = Math.sin(time*1.4) * 0.4 * flicker;
    const breathY = 1 + Math.sin(time*2.3) * 0.030 * flicker;
    this.bodyG.style.transform      = `translate(${swayPx}px,0) scaleY(${breathY})`;
    this.bodyG.style.transformOrigin = '8px 16px';

    // Body pixel colors — three layers painted in order
    FLAME_BODY.forEach(([,,l], i) => this.bodyRects[i].setAttribute('fill', _colorAt(l, cold)));

    // Core heart pulse
    if (cold < 0.85) {
      const hp = 0.7 + 0.3*Math.sin(time*4)*flicker;
      this.heartRect.setAttribute('fill', lerpColor(_WARM.heart, _COLD.heart, cold));
      this.heartRect.setAttribute('opacity', hp*(1-cold));
    } else this.heartRect.setAttribute('opacity', 0);

    // Tip flicker — discrete 12fps frames, extension pixel, tongue-lick
    const tipFrame = Math.floor(time*12) % 16;
    const tipPixels = [];
    if (cold < 0.88) {
      FLAME_TIP.forEach(([x,y,l], i) => {
        const seed = (tipFrame*11 + i*17) % 13;
        if (seed/13 < (y===0 ? 0.4 : 0.6) + flicker*0.4) tipPixels.push([x,y,l]);
      });
      if (flicker > 0.4) {
        const ext = Math.floor(time*4) % 5;
        if (ext===0) tipPixels.push([7,-1,2]);
        if (ext===1) { tipPixels.push([7,-1,2],[8,-1,1]); }
        if (ext===2) tipPixels.push([8,-1,2]);
      }
    } else {
      tipPixels.push([7,0,2],[8,0,2],[7,1,1],[8,1,1]);
    }
    if (now < this.lick.until && cold < 0.55) {
      const bx = this.lick.side > 0 ? 11 : 4;
      tipPixels.push([bx,5,0],[bx+this.lick.side,6,0]);
    }
    this.tipPool.forEach((r,i) => {
      if (i < tipPixels.length) {
        const [x,y,l] = tipPixels[i];
        r.setAttribute('x',x); r.setAttribute('y',y);
        r.setAttribute('fill', _colorAt(l,cold)); r.setAttribute('opacity',1);
      } else r.setAttribute('opacity',0);
    });

    // Continuous ember streams (two pixel paths rising from core)
    const ep1 = (time*0.7)%1, ep2 = ((time*0.7)+0.5)%1;
    if (flicker > 0.25) {
      this.ember1.setAttribute('x', 7+Math.sin(time*2)*1.2);
      this.ember1.setAttribute('y', 4-ep1*5);
      this.ember1.setAttribute('fill', _colorAt(2,cold));
      this.ember1.setAttribute('opacity', (1-ep1)*flicker*0.85);
    } else this.ember1.setAttribute('opacity',0);
    if (flicker > 0.4) {
      this.ember2.setAttribute('x', 8+Math.cos(time*1.8)*1.0);
      this.ember2.setAttribute('y', 3-ep2*6);
      this.ember2.setAttribute('fill', lerpColor(_WARM.mid,'#FFFFFF',ep2*0.4));
      this.ember2.setAttribute('opacity', (1-ep2)*flicker*0.7);
    } else this.ember2.setAttribute('opacity',0);

    // Ice facets fade in at cold ≥ 0.5
    this.facetRects.forEach((r,i) => {
      const op = cold > 0.5 ? Math.max(0,(cold-.5)*2)*(i<11?.85:1) : 0;
      r.setAttribute('fill', i<11 ? lerpColor(_COLD.core,'#FFFFFF',0.3) : '#FFFFFF');
      r.setAttribute('opacity', op);
    });

    // Icicles below base at cold ≥ 0.7
    this.icicleRects.forEach(r =>
      r.setAttribute('opacity', cold>0.7 ? Math.max(0,(cold-.7)*3.3) : 0));

    // Glitter sparkles on ice surface
    this.glitterPool.forEach((r,i) => {
      if (i < this.glitter.length) {
        const g = this.glitter[i];
        const b = 1 - Math.abs(g.life/g.maxLife - 0.5)*2;
        r.setAttribute('x',g.x); r.setAttribute('y',g.y); r.setAttribute('opacity',b);
      } else r.setAttribute('opacity',0);
    });

    // Halo — orange → lilac → cyan as cold rises; pulses with flicker
    const hc = cold < 0.5
      ? lerpColor('#E8821E','#9F88E8',cold*2)
      : lerpColor('#9F88E8','#5BAFD8',(cold-.5)*2);
    const hInt = (1 + Math.sin(time*3)*0.06*flicker) * _lerp(0.55, 0.22, cold);
    this.haloEl.style.background = `radial-gradient(circle, ${hc} 0%, transparent 60%)`;
    this.haloEl.style.opacity = hInt;

    // Spark particles (pool of 20)
    const sparks = this.particles.filter(p=>p.kind==='spark');
    const chips  = this.particles.filter(p=>p.kind==='chip');
    this.sparkPool.forEach((r,i) => {
      if (i < sparks.length) {
        const p=sparks[i], t=Math.max(0,p.life/p.maxLife);
        r.setAttribute('x',p.x-p.size/2); r.setAttribute('y',p.y-p.size/2);
        r.setAttribute('width',p.size); r.setAttribute('height',p.size);
        r.setAttribute('fill', lerpColor('#FFFFFF',lerpColor(_WARM.core,_WARM.mid,p.warmth),1-t*0.4));
        r.setAttribute('opacity', Math.min(1,t*1.5));
      } else r.setAttribute('opacity',0);
    });

    // Ice chip particles — rotate + gravity
    this.chipPool.forEach((chip,i) => {
      if (i < chips.length) {
        const p=chips[i], t=Math.max(0,p.life/p.maxLife);
        chip.g.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${p.rot})`);
        chip.r.setAttribute('x',-p.size/2); chip.r.setAttribute('y',-p.size/2);
        chip.r.setAttribute('width',p.size); chip.r.setAttribute('height',p.size);
        chip.r.setAttribute('fill', lerpColor(_COLD.core,'#FFFFFF',0.35));
        chip.r.setAttribute('opacity', Math.min(1,t*1.4));
        chip.h.setAttribute('x',-p.size/4); chip.h.setAttribute('y',-p.size/4);
        chip.h.setAttribute('width',p.size/3); chip.h.setAttribute('height',p.size/3);
        chip.h.setAttribute('opacity', Math.min(1,t*1.6));
      } else { chip.r.setAttribute('opacity',0); chip.h.setAttribute('opacity',0); }
    });

    // Frost vignette intensifies with cold
    this.frostEl.style.background = cold > 0.3
      ? `radial-gradient(circle, transparent 50%, rgba(155,210,235,${(cold-.3)*0.18}) 100%)`
      : '';
  }

  destroy() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }
}
