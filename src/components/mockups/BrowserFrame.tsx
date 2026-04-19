import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'

export interface BrowserFrameProps {
  isActive: boolean
  url: string
  children?: ReactNode
  /** Delay before entry (seconds). */
  delay?: number
  /** Show the green domain-check tick next to the URL (after domain-booking fragment). */
  showCheck?: boolean
  /** When provided, animates a cursor that moves to the address bar and lands on the check. */
  showCursor?: boolean
  className?: string
}

const frameVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeSmooth,
      delay: custom.delay,
      when: 'beforeChildren',
    },
  }),
}

const checkVariant: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: [0.4, 1.25, 1],
    transition: { duration: 0.55, ease: easeSmooth, delay: 0.45 },
  },
}

const cursorVariant: Variants = {
  hidden: { opacity: 0, x: 80, y: 40 },
  visible: {
    opacity: [0, 1, 1, 0],
    x: [80, -10, -10, -20],
    y: [40, 0, 0, -4],
    transition: { duration: 1.4, ease: easeSmooth, times: [0, 0.35, 0.8, 1], delay: 0.1 },
  },
}

export function BrowserFrame({
  isActive,
  url,
  children,
  delay = 0,
  showCheck = false,
  showCursor = false,
  className,
}: BrowserFrameProps) {
  return (
    <motion.div
      custom={{ delay }}
      variants={frameVariant}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`overflow-hidden rounded-xl ${className ?? ''}`}
      style={{
        background: 'rgba(5, 51, 69, 0.75)',
        border: '1px solid rgba(83, 234, 253, 0.25)',
        boxShadow: '0 24px 60px -30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{
          borderBottom: '1px solid rgba(83, 234, 253, 0.15)',
          background: 'rgba(5, 51, 69, 0.85)',
        }}
      >
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff6b6b' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ffbf4d' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#53eafd' }} />
        </div>
        <div
          className="relative flex min-w-0 flex-1 items-center gap-2 rounded-md px-3 py-1.5"
          style={{
            background: 'rgba(8, 51, 68, 0.6)',
            border: '1px solid rgba(83, 234, 253, 0.2)',
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: showCheck ? '#53eafd' : 'rgba(83, 234, 253, 0.4)' }}
          />
          <span
            className="truncate text-[#F0F4F8]/90"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: 'clamp(0.75rem, 0.85vw, 0.85rem)',
              letterSpacing: '0.01em',
            }}
          >
            {url}
          </span>
          {showCheck && (
            <motion.span
              variants={checkVariant}
              aria-hidden
              className="ml-auto inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{ background: '#10b981' }}
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                <path d="M3 6.5 L5 8.5 L9 4" stroke="#F0F4F8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
          {showCursor && (
            <motion.span
              aria-hidden
              variants={cursorVariant}
              className="pointer-events-none absolute right-3 top-1"
            >
              <svg viewBox="0 0 16 20" className="h-5 w-4" fill="none">
                <path d="M1 1 L14 10 L8 11 L11 18 L9 19 L6 12 L1 15 Z" fill="#F0F4F8" stroke="#053345" strokeWidth="0.8" />
              </svg>
            </motion.span>
          )}
        </div>
      </div>

      {/* content well */}
      <div className="relative" style={{ background: 'rgba(5, 51, 69, 0.9)' }}>
        {children}
      </div>
    </motion.div>
  )
}
