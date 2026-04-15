import { Presentation } from '@/engine/Presentation'
import type { SlideConfig } from '@/engine/types'
import { HeroSlide } from '@/slides/01-Hero'
import { ServicesConstellationSlide } from '@/slides/21-ServicesConstellation'

const slides: SlideConfig[] = [
  {
    id: 'hero',
    component: HeroSlide,
    title: 'Webspirio',
    notes: 'Welcome slide — introduce Webspirio as a digital agency for Ukrainian entrepreneurs in Germany.',
    background: 'transparent',
    showCenterLogo: true,
  },
  {
    id: 'services-constellation',
    component: ServicesConstellationSlide,
    title: 'Наші продукти',
    showCenterLogo: true,
    notes: [
      'Наша екосистема сервісів — десять напрямків, що зʼєднуються в одну цифрову інфраструктуру:',
      '1. Вебсайти та eCommerce (WordPress, Magento 2, WooCommerce)',
      '2. Брендинг та логотипи (фірмовий стиль, візитки)',
      '3. Дизайнʼсистеми (UI kit, brand book, патерни)',
      '4. CRM-системи (Altegio, власні CRM)',
      '5. ERP та бізнес-системи (ERPNext, Invoice Ninja, Kimai)',
      '6. AI-чатботи (Korvo — асистенти для продажів)',
      '7. Автоматизація процесів (n8n, інтеграції)',
      '8. SMM та соцмережі (шаблони, контент-план)',
      '9. Аналітика (Clickwise, Rybbit — GDPR-сумісна альтернатива GA)',
      '10. Омніканал (WhatsApp + Instagram + Telegram у одному інбоксі)',
      '',
      'Ключовий меседж: один партнер, який робить усе — не треба координувати пʼять фрілансерів.',
    ].join('\n'),
    background: 'transparent',
  },
]

function App() {
  return <Presentation slides={slides} />
}

export default App
