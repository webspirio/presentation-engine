import type { SlideProps } from '@/engine/types'
import { SectionDivider } from '@/components/SectionDivider'

export function LrDividerSlide({ isActive }: SlideProps) {
  return (
    <SectionDivider
      isActive={isActive}
      eyebrow="АКТ III · КЕЙС №2"
      title={'ВІД ПІДПИСНИКІВ\nДО ПРОДАЖІВ'}
      caption="Media factory funnel"
    />
  )
}
