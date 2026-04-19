import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'

export interface TShirtProps {
  isActive: boolean
  delay?: number
  /** Size of the tee in relative units. */
  scale?: number
  className?: string
}

const shirtVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: easeSmooth, delay: custom.delay },
  }),
}

const logoVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    scale: [0.7, 1.1, 1],
    transition: { duration: 0.6, ease: easeSmooth, delay: custom.delay + 0.35 },
  }),
}

export function TShirt({ isActive, delay = 0, scale = 1, className }: TShirtProps) {
  const width = `calc(${scale} * clamp(180px, 18vw, 260px))`

  return (
    <motion.div
      custom={{ delay }}
      variants={shirtVariant}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`relative ${className ?? ''}`}
      style={{ width }}
    >
      <svg viewBox="0 0 260 280" fill="none" className="h-auto w-full">
        <defs>
          <linearGradient id="shirt-fabric" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#083344" />
            <stop offset="55%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#164e63" />
          </linearGradient>
        </defs>

        {/* Back-of-shirt outline */}
        <path
          d="M40 60
             L80 22
             Q94 10 130 10
             Q166 10 180 22
             L220 60
             L240 90
             L220 130
             L200 118
             L200 268
             Q200 272 196 272
             L64 272
             Q60 272 60 268
             L60 118
             L40 130
             L20 90 Z"
          fill="url(#shirt-fabric)"
          stroke="rgba(83, 234, 253, 0.35)"
          strokeWidth="1.2"
        />

        {/* Subtle neck stitch */}
        <path
          d="M100 24 Q130 40 160 24"
          fill="none"
          stroke="rgba(83, 234, 253, 0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Fabric creases */}
        <path
          d="M130 60 L130 260"
          stroke="rgba(5, 51, 69, 0.5)"
          strokeWidth="1.2"
          opacity="0.55"
        />
      </svg>

      {/* Logo decal on the back */}
      <motion.div
        custom={{ delay }}
        variants={logoVariant}
        className="absolute left-1/2 top-[38%] flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 600,
            fontSize: `calc(${scale} * clamp(1rem, 1.25vw, 1.3rem))`,
            letterSpacing: '0.08em',
            color: '#F0F4F8',
          }}
        >
          Küchen Fokus
        </div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: `calc(${scale} * clamp(0.55rem, 0.65vw, 0.7rem))`,
            letterSpacing: '0.3em',
            color: 'rgba(83, 234, 253, 0.95)',
            textTransform: 'uppercase',
          }}
        >
          kuechenfokus.de
        </div>
      </motion.div>
    </motion.div>
  )
}
