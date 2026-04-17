import { StageSlide } from '@/components/StageSlide'
import { ACT2_STAGES } from '@/data/act2Stages'
import type { SlideProps } from '@/engine/types'

export function ServeStageSlide({ isActive, fragment }: SlideProps) {
  return <StageSlide data={ACT2_STAGES[3]} isActive={isActive} fragment={fragment} />
}
