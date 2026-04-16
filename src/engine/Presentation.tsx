import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import type { ColumnConfig } from './types'
import { useActivePosition } from './useActivePosition'
import { useNavigation } from './useNavigation'
import { Navigation } from './Navigation'
import { PersistentStage } from './PersistentStage'
import { PresenterOverlay } from './PresenterOverlay'
import { Slide } from './Slide'

interface PresentationProps {
  columns: ColumnConfig[]
}

const STAGE_EASE = [0.22, 1, 0.36, 1] as const

export function Presentation({ columns }: PresentationProps) {
  const { active, scrollTo, setFragment } = useActivePosition(columns)
  const {
    showNotes,
    showTimer,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
  } = useNavigation({ active, columns, scrollTo, setFragment })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd])

  const activeSlide = columns[active.col]?.slides[active.row]

  const snakeLabel = useMemo(() => {
    let count = 0
    for (let c = 0; c < active.col; c++) {
      count += columns[c]?.slides.length ?? 0
    }
    count += active.row + 1
    const total = columns.reduce((sum, col) => sum + col.slides.length, 0)
    return { current: count, total }
  }, [active, columns])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-cyan-950">
      <PersistentStage columns={columns} active={active} />

      <div
        ref={containerRef}
        className="relative z-10 h-full w-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ x: `${-active.col * 100}vw` }}
          transition={{ duration: 0.7, ease: STAGE_EASE }}
        >
          {columns.map((column, colIdx) => (
            <motion.div
              key={column.id}
              className="absolute top-0 h-screen w-screen"
              style={{ left: `${colIdx * 100}vw` }}
              animate={{
                y:
                  colIdx === active.col
                    ? `${-active.row * 100}vh`
                    : '0vh',
              }}
              transition={{ duration: 0.6, ease: STAGE_EASE }}
            >
              {column.slides.map((slide, rowIdx) => {
                const SlideComponent = slide.component
                const isActive =
                  colIdx === active.col && rowIdx === active.row
                return (
                  <div
                    key={slide.id}
                    className="absolute left-0 h-screen w-screen"
                    style={{ top: `${rowIdx * 100}vh` }}
                  >
                    <Slide isActive={isActive} background={slide.background}>
                      <SlideComponent
                        isActive={isActive}
                        col={colIdx}
                        row={rowIdx}
                        fragment={isActive ? active.fragment : 0}
                      />
                    </Slide>
                  </div>
                )
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Navigation columns={columns} active={active} onNavigate={scrollTo} />

      <PresenterOverlay
        show={showNotes}
        showTimer={showTimer}
        label={`${active.col + 1}.${active.row + 1} · ${snakeLabel.current}/${snakeLabel.total}`}
        title={activeSlide?.title}
        notes={activeSlide?.notes}
      />
    </div>
  )
}
