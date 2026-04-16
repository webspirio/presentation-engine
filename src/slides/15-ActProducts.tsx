import type { SlideProps } from '@/engine/types'
import { SectionDivider } from '@/components/SectionDivider'

export function ActProductsSlide({ isActive }: SlideProps) {
  return (
    <SectionDivider
      isActive={isActive}
      eyebrow="АКТ IV"
      title={'НАШІ\nПРОДУКТИ'}
      caption="Korvo · Clickwise · Webspirio Stack"
    />
  )
}
