import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { EntrepreneurSilhouette } from '@/components/EntrepreneurSilhouette'
import { QuestionBubble } from '@/components/QuestionBubble'
import { easeSmooth } from '@/animations/transitions'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const COPY = {
  eyebrow: 'Але...',
  tags: ['Немає назви', 'Немає сайту', 'Немає візитки'] as const,
  caption: 'Інтерес завершується на порозі.',
}

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.05 },
  },
}

const tagContainer: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

const strikeVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: easeSmooth, delay: 0.25 },
  },
}

const captionVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth, delay: 0.2 },
  },
}

interface TensionTagProps {
  label: string
  active: boolean
}

function TensionTag({ label, active }: TensionTagProps) {
  return (
    <motion.div
      variants={tagContainer}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      className="relative inline-flex items-center gap-4 rounded-xl px-5 py-3.5"
      style={{
        background: 'rgba(8, 51, 68, 0.75)',
        border: '1px solid rgba(255, 107, 74, 0.35)',
        boxShadow: '0 18px 40px -24px rgba(255, 107, 74, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* X mark */}
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          background: 'rgba(255, 107, 74, 0.15)',
          border: '1px solid rgba(255, 107, 74, 0.6)',
        }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M4 4 L12 12 M12 4 L4 12"
            stroke="#ff8361"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span
        className="relative text-[#F0F4F8]/85"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 500,
          fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
        <motion.span
          aria-hidden
          variants={strikeVariant}
          className="absolute left-0 top-1/2 h-[2px] w-full origin-left"
          style={{ background: '#ff8361', translateY: '-50%' }}
        />
      </span>
    </motion.div>
  )
}

export function CaseTensionSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const tagActive = (target: number) =>
    (isActive && fragment >= target) || (reduce && isActive)

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Eyebrow */}
      <motion.div
        variants={eyebrowVariant}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className="absolute left-10 top-10 sm:left-16 sm:top-12"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: 'rgba(255, 131, 97, 0.95)',
        }}
      >
        {COPY.eyebrow}
      </motion.div>

      {/* Faded bubble recap — top-right */}
      <div className="absolute right-10 top-10 scale-90 opacity-60 sm:right-16 sm:top-12">
        <QuestionBubble
          isActive={isActive}
          from="top"
          tail="down-right"
          opacity={0.55}
          delay={0.15}
        >
          «...візитку? ...сайт?»
        </QuestionBubble>
      </div>

      {/* Silhouette — bottom-left, smaller, same pose */}
      <div className="absolute bottom-10 left-10 flex items-end sm:bottom-14 sm:left-16">
        <EntrepreneurSilhouette
          isActive={isActive}
          pose="carrying"
          opacity={0.32}
          delay={0.1}
          className="h-[min(50vh,380px)] w-auto"
        />
      </div>

      {/* Three tags stack — right side */}
      <div className="absolute right-10 top-1/2 flex -translate-y-1/2 flex-col gap-5 sm:right-16">
        {COPY.tags.map((tag, i) => (
          <TensionTag key={tag} label={tag} active={tagActive(i + 1)} />
        ))}

        <motion.p
          variants={captionVariant}
          initial="hidden"
          animate={tagActive(3) ? 'visible' : 'hidden'}
          className="mt-4 max-w-[32ch] text-right text-[#F0F4F8]/80"
          style={{
            fontFamily: FONT_POPPINS,
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          {COPY.caption}
        </motion.p>
      </div>
    </section>
  )
}
