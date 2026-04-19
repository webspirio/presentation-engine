import { motion, type Variants } from 'motion/react'
import { Play } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const accentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const badgeEnter: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
}

const reelsGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const reelThumb: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

const captionEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeSmooth },
  },
}

function AttractAccent({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={accentContainer}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="flex w-full flex-col items-center gap-5 md:items-end"
    >
      <motion.div
        variants={badgeEnter}
        className="inline-flex flex-col items-center gap-1.5 rounded-2xl px-7 py-5 text-center"
        style={{
          background: 'linear-gradient(135deg, #00d3f2 0%, #53eafd 55%, #F0F4F8 100%)',
          boxShadow:
            '0 18px 40px -18px rgba(0, 211, 242, 0.55), inset 0 0 0 1px rgba(255,255,255,0.35)',
        }}
      >
        <span
          className="text-[#053345] tabular-nums"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 3.5vw, 3rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          <AnimatedCounter
            target={23000}
            suffix="+"
            active={active}
            duration={1.8}
            delay={0.2}
          />
        </span>
        <span
          className="text-[#053345]/75"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 500,
            fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
            letterSpacing: '0.04em',
          }}
        >
          підписників
        </span>
      </motion.div>

      <motion.ul
        variants={reelsGrid}
        aria-hidden
        className="grid w-full max-w-[280px] grid-cols-3 gap-3"
      >
        {[0, 1, 2].map((i) => (
          <motion.li
            key={i}
            variants={reelThumb}
            className="relative flex aspect-[9/16] items-center justify-center rounded-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(83, 234, 253, 0.25)',
            }}
          >
            <Play
              className="h-5 w-5 translate-x-[1px] text-cyan-200/70"
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        variants={captionEnter}
        className="text-cyan-200"
        style={{
          fontFamily: FONT_POPPINS,
          fontWeight: 500,
          fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
          letterSpacing: '0.01em',
        }}
      >
        15–25 Reels / тиждень
      </motion.p>
    </motion.div>
  )
}

export function AttractStageSlide({ isActive, fragment }: SlideProps) {
  const accentActive = isActive && fragment >= 2
  return (
    <StageSlide
      data={ACT2_STAGES[0]}
      isActive={isActive}
      fragment={fragment}
      accent={<AttractAccent active={accentActive} />}
    />
  )
}
