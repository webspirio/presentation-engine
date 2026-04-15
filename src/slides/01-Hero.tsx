import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import {
  captionReveal,
  taglineContainer,
  taglineWord,
} from '@/animations/heroTimeline'

const TAGLINE = 'Від ідеї до цифрової екосистеми'
const CAPTION = 'UA WELL · 2026 · Düsseldorf'

const LOGO_SIZE = 440

export function HeroSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const animState = isActive || reduce ? 'visible' : 'hidden'

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-8 px-6 text-center sm:gap-10"
        style={{
          top: `calc(50% + ${LOGO_SIZE / 2}px + 32px)`,
        }}
      >
        <motion.h1
          variants={taglineContainer}
          initial="hidden"
          animate={animState}
          className="max-w-[14ch] text-balance text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 5.2vw, 4.25rem)',
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
          className="text-[11px] uppercase tracking-[0.42em] text-cyan-300/75 sm:text-xs"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {CAPTION}
        </motion.p>
      </div>
    </div>
  )
}
