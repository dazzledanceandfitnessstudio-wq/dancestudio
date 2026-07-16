---
name: dazzle-dance-frontend
description: Visual design language for the Dazzle Dance Studio website — a street/hip-hop dance-studio aesthetic inspired by STEEZY Studio. Read before building or editing ANY page (About, Contact, Services, Courses, Ai, Dashboard, Post/[id], Posts, Events, home). Covers color tokens, typography, component patterns, motion, and copy voice.
---

# Dazzle Dance Studio — Frontend Design Skill

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. The client is **Dazzle Dance Studio**, a dance & fitness academy site inspired by STEEZY Studio (steezy.co). Dance is physical, loud, and communal — the site should feel like walking into a studio mid-session under stage lighting: dark room, hot spotlights, energy. Not a spa reception desk, not a corporate SaaS dashboard.

This file is the single source of truth for visual decisions on this project. Read it fully before writing UI code for any page. It governs presentation only — backend/API/DB code is already built and out of scope.

---

## Ground it in the subject

Dazzle's audience spans total beginners to advanced dancers, taking hip-hop, breaking, heels, house, and other street/urban styles, both in-studio and online. Draw on that world directly: stage lighting, spray-paint and marker-tag energy, sneaker culture, chalk and tape marks on a studio floor, cypher/boombox imagery. Build with real content — actual class styles, instructor names, event dates, session links — never lorem ipsum or generic "fitness app" stock language.

---

## Color System

Dark-first, neon-accented, high contrast. The background is the stage floor at night; the accent colors are the spotlights.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0B0A0F` | Primary page background — near-black with a violet undertone, never flat `#000000` |
| `--color-surface` | `#16131D` | Card / panel surface, sits just above bg |
| `--color-surface-alt` | `#1E1929` | Alternating section band, slightly lighter than surface |
| `--color-border` | `#2C2438` | Hairline borders, dividers on dark surfaces |
| `--color-ink` | `#F5F3F7` | Primary text on dark — warm off-white, not pure white |
| `--color-body-text` | `#B8AFC7` | Secondary/body text on dark |
| `--color-primary` | `#FF1F6D` | Primary CTA / hero accent — hot magenta, the main spotlight color |
| `--color-primary-dark` | `#D6135A` | Primary hover/active state |
| `--color-secondary` | `#C6FF3D` | Secondary accent — acid/electric lime, energy hits, underlines, active states |
| `--color-tertiary` | `#00E5FF` | Third accent — electric cyan, sparingly, for links/info/live indicators |
| `--color-warn-yellow` | `#FFE600` | Sparingly — "live now" / urgent tags only |

**Gradient:** one signature gradient, used as an accent, never a full-bleed background: `linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%)` — magenta into violet. Use on a CTA button fill, a thin glow-edge behind a headline, or a gradient ring around an instructor avatar. A second gradient, `#C6FF3D → #00E5FF` (lime into cyan), is fine for a badge or hover glow — don't use it as a section background.

**Light surfaces:** used sparingly and deliberately, for reading rest — e.g. a long-form blog post, a form section. Use `--color-bg-light: #F5F2FA` (cool-toned near-white) with `--color-ink-on-light: #171321`. Roughly 70% dark surface : 20% ink/body text : 10% saturated accent overall — the accent is a spotlight, not the whole show.

---

## Typography

Poppins is the backbone — it's STEEZY's own brand font, and its geometric, slightly blocky forms hold up at high weight against a dark ground.

- **Display/headings:** Poppins, 700–800. Push scale hard on the hero. A hero headline can take the gradient as a text-fill, or a spray-edge underline in `--color-secondary`.
- **Body:** Poppins 400–500, or pair with Inter for more contrast between display and body registers — Poppins stays reserved for headings/buttons/nav/labels either way.
- **Eyebrows/labels/tags:** uppercase, 700, letter-spacing 0.08em, set in an accent color (not gray) — reads as street signage.

**Type scale** (rem, mobile-first, scale ~1.15–1.3x at desktop):
- Eyebrow/label: 0.75rem, 700, uppercase
- H1 (hero): 2.5rem → 4.5rem desktop, 800
- H2 (section): 1.875rem → 2.75rem, 700
- H3 (card title): 1.25rem → 1.5rem, 700
- Body: 1rem, 400–500, line-height 1.6
- Caption/meta: 0.875rem, 500, `--color-body-text`

**Voice:** short, punchy, second-person, verb-forward — "Reach Your Dance Goals," "Not Your Average Online Tutorial." Write like a hype instructor calling out a cypher, not a SaaS landing page. Prefer verbs of motion and challenge: move, learn, battle, level up, drop in.

---

## Shape, Spacing & Layout

- **Corner radius:** cards `16–24px`, buttons pill-shaped or `12px`, images/thumbnails `16px`, badges fully pill-shaped.
- **Cards are the core structural unit** (class, event, post, instructor cards): rounded rectangle on `--color-surface`, glow-shadow on hover — `0 0 24px rgba(255,31,109,0.15)` — not a gray drop-shadow; a dark UI needs light/glow to read as elevated.
- **Grid-driven layout:** 1 col mobile, 2 col tablet, 3–4 col desktop for class/event/post listings, consistent gutters (`20–24px`).
- **Section rhythm:** mostly dark (`--color-bg` / `--color-surface-alt` bands), with one or two light bands for contrast and reading rest on content-heavy pages.
- Whitespace stays generous even against the high-contrast palette — bold should not mean cluttered.

---

## Components

**Buttons**
- Primary: gradient (`magenta → violet`) or solid `--color-primary` fill, `--color-ink` text, pill-shaped, bold weight, lift + glow on hover (`translateY(-2px)` + brighter glow-shadow).
- Secondary: outline in `--color-secondary` or `--color-tertiary` on dark surface, fills solid on hover.
- CTAs are primarily the magenta/gradient treatment; lime/cyan outline buttons are for secondary actions.

**Badges/Tags** (dance style, level, event status)
- Small pill, solid or ~20%-opacity tint of the relevant accent, full-opacity accent text.
- Event status: `ACTIVE` = lime, `COMPLETED` = muted violet-gray, `CANCELLED` = muted red/magenta at lower saturation.
- `"LIVE NOW"`/urgent tags get `--color-warn-yellow` — the one place yellow appears, so it stays meaningful.

**Nav**
- Bold wordmark left on `--color-bg`, pill-shaped nav links in `--color-ink`/`--color-body-text`, standout gradient "Sign Up"/"Enroll" pill button right. Sticky on scroll with a subtle glow-edge, not a plain gray shadow.

**Cards for Posts/Events/Sessions**
- Image/banner top (rounded top corners), dark gradient scrim at the image's base if a title sits on it, bold title, 1–2 line description, meta pill row (date, venue/style, level), primary CTA bottom-right or full-width on mobile.

**Forms (Contact/Enquiry)**
- Rounded input fields on `--color-surface` with a `--color-border` outline, focus ring in `--color-tertiary`, bold gradient submit button.

**Dashboard**
- Same dark, rounded-card, glow-accent language as the public pages — a utility page is not an excuse to drop into a gray admin panel. One hero stat card can carry the full gradient treatment; the rest stay on flat `--color-surface`.

---

## Motion

One orchestrated moment beats scattered effects: a hero video/image with a subtle entrance, a scroll-triggered reveal on section entry, hover lifts with a glow rather than a shadow, and — a signature touch — a looping marquee for dance styles or instructor logos.

Timing: 150–250ms ease-out for hover/interaction, 400–600ms for scroll reveals. Respect `prefers-reduced-motion`. Pick one moment (hero entrance, or the style marquee) to be memorable, and keep the rest quiet and functional.

---

## Imagery

Favor real photo/video of dancers and classes, color-graded cool/high-contrast so it sits naturally against the dark ground — a warm grade will fight the palette. Where illustration is needed (empty states, icons), keep it bold and rounded with thick strokes and filled shapes, rendered in the neon-on-dark palette.

---

## Page-specific notes

- **Home (`page.js`):** Dark hero, bold gradient-accented headline, styles/categories grid or marquee, "how it works" feature row, one testimonials band, stats band, footer.
- **Courses/Services:** Card grid, filterable by style/level with pill tag filters in accent colors.
- **Events:** Card grid from the `events` collection — status badge per the mapping above, date/venue meta, enrollment CTA (relabeled/disabled once `enrolledCount >= maxParticipants`).
- **Posts/Post/[id]:** Blog-style card grid → article page; a good candidate for the light-surface exception for long-form readability, with dark nav/footer bracketing it.
- **Dashboard:** User's enrolled events/sessions, notifications entry point — same dark/glow card system as public pages.
- **About/Contact:** Personal, high-energy tone; Contact uses the form pattern above. Enquiries route to email, not the DB — no "submitted enquiries" list needed.
- **Ai:** Keep the interactive surface (chat/input) inside the same dark, rounded, glow-accent system.

---

## Restraint and self-critique

Spend the boldness in the color/light system — that's the one thing this page will be remembered by. Keep structure and spacing disciplined around it. Build to a quality floor without announcing it: responsive to mobile, visible keyboard focus (in `--color-tertiary`, not the browser default blue), reduced motion respected.

## Anti-patterns (avoid)

- Warm cream/pastel backgrounds, soft muted accents — reads as wellness/beauty brand, not street dance.
- Flat pure-black (`#000`) or pure-white (`#FFF`) as a large fill.
- Gray drop-shadows on dark surfaces (use glow-shadows instead).
- Square/sharp-cornered cards or buttons.
- The gradient as a full-bleed background fill rather than an accent.
- Thin, cold, line-icon-heavy UI.
- More than one or two light-surface bands per page — this is a dark-mode-primary brand.
- Generic stock "business handshake" imagery.