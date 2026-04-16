import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PresenterOverlayProps {
  show: boolean
  showTimer: boolean
  label: string
  title?: string
  notes?: string
}

export function PresenterOverlay({
  show,
  showTimer,
  label,
  title,
  notes,
}: PresenterOverlayProps) {
  const [elapsed, setElapsed] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (!showTimer) return
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [showTimer])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (!show && !showTimer) return null

  return (
    <>
      <AnimatePresence>
        {showTimer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-20 z-50 rounded-lg bg-cyan-950/80 px-4 py-2 font-mono text-sm text-cyan-300 backdrop-blur-sm"
          >
            {formatTime(elapsed)}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 z-50 w-full border-t border-cyan-800/50 bg-cyan-950/90 p-6 backdrop-blur-md"
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-500">
                  {label}
                </span>
                {title ? (
                  <span className="text-sm font-medium text-cyan-100">
                    {title}
                  </span>
                ) : null}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-cyan-100/90">
                {notes || 'No notes for this slide.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
