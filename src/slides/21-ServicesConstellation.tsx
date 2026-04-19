import { useEffect, useMemo, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import type { SlideProps } from '@/engine/types'
import {
  constellationReveal,
  labelFadeIn,
  labelReveal,
  nodeDot,
  orbitClockwise,
  orbitCounter,
  rayDraw,
  rayGrow,
  starPop,
} from '@/animations/constellation'

const VB_W = 1920
const VB_H = 1080
const CENTER_X = VB_W / 2
const CENTER_Y = VB_H / 2
const BASE_RADIUS = 470
const RADIUS_JITTER = 28
const ANGLE_JITTER_DEG = 4
const INNER_RADIUS = 240
const NODE_CORE_R = 9
const NODE_HALO_R = 28
const PACKET_R = 9

// Rotation is currently disabled per presenter preference — the slight
// clockwise drift fought with label legibility during narration. The
// machinery (motion value, counter-rotation transform, rotating group
// wrapper) stays wired so it can be re-enabled by flipping the flag.
const ROTATION_ENABLED = false
const ROTATION_PERIOD_SEC = 120

// Intro timing — deliberate charge build-up, held briefly at peak, then
// a clear burst. Rays/stars reveal during the burst so the motion reads
// as the explosion carrying them outward. Ripple packets fire after the
// stars have fully landed.
//
// The rays/stars reveal delay (2.2s) lives in `constellationReveal`'s
// delayChildren in src/animations/constellation.ts; keep the two in
// sync if either changes.
const INTRO_AURA_DURATION_S = 3.0
const INTRO_RIPPLE_START_S = 3.2
const INTRO_RIPPLE_STAGGER_S = 0.15

// Ambient cycle timing (seconds).
const AMBIENT_INITIAL_DELAY_MS = 6000
const AMBIENT_CHARGE_MS = 3500
const AMBIENT_FIRE_MS = 900
const AMBIENT_REST_MS = 600

interface Service {
  label: string
  description: string
}

// Angular order starting at 12 oʼclock clockwise. Brand names stay Latin.
// Apostrophes use U+02BC where Ukrainian orthography requires them.
const SERVICES: Service[] = [
  {
    label: 'Вебсайти та eCommerce',
    description:
      'Магазини на Shopify, Magento, WordPress і кастомні платформи',
  },
  {
    label: 'Брендинг та логотипи',
    description:
      'Логотип, фірмовий стиль і брендбук для нової компанії або ребрендингу',
  },
  {
    label: 'Дизайн-системи',
    description: 'UI-бібліотеки та компонентні системи для продуктових команд',
  },
  {
    label: 'CRM-системи',
    description: 'Впровадження, інтеграція та кастомізація клієнтських систем',
  },
  {
    label: 'ERP та бізнес-системи',
    description: 'Автоматизація облікових і операційних процесів компанії',
  },
  {
    label: 'AI-чатботи',
    description:
      'GPT-інтеграції для підтримки, продажів і внутрішніх асистентів',
  },
  {
    label: 'Автоматизація процесів',
    description: 'n8n, Make та кастомні сценарії без ручної роботи',
  },
  {
    label: 'SMM та соцмережі',
    description:
      'Контент-стратегія, ведення Instagram, Facebook, LinkedIn',
  },
  {
    label: 'Аналітика',
    description: 'GA4, дашборди, звіти та рішення на основі даних',
  },
  {
    label: 'Омніканал',
    description:
      'Єдина комунікація з клієнтом через усі канали — від сайту до CRM',
  },
]

// Deterministic [0,1) from integer seed (Knuth multiplicative hash).
function hashUnit(seed: number) {
  return ((seed * 2654435761) >>> 0) / 2 ** 32
}

interface NodeGeometry {
  label: string
  description: string
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
  labelBaseline: 'auto' | 'middle' | 'hanging'
  driftDx: number
  driftDy: number
  driftDuration: number
  driftPhase: number
  radialCos: number
  radialSin: number
}

function computeGeometry(): NodeGeometry[] {
  const baseStepDeg = 360 / SERVICES.length // 36
  return SERVICES.map((svc, i) => {
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

    const labelOffset = 36
    const labelX = CENTER_X + cos * (radius + labelOffset)
    const labelY = CENTER_Y + sin * (radius + labelOffset)

    let labelAnchor: 'start' | 'middle' | 'end'
    const absCos = Math.abs(cos)
    if (absCos < 0.26) {
      labelAnchor = 'middle'
    } else if (cos > 0) {
      labelAnchor = 'start'
    } else {
      labelAnchor = 'end'
    }

    const labelBaseline: 'auto' | 'middle' | 'hanging' =
      y < CENTER_Y - 200 ? 'auto' : y > CENTER_Y + 200 ? 'hanging' : 'middle'

    // Per-node drift direction — deterministic.
    const driftR1 = hashUnit(i + 211)
    const driftR2 = hashUnit(i + 307)
    const driftAngle = driftR1 * Math.PI * 2
    const driftDx = Math.cos(driftAngle) * 4
    const driftDy = Math.sin(driftAngle) * 4
    const driftDuration = 8 + driftR2 * 4 // 8–12s
    const driftPhase = hashUnit(i + 409) * 2

    return {
      label: svc.label,
      description: svc.description,
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
      labelBaseline,
      driftDx,
      driftDy,
      driftDuration,
      driftPhase,
      radialCos: cos,
      radialSin: sin,
    }
  })
}

/* -------------------------------------------------------------------------- */
/* One-shot packet. `t` runs 0→1 once; cx/cy track the drifting star via      */
/* multi-input useTransform so the target stays locked even mid-flight.       */
/* -------------------------------------------------------------------------- */

interface PacketProps {
  node: NodeGeometry
  driftX: MotionValue<number>
  driftY: MotionValue<number>
  delay?: number
  duration?: number
}

function Packet({
  node,
  driftX,
  driftY,
  delay = 0,
  duration = 0.9,
}: PacketProps) {
  const t = useMotionValue(0)

  const cx = useTransform<number, number>(
    [t, driftX],
    ([tv, dv]) => node.innerX + (node.x + dv - node.innerX) * tv,
  )
  const cy = useTransform<number, number>(
    [t, driftY],
    ([tv, dv]) => node.innerY + (node.y + dv - node.innerY) * tv,
  )

  useEffect(() => {
    const ctrl = animate(t, [0, 1], {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => ctrl.stop()
  }, [t, delay, duration])

  const opacity = useTransform(t, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <motion.circle
      r={PACKET_R}
      cx={cx}
      cy={cy}
      fill="#a2f4fd"
      opacity={opacity}
      style={{
        filter: 'drop-shadow(0 0 10px rgba(0, 211, 242, 0.95))',
      }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Per-branch render: ray, star, label, sparkles — all reading the branch's   */
/* shared driftX/driftY. Label is wrapped in a counter-rotating group so its  */
/* text stays upright while the parent constellation rotates.                 */
/* -------------------------------------------------------------------------- */

interface BranchProps {
  node: NodeGeometry
  driftX: MotionValue<number>
  driftY: MotionValue<number>
  isActive: boolean
  reduce: boolean
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  labelCounterRotate: MotionValue<number>
}

function Branch({
  node,
  driftX,
  driftY,
  isActive,
  reduce,
  hoveredIndex,
  setHoveredIndex,
  labelCounterRotate,
}: BranchProps) {
  // Ray endpoints track drift.
  const x2 = useTransform(driftX, (v) => node.x + v)
  const y2 = useTransform(driftY, (v) => node.y + v)

  const isDimmed = hoveredIndex !== null && hoveredIndex !== node.index
  const isHovered = hoveredIndex === node.index

  // Sparkle offsets around the star position (deterministic per node).
  const sparkles = useMemo(() => {
    return [0, 1, 2].map((k) => {
      const r1 = hashUnit(node.index * 13 + k * 7 + 1)
      const r2 = hashUnit(node.index * 13 + k * 7 + 2)
      const r3 = hashUnit(node.index * 13 + k * 7 + 3)
      const angle = r1 * Math.PI * 2
      const dist = 18 + r2 * 14
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: r3 * 2.5,
        duration: 2.2 + r2 * 1.2,
      }
    })
  }, [node.index])

  return (
    <motion.g
      animate={{
        opacity: isDimmed ? 0.35 : 1,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ray — flat cyan stroke, grows outward on reveal */}
      <motion.line
        x1={node.innerX}
        y1={node.innerY}
        x2={x2}
        y2={y2}
        stroke="rgba(83, 234, 253, 0.45)"
        strokeWidth={isHovered ? 2 : 1.25}
        strokeLinecap="round"
        variants={isActive && !reduce ? rayGrow : rayDraw}
        style={{
          filter: isHovered
            ? 'drop-shadow(0 0 8px rgba(0, 211, 242, 0.85))'
            : 'drop-shadow(0 0 4px rgba(0, 211, 242, 0.45))',
        }}
      />

      {/* Drifting group: halo, core, hit area, sparkles, label */}
      <motion.g style={{ x: driftX, y: driftY }}>
        {/* Halo */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={NODE_HALO_R}
          fill="url(#node-halo)"
          variants={isActive && !reduce ? starPop : nodeDot}
          style={{
            transformOrigin: `${node.x}px ${node.y}px`,
            opacity: isHovered ? 1 : 0.85,
          }}
        />

        {/* Core dot */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={NODE_CORE_R}
          fill="#a2f4fd"
          variants={isActive && !reduce ? starPop : nodeDot}
          style={{
            filter: 'drop-shadow(0 0 12px rgba(0, 211, 242, 1))',
            transformOrigin: `${node.x}px ${node.y}px`,
          }}
        />

        {/* Hover scale-up layer */}
        {!reduce ? (
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={NODE_CORE_R}
            fill="#ffffff"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              transformOrigin: `${node.x}px ${node.y}px`,
              opacity: isHovered ? 1 : 0,
              pointerEvents: 'none',
            }}
          />
        ) : null}

        {/* Sparkles — tiny pulsing dots near each star */}
        {isActive && !reduce
          ? sparkles.map((sp, i) => (
              <motion.circle
                key={`sparkle-${node.index}-${i}`}
                cx={node.x + sp.dx}
                cy={node.y + sp.dy}
                r={1.5}
                fill="#a2f4fd"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{
                  duration: sp.duration,
                  delay: 1.8 + sp.delay,
                  repeat: Infinity,
                  repeatDelay: 0.5 + sp.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(162, 244, 253, 0.9))',
                }}
              />
            ))
          : null}

        {/* Label: translate to the label anchor, counter-rotate so text
           stays upright while the parent constellation rotates. */}
        <motion.g transform={`translate(${node.labelX}, ${node.labelY})`}>
          <motion.g style={{ rotate: labelCounterRotate }}>
            <motion.text
              x={0}
              y={0}
              textAnchor={node.labelAnchor}
              dominantBaseline={node.labelBaseline}
              fill="#F0F4F8"
              variants={isActive && !reduce ? labelFadeIn : labelReveal}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 30,
                letterSpacing: '0.01em',
              }}
            >
              {node.label}
            </motion.text>
          </motion.g>
        </motion.g>

        {/* Hit area — transparent circle catches hover */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={60}
          fill="transparent"
          style={{
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          onHoverStart={() => setHoveredIndex(node.index)}
          onHoverEnd={() => setHoveredIndex(null)}
          onFocus={() => setHoveredIndex(node.index)}
          onBlur={() => setHoveredIndex(null)}
        />
      </motion.g>
    </motion.g>
  )
}

/* -------------------------------------------------------------------------- */
/* Ambient pulse driver — charge → fire → rest cycle. Fires one packet to a   */
/* random (non-repeat) branch every ~5s. Returns the current cycle phase and  */
/* branch + key so the aura and packet components can react.                  */
/* -------------------------------------------------------------------------- */

type PulsePhase = 'idle' | 'charging' | 'firing' | 'resting'

interface PulseState {
  phase: PulsePhase
  firingBranch: number | null
  cycleKey: number
}

function useAmbientPulse(
  isActive: boolean,
  reduce: boolean,
  branchCount: number,
): PulseState {
  const [state, setState] = useState<PulseState>(() => ({
    phase: 'idle',
    firingBranch: null,
    cycleKey: 0,
  }))
  const lastBranchRef = useRef<number>(-1)

  useEffect(() => {
    if (!isActive || reduce) {
      return
    }

    const timers: number[] = []
    let cancelled = false
    let cycleKey = 0

    const startCycle = () => {
      if (cancelled) return
      setState({ phase: 'charging', firingBranch: null, cycleKey })
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          let idx = Math.floor(Math.random() * branchCount)
          if (idx === lastBranchRef.current) {
            idx = (idx + 1) % branchCount
          }
          lastBranchRef.current = idx
          cycleKey += 1
          setState({ phase: 'firing', firingBranch: idx, cycleKey })
          timers.push(
            window.setTimeout(() => {
              if (cancelled) return
              setState({ phase: 'resting', firingBranch: null, cycleKey })
              timers.push(
                window.setTimeout(() => {
                  if (cancelled) return
                  startCycle()
                }, AMBIENT_REST_MS),
              )
            }, AMBIENT_FIRE_MS),
          )
        }, AMBIENT_CHARGE_MS),
      )
    }

    timers.push(window.setTimeout(startCycle, AMBIENT_INITIAL_DELAY_MS))

    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [isActive, reduce, branchCount])

  return state
}

/* -------------------------------------------------------------------------- */
/* Slide                                                                      */
/* -------------------------------------------------------------------------- */

export function ServicesConstellationSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const nodes = useMemo(() => computeGeometry(), [])

  // Per-node shared drift motion values. Every ray, star, label, packet,
  // and hit-target reads from the SAME pair — so rays and packets track
  // the drifting stars precisely.
  //
  // SERVICES is a fixed-length list of 10; declaring the motion values
  // inline keeps React rules-of-hooks invariants clean (no loops, no
  // conditional calls). If SERVICES length changes, update below too.
  const dx0 = useMotionValue(0), dy0 = useMotionValue(0)
  const dx1 = useMotionValue(0), dy1 = useMotionValue(0)
  const dx2 = useMotionValue(0), dy2 = useMotionValue(0)
  const dx3 = useMotionValue(0), dy3 = useMotionValue(0)
  const dx4 = useMotionValue(0), dy4 = useMotionValue(0)
  const dx5 = useMotionValue(0), dy5 = useMotionValue(0)
  const dx6 = useMotionValue(0), dy6 = useMotionValue(0)
  const dx7 = useMotionValue(0), dy7 = useMotionValue(0)
  const dx8 = useMotionValue(0), dy8 = useMotionValue(0)
  const dx9 = useMotionValue(0), dy9 = useMotionValue(0)

  const driftX = useMemo(
    () => [dx0, dx1, dx2, dx3, dx4, dx5, dx6, dx7, dx8, dx9],
    [dx0, dx1, dx2, dx3, dx4, dx5, dx6, dx7, dx8, dx9],
  )
  const driftY = useMemo(
    () => [dy0, dy1, dy2, dy3, dy4, dy5, dy6, dy7, dy8, dy9],
    [dy0, dy1, dy2, dy3, dy4, dy5, dy6, dy7, dy8, dy9],
  )

  // Animate drift when active.
  useEffect(() => {
    if (!isActive || reduce) return
    const controls = nodes
      .map((n, i) => [
        animate(driftX[i], [0, n.driftDx, 0, -n.driftDx * 0.6, 0], {
          duration: n.driftDuration,
          delay: 1.6 + n.driftPhase,
          repeat: Infinity,
          ease: 'easeInOut',
        }),
        animate(driftY[i], [0, n.driftDy, 0, -n.driftDy * 0.6, 0], {
          duration: n.driftDuration,
          delay: 1.6 + n.driftPhase,
          repeat: Infinity,
          ease: 'easeInOut',
        }),
      ])
      .flat()
    return () => controls.forEach((c) => c.stop())
  }, [isActive, reduce, nodes, driftX, driftY])

  // Continuous clockwise rotation of the whole constellation.
  const rotation = useMotionValue(0)
  const labelCounterRotate = useTransform(rotation, (v) => -v)

  useEffect(() => {
    if (!ROTATION_ENABLED || !isActive || reduce) {
      rotation.set(0)
      return
    }
    const ctrl = animate(rotation, [0, 360], {
      duration: ROTATION_PERIOD_SEC,
      repeat: Infinity,
      ease: 'linear',
    })
    return () => {
      ctrl.stop()
      rotation.set(0)
    }
  }, [isActive, reduce, rotation])

  // Ambient pulse state.
  const pulse = useAmbientPulse(isActive, reduce, nodes.length)

  // Hover state.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const effectiveHover = isActive ? hoveredIndex : null

  // Key the reveal container on isActive so the intro arc replays on each
  // revisit of the slide.
  const revealKey = isActive ? 'on' : 'off'
  const revealAnimateState = isActive || reduce ? 'visible' : 'hidden'

  const hoveredNode = effectiveHover !== null ? nodes[effectiveHover] : null

  // Ambient aura scales + brightens during charging, fades during fire/rest.
  // Also forced off when the slide is inactive so stale state from the
  // useAmbientPulse effect doesn't leak a visible aura between visits.
  const ambientAuraActive = isActive && pulse.phase === 'charging'

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Title bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={
          isActive || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }
        }
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-16 top-14 z-20 flex flex-col gap-2"
      >
        <span
          className="text-sm uppercase tracking-[0.36em] text-cyan-300/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          · 21 / Наші продукти ·
        </span>
        <h2
          className="max-w-[14ch] text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2.5rem, 3vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Екосистема сервісів
        </h2>
      </motion.div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isActive || reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 3.6, duration: 0.8 }}
        className="absolute bottom-12 right-16 z-20 max-w-[36ch] text-right text-base text-cyan-200/60 sm:text-lg"
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
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id="node-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a2f4fd" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#53eafd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00d3f2" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="charge-aura-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a2f4fd" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#00d3f2" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#00b8db" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00b8db" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ambient-aura-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a2f4fd" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00d3f2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d3f2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Intro charge aura — outside the rotation wrapper, replays on
           each activation via key. Four-stop curve: slow climb, brief
           hold at peak, explosive release, complete fade. */}
        {!reduce ? (
          <motion.circle
            key={`intro-aura-${revealKey}`}
            cx={CENTER_X}
            cy={CENTER_Y}
            r={240}
            fill="url(#charge-aura-grad)"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={
              isActive
                ? {
                    scale: [0.3, 0.95, 1.0, 2.2],
                    opacity: [0, 0.95, 0.95, 0],
                  }
                : { scale: 0.3, opacity: 0 }
            }
            transition={{
              duration: INTRO_AURA_DURATION_S,
              times: [0, 0.55, 0.67, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
              pointerEvents: 'none',
            }}
          />
        ) : null}

        {/* Ambient pulse aura — pulses up during `charging` phase, fades
           during fire/rest. */}
        {!reduce ? (
          <motion.circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={160}
            fill="url(#ambient-aura-grad)"
            animate={{
              scale: ambientAuraActive ? [0.4, 0.75] : 0.4,
              opacity: ambientAuraActive ? [0, 0.6] : 0,
            }}
            transition={{
              duration: ambientAuraActive ? AMBIENT_CHARGE_MS / 1000 : 0.5,
              ease: 'easeIn',
            }}
            style={{
              transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
              pointerEvents: 'none',
            }}
          />
        ) : null}

        {/* Orbit rings — counter-rotating dashed circles. */}
        {isActive && !reduce ? (
          <>
            <motion.g
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              animate={orbitClockwise.animate}
            >
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={380}
                fill="none"
                stroke="rgba(0, 184, 219, 0.18)"
                strokeWidth={1}
                strokeDasharray="4 18"
              />
            </motion.g>
            <motion.g
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              animate={orbitCounter.animate}
            >
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={310}
                fill="none"
                stroke="rgba(0, 211, 242, 0.14)"
                strokeWidth={1}
                strokeDasharray="2 14"
              />
            </motion.g>
          </>
        ) : null}

        {/* Continuously rotating constellation group. Labels counter-rotate
           inside Branch so text stays upright. */}
        <motion.g
          style={{
            rotate: rotation,
            transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
          }}
          pointerEvents="auto"
        >
          <motion.g
            key={revealKey}
            variants={constellationReveal}
            initial="hidden"
            animate={revealAnimateState}
          >
            {nodes.map((n, i) => (
              <Branch
                key={`branch-${n.index}`}
                node={n}
                driftX={driftX[i]}
                driftY={driftY[i]}
                isActive={isActive}
                reduce={reduce}
                hoveredIndex={effectiveHover}
                setHoveredIndex={setHoveredIndex}
                labelCounterRotate={labelCounterRotate}
              />
            ))}

            {/* Intro ripple — one-shot packets clockwise, 0.15s stagger,
               keyed on revealKey so they replay each activation. Starts
               after stars have fully landed (INTRO_RIPPLE_START_S). */}
            {isActive && !reduce
              ? nodes.map((n, i) => (
                  <Packet
                    key={`ripple-${revealKey}-${n.index}`}
                    node={n}
                    driftX={driftX[i]}
                    driftY={driftY[i]}
                    delay={INTRO_RIPPLE_START_S + i * INTRO_RIPPLE_STAGGER_S}
                    duration={0.9}
                  />
                ))
              : null}

            {/* Ambient packet — fires to a random branch each cycle. */}
            {isActive && !reduce && pulse.phase === 'firing' && pulse.firingBranch !== null ? (
              <Packet
                key={`ambient-${pulse.cycleKey}`}
                node={nodes[pulse.firingBranch]}
                driftX={driftX[pulse.firingBranch]}
                driftY={driftY[pulse.firingBranch]}
                delay={0}
                duration={AMBIENT_FIRE_MS / 1000}
              />
            ) : null}
          </motion.g>
        </motion.g>
      </svg>

      {/* Tooltip overlay (HTML, not SVG) */}
      {hoveredNode ? (
        <motion.div
          key={`tip-${hoveredNode.index}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute z-30 rounded-xl border border-cyan-400/30 bg-cyan-950/90 px-4 py-3 shadow-[0_0_32px_rgba(0,211,242,0.25)] backdrop-blur-md"
          style={{
            maxWidth: 320,
            left: `${((hoveredNode.x + hoveredNode.radialCos * 80) / VB_W) * 100}%`,
            top: `${((hoveredNode.y + hoveredNode.radialSin * 80) / VB_H) * 100}%`,
            transform: tooltipTransform(hoveredNode),
          }}
        >
          <div
            className="text-cyan-50"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 19,
              lineHeight: 1.25,
            }}
          >
            {hoveredNode.label}
          </div>
          <div
            className="mt-1 text-cyan-100/80"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.4,
            }}
          >
            {hoveredNode.description}
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}

// Tooltip is positioned at a point offset outward from the star along the
// node's radial; nudge it so it visually anchors on the outer edge rather
// than overlapping the star. Anchor only responds to the node's static
// base position — the tooltip surfaces on hover, before the rotation has
// moved the star far from that base.
function tooltipTransform(n: NodeGeometry): string {
  const tx = n.radialCos > 0.3 ? '0%' : n.radialCos < -0.3 ? '-100%' : '-50%'
  const ty = n.radialSin > 0.3 ? '0%' : n.radialSin < -0.3 ? '-100%' : '-50%'
  return `translate(${tx}, ${ty})`
}

export default ServicesConstellationSlide
