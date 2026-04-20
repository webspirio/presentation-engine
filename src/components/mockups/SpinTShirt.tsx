import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

export interface SpinTShirtProps {
  isActive: boolean
  frontSrc: string
  backSrc: string
  /** Alt text describing the shirt (both sides). */
  label?: string
  /** Show the drag hint chip. Default true. */
  showHint?: boolean
  className?: string
}

const HOVER_MAX_Y = 12
const HOVER_MAX_X = 8
const DRAG_Y_GAIN = 0.55
const DRAG_X_GAIN = 0.18
const IDLE_SWAY_DELAY_MS = 1600
const HINT_TIMEOUT_MS = 6000

export function SpinTShirt({
  isActive,
  frontSrc,
  backSrc,
  label = 'Футболка Küchen Fokus · обидва боки',
  showHint = true,
  className,
}: SpinTShirtProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const committedY = useMotionValue(0)
  const committedX = useMotionValue(0)
  const hoverY = useMotionValue(0)
  const hoverX = useMotionValue(0)

  const displayY = useTransform<number, number>(
    [committedY, hoverY] as MotionValue<number>[],
    (latest) => (latest[0] ?? 0) + (latest[1] ?? 0),
  )
  const displayX = useTransform<number, number>(
    [committedX, hoverX] as MotionValue<number>[],
    (latest) => (latest[0] ?? 0) + (latest[1] ?? 0),
  )

  const springY = useSpring(displayY, { stiffness: 70, damping: 20, mass: 1 })
  const springX = useSpring(displayX, { stiffness: 110, damping: 24, mass: 0.7 })

  const draggingRef = useRef(false)
  const velocityBufferRef = useRef<Array<{ dx: number; t: number }>>([])
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleAnimRef = useRef<{ stop: () => void } | null>(null)
  const inertiaAnimRef = useRef<{ stop: () => void } | null>(null)

  const [hintVisible, setHintVisible] = useState(true)

  const cancelIdle = () => {
    idleAnimRef.current?.stop()
    idleAnimRef.current = null
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }

  const scheduleIdle = () => {
    cancelIdle()
    idleTimerRef.current = setTimeout(() => {
      if (draggingRef.current) return
      const base = committedY.get()
      idleAnimRef.current = animate(committedY, [base, base + 4, base - 4, base], {
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
      })
    }, IDLE_SWAY_DELAY_MS)
  }

  useEffect(() => {
    if (!isActive) {
      cancelIdle()
      inertiaAnimRef.current?.stop()
      committedY.set(0)
      committedX.set(0)
      hoverY.set(0)
      hoverX.set(0)
      setHintVisible(true)
      return
    }
    scheduleIdle()
    const hintTimer = setTimeout(() => setHintVisible(false), HINT_TIMEOUT_MS)
    return () => {
      clearTimeout(hintTimer)
      cancelIdle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    if (draggingRef.current) {
      cancelIdle()
      const { movementX, movementY } = event
      committedY.set(committedY.get() + movementX * DRAG_Y_GAIN)
      committedX.set(
        clamp(committedX.get() + movementY * DRAG_X_GAIN, -22, 22),
      )
      velocityBufferRef.current.push({ dx: movementX, t: performance.now() })
      const cutoff = performance.now() - 80
      velocityBufferRef.current = velocityBufferRef.current.filter(
        (s) => s.t >= cutoff,
      )
      return
    }

    const rect = container.getBoundingClientRect()
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
    hoverY.set(clamp(nx, -1, 1) * HOVER_MAX_Y)
    hoverX.set(clamp(-ny, -1, 1) * HOVER_MAX_X)
    scheduleIdle()
  }

  const handlePointerLeave = () => {
    if (draggingRef.current) return
    hoverY.set(0)
    hoverX.set(0)
    scheduleIdle()
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    draggingRef.current = true
    cancelIdle()
    inertiaAnimRef.current?.stop()
    committedY.set(committedY.get() + hoverY.get())
    committedX.set(committedX.get() + hoverX.get())
    hoverY.set(0)
    hoverX.set(0)
    velocityBufferRef.current = []
    setHintVisible(false)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      /* already released */
    }

    const samples = velocityBufferRef.current
    let velDeg = 0
    if (samples.length >= 2) {
      const first = samples[0]
      const last = samples[samples.length - 1]
      const dtMs = Math.max(last.t - first.t, 8)
      const totalDx = samples.reduce((sum, s) => sum + s.dx, 0)
      const pxPerMs = totalDx / dtMs
      velDeg = pxPerMs * DRAG_Y_GAIN * 1000
    }
    velocityBufferRef.current = []

    if (Math.abs(velDeg) > 20) {
      inertiaAnimRef.current = animate(committedY, committedY.get(), {
        type: 'inertia',
        velocity: velDeg,
        power: 0.7,
        timeConstant: 480,
        restDelta: 0.5,
      })
    }
    animate(committedX, 0, { type: 'spring', stiffness: 80, damping: 18 })
    scheduleIdle()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      animate(committedY, committedY.get() - 30, { type: 'spring', stiffness: 120, damping: 18 })
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      animate(committedY, committedY.get() + 30, { type: 'spring', stiffness: 120, damping: 18 })
    } else if (event.key === ' ') {
      event.preventDefault()
      animate(committedY, committedY.get() + 180, { type: 'spring', stiffness: 90, damping: 16 })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className ?? ''}`}
      style={{ perspective: '1800px' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        role="img"
        aria-label={label}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={
          isActive
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.92 }
        }
        transition={{ type: 'spring', stiffness: 140, damping: 18, mass: 0.9, delay: 0.2 }}
        style={{
          height: 'clamp(280px, 62vh, 680px)',
          aspectRatio: '0.78',
          transformStyle: 'preserve-3d',
          rotateX: springX,
          rotateY: springY,
          cursor: 'grab',
          outline: 'none',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <ShirtFace src={frontSrc} />
        <ShirtFace src={backSrc} back />
      </motion.div>

      {showHint && <HintChip visible={hintVisible && isActive} />}
    </div>
  )
}

function ShirtFace({ src, back }: { src: string; back?: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          display: 'block',
          filter: 'drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45))',
        }}
      />
    </div>
  )
}

function HintChip({ visible }: { visible: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.4, delay: visible ? 0.6 : 0 }}
      style={{
        position: 'absolute',
        bottom: '-8%',
        padding: '6px 14px',
        borderRadius: 999,
        background: 'rgba(5, 51, 69, 0.55)',
        border: '1px solid rgba(83, 234, 253, 0.35)',
        backdropFilter: 'blur(10px)',
        color: '#F0F4F8',
        fontFamily: "'Poppins', sans-serif",
        fontSize: 'clamp(0.72rem, 0.85vw, 0.85rem)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      Тягни, щоб розгорнути
    </motion.div>
  )
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}
