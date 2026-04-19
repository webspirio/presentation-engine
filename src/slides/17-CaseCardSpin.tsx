import type { SlideProps } from '@/engine/types'
import { SpinCard } from '@/components/mockups/SpinCard'
import frontUrl from '@/assets/kf/kf-bc-front.jpg'
import backUrl from '@/assets/kf/kf-bc-back.jpg'

export function CaseCardSpinSlide({ isActive }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-cyan-950">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 211, 242, 0.14) 0%, rgba(5, 51, 69, 0.0) 55%, rgba(5, 51, 69, 0.45) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(83,234,253,0.08) 0 1px, transparent 1px 24px)',
        }}
      />
      <SpinCard isActive={isActive} frontSrc={frontUrl} backSrc={backUrl} />
    </div>
  )
}
