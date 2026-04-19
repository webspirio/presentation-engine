import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.15,
    },
  },
}

const line: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeSmooth },
  },
}

const contactLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export function CaseCtaSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const animate = isActive || reduce ? 'visible' : 'hidden'

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Reserve vertical space for the persistent centered logo (matches Hero pattern). */}
      <div
        aria-hidden
        className="shrink-0"
        style={{ height: 'var(--logo-size)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={animate}
        className="flex flex-col items-center gap-5 pt-6 text-center sm:pt-8"
      >
        <motion.h2
          variants={line}
          className="max-w-[22ch] text-balance text-[#F0F4F8]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.4vw, 3rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            textShadow: '0 2px 40px rgba(0, 184, 219, 0.35)',
          }}
        >
          Один партнер. Повний пакет. Один дзвінок.
        </motion.h2>

        <motion.p
          variants={contactLine}
          className="max-w-[36ch] text-balance text-[#F0F4F8]/75"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
            lineHeight: 1.5,
          }}
        >
          Від назви до футболки майстра. Все в одних руках.
        </motion.p>

        <motion.div
          variants={contactLine}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: 'rgba(0, 211, 242, 0.12)',
              border: '1px solid rgba(83, 234, 253, 0.55)',
              boxShadow: '0 0 32px -10px rgba(0, 211, 242, 0.55)',
              fontFamily: FONT_MONO,
              fontWeight: 500,
              fontSize: 'clamp(0.85rem, 1vw, 1rem)',
              color: '#F0F4F8',
              letterSpacing: '0.04em',
            }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: '#53eafd' }}
            />
            webspirio.de
          </span>
          <span
            className="uppercase tracking-[0.4em]"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(0.7rem, 0.85vw, 0.85rem)',
              color: 'rgba(83, 234, 253, 0.85)',
            }}
          >
            Напишіть — почнемо
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
