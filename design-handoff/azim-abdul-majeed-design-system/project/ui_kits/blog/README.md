# Blog UI kit

Interactive recreation of the personal blog.

## Screens
- **Home** — hero, featured essay card, article grid, newsletter block
- **Article** — long-form reading view with drop cap, pull quote, Arabic support
- **Category** — filtered article grid (Islamic Finance, Economics, Finance, Crazy Thoughts)
- **About** — bio + topics I write about + elsewhere links
- **Newsletter** — dedicated sign-up screen

## Components (JSX)
- `Nav.jsx` — sticky top nav with wordmark, category links, search + theme toggle
- `Footer.jsx` — inverse-surface footer with columns + colophon note
- `ArticleCard.jsx` — `<ArticleCard>` and `<FeatureCard>`
- `Newsletter.jsx` — inline form, `variant="soft" | "hero"`
- `Screens.jsx` — all screen compositions plus `ARTICLES` sample data

## Navigation
Click any nav link, any article card, or the "All essays" back-link. Route persists in localStorage. Theme toggle (moon/sun) switches light ↔ dark.

## Notes
- All content is sample copy written in the voice documented in `../../README.md`.
- No real form submission — the newsletter shows a confirmation state only.
