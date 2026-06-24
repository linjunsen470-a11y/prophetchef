import { createClient } from '@sanity/client'
import { execFile } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import {
  catalogProductOverrides,
  getCatalogProductName,
  getCatalogProductSlug,
  toSlug,
} from './catalogProductIdentity.mjs'

const execFileAsync = promisify(execFile)
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioDir = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(studioDir, '..')
const galleryDir = path.join(repoRoot, 'gallery')
const webpOutputDir = path.join(os.tmpdir(), 'prophetchef-gallery-webp')
const redirectsFile = path.join(repoRoot, 'my-app', 'data', 'product-slug-redirects.ts')
const maxImageBytes = 300 * 1024

loadEnv(path.join(studioDir, '.env'))

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_EDITOR_TOKEN

if (!token) {
  throw new Error('Missing SANITY_WRITE_TOKEN or SANITY_API_EDITOR_TOKEN.')
}

const client = createClient({
  projectId,
  dataset,
  token,
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

function slugifyFileName(fileName) {
  return fileName
    .normalize('NFKD')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

async function compressToWebp(inputPath, outputPath) {
  const attempts = [
    { quality: 82, width: 1600 },
    { quality: 76, width: 1400 },
    { quality: 70, width: 1200 },
    { quality: 64, width: 1000 },
    { quality: 58, width: 900 },
    { quality: 52, width: 800 },
    { quality: 46, width: 720 },
  ]

  for (const attempt of attempts) {
    await execFileAsync(
      'ffmpeg',
      [
        '-y',
        '-i',
        inputPath,
        '-vf',
        `scale='min(${attempt.width},iw)':-2:flags=lanczos`,
        '-c:v',
        'libwebp',
        '-quality',
        String(attempt.quality),
        '-compression_level',
        '6',
        '-preset',
        'picture',
        outputPath,
      ],
      { windowsHide: true, maxBuffer: 1024 * 1024 * 8 },
    )

    const size = fs.statSync(outputPath).size
    if (size <= maxImageBytes) {
      return { size, ...attempt }
    }
  }

  const size = fs.statSync(outputPath).size
  throw new Error(`${path.basename(inputPath)} is still ${(size / 1024).toFixed(1)}KB after compression.`)
}

async function uploadGalleryCover(fileName, alt) {
  const inputPath = path.join(galleryDir, fileName)
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing gallery image: ${inputPath}`)
  }

  fs.mkdirSync(webpOutputDir, { recursive: true })
  const baseName = `${slugifyFileName(path.basename(fileName, path.extname(fileName)))}.webp`
  const outputPath = path.join(webpOutputDir, baseName)
  const result = await compressToWebp(inputPath, outputPath)
  const buffer = fs.readFileSync(outputPath)
  const asset = await client.assets.upload('image', buffer, {
    filename: baseName,
    contentType: 'image/webp',
    label: alt,
  })

  console.log(
    `Uploaded ${fileName} -> ${baseName} (${(result.size / 1024).toFixed(1)}KB, q${result.quality}, ${result.width}px max)`,
  )

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}

function resolveSlugRename(product) {
  const override = catalogProductOverrides[product.catalogPageId]
  const newName = override?.name || product.name
  const newSlug = override?.slug || toSlug(product.name)
  const oldSlug = product.slug

  if (oldSlug === newSlug && product.name === newName) {
    return null
  }

  return { oldSlug, newSlug, newName }
}

function writeRedirectsFile(redirects) {
  const lines = redirects
    .sort((a, b) => a.from.localeCompare(b.from))
    .map(({ from, to }) => `  { from: "${from}", to: "${to}" },`)
    .join('\n')

  const content = `export const productSlugRedirects = [\n${lines}\n] as const;\n`
  fs.writeFileSync(redirectsFile, content, 'utf8')
  console.log(`Wrote ${redirects.length} redirects to ${redirectsFile}`)
}

const products = await client.fetch(`*[_type == "product" && defined(catalogPageId) && slug.current match "*-p*"]{
  _id,
  name,
  "slug": slug.current,
  catalogPageId
} | order(catalogPageId asc)`)

const reservedSlugs = new Set(
  (
    await client.fetch(`*[_type == "product" && !defined(catalogPageId)].slug.current`)
  ).filter(Boolean),
)

const renames = []
for (const product of products) {
  const rename = resolveSlugRename(product)
  if (!rename) continue

  if (reservedSlugs.has(rename.newSlug)) {
    throw new Error(`Slug collision: ${rename.newSlug} already used by a legacy product.`)
  }

  renames.push({ _id: product._id, catalogPageId: product.catalogPageId, ...rename })
}

const slugOwners = new Map()
for (const rename of renames) {
  if (slugOwners.has(rename.newSlug)) {
    throw new Error(`Duplicate target slug ${rename.newSlug}`)
  }
  slugOwners.set(rename.newSlug, rename._id)
}

console.log(`Preparing ${renames.length} slug renames...`)

const transaction = client.transaction()

for (const rename of renames) {
  transaction.patch(rename._id, {
    set: {
      name: rename.newName,
      slug: { _type: 'slug', current: rename.newSlug },
      'seo.metaTitle': `${rename.newName} | ProphetChef`,
    },
  })
  console.log(`${rename.oldSlug} -> ${rename.newSlug} (${rename.newName})`)
}

const wokCooktopCover = await uploadGalleryCover(
  '8-main-Induction_Built-in_Cooktop.png',
  catalogProductOverrides[2].name,
)

transaction.patch('product-catalog-page-2', {
  set: {
    coverImage: wokCooktopCover,
  },
})

await transaction.commit()
console.log(`Committed ${renames.length} slug renames and updated built-in wok cover image.`)

writeRedirectsFile(
  renames.map(({ oldSlug, newSlug }) => ({
    from: oldSlug,
    to: newSlug,
  })),
)