import type { SlideProps } from '@/engine/types'
import { SpinTShirt } from '@/components/mockups/SpinTShirt'
import shirtFrontUrl from '@/assets/kf/kf-tshirt-front-clean.png'
import shirtBackUrl from '@/assets/kf/kf-tshirt-back-clean.png'

export function CaseShirtSpinSlide({ isActive }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-10 overflow-hidden px-10 sm:gap-16">
      <SpinTShirt
        isActive={isActive}
        frontSrc={shirtFrontUrl}
        backSrc={shirtBackUrl}
        label="Футболка Küchen Fokus · передня сторона"
      />
      <SpinTShirt
        isActive={isActive}
        frontSrc={shirtBackUrl}
        backSrc={shirtFrontUrl}
        label="Футболка Küchen Fokus · зворот"
        showHint={false}
      />
    </div>
  )
}
