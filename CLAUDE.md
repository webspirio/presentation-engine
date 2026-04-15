# Webspirio Presentation — Claude Context

**Full plan:** [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md) — canonical spec for slide numbers, content, and scope. Read this before starting any slide task.

**Setup guide:** [`docs/CLAUDE_SETUP.md`](docs/CLAUDE_SETUP.md) — MCP, subagents, hooks, workflow patterns (recommendations).

## What this project is

15-minute Ukrainian-language business presentation built as a **custom React slide engine** (NOT reveal.js). Deploys to GitHub Pages. Audience: Ukrainian entrepreneurs in Germany at UA WELL. **Visual polish is the actual deliverable** — compile-clean ≠ done.

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (configured inline in `src/index.css` via `@theme` — there is no `tailwind.config.ts`)
- Framer Motion — import from `motion/react` (package is `motion`, not `framer-motion`)
- shadcn/ui — `style: radix-nova`, `baseColor: neutral`, `iconLibrary: lucide`; aliases `@/components`, `@/lib/utils`, etc.
- ReactBits — shadcn registries `@reactbits-starter` (88 animated components, any paid tier) and `@reactbits-pro` (120+ page-section blocks — wrong granularity for slides, skip). Requires `REACTBITS_LICENSE_KEY` in `.env.local`. Catalog + install protocol: `src/SKILL.md`. Install per-slide with `-tw` suffix; customize colors to the cyan palette.
- `recharts` for the analytics demo
- `gh-pages` for deploy (`npm run deploy`)

## Brand tokens

Use Tailwind `cyan-*` classes (they match the brand palette). Only use raw hex for CSS values that can't be expressed as classes (custom gradients, box-shadow glow, etc.).

| Token | Hex | Common use |
|-------|-----|------------|
| cyan-950 | `#053345` | Primary dark background |
| cyan-900 | `#104e64` | Secondary dark |
| cyan-500 | `#00b8db` | Primary brand |
| cyan-400 | `#00d3f2` | Primary accent |
| cyan-300 | `#53eafd` | Glow, hover, light accent text |

Text on dark: off-white `#F0F4F8`. Warm accents (amber, coral) are welcome on specific slides for contrast — not everything must be cyan.

## Typography

**Poppins** is default. Loaded via Google Fonts with Cyrillic subset in `index.html`. JetBrains Mono for code. Poppins weights available: 300/400/500/600/700.

**Unbounded** (500/600/700/800) is loaded for hero + section-divider displays — geometric display face with full Cyrillic subset. Available via the `--font-display` CSS variable (defined in the `@theme` block in `src/index.css`) or `fontFamily: "'Unbounded', 'Poppins', sans-serif"` inline. Use 700 for the hero tagline; 600 for section dividers. Do not use Unbounded for body copy or cards.

| Level | Size | Weight | Line-height |
|-------|------|--------|-------------|
| H1 | 64px | 400 | 120% |
| H2 | 56px | 400 | 120% |
| H3 | 40px | 400 | 120% |
| H4 | 24px | 500 | 120% |
| Body | 16px | 400 | 140% |
| Body small | 14px | 400 | 140% |

On specific slides where a different aesthetic fits (hero, section dividers), a bolder display font is acceptable (Unbounded is the sanctioned choice). Poppins is the default; variety is intentional, not accidental.

## File conventions

- Slides: `src/slides/NN-Name.tsx`, exported as `{Name}Slide` (e.g. `HeroSlide`)
- Slide components receive `{ isActive, slideIndex }: SlideProps` from `@/engine/types`
- **Only animate when `isActive` is true.** Don't re-animate on scroll-back — use Framer Motion's `initial`/`animate` bound to `isActive`.
- Register slides in order in `src/App.tsx` via the `slides: SlideConfig[]` array. Always fill `notes` for the presenter overlay.
- Reusable UI in `src/components/`; animation variants/transitions in `src/animations/`; engine internals in `src/engine/` (don't modify without reason).
- Path alias: `@/*` → `src/*`.

### Reusable primitives (don't rewrite)

- `src/components/WebspirioLogo.tsx` — inline-SVG logo, 4 gradient stroke "sketch" paths + 3 fill layers. Drives its own entrance animation from an `isActive` prop (strokes draw with `pathLength`, fills materialize back-to-front with `opacity + scale`). Use this whenever a slide needs the Webspirio mark; do not re-port the SVG.
- `src/components/DarkVeil.tsx` — ogl-based CPPN shader background (cyan-tuned for this project). See "Shaders & WebGL" below for the sizing + brand-clamp gotchas that applied when integrating it.
- `src/components/Aurora.tsx` — Canvas-based plasma blob background; older than DarkVeil, still valid for slides wanting a lighter, pure-cyan ambience with no WebGL dependency.
- `src/animations/variants.ts` — shared Framer Motion variants (`fadeInUp`, `slideInLeft/Right`, `scaleIn`, `staggerChildren`). Reuse before authoring new ones.
- `src/animations/transitions.ts` — spring + ease presets (`easeSmooth`, `springGentle`, etc.).
- `src/animations/heroTimeline.ts` — hero-specific variants (glow pulse, levitation, tagline blur-in, caption reveal). Only relevant to slide 1.

## Ukrainian copy rules

- Apostrophe: **U+02BC** (ʼ), not ASCII `'`. Example: `з'єднуємо` — wrong; `зʼєднуємо` — right.
- Quotation marks: «ялинки» (French guillemets) — stay consistent across the deck.
- Brand names stay Latin: Webspirio, Korvo, Clickwise, Magento, WordPress, etc.
- Technical terms: prefer widely-adopted Ukrainian forms — `вебсайт` not `веб-сайт`, `чатбот` not `чат-бот`.
- Never machine-translate. If a word feels off, flag it — don't invent.

## Development workflow

- Dev server: `npm run dev` (port 5173, may fall back to 5174)
- Build check: `npm run build` (runs `tsc -b && vite build`)
- Lint: `npm run lint`
- Typecheck only: `npx tsc --noEmit`
- Deploy: `npm run deploy`

### Lint scoping

`npm run lint` surfaces pre-existing errors in `src/engine/PresenterOverlay.tsx` and `src/engine/useActiveSlide.ts` (`react-hooks/purity`, `react-hooks/set-state-in-effect`). They predate slide work and are out of scope for slide PRs. When gating a slide batch, scope lint to the files you changed:

```bash
npx eslint src/slides/NN-Name.tsx src/components/Foo.tsx src/animations/...
```

### React 19 + `react-hooks/set-state-in-effect`

React 19's compiler-aware eslint config forbids direct `setState(value)` calls in the body of `useEffect` — the fix is lazy-initial `useState`, not retries in the effect. Example for a media-query hook:

```tsx
const [isMobile, setIsMobile] = useState(() =>
  typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 640px)').matches
    : false,
)
useEffect(() => {
  const mql = window.matchMedia('(max-width: 640px)')
  const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}, [])
```

## Shaders & WebGL integrations

Several ReactBits components (and a few hand-rolled primitives) use WebGL via `ogl` or `three`. Two traps are easy to miss and cost a visual-review round if you do:

### ogl `Renderer.setSize` shrinks CSS, not just the buffer

`renderer.setSize(w * resolutionScale, h * resolutionScale)` sets both the internal buffer AND `canvas.style.width/height` to the downscaled dimensions. With `resolutionScale < 1`, this leaves visible dark strips where the parent is larger than the canvas CSS box. After every `setSize` call, restore CSS fill:

```ts
const resize = () => {
  const w = parent.clientWidth, h = parent.clientHeight
  renderer.setSize(w * resolutionScale, h * resolutionScale)
  canvas.style.width = '100%'
  canvas.style.height = '100%'  // keep internal buffer reduced for perf, stretch CSS to parent
  program.uniforms.uResolution.value.set(w, h)
}
```

This is already applied in `src/components/DarkVeil.tsx`. If you port another ogl-based component from the registry, repeat the pattern — registry sources rarely include it.

### Clamping variable-palette shaders to the brand

Procedural shaders (DarkVeil's CPPN, silk-waves with arbitrary `colors`, etc.) produce color fields that drift over time. Some frames land outside cyan and bleed amber / yellow / magenta into the brand. `mix-blend-mode: multiply` **does not fix this** — it only darkens channels and preserves hue dominance, so warm hues remain warm, just dimmer.

The working pattern is a three-layer tint stack in the slide container:

```tsx
{/* 1. Hue clamp: replaces pixel hue+saturation with cyan-700, preserves luminance */}
<div aria-hidden className="absolute inset-0"
     style={{ backgroundColor: '#0e7490', mixBlendMode: 'color' }} />
{/* 2. Depth + vignette */}
<div aria-hidden className="absolute inset-0 mix-blend-multiply"
     style={{ background: 'linear-gradient(180deg, rgba(5,51,69,0.55) 0%, rgba(16,78,100,0.2) 45%, rgba(5,51,69,0.65) 100%)' }} />
{/* 3. Flat desaturation plate */}
<div aria-hidden className="absolute inset-0"
     style={{ backgroundColor: 'rgba(8,51,68,0.28)' }} />
```

Layer 1 is the essential one — `mix-blend-mode: color` forces every pixel into the cyan hue family while keeping the shader's luminance variation intact. Layers 2 and 3 add depth and soften residual saturation but are optional. Verify by capturing screenshots at several time points across the shader's drift cycle (~20 seconds) and sampling pixels for `R > B` or `G > B + 15` — those are warm-bleed indicators.

### ReactBits `-TS-TW` variants

When the user offers a `-TS-TW` (TypeScript + Tailwind) variant of a ReactBits component (e.g. `@react-bits/DarkVeil-TS-TW`), copy the source verbatim into `src/components/{Name}.tsx`. Don't re-port from the JS variant. Add `className` to the `Props` type so callers can style the canvas; everything else stays as-is.

## Visual verification (Chrome DevTools MCP is configured)

`.mcp.json` wires up Chrome DevTools MCP with a headless Chromium. After editing a slide, verify with:

1. `mcp__chrome-devtools__new_page` → `http://localhost:5173/#/N`
2. `mcp__chrome-devtools__resize_page` → 1920×1080 (projector) and 375×667 (mobile)
3. `mcp__chrome-devtools__take_screenshot`
4. `mcp__chrome-devtools__list_console_messages` — any error/warn fails the review

For animation work, use `performance_start_trace` / `performance_stop_trace` — animation frame drops show up in the insights.

### Gotchas when verifying WebGL slides

- **Software WebGL in devcontainer.** The headless Chromium here runs WebGL via SwiftShader (software). Expect ~30 fps regardless of shader cost. That's a container artifact, not a real perf problem — don't FAIL a slide for FPS under 60 in this environment. Validate FPS on the actual presenting laptop before shipping.
- **Canvas pixel readback fails.** `drawImage(canvas, ...)` on an ogl/three canvas returns zeros because `preserveDrawingBuffer` defaults to `false`. Sample by taking real screenshots (`take_screenshot → filePath`) and inspecting the PNG, not by running `getImageData` on the live canvas.
- **Drift sampling for clamped shaders.** When reviewing shader-backed slides, capture screenshots at t≈1s, t≈9s, t≈17s to catch palette drift. A single screenshot doesn't prove the brand clamp holds across the shader's cycle.

## Build discipline

- **2-3 slides per batch.** Never bulk-generate. The plan's Task sections define batches — respect them.
- After each batch: run visual review (screenshots at both viewports) + copy review before marking complete. Surface findings; don't auto-proceed to the next task.
- Don't invent slides not in `docs/PROJECT_PLAN.md`. If something seems missing, ask.
- Don't install ReactBits components upfront — slide-builder reads `src/SKILL.md`, proposes a specific slug, orchestrator approves, then install with `-tw` suffix. Never ship default palettes.

## Orchestrator workflow (superpowers)

The main conversation (orchestrator) owns the skill gates that need user dialog. Subagents (`slide-builder`, `visual-reviewer`) own their own execution + verification. Do not duplicate work across levels.

- **`superpowers:brainstorming`** — invoke before any slide build, every slide, including "simple" ones. Section dividers and pricing cards live or die on a single aesthetic call. Keep it short (2-3 exchanges) but don't skip. Output: a concrete concept the user has approved — visual direction, key animation, copy intent.
- **`superpowers:writing-plans`** — for each task batch (2-3 slides per `docs/PROJECT_PLAN.md`), produce a per-slide spec after brainstorming. The plan is what gets handed to `slide-builder`.
- **`superpowers:dispatching-parallel-agents`** — when slides in a batch are independent (don't share components, don't depend on each other's output), dispatch multiple `slide-builder` agents in one message. `visual-reviewer` runs AFTER all builders complete — it needs the final code to review, so don't parallelize it with the builders.
- **`superpowers:verification-before-completion`** — before telling the user a batch is done: `npm run build` passes, every slide has a `visual-reviewer` PASS verdict with artifact paths, and no console errors across the batch. Evidence before assertions.
- **`frontend-design:frontend-design`** — applies during brainstorming when making aesthetic calls. No default Inter/Roboto, no generic purple gradients, no cookie-cutter hero-plus-three-cards layouts.
- **Skip `superpowers:test-driven-development`** for slide work — the existing "no tests for slide components" rule stands.

## What NOT to do

- Don't hardcode hex colors; use `cyan-*` classes or CSS vars
- Don't add a state manager (Redux/Zustand) — component state + URL hash is enough
- Don't add routing library — engine's hash routing handles it
- Don't add tests for slide components (visual regression isn't worth the investment). Engine hooks may get unit tests if they grow complex.
- Don't ship with placeholder images/data still visible in production
- Don't use `--amend` on commits; always create a new commit
- Don't run `npm run deploy` without explicit user confirmation — it publishes to GitHub Pages
- Don't let `slide-builder` re-brainstorm; pass it a concrete spec the user already signed off on
- Don't pass `resolutionScale < 1` to `DarkVeil` (or port another ogl-based component) without the `canvas.style.width/height = '100%'` CSS fix after `renderer.setSize` — you'll get edge strips where the CSS box is smaller than the parent.
- Don't rely on `mix-blend-multiply` alone to clamp a drifting shader palette to the cyan brand — use `mix-blend-mode: color` with a solid brand hex for the hue clamp, then multiply/flat layers for depth.
- Don't FAIL a WebGL slide on FPS measured inside this devcontainer — it's software rendered (SwiftShader). Note the caveat and validate on real hardware.
- Don't call `setState` directly in a `useEffect` body under React 19; use `useState(() => ...)` lazy init instead (see Development workflow).
