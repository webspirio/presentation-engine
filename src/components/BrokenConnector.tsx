import { motion } from "motion/react";
import { problemConnector } from "@/animations/problemTimeline";

export interface BrokenConnectorProps {
  /** Viewbox coords (SVG uses 0-100 viewBox with preserveAspectRatio="none") */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Dashed cyan stroke between two scatter points. Renders inside a parent
// SVG. The severed ✕ / ? marker is rendered separately as HTML overlay so
// it stays circular under `preserveAspectRatio="none"`.
export function BrokenConnector({ x1, y1, x2, y2 }: BrokenConnectorProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(83, 234, 253, 0.55)"
      strokeWidth={1.5}
      strokeDasharray="5 7"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      variants={problemConnector}
    />
  );
}
