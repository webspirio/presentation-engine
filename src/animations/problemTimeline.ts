import type { Variants } from "motion/react";
import { easeSmooth } from "./transitions";

/* -------------------------------------------------------------------------- */
/* Canonical pipeline nodes — shared between Slide 2 (scattered) and Slide 3  */
/* (reassembled). Positions are % of the slide viewport so both slides read   */
/* from the same coordinate system.                                           */
/* -------------------------------------------------------------------------- */

export const NODE_IDS = [
  "website",
  "crm",
  "erp",
  "automation",
  "ai",
  "analytics",
] as const;

export type NodeId = (typeof NODE_IDS)[number];

export const NODE_LABELS: Record<NodeId, string> = {
  website: "Вебсайт",
  crm: "CRM",
  erp: "ERP",
  automation: "Автоматизація",
  ai: "AI",
  analytics: "Аналітика",
};

// Plain-Ukrainian annotations shown under each node on slides 3–4 so the
// non-technical audience can read the pipeline without knowing CRM / ERP / AI
// as acronyms. Semi-tech attendees still see the real terms on the top line.
export const NODE_SUBLABELS: Record<NodeId, string> = {
  website: "вебсайт",
  crm: "клієнти",
  erp: "облік, рахунки, склад",
  automation: "без ручної роботи",
  ai: "AI-помічник",
  analytics: "звіти",
};

// Viewport-percent coordinates for each node's centre while on Slide 2.
// Intentionally asymmetric, visually fractured. Slide 3 imports these as
// the starting positions for the spring-snap into the pipeline.
export const NODE_SCATTER: Record<NodeId, { x: number; y: number }> = {
  website: { x: 18, y: 38 },
  crm: { x: 64, y: 30 },
  erp: { x: 14, y: 62 },
  automation: { x: 42, y: 56 },
  ai: { x: 78, y: 52 },
  analytics: { x: 50, y: 78 },
};

// Broken "connections that should be there" — where a dashed stroke runs
// between two nodes with a marker (✕ for a severed link, ? for an unknown one).
export interface BrokenLink {
  from: NodeId;
  to: NodeId;
  marker: "cross" | "question";
}

export const BROKEN_LINKS: BrokenLink[] = [
  { from: "website", to: "crm", marker: "cross" },
  { from: "crm", to: "ai", marker: "cross" },
  { from: "erp", to: "automation", marker: "question" },
  { from: "automation", to: "ai", marker: "cross" },
  { from: "automation", to: "analytics", marker: "question" },
];

/* -------------------------------------------------------------------------- */
/* Timing                                                                     */
/* -------------------------------------------------------------------------- */

export const PROBLEM_TIMING = {
  headlineStart: 0.1,
  nodesStart: 0.6,
  nodeStagger: 0.09,
  connectorsStart: 1.1,
  connectorStagger: 0.1,
  painPointsStart: 1.8,
  painStagger: 0.2,
} as const;

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const problemHeadline: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: PROBLEM_TIMING.headlineStart,
      duration: 0.7,
      ease: easeSmooth,
    },
  },
};

export const problemNodesContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: PROBLEM_TIMING.nodesStart,
      staggerChildren: PROBLEM_TIMING.nodeStagger,
    },
  },
};

export const problemNode: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeSmooth },
  },
};

export const problemConnectorsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: PROBLEM_TIMING.connectorsStart,
      staggerChildren: PROBLEM_TIMING.connectorStagger,
    },
  },
};

export const problemConnector: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 0.3,
    pathLength: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

export const problemMarker: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4,
    },
  },
};

export const painContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: PROBLEM_TIMING.painPointsStart,
      staggerChildren: PROBLEM_TIMING.painStagger,
    },
  },
};

export const painItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};
