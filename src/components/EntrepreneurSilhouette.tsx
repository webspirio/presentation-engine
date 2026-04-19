import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'

export type SilhouettePose = 'carrying' | 'standing' | 'pointing'

export interface EntrepreneurSilhouetteProps {
  isActive: boolean
  /** Target opacity once revealed (default 0.4 — hunched onlooker). */
  opacity?: number
  /** Delay before fade-up, in seconds. */
  delay?: number
  /** Figure stance. 'carrying' shows a toolbox in hand; 'standing' is centered with both arms at sides; 'pointing' raises the right arm. */
  pose?: SilhouettePose
  /** Tint for the silhouette body. Defaults to off-white #F0F4F8. */
  color?: string
  /** Accent colour for the shirt stripe. */
  accent?: string
  className?: string
}

const silhouetteVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: { opacity: number; delay: number }) => ({
    opacity: custom.opacity,
    y: 0,
    transition: { duration: 0.75, ease: easeSmooth, delay: custom.delay },
  }),
}

function Toolbox({ color, accent }: { color: string; accent: string }) {
  return (
    <g transform="translate(-26 192)">
      {/* handle */}
      <path
        d="M10 6 Q10 -2 18 -2 L34 -2 Q42 -2 42 6 L42 14"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* body */}
      <rect x="0" y="14" width="52" height="38" rx="3" fill="#164e63" />
      <rect
        x="0"
        y="14"
        width="52"
        height="38"
        rx="3"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />
      {/* latch */}
      <rect x="22" y="26" width="8" height="3" fill={accent} />
      {/* divider line */}
      <line x1="0" y1="24" x2="52" y2="24" stroke={accent} strokeWidth="0.8" opacity="0.5" />
    </g>
  )
}

function Head({ color }: { color: string }) {
  return (
    <>
      {/* cap crown */}
      <path
        d="M60 62 Q60 32 110 32 Q160 32 160 62 L160 68 Q160 72 156 72 L64 72 Q60 72 60 68 Z"
        fill={color}
      />
      {/* cap brim */}
      <path d="M48 68 L172 68 L168 78 L52 78 Z" fill={color} />
      {/* head */}
      <path d="M76 78 Q76 116 110 116 Q144 116 144 78 Z" fill={color} />
      {/* neck */}
      <rect x="100" y="114" width="20" height="12" fill={color} />
    </>
  )
}

export function EntrepreneurSilhouette({
  isActive,
  opacity = 0.4,
  delay = 0,
  pose = 'carrying',
  color = '#F0F4F8',
  accent = '#53eafd',
  className,
}: EntrepreneurSilhouetteProps) {
  const showToolbox = pose === 'carrying'
  const rightArmRaised = pose === 'pointing'

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 220 360"
      fill="none"
      custom={{ opacity, delay }}
      variants={silhouetteVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <Head color={color} />

      {/* Torso */}
      <path
        d="M60 130 Q60 124 66 124 L154 124 Q160 124 160 130 L160 236 L60 236 Z"
        fill={color}
      />

      {/* Shirt accent V */}
      <path
        d="M98 124 L110 142 L122 124 Z"
        fill={accent}
        opacity="0.9"
      />

      {/* Left arm (viewer's left) — holds the toolbox when pose === 'carrying' */}
      {showToolbox ? (
        <path d="M50 132 L60 132 L66 198 L58 214 L42 212 L38 200 Z" fill={color} />
      ) : (
        <path d="M50 132 L60 132 L62 228 L46 230 L44 220 Z" fill={color} />
      )}

      {/* Right arm (viewer's right) */}
      {rightArmRaised ? (
        <path
          d="M160 132 L170 132 L198 78 L188 68 L170 120 Z"
          fill={color}
        />
      ) : (
        <path d="M160 132 L170 132 L178 226 L164 230 L158 220 Z" fill={color} />
      )}

      {/* Legs */}
      <rect x="72" y="236" width="30" height="110" fill={color} />
      <rect x="118" y="236" width="30" height="110" fill={color} />

      {/* Feet */}
      <path d="M66 346 L108 346 L104 358 L66 358 Z" fill={color} />
      <path d="M112 346 L154 346 L154 358 L116 358 Z" fill={color} />

      {showToolbox && <Toolbox color={color} accent={accent} />}
    </motion.svg>
  )
}
