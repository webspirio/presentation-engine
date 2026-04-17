import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import {
  PACKET_CHARGE_S,
  PACKET_FIRE_S,
  PACKET_REST_S,
} from "@/animations/solutionTimeline";

export interface PipelineConnectorProps {
  /** SVG user-unit start X */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** When true, packets animate continuously along the connector */
  packets: boolean;
  /** Stagger offset so adjacent connectors don't fire simultaneously */
  packetOffset?: number;
  reduce?: boolean;
}

// Draws a glowing cyan path between two points, plus an optional repeating
// packet that travels from (x1,y1) to (x2,y2). Mirrors the packet pattern
// in src/slides/21-ServicesConstellation.tsx (ambient charge → fire → rest).
export function PipelineConnector({
  x1,
  y1,
  x2,
  y2,
  packets,
  packetOffset = 0,
  reduce = false,
}: PipelineConnectorProps) {
  return (
    <g>
      {/* Base path — stroke draws in via pathLength variant on parent */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#pipeline-stroke)"
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 4px rgba(83, 234, 253, 0.55))",
        }}
      />
      {packets && !reduce ? (
        <Packet x1={x1} y1={y1} x2={x2} y2={y2} offsetSeconds={packetOffset} />
      ) : null}
    </g>
  );
}

function Packet({
  x1,
  y1,
  x2,
  y2,
  offsetSeconds,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offsetSeconds: number;
}) {
  const t = useMotionValue(0);

  const cx = useTransform(t, (v) => x1 + (x2 - x1) * v);
  const cy = useTransform(t, (v) => y1 + (y2 - y1) * v);
  const opacity = useTransform(t, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (offsetSeconds > 0) {
        await new Promise<void>((r) => {
          setTimeout(r, offsetSeconds * 1000);
        });
      }
      while (!cancelled) {
        t.set(0);
        // charge: tiny easing-in of the origin dot (handled by opacity ramp)
        await new Promise<void>((r) => {
          setTimeout(r, PACKET_CHARGE_S * 1000);
        });
        if (cancelled) return;
        await animate(t, 1, {
          duration: PACKET_FIRE_S,
          ease: [0.22, 1, 0.36, 1],
        });
        if (cancelled) return;
        await new Promise<void>((r) => {
          setTimeout(r, PACKET_REST_S * 1000);
        });
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [t, offsetSeconds]);

  return (
    <motion.circle
      r={5}
      cx={cx}
      cy={cy}
      fill="#a2f4fd"
      opacity={opacity}
      style={{
        filter: "drop-shadow(0 0 8px rgba(0, 211, 242, 0.95))",
      }}
    />
  );
}
