import { useMemo } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Briefcase, Code2, Globe2, MapPin, MessagesSquare } from "lucide-react";
import type { SlideProps } from "@/engine/types";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  FOUNDER_TIMING,
  founderBio,
  founderNameContainer,
  founderNameLine,
  founderPhoto,
  founderStatCard,
  founderStatsContainer,
} from "@/animations/founderTimeline";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  Icon: typeof Briefcase;
}

// Placeholder stat values — flagged in the plan for founder confirmation
// before shipping. Easy to tune here once real numbers are provided.
const STATS: Stat[] = [
  { target: 10, suffix: "+", label: "РОКІВ У РОЗРОБЦІ", Icon: Code2 },
  { target: 50, suffix: "+", label: "ПРОЄКТІВ ЗДАНО", Icon: Briefcase },
  { target: 6, suffix: "", label: "КРАЇН-КЛІЄНТІВ", Icon: Globe2 },
  { target: 4, suffix: "", label: "МОВИ ПРОЄКТІВ", Icon: MessagesSquare },
];

export function FounderSlide({ isActive, fragment }: SlideProps) {
  const reduce = useReducedMotion() ?? false;

  const photoState =
    (isActive && fragment >= 1) || (reduce && isActive) ? "visible" : "hidden";
  const nameState =
    (isActive && fragment >= 2) || (reduce && isActive) ? "visible" : "hidden";
  const statsState =
    (isActive && fragment >= 3) || (reduce && isActive) ? "visible" : "hidden";

  const statCountersActive = isActive && fragment >= 3;

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative z-10 flex h-full w-full items-center px-12 sm:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Left — photo + identity */}
          <div className="flex flex-col items-start gap-8">
            <motion.div
              variants={founderPhoto}
              initial="hidden"
              animate={photoState}
            >
              <TiltPhoto reduce={reduce} />
            </motion.div>

            <motion.div
              className="flex flex-col gap-2"
              variants={founderNameContainer}
              initial="hidden"
              animate={nameState}
            >
              <motion.h2
                variants={founderNameLine}
                className="text-[#F0F4F8]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.15rem, 3.1vw, 2.85rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}
              >
                Олександр
              </motion.h2>

              <motion.p
                variants={founderNameLine}
                className="text-[#F0F4F8]/80"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.15rem, 1.3vw, 1.25rem)",
                }}
              >
                Засновник · CTO Webspirio
              </motion.p>

              <motion.div
                variants={founderNameLine}
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-3.5 py-1.5 text-cyan-200"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.98rem",
                  letterSpacing: "0.02em",
                }}
              >
                <MapPin className="h-4 w-4" strokeWidth={2} />
                <span>Берлін</span>
              </motion.div>
            </motion.div>

            <motion.p
              variants={founderBio}
              initial="hidden"
              animate={
                (isActive && fragment >= 3) || (reduce && isActive)
                  ? "visible"
                  : "hidden"
              }
              className="max-w-[32ch] text-[#F0F4F8]/70"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1.1rem, 1.2vw, 1.2rem)",
                lineHeight: 1.55,
              }}
            >
              6 років у Німеччині · 10+ років у веброзробці · Magento,
              WordPress, ERPNext, AI-інтеграції
            </motion.p>
          </div>

          {/* Right — 2×2 stats */}
          <motion.div
            className="grid grid-cols-2 gap-5 sm:gap-6"
            variants={founderStatsContainer}
            initial="hidden"
            animate={statsState}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={founderStatCard}
                className="relative flex flex-col gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-950/60 p-6 backdrop-blur-sm sm:p-7"
                style={{
                  boxShadow:
                    "0 0 32px -12px rgba(83, 234, 253, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-200">
                    <stat.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <div
                  className="flex items-baseline gap-0 text-cyan-100"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.5rem, 4.5vw, 4.25rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 24px rgba(0, 211, 242, 0.35)",
                  }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    active={statCountersActive}
                    duration={FOUNDER_TIMING.countUpDuration}
                    delay={0.1 + i * FOUNDER_TIMING.statStagger}
                  />
                </div>
                <span
                  className="text-cyan-300/80"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: "0.88rem",
                    letterSpacing: "0.16em",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Lightweight tilt photo — cursor-driven ±6° rotation, reduced-motion aware. */
/* Not using ReactBits DepthCard (rectangular, mandatory title overlay — bad  */
/* fit for a circular founder portrait).                                      */
/* -------------------------------------------------------------------------- */

function TiltPhoto({ reduce }: { reduce: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotY = useSpring(useTransform(mx, [-1, 1], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotX = useSpring(useTransform(my, [-1, 1], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  const initials = useMemo(() => "О", []);

  return (
    <div
      className="relative"
      style={{ perspective: "1000px" }}
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mx.set(x * 2 - 1);
        my.set(y * 2 - 1);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="relative flex h-[clamp(14rem,22vw,18rem)] w-[clamp(14rem,22vw,18rem)] items-center justify-center rounded-full"
        style={{
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformStyle: "preserve-3d",
          background:
            "radial-gradient(circle at 30% 30%, rgba(0, 211, 242, 0.35), rgba(5, 51, 69, 0.95) 70%)",
          boxShadow:
            "0 0 64px -12px rgba(0, 211, 242, 0.45), inset 0 0 0 4px rgba(83, 234, 253, 0.35)",
        }}
      >
        {/* Photo — swap the URL when real headshot lands. For now, initialed
            gradient placeholder makes the missing-photo state deliberate. */}
        <span
          className="text-cyan-100/90"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(5rem, 8vw, 7rem)",
            letterSpacing: "-0.04em",
            textShadow: "0 4px 32px rgba(0, 211, 242, 0.6)",
          }}
        >
          {initials}
        </span>
        {/* Slow breathe halo */}
        {!reduce ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[-6px] rounded-full border border-cyan-300/40"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
