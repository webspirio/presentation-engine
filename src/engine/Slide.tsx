import { forwardRef, type ReactNode } from 'react'
import { motion } from 'motion/react'

interface SlideWrapperProps {
  children: ReactNode
  isActive: boolean
  background?: string
  className?: string
}

export const Slide = forwardRef<HTMLDivElement, SlideWrapperProps>(
  ({ children, isActive, background, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-hidden ${className}`}
        style={{ background: background || 'transparent' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full w-full items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    )
  }
)

Slide.displayName = 'Slide'
