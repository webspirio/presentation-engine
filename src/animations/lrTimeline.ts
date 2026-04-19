import type { Variants } from 'motion/react'
import { easeSmooth } from './transitions'

// Shared variants for the LR Health & Beauty case (Act 3Б, slides 22-27).
// Kept in one file so the whole case shares a coherent motion language —
// every slide opens with the same eyebrow/title choreography, same reveal
// rhythm for stats and pill groups, same leak-line cadence.

export const lrEyebrow: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const lrTitle: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeSmooth, delay: 0.15 },
  },
}

export const lrSubtitle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSmooth, delay: 0.35 },
  },
}

export const lrStatReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeSmooth },
  },
}

export const lrPillGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
}

export const lrPill: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const lrLeakLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
}

// Vision slide (24): 4 step cards + arrow connectors + outcome badge.
// stepContainer staggers its card children; connectors fade in a beat later
// so the arrows appear to "draw" between existing cards.

export const lrStepContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

export const lrStepCard: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

export const lrStepConnector: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 0.6,
    scale: 1,
    transition: { duration: 0.45, ease: easeSmooth, delay: 0.75 },
  },
}

export const lrBadge: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSmooth },
  },
}

// Architecture slide (25): three horizontal layer bands appear together,
// but the chips inside each band reveal one layer at a time.

export const lrLayerBand: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const lrChipGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const lrChip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeSmooth },
  },
}

// Funnel slide (26): per-node/per-edge entry variants live inside
// LrFunnelFlow itself — they take a custom `delay` so the component can
// compose node stagger and edge stagger independently (nodes on isActive,
// edges on pathRevealed).

// Pulse ring on the final "Консультація" node — starts when resultActive flips.
export const lrFunnelPulseRing: Variants = {
  idle: { scale: 1, opacity: 0 },
  pulse: {
    scale: [1, 1.4, 1.6],
    opacity: [0.75, 0.35, 0],
    transition: {
      duration: 1.8,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.2,
    },
  },
}
