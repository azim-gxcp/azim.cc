---
name: azim-majeed-design
description: Use this skill to generate well-branded interfaces and assets for M Azim Abdul Majeed's personal blog (economics, finance, Islamic finance, personal essays) — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `README.md` — voice, visual foundations, iconography
- `colors_and_type.css` — all tokens (palette, semantic, type scale, spacing, radii, shadows)
- `assets/logo/` — wordmark + monogram SVG
- `assets/patterns/` — Islamic geometric SVGs (use at ~6% opacity)
- `preview/` — design-system cards (one concept per file)
- `ui_kits/blog/` — full React/JSX blog prototype with Home, Article, Category, About, Newsletter, Nav, Footer

## Tone & voice
First-person, essayistic, scholarly-but-conversational (Stratechery meets LRB). Sentence case. No emoji. Transliterate Arabic terms in italics (*ribā*) and wrap original-script Arabic in `<span lang="ar">` so the `.arabic` rule kicks in.
