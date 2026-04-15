import { useEffect, useRef } from 'react'

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Multiple overlapping radial gradients that move
      const blobs = [
        { x: 0.3 + Math.sin(time * 0.7) * 0.15, y: 0.4 + Math.cos(time * 0.5) * 0.15, r: 0.5, color: 'rgba(6, 182, 212, 0.15)' },
        { x: 0.7 + Math.cos(time * 0.6) * 0.15, y: 0.3 + Math.sin(time * 0.8) * 0.1, r: 0.45, color: 'rgba(34, 211, 238, 0.12)' },
        { x: 0.5 + Math.sin(time * 0.9) * 0.2, y: 0.7 + Math.cos(time * 0.4) * 0.15, r: 0.4, color: 'rgba(103, 232, 249, 0.1)' },
        { x: 0.2 + Math.cos(time * 0.5) * 0.1, y: 0.6 + Math.sin(time * 0.7) * 0.1, r: 0.35, color: 'rgba(8, 145, 178, 0.12)' },
      ]

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(
          blob.x * canvas.width, blob.y * canvas.height, 0,
          blob.x * canvas.width, blob.y * canvas.height, blob.r * Math.max(canvas.width, canvas.height)
        )
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
