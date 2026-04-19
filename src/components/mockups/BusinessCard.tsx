import { motion, type Variants } from 'motion/react'
import { KuchenFokusLogo } from './KuchenFokusLogo'

export interface BusinessCardProps {
  isActive: boolean
  delay?: number
  /** Optional tilt applied at rest (degrees). */
  tilt?: number
  className?: string
}

const cardVariant: Variants = {
  hidden: { opacity: 0, rotateZ: -14, y: -60, scale: 0.9 },
  visible: (custom: { delay: number; tilt: number }) => ({
    opacity: 1,
    rotateZ: custom.tilt,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18,
      mass: 0.9,
      delay: custom.delay,
    },
  }),
}

export function BusinessCard({
  isActive,
  delay = 0,
  tilt = -6,
  className,
}: BusinessCardProps) {
  return (
    <motion.div
      custom={{ delay, tilt }}
      variants={cardVariant}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`relative overflow-hidden rounded-lg ${className ?? ''}`}
      style={{
        width: 'clamp(220px, 22vw, 320px)',
        aspectRatio: '1.75 / 1',
        background:
          'linear-gradient(135deg, #083344 0%, #0e7490 55%, #164e63 100%)',
        border: '1px solid rgba(83, 234, 253, 0.35)',
        boxShadow:
          '0 28px 60px -28px rgba(0, 0, 0, 0.7), 0 0 40px -18px rgba(0, 211, 242, 0.45), inset 0 0 0 1px rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Corner accent */}
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(83, 234, 253, 0.45), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Thin diagonal grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(83,234,253,0.15) 0 1px, transparent 1px 12px)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between px-5 py-4">
        <KuchenFokusLogo
          isActive={isActive}
          variant="with-mark"
          hideKicker
          scale={0.55}
          delay={delay + 0.3}
        />
        <div className="flex items-end justify-between gap-3">
          <div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.75rem, 0.85vw, 0.85rem)',
                color: '#F0F4F8',
              }}
            >
              Küchen · Umbau · Planung
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontSize: 'clamp(0.65rem, 0.72vw, 0.72rem)',
                color: 'rgba(240, 244, 248, 0.75)',
              }}
            >
              kuechenfokus.de · +49 8031 ·· ·· ···
            </div>
          </div>
          <div
            aria-hidden
            className="h-10 w-10 rounded-md"
            style={{
              background:
                'conic-gradient(from 45deg, #F0F4F8 0deg 25%, #053345 25% 50%, #F0F4F8 50% 75%, #053345 75% 100%)',
              opacity: 0.85,
              border: '1px solid rgba(240,244,248,0.5)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
