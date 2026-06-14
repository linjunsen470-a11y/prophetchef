import {createClient} from '@sanity/client'
import {execFile} from 'node:child_process'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {promisify} from 'node:util'
import {fileURLToPath} from 'node:url'

const execFileAsync = promisify(execFile)

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioDir = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(studioDir, '..')
const galleryDir = path.join(repoRoot, 'gallery')
const outputDir = path.join(os.tmpdir(), 'prophetchef-gallery-webp')
const maxBytes = 300 * 1024

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

const productImages = [
  ['countertop-flat-induction', '台式平面.png'],
  ['countertop-concave-induction', '台式凹面.png'],
  ['countertop-flat-6-key', '台式平面-6按键.png'],
  ['countertop-concave-6-key', '台式凹面-6按键.png'],
  ['dual-burner-countertop-flat', '台式平面-双头炉.png'],
  ['dual-burner-countertop-concave', '台式双头凹面炉.png'],
  ['countertop-flat-concave-combo', '台式一平一凹炉.png'],
  ['countertop-induction-pc-668', '台式炉-668.png'],
  ['countertop-induction-pc-670', '台式炉-670.png'],
  ['single-burner-wok-range', '单头小炒.png'],
  ['single-burner-wok-single-tail', '单头单尾小炒.png'],
  ['single-burner-flat-top-range', '单头平头炉.png'],
  ['single-burner-large-wok', '单头大炒.png'],
  ['single-tail-wok-with-large-wok', '单尾小炒连大炒.png'],
  ['dual-burner-flat-top-range-compact', '双头平头.png'],
  ['dual-burner-wok-single-tail', '双头单尾小炒.png'],
  ['dual-burner-wok-double-tail', '双头双尾小炒.png'],
  ['dual-burner-flat-top-commercial', '双头平头炉.png'],
  ['dual-burner-large-wok', '双头大炒.png'],
  ['4-burner-claypot-stove', '四头煲仔炉.png'],
  ['6-burner-claypot-stove', '六头煲仔炉.png'],
  ['built-in-flat-induction', '嵌入平面炉.png'],
  ['built-in-concave-induction', '嵌入凹面炉.png'],
  ['built-in-flat-top-module', '平底炉.png'],
  ['built-in-induction-control-panel', '嵌入控制面板.png'],
  ['countertop-induction-fryer', '台式炸炉.png'],
  ['single-tank-dual-basket-fryer', '单缸双筛炸炉（万向轮）正面.png'],
  ['commercial-griddle', '扒炉.png'],
  ['countertop-commercial-griddle', '台式扒炉.png'],
  ['9-hole-noodle-cooker', '九孔煮面炉.png'],
  ['4-hole-countertop-noodle-cooker', '台式四孔煮面炉.png'],
  ['commercial-bun-steamer', '蒸包炉.png'],
  ['rice-noodle-roll-steamer', '肠粉炉.png'],
  ['integrated-soup-stock-cooker', '一体式煲汤炉.png'],
]

const galleryImages = new Map([
  [
    'single-tank-dual-basket-fryer',
    [
      ['单缸双筛炸炉.png', 'Single Tank Dual Basket Commercial Fryer view 2'],
      ['单缸双筛炸炉（万向轮）侧面.png', 'Single Tank Dual Basket Commercial Fryer side view'],
    ],
  ],
])

function loadEnv(envPath) {
  if (!fsSync.existsSync(envPath)) return

  const lines = fsSync.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
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

async function fileSize(filePath) {
  const stat = await fs.stat(filePath)
  return stat.size
}

async function compressToWebp(inputPath, outputPath) {
  const attempts = [
    {quality: 82, width: 1600},
    {quality: 76, width: 1400},
    {quality: 70, width: 1200},
    {quality: 64, width: 1000},
    {quality: 58, width: 900},
    {quality: 52, width: 800},
    {quality: 46, width: 720},
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
      {windowsHide: true, maxBuffer: 1024 * 1024 * 8},
    )

    const size = await fileSize(outputPath)
    if (size <= maxBytes) {
      return {size, ...attempt}
    }
  }

  const size = await fileSize(outputPath)
  throw new Error(`${path.basename(inputPath)} is still ${(size / 1024).toFixed(1)}KB after compression.`)
}

async function uploadImage(fileName, alt) {
  const inputPath = path.join(galleryDir, fileName)
  if (!fsSync.existsSync(inputPath)) {
    throw new Error(`Missing gallery image: ${fileName}`)
  }

  await fs.mkdir(outputDir, {recursive: true})
  const baseName = `${slugifyFileName(path.basename(fileName, path.extname(fileName)))}.webp`
  const outputPath = path.join(outputDir, baseName)
  const result = await compressToWebp(inputPath, outputPath)
  const buffer = await fs.readFile(outputPath)
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
    asset: {_type: 'reference', _ref: asset._id},
    alt,
  }
}

function imageKey(slug, index) {
  return `gallery-${slug}-${String(index + 1).padStart(2, '0')}`
}

const slugs = productImages.map(([slug]) => slug)
const products = await client.fetch(
  `*[_type == "product" && slug.current in $slugs]{_id, name, "slug": slug.current}`,
  {slugs},
)
const productBySlug = new Map(products.map((product) => [product.slug, product]))
const transaction = client.transaction()
let patchedCount = 0

for (const [slug, fileName] of productImages) {
  const product = productBySlug.get(slug)
  if (!product) {
    console.warn(`Skipped ${slug}: product not found in Sanity.`)
    continue
  }

  const coverImage = await uploadImage(fileName, product.name)
  const set = {coverImage}
  const extraGallery = galleryImages.get(slug)
  if (extraGallery) {
    set.gallery = []
    for (const [index, [galleryFile, alt]] of extraGallery.entries()) {
      set.gallery.push({
        ...(await uploadImage(galleryFile, alt)),
        _key: imageKey(slug, index),
      })
    }
  }

  transaction.patch(product._id, {set})
  patchedCount += 1
}

await transaction.commit()

console.log(`Patched ${patchedCount} product documents in ${projectId}/${dataset}.`)
