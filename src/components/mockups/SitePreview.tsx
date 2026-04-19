import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'
import { KuchenFokusLogo } from './KuchenFokusLogo'

export interface SitePreviewProps {
  isActive: boolean
  /** Base delay applied to the first row. */
  delay?: number
  className?: string
}

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number }) => ({
    transition: { delayChildren: custom.delay, staggerChildren: 0.08 },
  }),
}

const row: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

const tile: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

export function SitePreview({ isActive, delay = 0, className }: SitePreviewProps) {
  return (
    <motion.div
      custom={{ delay }}
      variants={container}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`flex flex-col gap-3 px-5 py-4 ${className ?? ''}`}
      style={{ color: '#F0F4F8' }}
    >
      {/* Nav */}
      <motion.div variants={row} className="flex items-center justify-between">
        <KuchenFokusLogo
          isActive={isActive}
          variant="with-mark"
          hideKicker
          scale={0.45}
          delay={delay + 0.05}
        />
        <ul
          className="flex items-center gap-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
            color: 'rgba(240,244,248,0.65)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <li>Start</li>
          <li>Leistungen</li>
          <li>Galerie</li>
          <li>Kontakt</li>
        </ul>
      </motion.div>

      {/* Hero band */}
      <motion.div
        variants={row}
        className="relative overflow-hidden rounded-lg"
        style={{
          height: 'clamp(70px, 10vh, 110px)',
          background:
            'linear-gradient(135deg, rgba(16, 78, 100, 0.85) 0%, rgba(5, 51, 69, 0.9) 50%, rgba(0, 211, 242, 0.35) 100%)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(83,234,253,0.12) 0 1px, transparent 1px 14px)',
          }}
        />
        <div className="relative flex h-full items-center px-4">
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 1.2vw, 1.2rem)',
                letterSpacing: '0.02em',
                color: '#F0F4F8',
                lineHeight: 1.1,
              }}
            >
              Küchen, die bleiben.
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.6rem, 0.7vw, 0.72rem)',
                color: 'rgba(240,244,248,0.75)',
              }}
            >
              Planung · Umbau · Übergabe in 6 Wochen
            </div>
          </div>
          <span
            className="ml-auto inline-flex items-center rounded-full px-3 py-1.5"
            style={{
              background: 'rgba(0, 211, 242, 0.25)',
              border: '1px solid rgba(83, 234, 253, 0.55)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.6rem, 0.7vw, 0.72rem)',
              color: '#F0F4F8',
              letterSpacing: '0.04em',
            }}
          >
            Termin sichern
          </span>
        </div>
      </motion.div>

      {/* Gallery grid */}
      <motion.div variants={row} className="grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            variants={tile}
            className="aspect-[4/3] rounded-md"
            style={{
              background:
                i % 2 === 0
                  ? 'linear-gradient(135deg, rgba(22,78,99,0.8), rgba(5,51,69,0.9))'
                  : 'linear-gradient(135deg, rgba(8,51,68,0.8), rgba(14,116,144,0.6))',
              border: '1px solid rgba(83, 234, 253, 0.12)',
            }}
          />
        ))}
      </motion.div>

      {/* Contact strip */}
      <motion.div
        variants={row}
        className="flex items-center justify-between rounded-md px-3 py-2"
        style={{
          background: 'rgba(8, 51, 68, 0.7)',
          border: '1px solid rgba(83, 234, 253, 0.12)',
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
            color: 'rgba(240,244,248,0.8)',
          }}
        >
          Kostenlose Beratung · München
        </span>
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
            color: '#53eafd',
          }}
        >
          +49 · kuechenfokus.de
        </span>
      </motion.div>
    </motion.div>
  )
}
