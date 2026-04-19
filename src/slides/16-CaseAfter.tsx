import type { SlideProps } from '@/engine/types'
import { BrowserFrame } from '@/components/mockups/BrowserFrame'
import { LiveSiteEmbed } from '@/components/mockups/LiveSiteEmbed'

export function CaseAfterSlide({ isActive }: SlideProps) {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-10 py-10 sm:px-16 sm:py-12">
      <div
        className="w-full"
        style={{ maxWidth: 'calc(82vh * 1.6)' }}
      >
        <BrowserFrame
          isActive={isActive}
          url="kuechenfokus.de"
          showCheck
          delay={0.2}
          className="w-full"
        >
          <LiveSiteEmbed
            isActive={isActive}
            url="https://kuechenfokus.de"
            delay={0.3}
            interactive
          />
        </BrowserFrame>
      </div>
    </section>
  )
}
