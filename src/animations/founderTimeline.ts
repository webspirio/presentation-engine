import type { Variants } from "motion/react";
import { easeSmooth } from "./transitions";

export const FOUNDER_TIMING = {
  photoStart: 0.1,
  nameStart: 0.5,
  nameStagger: 0.1,
  statsStart: 1.0,
  statStagger: 0.15,
  bioStart: 1.9,
  countUpDuration: 1.2,
} as const;

export const founderPhoto: Variants = {
  hidden: { opacity: 0, x: -60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: FOUNDER_TIMING.photoStart,
      duration: 0.7,
      ease: easeSmooth,
    },
  },
};

export const founderNameContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: FOUNDER_TIMING.nameStart,
      staggerChildren: FOUNDER_TIMING.nameStagger,
    },
  },
};

export const founderNameLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const founderStatsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: FOUNDER_TIMING.statsStart,
      staggerChildren: FOUNDER_TIMING.statStagger,
    },
  },
};

export const founderStatCard: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

export const founderBio: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: FOUNDER_TIMING.bioStart,
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};
