import { motion } from 'motion/react'
import type { ActivePosition, ColumnConfig } from './types'

interface NavigationProps {
  columns: ColumnConfig[]
  active: ActivePosition
  onNavigate: (pos: ActivePosition) => void
}

export function Navigation({ columns, active, onNavigate }: NavigationProps) {
  const totalSlides = columns.reduce((sum, c) => sum + c.slides.length, 0)
  let snakeIndex = 0
  for (let c = 0; c < active.col; c++) snakeIndex += columns[c]?.slides.length ?? 0
  snakeIndex += active.row + 1
  const progress = totalSlides > 0 ? (snakeIndex / totalSlides) * 100 : 100

  const activeColumn = columns[active.col]
  const rowCount = activeColumn?.slides.length ?? 1

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

      {/* Column dots — top center */}
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 gap-3">
        {columns.map((column, i) => (
          <button
            key={column.id}
            onClick={() => onNavigate({ col: i, row: 0 })}
            className="group relative flex h-3 w-6 items-center justify-center"
            aria-label={`Go to column ${i + 1}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: i === active.col ? 24 : 16,
                height: i === active.col ? 4 : 3,
                backgroundColor:
                  i === active.col ? '#22d3ee' : 'rgba(103, 232, 249, 0.3)',
              }}
              whileHover={{ scale: 1.2, backgroundColor: '#67e8f9' }}
              transition={{ duration: 0.2 }}
            />
          </button>
        ))}
      </div>

      {/* Row dots — right side (only if active column has > 1 row) */}
      {rowCount > 1 ? (
        <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
          {Array.from({ length: rowCount }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate({ col: active.col, row: i })}
              className="group relative flex h-3 w-3 items-center justify-center"
              aria-label={`Go to row ${i + 1}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: i === active.row ? 12 : 8,
                  height: i === active.row ? 12 : 8,
                  backgroundColor:
                    i === active.row ? '#22d3ee' : 'rgba(103, 232, 249, 0.3)',
                }}
                whileHover={{ scale: 1.3, backgroundColor: '#67e8f9' }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}
