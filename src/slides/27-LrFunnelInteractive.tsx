import { motion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import { lrEyebrow, lrSubtitle, lrTitle } from '@/animations/lrTimeline'
import { LrFunnelInteractive } from '@/components/mockups/LrFunnelInteractive'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const diagramEnter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeSmooth, delay: 0.25 },
  },
}

export function LrFunnelInteractiveSlide({ isActive, fragment }: SlideProps) {
  const stageAnimate = isActive ? 'visible' : 'hidden'

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden px-8 pb-6 pt-16 sm:px-12 sm:pt-20">
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

      {/* Slim header band — title + subtitle on two compact lines */}
      <div className="flex flex-shrink-0 flex-col items-center gap-1 pb-3 text-center">
        <motion.h2
          variants={lrTitle}
          initial="hidden"
          animate={stageAnimate}
          className="text-[#F0F4F8]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Уся воронка — на одному екрані.
        </motion.h2>
        <motion.p
          variants={lrSubtitle}
          initial="hidden"
          animate={stageAnimate}
          className="text-[#F0F4F8]/70"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
            letterSpacing: '0.01em',
          }}
        >
          Кожен лід — у CRM. Жоден контакт не губиться.
        </motion.p>
      </div>

      {/* Diagram — grows to fill remaining height */}
      <motion.div
        variants={diagramEnter}
        initial="hidden"
        animate={stageAnimate}
        className="flex min-h-0 flex-1 flex-col"
      >
        <LrFunnelInteractive presetIndex={fragment} isActive={isActive} />
      </motion.div>
    </section>
  )
}
