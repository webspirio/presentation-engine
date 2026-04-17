import { motion, type Variants } from 'motion/react'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"

type Lang = 'DE' | 'RU'
type Topic = 'Продукт' | 'Партнерство'

interface Sequence {
  lang: Lang
  topic: Topic
}

const SEQUENCES: readonly Sequence[] = [
  { lang: 'DE', topic: 'Продукт' },
  { lang: 'DE', topic: 'Партнерство' },
  { lang: 'RU', topic: 'Продукт' },
  { lang: 'RU', topic: 'Партнерство' },
] as const

// Bar widths (%) for the 6 stacked "letters" on each card's left edge.
const BAR_WIDTHS = [86, 62, 78, 54, 72, 60] as const

const headlineEnter: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: 0.15, ease: easeSmooth },
  },
}

const gridEnter: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
}

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

function SequenceCard({ lang, topic }: Sequence) {
  return (
    <motion.article
      variants={cardEnter}
      className="relative overflow-hidden rounded-xl border border-cyan-700/30 bg-cyan-900/40 px-3.5 py-3 pl-6"
      style={{ minHeight: '100px' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-2 top-3 flex w-[14px] flex-col justify-between"
      >
        {BAR_WIDTHS.map((w, i) => (
          <span
            key={i}
            className="block h-[2px] rounded-full bg-cyan-400"
            style={{ width: `${w}%`, opacity: 0.6 }}
          />
        ))}
      </div>

      <span
        className="inline-flex items-center text-cyan-300"
        style={{
          fontFamily: FONT_MONO,
          fontWeight: 600,
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          padding: '2px 8px',
          borderRadius: '999px',
          background: 'rgba(0, 211, 242, 0.1)',
          border: '1px solid rgba(83, 234, 253, 0.4)',
        }}
      >
        {lang}
      </span>

      <div
        className="mt-2 text-[#F0F4F8]"
        style={{ fontFamily: FONT_POPPINS, fontWeight: 500, fontSize: '0.98rem', lineHeight: 1.2 }}
      >
        {topic}
      </div>

      <div
        className="absolute bottom-2.5 right-3 text-cyan-200/75"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 400,
          fontSize: '0.65rem',
          letterSpacing: '0.01em',
        }}
      >
        5–7 листів
      </div>
    </motion.article>
  )
}

function RetainAccent({ active }: { active: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="flex w-full flex-col gap-4 md:ml-auto md:max-w-[360px]"
    >
      <motion.p
        variants={headlineEnter}
        className="text-cyan-300 md:text-right"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          textShadow: '0 0 20px rgba(0, 211, 242, 0.25)',
        }}
      >
        5× дорожче залучити, ніж повернути
      </motion.p>

      <motion.div variants={gridEnter} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SEQUENCES.map((seq) => (
          <SequenceCard key={`${seq.lang}-${seq.topic}`} {...seq} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export function RetainStageSlide({ isActive, fragment }: SlideProps) {
  const accentActive = isActive && fragment >= 2
  return (
    <StageSlide
      data={ACT2_STAGES[4]}
      isActive={isActive}
      fragment={fragment}
      accent={<RetainAccent active={accentActive} />}
    />
  )
}
