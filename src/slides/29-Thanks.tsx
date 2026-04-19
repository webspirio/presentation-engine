import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import qrUrl from '@/assets/calendar-qr-code.svg'
import {
  EMAIL,
  SITE_URL,
  TELEGRAM_BUSINESS,
  TELEGRAM_PERSONAL,
} from '@/data/contacts'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"

const thanksVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easeSmooth },
  },
}

const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: [0, 0.7, 0.45],
    scale: [0.95, 1.08, 1],
    transition: { duration: 1.8, ease: easeSmooth, delay: 0.2 },
  },
}

const tailContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const tailItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

interface TelegramChipProps {
  handle: string
  label: string
}

function TelegramChip({ handle, label }: TelegramChipProps) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-2xl px-6 py-4 sm:px-7 sm:py-5"
      style={{
        background: 'rgba(0, 211, 242, 0.08)',
        border: '1.5px solid rgba(83, 234, 253, 0.45)',
        boxShadow: '0 0 48px -14px rgba(0, 211, 242, 0.55)',
      }}
    >
      <span
        style={{
          fontFamily: FONT_MONO,
          fontWeight: 500,
          fontSize: 'clamp(1.25rem, 2vw, 2rem)',
          color: '#53eafd',
          letterSpacing: '-0.01em',
          textShadow: '0 0 28px rgba(0, 211, 242, 0.5)',
          lineHeight: 1,
        }}
      >
        {handle}
      </span>
      <span
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 500,
          fontSize: 'clamp(0.65rem, 0.78vw, 0.78rem)',
          color: 'rgba(162, 244, 253, 0.78)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function ThanksSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const showHero = isActive && (fragment >= 0 || reduce)
  const showTail = isActive && (fragment >= 1 || reduce)

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 py-12 sm:px-12">
      <motion.div
        variants={tailContainer}
        initial="hidden"
        animate={showTail ? 'visible' : 'hidden'}
        className="flex w-full max-w-[1240px] flex-col items-center gap-10 text-center"
      >
        {/* Hero word */}
        <div className="relative flex flex-col items-center">
          <motion.span
            aria-hidden
            variants={glowPulse}
            initial="hidden"
            animate={showHero ? 'visible' : 'hidden'}
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 55%, rgba(83,234,253,0.5), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.h1
            variants={thanksVariant}
            initial="hidden"
            animate={showHero ? 'visible' : 'hidden'}
            className="text-[#F0F4F8]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              letterSpacing: '-0.045em',
              lineHeight: 1,
              textShadow:
                '0 4px 80px rgba(83, 234, 253, 0.35), 0 2px 30px rgba(0, 184, 219, 0.45)',
            }}
          >
            Дякую.
          </motion.h1>
        </div>

        <motion.p
          variants={tailItem}
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 500,
            fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)',
            color: 'rgba(83, 234, 253, 0.85)',
            letterSpacing: '0.08em',
          }}
        >
          Питання?
        </motion.p>

        <motion.div
          variants={tailItem}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <TelegramChip handle={TELEGRAM_BUSINESS} label="Бізнес" />
          <TelegramChip
            handle={TELEGRAM_PERSONAL}
            label="Напряму до Олександра"
          />
        </motion.div>

        <motion.div
          variants={tailItem}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
            color: 'rgba(240, 244, 248, 0.72)',
          }}
        >
          <span>{SITE_URL}</span>
          <span aria-hidden style={{ color: 'rgba(0, 211, 242, 0.7)' }}>
            ·
          </span>
          <span>{EMAIL}</span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={tailItem}
        initial="hidden"
        animate={showTail ? 'visible' : 'hidden'}
        className="pointer-events-none absolute bottom-8 right-8 flex flex-col items-center gap-2 sm:bottom-10 sm:right-10"
      >
        <div
          className="overflow-hidden rounded-xl bg-white p-2"
          style={{
            width: 'clamp(140px, 13vw, 200px)',
            height: 'clamp(140px, 13vw, 200px)',
            border: '1.5px solid rgba(83, 234, 253, 0.35)',
            boxShadow: '0 0 40px -10px rgba(0, 211, 242, 0.5)',
          }}
        >
          <img
            src={qrUrl}
            alt="QR — запис на розмову"
            className="h-full w-full object-contain"
          />
        </div>
        <span
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 500,
            fontSize: 'clamp(0.62rem, 0.72vw, 0.72rem)',
            color: 'rgba(162, 244, 253, 0.75)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          QR → консультація
        </span>
      </motion.div>
    </section>
  )
}
