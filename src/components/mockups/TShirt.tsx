import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'
import shirtBackUrl from '@/assets/kf/t-shirt-back-transparent.png'
import shirtFrontUrl from '@/assets/kf/t-shirt-front-transparent.png'

export interface TShirtProps {
  isActive: boolean
  delay?: number
  /** Size of the tee in relative units. */
  scale?: number
  /** Which side of the polo to show. Default 'back' — carries the wordmark + URL story. */
  view?: 'front' | 'back'
  className?: string
}

const shirtVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: easeSmooth, delay: custom.delay },
  }),
}

export function TShirt({
  isActive,
  delay = 0,
  scale = 1,
  view = 'back',
  className,
}: TShirtProps) {
  const width = `calc(${scale} * clamp(180px, 18vw, 260px))`
  const src = view === 'front' ? shirtFrontUrl : shirtBackUrl

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      custom={{ delay }}
      variants={shirtVariant}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={`h-auto select-none ${className ?? ''}`}
      style={{
        width,
        filter: 'drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45))',
      }}
    />
  )
}
