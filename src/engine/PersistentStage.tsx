import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import DarkVeil from '@/components/DarkVeil'
import { WebspirioLogo } from '@/components/WebspirioLogo'
import { HERO_TIMING } from '@/animations/heroTimeline'
import type { ActivePosition, ColumnConfig } from './types'

interface PersistentStageProps {
  columns: ColumnConfig[]
  active: ActivePosition
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 640px)').matches
      : false,
  )
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export function PersistentStage({ columns, active }: PersistentStageProps) {
  const reduce = useReducedMotion() ?? false
  const isMobile = useIsMobile()
  const activeSlide = columns[active.col]?.slides[active.row]
  const isHero = active.col === 0 && active.row === 0
  // CaseCta closes both case narratives — lifted logo, but no fragment gate.
  const isCaseCta = active.col === 3 && active.row === 6
  // Services constellation opens Act 4 — the logo ignites the center aura.
  const isServicesGrid = active.col === 4 && active.row === 0
  const heroRevealed = !isHero || active.fragment >= 1
  // raisedReady = "logo should sit in the lifted (-38%) position for this slide"
  const raisedReady = isHero ? heroRevealed : isCaseCta
  const showLogo = activeSlide?.showCenterLogo !== false && heroRevealed

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={210}
          warpAmount={0.55}
          scanlineIntensity={0.05}
          scanlineFrequency={2.2}
          noiseIntensity={0.025}
          speed={reduce ? 0 : 0.45}
          resolutionScale={isMobile ? 0.5 : 0.75}
          className="block h-full w-full"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#0e7490', mixBlendMode: 'color' }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'linear-gradient(180deg, rgba(5, 51, 69, 0.55) 0%, rgba(16, 78, 100, 0.2) 45%, rgba(5, 51, 69, 0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(8, 51, 68, 0.28)' }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0, 211, 242, 0.22) 0%, rgba(8, 51, 68, 0) 62%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 flex items-center justify-center"
        style={{
          width: 'var(--logo-size)',
          height: 'var(--logo-size)',
          marginLeft: 'calc(var(--logo-size) / -2)',
          marginTop: 'calc(var(--logo-size) / -2)',
          filter: `drop-shadow(0 0 ${isHero ? 68 : 52}px rgba(0, 211, 242, ${
            isHero ? 0.6 : 0.4
          }))`,
        }}
        initial={{ y: '0%' }}
        animate={{
          opacity: showLogo ? 1 : 0,
          scale: showLogo
            ? isServicesGrid && !reduce
              ? [1, 1.08, 1]
              : 1
            : 0.9,
          y: raisedReady ? '-38%' : '0%',
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          scale:
            isServicesGrid && !reduce
              ? {
                  duration: 1.4,
                  times: [0, 0.35, 1],
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: {
            delay:
              isHero && heroRevealed && !reduce
                ? HERO_TIMING.taglineStart - 0.25
                : 0,
            duration: isHero ? 1.1 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{
            opacity:
              isServicesGrid && !reduce
                ? [0.35, 1, 0.55]
                : isHero && heroRevealed
                  ? 1
                  : 0.35,
            scale:
              isServicesGrid && !reduce
                ? [1.25, 1.95, 1.35]
                : isHero
                  ? 1.55
                  : 1.25,
          }}
          transition={
            isServicesGrid && !reduce
              ? {
                  duration: 1.4,
                  times: [0, 0.35, 1],
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(83, 234, 253, 0.55) 0%, rgba(0, 211, 242, 0.22) 35%, transparent 72%)',
            filter: 'blur(38px)',
          }}
        />
        <WebspirioLogo isActive={showLogo} className="relative h-full w-full" />
      </motion.div>
    </div>
  )
}

export default PersistentStage
