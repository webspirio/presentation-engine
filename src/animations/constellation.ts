import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

// Timing aligned with spec (seconds):
// 1.8 rays draw, 2.4 node dots scale-in, 2.7 labels reveal.
// Stagger 0.07s across 10 nodes (~0.63s tail).

const RAY_STAGGER = 0.07
const NODE_STAGGER = 0.07
const LABEL_STAGGER = 0.07

export const constellationContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
}

export const rayDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: 1.8 + i * RAY_STAGGER,
        duration: 0.6,
        ease: easeSmooth,
      },
      opacity: {
        delay: 1.8 + i * RAY_STAGGER,
        duration: 0.3,
        ease: easeSmooth,
      },
    },
  }),
}

export const nodeDot: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 2.4 + i * NODE_STAGGER,
      duration: 0.45,
      ease: easeSmooth,
    },
  }),
}

export const labelReveal: Variants = {
  hidden: (direction: { dx: number; dy: number }) => ({
    opacity: 0,
    x: -direction.dx * 8,
    y: -direction.dy * 8,
  }),
  visible: (args: { dx: number; dy: number; index: number }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 2.7 + args.index * LABEL_STAGGER,
      duration: 0.55,
      ease: easeSmooth,
    },
  }),
}

// Per-node drift: infinite wobble ±4px, phase offset per node.
export const nodeDrift = (args: {
  dx: number
  dy: number
  duration: number
  phase: number
}): Variants => ({
  hidden: { x: 0, y: 0 },
  visible: {
    x: [0, args.dx, 0, -args.dx * 0.6, 0],
    y: [0, args.dy, 0, -args.dy * 0.6, 0],
    transition: {
      delay: 4.0 + args.phase,
      duration: args.duration,
      ease: easeSmooth,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
})

export const packetTravel: Variants = {
  hidden: { opacity: 0, offsetDistance: '0%' },
  visible: {
    opacity: [0, 1, 1, 0],
    offsetDistance: ['0%', '100%'],
    transition: {
      duration: 1.2,
      times: [0, 0.15, 0.85, 1],
      ease: easeSmooth,
    },
  },
}
