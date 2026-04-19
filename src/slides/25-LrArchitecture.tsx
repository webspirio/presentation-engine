import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import { lrEyebrow, lrSubtitle, lrTitle } from '@/animations/lrTimeline'
import {
  LrArchitectureStack,
  type LrLayer,
} from '@/components/mockups/LrArchitectureStack'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const LAYERS: LrLayer[] = [
  {
    label: 'Контент',
    chips: ['Reels', 'Stories', 'TikTok'],
    accent: '#53eafd',
  },
  {
    label: 'Мозок',
    footnote: 'одна платформа',
    chips: ['Бот', 'CRM', 'Календар', 'Email', 'WhatsApp'],
    accent: '#00d3f2',
    emphasis: true,
  },
  {
    label: 'Дії',
    chips: ['Магазин', 'Реєстрація', 'Консультація'],
    accent: '#a2f4fd',
  },
]

const closingLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth, delay: 0.15 },
  },
}

export function LrArchitectureSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false

  // Bands appear with the title (fragment 0). Chips reveal layer-by-layer:
  // fr 1 = Контент, fr 2 = Мозок, fr 3 = Дії.
  const revealedUpTo = Math.max(-1, fragment - 1)
  const bandsActive = isActive
  const closingActive = (isActive && fragment >= 3) || (reduce && isActive)

  const stageAnimate = isActive ? 'visible' : 'hidden'

  return (
    <section className="relative h-full w-full overflow-hidden px-10 py-14 sm:px-16">
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

      <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
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
            Три шари — один рух.
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
            Контент → Мозок → Дія. Один інструмент замість десяти.
          </motion.p>
        </div>

        <LrArchitectureStack
          layers={LAYERS}
          bandsActive={bandsActive}
          revealedUpTo={revealedUpTo}
        />

        <motion.p
          variants={closingLine}
          initial="hidden"
          animate={closingActive ? 'visible' : 'hidden'}
          className="max-w-[42ch] text-[#F0F4F8]/80"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
            lineHeight: 1.45,
          }}
        >
          Кожен лід — у CRM. Кожен крок — видно. Нічого не губиться.
        </motion.p>
      </div>
    </section>
  )
}
