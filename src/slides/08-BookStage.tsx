import { motion, useReducedMotion, type Variants } from 'motion/react'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const dialEnter: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
}

const chipEnter: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.55, ease: easeSmooth },
  },
}

const captionEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.75, ease: easeSmooth },
  },
}

const TICKS = Array.from({ length: 12 }, (_, i) => {
  const h = i + 1
  const rad = ((h * 30 - 90) * Math.PI) / 180
  const outer = 90
  const inner = h % 3 === 0 ? 76 : 82
  return {
    h,
    x1: 100 + outer * Math.cos(rad),
    y1: 100 + outer * Math.sin(rad),
    x2: 100 + inner * Math.cos(rad),
    y2: 100 + inner * Math.sin(rad),
  }
})

function ClockDialAccent({ active }: { active: boolean }) {
  const reduce = useReducedMotion() ?? false

  const hourHand: Variants = reduce
    ? {
        hidden: { rotate: 330 },
        visible: { rotate: 330, transition: { duration: 0 } },
      }
    : {
        hidden: { rotate: 0 },
        visible: {
          rotate: 330,
          transition: { duration: 1.6, delay: 0.4, ease: easeSmooth },
        },
      }

  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="flex w-full flex-col items-center gap-5 md:items-end"
    >
      <motion.div
        variants={dialEnter}
        className="relative"
        style={{
          width: 'clamp(140px, 18vw, 220px)',
          aspectRatio: '1 / 1',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          aria-hidden
          className="h-full w-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="bookClockGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="bookDialFace" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16, 78, 100, 0.55)" />
              <stop offset="100%" stopColor="rgba(5, 51, 69, 0.15)" />
            </radialGradient>
          </defs>

          <circle cx="100" cy="100" r="90" fill="url(#bookDialFace)" />

          {/* Business-hours arc — right half (12 → 6 via 3), dim cyan-900 */}
          <path
            d="M 100 10 A 90 90 0 0 1 100 190"
            fill="none"
            stroke="#104e64"
            strokeWidth="10"
            strokeLinecap="round"
            opacity={0.75}
          />

          {/* After-hours arc — left half (6 → 12 via 9), cyan-400 with glow */}
          <path
            d="M 100 190 A 90 90 0 0 0 100 10"
            fill="none"
            stroke="#00d3f2"
            strokeWidth="11"
            strokeLinecap="round"
            opacity={0.3}
            filter="url(#bookClockGlow)"
          />
          <path
            d="M 100 190 A 90 90 0 0 0 100 10"
            fill="none"
            stroke="#53eafd"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity={0.9}
          />

          {/* Outer ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#0e7490"
            strokeWidth="0.75"
            opacity={0.55}
          />

          {/* Tick marks */}
          {TICKS.map(({ h, x1, y1, x2, y2 }) => (
            <line
              key={h}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#53eafd"
              strokeWidth={h % 3 === 0 ? 2 : 1.2}
              strokeLinecap="round"
              opacity={h % 3 === 0 ? 0.9 : 0.5}
            />
          ))}

          {/* Minute hand — pointing to 12 */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="28"
            stroke="#F0F4F8"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity={0.85}
          />

          {/* Hour hand — rotates to 11 PM (330°) */}
          <motion.g
            variants={hourHand}
            style={{ transformOrigin: '100px 100px', transformBox: 'view-box' }}
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="45"
              stroke="#53eafd"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 5px rgba(83, 234, 253, 0.6))' }}
            />
          </motion.g>

          {/* Center pivot */}
          <circle
            cx="100"
            cy="100"
            r="4.5"
            fill="#053345"
            stroke="#53eafd"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-end">
        <motion.span
          variants={chipEnter}
          className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-cyan-300"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
            letterSpacing: '0.04em',
            borderColor: 'rgba(83, 234, 253, 0.55)',
            background: 'rgba(0, 211, 242, 0.1)',
            boxShadow: '0 0 20px -6px rgba(0, 211, 242, 0.45)',
          }}
        >
          24 / 7
        </motion.span>
        <motion.span
          variants={captionEnter}
          className="text-[#F0F4F8]/70"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(0.72rem, 0.88vw, 0.85rem)',
            letterSpacing: '0.01em',
          }}
        >
          Клієнт пише — система відповідає
        </motion.span>
      </div>
    </motion.div>
  )
}

export function BookStageSlide({ isActive, fragment }: SlideProps) {
  const accentActive = isActive && fragment >= 2
  return (
    <StageSlide
      data={ACT2_STAGES[2]}
      isActive={isActive}
      fragment={fragment}
      accent={<ClockDialAccent active={accentActive} />}
    />
  )
}
