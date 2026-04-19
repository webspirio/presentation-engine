import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'
import { EntrepreneurSilhouette } from '@/components/EntrepreneurSilhouette'
import { BrowserFrame } from '@/components/mockups/BrowserFrame'
import { SitePreview } from '@/components/mockups/SitePreview'
import { BusinessCard } from '@/components/mockups/BusinessCard'
import { TShirt } from '@/components/mockups/TShirt'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

const LINES = [
  { key: 'card',    text: 'Клієнт питає — він дістає візитку.' },
  { key: 'shirt',   text: 'Команда піднімається сходами — сусіди читають назву.' },
  { key: 'site',    text: 'Хтось шукає кухню в Розенхаймі — знаходить Küchen Fokus.' },
] as const

type HighlightKey = (typeof LINES)[number]['key']

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.05 },
  },
}

const lineVariant: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

const highlightRing: Variants = {
  idle: {
    opacity: 0,
    scale: 1,
  },
  lit: {
    opacity: [0, 0.65, 0.45],
    scale: [0.95, 1.06, 1.02],
    transition: { duration: 1.4, ease: easeSmooth },
  },
}

interface HighlightWrapperProps {
  lit: boolean
  children: React.ReactNode
  className?: string
}

function HighlightWrapper({ lit, children, className }: HighlightWrapperProps) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <motion.span
        aria-hidden
        variants={highlightRing}
        animate={lit ? 'lit' : 'idle'}
        className="pointer-events-none absolute -inset-3 rounded-2xl"
        style={{
          border: '1.5px solid rgba(83, 234, 253, 0.85)',
          boxShadow:
            '0 0 32px rgba(0, 211, 242, 0.45), inset 0 0 18px rgba(0, 211, 242, 0.3)',
        }}
      />
      {children}
    </div>
  )
}

export function CaseAfterSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const revealed = (target: number) =>
    (isActive && fragment >= target) || (reduce && isActive)

  const highlight: HighlightKey | null =
    isActive && fragment >= 1 && fragment <= 3 ? LINES[fragment - 1].key : null

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden px-10 py-10 sm:px-16 sm:py-12">
      {/* Eyebrow */}
      <motion.div
        variants={eyebrowVariant}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className="mb-6"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: '#53eafd',
        }}
      >
        Тепер
      </motion.div>

      <div className="relative grid flex-1 grid-cols-1 items-center gap-6 md:grid-cols-[auto_1fr]">
        {/* Silhouette — upright, pointing */}
        <div className="flex items-end justify-center md:pl-4">
          <EntrepreneurSilhouette
            isActive={isActive}
            pose={fragment >= 1 ? 'pointing' : 'standing'}
            opacity={0.78}
            delay={0.15}
            className="h-[min(58vh,460px)] w-auto"
          />
        </div>

        {/* Deliverables board */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Browser/site — spans the full row at the top */}
          <HighlightWrapper lit={highlight === 'site'} className="order-1 md:col-span-3">
            <BrowserFrame
              isActive={isActive}
              url="kuechenfokus.de"
              showCheck
              delay={0.2}
              className="w-full"
            >
              <SitePreview isActive={isActive} delay={0.3} />
            </BrowserFrame>
          </HighlightWrapper>

          {/* Card */}
          <HighlightWrapper lit={highlight === 'card'} className="order-2 flex justify-center md:justify-start">
            <BusinessCard isActive={isActive} delay={0.35} tilt={-4} />
          </HighlightWrapper>

          {/* T-shirts — front + back pair, both light up on the "shirt" line */}
          <HighlightWrapper lit={highlight === 'shirt'} className="order-3 flex items-end justify-center gap-4 md:col-span-2 md:justify-end">
            <TShirt isActive={isActive} delay={0.45} scale={0.55} view="front" />
            <TShirt isActive={isActive} delay={0.6} scale={0.55} view="back" />
          </HighlightWrapper>
        </div>
      </div>

      {/* Caption stack */}
      <ul className="mt-6 flex flex-col gap-2.5">
        {LINES.map((line, i) => (
          <motion.li
            key={line.key}
            variants={lineVariant}
            initial="hidden"
            animate={revealed(i + 1) ? 'visible' : 'hidden'}
            className="flex items-baseline gap-3 text-[#F0F4F8]/90"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 400,
              fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)',
              lineHeight: 1.5,
            }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[0.55em] rounded-full"
              style={{
                background:
                  highlight === line.key ? '#53eafd' : 'rgba(83,234,253,0.4)',
              }}
            />
            {line.text}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
