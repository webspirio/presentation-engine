import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

export const stageQuestion: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeSmooth, delay: 0.15 },
  },
}

export const stageLeak: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth, delay: 0.1 },
  },
}

export const caseCardEnter: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 160,
      damping: 22,
      mass: 0.9,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

export const caseCardChildren: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

export const progressDot: Variants = {
  hidden: { opacity: 0.4, scale: 1 },
  visible: {
    opacity: 1,
    scale: [1, 1.18, 1],
    transition: { duration: 0.8, ease: easeSmooth },
  },
}
