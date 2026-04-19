import { motion, type Variants } from 'motion/react'
import { easeSmooth } from '@/animations/transitions'
import {
  lrChip,
  lrChipGroup,
  lrLayerBand,
} from '@/animations/lrTimeline'

const FONT_POPPINS = "'Poppins', sans-serif"
const FONT_DISPLAY = "'Unbounded', 'Poppins', sans-serif"

export interface LrLayer {
  /** Short uppercase label shown on the band (e.g. "Контент"). */
  label: string
  /** Optional small footnote under the label (e.g. "одна платформа"). */
  footnote?: string
  /** Chip labels rendered horizontally inside the band. */
  chips: string[]
  /** Border + glow accent color (CSS). Default cyan-400. */
  accent?: string
  /** Whether the band is the "hero" one (Мозок) — renders slightly wider + stronger glow. */
  emphasis?: boolean
}

interface LrArchitectureStackProps {
  layers: LrLayer[]
  /** 'bands': whether the layer bands themselves are visible (fr >= 0). */
  bandsActive: boolean
  /** revealedUpTo: index of the last layer whose chips should be revealed. -1 = none. */
  revealedUpTo: number
}

const arrowVariant: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 0.55,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

function ArrowDown({ active }: { active: boolean }) {
  return (
    <motion.svg
      aria-hidden
      variants={arrowVariant}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      width="36"
      height="22"
      viewBox="0 0 28 18"
      fill="none"
      className="my-1"
    >
      <path
        d="M14 2 L14 14 M6 9 L14 17 L22 9"
        stroke="#53eafd"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export function LrArchitectureStack({
  layers,
  bandsActive,
  revealedUpTo,
}: LrArchitectureStackProps) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-stretch gap-0">
      {layers.map((layer, idx) => {
        const chipsActive = bandsActive && idx <= revealedUpTo
        const accent = layer.accent ?? '#00d3f2'
        return (
          <div key={layer.label} className="flex flex-col items-center">
            <motion.div
              variants={lrLayerBand}
              initial="hidden"
              animate={bandsActive ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className="flex w-full flex-col items-center gap-2 rounded-2xl px-7 py-5 sm:flex-row sm:items-center sm:gap-7"
              style={{
                background: layer.emphasis
                  ? 'linear-gradient(135deg, rgba(0, 147, 184, 0.22) 0%, rgba(0, 211, 242, 0.12) 100%)'
                  : 'rgba(5, 51, 69, 0.55)',
                border: `1px solid ${accent}${layer.emphasis ? '55' : '30'}`,
                boxShadow: layer.emphasis
                  ? `0 24px 60px -32px ${accent}, inset 0 1px 0 rgba(83, 234, 253, 0.2)`
                  : `0 16px 36px -28px ${accent}, inset 0 1px 0 rgba(83, 234, 253, 0.1)`,
                backdropFilter: 'blur(6px)',
              }}
            >
              <div className="flex shrink-0 flex-col items-start sm:w-44">
                <span
                  className="text-[#F0F4F8]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 600,
                    fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {layer.label}
                </span>
                {layer.footnote ? (
                  <span
                    className="text-[#53eafd]/70"
                    style={{
                      fontFamily: FONT_POPPINS,
                      fontWeight: 400,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.95rem)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {layer.footnote}
                  </span>
                ) : null}
              </div>
              <motion.ul
                variants={lrChipGroup}
                initial="hidden"
                animate={chipsActive ? 'visible' : 'hidden'}
                className="flex flex-1 flex-wrap items-center justify-start gap-2 sm:justify-start"
              >
                {layer.chips.map((chip) => (
                  <motion.li
                    key={chip}
                    variants={lrChip}
                    className="text-[#F0F4F8]"
                    style={{
                      fontFamily: FONT_POPPINS,
                      fontWeight: 500,
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
                      padding: '8px 18px',
                      borderRadius: 999,
                      background: 'rgba(8, 51, 68, 0.75)',
                      border: `1px solid ${accent}60`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {chip}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {idx < layers.length - 1 && (
              <ArrowDown active={bandsActive && idx < revealedUpTo + 1} />
            )}
          </div>
        )
      })}
    </div>
  )
}
