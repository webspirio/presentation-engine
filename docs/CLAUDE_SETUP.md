# Claude Code Setup Recommendations — Webspirio Presentation

> Goal: configure Claude Code so it delivers consistently high-quality slide work with minimal back-and-forth. This is a *recommendations* document — nothing here is implemented yet. Pick what helps, skip what doesn't.

## TL;DR — Top 5 Highest-Impact Moves

1. **Install Chrome DevTools MCP.** Claude can take screenshots at 1920x1080, run Lighthouse audits, and trace 60fps animation performance — without this, Claude is coding blind on a visual-first project.
2. **Write a CLAUDE.md with brand tokens + slide conventions.** Stops Claude re-asking about colors, fonts, file layout, and Ukrainian copy every session.
3. **Create two subagents: `slide-builder` and `visual-reviewer`.** `slide-builder` has deep brand context baked in. `visual-reviewer` uses Chrome DevTools MCP to inspect output and reports regressions.
4. **Add PostToolUse hooks for Prettier + ESLint + tsc.** Claude's edits stay type-safe and consistently formatted with zero ceremony.
5. **Adopt the "batch of 2-3, then visual-review" workflow.** Matches your own plan. Build → screenshot → critique → fix → commit → move on.

Everything below expands these. Do the top 5 first; the rest is gravy.

---

## Project Analysis

### Strengths of the plan
- **Incremental batches (2-3 slides) with checkpoints.** Prevents Claude from bulk-generating mediocre output. Preserve this discipline — it's the single biggest quality lever.
- **Custom engine over reveal.js.** Gives full control over animations/transitions. Task 0 is already mostly done (scroll-snap, nav, hash routing, presenter overlay) — good foundation.
- **Brand system is tightly defined.** Colors, fonts, typography scale all locked in. Low ambiguity means Claude doesn't drift.
- **Deploy target is static (GitHub Pages).** No backend to coordinate — fast iteration loops.

### Risks & how Claude should think about them
- **Visual quality is the actual deliverable.** Lint passing ≠ slide looks great. Claude must *see* the output, not just compile it. → Chrome DevTools MCP.
- **Ukrainian copy accuracy.** Claude is proficient but can stumble on idiomatic register, case endings, and loan-word choices (e.g., "чатбот" vs "чат-бот"). → dedicated reviewer subagent.
- **Animation timing is easy to get wrong.** Too fast = jarring; too slow = audience loses focus. 400-700ms is the sweet spot for slide content. Needs real performance tracing.
- **Scope creep.** The plan already added Act 3 (branding). Claude should refuse to invent slides not in the plan without a user ask.
- **Asset placeholders vs real assets.** Real screenshots/photos arrive in Task 9. Until then, every slide should have a clearly-marked placeholder, not fake data that might get shipped.
- **Performance budget.** 27 slides × Framer Motion trees = risk of jank if all slides mount at once. Lazy-mount (render only nearby slides) is worth considering after Task 3.

### Per-phase priorities for Claude
- **Tasks 0-1:** Engine correctness > visual polish. Scroll-snap feel is the foundation everything rides on.
- **Tasks 2-4:** Reusable component patterns. First case study sets the template; get it right or you rebuild 3 more.
- **Tasks 5-6:** Demos must be robust. An embedded Korvo widget crashing mid-pitch is a project-killer.
- **Tasks 7-8:** Density & information design. Services grid and pricing need to read in 5 seconds.
- **Task 9:** Real Lighthouse run, projector smoke test, and a live 15-min rehearsal with timer.

---

## Layer 1 — Context (CLAUDE.md)

Claude reads `CLAUDE.md` at session start. Put the hard-to-change facts here so Claude doesn't have to re-derive them. **Don't put the full plan here** — that's in `docs/PROJECT_PLAN.md`. Link to it.

### Recommended structure

```markdown
# Webspirio Presentation — Claude Context

**Full plan:** [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md) — always check here first for slide numbers, content, and scope.

## What this project is
15-min Ukrainian-language business presentation, custom React slide engine
(NOT reveal.js), deploys to GitHub Pages. Target audience: Ukrainian
entrepreneurs in Germany. Quality bar: world-class agency showcase.

## Stack
- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (config inline in `src/index.css` via `@theme`)
- Framer Motion (imported from `motion/react`)
- shadcn/ui (style: radix-nova, base: neutral) + ReactBits registry
- recharts (for analytics demo)
- Deploy: `npm run deploy` (gh-pages)

## Brand tokens (always use these; never hardcode hex)
Cyan scale: cyan-50..950 (matches Tailwind default cyan almost exactly but
with custom 950 = #053345 and 300 = #53eafd). Primary accent: cyan-400
(#00d3f2). Off-white text: #F0F4F8. See `docs/PROJECT_PLAN.md` for the
full palette.

## Typography
Poppins (400/500/600/700 + Cyrillic subset) is default. JetBrains Mono
for code. Headings: H1 64px / H2 56px / H3 40px / H4 24px (all weight
400 except H4 which is 500), line-height 120%. Body 16px, line-height
140%.

## File conventions
- Slides live in `src/slides/NN-Name.tsx`, exported as `{Name}Slide`
- Slide components receive `{ isActive, slideIndex }: SlideProps`
- Only animate when `isActive` is true; don't re-animate on scroll-back
- Register slides in `src/App.tsx`, in order, with `notes` filled
- Reusable pieces go in `src/components/`, animation primitives in `src/animations/`

## Ukrainian copy rules
- Use Ukrainian apostrophe `'` (U+02BC) not ASCII apostrophe
- Quotes: „ойкерні лапки" or «ялинки» — pick one and stay consistent
- Never machine-translate English brand names (Webspirio, Korvo, Clickwise
  stay Latin). Technical terms: prefer Ukrainian if widely used
  ("вебсайт" yes, "веб-сайт" no; "чатбот" yes, "бот для чату" no)
- If unsure about wording, flag it; don't invent

## Development workflow
- Dev server: `npm run dev` (port 5173)
- After edits: Claude's PostToolUse hooks run Prettier + ESLint automatically.
  If lint fails, fix the root cause — do not disable the rule.
- Type check before finishing a batch: `npx tsc --noEmit`
- Visual verify with Chrome DevTools MCP before marking a slide done
- Build every commit must succeed: `npm run build`

## What NOT to do
- Don't install ReactBits components upfront — add per slide as needed
- Don't create new slide numbers not in `docs/PROJECT_PLAN.md`
- Don't add backend, routing library, or state manager (Zustand/Redux)
- Don't write tests for slides (visual regression isn't worth the investment)
  Engine hooks are different — those could get unit tests if they get complex.
- Don't ship with placeholder data still visible in production slides
```

---

## Layer 2 — Tools (MCP Servers)

MCP servers give Claude tools it otherwise doesn't have. For a visual-first project, these are essential.

### Install — do these three

```bash
# 1. Chrome DevTools MCP — screenshots, Lighthouse, performance traces
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest

# 2. shadcn MCP — component discovery for both shadcn/ui + @react-bits
npx shadcn@latest mcp init --client claude

# 3. (Your plan already has this) - verify it worked:
cat .mcp.json
```

### What each unlocks

**Chrome DevTools MCP** (the big win)
- `take_screenshot` — capture slides at any viewport. Claude *sees* the result.
- `resize_page` — jump to 1920x1080 projector or 375px mobile to verify
- `list_console_messages` — catch runtime errors the dev server hides
- `lighthouse_audit` — the Task 9 quality gate, but run it anytime
- `performance_start_trace` / `stop_trace` — critical for Framer Motion review. Surfaces jank, layout thrash, dropped frames.
- `evaluate_script` — inspect computed styles, measure DOM
- `navigate_page` — jump directly to `#/5` to review a specific slide

**shadcn MCP**
- `search_items_in_registries` — Claude can search ReactBits without you pasting the URL
- `get_item_examples_from_registries` — fetch real usage examples before installing
- `get_add_command_for_items` — Claude generates the correct install command
- `audit_checklist` — checks install quality

### Skip for now
- **Playwright MCP** — overlap with Chrome DevTools MCP for your use case. Add later only if cross-browser testing becomes a concern.

### Workflow usage pattern

```
1. Claude edits a slide file
2. Hooks format + typecheck automatically
3. Claude asks Chrome DevTools MCP: navigate to #/N, screenshot at 1920x1080
4. Claude reviews the screenshot — "text is too small, accent color
   wrong on the pipeline"
5. Claude fixes, screenshots again, iterates
6. Only after visual pass: user is asked to approve
```

This loop is why Chrome DevTools MCP is the top recommendation. Without it, step 3-5 fall to the user.

---

## Layer 3 — Specialists (Subagents)

Subagents run in isolated context windows with their own system prompt and (optionally) scoped tools. They're valuable when a task needs specific expertise or when parallel work would help.

Save these under `.claude/agents/<name>.md`. Frontmatter has `name`, `description`, optional `tools`, optional `model`.

### Recommended agents for this project

#### `slide-builder` (primary workhorse)
**Purpose:** Build or refine one slide end-to-end. Owns brand conventions.

```markdown
---
name: slide-builder
description: Build or refine a Webspirio presentation slide. Use when the task is to create a new slide, restyle an existing slide, or implement slide animations. The agent owns brand tokens, file conventions, and animation patterns.
tools: Read, Write, Edit, Grep, Glob, Bash
---

You build slides for the Webspirio presentation. Read `CLAUDE.md` and
`docs/PROJECT_PLAN.md` at the start of each task. Never hardcode hex —
use `cyan-*` Tailwind classes or CSS vars. Animate only when `isActive`
is true. Keep slide components under 120 lines; extract reusable bits
to `src/components/`.

Before finishing, run `npx tsc --noEmit` and confirm the slide mounts
at `#/N` in dev. Report what you built and what placeholders remain.
```

#### `visual-reviewer` (the Chrome DevTools MCP specialist)
**Purpose:** Screenshot a slide, check layout/colors/animation timing, report issues.

```markdown
---
name: visual-reviewer
description: Visually verify one or more slides using the Chrome DevTools MCP. Takes screenshots at 1920x1080 and 375px, runs a Lighthouse audit, checks console for errors, traces animation performance. Reports regressions concretely with screenshot evidence. Use before marking a batch complete.
tools: mcp__chrome-devtools__*, Read, Bash
---

You are the visual QA for the Webspirio presentation. For each slide
you review:
1. Navigate to http://localhost:5173/#/N
2. Screenshot at 1920x1080 and 375x667
3. Check console messages — any errors or warnings fail the review
4. If the slide has animation, run performance_start_trace, trigger
   the slide animation, stop_trace. Report any frame drops.
5. Compare against the brand guide in CLAUDE.md. Call out: wrong
   colors, wrong font weights, illegible contrast, cut-off text on
   mobile, overflow, cramped spacing.

Output format:
- Screenshot paths (inline if possible)
- Pass/fail verdict
- If fail: numbered list of specific issues with file:line hints
```

#### `ukrainian-copy-reviewer`
**Purpose:** Review Ukrainian text for grammar, register, and brand voice.

```markdown
---
name: ukrainian-copy-reviewer
description: Review Ukrainian (Cyrillic) copy in slides for grammar, typography (apostrophe, quotes), case endings, loan-word choices, and brand register. Use before a batch is marked complete, or when new copy is added. Native-speaker-grade feedback.
tools: Read, Grep, Glob
---

Review the Ukrainian copy in the slides the user points you at. Check:
- Correct apostrophe (U+02BC, not ASCII)
- Consistent quotation style
- Proper case endings, especially after prepositions
- Brand names stay Latin (Webspirio, Korvo, Clickwise)
- Technical terms: prefer native Ukrainian unless English is
  load-bearing ("сайт" > "веб-сайт", "чатбот" > "чат-бот")
- Tone: confident, professional, not salesy

Return a list of file:line → current → suggested changes. If copy is
fine, say so explicitly.
```

#### `reactbits-scout`
**Purpose:** Research ReactBits components before Claude installs them.

```markdown
---
name: reactbits-scout
description: Research ReactBits components — confirm free vs Pro, fetch usage examples, check if the component will actually fit the slide's needs, and return the exact install command. Use before running `npx shadcn@latest add @react-bits/...`.
tools: WebFetch, mcp__shadcn__*, Read
---

Given a slide concept and a candidate ReactBits component name:
1. Use shadcn MCP to look up the component metadata
2. Verify license (free vs Pro). If Pro, suggest a Framer Motion
   fallback sketch.
3. Fetch an example from reactbits.dev if available.
4. Return: install command, import snippet, props the slide needs,
   any gotchas (performance cost, dark-bg compatibility).

Don't install — just research. The user installs.
```

#### `animation-designer` (optional, for Task 6 demos)
**Purpose:** Design Framer Motion choreographies for complex animations.

```markdown
---
name: animation-designer
description: Design multi-element Framer Motion animations — staggered entries, pipeline flows, 3D card flips, chart counter-ups. Returns variant definitions and timing specs. Use for slides 3, 5, 10, 13, 14, 22, 23 — anywhere choreography matters.
tools: Read, Grep
---

You design animation sequences for slides. Output:
1. A set of Framer Motion `variants` objects (hidden/visible, etc.)
2. Timing: durations, delays, easing. Default: 0.5s, ease-out, stagger
   0.08s for lists up to 8 items.
3. Which elements need `layout`, `layoutId`, or `AnimatePresence`
4. Pitfalls: reduce-motion handling, initial flash, exit animation

Assume 60fps budget on a mid-tier laptop. Don't animate width/height —
use transform + opacity. Don't animate more than 10 elements
simultaneously without good reason.
```

### How to invoke them

- User-facing: "run visual-reviewer on slides 1-3" or "have ukrainian-copy-reviewer check slide 7"
- Claude-initiated: after finishing a batch, Claude should auto-spawn visual-reviewer before marking done. Codify this in CLAUDE.md.
- Parallel: ship `visual-reviewer` and `ukrainian-copy-reviewer` in the same message — they're independent.

---

## Layer 4 — Shortcuts (Slash Commands & Skills)

Slash commands are project-scoped shortcuts. Save as `.claude/commands/<name>.md`. The body is the prompt; Claude runs it when the user types `/<name>`.

### Recommended commands

#### `/new-slide <number> <short-name>`
Scaffolds a new slide file with correct boilerplate, registers it in `App.tsx`, and opens the dev server to the right hash.

```markdown
---
description: Scaffold a new presentation slide
argument-hint: <slide-number> <short-name>
---

Create a new slide `src/slides/$1-$2.tsx` using the slide-builder agent.
Pull the content spec for slide $1 from `docs/PROJECT_PLAN.md`. Use
the standard slide component shape (reads `isActive`, animates with
motion/react). Register the slide in `src/App.tsx` in the correct
order position. After creating it, run visual-reviewer on slide $1.
```

#### `/review-batch <start> <end>`
Runs the visual-reviewer and ukrainian-copy-reviewer in parallel on a range.

```markdown
---
description: Visual + copy review on a slide range
argument-hint: <start> <end>
---

In parallel, run:
- visual-reviewer on slides $1 through $2
- ukrainian-copy-reviewer on slides $1 through $2
- ESLint + tsc --noEmit on the project

Report all findings grouped by slide. Don't fix anything — I'll decide
which to act on.
```

#### `/rehearse`
Opens presentation in "rehearsal mode" — fullscreen, timer running, presenter notes visible.

```markdown
---
description: Guide me through a 15-minute rehearsal
---

Start `npm run dev` in background if not running. Print instructions:
"Open http://localhost:5173 in Chrome, press F for fullscreen, T for
timer, N for notes. I'll be silent during the rehearsal — tell me when
you're done and I'll run visual-reviewer on slides you flagged."

Then wait. Take notes only on slides the user flags during or after.
```

#### `/brand-check <file-or-range>`
Sanity-check a slide against brand tokens.

```markdown
---
description: Check a slide against Webspirio brand guidelines
argument-hint: <file-path-or-slide-range>
---

Read the file(s) indicated by $ARGUMENTS. Flag any:
- Hardcoded hex colors (should use `cyan-*` or CSS vars)
- Font families other than Poppins or JetBrains Mono
- Font sizes outside the typography scale (64/56/40/24/16/14)
- Inline styles that could be Tailwind classes
- ASCII apostrophe in Ukrainian text

List findings with file:line. Don't fix — report only.
```

### Built-in skills to leverage

The Claude Code harness ships with skills already. Relevant ones for you:
- **`/review`** — built-in PR review. Run before shipping any branch.
- **`/security-review`** — run before deploy. Static assets + GitHub Pages is low-risk, but good hygiene.
- **`/init`** — if CLAUDE.md doesn't exist yet, this generates a first draft.
- **`/statusline`** — nice-to-have cosmetic; shows current slide count, build status in the CLI prompt.

---

## Layer 5 — Automation (Hooks)

Hooks are shell commands the harness runs on events. They're how you enforce "formatted + typechecked after every edit" without Claude having to remember. Configure in `.claude/settings.json`.

### Recommended hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATHS\" 2>/dev/null || true"
          },
          {
            "type": "command",
            "command": "npx eslint --fix \"$CLAUDE_FILE_PATHS\" 2>/dev/null || true"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "npx tsc --noEmit 2>&1 | head -30 || true"
          }
        ]
      }
    ]
  }
}
```

**What each does:**
- **PostToolUse (Edit|Write) → Prettier:** formats every file Claude touches. Consistent style, zero effort.
- **PostToolUse (Edit|Write) → ESLint --fix:** auto-fixes trivial lint issues (unused imports, bad hook deps).
- **Stop → tsc --noEmit:** at end of turn, print any type errors. Claude sees them and fixes in the next turn without you nagging.

**Don't over-hook.** Running the full build on every edit is slow and wastes tokens. Typecheck on `Stop` is the sweet spot.

---

## Layer 6 — Workflow Patterns

### The "Batch Loop" (matches your plan)

```
1. User: "do Task N"
2. Claude reads CLAUDE.md + PROJECT_PLAN.md for the task spec
3. Claude plans with Plan agent if task is complex (use `EnterPlanMode`)
4. Claude implements slides one at a time
5. After each slide: self-check with visual-reviewer
6. After all slides in batch: parallel visual-reviewer + ukrainian-copy-reviewer
7. Claude presents findings + proposes commit
8. User reviews, asks for tweaks or approves
9. User: "commit" → Claude commits with conventional message
10. User: "next task"
```

Keep this explicit. If Claude skips step 5-6 you end up debugging at Task 9.

### Parallel delegation rules

- **Use parallel subagents when work is independent:** visual-reviewer on slides 1-3 + reactbits-scout for slide 4 at the same time → single message, two Agent calls.
- **Sequential when dependencies exist:** slide-builder must finish before visual-reviewer runs on its output.
- **Background tasks for long-running:** `npm run dev` in background (`run_in_background: true`), never block on it.

### Effort levels

- **`/effort max`** for: Task 4 (branding, 3D card), Task 6 (live demos), Task 9 (polish + perf).
- **`/fast`** for: typo fixes, copy tweaks, adjusting a single Tailwind class, writing commits.
- **Default** for everything else.

### Plan mode

Before Tasks 4, 6, and 9, use `EnterPlanMode`. These tasks have enough design decisions that thinking first saves implementation rework. For Tasks 1, 2, 3, 5, 7, 8 just start coding — the plan is clear enough.

### When to use Ralphy

Your devcontainer installs `ralphy-cli`. Ralphy is useful for **overnight autonomous loops on a well-specified task** — e.g., "build 5 slides to this spec, then stop." Don't use it for exploratory work or anything with ambiguity. If the plan is crisp, Ralphy can chew through Tasks 2, 3, 7 unattended. Review results in the morning.

---

## Layer 7 — Session Management Tips

### Memory (persistent across sessions)
Already configured. Save to `/home/node/.claude/projects/.../memory/`. Relevant memories to maintain:
- User profile (senior, owns the agency, prefers quality over speed)
- Feedback (any correction the user gives — "make animations slower", "don't use emojis")
- Project facts (stack, brand tokens, schedule constraints)

### Don't-re-read rule
Once Claude has read a file in a session, don't re-read it unless it was edited. The harness tracks file state. Same for PROJECT_PLAN.md — read once per session, not per slide.

### Fast mode toggle
`/fast` for simple edits keeps iteration snappy. Toggle off with `/fast` again when you hit a genuinely hard problem.

### Context management
At ~150K tokens, the harness compresses prior messages. Your 27-slide project will hit this. Two coping strategies:
1. One session per task (restart between tasks). Preserves a clean context.
2. Keep CLAUDE.md tight — everything stable goes there, not the conversation.

---

## Layer 8 — Reference Projects & Inspiration

### Engine patterns
- **reveal.js** — https://revealjs.com — steal the scroll-view behavior and URL routing patterns. Don't use the library; read the implementation.
- **Spectacle** — https://formidable.com/open-source/spectacle/ — React-based deck library. Good for comparing API shapes for your `Slide` component.
- **MDX Deck** — https://github.com/jxnblk/mdx-deck — minimalist React deck. Good inspiration for the minimum viable slide API.

### Animation inspiration
- **Framer Motion examples** — https://motion.dev/docs/react-motion — canonical patterns, especially `AnimatePresence` and layout animations.
- **Motion primitives** — https://motion-primitives.com/ — pre-built motion components. Mine for ideas, don't ship directly.
- **Codrops case study articles** — https://tympanus.net/codrops/ — gold standard for single-page animation craft. Search "scroll" or "pipeline".

### Presentation craft
- **Apple Keynote animations** — study section dividers and entrance transitions. YouTube has frame-by-frame breakdowns.
- **The Art of Presentation by Edward Tufte** — for information density and anti-chartjunk principles. Applies directly to slides 20 (pricing) and 10 (results).

### Components
- **ReactBits** — https://reactbits.dev — your primary component source
- **shadcn/ui** — https://ui.shadcn.com — base primitives (Card, Badge, Button)
- **Magic UI** — https://magicui.design — alternative animated components, many free
- **Aceternity UI** — https://ui.aceternity.com — especially good for the "premium" feel on slides 1, 14, 26

### Ukrainian typography
- **Projector Foundation** — https://projector.foundation — for style guidance on Ukrainian presentation design
- **Rules of Ukrainian typography (правопис)** — consult when in doubt on punctuation

---

## Layer 9 — Quality Gates

### Per-slide checklist (run before marking a slide done)
- [ ] Compiles (`tsc --noEmit` clean)
- [ ] Lints clean
- [ ] Screenshot at 1920x1080 looks professional
- [ ] Screenshot at 375px doesn't have overflow/clipping
- [ ] Brand colors used (no hardcoded hex)
- [ ] Ukrainian copy reviewed (apostrophe, quotes, register)
- [ ] Animation fires on scroll-in, doesn't re-fire on scroll-back
- [ ] Console is empty of errors/warnings
- [ ] Presenter notes filled for that slide

### Per-batch checklist (before commit)
- [ ] All slides pass per-slide checklist
- [ ] Navigation (arrows, scroll, dots) still works across all slides
- [ ] Hash routing lands on the correct slide
- [ ] Running `npm run build` succeeds with no warnings
- [ ] git diff reviewed — no accidentally-committed placeholders or TODOs

### Pre-deploy checklist (Task 9)
- [ ] Lighthouse: Performance ≥90, A11y ≥95, Best Practices ≥95
- [ ] 60fps on transitions (Chrome DevTools performance trace)
- [ ] Real assets in place (no placeholder images visible)
- [ ] Projector resolution smoke test (actual projector if possible)
- [ ] 15-min rehearsal complete, timing confirmed
- [ ] Works offline after first load (service worker optional but nice)
- [ ] `npm run deploy` succeeds; GitHub Pages URL loads correctly
- [ ] Direct-link hash URLs work after deploy (`#/5` → slide 5)

---

## Layer 10 — Immediate Next Steps

If you want to implement these recommendations, here's the order:

### Phase A — Foundation (30-45 min)
1. Install Chrome DevTools MCP and shadcn MCP (see Layer 2)
2. Write `CLAUDE.md` at the project root (see Layer 1 template)
3. Create `.claude/agents/slide-builder.md` and `.claude/agents/visual-reviewer.md`
4. Configure `.claude/settings.json` with the three PostToolUse/Stop hooks
5. Test the loop: ask Claude to refine slide 1, confirm hooks run and visual-reviewer works

### Phase B — Workflow polish (later, as needed)
6. Add remaining subagents (`ukrainian-copy-reviewer`, `reactbits-scout`, `animation-designer`) when their first use case arrives
7. Add slash commands (`/new-slide`, `/review-batch`, `/rehearse`, `/brand-check`) when you notice yourself repeating the same multi-step ask
8. Add `.claude/commands/` to git so the setup travels with the repo

### Phase C — Discipline (every session)
9. Start each task with "read CLAUDE.md and PROJECT_PLAN.md task N"
10. End each batch with visual-reviewer + ukrainian-copy-reviewer in parallel
11. Save memories when you give Claude feedback — "always slow the hero animation to 800ms" belongs in memory, not repeated every session

---

## What this setup is NOT

- **Not a replacement for your own taste.** Claude can execute but can't decide if a slide feels right for your audience. Keep the review checkpoints.
- **Not a silver bullet for Ukrainian copy.** The reviewer catches a lot but a fluent Ukrainian speaker doing a final pass is still worth it.
- **Not a reason to skip the 15-min rehearsal.** Technology shows are won or lost on stage, not in dev.

---

*Document maintained alongside `docs/PROJECT_PLAN.md`. Update when workflow patterns change.*
