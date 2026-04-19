import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'

export type BubbleTailDirection = 'down-left' | 'down-right' | 'up-left' | 'up-right' | 'left' | 'right'

export interface QuestionBubbleProps {
  isActive: boolean
  children: ReactNode
  tail?: BubbleTailDirection
  /** Target opacity once revealed (default 1). */
  opacity?: number
  /** Delay before entry animation, seconds. */
  delay?: number
  /** Accent tint — bubble border + glow. */
  accent?: string
  /** Entry direction hint for the float motion. */
  from?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
}

const bubbleVariants: Variants = {
  hidden: (custom: { from: QuestionBubbleProps['from']; opacity: number }) => {
    const offset = 36
    const axis = custom.from === 'left' ? { x: -offset } : custom.from === 'right' ? { x: offset } : custom.from === 'top' ? { y: -offset } : { y: offset }
    return { opacity: 0, scale: 0.86, ...axis }
  },
  visible: (custom: { opacity: number; delay: number }) => ({
    opacity: custom.opacity,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      ease: easeSmooth,
      delay: custom.delay,
    },
  }),
}

/**
 * Tail geometry. Two paths per direction:
 *   - fill: closed shape, includes the base edge (blended into the bubble)
 *   - outline: open path tracing only the two curved sides, so the base edge never strokes
 *     over the bubble's own border.
 * viewBox is 0 0 40 40. Base sits at one of the four edges; tip in the named direction.
 */
interface TailGeometry {
  fill: string
  outline: string
}

const TAIL_GEOMETRY: Record<BubbleTailDirection, TailGeometry> = {
  'down-left': {
    fill: 'M8 0 L24 0 Q22 22 2 38 Q4 18 8 0 Z',
    outline: 'M8 0 Q4 18 2 38 Q22 22 24 0',
  },
  'down-right': {
    fill: 'M16 0 L32 0 Q36 18 38 38 Q18 22 16 0 Z',
    outline: 'M16 0 Q18 22 38 38 Q36 18 32 0',
  },
  'up-left': {
    fill: 'M8 40 L24 40 Q22 18 2 2 Q4 22 8 40 Z',
    outline: 'M8 40 Q4 22 2 2 Q22 18 24 40',
  },
  'up-right': {
    fill: 'M16 40 L32 40 Q36 22 38 2 Q18 18 16 40 Z',
    outline: 'M16 40 Q18 18 38 2 Q36 22 32 40',
  },
  left: {
    fill: 'M40 12 L40 28 Q18 24 2 20 Q22 4 40 12 Z',
    outline: 'M40 12 Q22 4 2 20 Q18 24 40 28',
  },
  right: {
    fill: 'M0 12 L0 28 Q22 24 38 20 Q18 4 0 12 Z',
    outline: 'M0 12 Q18 4 38 20 Q22 24 0 28',
  },
}

function tailPosition(direction: BubbleTailDirection): React.CSSProperties {
  // Overlap the bubble by 4px on the base edge so stroke seams are fully hidden.
  const overlap = 4
  const bleed = 40 - overlap
  switch (direction) {
    case 'down-left':
      return { left: '14%', bottom: `-${bleed}px` }
    case 'down-right':
      return { right: '14%', bottom: `-${bleed}px` }
    case 'up-left':
      return { left: '14%', top: `-${bleed}px` }
    case 'up-right':
      return { right: '14%', top: `-${bleed}px` }
    case 'left':
      return { left: `-${bleed}px`, top: '50%', transform: 'translateY(-50%)' }
    case 'right':
      return { right: `-${bleed}px`, top: '50%', transform: 'translateY(-50%)' }
  }
}

function Tail({
  direction,
  accent,
}: {
  direction: BubbleTailDirection
  accent: string
}) {
  const geo = TAIL_GEOMETRY[direction]
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="pointer-events-none absolute h-10 w-10 overflow-visible"
      style={tailPosition(direction)}
    >
      <path d={geo.fill} fill="rgba(8, 51, 68, 0.92)" />
      <path
        d={geo.outline}
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function QuestionBubble({
  isActive,
  children,
  tail = 'down-left',
  opacity = 1,
  delay = 0,
  accent = '#53eafd',
  from = 'right',
  className,
}: QuestionBubbleProps) {
  return (
    <motion.div
      custom={{ from, opacity, delay }}
      variants={bubbleVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`relative inline-flex max-w-[28ch] items-center rounded-[28px] px-7 py-4 ${className ?? ''}`}
      style={{
        background: 'rgba(8, 51, 68, 0.85)',
        border: `1.5px solid ${accent}`,
        boxShadow: `0 20px 48px -24px rgba(0, 211, 242, 0.55), 0 0 32px -8px ${accent}`,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="text-[#F0F4F8]"
        style={{
          fontFamily: "'Unbounded', 'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}
      >
        {children}
      </div>
      <Tail direction={tail} accent={accent} />
    </motion.div>
  )
}
