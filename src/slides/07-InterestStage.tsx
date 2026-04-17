import { motion, type Variants } from 'motion/react'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const WEEK_STOPS = ['Бренд', 'Контент', 'Макет', 'Розробка', 'QA', 'Запуск'] as const

const oldCycleEnter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.1, ease: easeSmooth },
  },
}

const lineEnter: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.55, delay: 0.3, ease: easeSmooth },
  },
}

const stopEnter: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.3 + i * 0.08, ease: easeSmooth },
  }),
}

const pillEnter: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: [0.85, 1.05, 1],
    transition: { duration: 0.75, delay: 0.9, ease: easeSmooth },
  },
}

const noteEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.25, ease: easeSmooth },
  },
}

function InterestAccent({ active }: { active: boolean }) {
  const animate = active ? 'visible' : 'hidden'
  return (
    <motion.div
      initial="hidden"
      animate={animate}
      className="flex w-full flex-col gap-4 md:items-end"
    >
      <motion.p
        variants={oldCycleEnter}
        className="line-through text-[#F0F4F8]/45"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 400,
          fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
          letterSpacing: '0.02em',
        }}
      >
        Звичайний цикл: 3–6 місяців
      </motion.p>

      <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-start md:gap-4 md:w-auto md:min-w-[380px]">
        <div className="relative grid flex-1 grid-cols-6 items-start gap-x-1">
          <motion.span
            aria-hidden
            variants={lineEnter}
            className="pointer-events-none absolute top-[0.375rem] h-px origin-left"
            style={{
              left: 'calc(100% / 12)',
              right: 'calc(100% / 12)',
              background: '#0e7490',
            }}
          />
          {WEEK_STOPS.map((label, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={stopEnter}
              className="relative flex flex-col items-center gap-2"
            >
              <span
                aria-hidden
                className="block h-3 w-3 rounded-full"
                style={{
                  background: '#00d3f2',
                  boxShadow: '0 0 10px rgba(0, 211, 242, 0.55)',
                }}
              />
              <span
                className="text-center leading-tight text-cyan-200"
                style={{
                  fontFamily: FONT_POPPINS,
                  fontWeight: 400,
                  fontSize: 'clamp(0.62rem, 0.78vw, 0.75rem)',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.span
          variants={pillEnter}
          className="inline-flex shrink-0 items-center self-center rounded-full border px-4 py-2 text-cyan-300 md:self-start"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            fontSize: 'clamp(0.9rem, 1.05vw, 1.05rem)',
            letterSpacing: '-0.01em',
            borderColor: 'rgba(83, 234, 253, 0.5)',
            background: 'rgba(0, 211, 242, 0.1)',
            boxShadow: '0 0 20px -6px rgba(0, 211, 242, 0.35)',
          }}
        >
          Ми: 6 тижнів
        </motion.span>
      </div>

      <motion.aside
        variants={noteEnter}
        role="note"
        className="italic"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 400,
          fontSize: 'clamp(0.7rem, 0.8vw, 0.8rem)',
          color: 'rgba(240, 244, 248, 0.55)',
          letterSpacing: '0.01em',
        }}
      >
        «Olga Gatlin: 3 мови, клієнти з трьох країн»
      </motion.aside>
    </motion.div>
  )
}

export function InterestStageSlide({ isActive, fragment }: SlideProps) {
  const accentActive = isActive && fragment >= 2
  return (
    <StageSlide
      data={ACT2_STAGES[1]}
      isActive={isActive}
      fragment={fragment}
      accent={<InterestAccent active={accentActive} />}
    />
  )
}
