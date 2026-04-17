import { motion, type Variants } from 'motion/react'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const headingEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
}

const barBefore: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 0.4,
    transition: { duration: 0.9, delay: 0.1, ease: easeSmooth },
  },
}

const barAfter: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 0.87,
    transition: { duration: 0.9, delay: 0.4, ease: easeSmooth },
  },
}

const pillEnter: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 1.15, ease: easeSmooth },
  },
}

const chipsEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.3, ease: easeSmooth },
  },
}

const pillStyle: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 600,
  fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
  letterSpacing: '0.02em',
  borderColor: 'rgba(83, 234, 253, 0.55)',
  background: 'rgba(0, 211, 242, 0.08)',
  boxShadow: '0 0 18px -6px rgba(0, 211, 242, 0.45)',
}

function ThroughputAccent({ active }: { active: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="mx-auto flex w-full max-w-[260px] flex-col gap-3 md:mx-0 md:ml-auto md:max-w-[360px]"
    >
      <motion.span
        variants={headingEnter}
        className="text-cyan-200"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 500,
          fontSize: 'clamp(0.72rem, 0.88vw, 0.85rem)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Замовлень / тиждень
      </motion.span>

      <div className="flex flex-col gap-2.5">
        {/* Раніше */}
        <div className="flex items-center gap-3">
          <span
            className="w-14 shrink-0 text-cyan-200/70"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 400, fontSize: '0.8rem' }}
          >
            Раніше
          </span>
          <div
            className="relative h-3 flex-1 overflow-hidden rounded-full"
            style={{ background: 'rgba(14, 116, 144, 0.22)' }}
          >
            <motion.div
              aria-hidden
              variants={barBefore}
              className="absolute inset-y-0 left-0 w-full rounded-full"
              style={{
                background: '#155e75',
                transformOrigin: 'left center',
              }}
            />
          </div>
        </div>

        {/* Тепер — track + anchored desktop pill */}
        <div className="flex items-center gap-3">
          <span
            className="w-14 shrink-0 text-cyan-200"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 500, fontSize: '0.8rem' }}
          >
            Тепер
          </span>
          <div className="relative h-3 flex-1">
            <div
              className="absolute inset-0 overflow-hidden rounded-full"
              style={{ background: 'rgba(14, 116, 144, 0.22)' }}
            >
              <motion.div
                aria-hidden
                variants={barAfter}
                className="absolute inset-y-0 left-0 w-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d3f2 0%, #53eafd 100%)',
                  boxShadow: '0 0 16px -2px rgba(0, 211, 242, 0.55)',
                  transformOrigin: 'left center',
                }}
              />
            </div>
            <motion.span
              variants={pillEnter}
              className="absolute top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border px-3 py-1 text-cyan-300 md:inline-flex"
              style={{ left: '87%', ...pillStyle }}
            >
              [TBD]× більше
            </motion.span>
          </div>
        </div>
      </div>

      <motion.span
        variants={pillEnter}
        className="self-end whitespace-nowrap rounded-full border px-3 py-1 text-cyan-300 md:hidden"
        style={pillStyle}
      >
        [TBD]× більше
      </motion.span>

      <motion.ul variants={chipsEnter} className="mt-1 flex flex-wrap gap-2">
        {['Magento 2', 'ERP'].map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-cyan-700/40 bg-cyan-900/60 px-2 py-1 text-xs text-cyan-200"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 400 }}
          >
            {chip}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

export function ServeStageSlide({ isActive, fragment }: SlideProps) {
  const accentActive = isActive && fragment >= 2
  return (
    <StageSlide
      data={ACT2_STAGES[3]}
      isActive={isActive}
      fragment={fragment}
      accent={<ThroughputAccent active={accentActive} />}
    />
  )
}
