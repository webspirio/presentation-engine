import { motion, useReducedMotion, type Variants } from 'motion/react'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const headingEnterMotion: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
}

const headingEnterReduce: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

const barBeforeMotion: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 0.4,
    transition: { duration: 0.9, delay: 0.1, ease: easeSmooth },
  },
}

const barBeforeReduce: Variants = {
  hidden: { scaleX: 0.4 },
  visible: { scaleX: 0.4, transition: { duration: 0 } },
}

const barAfterMotion: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 0.87,
    transition: { duration: 0.9, delay: 0.4, ease: easeSmooth },
  },
}

const barAfterReduce: Variants = {
  hidden: { scaleX: 0.87 },
  visible: { scaleX: 0.87, transition: { duration: 0 } },
}

const pillEnterMotion: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 1.15, ease: easeSmooth },
  },
}

const pillEnterReduce: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

const chipsEnterMotion: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.3, ease: easeSmooth },
  },
}

const chipsEnterReduce: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

const pillStyle: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 600,
  fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
  letterSpacing: '0.02em',
  borderColor: 'rgba(83, 234, 253, 0.55)',
  background: 'rgba(0, 211, 242, 0.08)',
  boxShadow: '0 0 18px -6px rgba(0, 211, 242, 0.45)',
}

function ThroughputAccent({ active }: { active: boolean }) {
  const reduce = useReducedMotion() ?? false
  const headingEnter = reduce ? headingEnterReduce : headingEnterMotion
  const barBefore = reduce ? barBeforeReduce : barBeforeMotion
  const barAfter = reduce ? barAfterReduce : barAfterMotion
  const pillEnter = reduce ? pillEnterReduce : pillEnterMotion
  const chipsEnter = reduce ? chipsEnterReduce : chipsEnterMotion

  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="mx-auto flex w-full max-w-[320px] flex-col gap-3.5 md:mx-0 md:ml-auto md:max-w-[420px]"
    >
      <motion.span
        variants={headingEnter}
        className="text-cyan-200"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 500,
          fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Замовлень / тиждень
      </motion.span>

      <div className="flex flex-col gap-3">
        {/* Раніше */}
        <div className="flex items-center gap-3">
          <span
            className="w-16 shrink-0 text-cyan-200/70"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 400, fontSize: '0.95rem' }}
          >
            Раніше
          </span>
          <div
            className="relative h-4 flex-1 overflow-hidden rounded-full"
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
            className="w-16 shrink-0 text-cyan-200"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 500, fontSize: '0.95rem' }}
          >
            Тепер
          </span>
          <div className="relative h-4 flex-1">
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
              className="absolute top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border px-4 py-1.5 text-cyan-300 md:inline-flex"
              style={{ left: '87%', ...pillStyle }}
            >
              Значно більше
            </motion.span>
          </div>
        </div>
      </div>

      <motion.span
        variants={pillEnter}
        className="self-end whitespace-nowrap rounded-full border px-4 py-1.5 text-cyan-300 md:hidden"
        style={pillStyle}
      >
        Значно більше
      </motion.span>

      <motion.ul variants={chipsEnter} className="mt-1 flex flex-wrap gap-2">
        {['Magento 2', 'ERP'].map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-cyan-700/40 bg-cyan-900/60 px-3 py-1.5 text-sm text-cyan-200"
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
