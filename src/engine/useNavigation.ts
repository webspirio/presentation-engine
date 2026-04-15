import { useEffect, useCallback, useState, useRef } from 'react'

interface UseNavigationOptions {
  activeSlide: number
  totalSlides: number
  scrollToSlide: (index: number) => void
}

export function useNavigation({ activeSlide, totalSlides, scrollToSlide }: UseNavigationOptions) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const lastWheelTime = useRef(0)

  const goNext = useCallback(() => {
    scrollToSlide(activeSlide + 1)
  }, [activeSlide, scrollToSlide])

  const goPrev = useCallback(() => {
    scrollToSlide(activeSlide - 1)
  }, [activeSlide, scrollToSlide])

  const goFirst = useCallback(() => {
    scrollToSlide(0)
  }, [scrollToSlide])

  const goLast = useCallback(() => {
    scrollToSlide(totalSlides - 1)
  }, [totalSlides, scrollToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          goNext()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          goPrev()
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
  }, [goNext, goPrev, goFirst, goLast, toggleFullscreen])

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Wheel debouncing
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const now = Date.now()
    if (now - lastWheelTime.current < 800) return
    lastWheelTime.current = now

    if (e.deltaY > 0) {
      goNext()
    } else if (e.deltaY < 0) {
      goPrev()
    }
  }, [goNext, goPrev])

  // Touch swipe support
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    // Need a minimum swipe distance
    if (Math.max(absDx, absDy) < 50) return

    if (absDy > absDx) {
      // Vertical swipe
      if (dy < 0) goNext()
      else goPrev()
    }
    touchStart.current = null
  }, [goNext, goPrev])

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
