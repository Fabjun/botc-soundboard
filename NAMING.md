# CSS Custom Property Naming Concept
## Soundboard of Storytelling

**Kanon:** `SoS_DESIGN_25052026/tokens.css` ist die einzige Quelle der Wahrheit.
Prototypen übernehmen Token-Namen 1:1. Die Main-App (`index.html`) wird schrittweise angeglichen.

---

## Typografie

| Canonical (Design-System) | Verwendung | Main-App (alt → wird ersetzt) |
|---------------------------|-----------|-------------------------------|
| `--font-display` | Press Start 2P — Hero-Titel >24px | `--ff-title` |
| `--font-ui` | VT323 — Buttons, Labels, Menü-Zeilen | `--ff-label` |
| `--font-mono` | Share Tech Mono — Body, Inputs, Captions | `--ff-body` |
| `--font-gothic` | DotGothic16 — Intro-Screen-Titel (kein DS-Token) | `--ff-hero` |

> `--font-gothic` existiert noch nicht in `tokens.css`. Wird dort ergänzt sobald
> der Intro-Screen in das Design-System aufgenommen wird.

---

## Schriftgrößen

| Canonical | Wert | Hinweis |
|-----------|------|---------|
| `--fs-xs` | 12px | |
| `--fs-sm` | 14px | |
| `--fs-md` | 16px | |
| `--fs-lg` | 18px | |
| `--fs-xl` | 22px | |
| `--fs-2xl` | 28px | |
| `--fs-3xl` | 36px | |
| `--fs-4xl` | 48px | |
| `--fs-pixel-sm` | 22px | VT323 adjusted |
| `--fs-pixel-md` | 32px | VT323 adjusted |
| `--fs-pixel-lg` | 48px | VT323 adjusted |

Main-App hat noch keine `--fs-*` Tokens — werden mit Phase 1 ergänzt.

---

## Oberflächen (Surface Hierarchy)

Fünf Ebenen, monoton heller. **Namen sind bereits konsistent** zwischen Main-App und Design-System.

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--night` | `#08081A` | Root / hinter allem |
| `--deep` | `#0E0E22` | Toolbars, Status-Bar |
| `--surface` | `#16162E` | Primäre Panels |
| `--raised` | `#22224A` | Cards, Inputs in Panels |
| `--top` | `#2D2D60` | Hover, aktive Zeilen |
| `--sunk` | `#060614` | Eingelassene Wells (Inputs, Listen) |

---

## Rahmen (Borders)

| Canonical | Wert | Verwendung |
|-----------|------|-----------|
| `--border` | `#383868` | Standard-Hairline |
| `--border-soft` | `#232348` | Divider in dichten Listen |
| `--border-strong` | `#5252A0` | Drag-Handles, fokussierte Inputs |
| `--border-gold` | `#C9A84C` | Selektiert / aktiv |
| `--border-blood` | `#A02828` | Destruktive Zonen |

---

## Text

| Canonical | Wert | Kontrast auf `--surface` |
|-----------|------|--------------------------|
| `--text` | `#F0E8D0` | 13.1:1 AAA |
| `--text-strong` | `#FFFFFF` | Hohe Betonung |
| `--text-dim` | `#B8B0C8` | 6.9:1 AA |
| `--text-mute` | `#7E7494` | 3.8:1 AA-Large only |
| `--text-on-gold` | `#14100A` | 11.5:1 AAA auf `--gold` |

---

## Marken-Akzente

| Canonical | Wert | Verwendung |
|-----------|------|-----------|
| `--gold` | `#D4B25C` | Primärer Akzent, GAME-Modus |
| `--gold-bright` | `#F5D57A` | Highlights, aktiver State |
| `--gold-dim` | `#8A6E34` | Gedämpfte Divider |
| `--gold-soft` | `rgba(212,178,92,.18)` | Subtile Hintergründe |
| `--flame` | `#E8821E` | Logo-Flamme |
| `--blood` | `#A02828` | Destruktiv |
| `--blood-bright` | `#D04545` | Destruktiv Hover/Active |
| `--blood-soft` | `rgba(160,40,40,.18)` | Destruktiv Hintergrund |

---

## Modus-Farben

| Canonical | Wert | Main-App (alt → wird ersetzt) |
|-----------|------|-------------------------------|
| `--mode-setup` | `#6DB5B8` | `--active: #4fc3f7` ⚠️ anderer Wert |
| `--mode-game` | `#D4B25C` | (kein Alias, direkt `--gold`) |

> ⚠️ `--active` im Main-App hat `#4fc3f7` (helles Blau), der Design-System-Wert
> `--mode-setup` ist `#6DB5B8` (gedämpftes Teal). Wertänderung ist Teil von Phase 3.

---

## PAD-Typ-Farben

Jeder PAD-Typ hat eine Farb-Familie: `--pad-{type}`, `--pad-{type}-soft`, `--pad-{type}-glow`.

| Token | Wert | PAD-Typ |
|-------|------|---------|
| `--pad-single` | `#D4B25C` | SOLO — Gold |
| `--pad-loop` | `#6DB5B8` | LOOP — Teal |
| `--pad-playlist` | `#9D7FC7` | LIST — Violet |
| `--pad-combo` | `#D18B4A` | COMBO — Copper |

Suffix `-soft` = `rgba(..., 0.16)`, Suffix `-glow` = `rgba(..., 0.55)`.

---

## Semantische Tokens

| Canonical | Wert | Bedeutung |
|-----------|------|----------|
| `--success` | `#6DB5B8` | Teal (palette-nativ, kein Fremdgrün) |
| `--warning` | `#D4B25C` | Gold |
| `--danger` | `var(--blood)` | |
| `--info` | `#9D7FC7` | Violet |

---

## Abstände (Spacing)

4px-Basis. Noch nicht in der Main-App — kommen mit Phase 1.

`--space-1` (4px) · `--space-2` (8px) · `--space-3` (12px) · `--space-4` (16px) ·
`--space-5` (20px) · `--space-6` (24px) · `--space-8` (32px) · `--space-10` (40px) ·
`--space-12` (48px) · `--space-16` (64px)

---

## Regeln für neue Tokens

1. **Keine Abkürzungen** außer etablierten: `ui`, `mono`, `sm`, `md`, `lg`, `xl`
2. **Kein `--sb-*`-Prefix** in neuem Code (nur Legacy-Aliases in `tokens.css`)
3. **Kein `--ff-*`-Prefix** in neuem Code (ersetzt durch `--font-*`)
4. **Kein `--active`** — stattdessen `--mode-setup` oder `--mode-game`
5. **PAD-Farben**: immer als Familie anlegen (`--pad-{type}`, `-soft`, `-glow`)
6. **Prototypen**: ausschließlich Canonical-Namen, niemals Main-App-Aliases

---

## Migrations-Status

| Token-Gruppe | Design-System | Prototypen | Main-App |
|---|---|---|---|
| Farben (night/gold/blood) | ✅ | ✅ | ✅ |
| PAD-Typ-Farben | ✅ | ✅ | ✅ (Phase 3) |
| `--mode-setup/game` | ✅ | ✅ | ❌ (`--active`) |
| `--font-ui/mono/display` | ✅ | ✅ `pad-editor.html` / ❌ `menu.html` | ❌ (`--ff-*`) |
| `--space-*` | ✅ | ✅ | ❌ |
| `--fs-*` | ✅ | ✅ | ❌ |
