# Command Center Redesign — Change Log

## Refinements round 1 (branch `redesign/command-center-refinements`)

- Buttons (global): text switched from uppercase to sentence case per brand guidelines (Kanit Medium); phone icon restored on contact-intent buttons (navbar, hero primary, contact page).
- Navbar CTA: "Open a channel" → **"Let's talk"** (desktop + mobile drawer).
- Hero: ghost button "Read the spec sheet" → **"What we do"**; baseline "EST. 2021 // PRODUCTION HOUSE" → **"EST. 2025 // USA"** (also in footer).
- Services eyebrow: "05 // THE SPEC SHEET" → **"05 // WHAT WE DO"**.
- How We Work: restored the previous build's alternating timeline (center dashed line, dots, steps animating in one by one) while keeping the new green mono "01 //" numbers and all-caps Kanit step titles.
- Clients: testimonial avatars halved (160px → 80px) so the carousel arrows sit in view; removed the wheel-hijack scroll handler that spammed console errors.
- CTA cleanup: removed the mid-page CTA blocks from Why pod21 ("Not convinced yet?"), Services ("Want to launch or level up your podcast?"), Process ("Ready to make it happen?"), and Clients ("Want to launch, scale, or streamline your podcast?"). CTAs now live only in the navbar, hero, and Commission section.
- SESSION date in the navbar was already dynamic (computed on page load), so no change was needed.


Branch: `redesign/command-center`. Nothing is merged to `main`; to discard the whole redesign, simply delete this branch. Every change below lives in a single commit so `git revert` also works file-by-file.

Design source: the approved "Command Center II" concept (`design-concepts/brand-8-command-center-2.html`).

## Design system changes

| Token / element | Before | After |
| --- | --- | --- |
| Page ground `--bg-primary` | `#0b0c0f` | `#0e0e10` (Deep Carbon) |
| Raised surface `--bg-secondary` | `#101116` | `#17171a` (Raised Carbon) |
| Hairline `--stroke` | `#1d1d1d` | `rgba(243,239,235,0.14)` (bone hairline) |
| Body text `--text-body` | `#aeaeae` | `rgba(243,239,235,0.7)` |
| Carbon `--carbon-black` | `#1d1d1d` | `#212121` (brandbook value) |
| Dark Blue `--blue-*` | `#120551` + tints | **Removed entirely** (per your instruction) |
| Red hover `--red-60` | `#d9708b` (pink tint) | `#a50d34` (pressed red) |
| Fonts | Kanit + Roboto | Kanit + Roboto + **Roboto Mono** (readouts, nav, timestamps) |
| Buttons (global, `ui/button.tsx`) | Green pill, sentence case | **Red pill, Kanit bold uppercase**; outline variant is a bone hairline pill that goes green on hover |
| Cards/panels | `rounded-xl`, no borders | `rounded-[4px]`, bone hairline borders on `#17171a` |
| Decorative pattern images | straight-lines, curley-lines, wifi-lines, arrow-lines, tilt-arrow-lines, pattern.png | **Removed**; replaced by the CSS engineering grid (`.bg-grid`) |
| New utilities | — | `.bg-grid`, `.eyebrow`, `.readout`, `.slash-sep`, `.rec-dot` in `index.css` |

## New components

- `src/components/IndexRail.tsx` — homepage-only fixed left rail (xl screens): wordmark, numbered `//` section index (01–09), and "UK // MEXICO // USA // EVERYWHERE SIGNAL TRAVELS".

## Copy changes (old → new)

**Navbar**
- Nav links trimmed: "Why start a podcast?", "Why pod21?", "Client Spotlight", "FAQs" moved to the mobile drawer + homepage rail; desktop shows SERVICES // PROCESS // CLIENTS // ABOUT // BLOG.
- CTA: "Contact Us" → **"Open a channel"**.
- Added session readout (SESSION date // FULL-SERVICE PRODUCTION // REC) on very wide screens.

**Hero (homepage)** — replaced with the approved concept copy:
- H1: "A podcast for your {cycling word}" → **"Production under total control."** (word-cycle animation removed).
- Sub: "We are a team of podcast production experts ready to bring your show to life." → **"Engineered rooms, versioned edits, loudness-true masters, and a delivery schedule your team can set a watch by. Pod21 runs your show like mission control."**
- "Sound like what you're looking for?" → removed.
- CTA: "Book a free call" → **"Start transmission"** (goes to /contact) + new ghost button **"Read the spec sheet"** (scrolls to Services).
- New eyebrow: "FULL-SERVICE PODCAST // CONTENT PRODUCTION".
- New baseline strip: "EST. 2021 // PRODUCTION HOUSE" and "500+ EPISODES SHIPPED // ACCEPTING COMMISSIONS" (the 500+ figure mirrors the existing WhyUs stat).
- Removed: hero background photos (`hero-bg.png`, `hero-bg-mobile.png`).

**Section eyebrows (new lines of copy, numbered to match the rail)**
- Platform: "02 // DISTRIBUTION"
- WhyPodcast: "03 // WHY PODCAST"
- WhyUs: "04 // WHY POD21"
- Services: "05 // THE SPEC SHEET"
- Process: "06 // THE RUNNING ORDER"
- Testimonials: "07 // CLIENT SPOTLIGHT"
- FAQ: "08 // FAQ"
- Contact band: "09 // COMMISSION" (number only on the homepage)

**Blog index page**
- New page header added: eyebrow "THE JOURNAL" + H1 **"Notes from the control room."** (page previously had no heading).

**Contact page**
- New eyebrow above "Let's talk.": **"Open a channel"**.
- Form heading "Drop us a message" now carries a green `//` prefix (wording unchanged).

**404 page** (was unstyled default)
- "Oops! Page not found" → **"404 // SIGNAL LOST" / "Dead air." / "The page you're looking for isn't broadcasting."**; link "Return to Home" → **"Return to control"**.

**Links page**
- Removed external Linktree profile image and background pattern; added mono tagline "FULL-SERVICE PODCAST // CONTENT PRODUCTION". Link titles/URLs unchanged.

**Footer**
- Column headers "Quick Links" / "Social Links" → **"Index" / "Signal"** with `//` prefixes on links.
- "Copyright 2025 All rights reserved" → baseline strip "© 2026 POD21 // ALL RIGHTS RESERVED".
- New location line: **"UK // MEXICO // USA // EVERYWHERE SIGNAL TRAVELS"**.
- New line: "EST. 2021 // PRODUCTION HOUSE".

## Structure and image changes (no copy impact)

- Homepage gets the IndexRail on xl screens; content shifts right by the rail width.
- Process: dashed vertical timeline → numbered ledger rows (01 // … 05 //) with hairline separators. Step titles/descriptions unchanged.
- WhyPodcast audience cards: illustration images removed; titles get a green `//` prefix. All feature copy unchanged.
- WhyUs stat cards and feature cards: restyled to bordered panels; labels set in mono caps. Stats and copy unchanged.
- Testimonials: avatars kept; names/roles set in Kanit caps + mono. Quotes unchanged.
- About page: **all wording untouched** per your instruction. Removed images (`about_pod21.png`, `history.png`, `that's_why_pod21_born.png`, pattern art); hero centered on the grid; story set as a single readable column.
- BlogCard / featured post images kept (they are article content), reframed with hairline borders.

## Not touched

- Invoice pages (`/pay/:invoiceId`, confirmation) — client-facing payment utilities, deliberately left alone.
- All FAQ questions/answers, testimonial quotes, WhyPodcast feature lists, Services list, Process steps, stats.
- SEO metadata, schema markup, Contentful integration, EmailJS contact form logic.
- Public image files were not deleted; they are just no longer referenced.

## How to revert

- Whole redesign: stay on / merge from `main`; delete branch `redesign/command-center`.
- Individual pieces: `git log` on this branch, then `git checkout main -- <file>` for any file you want back.
