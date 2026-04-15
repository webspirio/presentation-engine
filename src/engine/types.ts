export type TransitionType = 'fade' | 'slide-up' | 'slide-left' | 'zoom' | 'none'

export interface SlideConfig {
  id: string
  component: React.ComponentType<SlideProps>
  title: string
  notes?: string
  transition?: TransitionType
  background?: string
  showCenterLogo?: boolean
}

export interface SlideProps {
  isActive: boolean
  slideIndex: number
}

export interface PresentationState {
  activeSlide: number
  totalSlides: number
  isFullscreen: boolean
  showNotes: boolean
  showTimer: boolean
}
