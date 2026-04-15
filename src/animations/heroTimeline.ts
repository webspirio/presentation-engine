import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

export const HERO_TIMING = {
  sketchStart: 0.3,
  fillStart: 1.1,
  glowStart: 1.6,
  taglineStart: 2.3,
  captionStart: 3.0,
} as const

export const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: [0, 0.5, 0.2, 0.28, 0.2, 0.28, 0.2],
    scale: [0.8, 1.2, 1, 1.02, 1, 1.02, 1],
    transition: {
      delay: HERO_TIMING.glowStart,
      duration: 6,
      times: [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1],
      ease: easeSmooth,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export const levitate: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -4, 0, 3, 0],
    transition: {
      delay: HERO_TIMING.fillStart + 1.2,
      duration: 7,
      ease: easeSmooth,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

export const taglineWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

export const taglineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: HERO_TIMING.taglineStart,
      staggerChildren: 0.08,
    },
  },
}

export const captionReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: HERO_TIMING.captionStart,
      duration: 0.6,
      ease: easeSmooth,
    },
  },
}
