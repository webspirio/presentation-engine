import { Presentation } from '@/engine/Presentation'
import type { SlideConfig } from '@/engine/types'
import { HeroSlide } from '@/slides/01-Hero'

const slides: SlideConfig[] = [
  {
    id: 'hero',
    component: HeroSlide,
    title: 'Webspirio',
    notes: 'Welcome slide — introduce Webspirio as a digital agency for Ukrainian entrepreneurs in Germany.',
    background: '#083344',
  },
]

function App() {
  return <Presentation slides={slides} />
}

export default App
