import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import { progressDot } from '@/animations/stageTimeline'
import { KuchenFokusLogo } from '@/components/mockups/KuchenFokusLogo'
import { BrowserFrame } from '@/components/mockups/BrowserFrame'
import { SitePreview } from '@/components/mockups/SitePreview'
import { BusinessCard } from '@/components/mockups/BusinessCard'
import { TShirt } from '@/components/mockups/TShirt'
import { ChatBubbles } from '@/components/mockups/ChatBubbles'
import { QuestionBubble } from '@/components/QuestionBubble'
import { EntrepreneurSilhouette } from '@/components/EntrepreneurSilhouette'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const STEPS = [
  { id: 1, label: 'Назва',    caption: 'Фокус на кухнях — найвища маржа, найбільше запитів.' },
  { id: 2, label: 'Домен',    caption: 'Бренд отримав адресу.' },
  { id: 3, label: 'Логотип',  caption: 'Знак, що працює скрізь.' },
  { id: 4, label: 'Сайт',     caption: 'WordPress, адаптив, галерея робіт, контактна форма.' },
  { id: 5, label: 'Korvo AI', caption: 'Запити — 24/7, навіть коли руки в роботі.' },
  { id: 6, label: 'Візитка',  caption: '«А візитку можна?» — тепер має відповідь.' },
  { id: 7, label: 'Футболка', caption: 'Бригада заходить у підʼїзд — і вже виглядає як компанія.' },
] as const

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.05 },
  },
}

const captionVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 0.9,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: easeSmooth },
  },
}

const urlChipVariant: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

const panelVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

function ProgressStrip({ activeIdx }: { activeIdx: number }) {
  return (
    <div
      aria-hidden
      className="flex items-end justify-between gap-2 px-1 sm:gap-3"
    >
      {STEPS.map((step) => {
        const filled = step.id <= activeIdx
        const current = step.id === activeIdx
        return (
          <div
            key={step.id}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <motion.span
              variants={current ? progressDot : undefined}
              initial={current ? 'hidden' : false}
              animate={current ? 'visible' : false}
              className="block h-2.5 w-2.5 rounded-full"
              style={{
                background: filled ? '#00d3f2' : 'transparent',
                border: filled
                  ? '1px solid #00d3f2'
                  : '1px solid rgba(0,95,120,0.7)',
                boxShadow: current
                  ? '0 0 12px rgba(0,211,242,0.65)'
                  : 'none',
              }}
            />
            <span
              className="text-center text-[10px] leading-tight sm:text-[11px]"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: filled ? 500 : 400,
                color: filled
                  ? 'rgba(83, 234, 253, 0.95)'
                  : 'rgba(240, 244, 248, 0.4)',
                letterSpacing: '0.04em',
              }}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function CaseJourneySlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const show = (target: number) =>
    (isActive && fragment >= target) || (reduce && isActive)
  const activeIdx = isActive ? Math.max(1, fragment) : 0
  const currentStep = STEPS[Math.min(Math.max(activeIdx, 1), STEPS.length) - 1]

  return (
    <section className="relative flex h-full w-full flex-col gap-5 overflow-hidden px-8 py-8 sm:px-14 sm:py-10">
      {/* Eyebrow + progress strip */}
      <header className="flex flex-col gap-3">
        <motion.div
          variants={eyebrowVariant}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          className="flex items-baseline justify-between"
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              color: '#53eafd',
            }}
          >
            Шлях · сім кроків
          </span>
          <span
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 500,
              fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
              letterSpacing: '0.12em',
              color: 'rgba(240,244,248,0.55)',
            }}
          >
            {activeIdx || 0} / {STEPS.length}
          </span>
        </motion.div>
        <ProgressStrip activeIdx={activeIdx} />
      </header>

      {/* Centre stage — 2×2 board that fills up */}
      <div className="relative grid flex-1 grid-cols-1 gap-5 md:grid-cols-[minmax(240px,36%)_1fr]">
        {/* Identity panel — top-left */}
        <div className="flex flex-col gap-4">
          <motion.div
            variants={panelVariant}
            initial="hidden"
            animate={show(1) ? 'visible' : 'hidden'}
            className="flex flex-col gap-3 rounded-2xl px-6 py-5"
            style={{
              background: 'rgba(8, 51, 68, 0.55)',
              border: '1px solid rgba(83, 234, 253, 0.15)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <KuchenFokusLogo
              isActive={show(1)}
              variant={show(3) ? 'with-mark' : 'wordmark'}
              scale={0.85}
              delay={0.1}
            />

            <motion.div
              variants={urlChipVariant}
              initial="hidden"
              animate={show(2) ? 'visible' : 'hidden'}
              className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5"
              style={{
                background: 'rgba(5, 51, 69, 0.8)',
                border: '1px solid rgba(83, 234, 253, 0.3)',
              }}
            >
              <span
                aria-hidden
                className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                style={{ background: '#10b981' }}
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path
                    d="M3 6.5 L5 8.5 L9 4"
                    stroke="#F0F4F8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                  color: '#F0F4F8',
                }}
              >
                kuechenfokus.de
              </span>
            </motion.div>
          </motion.div>

          {/* Business card — bottom-left slot, fragment 6 */}
          <div className="relative flex min-h-[140px] items-center justify-center">
            {show(6) && (
              <div className="relative">
                <BusinessCard isActive={show(6)} delay={0.1} tilt={-5} />
                {/* Tap bubble that lands on the card at fragment 6, then fades by f=7 */}
                {fragment === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.8 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [-40, -10, -10, -10],
                      scale: [0.8, 1, 1, 0.95],
                    }}
                    transition={{
                      duration: 2.2,
                      ease: easeSmooth,
                      times: [0, 0.35, 0.75, 1],
                      delay: 0.6,
                    }}
                    className="pointer-events-none absolute -top-16 right-2"
                  >
                    <QuestionBubble isActive tail="down-right" opacity={0.9}>
                      «Візитка!»
                    </QuestionBubble>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Delivery panel — top-right browser */}
        <div className="relative flex flex-col gap-4">
          <motion.div
            variants={panelVariant}
            initial="hidden"
            animate={show(4) ? 'visible' : 'hidden'}
            className="relative"
          >
            <BrowserFrame
              isActive={show(4)}
              url="kuechenfokus.de"
              showCheck
              delay={0.1}
            >
              <SitePreview isActive={show(4)} delay={0.15} />
              {/* Korvo chat overlay — fragment 5 */}
              {show(5) && (
                <div className="absolute bottom-3 right-3 z-10">
                  <ChatBubbles isActive={show(5)} delay={0.1} />
                </div>
              )}
            </BrowserFrame>
          </motion.div>

          {/* T-shirt + silhouette — bottom-right slot, fragment 7 */}
          <div className="relative flex min-h-[160px] items-end justify-end gap-4 pr-4">
            {show(7) && (
              <>
                <EntrepreneurSilhouette
                  isActive={show(7)}
                  pose="standing"
                  opacity={0.75}
                  delay={0.25}
                  className="h-[160px] w-auto"
                />
                <TShirt isActive={show(7)} delay={0.1} scale={0.65} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom caption — crossfades as fragment changes */}
      <footer className="relative flex min-h-[2.4rem] items-center justify-center">
        <AnimatePresence mode="wait">
          {activeIdx > 0 && (
            <motion.p
              key={currentStep.id}
              variants={captionVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-[58ch] text-center text-[#F0F4F8]/90"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                lineHeight: 1.5,
              }}
            >
              {currentStep.caption}
            </motion.p>
          )}
        </AnimatePresence>
      </footer>
    </section>
  )
}
