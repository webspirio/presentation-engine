import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle } from 'lucide-react'
import type { SlideProps } from '@/engine/types'
import {
  caseCardChildren,
  caseCardEnter,
  progressDot,
  stageLeak,
  stageQuestion,
} from '@/animations/stageTimeline'

export interface StageSlideData {
  stageIndex: 1 | 2 | 3 | 4 | 5
  stageLabel: string
  emoji: string
  diagnosticQ: string
  leak: string
  caseClient: string
  caseLocation?: string
  caseResult: string
  caseTechChips?: string[]
}

export interface StageSlideProps extends Pick<SlideProps, 'isActive' | 'fragment'> {
  data: StageSlideData
  accent?: ReactNode
}

const STAGE_LABELS = ['Привабити', 'Зацікавити', 'Записати', 'Обслужити', 'Повернути'] as const

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

function ProgressStrip({ stageIndex }: { stageIndex: StageSlideData['stageIndex'] }) {
  return (
    <div className="flex items-end gap-3 sm:gap-3.5">
      {STAGE_LABELS.map((label, i) => {
        const idx = i + 1
        const filled = idx <= stageIndex
        const current = idx === stageIndex
        return (
          <div key={label} className="flex flex-col items-center gap-2">
            <motion.span
              aria-hidden
              variants={current ? progressDot : undefined}
              initial={current ? 'hidden' : false}
              animate={current ? 'visible' : false}
              className="block h-3 w-3 rounded-full"
              style={{
                background: filled ? '#00d3f2' : 'transparent',
                border: filled ? '1px solid #00d3f2' : '1px solid rgba(0,95,120,0.7)',
                boxShadow: current ? '0 0 12px rgba(0,211,242,0.65)' : 'none',
              }}
            />
            <span
              className="hidden text-xs tracking-wide text-cyan-200/70 sm:block"
              style={{ fontFamily: FONT_POPPINS }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function StageSlide({ data, isActive, fragment, accent }: StageSlideProps) {
  const stage = (t: number) => (isActive && fragment >= t ? 'visible' : 'hidden')

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative z-10 flex h-full w-full flex-col px-10 py-10 sm:px-16 sm:py-12">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span aria-hidden className="text-4xl leading-none sm:text-5xl">{data.emoji}</span>
              <span
                className="text-cyan-300"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 'clamp(1.25rem, 1.6vw, 1.45rem)', letterSpacing: '0.02em' }}
              >
                {data.stageIndex}/5
              </span>
            </div>
            <span
              className="text-[#F0F4F8]/85"
              style={{ fontFamily: FONT_POPPINS, fontWeight: 500, fontSize: 'clamp(1.2rem, 1.4vw, 1.3rem)' }}
            >
              {data.stageLabel}
            </span>
          </div>
          <ProgressStrip stageIndex={data.stageIndex} />
        </div>

        <motion.h2
          variants={stageQuestion}
          initial="hidden"
          animate={stage(0)}
          className="mt-10 max-w-[18ch] text-balance text-[#F0F4F8] sm:mt-12"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(2.75rem, 4.6vw, 3.9rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.015em',
          }}
        >
          {data.diagnosticQ}
        </motion.h2>

        <motion.div
          variants={stageLeak}
          initial="hidden"
          animate={stage(1)}
          className="mt-8 flex max-w-[60ch] items-center gap-4"
        >
          <span aria-hidden className="h-px w-12 shrink-0 bg-cyan-400/60" />
          <AlertTriangle aria-hidden className="h-5 w-5 shrink-0 text-cyan-300/90" />
          <p
            className="text-[#F0F4F8]/80"
            style={{ fontFamily: FONT_POPPINS, fontWeight: 400, fontSize: 'clamp(1.3rem, 1.7vw, 1.5rem)', lineHeight: 1.4 }}
          >
            {data.leak}
          </p>
        </motion.div>

        <div className="mt-auto flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between">
          <motion.article
            variants={caseCardEnter}
            initial="hidden"
            animate={stage(2)}
            className="w-full max-w-[60ch] rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(10, 40, 56, 0.6)',
              border: '1px solid rgba(83, 234, 253, 0.18)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              variants={caseCardChildren}
              className="text-[#F0F4F8]"
              style={{ fontFamily: FONT_POPPINS, fontWeight: 600, fontSize: 'clamp(1.4rem, 1.55vw, 1.55rem)' }}
            >
              {data.caseClient}
            </motion.div>
            {data.caseLocation && (
              <motion.div
                variants={caseCardChildren}
                className="mt-1 text-[#F0F4F8]/55"
                style={{ fontFamily: FONT_POPPINS, fontWeight: 400, fontSize: 'clamp(1.05rem, 1.15vw, 1.1rem)' }}
              >
                {data.caseLocation}
              </motion.div>
            )}
            <motion.p
              variants={caseCardChildren}
              className="mt-4 text-cyan-300"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 'clamp(1.3rem, 1.7vw, 1.5rem)', lineHeight: 1.35 }}
            >
              {data.caseResult}
            </motion.p>
            {data.caseTechChips && data.caseTechChips.length > 0 && (
              <motion.ul variants={caseCardChildren} className="mt-5 flex flex-wrap gap-2">
                {data.caseTechChips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-cyan-700/40 bg-cyan-900/60 px-3 py-1.5 text-sm text-cyan-200"
                    style={{ fontFamily: FONT_POPPINS, fontWeight: 400 }}
                  >
                    {chip}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.article>

          {accent && <div className="w-full md:w-auto md:flex-1 md:pl-8">{accent}</div>}
        </div>
      </div>
    </section>
  )
}
