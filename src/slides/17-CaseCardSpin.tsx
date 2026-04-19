import type { SlideProps } from '@/engine/types'
import { SpinCard } from '@/components/mockups/SpinCard'
import frontUrl from '@/assets/kf/kf-bc-front.svg'
import backUrl from '@/assets/kf/kf-bc-back.svg'

export function CaseCardSpinSlide({ isActive }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <SpinCard isActive={isActive} frontSrc={frontUrl} backSrc={backUrl} />
    </div>
  )
}
