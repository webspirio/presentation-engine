import type { Variants } from "motion/react";
import { easeSmooth } from "./transitions";
import type { NodeId } from "./problemTimeline";

/* -------------------------------------------------------------------------- */
/* Pipeline layout — six nodes in a gentle arc across the slide.              */
/* -------------------------------------------------------------------------- */

export const PIPELINE_ORDER: NodeId[] = [
  "website",
  "crm",
  "erp",
  "automation",
  "ai",
  "analytics",
];

// Viewport-percent coordinates. Slight y-variance gives the pipeline an
// arc rather than a sterile straight line.
export const NODE_PIPELINE: Record<NodeId, { x: number; y: number }> = {
  website: { x: 10, y: 50 },
  crm: { x: 25, y: 44 },
  erp: { x: 40, y: 48 },
  automation: { x: 56, y: 52 },
  ai: { x: 73, y: 46 },
  analytics: { x: 88, y: 50 },
};

/* -------------------------------------------------------------------------- */
/* Timing                                                                     */
/* -------------------------------------------------------------------------- */

export const SOLUTION_TIMING = {
  ghostStart: 0.0,
  headlineStart: 0.2,
  snapStart: 1.1,
  snapStagger: 0.08,
  connectorsStart: 1.9,
  connectorStagger: 0.12,
  packetsStart: 2.7,
  captionStart: 2.9,
} as const;

// Packet ambient cycle (seconds).
export const PACKET_CHARGE_S = 2.4;
export const PACKET_FIRE_S = 0.9;
export const PACKET_REST_S = 0.8;
export const PACKET_STAGGER_S = 0.25;

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const solutionHeadlineWrap: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: SOLUTION_TIMING.headlineStart,
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};

export const solutionCaption: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: SOLUTION_TIMING.captionStart,
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};

export const solutionConnectorsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: SOLUTION_TIMING.connectorsStart,
      staggerChildren: SOLUTION_TIMING.connectorStagger,
    },
  },
};

export const solutionConnector: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};
