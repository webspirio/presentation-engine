import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import qrUrl from '@/assets/calendar-qr-code.svg'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const LEVERS = [
  {
    strong: '30–60 хв безкоштовна розмова',
    rest: '— без зобовʼязань',
  },
  {
    strong: 'Покажу рішення для вашої задачі',
    rest: '— теж безкоштовно',
  },
  {
    strong: '−20% від фінальної ціни',
    rest: 'для учасників UA WELL',
  },
] as const

const PILLARS = [
  { icon: '🛡', label: 'DSGVO' },
  { icon: '🔒', label: 'Фіксована ціна' },
  { icon: '🤝', label: 'Один партнер' },
  { icon: '📦', label: 'Все належить вам' },
] as const

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeSmooth } },
}

const headlineVariant: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth, delay: 0.1 },
  },
}

const leversContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const leverItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

const qrBlock: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

const ribbonContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const chipVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeSmooth },
  },
}

export function OfferSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const showHeadline = isActive && (fragment >= 0 || reduce)
  const showLevers = isActive && (fragment >= 1 || reduce)
  const showQr = isActive && (fragment >= 2 || reduce)

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-8 py-10 sm:px-14 sm:py-14">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-stretch justify-between gap-10 md:flex-row md:items-center md:gap-16">
        <div className="flex flex-1 flex-col gap-8">
          <motion.span
            variants={eyebrowVariant}
            initial="hidden"
            animate={showHeadline ? 'visible' : 'hidden'}
            className="block"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(0.72rem, 0.85vw, 0.88rem)',
              letterSpacing: '0.4em',
              color: 'rgba(83, 234, 253, 0.75)',
              textTransform: 'uppercase',
            }}
          >
            Пропозиція
          </motion.span>

          <motion.h2
            variants={headlineVariant}
            initial="hidden"
            animate={showHeadline ? 'visible' : 'hidden'}
            className="max-w-[20ch] text-balance text-[#F0F4F8]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.6vw, 3.2rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.14,
              textShadow: '0 2px 40px rgba(0, 184, 219, 0.35)',
            }}
          >
            Для учасників UA&nbsp;WELL — розмова і рішення{' '}
            <span style={{ color: '#00d3f2' }}>безкоштовно.</span>
          </motion.h2>

          <motion.ul
            variants={leversContainer}
            initial="hidden"
            animate={showLevers ? 'visible' : 'hidden'}
            className="flex flex-col gap-4"
          >
            {LEVERS.map((lever) => (
              <motion.li
                key={lever.strong}
                variants={leverItem}
                className="flex items-start gap-4"
              >
                <span
                  aria-hidden
                  className="mt-[0.15em] inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(0, 211, 242, 0.15)',
                    border: '1px solid rgba(83, 234, 253, 0.55)',
                    color: '#00d3f2',
                    fontFamily: FONT_POPPINS,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    lineHeight: 1,
                    boxShadow: '0 0 18px -6px rgba(0, 211, 242, 0.55)',
                  }}
                >
                  ✓
                </span>
                <span
                  className="text-[#F0F4F8]"
                  style={{
                    fontFamily: FONT_POPPINS,
                    fontWeight: 400,
                    fontSize: 'clamp(1.02rem, 1.3vw, 1.3rem)',
                    lineHeight: 1.45,
                  }}
                >
                  <strong style={{ fontWeight: 600 }}>{lever.strong}</strong>{' '}
                  <span style={{ color: 'rgba(240, 244, 248, 0.72)' }}>
                    {lever.rest}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={qrBlock}
          initial="hidden"
          animate={showQr ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-4 md:shrink-0"
        >
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[28px]"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(0,211,242,0.35), transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
            <div
              className="relative overflow-hidden rounded-2xl bg-white p-3"
              style={{
                width: 'clamp(300px, 30vw, 420px)',
                height: 'clamp(300px, 30vw, 420px)',
                border: '2px solid rgba(83, 234, 253, 0.5)',
                boxShadow: '0 0 64px -12px rgba(0, 211, 242, 0.6)',
              }}
            >
              <img
                src={qrUrl}
                alt="QR — запис на безкоштовну розмову з Олександром"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
              letterSpacing: '0.3em',
              color: 'rgba(83, 234, 253, 0.8)',
              textTransform: 'uppercase',
            }}
          >
            Забронюй консультацію
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={ribbonContainer}
        initial="hidden"
        animate={showQr ? 'visible' : 'hidden'}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 sm:gap-x-4"
      >
        {PILLARS.map((pillar) => (
          <motion.span
            key={pillar.label}
            variants={chipVariant}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              background: 'rgba(0, 211, 242, 0.08)',
              border: '1px solid rgba(83, 234, 253, 0.3)',
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(0.72rem, 0.85vw, 0.88rem)',
              color: 'rgba(162, 244, 253, 0.9)',
              letterSpacing: '0.02em',
            }}
          >
            <span aria-hidden>{pillar.icon}</span>
            {pillar.label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
