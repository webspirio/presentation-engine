import { motion, type Variants } from 'motion/react'
import { Bot, Calendar, Globe, Users, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { easeSmooth } from '@/animations/transitions'
import { lrFunnelPulseRing } from '@/animations/lrTimeline'

const FONT_POPPINS = "'Poppins', sans-serif"

interface FunnelNodeData {
  id: string
  label: string
  Icon: LucideIcon
  isResult?: boolean
}

const NODES: FunnelNodeData[] = [
  { id: 'reels', label: 'Reels', Icon: Video },
  { id: 'bot', label: 'Бот', Icon: Bot },
  { id: 'bridge', label: 'Мостова', Icon: Globe },
  { id: 'cal', label: 'Календар', Icon: Calendar },
  { id: 'consult', label: 'Консультація', Icon: Users, isResult: true },
]

interface LrFunnelFlowProps {
  isActive: boolean
  /** fragment >= 1 — edges draw between nodes */
  pathRevealed: boolean
  /** fragment >= 2 — final node starts pulsing */
  resultActive: boolean
}

// Per-node entrance. Stagger is applied by the caller via an explicit
// `delay` prop so node and edge timings can be composed independently.
const nodeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth, delay },
  }),
}

const edgePathVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.55, ease: easeSmooth, delay },
      opacity: { duration: 0.3, ease: easeSmooth, delay },
    },
  }),
}

const arrowHeadVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easeSmooth, delay: delay + 0.4 },
  }),
}

function Node({
  data,
  active,
  delay,
  resultActive,
}: {
  data: FunnelNodeData
  active: boolean
  delay: number
  resultActive: boolean
}) {
  const { Icon, isResult } = data
  const showPulse = isResult === true && resultActive
  return (
    <motion.div
      custom={delay}
      variants={nodeVariant}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="flex shrink-0 flex-col items-center gap-2"
    >
      <div className="relative">
        {isResult ? (
          <motion.span
            aria-hidden
            variants={lrFunnelPulseRing}
            initial="idle"
            animate={showPulse ? 'pulse' : 'idle'}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              border: '2px solid #53eafd',
              boxShadow: '0 0 24px rgba(83, 234, 253, 0.6)',
            }}
          />
        ) : null}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
          style={{
            background:
              'linear-gradient(135deg, #00d3f2 0%, #53eafd 55%, #a2f4fd 100%)',
            boxShadow: isResult
              ? '0 16px 36px -12px rgba(0, 211, 242, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
              : '0 14px 30px -14px rgba(0, 211, 242, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <Icon size={34} color="#053345" strokeWidth={2.2} />
        </div>
      </div>
      <span
        className="text-[#F0F4F8]"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 500,
          fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
          letterSpacing: '-0.005em',
        }}
      >
        {data.label}
      </span>
    </motion.div>
  )
}

function Edge({
  active,
  delay,
}: {
  active: boolean
  delay: number
}) {
  const animState = active ? 'visible' : 'hidden'
  return (
    <svg
      aria-hidden
      width="76"
      height="18"
      viewBox="0 0 60 14"
      fill="none"
      className="shrink-0 self-start"
      style={{ marginTop: 30 }}
    >
      <motion.path
        d="M3 7 L50 7"
        stroke="#53eafd"
        strokeWidth="1.8"
        strokeLinecap="round"
        custom={delay}
        variants={edgePathVariant}
        initial="hidden"
        animate={animState}
      />
      <motion.path
        d="M46 2 L53 7 L46 12"
        stroke="#53eafd"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        custom={delay}
        variants={arrowHeadVariant}
        initial="hidden"
        animate={animState}
      />
    </svg>
  )
}

export function LrFunnelFlow({
  isActive,
  pathRevealed,
  resultActive,
}: LrFunnelFlowProps) {
  return (
    <div className="flex w-full max-w-5xl flex-wrap items-start justify-center gap-y-6">
      {NODES.map((node, idx) => (
        <div key={node.id} className="flex items-start">
          <Node
            data={node}
            active={isActive}
            delay={idx * 0.08}
            resultActive={resultActive}
          />
          {idx < NODES.length - 1 && (
            <Edge active={pathRevealed} delay={idx * 0.22} />
          )}
        </div>
      ))}
    </div>
  )
}
