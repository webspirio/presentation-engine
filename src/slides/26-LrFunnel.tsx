import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import { lrEyebrow, lrSubtitle, lrTitle } from '@/animations/lrTimeline'
import { LrFunnelFlow } from '@/components/mockups/LrFunnelFlow'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const closingLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.9,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth, delay: 0.2 },
  },
}

export function LrFunnelSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false

  const pathRevealed = fragment >= 1
  const resultRevealed = fragment >= 2

  const stageAnimate = isActive ? 'visible' : 'hidden'
  const flowActive = isActive
  const edgesActive = (isActive && pathRevealed) || (reduce && isActive)
  const resultActive = (isActive && resultRevealed) || (reduce && isActive)
  const closingAnimate = resultActive ? 'visible' : 'hidden'

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

      <div className="flex h-full w-full flex-col items-center justify-center gap-12 text-center">
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
            Один клік — і клієнт у воронці.
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
            Шлях одного клієнта — від Reels до консультації.
          </motion.p>
        </div>

        <LrFunnelFlow
          isActive={flowActive}
          pathRevealed={edgesActive}
          resultActive={resultActive}
        />

        <motion.p
          variants={closingLine}
          initial="hidden"
          animate={closingAnimate}
          className="max-w-[40ch] text-[#F0F4F8]/85"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 1.55vw, 1.45rem)',
            lineHeight: 1.45,
          }}
        >
          1–2 хвилини. Без людини.
        </motion.p>
      </div>
    </section>
  )
}
