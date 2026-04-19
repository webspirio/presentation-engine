import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'
import kfLogoUrl from '@/assets/kf/kf-logo-512.svg'

export type KuchenFokusVariant = 'wordmark' | 'with-mark' | 'mark-only'

export interface KuchenFokusLogoProps {
  isActive: boolean
  variant?: KuchenFokusVariant
  /** Delay before reveal starts (seconds). */
  delay?: number
  /** Size multiplier applied to font sizes and the monogram box. */
  scale?: number
  /** Hide the kicker line under the wordmark. */
  hideKicker?: boolean
  className?: string
}

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: 0.05,
    },
  }),
}

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

const markVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
}

const kickerVariant: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 0.7,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

function Letters({ word }: { word: string }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={letterVariant}
          style={{ display: 'inline-block' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export function KuchenFokusLogo({
  isActive,
  variant = 'wordmark',
  delay = 0,
  scale = 1,
  hideKicker = false,
  className,
}: KuchenFokusLogoProps) {
  const wordmarkFontSize = `calc(${scale} * clamp(2rem, 3.4vw, 3rem))`
  const kickerFontSize = `calc(${scale} * clamp(0.65rem, 0.8vw, 0.8rem))`
  const markSize = `calc(${scale} * 3.4rem)`

  const wordmark = (
    <div className="flex flex-col" style={{ lineHeight: 1 }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontWeight: 600,
          fontSize: wordmarkFontSize,
          letterSpacing: '0.08em',
          color: '#F0F4F8',
        }}
      >
        <Letters word="K&uuml;chen Fokus" />
      </div>
      {!hideKicker && (
        <motion.div
          variants={kickerVariant}
          className="mt-2"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: kickerFontSize,
            letterSpacing: '0.42em',
            color: '#53eafd',
            textTransform: 'uppercase',
          }}
        >
          Küchen · München · Bayern
        </motion.div>
      )}
    </div>
  )

  const mark = (
    <motion.img
      variants={markVariant}
      src={kfLogoUrl}
      alt=""
      aria-hidden
      draggable={false}
      className="block shrink-0"
      style={{
        width: markSize,
        height: markSize,
        boxShadow: '0 0 32px -8px rgba(0, 211, 242, 0.55)',
        borderRadius: `calc(${scale} * 0.45rem)`,
      }}
    />
  )

  return (
    <motion.div
      custom={{ delay }}
      variants={container}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`flex items-center gap-4 ${className ?? ''}`}
    >
      {variant === 'mark-only'
        ? mark
        : variant === 'with-mark'
          ? (
              <>
                {mark}
                {wordmark}
              </>
            )
          : wordmark}
    </motion.div>
  )
}
