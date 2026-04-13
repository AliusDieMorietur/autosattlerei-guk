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

type ServiceCardSeed = {
  image: string
  slug: string
  title: string
}

type SlideSeed = {
  image: string
  title: string
  description: string
}

type GallerySectionSeed = {
  slug: string
  order: number
  title: string
  description: string
  imagePaths: string[]
}

const SERVICE_CARDS: ServiceCardSeed[] = [
  { image: 'cards/1.webp', slug: 'salons', title: 'Innenräume' },
  { image: 'cards/2.webp', slug: 'dash-board', title: 'Armaturenbretter' },
  { image: 'cards/3.webp', slug: 'roof', title: 'Himmel' },
  { image: 'cards/4.webp', slug: 'wheel', title: 'Lenkräder' },
  { image: 'cards/5.webp', slug: 'moto-seat', title: 'Motorradsitze' },
  { image: 'cards/6.webp', slug: 'door-panel', title: 'Türverkleidungen' },
]

const SLIDES: SlideSeed[] = [
  {
    image: 'main_page_card (1).webp',
    title: 'Fahrzeuginnenausstattung',
    description:
      'Verleihen Sie Ihrem Auto ein neues Leben mit hochwertiger Innenausstattung. Wir verwenden nur erstklassige Materialien für ein makelloses Ergebnis.',
  },
  {
    image: 'main_page_card (2).webp',
    title: 'Oldtimer-Restaurierung',
    description:
      'Wir restaurieren Oldtimer zu ihrem ursprünglichen Glanz. Außergewöhnliche Liebe zum Detail und authentische Materialien.',
  },
  {
    image: 'main_page_card (3).webp',
    title: 'Himmelpolsterung',
    description:
      'Professioneller Ersatz und Aktualisierung der Himmelpolsterung. Schaffen Sie eine komfortable und stilvolle Atmosphäre in Ihrem Auto.',
  },
  {
    image: 'main_page_card (4).webp',
    title: 'Lenkradpolsterung',
    description:
      'Machen Sie jede Fahrt komfortabel und stilvoll. Wir polstern Lenkräder mit hochwertigen Materialien, die nach Ihrem Geschmack angepasst werden.',
  },
  {
    image: 'main_page_card (5).webp',
    title: 'Motorradsitzpolsterung',
    description:
      'Eine persönliche Herangehensweise an jeden Sitz. Langlebige und stilvolle Materialien für Ihren Komfort und individuellen Look.',
  },
  {
    image: 'main_page_card (6).webp',
    title: 'Türverkleidungspolsterung',
    description:
      'Wir erneuern Türverkleidungen und verleihen Ihrem Fahrzeuginterieur Eleganz und Perfektion.',
  },
  {
    image: 'main_page_card (7).webp',
    title: 'Weitere Dienstleistungen',
    description:
      'Wir bieten eine Vielzahl von Dienstleistungen für Ihr Auto an: von Fußmatten bis hin zu einzigartigen Designlösungen. Kontaktieren Sie uns für eine Beratung!',
  },
]

const GALLERY_SECTIONS: GallerySectionSeed[] = [
  {
    slug: 'wheel',
    order: 1,
    title: 'Lenkräder',
    description:
      'Showcases von Lenkrädern in verschiedenster Komplexität und aus unterschiedlichen Materialien.',
    imagePaths: [
      ...Array.from({ length: 5 }, (_, i) => `gallery_page_wheel/gallery_page_wheel_slide(${i + 1}).webp`),
      ...Array.from({ length: 10 }, (_, i) => `wheel_page/wheel_page_grid(${i + 1}).webp`),
    ],
  },
  {
    slug: 'door-panel',
    order: 2,
    title: 'Türverkleidungen',
    description:
      'Showcases von neu bezogenen Türverkleidungen in verschiedenster Komplexität und aus unterschiedlichen Materialien.',
    imagePaths: [
      ...Array.from({ length: 7 }, (_, i) => `gallery_page_door_panel/gallery_page_door_panel_slide(${i + 1}).webp`),
      ...Array.from({ length: 7 }, (_, i) => `door_panel_page/door_panel_page_grid(${i + 1}).webp`),
    ],
  },
  {
    slug: 'salon',
    order: 3,
    title: 'Innenräume',
    description:
      'Showcases von neu bezogenen Fahrzeuginnenräumen in verschiedenster Komplexität. Verschiedene Arten von Innenräumen, verschiedene Stile aus allen möglichen Materialien.',
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
  const data = (await res.json()) as { token?: string }
  if (!res.ok || !data.token) throw new Error(`Login failed: ${JSON.stringify(data)}`)
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
  const data = (await res.json()) as { doc?: { id: number } }
  if (!res.ok || !data.doc) throw new Error(`Media upload failed for ${name}: ${JSON.stringify(data)}`)
  return data.doc.id
}

async function clearCollection(token: string, collection: string) {
  const res = await fetch(`${CMS_URL}/api/${collection}?limit=1000`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = (await res.json()) as { docs?: { id: number }[] }
  const docs = data.docs ?? []

  for (const doc of docs) {
    await fetch(`${CMS_URL}/api/${collection}/${doc.id}`, {
      method: 'DELETE',
      headers: { Authorization: `JWT ${token}` },
    })
  }
}

async function updateGlobal(token: string, slug: string, body: unknown) {
  const res = await fetch(`${CMS_URL}/api/globals/${slug}`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Failed to update global ${slug}: ${await res.text()}`)
  }
}

async function seed() {
  const token = await login()

  await clearCollection(token, 'gallery-sections')
  await clearCollection(token, 'blog-posts')
  await clearCollection(token, 'media')

  const slideItems: { title: string; description: string; media: number }[] = []

  for (const slide of SLIDES) {
    const imagePath = path.resolve(dirname, '../../website/public/main_page', slide.image)
    const name = slide.image.replace(/\s/g, '_')
    const mediaId = await uploadMedia(token, imagePath, name, slide.title)

    slideItems.push({
      title: slide.title,
      description: slide.description,
      media: mediaId,
    })
  }

  await updateGlobal(token, 'slides', { slides: slideItems })

  const cardItems: { title: string; slug: string; media: number }[] = []

  for (const card of SERVICE_CARDS) {
    const imagePath = path.resolve(dirname, '../../website/public/main_page', card.image)
    const name = card.image.replace(/\//g, '_')
    const mediaId = await uploadMedia(token, imagePath, name, card.title)

    cardItems.push({
      title: card.title,
      slug: card.slug,
      media: mediaId,
    })
  }

  await updateGlobal(token, 'service-cards', { cards: cardItems })

  const publicBase = path.resolve(dirname, '../../website/public')

  for (const section of GALLERY_SECTIONS) {
    const images: { media: number }[] = []

    for (const relPath of section.imagePaths) {
      const imagePath = path.resolve(publicBase, relPath)
      const name = relPath.replace(/\//g, '_')
      const mediaId = await uploadMedia(token, imagePath, name, name)
      images.push({ media: mediaId })
    }

    const sectionRes = await fetch(`${CMS_URL}/api/gallery-sections`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: section.title,
        description: section.description,
        slug: section.slug,
        order: section.order,
        images,
      }),
    })

    if (!sectionRes.ok) {
      throw new Error(`Failed to create gallery section ${section.slug}: ${await sectionRes.text()}`)
    }
  }

  console.log('Seed complete (de only)')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
