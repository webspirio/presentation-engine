import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.6,
    },
  },
}

const line: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easeSmooth },
  },
}

const ruleVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easeSmooth, delay: 1.8 },
  },
}

const glowVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: [0, 0.85, 0.4],
    scale: [0.9, 1.12, 1],
    transition: { duration: 1.6, ease: easeSmooth, delay: 1 },
  },
}

export function CasePunchlineSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const revealed = fragment >= 1
  const animate =
    (isActive && revealed) || (reduce && isActive) ? 'visible' : 'hidden'

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate={animate}
        className="relative flex max-w-[28ch] flex-col items-center gap-5 text-center"
      >
        <motion.p
          variants={line}
          className="text-[#F0F4F8]/85"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 500,
            fontSize: 'clamp(2rem, 4vw, 3.6rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
          }}
        >
          Ми не робимо сайти.
        </motion.p>

        <div className="relative">
          <motion.span
            aria-hidden
            variants={glowVariant}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(83,234,253,0.55), transparent 70%)',
              filter: 'blur(48px)',
            }}
          />
          <motion.p
            variants={line}
            className="relative"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#00d3f2',
              textShadow:
                '0 0 60px rgba(0, 211, 242, 0.55), 0 2px 20px rgba(0, 184, 219, 0.5)',
            }}
          >
            Ми робимо компанії видимими.
          </motion.p>
        </div>

        <motion.span
          aria-hidden
          variants={ruleVariant}
          className="block h-px w-40 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, #53eafd 50%, transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
