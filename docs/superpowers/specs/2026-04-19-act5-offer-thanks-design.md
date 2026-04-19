# Act 5 — Offer + Thanks — Design Spec

**Date:** 2026-04-19
**Author:** Oleksandr + Claude
**Status:** Approved, building

## Context

Act 5 closes the 15-minute UA WELL consultative sales deck. It converts teaching + two deep cases into a concrete ask. Before this spec, Act 5 was unbuilt — the deck ended on the Services grid with no CTA, which made it a brochure instead of a sales talk. The review at `/home/node/.claude/plans/i-want-you-to-velvety-crayon.md` flagged this as the top priority fix.

### Offer terms (confirmed 2026-04-19)

- Free consultation: **30–60 хв** (flexible)
- **UA WELL members: −20% від фінальної ціни**
- **If the attendee describes a real problem on the call, the solution proposal is free** regardless of whether they hire
- Pricing is **per-project scope** (fixed or hourly on support phase) — no package slides, no range slides, no SaaS-math comparison

### Deck position

Act 5 = 2 slides (slides 28–29), ~1:30–2:00 total runtime. Registered as a new column `act-close` in `src/App.tsx` after `act-match`.

---

## Slide 28 · Offer

**Goal:** state all three closing levers on one screen, put the QR where the eye lands last, keep it scannable in ≤10 seconds of attention.

### Layout

Two-column flex at ≥640px viewport, stacked on mobile. Center-gravitated on 1920×1080 projector.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│ ПРОПОЗИЦІЯ                                           │
│                                                      │
│ Для учасників UA WELL —          ┌─────────────┐     │
│ розмова і рішення                │             │     │
│ безкоштовно.                     │     QR      │     │
│                                  │  ~280px     │     │
│ ✓ 30–60 хв безкоштовна розмова   │             │     │
│ ✓ Покажу рішення для вашої       └─────────────┘     │
│   задачі — теж безкоштовно        Скануй — запиши    │
│ ✓ −20% від фінальної ціни         розмову            │
│   для учасників UA WELL                              │
│                                                      │
│         🛡 DSGVO  🔒 Фіксована ціна  🤝 Один партнер  │
│                  📦 Все належить вам                  │
└──────────────────────────────────────────────────────┘
```

### Typography

- **Eyebrow** «ПРОПОЗИЦІЯ»: Poppins 500, 0.7rem–0.85rem, tracked `0.4em`, color `rgba(83,234,253,0.75)`
- **Headline** «Для учасників UA WELL — розмова і рішення безкоштовно.»: Unbounded 700, `clamp(2rem, 4vw, 3.4rem)`, line-height 1.12, letter-spacing `-0.025em`, color `#F0F4F8`, soft glow `0 2px 40px rgba(0,184,219,0.35)`
- **Levers** (3 ✓ items): Poppins 500, `clamp(1.05rem, 1.35vw, 1.35rem)`, line-height 1.45, color `#F0F4F8`. Checkmark `✓` in cyan-400 (`#00d3f2`), 1.25em, gap 0.6em.
- **QR caption** «Скануй — запиши розмову»: Poppins 500 uppercase tracked `0.3em`, `0.8rem`, cyan-300.
- **Ribbon chips**: Poppins 500 `0.75rem`–`0.85rem`, cyan-200 text on `rgba(0,211,242,0.08)` background, `1px solid rgba(83,234,253,0.3)`, rounded-full.

### Fragments

`fragments: 2`
- **fr = 0**: eyebrow + headline visible. Bullets, QR, ribbon hidden. This lets the speaker land the headline before the audience reads ahead.
- **fr = 1**: three levers stagger-in (0.15s between each, fade + y:14).
- **fr = 2**: QR + caption + ribbon land together (0.6s ease).

### QR wiring

- Asset: `src/assets/calendar-qr-code.svg` — provided by user; 1147×1147 black-on-white standard QR.
- Rendered as `<img>` with `src` imported as Vite URL: `import qrUrl from '@/assets/calendar-qr-code.svg'`
- Wrapped in a `~280px` rounded container with `2px solid rgba(83,234,253,0.4)` and faint cyan-300 glow ring, white backdrop preserved (QR requires high contrast for camera decoding).
- Accessible alt: "QR — запис на розмову з Олександром".

### Background

Reuse existing SpaceBackdrop or slide's default transparent background. No new background component — Offer reads faster on quiet canvas.

---

## Slide 29 · Дякую + Q&A

**Goal:** warm thank-you, give the audience who missed the QR one more way to reach out, keep Telegram primary because that's where Oleksandr actually replies.

### Layout

Centered single column.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                                                      │
│                  Дякую.                              │
│                                                      │
│                Питання?                              │
│                                                      │
│    ┌──────────────────┐  ┌──────────────────┐        │
│    │  @webspirio       │  │  @swefd           │        │
│    │  бізнес           │  │  напряму          │        │
│    └──────────────────┘  └──────────────────┘        │
│                                                      │
│       webspirio.com  ·  info@webspirio.com           │
│                                                      │
│                                         ┌────────┐   │
│                                         │   QR   │   │
│                                         └────────┘   │
└──────────────────────────────────────────────────────┘
```

### Typography

- «Дякую.»: Unbounded 800, `clamp(5rem, 12vw, 11rem)`, line-height 1, letter-spacing `-0.04em`, color `#F0F4F8`, soft pulsing glow `0 0 80px rgba(83,234,253,0.4)`.
- «Питання?»: Poppins 500, `clamp(1.2rem, 1.6vw, 1.6rem)`, color `rgba(83,234,253,0.85)`, tracked `0.1em`, uppercase optional (decide in implementation; default lowercase for softer tone).
- **Telegram chips** (2× size vs secondary row):
  - Handle: JetBrains Mono 500, `clamp(1.4rem, 2vw, 2rem)`, cyan-300 with subtle glow
  - Label below handle («бізнес» / «напряму до Олександра»): Poppins 400, `0.8rem`, cyan-200, tracked `0.15em` uppercase
  - Chip: `rgba(0,211,242,0.08)` bg, `1.5px solid rgba(83,234,253,0.45)`, rounded-2xl, padding `1rem 1.75rem`, glow `0 0 40px -10px rgba(0,211,242,0.5)`
- **Secondary row** (site + email): Poppins 400, `clamp(0.95rem, 1.15vw, 1.15rem)`, color `rgba(240,244,248,0.7)`, separator `·` in cyan-400.
- **Small QR**: 140px, bottom-right, `1.5px solid rgba(83,234,253,0.35)`, small caption below «QR → розмова» in `0.7rem` cyan-200 tracked.

### Fragments

`fragments: 2`
- **fr = 0**: «Дякую.» fades up with blur clear and glow pulse (`motion` infinite low-amplitude scale 1 → 1.015).
- **fr = 1**: «Питання?» + Telegram chips + secondary row + small QR land together (0.5s ease, slight stagger 0.08s).

### Why two Telegrams

Reinforces the peer-tone hero opening («Я Олександр, такий самий підприємець як ви»). Business handle = the company presence; personal handle = "поки дзвінок не зіп'ється, напишіть особисто". Tactically removes one friction step for the serious lead.

---

## Supporting Files

### `src/data/contacts.ts` (new)

```ts
export const BOOKING_URL = 'https://calendar.app.google/TODO-SET-BEFORE-DEMO'
export const TELEGRAM_BUSINESS = '@webspirio'
export const TELEGRAM_PERSONAL = '@swefd'
export const EMAIL = 'info@webspirio.com'
export const SITE_URL = 'webspirio.com'
```

`BOOKING_URL` is referenced nowhere in Act 5 directly — the QR image is pre-baked. Constant is still useful for future Korvo/Clickwise demos and for documentation. If QR ever needs regeneration, this is the source of truth.

### No new npm dependency

User provided `src/assets/calendar-qr-code.svg` directly. `qrcode.react` is NOT installed.

### `src/App.tsx` (modified)

New column appended after `act-match`:

```ts
{
  id: 'act-close',
  slides: [
    { id: 'offer', component: OfferSlide, fragments: 2, ... },
    { id: 'thanks', component: ThanksSlide, fragments: 1, ... },
  ],
}
```

Presenter notes per slide — see implementation plan.

### `docs/PROJECT_PLAN.md` (modified)

Act 5 section rewritten:
- 2 slides (Offer + Thanks), not 3
- Pricing slide and 3-year SaaS math dropped with rationale
- New offer terms captured verbatim (free consult, −20% UA WELL, free solution proposal)
- Assets checklist: calendar-qr-code.svg ✅; Telegram + email confirmed; BOOKING_URL still TBD as source-of-truth

---

## Out of scope

- Korvo/Clickwise live demos (Act 4 — separate brainstorm)
- Industry mapper (Act 4 — separate brainstorm)
- Hook + Framework slides (Act 1 — separate brainstorm)
- Pricing slide — dropped by design
- Shirt-spin vs Card-spin cut — separate decision
- Act 3Б numbering collision — tech debt, separate task

## Verification

- `npm run build` passes
- Scoped `npx eslint` on new files passes with no errors
- Manual visual check at `http://localhost:5173/#/4/0` (Offer) and `#/4/1` (Thanks) — out of scope per user's "skip visual review" memory, so no screenshot gate
- Real end-to-end check: 1-minute dry-run with timer from Act 4 Services grid → Offer → Thanks to confirm flow feels complete
