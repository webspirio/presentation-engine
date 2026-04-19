import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { KfClient } from '@/components/KfClient'
import { QuestionBubble } from '@/components/QuestionBubble'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

// Bubble lands with its inner edge at the silhouette's torso (silhouette is min(52vh,460px) wide on md;
// torso sits well inside the bounding box, so we inset past the full half-width by ~38px on md+).
const SILHOUETTE_EDGE_OFFSET = 'min(22vh, 192px)'

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.05 },
  },
}

const floorLineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.55,
    transition: { duration: 0.9, ease: easeSmooth, delay: 0.3 },
  },
}

const introVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth, delay: 0.55 },
  },
}

// Short side-to-side shake that fires when a bubble slams into the silhouette.
// Delay matches the throw variant's contact frame (~0.55 of 0.85s ≈ 0.47s).
const silhouetteBumpVariants: Variants = {
  idle: { x: 0, y: 0 },
  hitFromLeft: {
    x: [0, 6, -2, 0],
    transition: { duration: 0.35, times: [0, 0.3, 0.65, 1], ease: 'easeOut', delay: 0.47 },
  },
  hitFromRight: {
    x: [0, -6, 2, 0],
    transition: { duration: 0.35, times: [0, 0.3, 0.65, 1], ease: 'easeOut', delay: 0.47 },
  },
  hitFromBoth: {
    x: [0, -4, 5, -3, 1, 0],
    y: [0, 2, -1, 0, 0, 0],
    transition: { duration: 0.55, times: [0, 0.2, 0.45, 0.65, 0.85, 1], ease: 'easeOut', delay: 0.47 },
  },
}

const subCaptionVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 0.95,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

export function CaseHookSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const bubble1Revealed = fragment >= 1
  const bubble2Revealed = fragment >= 2
  const flurryRevealed = fragment >= 3
  const captionRevealed = fragment >= 4
  const stageActive = isActive
  const bubble1Active = (isActive && bubble1Revealed) || (reduce && isActive)
  const bubble2Active = (isActive && bubble2Revealed) || (reduce && isActive)
  const bubble3Active = (isActive && flurryRevealed) || (reduce && isActive)
  const bubble4Active = (isActive && flurryRevealed) || (reduce && isActive)
  const captionActive = (isActive && captionRevealed) || (reduce && isActive)

  const silhouetteState = !isActive
    ? 'idle'
    : flurryRevealed
      ? 'hitFromBoth'
      : bubble2Active
        ? 'hitFromRight'
        : bubble1Active
          ? 'hitFromLeft'
          : 'idle'

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Eyebrow */}
      <motion.div
        variants={eyebrowVariant}
        initial="hidden"
        animate={stageActive ? 'visible' : 'hidden'}
        className="absolute left-10 top-10 sm:left-16 sm:top-12"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: '#53eafd',
        }}
      >
        Кейс · München · 2026
      </motion.div>

      {/* Centered hub: silhouette + intro; desktop side bubbles overlay; mobile stacks bubbles below */}
      <div className="relative flex h-full w-full flex-col items-center justify-center px-6 pb-6 pt-10 sm:px-12 sm:py-20 md:py-14">
        {/* Center: silhouette + intro text */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            variants={silhouetteBumpVariants}
            initial="idle"
            animate={reduce ? 'idle' : silhouetteState}
            className="relative flex flex-col items-center"
          >
            {/* Radial halo — lifts silhouette from background near glowing bubbles */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: stageActive ? 1 : 0 }}
              transition={{ duration: 0.9, ease: easeSmooth, delay: 0.2 }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[24vh] w-[24vh] -translate-x-1/2 -translate-y-[52%] sm:h-[38vh] sm:w-[38vh] md:h-[min(62vh,560px)] md:w-[min(62vh,560px)]"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,211,242,0.28) 0%, rgba(0,211,242,0.14) 32%, rgba(0,211,242,0.05) 55%, transparent 72%)',
                filter: 'blur(10px)',
              }}
            />
            <KfClient
              isActive={stageActive}
              opacity={1}
              delay={0.15}
              className="relative h-[16vh] w-auto drop-shadow-[0_6px_28px_rgba(0,211,242,0.38)] sm:h-[28vh] md:h-[min(52vh,460px)]"
            />
            {/* Floor line — scoped to silhouette base */}
            <motion.span
              aria-hidden
              variants={floorLineVariant}
              initial="hidden"
              animate={stageActive ? 'visible' : 'hidden'}
              className="absolute -bottom-1 left-1/2 h-px w-[min(320px,80%)] origin-center -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(83,234,253,0.7) 25%, rgba(83,234,253,0.7) 75%, transparent)',
              }}
            />
          </motion.div>

          {/* Intro block */}
          <motion.div
            variants={introVariant}
            initial="hidden"
            animate={stageActive ? 'visible' : 'hidden'}
            className="mt-4 flex flex-col items-center gap-1.5 text-center"
          >
            <span
              className="text-[#F0F4F8]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
                letterSpacing: '-0.01em',
              }}
            >
              Власник невеликої майстерні.
            </span>
            <span
              className="max-w-[38ch] text-[#F0F4F8]/75"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 400,
                fontSize: 'clamp(0.88rem, 0.95vw, 1rem)',
                lineHeight: 1.5,
              }}
            >
              Робота якісна. Клієнти — переважно за рекомендаціями.
            </span>
          </motion.div>

          {/* Mobile stacked bubbles (md:hidden) — thrown from sides, tailless */}
          <div className="mt-4 flex w-full flex-col items-stretch gap-2 md:hidden">
            <QuestionBubble
              isActive={bubble1Active}
              from="left"
              tail="none"
              entry="throw"
              throwDistance={240}
              delay={0.05}
            >
              «А сайт є? Хочу подивитись роботи»
            </QuestionBubble>
            <QuestionBubble
              isActive={bubble2Active}
              from="right"
              tail="none"
              entry="throw"
              throwDistance={240}
              delay={0.05}
            >
              «Дайте візитку — порекомендую друзям»
            </QuestionBubble>
            <QuestionBubble
              isActive={bubble3Active}
              from="left"
              tail="none"
              entry="throw"
              throwDistance={240}
              delay={0.05}
            >
              «А відгуки десь почитати?»
            </QuestionBubble>
            <QuestionBubble
              isActive={bubble4Active}
              from="right"
              tail="none"
              entry="throw"
              throwDistance={240}
              delay={0.2}
            >
              «А де Вас знайти в Інтернеті?»
            </QuestionBubble>
          </div>
        </div>

        {/* Desktop side bubbles — absolute flanking layer, thrown toward silhouette edges */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {/* Bubble 1 — mid-left (fr=1) */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ right: `calc(50% + ${SILHOUETTE_EDGE_OFFSET})` }}
          >
            <QuestionBubble
              isActive={bubble1Active}
              from="left"
              tail="none"
              entry="throw"
              throwDistance={460}
              delay={0.05}
            >
              «А сайт є? Хочу подивитись роботи»
            </QuestionBubble>
          </div>
          {/* Bubble 2 — mid-right (fr=2) */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${SILHOUETTE_EDGE_OFFSET})` }}
          >
            <QuestionBubble
              isActive={bubble2Active}
              from="right"
              tail="none"
              entry="throw"
              throwDistance={460}
              delay={0.05}
            >
              «Дайте візитку — порекомендую друзям»
            </QuestionBubble>
          </div>
          {/* Bubble 3 — upper-left (fr=3) */}
          <div
            className="absolute top-[20%]"
            style={{ right: `calc(50% + min(19vh, 160px))` }}
          >
            <QuestionBubble
              isActive={bubble3Active}
              from="left"
              tail="none"
              entry="throw"
              throwDistance={460}
              delay={0.05}
            >
              «А відгуки десь почитати?»
            </QuestionBubble>
          </div>
          {/* Bubble 4 — upper-right, above visitka (fr=3) */}
          <div
            className="absolute top-[20%]"
            style={{ left: `calc(50% + min(19vh, 160px))` }}
          >
            <QuestionBubble
              isActive={bubble4Active}
              from="right"
              tail="none"
              entry="throw"
              throwDistance={460}
              delay={0.2}
            >
              «А де Вас знайти в Інтернеті?»
            </QuestionBubble>
          </div>
        </div>

        {/* Caption — relative on mobile (after stacked bubbles), absolute bottom-center on desktop */}
        <motion.p
          variants={subCaptionVariant}
          initial="hidden"
          animate={captionActive ? 'visible' : 'hidden'}
          className="relative mt-3 max-w-[42ch] text-balance text-center text-[#F0F4F8]/90 md:absolute md:bottom-10 md:left-1/2 md:mt-0 md:-translate-x-1/2"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            lineHeight: 1.55,
          }}
        >
          Одні — хочуть порадити. Інші — побачити роботи. І так — щодня.
        </motion.p>
      </div>
    </section>
  )
}
