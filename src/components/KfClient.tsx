import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'
import kfClientUrl from '@/assets/kf/kf-client.svg'

export interface KfClientProps {
  isActive: boolean
  opacity?: number
  delay?: number
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (custom: { opacity: number; delay: number }) => ({
    opacity: custom.opacity,
    y: 0,
    transition: { duration: 0.85, ease: easeSmooth, delay: custom.delay },
  }),
}

export function KfClient({
  isActive,
  opacity = 0.85,
  delay = 0,
  className,
}: KfClientProps) {
  return (
    <motion.img
      aria-hidden
      src={kfClientUrl}
      alt=""
      custom={{ opacity, delay }}
      variants={variants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={className}
      draggable={false}
    />
  )
}
