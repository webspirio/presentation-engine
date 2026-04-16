import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

export const DIVIDER_TIMING = {
  eyebrowStart: 0.05,
  titleStart: 0.3,
  ruleStart: 0.85,
  captionStart: 1.15,
} as const

export const eyebrowReveal: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: DIVIDER_TIMING.eyebrowStart,
      duration: 0.5,
      ease: easeSmooth,
    },
  },
}

export const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: DIVIDER_TIMING.titleStart,
      staggerChildren: 0.06,
    },
  },
}

export const titleWord: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeSmooth },
  },
}

export const ruleDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: DIVIDER_TIMING.ruleStart,
      duration: 0.7,
      ease: easeSmooth,
    },
  },
}

export const captionReveal: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: DIVIDER_TIMING.captionStart,
      duration: 0.55,
      ease: easeSmooth,
    },
  },
}
