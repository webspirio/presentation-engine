import { useCallback, useEffect, useMemo, useState } from 'react'

// Interactive funnel diagram — ported and adapted from the media-factory deck
// (`.reference/media-factory/src/funnel.jsx`). Preserves the original data
// model (nodes, edges, preset journeys, adjacency, click-to-build path) but:
//   - ported to TypeScript
//   - recoloured to the cyan + coral/amber/mint Webspirio palette
//   - all copy translated Russian → Ukrainian
//   - exposes a `presetIndex` prop so the slide's fragment system can drive
//     preset selection from the keyboard (fr 0 = free exploration,
//     fr 1..5 = cycle through presets in JOURNEYS order)

const FONT_POPPINS = "'Poppins', sans-serif"

// ─── palette ───
const BG = '#053345' // cyan-950 — matches deck background
const C2 = 'rgba(83, 234, 253, 0.18)'
const T1 = '#F0F4F8'
const T2 = 'rgba(240, 244, 248, 0.68)'
const T3 = 'rgba(240, 244, 248, 0.38)'

// Node accent colours — kept visually distinct so paths stay legible at
// 1–2px stroke width. Cyan-family dominates; coral/amber/mint handle the
// warm/conversion semantics (hot → coral, warm → amber, conversion → mint).
const P = {
  cyan400: '#00d3f2',
  cyan500: '#00b8db',
  cyan300: '#53eafd',
  cyan200: '#a2f4fd',
  cyan700: '#007595',
  coral: '#ff8a73',
  coralDeep: '#ff5a3c',
  amber: '#f59e0b',
  mint: '#5eead4',
  mintBright: '#86efac',
} as const

type PaletteKey = keyof typeof P

// ─── Node + edge data ───

interface NodeDef {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub: string
  icon: string
  color: string
  row: number
  glow?: boolean
}

// Layout — landscape 1600×1100 viewBox. Scaled horizontally from the original
// 960-wide portrait layout (x×1.667, w×1.35, h×1.15) so the diagram uses the
// full width of a 16:9 projector and text reads at ~17–22px on screen.
const NODES: Record<string, NodeDef> = {
  ig: { x: 167, y: 60, w: 257, h: 74, label: 'Instagram', sub: 'Reels + Stories', icon: '📸', color: P.cyan400, row: 0 },
  fb: { x: 672, y: 60, w: 257, h: 74, label: 'Facebook', sub: 'Reels + Messenger', icon: '📘', color: P.cyan500, row: 0 },
  tt: { x: 1176, y: 60, w: 257, h: 74, label: 'TikTok · 23K', sub: 'Reels + посилання в біо', icon: '🎵', color: P.cyan700, row: 0 },

  'ig-comment': { x: 37, y: 210, w: 210, h: 60, label: 'Коментар', sub: '«ІНФО» під Reels', icon: '💬', color: P.cyan400, row: 1 },
  'ig-story': { x: 267, y: 210, w: 210, h: 60, label: 'Story відповідь', sub: 'Стикер / опитування', icon: '📱', color: P.coral, row: 1 },
  'ig-bio': { x: 152, y: 300, w: 195, h: 54, label: 'Посилання в біо', sub: '', icon: '🔗', color: P.cyan400, row: 1 },
  'fb-comment': { x: 555, y: 210, w: 210, h: 60, label: 'Коментар', sub: 'або Messenger', icon: '💬', color: P.cyan500, row: 1 },
  'fb-bio': { x: 785, y: 210, w: 195, h: 60, label: 'Посилання в біо', sub: '', icon: '🔗', color: P.cyan500, row: 1 },
  'tt-bio': { x: 1150, y: 210, w: 285, h: 60, label: 'Посилання в біо', sub: 'Єдиний шлях у ЄС', icon: '🔗', color: P.cyan700, row: 1 },

  bot: { x: 100, y: 410, w: 520, h: 90, label: 'Бот у Direct', sub: 'Автовідповідь · Визначає мову DE/UA · Кваліфікує', icon: '🤖', color: P.cyan300, row: 2, glow: true },
  bridge: { x: 820, y: 410, w: 520, h: 90, label: 'Мостова сторінка', sub: 'Збирає email + імʼя · DE і UA · Meta Pixel', icon: '🌐', color: P.coral, row: 2, glow: true },

  hot: { x: 50, y: 580, w: 255, h: 70, label: 'Гарячий', sub: 'Хоче купити / записатись', icon: '🔥', color: P.coralDeep, row: 3 },
  warm: { x: 350, y: 580, w: 255, h: 70, label: 'Теплий', sub: 'Цікавиться продуктом', icon: '🌡️', color: P.amber, row: 3 },
  cold: { x: 655, y: 580, w: 255, h: 70, label: 'Холодний', sub: '«Просто дивлюсь»', icon: '❄️', color: P.cyan500, row: 3 },
  'bp-shop': { x: 960, y: 580, w: 200, h: 70, label: 'Продукти', sub: 'Хочу купити', icon: '🛍️', color: P.mint, row: 3 },
  'bp-biz': { x: 1210, y: 580, w: 225, h: 70, label: 'Бізнес', sub: 'Стати партнером', icon: '💼', color: P.coral, row: 3 },

  calendar: { x: 45, y: 745, w: 260, h: 70, label: 'Календар', sub: 'Запис на консультацію', icon: '📅', color: P.coralDeep, row: 4 },
  'email-prod': { x: 345, y: 745, w: 255, h: 70, label: 'Email: Продукти', sub: 'Серія 7–14 днів', icon: '📧', color: P.cyan300, row: 4 },
  'email-biz': { x: 640, y: 745, w: 255, h: 70, label: 'Email: Бізнес', sub: 'Серія 10 днів', icon: '📧', color: P.coral, row: 4 },
  'lr-shop': { x: 935, y: 745, w: 240, h: 70, label: 'Магазин', sub: 'Партнерське посилання', icon: '🛒', color: P.mint, row: 4 },
  'lr-reg': { x: 1215, y: 745, w: 220, h: 70, label: 'Реєстрація', sub: 'Новий партнер', icon: '🤝', color: P.coral, row: 4 },

  telegram: { x: 360, y: 895, w: 300, h: 64, label: 'Telegram-бот', sub: 'Акції · Контент · Нагадування', icon: '✈️', color: P.cyan200, row: 5 },
  retarget: { x: 720, y: 895, w: 300, h: 64, label: 'Ретаргетинг', sub: 'Meta Pixel реклама', icon: '🎯', color: P.amber, row: 5 },

  consult: { x: 340, y: 1010, w: 420, h: 78, label: 'Консультація', sub: 'WhatsApp сповіщення · Повна інфа про ліда', icon: '📞', color: P.mint, row: 6, glow: true },
  client: { x: 840, y: 1010, w: 420, h: 78, label: 'Клієнт / Партнер', sub: 'У CRM · Повторні продажі · Реферали', icon: '⭐', color: P.mintBright, row: 6, glow: true },
}

interface EdgeDef {
  from: string
  to: string
  color: string
  label?: string
  dashed?: boolean
}

const EDGES: EdgeDef[] = [
  { from: 'ig', to: 'ig-comment', color: P.cyan400 },
  { from: 'ig', to: 'ig-story', color: P.coral },
  { from: 'ig', to: 'ig-bio', color: P.cyan400 },
  { from: 'fb', to: 'fb-comment', color: P.cyan500 },
  { from: 'fb', to: 'fb-bio', color: P.cyan500 },
  { from: 'tt', to: 'tt-bio', color: P.cyan700 },
  { from: 'ig-comment', to: 'bot', color: P.cyan300, label: 'авто' },
  { from: 'ig-story', to: 'bot', color: P.cyan300, label: 'авто' },
  { from: 'fb-comment', to: 'bot', color: P.cyan300, label: 'авто' },
  { from: 'ig-bio', to: 'bridge', color: P.coral },
  { from: 'fb-bio', to: 'bridge', color: P.coral },
  { from: 'tt-bio', to: 'bridge', color: P.coral },
  { from: 'bot', to: 'hot', color: P.coralDeep, label: 'ціна? запис?' },
  { from: 'bot', to: 'warm', color: P.amber, label: 'інтерес' },
  { from: 'bot', to: 'cold', color: P.cyan500, label: 'просто дивлюсь' },
  { from: 'bot', to: 'bridge', color: P.coral, dashed: true, label: 'посилання' },
  { from: 'bridge', to: 'bp-shop', color: P.mint },
  { from: 'bridge', to: 'bp-biz', color: P.coral },
  { from: 'hot', to: 'calendar', color: P.coralDeep },
  { from: 'warm', to: 'email-prod', color: P.amber },
  { from: 'warm', to: 'lr-shop', color: P.amber, dashed: true, label: 'якщо готовий' },
  { from: 'cold', to: 'email-prod', color: P.cyan500 },
  { from: 'cold', to: 'email-biz', color: P.cyan500 },
  { from: 'bp-shop', to: 'lr-shop', color: P.mint },
  { from: 'bp-biz', to: 'lr-reg', color: P.coral },
  { from: 'bp-biz', to: 'email-biz', color: P.coral, dashed: true },
  { from: 'email-prod', to: 'telegram', color: P.cyan200 },
  { from: 'email-biz', to: 'telegram', color: P.cyan200 },
  { from: 'email-prod', to: 'retarget', color: P.amber, dashed: true },
  { from: 'telegram', to: 'calendar', color: P.cyan200, dashed: true, label: 'прогрівся' },
  { from: 'telegram', to: 'bridge', color: P.cyan200, dashed: true },
  { from: 'retarget', to: 'bridge', color: P.amber, dashed: true },
  { from: 'calendar', to: 'consult', color: P.mint },
  { from: 'consult', to: 'client', color: P.mintBright },
  { from: 'lr-shop', to: 'client', color: P.mint },
  { from: 'lr-reg', to: 'client', color: P.coral },
]

interface Journey {
  id: string
  label: string
  color: string
  desc: string
  nodes: string[]
  edges: number[]
}

const JOURNEYS: Journey[] = [
  {
    id: 'hot',
    label: '⚡ Швидкий продаж',
    color: P.coralDeep,
    desc: 'Reels → Коментар → Бот → «Хочу записатись» → Календар → Консультація → Клієнт',
    nodes: ['ig', 'fb', 'ig-comment', 'ig-story', 'fb-comment', 'bot', 'hot', 'calendar', 'consult', 'client'],
    edges: [0, 1, 3, 6, 7, 8, 12, 18, 32, 33],
  },
  {
    id: 'product',
    label: '🛍️ Купівля продукту',
    color: P.mint,
    desc: 'Будь-яка платформа → Бот або посилання в біо → Мостова сторінка → Магазин → Клієнт',
    nodes: ['ig', 'fb', 'tt', 'ig-comment', 'ig-bio', 'fb-comment', 'fb-bio', 'tt-bio', 'bot', 'bridge', 'warm', 'bp-shop', 'lr-shop', 'client'],
    edges: [0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 15, 16, 19, 20, 23, 34],
  },
  {
    id: 'partner',
    label: '🤝 Партнерство',
    color: P.coral,
    desc: 'Контент про бізнес → Бот або сторінка → Email-серія «Бізнес» → Реєстрація → Партнер',
    nodes: ['ig', 'fb', 'tt', 'ig-comment', 'fb-comment', 'fb-bio', 'tt-bio', 'bot', 'bridge', 'warm', 'bp-biz', 'email-biz', 'lr-reg', 'client'],
    edges: [0, 3, 4, 5, 6, 8, 10, 11, 13, 15, 17, 19, 22, 24, 25, 35],
  },
  {
    id: 'cold',
    label: '❄️ Прогрів холодного',
    color: P.cyan500,
    desc: '«Просто дивлюсь» → Email + Telegram прогрів 14–30 днів → Повернення → Купівля або запис',
    nodes: ['ig', 'fb', 'ig-comment', 'ig-story', 'fb-comment', 'bot', 'cold', 'email-prod', 'email-biz', 'telegram', 'retarget', 'bridge', 'calendar', 'consult', 'client'],
    edges: [0, 1, 3, 6, 7, 8, 14, 21, 22, 26, 27, 28, 29, 30, 31, 32, 33],
  },
  {
    id: 'tiktok',
    label: '🎵 Шлях із TikTok',
    color: P.cyan700,
    desc: '23K підписників → Посилання в біо → Мостова сторінка → Продукт або бізнес → Конверсія',
    nodes: ['tt', 'tt-bio', 'bridge', 'bp-shop', 'bp-biz', 'lr-shop', 'lr-reg', 'email-biz', 'client'],
    edges: [5, 11, 16, 17, 23, 24, 25, 34, 35],
  },
]

// ─── adjacency (forward only) ───
const FWD: Record<string, { to: string; idx: number }[]> = {}
EDGES.forEach((e, i) => {
  if (!FWD[e.from]) FWD[e.from] = []
  FWD[e.from].push({ to: e.to, idx: i })
})

// ─── geometry ───
function cx(n: NodeDef) {
  return n.x + n.w / 2
}
function bot_(n: NodeDef) {
  return n.y + n.h
}
function top_(n: NodeDef) {
  return n.y
}

function edgePath(fromId: string, toId: string): string {
  const f = NODES[fromId]
  const t = NODES[toId]
  if (!f || !t) return ''
  const fx = cx(f)
  const fy = bot_(f)
  const tx = cx(t)
  const ty = top_(t)
  if (fy > ty + 20) {
    const loopX = Math.max(fx, tx) + 90
    return `M${fx},${fy} C${loopX},${fy + 50} ${loopX},${ty - 50} ${tx},${ty}`
  }
  if (Math.abs(fx - tx) < 30) return `M${fx},${fy} L${tx},${ty}`
  const cp = Math.max((ty - fy) * 0.45, 24)
  return `M${fx},${fy} C${fx},${fy + cp} ${tx},${ty - cp} ${tx},${ty}`
}

function midPt(fromId: string, toId: string): [number, number] {
  const f = NODES[fromId]
  const t = NODES[toId]
  if (!f || !t) return [0, 0]
  return [(cx(f) + cx(t)) / 2, (bot_(f) + top_(t)) / 2]
}

const ROWS = [
  { y: 35, label: 'ТОЧКИ ВХОДУ', lineY: 170 },
  { y: 185, label: 'ТРИГЕРИ', lineY: 380 },
  { y: 390, label: 'ОБРОБКА', lineY: 540 },
  { y: 555, label: 'КВАЛІФІКАЦІЯ', lineY: 700 },
  { y: 720, label: 'ДІЇ', lineY: 860 },
  { y: 870, label: 'ПРОГРІВ', lineY: 975 },
  { y: 998, label: 'КОНВЕРСІЯ', lineY: null as number | null },
]

const DIM = 0.25
const FAINT = 0.12

function paletteKeyFor(color: string): PaletteKey | null {
  const entry = (Object.entries(P) as [PaletteKey, string][]).find(
    ([, v]) => v === color,
  )
  return entry ? entry[0] : null
}

interface LrFunnelInteractiveProps {
  /** Which preset journey to highlight. 0 = free exploration, 1..5 = JOURNEYS[i-1]. */
  presetIndex?: number
  /** Whether the slide is currently active — used to reset path when navigating away. */
  isActive?: boolean
}

export function LrFunnelInteractive({
  presetIndex = 0,
  isActive = true,
}: LrFunnelInteractiveProps) {
  const [path, setPath] = useState<string[]>([])
  const [preset, setPreset] = useState<string | null>(null)

  // Fragment-driven preset: when the slide advances fragments, select the
  // preset at that index. Fragment 0 clears; fragments 1..5 pick presets.
  useEffect(() => {
    if (!isActive) return
    if (presetIndex <= 0) {
      setPreset(null)
      setPath([])
      return
    }
    const next = JOURNEYS[presetIndex - 1]
    if (!next) return
    setPath([])
    setPreset(next.id)
  }, [presetIndex, isActive])

  // Reset interactive state when we leave the slide entirely.
  useEffect(() => {
    if (!isActive) {
      setPath([])
      setPreset(null)
    }
  }, [isActive])

  const nextSteps = useMemo(() => {
    if (preset || path.length === 0) return null
    const last = path[path.length - 1]
    const targets = (FWD[last] || []).map((e) => e.to)
    return new Set(targets)
  }, [path, preset])

  const pathEdgeIdxs = useMemo(() => {
    if (path.length < 2) return new Set<number>()
    const s = new Set<number>()
    for (let i = 0; i < path.length - 1; i++) {
      EDGES.forEach((e, idx) => {
        if (e.from === path[i] && e.to === path[i + 1]) s.add(idx)
      })
    }
    return s
  }, [path])

  const nextEdgeIdxs = useMemo(() => {
    if (!nextSteps || path.length === 0) return new Set<number>()
    const last = path[path.length - 1]
    const s = new Set<number>()
    EDGES.forEach((e, idx) => {
      if (e.from === last && nextSteps.has(e.to)) s.add(idx)
    })
    return s
  }, [nextSteps, path])

  const pathSet = useMemo(() => new Set(path), [path])

  const onNodeClick = useCallback(
    (id: string) => {
      if (preset) return
      if (path.length > 0 && path[path.length - 1] === id) {
        setPath((p) => p.slice(0, -1))
        return
      }
      if (path.length === 0) {
        if (NODES[id].row === 0) setPath([id])
        return
      }
      if (nextSteps && nextSteps.has(id)) {
        setPath((p) => [...p, id])
      }
    },
    [path, nextSteps, preset],
  )

  const reset = useCallback(() => {
    setPath([])
    setPreset(null)
  }, [])

  const selectPreset = useCallback(
    (j: Journey) => {
      if (preset === j.id) {
        reset()
        return
      }
      setPath([])
      setPreset(j.id)
    },
    [preset, reset],
  )

  const getNodeOpacity = (id: string): number => {
    if (preset) {
      const j = JOURNEYS.find((j) => j.id === preset)
      return j && j.nodes.includes(id) ? 1 : DIM
    }
    if (path.length === 0) return 1
    if (pathSet.has(id)) return 1
    if (nextSteps && nextSteps.has(id)) return 1
    return DIM
  }

  const getEdgeState = (
    idx: number,
  ): 'default' | 'active' | 'next' | 'preset' | 'dim' => {
    if (preset) {
      const j = JOURNEYS.find((j) => j.id === preset)
      if (j && j.edges.includes(idx)) return 'preset'
      return 'dim'
    }
    if (path.length === 0) return 'default'
    if (pathEdgeIdxs.has(idx)) return 'active'
    if (nextEdgeIdxs.has(idx)) return 'next'
    return 'dim'
  }

  const isNodeClickable = (id: string): boolean => {
    if (preset) return false
    if (path.length === 0) return NODES[id].row === 0
    if (path[path.length - 1] === id) return true
    return !!(nextSteps && nextSteps.has(id))
  }

  const W = 1600
  const H = 1100
  const activePreset = preset
    ? JOURNEYS.find((j) => j.id === preset) ?? null
    : null

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        fontFamily: FONT_POPPINS,
        userSelect: 'none',
        color: T1,
      }}
    >
      {/* Preset pills — compact, top of diagram, with inline reset when active */}
      <div className="flex flex-shrink-0 flex-wrap items-center justify-center gap-2 pb-3">
        {JOURNEYS.map((j) => {
          const isActiveBtn = preset === j.id
          return (
            <button
              key={j.id}
              onClick={() => selectPreset(j)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: `1.5px solid ${isActiveBtn ? j.color : 'rgba(83, 234, 253, 0.18)'}`,
                cursor: 'pointer',
                fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                fontWeight: 700,
                fontFamily: FONT_POPPINS,
                whiteSpace: 'nowrap',
                background: isActiveBtn ? `${j.color}22` : 'rgba(5, 51, 69, 0.65)',
                color: isActiveBtn ? j.color : T2,
                boxShadow: isActiveBtn ? `0 2px 18px ${j.color}38` : 'none',
                transition: 'all 0.25s',
              }}
            >
              {j.label}
            </button>
          )
        })}
        {(path.length > 0 || preset) && (
          <button
            onClick={reset}
            style={{
              padding: '7px 12px',
              borderRadius: 999,
              border: `1px dashed ${P.cyan300}`,
              cursor: 'pointer',
              fontSize: 'clamp(0.72rem, 0.85vw, 0.85rem)',
              fontWeight: 600,
              fontFamily: FONT_POPPINS,
              whiteSpace: 'nowrap',
              background: 'transparent',
              color: P.cyan300,
              transition: 'all 0.2s',
            }}
          >
            ✕ Скинути
          </button>
        )}
      </div>

      {/* Active-preset description — thin status line under pills */}
      {preset && activePreset && (
        <div
          className="flex-shrink-0 px-4 pb-2 text-center"
          style={{
            fontSize: 'clamp(0.78rem, 0.9vw, 0.9rem)',
            color: T2,
            lineHeight: 1.4,
          }}
        >
          {activePreset.desc}
        </div>
      )}

      {/* Breadcrumb */}
      {path.length > 0 && !preset && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            gap: 4,
            padding: '4px 12px 8px',
            overflowX: 'auto',
          }}
        >
          {path.map((id, i) => {
            const n = NODES[id]
            const isLast = i === path.length - 1
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span
                  onClick={() => setPath(path.slice(0, i + 1))}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isLast ? `${n.color}33` : `${n.color}18`,
                    color: n.color,
                    border: isLast ? `1.5px solid ${n.color}` : `1px solid ${n.color}44`,
                    transition: 'all 0.2s',
                  }}
                >
                  {n.icon} {n.label}
                </span>
                {!isLast && <span style={{ color: T3, fontSize: 14 }}>→</span>}
              </div>
            )
          })}
          {nextSteps && nextSteps.size > 0 && (
            <>
              <span style={{ color: T3, fontSize: 14 }}>→</span>
              <span style={{ color: T3, fontSize: 11, fontStyle: 'italic' }}>
                обери наступний крок…
              </span>
            </>
          )}
          {nextSteps && nextSteps.size === 0 && (
            <>
              <span style={{ color: T3, fontSize: 14, marginLeft: 4 }}>→</span>
              <span style={{ color: P.mint, fontSize: 11, fontWeight: 700 }}>
                ✅ Конверсія!
              </span>
            </>
          )}
        </div>
      )}

      {/* SVG diagram — fills remaining vertical space, scales to fit */}
      <div
        className="relative min-h-0 flex-1"
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Інтерактивна діаграма воронки продажів"
          style={{ display: 'block' }}
        >
          <defs>
            <filter id="lr-funnel-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lr-funnel-glow-e" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {(Object.entries(P) as [PaletteKey, string][]).map(([k, v]) => (
              <marker
                key={k}
                id={`lrf-a-${k}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill={v} />
              </marker>
            ))}
            <marker
              id="lrf-a-dim"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={T3} opacity="0.4" />
            </marker>
          </defs>

          {/* Row separators */}
          {ROWS.map((r, i) => (
            <g key={i}>
              <text
                x={20}
                y={r.y + 14}
                fontSize={13}
                fill={T3}
                fontWeight="700"
                letterSpacing="0.14em"
                opacity={0.75}
              >
                {r.label}
              </text>
              {r.lineY !== null && (
                <line
                  x1={16}
                  y1={r.lineY}
                  x2={W - 16}
                  y2={r.lineY}
                  stroke={C2}
                  strokeWidth={1}
                  strokeDasharray="3,6"
                  opacity={0.55}
                />
              )}
            </g>
          ))}

          {/* Edges */}
          {EDGES.map((e, i) => {
            const state = getEdgeState(i)
            const path_ = edgePath(e.from, e.to)
            const cName = paletteKeyFor(e.color)
            const [lx, ly] = e.label ? midPt(e.from, e.to) : [0, 0]

            let stroke = e.color
            let sw = 1.5
            let opacity = 0.6
            let marker = cName ? `url(#lrf-a-${cName})` : 'url(#lrf-a-dim)'
            let showGlow = false
            let showLabel = true

            if (state === 'active') {
              sw = 3
              opacity = 0.92
              showGlow = true
            } else if (state === 'next') {
              sw = 2.5
              opacity = 0.85
              showGlow = true
            } else if (state === 'preset' && activePreset) {
              stroke = activePreset.color
              sw = 2.5
              opacity = 0.82
              showGlow = true
              const pcName = paletteKeyFor(activePreset.color)
              if (pcName) marker = `url(#lrf-a-${pcName})`
            } else if (state === 'dim') {
              stroke = T3 as string
              sw = 1
              opacity = FAINT
              marker = 'url(#lrf-a-dim)'
              showLabel = false
            }

            return (
              <g key={i} style={{ transition: 'opacity 0.35s' }}>
                {showGlow && (
                  <path
                    d={path_}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={sw + 5}
                    opacity={0.1}
                    filter="url(#lr-funnel-glow-e)"
                  />
                )}
                <path
                  d={path_}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={sw}
                  strokeDasharray={e.dashed ? '7,5' : 'none'}
                  markerEnd={marker}
                  opacity={opacity}
                />
                {e.label && showLabel && (
                  <g>
                    <rect
                      x={lx - e.label.length * 4.2 - 10}
                      y={ly - 12}
                      width={e.label.length * 8.4 + 20}
                      height={24}
                      rx={6}
                      fill={BG}
                      stroke={stroke}
                      strokeWidth={0.8}
                      opacity={0.95}
                    />
                    <text
                      x={lx}
                      y={ly + 4}
                      fontSize={12}
                      fill={stroke}
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {Object.entries(NODES).map(([id, n]) => {
            const op = getNodeOpacity(id)
            const clickable = isNodeClickable(id)
            const inPath = pathSet.has(id)
            const isLast = path.length > 0 && path[path.length - 1] === id
            const isNext = nextSteps && nextSteps.has(id)
            const small = n.row === 1 || n.row === 3
            const presetLit = !!(preset && activePreset && activePreset.nodes.includes(id))

            return (
              <g
                key={id}
                style={{
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'opacity 0.35s',
                }}
                opacity={op}
                onClick={() => clickable && onNodeClick(id)}
              >
                {isLast && !preset && (
                  <rect
                    x={n.x - 5}
                    y={n.y - 5}
                    width={n.w + 10}
                    height={n.h + 10}
                    rx={18}
                    fill="none"
                    stroke={n.color}
                    strokeWidth={2.5}
                    opacity={0.75}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.75;0.2;0.75"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
                {isNext && !preset && (
                  <rect
                    x={n.x - 3}
                    y={n.y - 3}
                    width={n.w + 6}
                    height={n.h + 6}
                    rx={16}
                    fill="none"
                    stroke={n.color}
                    strokeWidth={1.5}
                    strokeDasharray="4,3"
                    opacity={0.65}
                  >
                    <animate
                      attributeName="strokeDashoffset"
                      values="0;14"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
                {((n.glow && op > DIM) || presetLit) && activePreset && presetLit ? (
                  <rect
                    x={n.x - 6}
                    y={n.y - 6}
                    width={n.w + 12}
                    height={n.h + 12}
                    rx={20}
                    fill={activePreset.color}
                    opacity={0.08}
                    filter="url(#lr-funnel-glow)"
                  />
                ) : n.glow && op > DIM ? (
                  <rect
                    x={n.x - 6}
                    y={n.y - 6}
                    width={n.w + 12}
                    height={n.h + 12}
                    rx={20}
                    fill={n.color}
                    opacity={0.07}
                    filter="url(#lr-funnel-glow)"
                  />
                ) : null}
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={14}
                  fill={BG}
                  stroke={presetLit && activePreset ? activePreset.color : n.color}
                  strokeWidth={inPath || presetLit ? 2 : 1.3}
                />
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={14}
                  fill={presetLit && activePreset ? activePreset.color : n.color}
                  opacity={isLast ? 0.18 : inPath ? 0.12 : presetLit ? 0.1 : 0.05}
                />
                <text
                  x={n.x + (small ? 14 : 20)}
                  y={n.y + (n.sub ? (small ? 34 : 40) : n.h / 2 + 8)}
                  fontSize={small ? 22 : 28}
                >
                  {n.icon}
                </text>
                <text
                  x={n.x + (small ? 44 : 58)}
                  y={n.y + (n.sub ? (small ? 30 : 34) : n.h / 2 + 7)}
                  fontSize={small ? 17 : 20}
                  fontWeight="700"
                  fill={T1}
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={n.x + (small ? 44 : 58)}
                    y={n.y + (small ? 50 : 58)}
                    fontSize={small ? 13 : 15}
                    fill={T2 as string}
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
