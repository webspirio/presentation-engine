import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import DarkVeil from '@/components/DarkVeil'
import { WebspirioLogo } from '@/components/WebspirioLogo'
import type { SlideConfig } from './types'

interface PersistentStageProps {
  slides: SlideConfig[]
  activeSlide: number
}

const LOGO_SIZE_DESKTOP = 440

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

export function PersistentStage({ slides, activeSlide }: PersistentStageProps) {
  const reduce = useReducedMotion() ?? false
  const isMobile = useIsMobile()
  const showLogo = slides[activeSlide]?.showCenterLogo !== false
  const isHero = activeSlide === 0

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
          width: LOGO_SIZE_DESKTOP,
          height: LOGO_SIZE_DESKTOP,
          marginLeft: -LOGO_SIZE_DESKTOP / 2,
          marginTop: -LOGO_SIZE_DESKTOP / 2,
          filter: `drop-shadow(0 0 ${isHero ? 64 : 48}px rgba(0, 211, 242, ${
            isHero ? 0.55 : 0.35
          }))`,
        }}
        animate={{
          opacity: showLogo ? 1 : 0,
          scale: showLogo ? 1 : 0.9,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            opacity: isHero ? 1 : 0,
            scale: isHero ? 1.5 : 1.2,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(83, 234, 253, 0.5) 0%, rgba(0, 211, 242, 0.2) 35%, transparent 70%)',
            filter: 'blur(36px)',
          }}
        />
        <WebspirioLogo isActive className="h-full w-full" />
      </motion.div>
    </div>
  )
}

export default PersistentStage
