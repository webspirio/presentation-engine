import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const QUOTE =
  'Хлопці, мені потрібно все. Я навіть не знаю, з чого почати.'

const wordsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.08,
    },
  },
}

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

const ruleVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: easeSmooth, delay: 1.8 },
  },
}

const attributionVariant: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 0.7,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth, delay: 2.2 },
  },
}

export function CaseAskSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const revealed = fragment >= 1
  const animate =
    (isActive && revealed) || (reduce && isActive) ? 'visible' : 'hidden'

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-10 sm:px-20">
      <div className="flex max-w-[24ch] flex-col items-center gap-8 text-center">
        <motion.blockquote
          variants={wordsContainer}
          initial="hidden"
          animate={animate}
          className="text-balance text-[#F0F4F8]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            textShadow: '0 2px 40px rgba(0, 184, 219, 0.35)',
          }}
        >
          {QUOTE.split(' ').map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              variants={word}
              className="mr-[0.28em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </motion.blockquote>

        <motion.span
          aria-hidden
          variants={ruleVariant}
          initial="hidden"
          animate={animate}
          className="block h-px w-32 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, #00d3f2 50%, transparent)',
          }}
        />

        <motion.p
          variants={attributionVariant}
          initial="hidden"
          animate={animate}
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(0.75rem, 0.9vw, 0.95rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(83, 234, 253, 0.85)',
          }}
        >
          Клієнт · перше звернення
        </motion.p>
      </div>
    </section>
  )
}
