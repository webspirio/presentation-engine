import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PipelineNodeProps {
  label: string;
  sublabel?: string;
  Icon: LucideIcon;
  state: "fractured" | "connected";
  className?: string;
}

// A node card shared by Slide 2 (fractured) and Slide 3 (connected).
// Same shape, same typography — only the border/glow treatment differs
// so the audience recognises the SAME six nodes reassembling.
export function PipelineNode({
  label,
  sublabel,
  Icon,
  state,
  className,
}: PipelineNodeProps) {
  const isConnected = state === "connected";

  return (
    <motion.div
      className={cn(
        "relative flex items-center gap-2.5 rounded-xl px-5 py-3.5 backdrop-blur-sm",
        "border transition-[border-color,box-shadow,background-color] duration-500",
        isConnected
          ? "border-cyan-300/60 bg-cyan-950/50 shadow-[0_0_24px_-6px_rgba(83,234,253,0.5)]"
          : "border-cyan-500/25 bg-cyan-950/40",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-500",
          isConnected
            ? "bg-cyan-400/20 text-cyan-200"
            : "bg-cyan-500/10 text-cyan-400/70",
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span
        className="flex flex-col leading-tight"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <span className="text-[1.15rem] font-medium text-[#F0F4F8]">
          {label}
        </span>
        {sublabel ? (
          <span className="text-[0.88rem] font-normal text-cyan-300/60">
            {sublabel}
          </span>
        ) : null}
      </span>
      {isConnected ? (
        <>
          {/* Connector ports — small dots on either side */}
          <span
            aria-hidden
            className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(83,234,253,0.9)]"
          />
          <span
            aria-hidden
            className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(83,234,253,0.9)]"
          />
        </>
      ) : null}
    </motion.div>
  );
}
