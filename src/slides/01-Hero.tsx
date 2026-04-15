import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '@/engine/types'
import DarkVeil from '@/components/DarkVeil'
import { WebspirioLogo } from '@/components/WebspirioLogo'
import {
  captionReveal,
  glowPulse,
  levitate,
  taglineContainer,
  taglineWord,
} from '@/animations/heroTimeline'

const TAGLINE = 'Від ідеї до цифрової екосистеми'
const CAPTION = 'UA WELL · 2026 · Düsseldorf'

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

export function HeroSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const isMobile = useIsMobile()
  const animState = isActive || reduce ? 'visible' : 'hidden'

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-cyan-950">
      <div className="absolute inset-0 z-0">
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
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: '#0e7490',
          mixBlendMode: 'color',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[1] mix-blend-multiply"
        style={{
          background:
            'linear-gradient(180deg, rgba(5, 51, 69, 0.55) 0%, rgba(16, 78, 100, 0.2) 45%, rgba(5, 51, 69, 0.65) 100%)',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: 'rgba(8, 51, 68, 0.28)',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(0, 211, 242, 0.22) 0%, rgba(8, 51, 68, 0) 62%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center sm:gap-12 md:gap-14">
        <div className="relative flex items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            variants={glowPulse}
            initial="hidden"
            animate={animState}
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(83, 234, 253, 0.5) 0%, rgba(0, 211, 242, 0.2) 35%, transparent 70%)',
              filter: 'blur(36px)',
              transform: 'scale(1.5)',
            }}
          />

          <motion.div
            variants={levitate}
            initial="hidden"
            animate={animState}
            className="drop-shadow-[0_0_48px_rgba(0,211,242,0.4)]"
          >
            <WebspirioLogo
              isActive={isActive}
              className="aspect-square w-56 sm:w-64 md:w-72 lg:w-80"
            />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.h1
            variants={taglineContainer}
            initial="hidden"
            animate={animState}
            className="max-w-[14ch] text-balance text-[#F0F4F8]"
            style={{
              fontFamily: "'Unbounded', 'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 5.2vw, 4.25rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textShadow: '0 2px 40px rgba(0, 184, 219, 0.35)',
            }}
          >
            {TAGLINE.split(' ').map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={taglineWord}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={captionReveal}
            initial="hidden"
            animate={animState}
            className="text-[11px] uppercase tracking-[0.42em] text-cyan-300/75 sm:text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {CAPTION}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
