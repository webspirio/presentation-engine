import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { EntrepreneurSilhouette } from '@/components/EntrepreneurSilhouette'
import { QuestionBubble } from '@/components/QuestionBubble'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.05 },
  },
}

const floorLineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.55,
    transition: { duration: 0.9, ease: easeSmooth, delay: 0.3 },
  },
}

const subCaptionVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 0.85,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

export function CaseHookSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const bubbleRevealed = fragment >= 1
  const captionRevealed = fragment >= 2
  const stageActive = isActive
  const bubbleActive = (isActive && bubbleRevealed) || (reduce && isActive)
  const captionActive = (isActive && captionRevealed) || (reduce && isActive)

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Eyebrow */}
      <motion.div
        variants={eyebrowVariant}
        initial="hidden"
        animate={stageActive ? 'visible' : 'hidden'}
        className="absolute left-10 top-10 sm:left-16 sm:top-12"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: '#53eafd',
        }}
      >
        Кейс · Rosenheim · 2025
      </motion.div>

      {/* Main grid: silhouette left, bubble right */}
      <div className="relative grid h-full w-full grid-cols-1 gap-8 px-10 py-10 sm:px-16 sm:py-14 md:grid-cols-[minmax(280px,34%)_1fr]">
        {/* Left column — silhouette over floor line */}
        <div className="relative flex h-full min-h-[60vh] items-end justify-center md:justify-start">
          <EntrepreneurSilhouette
            isActive={stageActive}
            pose="carrying"
            opacity={0.42}
            delay={0.15}
            className="h-[min(64vh,520px)] w-auto"
          />
          {/* Floor line */}
          <motion.span
            aria-hidden
            variants={floorLineVariant}
            initial="hidden"
            animate={stageActive ? 'visible' : 'hidden'}
            className="absolute bottom-6 left-0 h-px w-full origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(83,234,253,0.8) 30%, rgba(83,234,253,0.4) 85%, transparent)' }}
          />
        </div>

        {/* Right column — bubble and caption */}
        <div className="relative flex h-full flex-col items-start justify-center gap-8 md:pl-8">
          <QuestionBubble
            isActive={bubbleActive}
            from="right"
            tail="down-left"
            delay={0.2}
          >
            «А візитка є? А сайт у вас є?»
          </QuestionBubble>

          <motion.p
            variants={subCaptionVariant}
            initial="hidden"
            animate={captionActive ? 'visible' : 'hidden'}
            className="max-w-[34ch] text-balance text-[#F0F4F8]/85"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 400,
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              lineHeight: 1.55,
            }}
          >
            Клієнти задоволені. Робота не закінчується. Бренду — немає.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
