import { useState, useEffect, useRef, useCallback } from 'react'

export function useActiveSlide(totalSlides: number) {
  const [activeSlide, setActiveSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const setSlideRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = slideRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setActiveSlide(index)
              history.replaceState(null, '', `#${index}`)
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.5,
      }
    )

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [totalSlides])

  // Sync from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const index = parseInt(hash, 10)
    if (!isNaN(index) && index >= 0 && index < totalSlides) {
      setActiveSlide(index)
      slideRefs.current[index]?.scrollIntoView({ behavior: 'instant' })
    }
  }, [totalSlides])

  const scrollToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSlides - 1))
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth' })
  }, [totalSlides])

  return { activeSlide, containerRef, setSlideRef, scrollToSlide }
}
