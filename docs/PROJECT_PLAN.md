# Webspirio Presentation — Project Plan & Claude Code Prompt (v2)

> This is the canonical project plan. Store any scope/requirement changes here — Claude Code reads this file for context.

## Project Overview

- **What:** A 15-minute interactive web-based business presentation for Webspirio
- **Who:** UA WELL business community (Ukrainian entrepreneurs in Germany)
- **Language:** Ukrainian (Cyrillic)
- **Goal:** Establish Webspirio as the most professional, capable digital agency in the room. Every slide should communicate: "We build world-class digital solutions."
- **Deploy:** GitHub Pages (static build)

---

## Webspirio Brand Guidelines

### Colors (Cyan palette — primary brand)

| Token | Hex | Usage |
|-------|-----|-------|
| Cyan/950 | `#053345` | Deepest backgrounds, overlays |
| Cyan/900 | `#104e64` | Dark sections |
| Cyan/800 | `#005f78` | Secondary backgrounds |
| Cyan/700 | `#007595` | Borders, subtle accents |
| Cyan/600 | `#0092b8` | Interactive elements |
| Cyan/500 | `#00b8db` | Primary brand color |
| Cyan/400 | `#00d3f2` | Primary accent, highlights |
| Cyan/300 | `#53eafd` | Glow effects, hover states |
| Cyan/200 | `#a2f4fd` | Light accents |
| Cyan/100 | `#cefafe` | Subtle tints |
| Cyan/50  | `#ecfeff` | Lightest backgrounds |

### Additional Colors (use where they fit)
- **Dark backgrounds:** Cyan/950 (`#053345`) or slightly warmer dark navy (`#0A1628`) for main slide backgrounds
- **Accent colors:** Complementary warm accents (amber, coral) on specific slides for contrast — not everything must be cyan
- **Text:** Off-white (`#F0F4F8`) for primary text on dark, Cyan/950 for text on light sections
- **Gradients:** Use the cyan scale for mesh gradients and glow effects

### Typography (Primary: Poppins)

| Level | Font | Weight | Size | Line Height |
|-------|------|--------|------|-------------|
| H1 | Poppins | Regular | 64px | 120% |
| H2 | Poppins | Regular | 56px | 120% |
| H3 | Poppins | Regular | 40px | 120% |
| H4 | Poppins | Medium | 24px | 120% |
| Body | Poppins | Regular | 16px | 140% |
| Body Small | Poppins | Regular | 14px | 140% |
| Mono | JetBrains Mono | Regular | 14px | 140% |

**Note:** Poppins supports Cyrillic. On specific slides where a different aesthetic fits (hero, section dividers), a bolder alternative like Unbounded or a dramatic serif is acceptable. Not every slide needs the same font — variety is good when intentional.

---

## Slide Plan (~15 minutes, ~27 slides)

### Act 1: Hook & Credibility (2 min, slides 1-4)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 1 | **Hero** | Logo + animated tagline: "Від ідеї до цифрової екосистеми" | 15s | Particle/aurora background, dramatic entrance |
| 2 | **The Problem** | "Ваш бізнес працює на Excel, WhatsApp і купі відкритих вкладок?" | 30s | Pain points stagger in one-by-one |
| 3 | **The Solution** | "Ми з'єднуємо все в одну систему" — animated pipeline | 30s | Flow: Website → CRM → ERP → Автоматизація → AI → Аналітика |
| 4 | **Who We Are** | Oleksandr intro + animated stats | 30s | Photo, location badge, counter animations |

### Act 2: Case Studies & Results (5 min, slides 5-11)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 5 | **Section: Case Studies** | "РЕАЛЬНІ РЕЗУЛЬТАТИ" | 10s | Dramatic section divider |
| 6 | **Case: Auto Eder** | Magento 2 automotive e-commerce | 60s | Performance metrics, tech details |
| 7 | **Case: Küchen Fokus** | Kitchen company — full brand + site | 45s | Branding showcase |
| 8 | **Case: Olga Gatlin** | Attorney — multilingual, SEO, legal compliance | 45s | 3-language site demo |
| 9 | **Case: Nail Salon** | Altegio CRM, online booking, automation | 30s | System integration diagram |
| 10 | **Results Summary** | Counter cards: projects, hours saved, satisfaction, revenue | 30s | 4x AnimatedCounter |
| 11 | **Testimonials** | 2-3 client quotes | 30s | Carousel/rotation |

### Act 3: Branding & Business Identity (2 min, slides 12-14)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 12 | **Section: Бренд під ключ** | "ВАШ БРЕНД — ВІД НАЗВИ ДО ВІЗИТКИ" | 10s | Section divider |
| 13 | **Full Branding Service** | Complete brand creation pipeline | 45s | 7-step pipeline animation |
| 14 | **Business Cards** | Design + printing + delivery | 30s | 3D card flip mockup |

**Slide 13 — Бренд під ключ (Full Branding Service):**
Animated pipeline showing the complete service:
1. Вибір назви (name research, domain check, trademark check)
2. Логотип (logo design — multiple concepts, revisions)
3. Дизайн-система (colors, fonts, patterns, brand book)
4. Реєстрація домену (domain registration)
5. Вебсайт (WordPress/WooCommerce site in brand style)
6. Візитки (business cards — design + print outsourcing)
7. Соц мережі (social media templates, profile branding)

Key message: "Один партнер робить ВСЕ. Не потрібно координувати 5 фрілансерів."

**Slide 14 — Візитки та друк (Business Cards):**
- Showcase: 3D animated business card mockup (front/back flip)
- Process: Дизайн → Затвердження → Друк → Доставка
- Types: Standard, Premium (soft-touch), Luxury (spot UV, foil)
- "Від дизайну до ваших рук за 7 днів"
- This slide should look PREMIUM — the card itself is the product

### Act 4: Products & Live Demos (4 min, slides 15-20)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 15 | **Section: Products** | "НАШІ ПРОДУКТИ" | 10s | Section divider |
| 16 | **Korvo AI Chatbot** | Features overview | 45s | Animated feature cards |
| 17 | **LIVE DEMO: Korvo** | Working chatbot widget in slide | 60s | Interactive component |
| 18 | **Clickwise Analytics** | Features overview | 30s | Dashboard mockup |
| 19 | **LIVE DEMO: Analytics** | Interactive dashboard in slide | 45s | Interactive component |
| 20 | **Why Not SaaS?** | Cost comparison table | 30s | Webspirio vs Shopify/Wix/per-user |

### Act 5: Services & Process (2 min, slides 21-24)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 21 | **Services Grid** | 8 service categories (interactive) | 30s | Added: CRM systems, Business automation |
| 22 | **Tech Stack** | Technology constellation | 20s | Animated logo grid |
| 23 | **How We Work** | 5-step process timeline | 20s | Animated stepper |
| 24 | **Pricing** | 3 package cards + monthly plans | 30s | Starter / Professional / Enterprise |

### Act 6: Close & CTA (2 min, slides 25-27)

| # | Slide | Content | Duration | Notes |
|---|-------|---------|----------|-------|
| 25 | **Why Webspirio** | 4 pillars: GDPR, Fixed pricing, One partner, Self-hosted | 30s | Icon cards |
| 26 | **Special Offer** | "Безкоштовний IT-аудит для UA WELL" | 20s | Glowing CTA |
| 27 | **Дякую + Contact** | Thank you + QR + all contact info + Q&A | 30s | Closing animation |

---

## Services (Slide 21)

1. Вебсайти та інтернет-магазини (WordPress, Magento 2, WooCommerce)
2. Брендинг та дизайн (logos, brand books, business cards, social media templates)
3. ERP та бізнес-системи (ERPNext, Invoice Ninja, Kimai)
4. AI-чатботи (Korvo — custom AI sales assistants)
5. Аналітика (Clickwise, Rybbit — GDPR-compliant GA alternative)
6. Автоматизація процесів (n8n workflows, custom integrations)
7. Омніканал комунікації (WhatsApp + Instagram + Telegram → one inbox)
8. CRM-системи (Altegio, custom CRM setups, client portals, online booking)

---

## Technical Architecture

### Presentation Engine — Custom React (NOT reveal.js)

Fully custom slide engine supporting:
- **Keyboard navigation:** Arrow keys ←→ for horizontal, ↑↓ for vertical sub-slides
- **Scroll navigation (PRIMARY):** Mouse wheel / trackpad scroll moves between slides. Smooth scroll-snap.
- **Touch:** Swipe on mobile
- **Navigation dots:** Clickable on the right side
- **URL hash routing:** `#/1`, `#/2` for direct linking
- **Progress bar:** Top of screen
- **Fullscreen:** `F` key
- **Presenter notes:** `N` key
- **Timer:** `T` for countdown overlay
- **Scroll-driven sections:** Some slides can have vertical sub-slides

### Transitions

Framer Motion `AnimatePresence`. Each slide defines its own entry/exit. Default: fade + subtle scale. Section dividers: dramatic transitions (blur, zoom, wipe).

### Project Structure

```
webspirio-presentation/
├── public/assets/{images,logos,fonts}/
├── src/
│   ├── engine/          # Presentation, Slide, Navigation, hooks, types
│   ├── slides/          # 01-Hero.tsx ... 27-Thanks.tsx
│   ├── demos/           # KorvoChatDemo, AnalyticsDashboard
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── AnimatedCounter, SectionDivider, CaseStudyCard,
│   │   │   ServiceCard, BusinessCardMockup, PipelineFlow
│   ├── animations/      # variants, transitions, hooks
│   ├── data/            # slides, services, caseStudies, stats
│   ├── styles/globals.css
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Development Approach — Incremental Tasks

**Do NOT build all slides at once.** Build in batches of 2-3 slides. After each batch: review, refine animations, fix issues, then proceed. Quality over speed.

### Task 0: Project Setup & Slide Engine
Foundation — devcontainer, Vite scaffold, shadcn/ui init, ReactBits registry, brand theme, scroll-snap engine, keyboard nav, hash routing, progress bar, dots, presenter overlay, one Hero test slide.

### Task 1: Hero + Problem + Solution (slides 1-3)
**Checkpoint:** Transitions smooth? Scroll feels good? Dark theme right?

### Task 2: About + Section Divider + First Case Study (slides 4-6)
**Checkpoint:** Case study template reusable? Counters smooth?

### Task 3: Remaining Case Studies + Results + Testimonials (slides 7-11)
**Checkpoint:** All case studies consistent? Carousel rotating?

### Task 4: Branding Section (slides 12-14)
**Checkpoint:** Business card mockup looks premium? Pipeline clear?

### Task 5: Products Overview (slides 15-16, 18)
**Checkpoint:** Product descriptions clear? Feature cards solid?

### Task 6: Interactive Demos (slides 17, 19)
**Checkpoint:** Demos flawless? No lag? Clear interaction?

### Task 7: Price Comparison + Services Grid (slides 20-22)
**Checkpoint:** Comparison compelling? Services grid responsive?

### Task 8: Process + Pricing + Close (slides 23-27)
**Checkpoint:** Close strong? CTA compelling? Contact info clear?

### Task 9: Polish & Deploy
Replace placeholders, mobile pass, Lighthouse > 90, 60fps everywhere, GitHub Pages deploy, projector test, 15-min rehearsal.

---

## Quality Targets

- **Lighthouse:** > 90 on Performance, Accessibility, Best Practices
- **Animation frame rate:** 60fps on all transitions
- **Projector resolution:** 1920x1080 — test on this viewport before shipping
- **Fonts:** Poppins loads with Cyrillic subset (no FOUT of missing glyphs)
- **No console errors**
- **Browsers:** Chrome, Firefox, Safari
- **Responsive:** 1920x1080 and 375px mobile

---

## Assets Checklist

- [ ] Webspirio logo (SVG)
- [ ] Professional photo of Oleksandr
- [ ] Client website screenshots (Auto Eder, Küchen Fokus, Olga Gatlin, Nail Salon)
- [ ] Korvo chatbot UI screenshot
- [ ] Business card designs (VIELBAU, Olga Gatlin, etc.)
- [ ] Brand assets (social media templates, brand book pages)
- [ ] Exact stats/numbers
- [ ] Client testimonial quotes

---

## ReactBits Components

Installed via shadcn CLI using the `@react-bits` registry. Pro components require a ReactBits Pro license — if a Pro component fails to install, recreate the effect with Framer Motion + CSS.

Planned usage:
- **Free:** SplitText, Aurora, SpotlightCard, AnimatedCounter, ClickSpark, Noise
- **Check if Pro:** LetterGlitch, TiltedCard, StarBorder, TextPressure, ShinyText, PixelTransition, Magnet
