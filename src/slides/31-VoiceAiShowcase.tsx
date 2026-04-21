import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Brain, ClipboardList, PhoneCall } from 'lucide-react'
import type { SlideProps } from '@/engine/types'
import { easeSmooth } from '@/animations/transitions'

const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"
const FONT_POPPINS = "'Poppins', sans-serif"

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/video/ai-agent-calling-showcase.mp4`

interface Beat {
  Icon: typeof PhoneCall
  title: string
  sub: string
}

const BEATS: Beat[] = [
  {
    Icon: PhoneCall,
    title: 'Дзвонить самостійно',
    sub: 'Представляється, веде розмову',
  },
  {
    Icon: Brain,
    title: 'Ставить уточнення з контексту',
    sub: 'Сама запитала про вагу песика — без промпту',
  },
  {
    Icon: ClipboardList,
    title: 'Звітує з порівнянням',
    sub: '3 салони · ціни · вільні місця · рекомендація',
  },
]

const headlineMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

const sublineMotion: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth, delay: 0.12 },
  },
}

const videoFrameMotion: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
}

const beatMotion: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

const staticMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export function VoiceAiShowcaseSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (isActive) {
      el.muted = true
      const p = el.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
      el.muted = true
    }
  }, [isActive])

  const headline = reduce ? staticMotion : headlineMotion
  const subline = reduce ? staticMotion : sublineMotion
  const videoFrame = reduce ? staticMotion : videoFrameMotion
  const beat = reduce ? staticMotion : beatMotion

  const handleVideoClick = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6 py-8 md:px-10">
      <div className="grid w-full max-w-[1800px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — video (9:16 portrait) */}
        <motion.div
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          variants={videoFrame}
          className="relative flex w-full justify-center lg:justify-end"
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              border: '1px solid rgba(83,234,253,0.25)',
              boxShadow: '0 12px 48px -12px rgba(0,184,219,0.4)',
              background: '#031f2c',
              aspectRatio: '9 / 16',
              height: 'min(88vh, 900px)',
              maxWidth: '100%',
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              onClick={handleVideoClick}
              aria-label="Демо: AI-агент Ліра дзвонить у грумінг-салони. Автор — Denis Volosov."
              className="block h-full w-full"
              style={{ objectFit: 'cover' }}
            />
            <span
              className="pointer-events-none absolute top-3 right-3 rounded-full px-3 py-1.5 text-cyan-100"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.02em',
                background: 'rgba(5,51,69,0.75)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(83,234,253,0.25)',
              }}
            >
              @volosovdenis
            </span>
          </div>
        </motion.div>

        {/* RIGHT — copy + beats */}
        <div className="flex w-full flex-col gap-6">
          <motion.h2
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            variants={headline}
            className="text-white"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            AI-агент, який{' '}
            <span
              className="text-cyan-400"
              style={{ textShadow: '0 2px 24px rgba(0,211,242,0.35)' }}
            >
              дзвонить сам
            </span>
            .
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            variants={subline}
            className="text-cyan-100/80"
            style={{
              fontFamily: FONT_POPPINS,
              fontWeight: 400,
              fontSize: 'clamp(1.15rem, 1.45vw, 1.45rem)',
              lineHeight: 1.5,
              maxWidth: '34ch',
            }}
          >
            Голосова асистентка обдзвонює три грумінг-салони в Києві — сама.
          </motion.p>

          <ul className="mt-2 flex flex-col gap-4">
            {BEATS.map(({ Icon, title, sub }, i) => {
              const revealed = isActive && fragment >= i + 1
              return (
                <motion.li
                  key={title}
                  initial="hidden"
                  animate={revealed ? 'visible' : 'hidden'}
                  variants={beat}
                  className="flex items-start gap-4"
                >
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(0,211,242,0.1)',
                      border: '1px solid rgba(83,234,253,0.3)',
                    }}
                  >
                    <Icon size={28} strokeWidth={1.75} color="#00d3f2" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="text-white"
                      style={{
                        fontFamily: FONT_POPPINS,
                        fontWeight: 600,
                        fontSize: 'clamp(1.2rem, 1.4vw, 1.4rem)',
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </span>
                    <span
                      className="text-cyan-100/70"
                      style={{
                        fontFamily: FONT_POPPINS,
                        fontWeight: 400,
                        fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                        lineHeight: 1.4,
                      }}
                    >
                      {sub}
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </ul>

          <motion.div
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            variants={subline}
            className="mt-4 flex flex-col gap-2"
          >
            <p
              className="italic text-cyan-100"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 500,
                fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
              }}
            >
              Таких агентів ми теж будуємо — під ваш бізнес.
            </p>
            <p
              className="text-cyan-100/55"
              style={{
                fontFamily: FONT_POPPINS,
                fontWeight: 400,
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                letterSpacing: '0.01em',
              }}
            >
              Демо · Denis Volosov · instagram.com/volosovdenis
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
