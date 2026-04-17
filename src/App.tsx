import { Presentation } from '@/engine/Presentation'
import type { ColumnConfig } from '@/engine/types'
import { HeroSlide } from '@/slides/01-Hero'
import { ProblemSlide } from '@/slides/02-Problem'
import { SolutionSlide } from '@/slides/03-Solution'
import { ActResultsSlide } from '@/slides/05-ActResults'
import { AttractStageSlide } from '@/slides/06-AttractStage'
import { InterestStageSlide } from '@/slides/07-InterestStage'
import { BookStageSlide } from '@/slides/08-BookStage'
import { ServeStageSlide } from '@/slides/09-ServeStage'
import { RetainStageSlide } from '@/slides/10-RetainStage'
import { ServicesConstellationSlide } from '@/slides/21-ServicesConstellation'

// 24-slide consultative sales deck — see docs/PROJECT_PLAN.md for the canonical spec.
// Only slides that have been authored are registered here; batches 2-9 add the rest.
const columns: ColumnConfig[] = [
  {
    // Act 1 · Meet + Frame — slides 1-5 (hero, hook, problem, solution, framework)
    id: 'act-intro',
    slides: [
      {
        id: 'hero',
        component: HeroSlide,
        title: 'Webspirio',
        notes: [
          'Вступ — теплий, peer-tone. Не агенція-презентація, а підприємець до підприємців.',
          'Фрагмент 1: тагліна «Від ідеї до цифрової екосистеми» з ворд-бай-ворд анімацією.',
          'Фрагмент 2: особиста лінія — «Я Олександр. 5 років будую цифрові системи для українських підприємців у Німеччині».',
          'Під таглайном — короткий стемп: «Сьогодні — 15 хв · Без води».',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: true,
        fragments: 2,
      },
      {
        id: 'problem',
        component: ProblemSlide,
        title: 'Проблема',
        notes: [
          'Емоційний «ось як воно зараз» — купа інструментів, які не говорять один з одним.',
          'Під кожним вузлом — плейн-UA підпис (CRM → «клієнти», ERP → «облік, рахунки, склад», AI → «AI-помічник»). Тех-публіка бачить акронім, нетех-публіка читає підпис.',
          'Три метрики внизу: 2 години/день на звіти, 5 систем не говорять, 14 днів онбординг.',
          'Фінал: «Звучить знайомо?» — пауза для впізнання.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
        fragments: 3,
      },
      {
        id: 'solution',
        component: SolutionSlide,
        title: 'Рішення',
        notes: [
          'Ті самі шість вузлів збираються в один ланцюг — нова рамка: customer journey.',
          'Headline: «Можна інакше. Один ланцюг — від першого контакту до повторного клієнта.»',
          'Caption: «Клієнт побачив → зайшов → записався → отримав нагадування → заплатив → повернувся.»',
          'Підпис під кожним вузлом ті самі, що на попередньому слайді — reassembling тих самих шести елементів.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
        fragments: 4,
      },
      // TODO batch 2: add hook slide (02-Hook) before problem and framework slide (05-Framework) after solution
    ],
  },
  {
    // Act 2 · Teaching — slides 6-10. Each stage: diagnostic question → leak → mini-case.
    // Foundation only; polish tasks add slide-specific visual accents.
    id: 'act-teach',
    slides: [
      {
        id: 'attract',
        component: AttractStageSlide,
        title: 'Привабити',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Етап 1/5 — Привабити.',
          'Діагностичне питання: «Звідки приходить ваш наступний клієнт?»',
          'Leak: більшість малих бізнесів інвестують в Insta/Ads наосліп.',
          'Міні-кейс LR Health & Beauty — TikTok-воронка, 15–25 Reels/тиждень.',
        ].join('\n'),
      },
      {
        id: 'interest',
        component: InterestStageSlide,
        title: 'Зацікавити',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Етап 2/5 — Зацікавити.',
          'Діагностичне питання: «Що бачить клієнт за перші 5 секунд на вашому сайті?»',
          'Leak: якщо не зрозуміло «що робите» і «чому довіряти» — він пішов.',
          'Міні-кейс Küchen Fokus — повний бренд + сайт за 6 тижнів. Voiceover: Olga Gatlin, 3 мови.',
        ].join('\n'),
      },
      {
        id: 'book',
        component: BookStageSlide,
        title: 'Записати',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Етап 3/5 — Записати.',
          'Діагностичне питання: «Як легко записатись до вас прямо зараз, о 11 вечора?»',
          'Leak: кожне пропущене повідомлення — втрачений клієнт.',
          'Міні-кейс Nail Salon (Мюнхен) — запис 24/7, автонагадування.',
        ].join('\n'),
      },
      {
        id: 'serve',
        component: ServeStageSlide,
        title: 'Обслужити',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Етап 4/5 — Обслужити.',
          'Діагностичне питання: «Чи можете ви обслужити вдвічі більше клієнтів без вдвічі більшої команди?»',
          'Leak: хаос замовлень і ручні рахунки — зростання коштує якості.',
          'Міні-кейс Auto Eder — Magento 2 + ERP, та сама команда, більше замовлень.',
        ].join('\n'),
      },
      {
        id: 'retain',
        component: RetainStageSlide,
        title: 'Повернути',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Етап 5/5 — Повернути.',
          'Діагностичне питання: «Скільки ваших клієнтів повертаються? Ви знаєте точно чи здогадуєтесь?»',
          'Leak: залучити нового — у 5× дорожче, ніж повернути старого.',
          'Міні-кейс LR email nurture — 4 послідовності (DE/RU × продукт/партнерство), 5–7 листів кожна.',
        ].join('\n'),
      },
    ],
  },
  {
    // Act 3 · Full cases — slides 11-15. ActResultsSlide serves as the section divider (slide 11).
    // TODO batches 5-6: add LR, Nail Salon, Auto Eder, Results summary after the divider.
    id: 'act-cases',
    slides: [
      {
        id: 'cases-divider',
        component: ActResultsSlide,
        title: 'Повна картина',
        notes: [
          'Секційний роздільник перед блоком повних кейсів.',
          'Три історії: LR Health & Beauty (флагман — €6k воронка), салон манікюру в Мюнхені, Auto Eder (технічний капстон).',
          'Мета: перейти від «теорії» 5-етапної рамки до конкретних цифр.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
      },
    ],
  },
  {
    // Act 4 · Match + Scope — slides 16-21. Services constellation = slide 17 (services grid).
    // TODO batches 7-8: add industry mapper (16), branding (18), Korvo+demo (19), Clickwise+demo (20), how-we-work (21).
    id: 'act-match',
    slides: [
      {
        id: 'services-grid',
        component: ServicesConstellationSlide,
        title: 'Послуги',
        showCenterLogo: true,
        notes: [
          'Вісім outcome-first карточок — формулювання українською, тех-стек як маленькі chips.',
          '1. «Облік, рахунки, склад — в одному вікні» · ERPNext · Invoice Ninja · Kimai',
          '2. «Система запису клієнтів» · Altegio · власні CRM',
          '3. «AI-асистент на сайті» · Korvo',
          '4. «Єдина скринька — WhatsApp + Instagram + Telegram» · native + custom',
          '5. «Автоматизація повторних задач» · n8n',
          '6. «Вебсайти та інтернет-магазини» · WordPress · Magento · WooCommerce',
          '7. «Аналітика без витоку даних» · Clickwise · Rybbit',
          '8. «Бренд і дизайн»',
          '',
          'Ключ: один партнер робить усе — не треба координувати пʼять фрілансерів.',
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
