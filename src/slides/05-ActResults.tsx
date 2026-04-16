import type { SlideProps } from '@/engine/types'
import { SectionDivider } from '@/components/SectionDivider'

export function ActResultsSlide({ isActive }: SlideProps) {
  return (
    <SectionDivider
      isActive={isActive}
      eyebrow="АКТ II"
      title={'РЕАЛЬНІ\nРЕЗУЛЬТАТИ'}
      caption="Кейси клієнтів · 2024–2026"
    />
  )
}
