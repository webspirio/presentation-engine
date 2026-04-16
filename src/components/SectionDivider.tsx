import { motion, useReducedMotion } from 'motion/react'
import {
  captionReveal,
  eyebrowReveal,
  ruleDraw,
  titleContainer,
  titleWord,
} from '@/animations/sectionDividerTimeline'

interface SectionDividerProps {
  isActive: boolean
  eyebrow: string
  title: string
  caption?: string
  accent?: 'cyan' | 'amber'
}

const ACCENT_COLORS = {
  cyan: {
    eyebrow: 'rgba(83, 234, 253, 0.75)',
    rule: 'rgba(0, 211, 242, 0.7)',
    caption: 'rgba(83, 234, 253, 0.6)',
    glow: 'rgba(0, 184, 219, 0.3)',
  },
  amber: {
    eyebrow: 'rgba(253, 224, 71, 0.8)',
    rule: 'rgba(251, 191, 36, 0.75)',
    caption: 'rgba(253, 224, 71, 0.65)',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
} as const

export function SectionDivider({
  isActive,
  eyebrow,
  title,
  caption,
  accent = 'cyan',
}: SectionDividerProps) {
  const reduce = useReducedMotion() ?? false
  const animState = isActive || reduce ? 'visible' : 'hidden'
  const colors = ACCENT_COLORS[accent]
  const lines = title.split('\n')

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-8 px-12 text-center sm:gap-10 sm:px-6">
        <motion.div
          variants={eyebrowReveal}
          initial="hidden"
          animate={animState}
          className="flex items-center gap-3"
          style={{ color: colors.eyebrow }}
        >
          <span
            aria-hidden
            className="inline-block h-px w-8"
            style={{ backgroundColor: colors.eyebrow }}
          />
          <span
            className="text-[11px] uppercase sm:text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.42em',
            }}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden
            className="inline-block h-px w-8"
            style={{ backgroundColor: colors.eyebrow }}
          />
        </motion.div>

        <motion.h2
          variants={titleContainer}
          initial="hidden"
          animate={animState}
          className="text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2.25rem, 8vw, 6.5rem)',
            letterSpacing: '-0.035em',
            lineHeight: 0.95,
            textShadow: `0 2px 40px ${colors.glow}`,
          }}
        >
          {lines.map((line, lineIdx) => (
            <span key={`line-${lineIdx}`} className="block">
              {line.split(' ').map((word, wordIdx) => (
                <motion.span
                  key={`${lineIdx}-${word}-${wordIdx}`}
                  variants={titleWord}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>

        <motion.div
          aria-hidden
          variants={ruleDraw}
          initial="hidden"
          animate={animState}
          className="h-px w-40 origin-left sm:w-56"
          style={{ backgroundColor: colors.rule }}
        />

        {caption ? (
          <motion.p
            variants={captionReveal}
            initial="hidden"
            animate={animState}
            className="text-[11px] uppercase sm:text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.3em',
              color: colors.caption,
            }}
          >
            {caption}
          </motion.p>
        ) : null}
      </div>
    </div>
  )
}

export default SectionDivider
