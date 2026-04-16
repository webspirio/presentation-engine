import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

// Parent container for the constellation reveal. Children (rays, stars,
// labels) stagger based on this parent's orchestration. delayChildren
// is tuned to land rays/stars just after the intro charge aura peaks
// and begins its burst — matches INTRO_REVEAL_DELAY_S in the slide.
export const constellationReveal: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 2.2,
      staggerChildren: 0.06,
    },
  },
}

// Rays grow outward when their star is about to pop in.
export const rayGrow: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: easeSmooth },
      opacity: { duration: 0.3, ease: easeSmooth },
    },
  },
}

// Stars pop in after the ray grows.
export const starPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.4,
      ease: easeSmooth,
    },
  },
}

// Labels fade in 0.2s after each star.
export const labelFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.4,
      ease: easeSmooth,
    },
  },
}

// Orbit rings — counter-rotating.
export const orbitClockwise = {
  animate: {
    rotate: 360,
    transition: { duration: 90, repeat: Infinity, ease: 'linear' as const },
  },
}

export const orbitCounter = {
  animate: {
    rotate: -360,
    transition: { duration: 60, repeat: Infinity, ease: 'linear' as const },
  },
}

// Reduced-motion fallbacks — instant.
export const rayDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.01 },
  },
}

export const nodeDot: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.01 },
  },
}

export const labelReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
}
