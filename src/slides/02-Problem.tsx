import { motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Building2,
  Globe,
  Sparkles,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { SlideProps } from "@/engine/types";
import { PipelineNode } from "@/components/PipelineNode";
import { BrokenConnector } from "@/components/BrokenConnector";
import {
  BROKEN_LINKS,
  NODE_IDS,
  NODE_LABELS,
  NODE_SCATTER,
  NODE_SUBLABELS,
  painContainer,
  painItem,
  problemConnectorsContainer,
  problemHeadline,
  problemNode,
  problemNodesContainer,
  type NodeId,
} from "@/animations/problemTimeline";

const NODE_ICONS: Record<NodeId, LucideIcon> = {
  website: Globe,
  crm: UsersRound,
  erp: Building2,
  automation: Workflow,
  ai: Sparkles,
  analytics: BarChart3,
};

interface Pain {
  metric: string;
  subject: string;
}

const PAINS: Pain[] = [
  { metric: "2 години / день", subject: "збирання звітів вручну" },
  { metric: "5 систем", subject: "які не говорять одна з одною" },
  { metric: "14 днів", subject: "щоб ввести нового співробітника" },
];

// Deterministic jitter phase per node (no randomness — must be stable between renders).
const JITTER = [0.0, 0.55, 1.1, 1.8, 2.3, 2.9];

export function ProblemSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false;
  const stage = (threshold: number) =>
    (isActive && fragment >= threshold) ||
    (reduce && isActive && fragment >= threshold)
      ? "visible"
      : "hidden";

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative z-10 flex h-full w-full flex-col px-12 py-12 sm:px-16 sm:py-14">
        {/* Headline (fragment ≥ 1) */}
        <motion.h2
          variants={problemHeadline}
          initial="hidden"
          animate={stage(1)}
          className="max-w-[28ch] text-balance text-[#F0F4F8]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 3.4vw, 3.3rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Більшість малих бізнесів так і працюють —
          <br className="hidden sm:block" /> купа інструментів, які
          <span className="text-cyan-300"> не говорять</span> один з одним.
        </motion.h2>

        {/* Node stage (fragment ≥ 2) — fills middle band */}
        <div className="relative mt-8 flex-1">
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            variants={problemConnectorsContainer}
            initial="hidden"
            animate={stage(2)}
            aria-hidden
          >
            {BROKEN_LINKS.map((link) => {
              const a = NODE_SCATTER[link.from];
              const b = NODE_SCATTER[link.to];
              return (
                <BrokenConnector
                  key={`${link.from}-${link.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                />
              );
            })}
          </motion.svg>

          {/* Markers at connector midpoints — HTML so circles stay round */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={problemConnectorsContainer}
            initial="hidden"
            animate={stage(2)}
            aria-hidden
          >
            {BROKEN_LINKS.map((link) => {
              const a = NODE_SCATTER[link.from];
              const b = NODE_SCATTER[link.to];
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              return (
                <motion.div
                  key={`marker-${link.from}-${link.to}`}
                  className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-base font-semibold"
                  style={{
                    left: `${mx}%`,
                    top: `${my}%`,
                    backgroundColor: "rgba(5, 51, 69, 0.9)",
                    borderColor: "rgba(83, 234, 253, 0.35)",
                    color:
                      link.marker === "cross"
                        ? "rgba(248, 113, 113, 0.95)"
                        : "rgba(253, 224, 71, 0.95)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.4 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    },
                  }}
                >
                  {link.marker === "cross" ? "✕" : "?"}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Nodes as HTML, positioned in % */}
          <motion.div
            className="absolute inset-0"
            variants={problemNodesContainer}
            initial="hidden"
            animate={stage(2)}
          >
            {NODE_IDS.map((id, i) => {
              const pos = NODE_SCATTER[id];
              const Icon = NODE_ICONS[id];
              return (
                <div
                  key={id}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div variants={problemNode}>
                    <motion.div
                      animate={
                        isActive && fragment >= 2 && !reduce
                          ? { x: [0, 3, -2, 0], y: [0, -4, 2, 0] }
                          : { x: 0, y: 0 }
                      }
                      transition={{
                        duration: 5 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2 + JITTER[i],
                      }}
                    >
                      <PipelineNode
                        label={NODE_LABELS[id]}
                        sublabel={NODE_SUBLABELS[id]}
                        Icon={Icon}
                        state="fractured"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Pain points (fragment ≥ 3) */}
        <motion.ul
          className="mt-8 flex flex-col gap-3 sm:mt-10"
          variants={painContainer}
          initial="hidden"
          animate={stage(3)}
        >
          {PAINS.map((pain) => (
            <motion.li
              key={pain.metric}
              variants={painItem}
              className="flex items-center gap-4 text-[#F0F4F8]"
            >
              <span aria-hidden className="h-px w-12 shrink-0 bg-cyan-400/45" />
              <span
                className="min-w-[11rem] text-cyan-300/95"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.25rem, 1.6vw, 1.45rem)",
                  letterSpacing: "0.005em",
                }}
              >
                {pain.metric}
              </span>
              <span
                className="text-[#F0F4F8]/80"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.2rem, 1.4vw, 1.3rem)",
                }}
              >
                {pain.subject}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
