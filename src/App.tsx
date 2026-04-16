import { Presentation } from '@/engine/Presentation'
import type { ColumnConfig } from '@/engine/types'
import { HeroSlide } from '@/slides/01-Hero'
import { ActResultsSlide } from '@/slides/05-ActResults'
import { ActBrandSlide } from '@/slides/12-ActBrand'
import { ActProductsSlide } from '@/slides/15-ActProducts'
import { ServicesConstellationSlide } from '@/slides/21-ServicesConstellation'

const columns: ColumnConfig[] = [
  {
    id: 'act-intro',
    slides: [
      {
        id: 'hero',
        component: HeroSlide,
        title: 'Webspirio',
        notes:
          'Welcome slide — introduce Webspirio as a digital agency for Ukrainian entrepreneurs in Germany. Starts empty; first advance reveals the logo + tagline.',
        background: 'transparent',
        showCenterLogo: true,
        fragments: 1,
      },
    ],
  },
  {
    id: 'act-cases',
    slides: [
      {
        id: 'act-results',
        component: ActResultsSlide,
        title: 'Акт II — Реальні результати',
        notes: [
          'Секційний роздільник перед блоком кейсів.',
          'Переходимо від “хто ми” до конкретних проєктів: Auto Eder, Küchen Fokus, Olga Gatlin, Nail Salon.',
          'Мета: задати очікування — далі цифри, терміни, технології.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
      },
    ],
  },
  {
    id: 'act-brand',
    slides: [
      {
        id: 'act-brand-divider',
        component: ActBrandSlide,
        title: 'Акт III — Бренд під ключ',
        notes: [
          'Секційний роздільник перед блоком брендингу.',
          'Ключовий меседж: один партнер робить усе — від назви та логотипа до друкованих візиток.',
          'Далі: повний пайплайн створення бренду і преміальні візитки.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
      },
    ],
  },
  {
    id: 'act-products',
    slides: [
      {
        id: 'act-products-divider',
        component: ActProductsSlide,
        title: 'Акт IV — Наші продукти',
        notes: [
          'Секційний роздільник перед блоком продуктів і живих демо.',
          'Далі: Korvo (AI-чатбот), Clickwise (GDPR-аналітика), порівняння з SaaS.',
          'Підкреслити: це власні продукти, а не перепродаж чужих SaaS.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
      },
    ],
  },
  {
    id: 'act-services',
    slides: [
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
    ],
  },
]

function App() {
  return <Presentation columns={columns} />
}

export default App
