# Webspirio Presentation — Project Plan (v3: Consultative Sales)

> Canonical spec. Claude Code subagents (`slide-builder`, `visual-reviewer`) read this file for context. Store any scope/requirement changes here.

## Project Overview

- **What:** A 15-minute interactive web-based **consultative sales presentation** for Webspirio
- **Who:** UA WELL business community (Ukrainian entrepreneurs in Germany) — mostly non-technical small-business owners (cosmetology, coaching, retail, auto service, construction); a few semi/deep-tech attendees mixed in
- **Language:** Ukrainian (Cyrillic)
- **Goal:** Each attendee finishes the talk thinking _"he was talking about MY business"_ and scans a QR to book a free 30-min audit call
- **Deploy:** GitHub Pages (static build)

### Sales approach (v3 reframe)

This is a **consultative sales deck**, not an agency brochure. It teaches a framework first, then demonstrates fit via real cases, then makes a low-pressure offer. Structural decisions baked in:

| Decision                          | Answer                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Sales shape                       | Consultative — teach first, offer gently                                        |
| Teaching spine                    | Customer journey: **Привабити → Зацікавити → Записати → Обслужити → Повернути** |
| Opening                           | Identity-first — _"Я Олександр, такий самий підприємець як ви"_                 |
| Pricing treatment                 | Ranges, not packages — merged with 3-year SaaS math                             |
| CTA                               | Free 30-min audit call via Google Calendar booking page                         |
| Primary contact on close          | Telegram                                                                        |
| Industry hook                     | Balanced — 6-tile industry mapper replaces Tech Stack slide                     |
| Flagship case                     | LR Health & Beauty funnel (€6k, Mainz, DE+RU, GoHighLevel + InVideo AI)         |
| Pipeline node labels (slides 3–4) | Keep CRM/ERP/AI, add plain-Ukrainian sublabels underneath                       |

Headlines stay in plain Ukrainian across the deck. Acronyms (CRM, ERP, SaaS) only survive as small chips/subtitles so semi-tech attendees can see them without non-tech attendees tripping over them.

---

## Brand Guidelines

### Colors (Cyan palette — primary brand)

| Token    | Hex       | Usage                         |
| -------- | --------- | ----------------------------- |
| Cyan/950 | `#053345` | Deepest backgrounds, overlays |
| Cyan/900 | `#104e64` | Dark sections                 |
| Cyan/800 | `#005f78` | Secondary backgrounds         |
| Cyan/700 | `#007595` | Borders, subtle accents       |
| Cyan/600 | `#0092b8` | Interactive elements          |
| Cyan/500 | `#00b8db` | Primary brand color           |
| Cyan/400 | `#00d3f2` | Primary accent, highlights    |
| Cyan/300 | `#53eafd` | Glow effects, hover states    |
| Cyan/200 | `#a2f4fd` | Light accents                 |
| Cyan/100 | `#cefafe` | Subtle tints                  |
| Cyan/50  | `#ecfeff` | Lightest backgrounds          |

### Additional Colors

- Dark backgrounds: Cyan/950 (`#053345`) or slightly warmer dark navy (`#0A1628`) for main slide backgrounds
- Accent colors: Complementary warm accents (amber, coral) on specific slides for contrast — not everything must be cyan
- Text: Off-white (`#F0F4F8`) for primary text on dark, Cyan/950 for text on light sections
- Gradients: Use the cyan scale for mesh gradients and glow effects

### Typography

**Poppins** is default. Loaded via Google Fonts with Cyrillic subset. JetBrains Mono for code. **Unbounded** (500/600/700/800) loaded for hero + section-divider displays — geometric display face with full Cyrillic subset. Available via the `--font-display` CSS variable.

| Level      | Font           | Weight  | Size | Line Height |
| ---------- | -------------- | ------- | ---- | ----------- |
| H1         | Poppins        | Regular | 64px | 120%        |
| H2         | Poppins        | Regular | 56px | 120%        |
| H3         | Poppins        | Regular | 40px | 120%        |
| H4         | Poppins        | Medium  | 24px | 120%        |
| Body       | Poppins        | Regular | 16px | 140%        |
| Body Small | Poppins        | Regular | 14px | 140%        |
| Mono       | JetBrains Mono | Regular | 14px | 140%        |

Use Unbounded 700 for the hero tagline; 600 for section dividers; 800 for the closing _"Дякую"_. Do not use Unbounded for body copy or cards.

---

## Slide Plan — 28 slides, ~15 minutes

> **Act 3 restructure (2026-04-19):** the three generic case slots (originally slides 12–14 — LR Health & Beauty, Nail Salon, Auto Eder) were replaced with one deep Küchen Fokus story spanning slides 12–18. Slide 15 "Results summary" was dropped; its role is now absorbed by slide 18 (case CTA). Acts 4 and 5 renumber forward by +3 (old 16 → new 19, old 24 → new 27). Original LR/Nail/Auto Eder cases survive as one-line mini-cases inside Act 2 stage slides (6, 8, 9). See `src/App.tsx` for the current registered order.

### Act 1 · Meet + Frame (slides 1–5, ~3 min)

| #   | Slide                 | Content                                                                                                                                           | Duration | Notes                                                                                 |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| 1   | **Hero — Identity**   | Logo + identity subline: _"Я Олександр. 5 років будую цифрові системи для українських підприємців у Німеччині."_                                  | 30s      | Warm, peer-tone. Caption: _"Сьогодні — 15 хв. Без води."_                             |
| 2   | **Hook**              | Full-screen question: _"На якому кроці ви втрачаєте клієнта?"_                                                                                    | 20s      | Hold 3s in silence. Soft aurora backdrop.                                             |
| 3   | **Problem scatter**   | Reworded: _"Більшість малих бізнесів так і працюють — 5 інструментів, які не говорять один з одним."_ Reuses existing `02-Problem.tsx` animation. | 35s      | Keep CRM/ERP/AI labels, add plain-UA sublabels beneath each. Three pain metrics.      |
| 4   | **Solution assembly** | Reworded: _"Можна інакше. Один ланцюг — від першого контакту до повторного клієнта."_ Reuses existing `03-Solution.tsx` animation.                | 35s      | Subtitle as customer journey. Same sublabels as slide 3.                              |
| 5   | **Framework intro**   | 5-stage journey reveals: 👁 Привабити → 👀 Зацікавити → 📅 Записати → 🤝 Обслужити → 🔁 Повернути                                                 | 40s      | Dotted connectors. Closing: _"На якому з них ви зараз — подумайте до кінця розмови."_ |

### Act 2 · Teaching (slides 6–10, ~4 min)

**Shared pattern** — each stage slide has 3 reveal fragments: stage badge + diagnostic question (0) → leak (1) → mini-case with one hard number (2). Shared visual: number badge top-left, 5-dot progress strip top-right, mini-case card at bottom.

| #   | Stage                | Diagnostic Q                                                                  | Leak                                                                | Mini-case                                                                                                                                   |
| --- | -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 6   | **Привабити (1/5)**  | _"Звідки приходить ваш наступний клієнт?"_                                    | Більшість малих бізнесів інвестують в Insta/Ads наосліп.            | **LR Health & Beauty:** 23K підписників TikTok → автоматична воронка, 15–25 Reels/тиждень.                                                  |
| 7   | **Зацікавити (2/5)** | _"Що бачить клієнт за перші 5 секунд на вашому сайті?"_                       | Якщо не зрозуміло «що ви робите» і «чому вам довіряти» — він пішов. | **Küchen Fokus:** повний бренд + сайт за 6 тижнів. [TBD] більше заявок. _(Voiceover mention: Olga Gatlin — 3 мови, клієнти з трьох країн.)_ |
| 8   | **Записати (3/5)**   | _"Як легко записатись до вас прямо зараз, о 11 вечора?"_                      | Кожне пропущене повідомлення — втрачений клієнт.                    | **Nail Salon (Munich):** запис 24/7, нагадування автоматично, [TBD]% менше пропущених візитів.                                              |
| 9   | **Обслужити (4/5)**  | _"Чи можете ви обслужити вдвічі більше клієнтів без вдвічі більшої команди?"_ | Хаос замовлень, ручні рахунки — зростання коштує якості.            | **Auto Eder:** Magento 2 + ERP, [TBD]× замовлень на ту саму команду.                                                                        |
| 10  | **Повернути (5/5)**  | _"Скільки ваших клієнтів повертаються? Ви знаєте точно чи здогадуєтесь?"_     | Залучити нового — у 5× дорожче, ніж повернути старого.              | **LR email nurture:** 4 послідовності (DE/RU × продукт/партнерство), 5–7 листів кожна.                                                      |

### Act 3 · Küchen Fokus case story (slides 11–19, ~2.5 min)

One deep seven-slide narrative replaces the original three-case-study slot. Through-line motif: the question bubble «А візитка є?» recurs across slides 12, 13, 15 (fragment 6) and 16; retires on slide 16. Silhouette of entrepreneur recurs in 12, 13, 16, with pose shifts signalling the arc (hunched on 12/13 → pointing on 16).

| #   | Slide                         | Content                                                                                                                                                                                       | Duration |
| --- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 11  | **Section divider**           | _"Повна картина — одна історія, від нуля до бренду."_ Bridges the framework acts into the Küchen Fokus narrative.                                                                            | 10s      |
| 12  | **Case · Hook**               | Silhouette (40%) + drifting bubble «А візитка є? А сайт у вас є?» + muted sub-caption. Sets tone: entrepreneur without a brand. `fragments: 2`.                                              | ~15s     |
| 13  | **Case · Tension**            | Три «нє»: немає назви, немає сайту, немає візитки. Coral strike-through per tag. Faded bubble recap in top-right corner. `fragments: 3`.                                                     | ~20s     |
| 14  | **Case · Ask**                | Centred client quote, word-by-word reveal: _"Хлопці, мені потрібно все. Я навіть не знаю, з чого почати."_ Attribution: _Клієнт · перше звернення._ `fragments: 1`.                          | ~10s     |
| 15  | **Case · Journey**            | Seven-fragment set piece. Progress strip across top. Deliverables build a 2×2 board: Назва → Домен → Логотип → Сайт → Korvo AI → Візитка → Футболка. Caption swaps per fragment. `fragments: 7`. | ~60s     |
| 16  | **Case · Тепер (After)**      | All deliverables composed together. Silhouette upright, pointing at card / shirt / site as each caption reveals. `fragments: 3`.                                                             | ~20s     |
| 17  | **Case · Візитка 3D**         | Fullscreen interactive business card. Real front/back artwork; hover tilts, drag spins with inertia, keyboard fallback (←/→/Space). Presenter-paced, 5–10 s ambient demo.                   | ~10s     |
| 18  | **Case · Punchline**          | _"Ми не робимо сайти. Ми робимо компанії видимими."_ — second line in cyan-400 with glow pulse. `fragments: 1`.                                                                              | ~10s     |
| 19  | **Case · CTA**                | Persistent Webspirio logo + one line: _"Один партнер. Повний пакет. Один дзвінок."_ Contact chip: `webspirio.de`.                                                                           | ~5s      |

**Shared case anatomy (this sequence):** cinematic cuts · dark cyan-950 stage · Unbounded display for hero beats · one strong motion per slide · recurring question-bubble + silhouette motifs. Rebuilt hand-rolled SVG/CSS mockups (browser chrome, business card, t-shirt, Korvo chat) live under `src/components/mockups/`. Registry lives in `src/App.tsx`; components at `src/slides/12-CaseHook.tsx`..`19-CaseCta.tsx`.

**Backup (not in active deck):** the original LR flagship, Nail Salon and Auto Eder "full case" slides were demoted to backup. If presenter needs a quick cross-case summary, that content survives as one-line mini-cases inside slides 6, 8, 9 (Attract, Book, Serve). Standalone full-case slides can be re-introduced later as a separate batch without disturbing the Küchen Fokus sequence.

### Act 4 · Match + Scope (slides 20–25, ~4 min)

> Renumbered +4 due to Act 3 restructure (including the 3D business-card slide). Note: slide 22 ("Бренд під ключ + візитки") now fully redundant after the Küchen Fokus journey + 3D card slide — drop or repurpose when Act 4 is built.

| #   | Slide                                     | Content                                                                                                          | Duration |
| --- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| 20  | **Industry mapper** (replaces Tech Stack) | 3×2 tile grid mapping to audience sectors. See table below.                                                      | 45s      |
| 21  | **Services grid**                         | 8 outcome-first cards, tech chips as secondary labels                                                            | 30s      |
| 22  | **Бренд під ключ + візитки** (merged)     | 7-step branding pipeline (left) + 3D-flipping business card mockup (right). Overlap with slides 15 + 17 — drop or repurpose. | 30s      |
| 23  | **Korvo — overview + LIVE DEMO**          | 2 fragments: feature overview → chat widget with pre-seeded _"Скільки коштує манікюр?"_ exchange                 | 60s      |
| 24  | **Clickwise — overview + LIVE DEMO**      | 2 fragments: GA-alternative pitch → dashboard with Insta→site→conversion flow. Subtitle: "Побудовано на Rybbit". | 45s      |
| 25  | **Як ми працюємо**                        | 5-step timeline: Розмова (30хв) → Ескіз → Показуємо по дорозі → Запуск → Супровід                                | 30s      |

**Slide 20 — Industry mapper tiles (3×2 grid):**

| Icon | Industry                            | Top line                                 | Bullets                                                | Tool chips                        |
| ---- | ----------------------------------- | ---------------------------------------- | ------------------------------------------------------ | --------------------------------- |
| 💅   | Бʼюті / масаж / косметологія        | _"Клієнти записуються самі, 24/7"_       | Онлайн-запис · Нагадування · Insta автовідповіді       | Altegio · Korvo · n8n             |
| 🎯   | Коучі / нутриціологи / консультанти | _"Бренд, воронка і оплата — все онлайн"_ | Лендінг + календар · Email-розсилки · Приймання оплати | WordPress · Calendly · Stripe     |
| 🚗   | Автосервіс / дилер авто             | _"Замовлення і склад без хаосу"_         | Роботодатки · Облік запчастин · Відгуки                | Magento · ERPNext · Rybbit        |
| 🔨   | Ремонти / будівництво               | _"Ліди з сайту, рахунки в один клік"_    | Лендінг-портфоліо · Форма заявок · Автоматичні рахунки | WordPress · Invoice Ninja · n8n   |
| 🛒   | Роздріб / невеликий магазин         | _"Магазин, який ви контролюєте"_         | Інтернет-магазин · Склад · Касові звіти                | WooCommerce · Magento · Clickwise |
| 🏢   | B2B / корпоративні послуги          | _"CRM, пропозиції, повторні клієнти"_    | Кабінет клієнта · CRM · Пропозиції                     | Власні рішення · ERPNext · Korvo  |

Footer: _"Не бачите вашої галузі? Адаптуємось."_ Tile-glow triggered via fragment index so each tile lights up as Oleksandr names the industry.

### Act 5 · Offer + Close (slides 26–28, ~2 min)

| #   | Slide                             | Content                                                                                                                                                                                                                                                                | Duration |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 26  | **Вартість + 3-річна математика** | Fragment 0: ranges (Сайт €2–5k · Воронка €6–12k · Супровід €200/міс). Fragment 1: 3-year SaaS comparison bar chart (Shopify €14,364 · Wix €5,724 · per-seat CRM €9,000 · Webspirio build €6–10k). Caption: _"Підписка тихо зʼїдає. Власний продукт — один раз і ваш."_ | 45s      |
| 27  | **The Offer**                     | Headline: _"Для учасників UA WELL — безкоштовна 30-хв розмова."_ 3 ✓ bullets. Large QR → Google Calendar booking page. Pillar badges ribbon: 🛡 DSGVO · 🔒 Фіксована ціна · 🤝 Один партнер · 📦 Все належить вам.                                                     | 40s      |
| 28  | **Дякую + Q&A**                   | _"Дякую."_ (Unbounded 800). Primary contact: **Telegram** (2× size of other contacts). Secondary row: site + email. Second QR bottom-right → same booking link.                                                                                                        | 30s      |

---

## Services (slide 21, 8 outcome-first cards)

1. _"Облік, рахунки, склад — в одному вікні"_ · chips: **ERPNext · Invoice Ninja · Kimai**
2. _"Система запису клієнтів"_ · chips: **Altegio · власні CRM**
3. _"AI-асистент на сайті"_ · chips: **Korvo**
4. _"Єдина скринька — WhatsApp + Instagram + Telegram"_ · chips: **native + custom**
5. _"Автоматизація повторних задач"_ · chips: **n8n**
6. _"Вебсайти та інтернет-магазини"_ · chips: **WordPress · Magento · WooCommerce**
7. _"Аналітика без витоку даних"_ · chips: **Clickwise · Rybbit**
8. _"Бренд і дизайн"_

---

## Technical Architecture

### Presentation Engine — Custom React (NOT reveal.js)

Fully custom slide engine in `src/engine/` supporting:

- **Keyboard navigation:** Arrow keys ←→ horizontal, ↑↓ vertical sub-slides, Space/PageDown forward
- **Scroll navigation:** Mouse wheel / trackpad with smooth scroll-snap
- **Touch:** Swipe on mobile
- **Navigation dots:** Clickable on the right side
- **URL hash routing:** `#/col/row[/fragment]` — trailing fragment omitted for fragment 0
- **Progress bar:** Top of screen
- **Fullscreen:** `F` key
- **Presenter notes overlay:** `N` key
- **Timer:** `T` for countdown overlay
- **Fragments:** reveal.js-style incremental reveals within a slide. See `CLAUDE.md` for the authoring convention (`fragment >= K` gating, `SlideConfig.fragments: N`).

### Transitions

Framer Motion `AnimatePresence`. Each slide defines its own entry/exit. Default: fade + subtle scale. Section dividers: dramatic transitions (blur, zoom, wipe).

### Project Structure

```
webspirio-presentation-2026-04/
├── public/assets/{images,logos,fonts}/
├── src/
│   ├── engine/          # Presentation, Slide, Navigation, hooks, types
│   ├── slides/          # 01-Hero.tsx ... 24-Thanks.tsx
│   ├── demos/           # KorvoChatDemo, ClickwiseDashboard
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── react-bits/  # ReactBits TS-TW ports
│   │   ├── PipelineNode / PipelineConnector / BrokenConnector
│   │   ├── AnimatedCounter / WebspirioLogo
│   │   └── DarkVeil / Aurora / SpaceBackdrop
│   ├── animations/      # variants, transitions, hero/problem/solution timelines
│   ├── data/            # funnelDiagram, services, caseStudies
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Development Approach — Incremental Batches

**Do NOT build all slides at once.** Build in batches of 2–3 slides per CLAUDE.md rule. After each batch: visual review (screenshots at 1920×1080 + 375×667) + copy review before proceeding.

### Batch 1 · Plan sync + reword (current)

- Rewrite this `PROJECT_PLAN.md` to 24-slide structure ✓
- Add `NODE_SUBLABELS` to `src/animations/problemTimeline.ts`
- Extend `PipelineNode` to accept optional `sublabel` prop
- Update `01-Hero.tsx` — add identity subline fragment
- Update `02-Problem.tsx` — new headline, render sublabels
- Update `03-Solution.tsx` — new headline, new subtitle, render sublabels
- Reorganize `src/App.tsx` — 5-act column structure, remove `FounderSlide`

### Batch 2 · Act 1 new slides (2-Hook, 5-Framework)

- Hook slide: full-screen question with aurora backdrop
- Framework slide: 5-stage journey reveal with dotted connectors

### Batch 3 · Act 2 teaching batch A (slides 6–8)

- Attract, Interest, Book stages

### Batch 4 · Act 2 teaching batch B (slides 9–10)

- Serve, Retain stages

### Batch 5 · Act 3 Küchen Fokus case — part A (slides 11–14) ✓ (2026-04-19)

- Section divider (already registered) · Hook · Tension · Ask
- Net-new primitives built: `EntrepreneurSilhouette`, `QuestionBubble`.

### Batch 6 · Act 3 Küchen Fokus case — part B (slides 15–18) ✓ (2026-04-19)

- Journey (7-fragment set piece) · Тепер · Punchline · CTA
- Net-new mockup primitives built: `BrowserFrame`, `SitePreview`, `BusinessCard`, `TShirt`, `ChatBubbles`, `KuchenFokusLogo` (all under `src/components/mockups/`).

### Batch 7 · Act 4 match batch A (slides 19–21)

- Industry mapper · Services grid · Branding turnkey (reassess — overlap with slide 15 Journey)

### Batch 8 · Act 4 match batch B (slides 22–24)

- Korvo demo · Clickwise demo · How we work

### Batch 9 · Act 5 close (slides 25–27)

- Pricing + 3-year math · Offer · Thank you

### Batch 10 · Final polish

- Replace all `[TBD]` numbers with confirmed values
- Set Google Calendar booking URL + Telegram handle
- Full-deck visual review at 1920×1080 + 375×667
- 15-min rehearsal · Lighthouse > 90

---

## Quality Targets

- **Lighthouse:** > 90 on Performance, Accessibility, Best Practices
- **Animation frame rate:** 60 fps on presenting hardware (devcontainer uses software WebGL — ignore FPS there)
- **Projector resolution:** 1920×1080 — test on this viewport before shipping
- **Fonts:** Poppins + Unbounded load with Cyrillic subset (no FOUT of missing glyphs)
- **No console errors**
- **Browsers:** Chrome, Firefox, Safari
- **Responsive:** 1920×1080 and 375×667 mobile
- **Copy:** apostrophes `ʼ` (U+02BC), guillemets `«»`, no English acronyms in headlines

---

## Assets Checklist

- [ ] Webspirio logo (SVG) — already in `src/components/WebspirioLogo.tsx`
- [ ] Photo of Oleksandr (optional, for Hero slide)
- [ ] LR Health & Beauty funnel diagram — port `funnel-diagram.jsx` from that project
- [ ] LR Reels thumbnail mockups (3–4 preview Reels)
- [ ] Client website screenshots: Auto Eder, Küchen Fokus, Olga Gatlin, Nail Salon
- [ ] Korvo chat widget UI (pre-seeded conversation)
- [ ] Clickwise dashboard mock (traffic-source breakdown)
- [ ] Business card designs (front/back, for 3D flip)
- [ ] Google Calendar booking page URL (for CTA QR)
- [ ] Telegram handle (confirmed)
- [ ] Exact `[TBD]` numbers for all mini-cases + case studies + results summary
- [ ] Verified EU Shopify/Wix pricing for 3-year math chart

---

## ReactBits Components

Installed via shadcn CLI using the `@reactbits-starter` registry. Requires `REACTBITS_LICENSE_KEY` in `.env.local`. Catalog in `src/SKILL.md`.

Planned usage:

- **Already installed:** BlurHighlight (slide 4 headline)
- **Candidates:** SplitText (hook + framework headings), Aurora (hook background), SpotlightCard (industry mapper tiles), AnimatedCounter (results summary), ClickSpark (CTA/QR interactions), Noise (subtle texture on dark backgrounds)

Install per-slide with `-tw` suffix. Customize colors to the cyan palette before shipping. Default ReactBits palettes must not ship — always retheme.

---

## What NOT to do (project-specific, see also `CLAUDE.md`)

- Don't hardcode hex colors in slides; use `cyan-*` Tailwind classes (raw hex only for gradients/glows)
- Don't put acronyms (CRM, ERP, SaaS) in headlines — chip/subtitle only
- Don't ship default ReactBits palettes — always retheme to cyan
- Don't use GDPR in copy — use **DSGVO** (audience is in Germany)
- Don't say "Self-hosted" — use _"Все належить вам"_
- Don't add a dedicated "Why Webspirio" slide — pillars collapse into badges on the Offer slide
- Don't add pricing packages — use ranges (see slide 22)
- Don't add testimonials as their own slide — embed client quotes inside case slides where they fit
- Don't re-brainstorm inside `slide-builder` — orchestrator hands it a concrete spec
- Don't ship with any `[TBD]` numbers still visible
- Don't run `npm run deploy` without explicit user confirmation
