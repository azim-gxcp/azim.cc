# M Azim Abdul Majeed — Design System

A personal design system for **M Azim Abdul Majeed's** blog: a long-form, editorial website covering **Economics**, **Finance**, **Islamic Finance**, and personal essays.

The system follows a **shadcn/ui aesthetic**: zinc neutrals, hairline borders, 6px radii, very subtle shadows, sans-serif UI — with one deliberate editorial twist: **Fraunces serif** is retained for `h1` / `h2` to preserve the essay-writer voice. Purple is demoted to a single brand accent (primary button, link color, focus ring); everything else is neutral.

---

## Index

| File | Purpose |
|---|---|
| `README.md` | This file |
| `colors_and_type.css` | All CSS custom properties: palette, semantic tokens, type scale, spacing |
| `SKILL.md` | Agent-skill manifest |
| `preview/` | Design System tab cards |
| `ui_kits/blog/` | Full blog UI kit (single self-contained `index.html`) |

---

## Visual foundations

### Color
- **Zinc 50–950** is the foundation for backgrounds, text, and borders (shadcn default).
- **Purple 1–6** is the single brand ramp, used only for:
  - primary buttons (`purple-4` → hover `purple-3`)
  - links
  - focus ring
  - selection background (`purple-6` tint)
- **Green** is retained in the palette for a `--success` token but is **not used in components**.
- Background is pure white (`#ffffff`) in light and zinc-950 (`#09090b`) in dark.

### Type
- **Display (h1, h2, pull-quote, drop-cap):** Fraunces — serif, variable (opsz 9–144). The one non-shadcn move.
- **Body + UI (everything else):** Ubuntu — humanist sans.
- **Mono:** JetBrains Mono.
- **Arabic:** Amiri, via `lang="ar"` or `.arabic`.

Scale starts at 16px body. Reading column 680px.

### Shape & depth
- **Borders** are 1px hairlines in `zinc-200` (light) / `zinc-800` (dark). Everything has a border.
- **Radii:** `--radius-md: 6px` default, `--radius-lg: 8px` for cards, `--radius-xl: 12px` for feature/newsletter blocks.
- **Shadows** are very subtle — rarely seen at rest; `shadow-sm` on hover.
- **Cards** = white bg + 1px border + 8px radius. On hover: border darkens, subtle shadow appears.

### Motion
- 120ms for color/background changes.
- 160ms ease for border/shadow transitions.
- No bounces, no parallax. `prefers-reduced-motion` respected.

---

## Iconography
**Lucide** icons via CDN, 1.5px stroke, 16px default size. No emoji in editorial copy.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

---

## Notes & substitutions
- **Arabic font:** Amiri (Fraunces has no Arabic glyphs). Swap for Scheherazade New / Reem Kufi / Noto Naskh Arabic if preferred.
- **Fonts:** loaded from Google Fonts. Tell me if you want local TTFs.
- **Photography:** placeholders only. Drop real imagery into `assets/images/` and it will be wired in.
