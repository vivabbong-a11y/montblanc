# Montblanc: Writing Toward the Summit (unofficial Korean introduction page)

A Korean single-page site introducing the luxury Maison Montblanc (since 1906, Hamburg): the name, the white six-pointed star and "4810", a 1906–2026 timeline, signature collections, nib craftsmanship, the product world and cultural patronage.

> **Disclaimer:** This is an unofficial, educational page. It is not affiliated with, endorsed by or connected to Montblanc or Richemont. No Montblanc logos, official photos or brand fonts are used; the star on the page is a generic six-point shape drawn in SVG. "Montblanc", "Meisterstück" and other names are trademarks of their owners.

## Sections

| # | id | Section | Notes |
|---|---|---|---|
| 01 | `#hero` | Hero: "정상을 향한 한 줄" | Full-bleed Mont Blanc photo, slow scroll zoom, scroll cue |
| 02 | `#story` | Name and star | 1906 / SVG star in a tick ring / 4810; ring rotates 0→60° on scroll; scroll-fill paragraph; 2023 height (4,805.59 m) note |
| 03 | `#history` | Timeline 1906–2026 | Desktop: pinned horizontal strip (GSAP ScrollTrigger), active year solid, others outlined. Mobile / reduced motion: vertical list with pill year badges |
| 04 | `#collections` | Signature collections | Keyboard-usable scroll-snap carousel (Meisterstück 149, 146·145, Writers Edition, StarWalker, Patron of Art) over an outlined giant word; generic SVG pen drawings |
| 05 | `#craft` | Craftsmanship | Sticky title, counters (35 / ~200 / 14K·18K), six nib-making steps |
| 06 | `#world` | Product world | Writing instruments, watches, leather, fragrance (2×2 grid, hover zoom) |
| 07 | `#culture` | Culture and patronage | Writers Edition, Arts Patronage Award (€5M+ / 300+), Montblanc Haus 2022 |
| 08 | `#closing` | Closing quote | "지능적이되, 인공적이지 않게." (CEO Giorgio Sarné, 2026 interview) |
| — | footer | Disclaimer, sources, image and font credits | |

All facts come from `output/research/montblanc/research.md`. Where sources disagree, the page uses safe wording (e.g. "약 35단계" with a note on "about 40", star emblem "1910 or 1913", "1929년 무렵").

## File structure

```
output/web/montblanc/
├── index.html
├── .nojekyll
├── README.md
├── css/
│   ├── fonts.css          # @font-face rules (self-hosted, relative paths)
│   └── style.css          # tokens on :root, layout, components, reduced motion
├── js/
│   ├── boot.js            # adds .js class before first paint
│   ├── main.js            # header, menu, reveals, carousel, counters, GSAP scroll effects
│   └── vendor/
│       └── gsap/          # gsap.min.js, ScrollTrigger.min.js, LICENSE.txt
├── fonts/
│   ├── pretendard/        # woff2-dynamic-subset/ (92 files) + LICENSE.txt
│   ├── noto-serif-kr/     # files/ (400 weight, Korean + Latin subsets) + LICENSE
│   └── cormorant-garamond/# files/ (300, 300 italic, 500; Latin) + LICENSE
└── img/                   # 8 photos × 2 sizes (WebP) + favicon.svg
```

`fonts/` is an extra folder next to `css/`, `js/` and `img/` so the web fonts can be self-hosted.

## How to open locally

Open `index.html` in a browser. If your browser blocks local font files, serve the folder instead:

```
npx serve .
# or
python -m http.server 8000
```

## Installed libraries

| Name | Version | Files saved | Purpose on the page | License | Download source |
|---|---|---|---|---|---|
| GSAP | 3.15.0 | `js/vendor/gsap/gsap.min.js`, `js/vendor/gsap/LICENSE.txt` | Tweens: counters, star ring rotation, hero zoom, scroll-fill text | GSAP Standard "No Charge" License (https://gsap.com/standard-license) | https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js |
| ScrollTrigger (GSAP plugin) | 3.15.0 | `js/vendor/gsap/ScrollTrigger.min.js` | Pinned horizontal timeline, scroll-linked animations | GSAP Standard "No Charge" License | https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js |

Lenis (smooth scroll) was not installed: native scrolling is enough for this page. Reveals, hover effects, the carousel and the mobile menu are plain CSS / vanilla JS.

### Self-hosted fonts

| Font | Version / package | Weights | License | Source |
|---|---|---|---|---|
| Pretendard Variable | pretendard 1.3.9 (dynamic subset) | 45–920 (variable) | SIL OFL 1.1 | https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/ |
| Noto Serif KR | @fontsource/noto-serif-kr 5.3.1 | 400 | SIL OFL 1.1 | https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr@5.3.1/ |
| Cormorant Garamond | @fontsource/cormorant-garamond 5.3.0 (Latin) | 300, 300 italic, 500 | SIL OFL 1.1 | https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond@5.3.0/ |

All fonts use `font-display: swap` and `unicode-range`, so the browser only downloads the subsets it needs.

## Design references

- Design analysis: `references/web/montblanc/analysis.md`
- Reference links: `references/web/montblanc/references.md` (GDWEB / DBCUT: Doosan Heritage 1896, SP Samhwa 100-Year Museum, SsangYong The Platinum, Cartier Watches and Wonders, White Desert, Yuhan 100th Anniversary History Hall, The Shilla Hotels & Resorts)

References were used for layout ideas only; no code, text or images were copied.

## Image credits

All photos are from Unsplash under the [Unsplash License](https://unsplash.com/license), resized and converted to WebP. None of them is an official Montblanc photo, and the photos are used for mood only.

| File | Subject | Photographer | Source |
|---|---|---|---|
| `img/hero-summit-*.webp` | Snow-capped Mont Blanc at dawn | Andrea Caramello | https://unsplash.com/photos/jBxee1u2RAU |
| `img/nib-gold-*.webp` | Vintage nib close-up | MJ K | https://unsplash.com/photos/cw2ai6A_eeM |
| `img/pen-letter-*.webp` | Fountain pens on a handwritten letter | Álvaro Serrano | https://unsplash.com/photos/hjwKMkehBco |
| `img/watchmaker-*.webp` | Watchmaker working on a movement | Vanishing Point Images | https://unsplash.com/photos/Rh9hYhFAzdk |
| `img/leather-craft-*.webp` | Leather wallet and tools | Konstantin Evdokimov | https://unsplash.com/photos/rhP8U-86GZA |
| `img/fragrance-*.webp` | Plain glass perfume bottle | Muhammad Sulyman | https://unsplash.com/photos/MDMrNFnyFQk |
| `img/ink-drop-*.webp` | Ink drop from a fountain pen | Nicolas Thomas | https://unsplash.com/photos/SXn-fWj0Ht4 |
| `img/writing-hand-*.webp` | Fountain pen writing on lined paper | Aaron Burden | https://unsplash.com/photos/y02jEX_B0O0 |

`img/favicon.svg`, the six-point star and the pen drawings are original SVG shapes made for this page.

## Accessibility and motion

- Semantic sections, one `h1`, skip link, visible focus styles, keyboard-usable menu (Esc closes) and carousel (arrow keys / buttons).
- `prefers-reduced-motion: reduce`: no pinning or scroll scrubbing, the timeline shows as a vertical list, counters show final values, reveals are off.

## Deployment

- Repository: (added after deployment)
- Live URL: (added after deployment)
