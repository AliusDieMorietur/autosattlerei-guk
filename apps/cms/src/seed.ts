import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const CMS_URL = (process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '')
const CMS_EMAIL = process.env.CMS_EMAIL || ''
const CMS_PASSWORD = process.env.CMS_PASSWORD || ''

if (!CMS_EMAIL || !CMS_PASSWORD) {
  console.error('CMS_EMAIL and CMS_PASSWORD env vars are required')
  process.exit(1)
}

type SlideTranslations = {
  de: { title: string; description: string }
  en: { title: string; description: string }
  ru: { title: string; description: string }
  ua: { title: string; description: string }
}

type CardTranslations = {
  de: { title: string }
  en: { title: string }
  ru: { title: string }
  ua: { title: string }
}

const SERVICE_CARDS: (CardTranslations & { image: string; slug: string })[] = [
  {
    image: 'cards/1.webp',
    slug: 'salons',
    de: { title: 'Innenräume' },
    en: { title: 'Interiors' },
    ru: { title: 'Интерьеры' },
    ua: { title: 'Салони' },
  },
  {
    image: 'cards/2.webp',
    slug: 'dash-board',
    de: { title: 'Armaturenbretter' },
    en: { title: 'Dashboards' },
    ru: { title: 'Приборные панели' },
    ua: { title: 'Панелі приладів' },
  },
  {
    image: 'cards/3.webp',
    slug: 'roof',
    de: { title: 'Himmel' },
    en: { title: 'Headliners' },
    ru: { title: 'Потолки' },
    ua: { title: 'Стелі' },
  },
  {
    image: 'cards/4.webp',
    slug: 'wheel',
    de: { title: 'Lenkräder' },
    en: { title: 'Steering Wheels' },
    ru: { title: 'Рулевые колеса' },
    ua: { title: 'Керма' },
  },
  {
    image: 'cards/5.webp',
    slug: 'moto-seat',
    de: { title: 'Motorradsitze' },
    en: { title: 'Motorcycle Seats' },
    ru: { title: 'Мотоциклетные сиденья' },
    ua: { title: 'Сидіння мотоциклів' },
  },
  {
    image: 'cards/6.webp',
    slug: 'door-panel',
    de: { title: 'Türverkleidungen' },
    en: { title: 'Door Panels' },
    ru: { title: 'Дверные панели' },
    ua: { title: 'Дверні карти' },
  },
]

const SLIDES: (SlideTranslations & { image: string })[] = [
  {
    image: 'main_page_card (1).webp',
    de: {
      title: 'Fahrzeuginnenausstattung',
      description:
        'Verleihen Sie Ihrem Auto ein neues Leben mit hochwertiger Innenausstattung. Wir verwenden nur erstklassige Materialien für ein makelloses Ergebnis.',
    },
    en: {
      title: 'Car Interior Upholstery',
      description:
        'Give your car a new life with high-quality interior upholstery. We use only premium materials for a flawless result.',
    },
    ru: {
      title: 'Обивка автомобильного интерьера',
      description:
        'Оживите свой автомобиль с помощью высококачественной обивки интерьера. Мы используем только премиальные материалы для безупречного результата.',
    },
    ua: {
      title: 'Перетяжка салону автомобіля',
      description:
        'Надайте вашому автомобілю нове життя завдяки високоякісній перетяжці салону. Ми використовуємо лише преміальні матеріали для бездоганного результату.',
    },
  },
  {
    image: 'main_page_card (2).webp',
    de: {
      title: 'Oldtimer-Restaurierung',
      description:
        'Wir restaurieren Oldtimer zu ihrem ursprünglichen Glanz. Außergewöhnliche Liebe zum Detail und authentische Materialien.',
    },
    en: {
      title: 'Classic Car Restoration',
      description:
        'We restore classic cars to their original brilliance. Exceptional attention to detail and authentic materials.',
    },
    ru: {
      title: 'Реставрация классических автомобилей',
      description:
        'Мы восстанавливаем классические автомобили до их первоначального блеска. Исключительное внимание к деталям и аутентичные материалы.',
    },
    ua: {
      title: 'Реставрація класичних авто',
      description:
        'Ми відновлюємо класичні автомобілі до їхньої початкової досконалості. Особлива увага до деталей та автентичні матеріали.',
    },
  },
  {
    image: 'main_page_card (3).webp',
    de: {
      title: 'Himmelpolsterung',
      description:
        'Professioneller Ersatz und Aktualisierung der Himmelpolsterung. Schaffen Sie eine komfortable und stilvolle Atmosphäre in Ihrem Auto.',
    },
    en: {
      title: 'Headliner Upholstery',
      description:
        'Professional replacement and updating of headliner upholstery. Create a comfortable and stylish atmosphere in your car.',
    },
    ru: {
      title: 'Обивка потолка',
      description:
        'Профессиональная замена и обновление обивки потолка. Создайте комфортную и стильную атмосферу в своем автомобиле.',
    },
    ua: {
      title: 'Перетяжка стелі салону',
      description:
        'Професійна заміна та оновлення обшивки стелі. Створіть комфортну та стильну атмосферу у вашому автомобілі.',
    },
  },
  {
    image: 'main_page_card (4).webp',
    de: {
      title: 'Lenkradpolsterung',
      description:
        'Machen Sie jede Fahrt komfortabel und stilvoll. Wir polstern Lenkräder mit hochwertigen Materialien, die nach Ihrem Geschmack angepasst werden.',
    },
    en: {
      title: 'Steering Wheel Upholstery',
      description:
        'Make every drive comfortable and stylish. We upholster steering wheels with quality materials tailored to your taste.',
    },
    ru: {
      title: 'Обивка рулевого колеса',
      description:
        'Сделайте каждую поездку комфортной и стильной. Мы обиваем рулевые колеса качественными материалами, соответствующими вашему вкусу.',
    },
    ua: {
      title: 'Перетяжка керма',
      description:
        'Зробіть кожну поїздку комфортною та стильною. Ми перетягуємо керма якісними матеріалами, підібраними за вашим смаком.',
    },
  },
  {
    image: 'main_page_card (5).webp',
    de: {
      title: 'Motorradsitzpolsterung',
      description:
        'Eine persönliche Herangehensweise an jeden Sitz. Langlebige und stilvolle Materialien für Ihren Komfort und individuellen Look.',
    },
    en: {
      title: 'Motorcycle Seat Upholstery',
      description:
        'A personalized approach to every seat. Durable and stylish materials for your comfort and unique look.',
    },
    ru: {
      title: 'Обивка мотоциклетного сиденья',
      description:
        'Индивидуальный подход к каждому сиденью. Прочные и стильные материалы для вашего комфорта и уникального внешнего вида.',
    },
    ua: {
      title: 'Перетяжка сидінь мотоцикла',
      description:
        'Індивідуальний підхід до кожного сидіння. Міцні та стильні матеріали для вашого комфорту та унікального вигляду.',
    },
  },
  {
    image: 'main_page_card (6).webp',
    de: {
      title: 'Türverkleidungspolsterung',
      description:
        'Wir erneuern Türverkleidungen und verleihen Ihrem Fahrzeuginterieur Eleganz und Perfektion.',
    },
    en: {
      title: 'Door Panel Upholstery',
      description:
        'We update door panels, adding elegance and perfection to your car\'s interior.',
    },
    ru: {
      title: 'Обивка дверных панелей',
      description:
        'Мы обновляем дверные панели, добавляя элегантность и совершенство интерьеру вашего автомобиля.',
    },
    ua: {
      title: 'Перетяжка дверних карт',
      description:
        'Ми оновлюємо дверні карти, додаючи елегантності та довершеності інтер\'єру вашого автомобіля.',
    },
  },
  {
    image: 'main_page_card (7).webp',
    de: {
      title: 'Weitere Dienstleistungen',
      description:
        'Wir bieten eine Vielzahl von Dienstleistungen für Ihr Auto an: von Fußmatten bis hin zu einzigartigen Designlösungen. Kontaktieren Sie uns für eine Beratung!',
    },
    en: {
      title: 'Other Services',
      description:
        'We offer a wide range of services for your car: from floor mats to unique design solutions. Contact us for a consultation!',
    },
    ru: {
      title: 'Другие услуги',
      description:
        'Мы предлагаем широкий спектр услуг для вашего автомобиля: от ковриков до уникальных дизайнерских решений. Свяжитесь с нами для консультации!',
    },
    ua: {
      title: 'Інші послуги',
      description:
        'Ми пропонуємо широкий спектр послуг для вашого авто: від килимків до унікальних дизайнерських рішень. Зверніться до нас за консультацією!',
    },
  },
]

type GallerySectionSeed = {
  slug: string
  order: number
  de: { title: string; description: string }
  en: { title: string; description: string }
  ru: { title: string; description: string }
  ua: { title: string; description: string }
  imagePaths: string[]
}

const GALLERY_SECTIONS: GallerySectionSeed[] = [
  {
    slug: 'wheel',
    order: 1,
    de: {
      title: 'Lenkräder',
      description: 'Showcases von Lenkrädern in verschiedenster Komplexität und aus unterschiedlichen Materialien.',
    },
    en: {
      title: 'Steering Wheels',
      description: 'Showcases of steering wheels in various complexity and different materials.',
    },
    ru: {
      title: 'Рулевые колёса',
      description: 'Примеры работ по перетяжке рулевых колёс различной сложности и из различных материалов.',
    },
    ua: {
      title: 'Керма',
      description: 'Приклади робіт з перетяжки керма різної складності та з різних матеріалів.',
    },
    imagePaths: [
      ...Array.from({ length: 5 }, (_, i) => `gallery_page_wheel/gallery_page_wheel_slide(${i + 1}).webp`),
      ...Array.from({ length: 10 }, (_, i) => `wheel_page/wheel_page_grid(${i + 1}).webp`),
    ],
  },
  {
    slug: 'door-panel',
    order: 2,
    de: {
      title: 'Türverkleidungen',
      description: 'Showcases von neu bezogenen Türverkleidungen in verschiedenster Komplexität und aus unterschiedlichen Materialien.',
    },
    en: {
      title: 'Door Panels',
      description: 'Showcases of reupholstered door panels in various complexity and different materials.',
    },
    ru: {
      title: 'Дверные панели',
      description: 'Примеры работ по перетяжке дверных панелей различной сложности и из различных материалов.',
    },
    ua: {
      title: 'Дверні карти',
      description: 'Приклади робіт з перетяжки дверних карт різної складності та з різних матеріалів.',
    },
    imagePaths: [
      ...Array.from({ length: 7 }, (_, i) => `gallery_page_door_panel/gallery_page_door_panel_slide(${i + 1}).webp`),
      ...Array.from({ length: 7 }, (_, i) => `door_panel_page/door_panel_page_grid(${i + 1}).webp`),
    ],
  },
  {
    slug: 'salon',
    order: 3,
    de: {
      title: 'Innenräume',
      description: 'Showcases von neu bezogenen Fahrzeuginnenräumen in verschiedenster Komplexität. Verschiedene Arten von Innenräumen, verschiedene Stile aus allen möglichen Materialien.',
    },
    en: {
      title: 'Interiors',
      description: 'Showcases of reupholstered car interiors in various complexity. Different styles from all kinds of materials — from classics to supercars.',
    },
    ru: {
      title: 'Интерьеры',
      description: 'Примеры работ по перетяжке автомобильных интерьеров различной сложности. Различные стили из всевозможных материалов.',
    },
    ua: {
      title: 'Салони',
      description: 'Приклади робіт з перетяжки автомобільних салонів різної складності. Різні стилі з різноманітних матеріалів.',
    },
    imagePaths: [10, 5, 8, 16, 7, 11, 4].flatMap((qty, gi) =>
      Array.from({ length: qty }, (_, i) => `salon_slide/salon${gi + 1}/slide(${i + 1}).webp`),
    ),
  },
]

async function login(): Promise<string> {
  const res = await fetch(`${CMS_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: CMS_EMAIL, password: CMS_PASSWORD }),
  })
  const data = await res.json() as { token?: string; errors?: unknown }
  if (!res.ok || !data.token) throw new Error(`Login failed: ${JSON.stringify(data)}`)
  console.log('Logged in successfully')
  return data.token
}

async function uploadMedia(token: string, filePath: string, name: string, alt: string): Promise<number> {
  const buffer = fs.readFileSync(filePath)
  const formData = new FormData()
  formData.append('file', new Blob([buffer], { type: 'image/webp' }), name)
  formData.append('_payload', JSON.stringify({ alt }))

  const res = await fetch(`${CMS_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })
  const data = await res.json() as { doc?: { id: number }; errors?: unknown }
  if (!res.ok || !data.doc) throw new Error(`Media upload failed for ${name}: ${JSON.stringify(data)}`)
  return data.doc.id
}

async function clearCollection(token: string, collection: string) {
  const res = await fetch(`${CMS_URL}/api/${collection}?limit=1000`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json() as { docs?: { id: number }[] }
  const docs = data.docs ?? []
  console.log(`Deleting ${docs.length} ${collection} records...`)
  for (const doc of docs) {
    await fetch(`${CMS_URL}/api/${collection}/${doc.id}`, {
      method: 'DELETE',
      headers: { Authorization: `JWT ${token}` },
    })
  }
}

async function seed() {
  const token = await login()

  console.log('Clearing existing data...')
  await clearCollection(token, 'gallery-sections')
  await clearCollection(token, 'media')

  // --- Slides ---
  type SlideItemAll = {
    title: Record<string, string>
    description: Record<string, string>
    media: number
  }
  const slideItemsAll: SlideItemAll[] = []

  for (const slide of SLIDES) {
    const imagePath = path.resolve(dirname, '../../website/public/main_page', slide.image)
    const name = slide.image.replace(/\s/g, '_')
    console.log(`Uploading slide media: ${slide.image}`)
    const mediaId = await uploadMedia(token, imagePath, name, slide.de.title)

    slideItemsAll.push({
      title: { de: slide.de.title, en: slide.en.title, ru: slide.ru.title, ua: slide.ua.title },
      description: { de: slide.de.description, en: slide.en.description, ru: slide.ru.description, ua: slide.ua.description },
      media: mediaId,
    })
  }

  console.log('Setting slides global (all locales)')
  await fetch(`${CMS_URL}/api/globals/slides?locale=all`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ slides: slideItemsAll }),
  })

  // --- Service Cards ---
  type CardItemAll = { title: Record<string, string>; slug: string; media: number }
  const cardItemsAll: CardItemAll[] = []

  for (const card of SERVICE_CARDS) {
    const imagePath = path.resolve(dirname, '../../website/public/main_page', card.image)
    const name = card.image.replace(/\//g, '_')
    console.log(`Uploading card media: ${card.image}`)
    const mediaId = await uploadMedia(token, imagePath, name, card.de.title)

    cardItemsAll.push({
      title: { de: card.de.title, en: card.en.title, ru: card.ru.title, ua: card.ua.title },
      slug: card.slug,
      media: mediaId,
    })
  }

  console.log('Setting service-cards global (all locales)')
  await fetch(`${CMS_URL}/api/globals/service-cards?locale=all`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ cards: cardItemsAll }),
  })

  // --- Gallery Sections ---
  const publicBase = path.resolve(dirname, '../../website/public')

  for (const section of GALLERY_SECTIONS) {
    const imageRefs: { media: number }[] = []
    for (const relPath of section.imagePaths) {
      const imagePath = path.resolve(publicBase, relPath)
      const name = relPath.replace(/\//g, '_')
      console.log(`Uploading gallery media: ${relPath}`)
      const mediaId = await uploadMedia(token, imagePath, name, name)
      imageRefs.push({ media: mediaId })
    }

    console.log(`Creating gallery section (all locales): ${section.de.title}`)
    const sectionRes = await fetch(`${CMS_URL}/api/gallery-sections?locale=all`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { de: section.de.title, en: section.en.title, ru: section.ru.title, ua: section.ua.title },
        description: { de: section.de.description, en: section.en.description, ru: section.ru.description, ua: section.ua.description },
        slug: section.slug,
        order: section.order,
        images: imageRefs,
      }),
    })
    const sectionData = await sectionRes.json() as { doc?: { id: number } }
    if (!sectionData.doc) throw new Error(`Failed to create gallery section: ${JSON.stringify(sectionData)}`)
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
