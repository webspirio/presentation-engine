import { useCallback, useEffect, useRef, useState } from 'react'
import type { ActivePosition, ColumnConfig } from './types'

interface UseNavigationOptions {
  active: ActivePosition
  columns: ColumnConfig[]
  scrollTo: (pos: { col: number; row: number; fragment?: number }) => void
  setFragment: (n: number) => void
}

type SlidePosition = { col: number; row: number }

/**
 * Snake advance: walk down the current column until the bottom,
 * then jump to the top of the next column. Mirror logic for retreat.
 */
function snakeNext(active: SlidePosition, columns: ColumnConfig[]): SlidePosition {
  const column = columns[active.col]
  if (!column) return active
  const lastRow = column.slides.length - 1
  if (active.row < lastRow) return { col: active.col, row: active.row + 1 }
  if (active.col < columns.length - 1) return { col: active.col + 1, row: 0 }
  return active
}

function snakePrev(active: SlidePosition, columns: ColumnConfig[]): SlidePosition {
  if (active.row > 0) return { col: active.col, row: active.row - 1 }
  if (active.col > 0) {
    const prevCol = columns[active.col - 1]
    const lastRow = (prevCol?.slides.length ?? 1) - 1
    return { col: active.col - 1, row: lastRow }
  }
  return active
}

export function useNavigation({
  active,
  columns,
  scrollTo,
  setFragment,
}: UseNavigationOptions) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const lastWheelTime = useRef(0)

  const activeRef = useRef(active)
  const columnsRef = useRef(columns)
  useEffect(() => {
    activeRef.current = active
    columnsRef.current = columns
  }, [active, columns])

  const tryAdvanceFragment = useCallback(() => {
    const a = activeRef.current
    const slide = columnsRef.current[a.col]?.slides[a.row]
    const maxFragment = slide?.fragments ?? 0
    if (a.fragment < maxFragment) {
      setFragment(a.fragment + 1)
      return true
    }
    return false
  }, [setFragment])

  const tryRetreatFragment = useCallback(() => {
    const a = activeRef.current
    if (a.fragment > 0) {
      setFragment(a.fragment - 1)
      return true
    }
    return false
  }, [setFragment])

  const goColumnNext = useCallback(() => {
    if (tryAdvanceFragment()) return
    const a = activeRef.current
    if (a.col < columnsRef.current.length - 1) {
      scrollTo({ col: a.col + 1, row: 0 })
    }
  }, [scrollTo, tryAdvanceFragment])

  const goColumnPrev = useCallback(() => {
    if (tryRetreatFragment()) return
    const a = activeRef.current
    if (a.col > 0) {
      const prev = { col: a.col - 1, row: 0 }
      const prevSlide = columnsRef.current[prev.col]?.slides[prev.row]
      scrollTo({ ...prev, fragment: prevSlide?.fragments ?? 0 })
    }
  }, [scrollTo, tryRetreatFragment])

  const goRowNext = useCallback(() => {
    if (tryAdvanceFragment()) return
    const a = activeRef.current
    const lastRow = (columnsRef.current[a.col]?.slides.length ?? 1) - 1
    if (a.row < lastRow) scrollTo({ col: a.col, row: a.row + 1 })
  }, [scrollTo, tryAdvanceFragment])

  const goRowPrev = useCallback(() => {
    if (tryRetreatFragment()) return
    const a = activeRef.current
    if (a.row > 0) {
      const prev = { col: a.col, row: a.row - 1 }
      const prevSlide = columnsRef.current[prev.col]?.slides[prev.row]
      scrollTo({ ...prev, fragment: prevSlide?.fragments ?? 0 })
    }
  }, [scrollTo, tryRetreatFragment])

  const snakeAdvance = useCallback(() => {
    if (tryAdvanceFragment()) return
    scrollTo(snakeNext(activeRef.current, columnsRef.current))
  }, [scrollTo, tryAdvanceFragment])

  const snakeRetreat = useCallback(() => {
    if (tryRetreatFragment()) return
    const prev = snakePrev(activeRef.current, columnsRef.current)
    const prevSlide = columnsRef.current[prev.col]?.slides[prev.row]
    scrollTo({ ...prev, fragment: prevSlide?.fragments ?? 0 })
  }, [scrollTo, tryRetreatFragment])

  const goFirst = useCallback(() => scrollTo({ col: 0, row: 0 }), [scrollTo])
  const goLast = useCallback(() => {
    const lastCol = columnsRef.current.length - 1
    scrollTo({ col: lastCol, row: 0 })
  }, [scrollTo])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          goColumnNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          goColumnPrev()
          break
        case 'ArrowDown':
          e.preventDefault()
          goRowNext()
          break
        case 'ArrowUp':
          e.preventDefault()
          goRowPrev()
          break
        case ' ':
        case 'PageDown':
          e.preventDefault()
          if (e.shiftKey) snakeRetreat()
          else snakeAdvance()
          break
        case 'PageUp':
          e.preventDefault()
          snakeRetreat()
          break
        case 'Home':
          e.preventDefault()
          goFirst()
          break
        case 'End':
          e.preventDefault()
          goLast()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'n':
        case 'N':
          e.preventDefault()
          setShowNotes((v) => !v)
          break
        case 't':
        case 'T':
          e.preventDefault()
          setShowTimer((v) => !v)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    goColumnNext,
    goColumnPrev,
    goRowNext,
    goRowPrev,
    snakeAdvance,
    snakeRetreat,
    goFirst,
    goLast,
    toggleFullscreen,
  ])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Mac trackpad pinch-zoom arrives as a wheel event with ctrlKey=true.
      // Let the browser handle it instead of advancing the slide.
      if (e.ctrlKey) return
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelTime.current < 800) return
      lastWheelTime.current = now

      if (e.deltaY > 0) snakeAdvance()
      else if (e.deltaY < 0) snakeRetreat()
    },
    [snakeAdvance, snakeRetreat],
  )

  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart.current) return
      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      if (Math.max(absDx, absDy) < 50) {
        touchStart.current = null
        return
      }

      if (absDy > absDx) {
        if (dy < 0) goRowNext()
        else goRowPrev()
      } else {
        if (dx < 0) goColumnNext()
        else goColumnPrev()
      }
      touchStart.current = null
    },
    [goRowNext, goRowPrev, goColumnNext, goColumnPrev],
  )

  return {
    isFullscreen,
    showNotes,
    showTimer,
    setShowNotes,
    setShowTimer,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
    toggleFullscreen,
  }
}
