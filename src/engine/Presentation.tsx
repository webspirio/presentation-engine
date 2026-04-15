import { useEffect } from 'react'
import type { SlideConfig } from './types'
import { useActiveSlide } from './useActiveSlide'
import { useNavigation } from './useNavigation'
import { Navigation } from './Navigation'
import { PersistentStage } from './PersistentStage'
import { PresenterOverlay } from './PresenterOverlay'
import { Slide } from './Slide'

interface PresentationProps {
  slides: SlideConfig[]
}

export function Presentation({ slides }: PresentationProps) {
  const { activeSlide, containerRef, setSlideRef, scrollToSlide } = useActiveSlide(slides.length)
  const {
    showNotes,
    showTimer,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
  } = useNavigation({
    activeSlide,
    totalSlides: slides.length,
    scrollToSlide,
  })

  // Attach wheel/touch listeners with passive: false
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
  }, [handleWheel, handleTouchStart, handleTouchEnd, containerRef])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-cyan-950">
      {/* Persistent background + center logo — sits behind scroll container */}
      <PersistentStage slides={slides} activeSlide={activeSlide} />

      {/* Scroll-snap container */}
      <div
        ref={containerRef}
        className="relative z-10 h-full w-full snap-y snap-mandatory overflow-y-auto"
      >
        {slides.map((slide, index) => {
          const SlideComponent = slide.component
          return (
            <Slide
              key={slide.id}
              ref={setSlideRef(index)}
              isActive={activeSlide === index}
              background={slide.background}
            >
              <SlideComponent isActive={activeSlide === index} slideIndex={index} />
            </Slide>
          )
        })}
      </div>

      {/* Navigation UI */}
      <Navigation
        activeSlide={activeSlide}
        totalSlides={slides.length}
        onNavigate={scrollToSlide}
      />

      {/* Presenter overlay */}
      <PresenterOverlay
        show={showNotes}
        showTimer={showTimer}
        currentSlide={activeSlide}
        notes={slides[activeSlide]?.notes}
      />
    </div>
  )
}
