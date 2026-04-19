import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import {
  captionReveal,
  taglineContainer,
  taglineWord,
} from '@/animations/heroTimeline'

const TAGLINE = 'Від ідеї до цифрової екосистеми'
const CAPTION = 'Сьогодні — 15 хв · Без води'
const IDENTITY =
  'Я Олександр. 5 років будую цифрові системи для українських підприємців у Німеччині.'

export function HeroSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const taglineRevealed = fragment >= 1
  const identityRevealed = fragment >= 2
  const animState =
    (isActive && taglineRevealed) || (reduce && isActive) ? 'visible' : 'hidden'
  const identityAnimState =
    (isActive && identityRevealed) || (reduce && isActive)
      ? 'visible'
      : 'hidden'

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Reserve vertical space for the persistent logo (same sizing expression). */}
      <div
        aria-hidden
        className="shrink-0"
        style={{ height: 'var(--logo-size)' }}
      />

      <div className="flex flex-col items-center gap-6 pt-6 text-center sm:gap-8 sm:pt-8">
        <motion.h1
          variants={taglineContainer}
          initial="hidden"
          animate={animState}
          className="max-w-[14ch] text-balance text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 4.8vw, 4.6rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textShadow: '0 2px 40px rgba(0, 184, 219, 0.35)',
          }}
        >
          {TAGLINE.split(' ').map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={taglineWord}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={captionReveal}
          initial="hidden"
          animate={animState}
          className="text-sm uppercase tracking-[0.36em] text-cyan-300/75 sm:text-base sm:tracking-[0.4em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {CAPTION}
        </motion.p>

        <motion.p
          variants={captionReveal}
          initial="hidden"
          animate={identityAnimState}
          className="mt-4 max-w-[32ch] text-balance text-[#F0F4F8]/85 sm:mt-6 sm:max-w-[38ch]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1.2rem, 1.45vw, 1.35rem)',
            lineHeight: 1.5,
          }}
        >
          {IDENTITY}
        </motion.p>
      </div>
    </div>
  )
}
