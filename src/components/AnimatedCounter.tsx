import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

export interface AnimatedCounterProps {
  /** Target integer value */
  target: number;
  /** Optional "+" / custom suffix */
  suffix?: string;
  /** Whether the counter should run now (tied to slide/fragment active state) */
  active: boolean;
  /** Seconds */
  duration?: number;
  /** Delay before count-up begins (seconds) */
  delay?: number;
  className?: string;
}

// Counts from 0 to `target` once `active` becomes true.
// Respects prefers-reduced-motion (jumps straight to target).
//
// React 19 note: per eslint-plugin-react-hooks purity rules, setState cannot
// be called from an effect body. The motion value is the source of truth —
// a persistent `on('change')` subscription fans its value out to React state.
export function AnimatedCounter({
  target,
  suffix = "",
  active,
  duration = 1.2,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const reduce = useReducedMotion() ?? false;
  const motionValue = useMotionValue(0);
  const [displayed, setDisplayed] = useState(0);

  // Persistent subscription — fires setDisplayed async via motion events,
  // not synchronously from this effect.
  useEffect(() => {
    return motionValue.on("change", (v) => {
      setDisplayed(Math.round(v));
    });
  }, [motionValue]);

  // Drives the animation — only touches the motion value, never setState.
  useEffect(() => {
    if (!active) {
      motionValue.set(0);
      return;
    }
    if (reduce) {
      motionValue.set(target);
      return;
    }
    const controls = animate(motionValue, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, reduce, motionValue, target, duration, delay]);

  return (
    <span className={className}>
      {displayed}
      {suffix}
    </span>
  );
}
