import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Bot, Filter, Flame, Sparkles } from 'lucide-react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import {
  lrBadge,
  lrEyebrow,
  lrStepCard,
  lrStepConnector,
  lrStepContainer,
  lrSubtitle,
  lrTitle,
} from '@/animations/lrTimeline'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

interface VisionStep {
  Icon: typeof Bot
  label: string
  sub: string
}

const STEPS: VisionStep[] = [
  { Icon: Sparkles, label: 'AI створює', sub: 'контент' },
  { Icon: Bot, label: 'Бот веде', sub: 'діалог' },
  { Icon: Filter, label: 'Автофільтр', sub: 'сортує' },
  { Icon: Flame, label: 'Гарячі —', sub: 'до тебе' },
]

const outerClosing: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth, delay: 0.1 },
  },
}

function ChevronRight({ active }: { active: boolean }) {
  return (
    <motion.svg
      aria-hidden
      variants={lrStepConnector}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      width="30"
      height="30"
      viewBox="0 0 22 22"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M8 4 L15 11 L8 18"
        stroke="#53eafd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export function LrVisionSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false

  const stepsRevealed = fragment >= 1
  const badgeRevealed = fragment >= 2
  const closingRevealed = fragment >= 3

  const stageAnimate = isActive ? 'visible' : 'hidden'
  const stepsAnimate = (isActive && stepsRevealed) || (reduce && isActive) ? 'visible' : 'hidden'
  const badgeAnimate = (isActive && badgeRevealed) || (reduce && isActive) ? 'visible' : 'hidden'
  const closingAnimate = (isActive && closingRevealed) || (reduce && isActive) ? 'visible' : 'hidden'

  return (
    <section className="relative h-full w-full overflow-hidden px-10 py-14 sm:px-16">
      {/* Eyebrow */}
      <motion.div
        variants={lrEyebrow}
        initial="hidden"
        animate={stageAnimate}
        className="absolute left-10 top-10 sm:left-16 sm:top-12"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.8rem, 0.95vw, 1rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: '#53eafd',
        }}
      >
        Media factory funnel
      </motion.div>

      <div className="flex h-full w-full flex-col items-center justify-center gap-10 text-center">
        {/* Title (fr 0) */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2
            variants={lrTitle}
            initial="hidden"
            animate={stageAnimate}
            className="text-[#F0F4F8]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
            }}
          >
            Воронка, яка працює без тебе.
          </motion.h2>
          <motion.p
            variants={lrSubtitle}
            initial="hidden"
            animate={stageAnimate}
            className="text-[#53eafd]/80"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 400,
              fontSize: 'clamp(1.1rem, 1.45vw, 1.35rem)',
              letterSpacing: '0.02em',
            }}
          >
            Чотири кроки — від першого Reels до гарячого ліда.
          </motion.p>
        </div>

        {/* 4 step cards (fr 1) */}
        <motion.div
          variants={lrStepContainer}
          initial="hidden"
          animate={stepsAnimate}
          className="flex w-full max-w-5xl flex-wrap items-stretch justify-center gap-3 sm:flex-nowrap sm:gap-4"
        >
          {STEPS.map((step, idx) => {
            const { Icon } = step
            return (
              <div key={step.label} className="flex items-stretch gap-3 sm:gap-4">
                <motion.div
                  variants={lrStepCard}
                  className="flex min-w-[11.5rem] max-w-[13.5rem] flex-1 flex-col items-center gap-4 rounded-2xl px-6 py-6 backdrop-blur-sm"
                  style={{
                    background: 'rgba(5, 51, 69, 0.65)',
                    border: '1px solid rgba(83, 234, 253, 0.28)',
                    boxShadow:
                      '0 22px 50px -28px rgba(0, 211, 242, 0.4), inset 0 1px 0 rgba(83, 234, 253, 0.12)',
                  }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, #00d3f2 0%, #53eafd 55%, #a2f4fd 100%)',
                      boxShadow: '0 12px 28px -10px rgba(0, 211, 242, 0.6)',
                    }}
                  >
                    <Icon size={26} color="#053345" strokeWidth={2.4} />
                  </div>
                  <div
                    className="flex flex-col items-center gap-0 text-[#F0F4F8]"
                    style={{
                      fontFamily: FONT_POPPINS,
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(1.1rem, 1.3vw, 1.3rem)',
                        fontWeight: 600,
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="text-[#F0F4F8]/70"
                      style={{
                        fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
                      }}
                    >
                      {step.sub}
                    </span>
                  </div>
                </motion.div>
                {idx < STEPS.length - 1 && (
                  <div className="flex items-center">
                    <ChevronRight active={stepsAnimate === 'visible'} />
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>

        {/* Outcome badge (fr 2) */}
        <motion.div
          variants={lrBadge}
          initial="hidden"
          animate={badgeAnimate}
          className="relative inline-flex items-center gap-4 rounded-full px-9 py-4"
          style={{
            background:
              'linear-gradient(135deg, #00d3f2 0%, #53eafd 55%, #F0F4F8 100%)',
            boxShadow: '0 24px 60px -24px rgba(0, 211, 242, 0.55)',
            color: '#053345',
          }}
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            70%
          </span>
          <span
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              letterSpacing: '0.01em',
            }}
          >
            менше ручної роботи
          </span>
        </motion.div>

        {/* Closing line (fr 3) */}
        <motion.p
          variants={outerClosing}
          initial="hidden"
          animate={closingAnimate}
          className="max-w-[42ch] text-[#F0F4F8]/85"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 1.55vw, 1.45rem)',
            lineHeight: 1.45,
          }}
        >
          Ти працюєш тільки з тими, хто готовий купити.
        </motion.p>
      </div>
    </section>
  )
}
