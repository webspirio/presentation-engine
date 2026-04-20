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
import { LrDividerSlide } from '@/slides/22-LrDivider'
import { LrSituationSlide } from '@/slides/23-LrSituation'
import { LrVisionSlide } from '@/slides/24-LrVision'
import { LrArchitectureSlide } from '@/slides/25-LrArchitecture'
import { LrFunnelSlide } from '@/slides/26-LrFunnel'
import { LrFunnelInteractiveSlide } from '@/slides/27-LrFunnelInteractive'
import { OfferSlide } from '@/slides/28-Offer'
import { ThanksSlide } from '@/slides/29-Thanks'
import { TeamSlide } from '@/slides/30-Team'

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
          'Міні-кейс Велнес-бренд — TikTok-воронка, 15–25 Reels/тиждень.',
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
          'Міні-кейс Küchen Fokus — повний бренд + сайт за 6 тижнів.',
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
          'Міні-кейс Велнес-бренд · email nurture — 4 послідовності (DE/RU × продукт/партнерство), 5–7 листів кожна.',
        ].join('\n'),
      },
    ],
  },
  {
    // Act 3 · Kitchen-Fokus case story — slides 11-17.
    // 11 = divider, 12-17 = the six-slide Küchen Fokus narrative (Hook → Tension → Ask → Journey → After → Punchline).
    // The unified CTA close lives at the end of Act 3Б (LR column) so it serves both case narratives.
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
    ],
  },
  {
    // Act 3Б · Кейс №2 — LR Health & Beauty (slides 22-27) + unified CTA close.
    // Paired with Küchen Fokus: KF = brand/site deliverable, LR = sales-funnel/automation deliverable.
    // The trailing case-cta slide closes BOTH case narratives — raised-logo treatment anchors the moment.
    id: 'act-case-lr',
    slides: [
      {
        id: 'lr-divider',
        component: LrDividerSlide,
        title: 'Кейс 2 · Розділ',
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Секційний роздільник — від історії Küchen Fokus переходимо до другого кейсу.',
          'Eyebrow: «АКТ III · КЕЙС №2». Заголовок: «Від підписників до продажів».',
          'Caption: «Media factory funnel».',
          'Пара до Küchen Fokus: KF = бренд/сайт, Кейс 2 = воронка/автоматизація.',
        ].join('\n'),
      },
      {
        id: 'lr-situation',
        component: LrSituationSlide,
        title: 'Кейс 2 · Ситуація',
        fragments: 2,
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Ситуація клієнта — переповненість, а не тиша.',
          'Fr 0: заголовок «Актив уже є.» + підзаголовок «Рук — не вистачає.»',
          'Fr 1: 23 000 підписників TikTok (анімований лічильник) + три ланки: магазин · партнерське посилання · міні-курс. Все є, але сиплеться через руки.',
          'Fr 2: leak-лінія «Клієнти пишуть щодня. Часу відповідати — вже немає. А контенту треба ще більше.» + кутова бульбашка «Не встигаю відповідати».',
          'Voice-over: прямо сказати — клієнти ПИШУТЬ, це не тиша. Проблема в тому, що власник не встигає їх обробляти + хоче постити більше контенту. Ось пара болів, які ми розвʼязуємо далі (Vision + Voronka).',
          'Callback до Акту 2 (Привабити) — та сама 23K аудиторія, тепер показуємо чому вона не перетворюється на клієнтів.',
        ].join('\n'),
      },
      {
        id: 'lr-vision',
        component: LrVisionSlide,
        title: 'Кейс 2 · Візія',
        fragments: 3,
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Обіцянка в 4 кроки.',
          'Fr 0: заголовок «Воронка, яка працює без тебе.» + підзаголовок «Чотири кроки — від першого Reels до гарячого ліда.»',
          'Fr 1: чотири картки з іконками — AI створює → Бот веде → Автофільтр → Гарячі до тебе.',
          'Fr 2: градієнтний бейдж «70% менше ручної роботи».',
          'Fr 3: фінальна лінія «Ти працюєш тільки з тими, хто готовий купити.»',
        ].join('\n'),
      },
      {
        id: 'lr-architecture',
        component: LrArchitectureSlide,
        title: 'Кейс 2 · Архітектура',
        fragments: 3,
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Три шари архітектури — зверху вниз.',
          'Fr 0: заголовок «Три шари — один рух.» + підзаголовок «Контент → Мозок → Дія. Один інструмент замість десяти.»',
          'Fr 1: Шар 1 — Контент: Reels · Stories · TikTok.',
          'Fr 2: Шар 2 — Мозок (одна платформа): Бот · CRM · Календар · Email · WhatsApp. Виділений візуально — це ядро системи.',
          'Fr 3: Шар 3 — Дії: Магазин · Реєстрація · Консультація. Плюс фінальна лінія «Кожен лід — у CRM. Нічого не губиться.»',
          'Деталі бот-flow і bridge-page — voice-over, не на слайді. Глибша розмова — на дзвінку.',
        ].join('\n'),
      },
      {
        id: 'lr-funnel',
        component: LrFunnelSlide,
        title: 'Кейс 2 · Воронка',
        fragments: 2,
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Канонічний шлях клієнта — 5 вузлів, 4 звʼязки.',
          'Fr 0: заголовок «Один клік — і клієнт у воронці.» + підзаголовок «Шлях одного клієнта — від Reels до консультації.» + всі 5 вузлів зʼявляються поруч (ще без звʼязків).',
          'Fr 1: 4 ребра малюються по черзі — Reels → Бот → Мостова → Календар → Консультація. Показуємо, як це все зʼєднано.',
          'Fr 2: вузол «Консультація» пульсує + фінальна лінія «1–2 хвилини. Без людини.» — швидкість воронки.',
          'Короткий огляд — детальна мапа на наступному слайді.',
        ].join('\n'),
      },
      {
        id: 'lr-funnel-interactive',
        component: LrFunnelInteractiveSlide,
        title: 'Кейс 2 · Повна мапа',
        fragments: 5,
        background: 'transparent',
        showCenterLogo: false,
        notes: [
          'Інтерактивна мапа воронки — порт з .reference/media-factory/src/funnel.jsx, переведена на українську та перефарбована у cyan-палітру.',
          'Fr 0: вільна взаємодія — аудиторія (або презентер) клікає точку входу (Instagram/Facebook/TikTok) і будує шлях крок за кроком.',
          'Fr 1: підсвітлюється маршрут «⚡ Швидкий продаж» — Reels → Бот → Календар → Консультація.',
          'Fr 2: маршрут «🛍️ Купівля продукту» — через мостову → магазин.',
          'Fr 3: маршрут «🤝 Партнерство» — через email-серію → реєстрація.',
          'Fr 4: маршрут «❄️ Прогрів холодного» — 14–30 днів email + Telegram → повернення.',
          'Fr 5: маршрут «🎵 TikTok» — 23K → біо → мостова → конверсія.',
          'Ключова думка: одна система — пʼять різних шляхів клієнта.',
        ].join('\n'),
      },
      {
        id: 'case-cta',
        component: CaseCtaSlide,
        title: 'Кейс · CTA',
        showCenterLogo: true,
        background: 'transparent',
        notes: [
          'Unified CTA — закриває обидві кейс-історії (KF + LR).',
          'Логотип Webspirio піднімається догори (як у hero), під ним: «Один партнер. Повний пакет. Один дзвінок.»',
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
      {
        id: 'team',
        component: TeamSlide,
        title: 'Команда',
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Команда — хто насправді будує.',
          'Founder + crew: Олександр великий ліворуч, четверо праворуч у 2×2.',
          'Олександр — Засновник · Tech Lead · Fullstack (глю, відповідальність, архітектура).',
          'Ірина — CRM-розробник (системи запису і облік).',
          'Максим — Frontend-розробник (інтерфейси, UI-інженерія).',
          'Андрій — Дизайнер (бренд, UI, друк).',
          'Анастасія — Контент · соцмережі (поки монограма, фото замінимо пізніше).',
          'Voice-over: «За мною — не я один. Іра будує CRM, Макс — фронтенд, Андрій робить, щоб усе виглядало як бренд, Настя веде контент. Я — склеюю і тягну відповідальність.»',
          'Фінал: «Пʼятеро людей. Один стандарт. Один партнер.» — містить місток до Offer.',
        ].join('\n'),
      },
    ],
  },
  {
    // Act 5 · Offer + Close — slides 28-29. The ask.
    // Consultative: quote per project scope (no pricing slide). UA WELL members get −20% off.
    id: 'act-close',
    slides: [
      {
        id: 'offer',
        component: OfferSlide,
        title: 'Пропозиція',
        fragments: 2,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Акт 5/5 — Пропозиція (~40с).',
          'Fr 0: eyebrow «ПРОПОЗИЦІЯ» + headline «Для учасників UA WELL — розмова і рішення безкоштовно.»',
          'Fr 1: три ✓ важелі по черзі — 30–60 хв розмова · покажу рішення · −20% від фінальної ціни.',
          'Fr 2: QR зʼявляється разом зі стрічкою принципів (DSGVO · Фіксована ціна · Один партнер · Все належить вам).',
          'Voice-over: прямо сказати — «ваша черга. Десь 30-60 хвилин. Якщо є задача — покажу безкоштовне рішення. Якщо підходить — мінус 20 для UA WELL».',
          'Тримати паузу на QR — дати сканерам ~5 секунд.',
        ].join('\n'),
      },
      {
        id: 'thanks',
        component: ThanksSlide,
        title: 'Дякую',
        fragments: 1,
        showCenterLogo: false,
        background: 'transparent',
        notes: [
          'Фінал (~30с) — заради Q&A.',
          'Fr 0: велике «Дякую.» з мʼяким глоу-пульсом.',
          'Fr 1: «Питання?» + два Telegram-чіпи — @webspirio (бізнес) і @swefd (напряму). Нижче — сайт і email. Маленький QR у правому нижньому куті — для тих, хто сканує вже зараз.',
          'Voice-over: «Напишіть у Telegram — відповідаю особисто. А на розмову — ось той самий QR, нікуди не загубиться».',
          'Якщо зал активний — живе Q&A. Якщо мовчать — «каву на коридорі, я тут до кінця».',
        ].join('\n'),
      },
    ],
  },
]

function App() {
  return <Presentation columns={columns} />
}

export default App
