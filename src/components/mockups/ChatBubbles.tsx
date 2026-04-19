import { useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'

export interface ChatBubblesProps {
  isActive: boolean
  /** Delay before conversation starts (seconds). */
  delay?: number
  className?: string
}

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: 0.5,
    },
  }),
}

const bubbleVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

const KORVO_REPLY = 'Вільний термін — завтра о 10:00. Підтверджую?'

function useTypedText(target: string, isActive: boolean, startDelay: number) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!isActive) {
      const resetId = window.setTimeout(() => setText(''), 0)
      return () => window.clearTimeout(resetId)
    }
    let i = 0
    let intervalId: number | undefined
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        setText(target.slice(0, i))
        if (i >= target.length && intervalId !== undefined) {
          window.clearInterval(intervalId)
        }
      }, 35)
    }, startDelay * 1000)
    return () => {
      window.clearTimeout(startId)
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [target, isActive, startDelay])
  return text
}

export function ChatBubbles({ isActive, delay = 0, className }: ChatBubblesProps) {
  // Typing animation only kicks in after Korvo bubble has revealed.
  // stagger: customerBubble at delay+0, korvoBubble at delay+0.5 → typing starts at delay+0.75.
  const typingStart = delay + 0.75
  const typed = useTypedText(KORVO_REPLY, isActive, typingStart)
  const typingDone = typed === KORVO_REPLY

  return (
    <motion.div
      custom={{ delay }}
      variants={container}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`flex flex-col gap-2 ${className ?? ''}`}
    >
      {/* Customer message */}
      <motion.div
        variants={bubbleVariant}
        className="max-w-[22ch] self-start rounded-2xl rounded-bl-sm px-3.5 py-2"
        style={{
          background: 'rgba(240, 244, 248, 0.92)',
          color: '#053345',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(0.72rem, 0.82vw, 0.85rem)',
          lineHeight: 1.35,
          boxShadow: '0 8px 20px -14px rgba(0, 0, 0, 0.5)',
        }}
      >
        Здрастуйте, чи є у вас час завтра подивитися кухню?
      </motion.div>

      {/* Korvo reply */}
      <motion.div
        variants={bubbleVariant}
        className="max-w-[26ch] self-end rounded-2xl rounded-br-sm px-3.5 py-2"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 211, 242, 0.9) 0%, rgba(83, 234, 253, 0.75) 100%)',
          color: '#053345',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(0.72rem, 0.82vw, 0.85rem)',
          lineHeight: 1.35,
          boxShadow: '0 12px 28px -16px rgba(0, 211, 242, 0.65), 0 0 18px -8px rgba(83, 234, 253, 0.8)',
        }}
      >
        <div className="mb-1 flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: '#053345' }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 'clamp(0.55rem, 0.62vw, 0.65rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Korvo AI · 24/7
          </span>
        </div>
        <span>{typed || '\u00A0'}</span>
        {!typingDone && (
          <motion.span
            aria-hidden
            className="ml-0.5 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            style={{ color: '#053345' }}
          >
            ▍
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
