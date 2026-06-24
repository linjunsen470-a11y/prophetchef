import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioDir = path.resolve(scriptDir, '..')

loadEnv(path.join(studioDir, '.env'))

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '3kytazzh',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_EDITOR_TOKEN,
  apiVersion: '2026-05-05',
  useCdn: false,
})

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] ||= value
  }
}

const rows = await client.fetch(`*[
  _type == "product" &&
  !(_id in path("drafts.**"))
]{
  name,
  "slug": slug.current,
  "coverMime": coverImage.asset->mimeType,
  "coverSize": coverImage.asset->size,
  "gallery": gallery[]{
    "mime": asset->mimeType,
    "size": asset->size
  }
} | order(slug asc)`)

const maxBytes = 300 * 1024
const targetSlugs = [
  'countertop-flat-induction',
  'countertop-concave-induction',
  'countertop-flat-6-key',
  'countertop-concave-6-key',
  'dual-burner-countertop-flat',
  'dual-burner-countertop-concave',
  'countertop-flat-concave-combo',
  'countertop-induction-pc-668',
  'countertop-induction-pc-670',
  'single-burner-wok-range',
  'single-burner-wok-single-tail',
  'single-burner-flat-top-range',
  'single-burner-large-wok',
  'single-tail-wok-with-large-wok',
  'dual-burner-flat-top-range-compact',
  'dual-burner-wok-single-tail',
  'dual-burner-wok-double-tail',
  'dual-burner-flat-top-commercial',
  'dual-burner-large-wok',
  '4-burner-claypot-stove',
  '6-burner-claypot-stove',
  'built-in-flat-induction',
  'built-in-concave-induction',
  'built-in-flat-top-module',
  'built-in-induction-control-panel',
  'countertop-induction-fryer',
  'single-tank-dual-basket-fryer',
  'commercial-griddle',
  'countertop-commercial-griddle',
  '9-hole-noodle-cooker',
  '4-hole-countertop-noodle-cooker',
  'commercial-bun-steamer',
  'rice-noodle-roll-steamer',
  'integrated-soup-stock-cooker',
]

const targetRows = rows.filter((row) => targetSlugs.includes(row.slug))
const missingSlugs = targetSlugs.filter((slug) => !targetRows.some((row) => row.slug === slug))
const badCoverImages = targetRows.filter((row) => row.coverMime !== 'image/webp' || row.coverSize > maxBytes)
const badGalleryImages = targetRows.flatMap((row) =>
  (row.gallery || [])
    .filter((image) => image.mime !== 'image/webp' || image.size > maxBytes)
    .map((image) => ({slug: row.slug, ...image})),
)

console.log(
  JSON.stringify(
    {
      targetProductCount: targetRows.length,
      missingSlugs,
      badCoverImageCount: badCoverImages.length,
      badGalleryImageCount: badGalleryImages.length,
      badCoverImages,
      badGalleryImages,
    },
    null,
    2,
  ),
)
