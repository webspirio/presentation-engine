# Voice AI Showcase slide — Design Spec

**Date:** 2026-04-21
**Author:** Oleksandr + Claude
**Status:** Approved, building

## Context

Act 4 (Match + Scope) currently has two slides: `services-grid` and `team`. Between them the deck claims "we build AI assistants" but shows nothing concrete. This slide fills that gap with a real video demo: a Ukrainian-language voice agent ("Ліра") autonomously calling three grooming salons in Kyiv, asking unprompted follow-ups from context, and reporting back with a price/availability comparison.

The demo is authored by **Denis Volosov** (instagram.com/volosovdenis). Webspirio is **not** claiming it's our build — we're showing it as a tangible reference of the capability class and saying *"таких агентів ми теж будуємо"*.

### Why this lands

- Teaching acts already established connected AI tools exist (slide 9). This is the visceral proof.
- The dog-grooming errand is recognizable to the non-technical UA WELL audience. No enterprise jargon.
- Denis's own line in the video — *"Це майбутнє, все."* — is exactly the emotional note we want the audience on before we move to Team + Offer.

### Deck position

Inserted as a new slide **after `services-grid` and before `team`** in the `act-match` column in `src/App.tsx`. ~30-40 s runtime (presenter will scrub to punchy segments, not play all 2 min).

---

## Layout

Split 50/50 at ≥1024px, stacked on narrow viewports. Dark cyan-950 backdrop.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│ ┌─────────────────────────┐  AI-агент, який дзвонить сам.   │
│ │                         │                                  │
│ │                         │  Голосова асистентка обдзвонює   │
│ │     VIDEO (autoplay     │  три грумінг-салони в Києві —    │
│ │      muted, click to    │  сама.                           │
│ │      unmute, native     │                                  │
│ │      controls)          │  📞 Дзвонить самостійно          │
│ │                         │     Представляється, веде розмову│
│ │                         │                                  │
│ │                         │  🧠 Ставить уточнення з контексту│
│ │                         │     Сама запитала про вагу       │
│ │   @volosovdenis (chip)  │     песика — без промпту         │
│ └─────────────────────────┘                                  │
│                              📋 Звітує з порівнянням         │
│                                 3 салони · ціни · вільні     │
│  Таких агентів ми теж будуємо — під ваш бізнес.              │
│  Демо · Denis Volosov · instagram.com/volosovdenis           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Typography

- **Headline** «AI-агент, який дзвонить сам.»: Unbounded 600, `clamp(2rem, 3.2vw, 2.8rem)`, line-height 1.12, letter-spacing `-0.02em`, color `#F0F4F8`. Cyan-400 (`#00d3f2`) accent span on «дзвонить сам» with soft glow `0 2px 24px rgba(0,211,242,0.35)`.
- **Subline**: Poppins 400, `clamp(1rem, 1.15vw, 1.15rem)`, cyan-200/80.
- **Icon row titles**: Poppins 600, `1.05rem`, color `#F0F4F8`.
- **Icon row subs**: Poppins 400, `0.9rem`, cyan-200/65, line-height 1.4.
- **Icons**: Lucide, `PhoneCall`, `Brain`, `ClipboardList`, 22px, stroke `#00d3f2`, inside 44×44 rounded-square chips `rgba(0,211,242,0.1)` with `1px solid rgba(83,234,253,0.3)`.
- **Footer line**: Poppins 500 italic, `clamp(0.9rem, 1.05vw, 1rem)`, cyan-200.
- **Attribution line**: Poppins 400, `0.8rem`, cyan-200/50, bottom-left under the footer.
- **Author chip** on video: Poppins 500, `0.75rem`, cyan-100 on `rgba(5,51,69,0.75)` backdrop, rounded-full, top-right inside video frame, `8px 12px` padding.

### Colors

- Background: transparent (stage background is cyan-950 per deck default).
- Video frame: `1px solid rgba(83,234,253,0.25)`, `rounded-2xl`, subtle box-shadow `0 12px 48px -12px rgba(0,184,219,0.4)`.
- Icon chips: see typography.

## Fragments

`fragments: 3` — three icon rows stagger in.

| fr | State |
|----|-------|
| 0 | Video + headline + subline + footer line visible. Icon rows hidden. |
| 1 | Row 1 (PhoneCall) reveals. |
| 2 | Row 2 (Brain) reveals. |
| 3 | Row 3 (ClipboardList) reveals. |

Attribution line is visible from fragment 0 (honesty-first — author credit is not an "afterthought reveal").

## Video behavior

- File: `public/assets/video/ai-agent-calling-showcase.mp4` (42 MB, already committed).
- Element: native `<video>` with `controls`, `playsInline`, `preload="metadata"`.
- On `isActive=true`: `muted=true`, `play()` via effect after fragment 0 paints.
- On `isActive=false`: `pause()` and reset `currentTime=0` so returning to the slide restarts fresh.
- Click on video surface: unmutes (toggles `muted`). Native controls also work.
- `aria-label`: *"Демо: AI-агент Ліра дзвонить у грумінг-салони. Автор — Denis Volosov."*

## Animation

- Reuse `fadeInUp` from `src/animations/variants.ts` for the icon rows, 120ms stagger.
- Headline + subline: single fade-in with `easeSmooth` (0.5s) on `isActive`.
- Video frame: fade + subtle scale (0.98 → 1.0) on `isActive`.
- Respect `useReducedMotion()` — skip stagger, snap to visible.

## Attribution policy

- On-slide chip + footer credit are mandatory — the video is borrowed, not ours.
- Author chip is plain text, not a link (no outbound navigation from a live slide — presenter won't be clicking).
- Footer URL is readable but not hyperlinked for the same reason.

## File changes

1. **New:** `src/slides/22-VoiceAiShowcase.tsx` — exports `VoiceAiShowcaseSlide`.
2. **Edit:** `src/App.tsx` — import + register the slide in `act-match` column between `services-grid` and `team`. Title: `Voice AI`. Fragments: 3. `showCenterLogo: false`, `background: 'transparent'`, presenter notes covering the 3 beats.

### Renumbering

Currently slide numbers in filenames are already loosely ordered (20-CaseCta, 21-ServicesConstellation, 22-LrDivider, 30-Team). A file named `22-VoiceAiShowcase.tsx` would collide with `22-LrDivider.tsx`. Resolution: name it **`31-VoiceAiShowcase.tsx`** (outside the current numbering cluster) since prefix numbers in this repo are organizational, not semantic — the canonical order lives in `src/App.tsx`. This matches the pattern of `30-Team.tsx` which was added out of numeric order.

No other files need changes. No new dependencies.

## Success criteria

- `npm run build` passes.
- Slide registered at `#/act-match/2` (after services-grid which is `/act-match/1` and team which becomes `/act-match/3`).
- Video autoplays muted when slide becomes active; pauses + resets on leave.
- Clicking video unmutes; native controls function.
- Three icon rows stagger in on fragment advances.
- Author credit visible on slide (chip + footer) on entry.
- Works at 1920×1080; falls back to stacked layout below 1024px.
- No console errors.

## Out of scope

- Subtitles/captions track — voice is Ukrainian, audience is Ukrainian-speaking, subtitles would add noise.
- Transcript modal — the punchy moments are ≤40s and presenter will narrate if needed.
- Linkified attribution — intentionally plain text.
- Poster image extraction — `preload="metadata"` shows the first frame which is fine.
