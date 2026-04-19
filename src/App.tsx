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
import { CaseHookSlide } from '@/slides/12-CaseHook'
import { CaseTensionSlide } from '@/slides/13-CaseTension'
import { CaseAskSlide } from '@/slides/14-CaseAsk'
import { CaseJourneySlide } from '@/slides/15-CaseJourney'
import { CaseAfterSlide } from '@/slides/16-CaseAfter'
import { CaseCardSpinSlide } from '@/slides/17-CaseCardSpin'
import { CaseShirtSpinSlide } from '@/slides/18-CaseShirtSpin'
import { CasePunchlineSlide } from '@/slides/19-CasePunchline'
import { CaseCtaSlide } from '@/slides/20-CaseCta'
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
          '(Передвістя — повну історію Küchen Fokus розгорнемо в Акті 3, слайд 12+.)',
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
    // Act 3 · Kitchen-Fokus case story — slides 11-18.
    // 11 = divider, 12-18 = the seven-slide Küchen Fokus narrative (Hook → Tension → Ask → Journey → After → Punchline → CTA).
    // LR/Nail/Auto Eder mini-cases live inside Act 2 stage slides (6-10); full case slots are held by this single deep story.
    id: 'act-cases',
    slides: [
      {
        id: 'cases-divider',
        component: ActResultsSlide,
        title: 'Повна картина',
        notes: [
          'Секційний роздільник перед історією Küchen Fokus.',
          'Місток: від 5-етапної теорії — до живої історії одного підприємця.',
          'Одна глибока історія замість трьох поверхових кейсів.',
        ].join('\n'),
        background: 'transparent',
        showCenterLogo: false,
      },
      {
        id: 'case-hook',
        component: CaseHookSlide,
        title: 'Кейс · Hook',
        fragments: 4,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 1/7 — Hook (~20с).',
          'Fr 0: представляємо героя — «Власник невеликої майстерні. Робота якісна. Клієнти — переважно за рекомендаціями.»',
          'Силует у центрі — на нього ось-ось посипляться запити з усіх боків.',
          'Fr 1: бульбашка зліва — новий клієнт: «А сайт є? Хочу подивитись роботи».',
          'Fr 2: бульбашка справа — задоволений клієнт: «Дайте візитку — порекомендую друзям».',
          'Fr 3: дві нові бульбашки одночасно — «А відгуки десь почитати?» + «А де Вас знайти в Інтернеті?» — показуємо, що запитів багато.',
          'Fr 4: підпис — «Одні — хочуть порадити. Інші — побачити роботи. І так — щодня.»',
        ].join('\n'),
      },
      {
        id: 'case-tension',
        component: CaseTensionSlide,
        title: 'Кейс · Tension',
        fragments: 3,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 2/7 — Tension (~20с).',
          'Pivot «Але...»: ні назви, ні сайту, ні візитки — нічого дати в руки.',
          'Наголос на кожному — пауза між ударами.',
          'Recap-бульбашка в кутку — «...візитку? ...сайт?» — обидва прохання без відповіді.',
          'Фінальний підпис: «Інтерес завершується на порозі.»',
        ].join('\n'),
      },
      {
        id: 'case-ask',
        component: CaseAskSlide,
        title: 'Кейс · Ask',
        fragments: 1,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 3/7 — Ask (~10с).',
          'Цитата клієнта: «Хлопці, мені потрібно все. Я навіть не знаю, з чого почати.»',
          'Пауза після слова «почати» — дати словам осісти перед Journey.',
        ].join('\n'),
      },
      {
        id: 'case-journey',
        component: CaseJourneySlide,
        title: 'Кейс · Journey',
        fragments: 7,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 4/7 — Journey (~60с). Серцевина історії.',
          'Сім фрагментів, ~8с на кожен: Назва → Домен → Логотип → Сайт → Korvo AI → Візитка → Футболка.',
          'Не поспішати між фрагментами — анімація ≤1с, решта часу — мій голос.',
          'Fr 6: бульбашка з Hook падає на візитку — motif закривається.',
          'Fr 7: силует у футболці з логотипом на спині.',
        ].join('\n'),
      },
      {
        id: 'case-after',
        component: CaseAfterSlide,
        title: 'Кейс · Сайт',
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 5/9 — Сайт (~15с).',
          'Живий вбудований kuechenfokus.de — не скриншот, не мокап.',
          'Підпис: «Хтось шукає кухню в Розенхаймі — знаходить Küchen Fokus».',
          'Якщо сайт не встиг завантажитись — згадати коротко і перейти до візитки.',
        ].join('\n'),
      },
      {
        id: 'case-card-spin',
        component: CaseCardSpinSlide,
        title: 'Кейс · Візитка 3D',
        transition: 'fade',
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 6/8 — Візитка в 3D (~10с ambient).',
          'Фізична візитка Küchen Fokus, обидва боки. Покрутіть мишкою, щоб показати.',
          'Говорити про тактильність: «це не картинка в Figma — це дійсно друк, вага, матеріал».',
          'Не затримуватися — 5-10с, далі punchline.',
        ].join('\n'),
      },
      {
        id: 'case-shirt-spin',
        component: CaseShirtSpinSlide,
        title: 'Кейс · Футболка 3D',
        transition: 'fade',
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 7/9 — Футболка в 3D (~10с ambient).',
          'Бренд-одяг команди Küchen Fokus. Перед — логотип і назва; зворот — URL + тел.',
          'Говорити: «коли бригада заходить у підʼїзд — сусіди читають назву, перш ніж двері відкрились».',
          'Покрутити мишкою, показати обидва боки. Не затримуватися — далі punchline.',
        ].join('\n'),
      },
      {
        id: 'case-punchline',
        component: CasePunchlineSlide,
        title: 'Кейс · Punchline',
        fragments: 1,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Кейс 6/7 — Punchline (~10с).',
          '«Ми не робимо сайти. Ми робимо компанії видимими.»',
          'Тримати паузу після другого рядка — це єдина teaching-line цього акту.',
        ].join('\n'),
      },
      {
        id: 'case-cta',
        component: CaseCtaSlide,
        title: 'Кейс · CTA',
        showCenterLogo: true,
        background: 'transparent',
        notes: [
          'Кейс 7/7 — CTA (~5с).',
          'Логотип Webspirio + одна лінія: «Один партнер. Повний пакет. Один дзвінок.»',
          'Якщо зал мовчить — перехід в Q&A; якщо хтось киває — пропозиція розмови «після кави».',
        ].join('\n'),
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
