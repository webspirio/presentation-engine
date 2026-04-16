export type TransitionType = 'fade' | 'slide-up' | 'slide-left' | 'zoom' | 'none'

export interface SlideConfig {
  id: string
  component: React.ComponentType<SlideProps>
  title: string
  notes?: string
  transition?: TransitionType
  background?: string
  showCenterLogo?: boolean
  /**
   * Number of intra-slide reveal steps AFTER the initial state.
   * fragments=0 (default) = classic single-state slide.
   * fragments=1 = slide starts empty; next advance reveals it.
   */
  fragments?: number
}

export interface ColumnConfig {
  id: string
  slides: SlideConfig[]
}

export interface SlideProps {
  isActive: boolean
  col: number
  row: number
  fragment: number
}

export interface ActivePosition {
  col: number
  row: number
  fragment: number
}

export interface PresentationState {
  active: ActivePosition
  totalColumns: number
  isFullscreen: boolean
  showNotes: boolean
  showTimer: boolean
}
