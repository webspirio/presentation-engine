import type { SlideProps } from '@/engine/types'
import { SectionDivider } from '@/components/SectionDivider'

export function ActBrandSlide({ isActive }: SlideProps) {
  return (
    <SectionDivider
      isActive={isActive}
      eyebrow="АКТ III"
      title={'БРЕНД\nПІД КЛЮЧ'}
      caption="Від назви до візитки"
    />
  )
}
