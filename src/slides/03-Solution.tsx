import { useEffect, useRef } from "react";
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
import { PipelineConnector } from "@/components/PipelineConnector";
import BlurHighlight, {
  type BlurHighlightRef,
} from "@/components/react-bits/blur-highlight";
import {
  NODE_LABELS,
  NODE_SCATTER,
  NODE_SUBLABELS,
  type NodeId,
} from "@/animations/problemTimeline";
import {
  NODE_PIPELINE,
  PIPELINE_ORDER,
  SOLUTION_TIMING,
  solutionCaption,
  solutionConnector,
  solutionConnectorsContainer,
  solutionHeadlineWrap,
} from "@/animations/solutionTimeline";
import { springGentle } from "@/animations/transitions";

const NODE_ICONS: Record<NodeId, LucideIcon> = {
  website: Globe,
  crm: UsersRound,
  erp: Building2,
  automation: Workflow,
  ai: Sparkles,
  analytics: BarChart3,
};

export function SolutionSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false;
  const blurRef = useRef<BlurHighlightRef>(null);

  // State gates
  const headlineActive = isActive && fragment >= 1;
  const snapActive = isActive && fragment >= 2;
  const connectorsActive = isActive && fragment >= 3;
  const packetsActive = isActive && fragment >= 4;

  // BlurHighlight's built-in useInView uses a -20% margin that excludes
  // elements near the top of the viewport. Drive it imperatively instead.
  useEffect(() => {
    if (headlineActive) {
      blurRef.current?.trigger();
    } else {
      blurRef.current?.reset();
    }
  }, [headlineActive]);

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative z-10 flex h-full w-full flex-col px-12 py-14 sm:px-16 sm:py-16">
        {/* Headline (fragment ≥ 1) */}
        <motion.div
          variants={solutionHeadlineWrap}
          initial="hidden"
          animate={
            headlineActive || (reduce && isActive) ? "visible" : "hidden"
          }
          className="text-center"
        >
          <BlurHighlight
            ref={blurRef}
            highlightedBits={["ланцюг"]}
            highlightColor="rgba(0, 211, 242, 0.35)"
            highlightClassName="text-cyan-200"
            blurAmount={12}
            blurDuration={0.7}
            blurDelay={0}
            highlightDelay={0.3}
            highlightDuration={0.9}
            highlightDirection="left"
            inactiveOpacity={0}
            viewportOptions={{ once: false, amount: 0 }}
            className="mx-auto max-w-[40ch] text-balance text-[#F0F4F8]"
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 4.2vw, 4.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Можна інакше. Один ланцюг — від першого контакту до повторного
              клієнта.
            </span>
          </BlurHighlight>
        </motion.div>

        {/* Pipeline stage — nodes + connectors */}
        <div className="relative mt-10 flex-1">
          {/* Connectors SVG (fragment ≥ 3) */}
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            variants={solutionConnectorsContainer}
            initial="hidden"
            animate={
              connectorsActive || (reduce && isActive) ? "visible" : "hidden"
            }
            aria-hidden
          >
            <defs>
              <linearGradient id="pipeline-stroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#53eafd" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#00d3f2" stopOpacity="1" />
                <stop offset="100%" stopColor="#53eafd" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {PIPELINE_ORDER.slice(0, -1).map((fromId, i) => {
              const toId = PIPELINE_ORDER[i + 1];
              const a = NODE_PIPELINE[fromId];
              const b = NODE_PIPELINE[toId];
              return (
                <motion.g
                  key={`${fromId}-${toId}`}
                  variants={solutionConnector}
                  style={{ originX: `${a.x}%`, originY: `${a.y}%` }}
                >
                  <PipelineConnector
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    packets={packetsActive}
                    packetOffset={i * 0.35}
                    reduce={reduce}
                  />
                </motion.g>
              );
            })}
          </motion.svg>

          {/* Nodes — ghost at scatter, spring-snap to pipeline */}
          {PIPELINE_ORDER.map((id, i) => {
            const scatter = NODE_SCATTER[id];
            const target = NODE_PIPELINE[id];
            const Icon = NODE_ICONS[id];
            const pos = snapActive ? target : scatter;

            return (
              <motion.div
                key={id}
                className="absolute"
                animate={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  opacity: snapActive || headlineActive ? 1 : 0.45,
                }}
                initial={{
                  left: `${scatter.x}%`,
                  top: `${scatter.y}%`,
                  opacity: 0.45,
                }}
                transition={
                  snapActive
                    ? {
                        ...springGentle,
                        delay:
                          SOLUTION_TIMING.snapStart +
                          i * SOLUTION_TIMING.snapStagger,
                      }
                    : { duration: 0.4 }
                }
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <PipelineNode
                  label={NODE_LABELS[id]}
                  sublabel={NODE_SUBLABELS[id]}
                  Icon={Icon}
                  state={snapActive ? "connected" : "fractured"}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Caption (fragment ≥ 4) */}
        <motion.p
          variants={solutionCaption}
          initial="hidden"
          animate={packetsActive || (reduce && isActive) ? "visible" : "hidden"}
          className="mt-8 text-balance text-center text-cyan-200/85"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1.2rem, 1.5vw, 1.4rem)",
            letterSpacing: "0.005em",
            lineHeight: 1.5,
          }}
        >
          Клієнт побачив → зайшов → записався → отримав нагадування → заплатив →
          повернувся.
        </motion.p>
      </div>
    </section>
  );
}
