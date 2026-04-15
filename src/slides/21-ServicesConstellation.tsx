import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import {
  labelReveal,
  nodeDot,
  nodeDrift,
  rayDraw,
} from '@/animations/constellation'

const VB_W = 1920
const VB_H = 1080
const CENTER_X = VB_W / 2
const CENTER_Y = VB_H / 2
const BASE_RADIUS = 440
const RADIUS_JITTER = 30
const ANGLE_JITTER_DEG = 5
const INNER_RADIUS = 240
const NODE_CORE_R = 9
const NODE_HALO_R = 26
const PACKET_R = 10

// Angular order starting at 12 oʼclock clockwise. Brand names stay Latin.
const SERVICES: string[] = [
  'Вебсайти та eCommerce',
  'Брендинг та логотипи',
  'Дизайнʼсистеми',
  'CRM-системи',
  'ERP та бізнес-системи',
  'AI-чатботи',
  'Автоматизація процесів',
  'SMM та соцмережі',
  'Аналітика',
  'Омніканал',
]

// Deterministic [0,1) from integer seed (Knuth multiplicative hash).
function hashUnit(seed: number) {
  return ((seed * 2654435761) >>> 0) / 2 ** 32
}

interface NodeGeometry {
  label: string
  index: number
  angleRad: number
  angleDeg: number
  radius: number
  x: number
  y: number
  innerX: number
  innerY: number
  labelX: number
  labelY: number
  labelAnchor: 'start' | 'middle' | 'end'
  driftDx: number
  driftDy: number
  driftDuration: number
  driftPhase: number
}

function computeGeometry(): NodeGeometry[] {
  const baseStepDeg = 360 / SERVICES.length // 36
  return SERVICES.map((label, i) => {
    const baseAngleDeg = -90 + i * baseStepDeg // -90 = 12 oʼclock, clockwise
    const angleJitter = (hashUnit(i + 1) - 0.5) * 2 * ANGLE_JITTER_DEG
    const radiusJitter = (hashUnit(i + 101) - 0.5) * 2 * RADIUS_JITTER
    const angleDeg = baseAngleDeg + angleJitter
    const angleRad = (angleDeg * Math.PI) / 180
    const radius = BASE_RADIUS + radiusJitter

    const cos = Math.cos(angleRad)
    const sin = Math.sin(angleRad)

    const x = CENTER_X + cos * radius
    const y = CENTER_Y + sin * radius
    const innerX = CENTER_X + cos * INNER_RADIUS
    const innerY = CENTER_Y + sin * INNER_RADIUS

    // Label sits further out along the radial.
    const labelOffset = 32
    const labelX = CENTER_X + cos * (radius + labelOffset)
    const labelY = CENTER_Y + sin * (radius + labelOffset)

    // Anchor: horizontal band around top/bottom → centered;
    //   right half → start (left-aligned); left half → end (right-aligned).
    let labelAnchor: 'start' | 'middle' | 'end'
    const absCos = Math.abs(cos)
    if (absCos < 0.26) {
      labelAnchor = 'middle'
    } else if (cos > 0) {
      labelAnchor = 'start'
    } else {
      labelAnchor = 'end'
    }

    // Per-node drift direction (perpendicular-ish) — deterministic.
    const driftR1 = hashUnit(i + 211)
    const driftR2 = hashUnit(i + 307)
    const driftAngle = driftR1 * Math.PI * 2
    const driftDx = Math.cos(driftAngle) * 4
    const driftDy = Math.sin(driftAngle) * 4
    const driftDuration = 8 + driftR2 * 4 // 8–12s
    const driftPhase = hashUnit(i + 409) * 2

    return {
      label,
      index: i,
      angleRad,
      angleDeg,
      radius,
      x,
      y,
      innerX,
      innerY,
      labelX,
      labelY,
      labelAnchor,
      driftDx,
      driftDy,
      driftDuration,
      driftPhase,
    }
  })
}

/* -------------------------------------------------------------------------- */
/* Light packet — one at a time, every 4–6s, on a random ray.                 */
/* -------------------------------------------------------------------------- */

interface LightPacketProps {
  nodes: NodeGeometry[]
}

/**
 * Emits light packets on random rays, one at a time, every 4–6s.
 * Parent gates mounting via a `key` that changes with isActive/reduced — so
 * this component only mounts when it should actually run, and unmounts
 * (cleanly resetting all state) otherwise. Keeps the effect body free of
 * conditional setState calls (React 19 compiler-aware lint).
 */
function LightPacket({ nodes }: LightPacketProps) {
  const [pkt, setPkt] = useState<{ key: number; node: NodeGeometry } | null>(
    null,
  )
  const timerRef = useRef<number | null>(null)
  const keyRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    const scheduleNext = (delay: number) => {
      if (cancelled) return
      timerRef.current = window.setTimeout(() => {
        if (cancelled) return
        const node = nodes[Math.floor(Math.random() * nodes.length)]
        keyRef.current += 1
        setPkt({ key: keyRef.current, node })
        const TRAVEL_MS = 1200
        const GAP_MS = 4000 + Math.random() * 2000
        timerRef.current = window.setTimeout(() => {
          if (cancelled) return
          setPkt(null)
          scheduleNext(GAP_MS)
        }, TRAVEL_MS)
      }, delay)
    }

    // Wait until after the constellation builds (~4s) before the first packet.
    scheduleNext(4500)

    return () => {
      cancelled = true
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [nodes])

  if (!pkt) return null

  const { node } = pkt
  return (
    <motion.circle
      key={pkt.key}
      r={PACKET_R}
      initial={{
        cx: node.innerX,
        cy: node.innerY,
        opacity: 0,
      }}
      animate={{
        cx: [node.innerX, node.x],
        cy: [node.innerY, node.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.2,
        times: [0, 0.15, 0.85, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
      fill="#a2f4fd"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(0, 211, 242, 0.9))',
      }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Slide                                                                      */
/* -------------------------------------------------------------------------- */

export function ServicesConstellationSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const animState = isActive || reduce ? 'visible' : 'hidden'

  const nodes = useMemo(() => computeGeometry(), [])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Title bar — top-left corner, understated */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isActive || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-16 top-14 z-20 flex flex-col gap-2"
      >
        <span
          className="text-[11px] uppercase tracking-[0.42em] text-cyan-300/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          · 21 / Наші продукти ·
        </span>
        <h2
          className="max-w-[14ch] text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2rem, 2.6vw, 2.75rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Екосистема сервісів
        </h2>
      </motion.div>

      {/* Footnote — bottom-right, quiet */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isActive || reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 3.6, duration: 0.8 }}
        className="absolute bottom-12 right-16 z-20 max-w-[32ch] text-right text-sm text-cyan-200/60"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
      >
        Один партнер для всієї цифрової інфраструктури — дизайн, розробка,
        автоматизація, аналітика.
      </motion.p>

      {/* Constellation SVG */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 z-[5] h-full w-full"
      >
        <defs>
          <radialGradient id="node-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a2f4fd" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#53eafd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00d3f2" stopOpacity="0" />
          </radialGradient>

          <filter id="ray-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rays */}
        <g filter="url(#ray-glow)">
          {nodes.map((n) => (
            <motion.line
              key={`ray-${n.index}`}
              x1={n.innerX}
              y1={n.innerY}
              x2={n.x}
              y2={n.y}
              stroke="rgba(83, 234, 253, 0.35)"
              strokeWidth={1}
              strokeLinecap="round"
              custom={n.index}
              variants={rayDraw}
              initial="hidden"
              animate={animState}
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 211, 242, 0.45))',
              }}
            />
          ))}
        </g>

        {/* Nodes + labels — wrapped per-node so drift moves them together */}
        {nodes.map((n) => (
          <motion.g
            key={`node-${n.index}`}
            variants={nodeDrift({
              dx: n.driftDx,
              dy: n.driftDy,
              duration: n.driftDuration,
              phase: n.driftPhase,
            })}
            initial="hidden"
            animate={animState}
          >
            {/* Halo */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={NODE_HALO_R}
              fill="url(#node-halo)"
              custom={n.index}
              variants={nodeDot}
              initial="hidden"
              animate={animState}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            {/* Core dot */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={NODE_CORE_R}
              fill="#a2f4fd"
              custom={n.index}
              variants={nodeDot}
              initial="hidden"
              animate={animState}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 211, 242, 1))',
                transformOrigin: `${n.x}px ${n.y}px`,
              }}
            />

            {/* Label — direction-biased fade + radial slide */}
            <motion.text
              x={n.labelX}
              y={n.labelY}
              textAnchor={n.labelAnchor}
              dominantBaseline={
                n.y < CENTER_Y - 200 ? 'auto' : n.y > CENTER_Y + 200 ? 'hanging' : 'middle'
              }
              fill="#F0F4F8"
              custom={{
                dx: Math.cos(n.angleRad),
                dy: Math.sin(n.angleRad),
                index: n.index,
              }}
              variants={labelReveal}
              initial="hidden"
              animate={animState}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                letterSpacing: '-0.005em',
              }}
            >
              {n.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Light packet — mounted only when active & motion allowed.
            Key flip unmounts/resets the effect cleanly. */}
        {isActive && !reduce ? (
          <LightPacket key="pkt-on" nodes={nodes} />
        ) : null}
      </svg>
    </div>
  )
}

export default ServicesConstellationSlide
