import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

// Deterministic PRNG from integer seed (Knuth multiplicative hash).
function hashToUnit(seed: number) {
  return ((seed * 2654435761) >>> 0) / 2 ** 32
}

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  twinklePhase: number
  twinkleSpeed: number
}

const PARTICLE_COUNT = 40

/**
 * Zero-prop ambient backdrop for the Services Constellation slide.
 * Vertical cyan-950 → cyan-900 gradient with 40 slow-drifting cyan dust particles.
 * Designed to be trivially swappable for DarkVeil later — no external props.
 */
export function SpaceBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    let width = parent.clientWidth
    let height = parent.clientHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Seed particles deterministically so layout is stable per mount.
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const r1 = hashToUnit(i + 1)
      const r2 = hashToUnit(i + 101)
      const r3 = hashToUnit(i + 211)
      const r4 = hashToUnit(i + 307)
      const r5 = hashToUnit(i + 409)
      const r6 = hashToUnit(i + 521)
      return {
        x: r1 * width,
        y: r2 * height,
        r: 0.6 + r3 * 1.6,
        vx: (r4 - 0.5) * 0.08,
        vy: (r5 - 0.5) * 0.08 - 0.015,
        alpha: 0.08 + r6 * 0.22,
        twinklePhase: r1 * Math.PI * 2,
        twinkleSpeed: 0.3 + r3 * 0.7,
      }
    })

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    let raf = 0
    let last = performance.now()
    let running = true

    const draw = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          p.twinklePhase += p.twinkleSpeed * dt
          if (p.x < -4) p.x = width + 4
          if (p.x > width + 4) p.x = -4
          if (p.y < -4) p.y = height + 4
          if (p.y > height + 4) p.y = -4
        }
        const twinkle = 0.65 + 0.35 * Math.sin(p.twinklePhase)
        const alpha = p.alpha * twinkle
        ctx.beginPath()
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0, `rgba(167, 243, 253, ${alpha})`)
        grad.addColorStop(0.5, `rgba(83, 234, 253, ${alpha * 0.35})`)
        grad.addColorStop(1, 'rgba(83, 234, 253, 0)')
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = `rgba(236, 254, 255, ${alpha * 1.2})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [reduce])

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #053345 0%, #083f54 50%, #104e64 100%)',
      }}
    >
      {/* Soft radial vignette to lift the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0, 211, 242, 0.12) 0%, rgba(8, 51, 68, 0) 55%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Subtle top/bottom fade to frame the constellation */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,51,69,0.55) 0%, rgba(5,51,69,0) 18%, rgba(5,51,69,0) 82%, rgba(5,51,69,0.55) 100%)',
        }}
      />
    </div>
  )
}

export default SpaceBackdrop
