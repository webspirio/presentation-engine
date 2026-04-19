import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { QuestionBubble } from '@/components/QuestionBubble'
import { easeSmooth } from '@/animations/transitions'
import {
  lrEyebrow,
  lrLeakLine,
  lrPill,
  lrPillGroup,
  lrStatReveal,
  lrSubtitle,
  lrTitle,
} from '@/animations/lrTimeline'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

// Group container controls when the stat+pills cluster appears; children
// fire their own variants. Keeps the hero stat in visual lockstep with its
// label and the three asset pills below.
const statGroupContainer: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0, staggerChildren: 0 },
  },
}

interface AssetPill {
  name: string
  status: string
}

const ASSETS: AssetPill[] = [
  { name: 'Магазин', status: 'готовий, не підʼєднаний' },
  { name: 'Партнерське посилання', status: 'готове, без воронки' },
  { name: 'Міні-курс', status: 'ідея без місця' },
]

export function LrSituationSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const statRevealed = fragment >= 1
  const leakRevealed = fragment >= 2

  const stageAnimate = isActive ? 'visible' : 'hidden'
  const statAnimate = (isActive && statRevealed) || (reduce && isActive) ? 'visible' : 'hidden'
  const leakAnimate = (isActive && leakRevealed) || (reduce && isActive) ? 'visible' : 'hidden'
  const bubbleActive = (isActive && leakRevealed) || (reduce && isActive)

  return (
    <section className="relative h-full w-full overflow-hidden px-10 py-14 sm:px-16">
      {/* Eyebrow top-left — matches Küchen Fokus case pattern */}
      <motion.div
        variants={lrEyebrow}
        initial="hidden"
        animate={stageAnimate}
        className="absolute left-10 top-10 sm:left-16 sm:top-12"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.8rem, 0.95vw, 1rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: '#53eafd',
        }}
      >
        Media factory funnel
      </motion.div>

      {/* Corner bubble — arrives with the leak (fr 2) as a rhetorical punch */}
      <div className="pointer-events-none absolute right-10 top-20 hidden md:block">
        <QuestionBubble
          isActive={bubbleActive}
          tail="down-right"
          from="top"
          opacity={0.92}
          delay={0.25}
          accent="rgba(255, 138, 115, 0.85)"
        >
          Не встигаю відповідати
        </QuestionBubble>
      </div>

      {/* Center column */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 text-center">
        {/* Title + subtitle — fragment 0 */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2
            variants={lrTitle}
            initial="hidden"
            animate={stageAnimate}
            className="text-[#F0F4F8]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
            }}
          >
            Актив уже є.
          </motion.h2>
          <motion.p
            variants={lrSubtitle}
            initial="hidden"
            animate={stageAnimate}
            className="text-[#53eafd]"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 400,
              fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)',
              letterSpacing: '0.02em',
            }}
          >
            Рук — не вистачає.
          </motion.p>
        </div>

        {/* Stat + pills cluster — fragment 1 */}
        <motion.div
          variants={statGroupContainer}
          initial="hidden"
          animate={statAnimate}
          className="flex w-full max-w-5xl flex-col items-center gap-8"
        >
          <motion.div
            variants={lrStatReveal}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="text-[#F0F4F8]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: 'clamp(4.4rem, 10vw, 8.4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textShadow:
                  '0 2px 36px rgba(0, 211, 242, 0.35), 0 0 60px rgba(0, 184, 219, 0.25)',
              }}
            >
              <AnimatedCounter
                target={23000}
                active={statAnimate === 'visible'}
                duration={1.4}
                delay={0.1}
              />
            </div>
            <div
              className="text-[#F0F4F8]/70"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 400,
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              підписників у TikTok
            </div>
          </motion.div>

          <motion.ul
            variants={lrPillGroup}
            className="flex w-full flex-wrap items-stretch justify-center gap-4"
          >
            {ASSETS.map((asset) => (
              <motion.li
                key={asset.name}
                variants={lrPill}
                className="flex min-w-[15.5rem] max-w-sm flex-1 flex-col items-start gap-1.5 rounded-2xl border border-[#53eafd]/25 bg-[#053345]/60 px-6 py-5 text-left backdrop-blur-sm"
                style={{
                  boxShadow:
                    '0 18px 40px -24px rgba(0, 211, 242, 0.35), inset 0 1px 0 rgba(83, 234, 253, 0.15)',
                }}
              >
                <span
                  className="text-[#F0F4F8]"
                  style={{
                    fontFamily: FONT_POPPINS,
                    fontWeight: 600,
                    fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {asset.name}
                </span>
                <span
                  className="text-[#F0F4F8]/60"
                  style={{
                    fontFamily: FONT_POPPINS,
                    fontWeight: 400,
                    fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
                    lineHeight: 1.35,
                  }}
                >
                  {asset.status}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Leak line — fragment 2 */}
        <motion.p
          variants={lrLeakLine}
          initial="hidden"
          animate={leakAnimate}
          transition={{ duration: 0.6, ease: easeSmooth, delay: 0.1 }}
          className="max-w-[40ch] text-[#F0F4F8]/85"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)',
            lineHeight: 1.45,
          }}
        >
          Клієнти пишуть щодня. Часу відповідати — вже немає. А контенту треба ще більше.
        </motion.p>
      </div>
    </section>
  )
}
