import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export interface LiveSiteEmbedProps {
  /** Fully-qualified URL (must allow iframe embedding). */
  url: string
  isActive: boolean
  /**
   * Virtual desktop viewport the site renders into before we scale it down.
   * Defaults to 1280×800.
   */
  virtualWidth?: number
  virtualHeight?: number
  /**
   * Aspect ratio of the visible slot, as CSS aspect-ratio. Defaults to the
   * virtual viewport ratio.
   */
  aspectRatio?: string
  /** Capped height so tall viewports don't blow past the slide layout. */
  maxHeight?: number
  /** Delay before the fade-in begins (matches BrowserFrame entrance). */
  delay?: number
  /** Let viewers click into the site. Default false (presenter hover only). */
  interactive?: boolean
  className?: string
}

/**
 * Renders a live page in a scaled iframe. The iframe is kept at a desktop-sized
 * virtual viewport so responsive sites render as desktop, then visually scaled
 * down to fit the container.
 */
export function LiveSiteEmbed({
  url,
  isActive,
  virtualWidth = 1280,
  virtualHeight = 800,
  aspectRatio,
  maxHeight,
  delay = 0,
  interactive = false,
  className,
}: LiveSiteEmbedProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(() => 0.3)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          // Take the more constraining dimension so the iframe always fits
          // inside the container, even when aspect ratios don't match.
          setScale(Math.min(w / virtualWidth, h / virtualHeight))
        }
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [virtualWidth, virtualHeight])

  const ratio = aspectRatio ?? `${virtualWidth} / ${virtualHeight}`

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative w-full overflow-hidden ${className ?? ''}`}
      style={{
        aspectRatio: ratio,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        background: 'rgba(5, 51, 69, 0.9)',
      }}
    >
      <iframe
        src={url}
        title={url}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-popups"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${virtualWidth}px`,
          height: `${virtualHeight}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          border: 0,
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      />
    </motion.div>
  )
}
