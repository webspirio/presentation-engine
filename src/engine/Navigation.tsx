import { motion } from 'motion/react'

interface NavigationProps {
  activeSlide: number
  totalSlides: number
  onNavigate: (index: number) => void
}

export function Navigation({ activeSlide, totalSlides, onNavigate }: NavigationProps) {
  const progress = totalSlides > 1 ? ((activeSlide + 1) / totalSlides) * 100 : 100

  return (
    <>
      {/* Progress bar — top */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-cyan-950/50">
        <motion.div
          className="h-full bg-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Navigation dots — right side */}
      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className="group relative flex h-3 w-3 items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: i === activeSlide ? 12 : 8,
                height: i === activeSlide ? 12 : 8,
                backgroundColor: i === activeSlide ? '#22d3ee' : 'rgba(103, 232, 249, 0.3)',
              }}
              whileHover={{ scale: 1.3, backgroundColor: '#67e8f9' }}
              transition={{ duration: 0.2 }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
