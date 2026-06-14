import {createClient} from '@sanity/client'
import {execFile} from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {promisify} from 'node:util'
import {fileURLToPath} from 'node:url'

const execFileAsync = promisify(execFile)
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioDir = path.resolve(scriptDir, '..')

loadEnv(path.join(studioDir, '.env'))

const dryRun = process.argv.includes('--dry-run')
const catalogDbPath =
  process.env.CATALOG_DB_PATH ||
  'C:\\Users\\lin\\AppData\\Roaming\\Adobe\\InDesign\\Version 21.0-J\\zh_CN\\Scripts\\Scripts Panel\\catalog.db'
const productImageDir =
  process.env.PRODUCT_IMAGE_DIR ||
  'C:\\Users\\lin\\Desktop\\extract\\cropped_products\\cropped_images_updated\\redrawn-white'
const logoDir = process.env.LOGO_DIR || 'C:\\Users\\lin\\Desktop\\extract\\2x'
const webpOutputDir = path.join(os.tmpdir(), 'prophetchef-catalog-webp')
const maxImageBytes = 300 * 1024

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_EDITOR_TOKEN

const client = token
  ? createClient({
      projectId,
      dataset,
      token,
      apiVersion: '2026-05-05',
      useCdn: false,
    })
  : null

const categories = [
  {
    id: 'category-tabletop-built-in-induction',
    name: 'Tabletop & Built-in Induction Equipment',
    slug: 'tabletop-built-in-induction-equipment',
    description:
      'Built-in and tabletop induction cooktops, wok cookers, griddles, fryers, pasta cookers and multi-zone hobs.',
    pageIds: [1, 2, 3, 4, 5, 6, 7, 8, 14],
    orderRank: 1,
  },
  {
    id: 'category-automatic-cooking-machines',
    name: 'Automatic Cooking Machines',
    slug: 'automatic-cooking-machines',
    description:
      'Automatic wok and cooking machines for standardized output, open kitchens and high-efficiency foodservice lines.',
    pageIds: [9, 10, 11, 12, 13],
    orderRank: 2,
  },
  {
    id: 'category-steamers-ovens-soup-kettles',
    name: 'Steamers, Ovens & Soup Kettles',
    slug: 'steamers-ovens-soup-kettles',
    description:
      'Commercial steamers, steaming ovens, soup cookers and rice steaming equipment for institutional kitchens.',
    pageIds: [15, 16, 21, 22, 23, 24, 25, 26],
    orderRank: 3,
  },
  {
    id: 'category-freestanding-wok-soup-cookers',
    name: 'Freestanding Wok & Soup Cookers',
    slug: 'freestanding-wok-soup-cookers',
    description:
      'Floor-standing induction wok stoves, wok cookers and soup cookers for heavy-duty restaurant operation.',
    pageIds: [17, 18, 19, 20],
    orderRank: 4,
  },
  {
    id: 'category-freestanding-induction-line',
    name: 'Freestanding Induction Line',
    slug: 'freestanding-induction-line',
    description:
      'Freestanding induction hobs, fryers, griddles, pasta cookers and bratt pans for modular commercial kitchens.',
    pageIds: [27, 28, 29, 30, 31],
    orderRank: 5,
  },
  {
    id: 'category-specialty-cooking-equipment',
    name: 'Specialty Cooking Equipment',
    slug: 'specialty-cooking-equipment',
    description:
      'Specialty induction griddles and electric grills for focused menu concepts and project-based kitchen lines.',
    pageIds: [32, 33, 34],
    orderRank: 6,
  },
]

const categoryByPageId = new Map(
  categories.flatMap((category) => category.pageIds.map((pageId) => [pageId, category])),
)

const legacyCategoryIds = [
  'category-countertop-induction',
  'category-commercial-wok-ranges',
  'category-claypot-burners',
  'category-built-in-induction',
  'category-fryers-griddles',
  'category-noodle-steaming',
]

const defaultFeatures = [
  'Commercial induction heating for consistent daily output',
  'Stainless steel construction for demanding kitchen environments',
  'Multiple model configurations available for project matching',
  'OEM / ODM customization and export support available',
]

const defaultFaqs = [
  {
    question: 'Can ProphetChef customize this product for a project?',
    answer:
      'Yes. ProphetChef supports project-based customization for electrical configuration, model selection and OEM branding.',
  },
  {
    question: 'How do I choose the right model?',
    answer:
      'Send your menu, kitchen layout and target power supply. Our team will recommend suitable models from the available specification table.',
  },
]

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    process.env[key] ||= value
  }
}

function toSlug(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function key(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`
}

function basename(value) {
  return value ? path.basename(value.replaceAll('\\', '/')) : ''
}

function slugifyFileName(fileName) {
  return fileName
    .normalize('NFKD')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function compactObject(input) {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ''))
}

function specValue(label, value, unit) {
  if (!value) return undefined
  return unit ? `${value} ${unit}` : value
}

async function readCatalog() {
  const pythonCode = `
import json, sqlite3, sys
db_path = sys.argv[1]
con = sqlite3.connect(db_path)
con.row_factory = sqlite3.Row
pages = [dict(row) for row in con.execute('select * from catalog_page order by sort_order, page_no')]
specs = [dict(row) for row in con.execute('select * from product_spec order by page_id, sort_order, spec_id')]
print(json.dumps({'pages': pages, 'specs': specs}, ensure_ascii=False))
`
  const {stdout} = await execFileAsync('python', ['-c', pythonCode, catalogDbPath], {
    maxBuffer: 1024 * 1024 * 16,
    windowsHide: true,
    env: {...process.env, PYTHONIOENCODING: 'utf-8'},
  })
  return JSON.parse(stdout)
}

function resolveImageFile(fileRef) {
  const fileName = basename(fileRef)
  const filePath = path.join(productImageDir, fileName)
  return {fileName, filePath, exists: Boolean(fileName && fs.existsSync(filePath))}
}

function assertInputs(catalog) {
  const referencedImages = new Set()
  for (const page of catalog.pages) {
    if (page.hero_image_path) referencedImages.add(basename(page.hero_image_path))
    if (page.three_view_image_path) referencedImages.add(basename(page.three_view_image_path))
  }
  for (const spec of catalog.specs) {
    if (spec.source_image) referencedImages.add(basename(spec.source_image))
  }
  const missingImages = Array.from(referencedImages).filter((fileName) => !fs.existsSync(path.join(productImageDir, fileName)))
  const duplicateSlugs = findDuplicateSlugs(catalog.pages)
  const missingCategories = catalog.pages.filter((page) => !categoryByPageId.has(page.page_id)).map((page) => page.page_id)

  console.log(`Catalog pages: ${catalog.pages.length}`)
  console.log(`Variant rows: ${catalog.specs.length}`)
  console.log(`Referenced images: ${referencedImages.size}`)
  console.log(`Missing images: ${missingImages.length}`)
  console.log(`Duplicate generated slugs: ${duplicateSlugs.length}`)
  console.log(`Unmapped category page IDs: ${missingCategories.length}`)

  if (missingImages.length) console.log(missingImages.join('\n'))
  if (duplicateSlugs.length) console.log(duplicateSlugs.join('\n'))
  if (missingCategories.length) console.log(missingCategories.join(', '))

  if (missingImages.length || duplicateSlugs.length || missingCategories.length) {
    throw new Error('Catalog validation failed.')
  }

  if (!fs.existsSync(path.join(logoDir, 'logo-white.png'))) throw new Error('Missing logo-white.png.')
  if (!fs.existsSync(path.join(logoDir, 'logo-black.png'))) throw new Error('Missing logo-black.png.')
}

function findDuplicateSlugs(pages) {
  const seen = new Set()
  const duplicates = new Set()
  for (const page of pages) {
    const slug = productSlug(page)
    if (seen.has(slug)) duplicates.add(slug)
    seen.add(slug)
  }
  return Array.from(duplicates)
}

function productSlug(page) {
  return `${toSlug(page.main_title_en)}-p${page.page_no}`
}

async function compressToWebp(inputPath) {
  fs.mkdirSync(webpOutputDir, {recursive: true})
  const outputName = `${slugifyFileName(path.basename(inputPath, path.extname(inputPath)))}.webp`
  const outputPath = path.join(webpOutputDir, outputName)
  const attempts = [
    {quality: 84, width: 1600},
    {quality: 78, width: 1400},
    {quality: 72, width: 1200},
    {quality: 66, width: 1000},
    {quality: 60, width: 900},
    {quality: 54, width: 800},
    {quality: 48, width: 720},
    {quality: 42, width: 640},
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

    const size = fs.statSync(outputPath).size
    if (size <= maxImageBytes) {
      return {outputPath, outputName, size, quality: attempt.quality, width: attempt.width}
    }
  }

  const size = fs.statSync(outputPath).size
  throw new Error(`${path.basename(inputPath)} is still ${(size / 1024).toFixed(1)}KB after WebP compression.`)
}

function collectUploadImagePaths(catalog) {
  const paths = new Map()
  paths.set(path.join(logoDir, 'logo-white.png'), 'ProphetChef logo')
  paths.set(path.join(logoDir, 'logo-black.png'), 'ProphetChef logo')
  for (const page of catalog.pages) {
    for (const ref of [page.hero_image_path, page.three_view_image_path]) {
      if (!ref) continue
      const image = resolveImageFile(ref)
      if (image.exists) paths.set(image.filePath, page.main_title_en)
    }
  }
  for (const spec of catalog.specs) {
    if (!spec.source_image) continue
    const image = resolveImageFile(spec.source_image)
    if (image.exists) paths.set(image.filePath, spec.product_name_en || spec.model_code || 'ProphetChef product')
  }
  return paths
}

async function verifyWebpCompression(catalog) {
  const paths = collectUploadImagePaths(catalog)
  let largest = {name: '', size: 0}
  for (const [filePath] of paths) {
    const result = await compressToWebp(filePath)
    if (result.size > largest.size) {
      largest = {name: result.outputName, size: result.size}
    }
  }
  console.log(`WebP compression verified: ${paths.size} files`)
  console.log(`Largest compressed image: ${largest.name} (${(largest.size / 1024).toFixed(1)}KB)`)
}

async function uploadImage(filePath, alt, cache) {
  const cacheKey = filePath
  if (!cache.has(cacheKey)) {
    const compressed = await compressToWebp(filePath)
    const asset = await client.assets.upload('image', fs.readFileSync(compressed.outputPath), {
      filename: compressed.outputName,
      contentType: 'image/webp',
      label: alt,
    })
    cache.set(cacheKey, asset._id)
    console.log(`Uploaded ${path.basename(filePath)} -> ${compressed.outputName} (${(compressed.size / 1024).toFixed(1)}KB)`)
  }
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: cache.get(cacheKey)},
    alt,
  }
}

function buildDescription(page, variantCount) {
  const base = page.subtitle_en || page.product_performance_en || page.product_design_en
  if (base) return base
  return `${page.main_title_en} from ProphetChef for commercial kitchen projects, available in ${variantCount} model configuration${variantCount === 1 ? '' : 's'}.`
}

function buildTags(page, category) {
  return Array.from(new Set(['ProphetChef', 'Commercial Kitchen Equipment', 'Induction', category.name, page.main_title_en]))
}

function buildSpecifications(page, variants) {
  const specs = [
    ['Series', page.main_title_en],
    ['Available Models', String(variants.length)],
  ]
  const powerValues = Array.from(new Set(variants.map((variant) => variant.powerKw).filter(Boolean)))
  const voltageValues = Array.from(new Set(variants.map((variant) => variant.voltageV).filter(Boolean)))
  if (powerValues.length) specs.push(['Power Range', powerValues.join(' / ') + ' kW'])
  if (voltageValues.length) specs.push(['Voltage Options', voltageValues.join(' / ') + ' V'])
  return specs.map(([label, value], index) => ({
    _key: key(`spec-${page.page_id}`, index),
    _type: 'productSpecification',
    label,
    value,
  }))
}

function buildVariant(spec, index) {
  return compactObject({
    _key: key(`variant-${spec.page_id}`, index),
    _type: 'productVariant',
    productNameEn: spec.product_name_en,
    productNameZh: spec.product_name_zh,
    modelCode: spec.model_code || `Model ${index + 1}`,
    lengthMm: spec.length_mm,
    widthMm: spec.width_mm,
    heightMm: spec.height_mm,
    powerKw: spec.power_kw,
    voltageV: spec.voltage_v,
    frequencyHz: spec.frequency_hz,
    extraLabelEn: spec.extra_label_en,
    extraValue: spec.extra_value,
    extraUnit: spec.extra_unit,
    sourceImage: basename(spec.source_image),
    sourceNote: spec.source_note,
    needsReview: Boolean(spec.needs_review),
    orderRank: spec.sort_order,
  })
}

async function buildDocuments(catalog) {
  const imageCache = new Map()
  const specsByPageId = new Map()
  for (const spec of catalog.specs) {
    if (!specsByPageId.has(spec.page_id)) specsByPageId.set(spec.page_id, [])
    specsByPageId.get(spec.page_id).push(spec)
  }

  const logoLight = await uploadImage(path.join(logoDir, 'logo-white.png'), 'ProphetChef logo', imageCache)
  const logoDark = await uploadImage(path.join(logoDir, 'logo-black.png'), 'ProphetChef logo', imageCache)
  const productsHeroPage = catalog.pages.find((page) => page.page_id === 28) || catalog.pages[0]
  const productsHero = await uploadImage(
    resolveImageFile(productsHeroPage.hero_image_path).filePath,
    'ProphetChef commercial induction product line',
    imageCache,
  )

  const categoryDocs = []
  for (const category of categories) {
    const firstPage = catalog.pages.find((page) => category.pageIds.includes(page.page_id))
    const cover = firstPage ? resolveImageFile(firstPage.hero_image_path) : undefined
    categoryDocs.push({
      _id: category.id,
      _type: 'category',
      name: category.name,
      slug: {_type: 'slug', current: category.slug},
      description: category.description,
      image: cover?.exists ? await uploadImage(cover.filePath, category.name, imageCache) : undefined,
      orderRank: category.orderRank,
    })
  }

  const productDocs = []
  for (const page of catalog.pages) {
    const category = categoryByPageId.get(page.page_id)
    const pageSpecs = specsByPageId.get(page.page_id) || []
    const variants = pageSpecs.map(buildVariant)
    const hero = resolveImageFile(page.hero_image_path)
    const galleryFiles = new Map()
    if (page.three_view_image_path) {
      const threeView = resolveImageFile(page.three_view_image_path)
      galleryFiles.set(threeView.fileName, {filePath: threeView.filePath, alt: page.three_view_title_en || `${page.main_title_en} view`})
    }
    for (const spec of pageSpecs) {
      const image = resolveImageFile(spec.source_image)
      if (image.exists && image.fileName !== hero.fileName) {
        galleryFiles.set(image.fileName, {filePath: image.filePath, alt: spec.product_name_en || page.main_title_en})
      }
    }

    const gallery = []
    let galleryIndex = 0
    for (const [fileName, image] of galleryFiles) {
      gallery.push({
        ...(await uploadImage(image.filePath, image.alt, imageCache)),
        _key: key(`gallery-${page.page_id}`, galleryIndex),
      })
      galleryIndex += 1
    }

    productDocs.push({
      _id: `product-catalog-page-${page.page_id}`,
      _type: 'product',
      name: page.main_title_en,
      nameZh: page.main_title_zh,
      slug: {_type: 'slug', current: productSlug(page)},
      category: {_type: 'reference', _ref: category.id},
      description: buildDescription(page, variants.length),
      coverImage: await uploadImage(hero.filePath, page.main_title_en, imageCache),
      gallery,
      features: defaultFeatures.map((title, index) => ({
        _key: key(`feature-${page.page_id}`, index),
        _type: 'productFeature',
        title,
      })),
      specifications: buildSpecifications(page, variants),
      tags: buildTags(page, category),
      modelCode: variants.length === 1 ? variants[0].modelCode : undefined,
      variants,
      faqs: defaultFaqs.map((faq, index) => ({
        _key: key(`faq-${page.page_id}`, index),
        _type: 'faqItem',
        ...faq,
      })),
      catalogPageId: page.page_id,
      catalogPageNo: page.page_no,
      catalogPageCode: page.page_code,
      sourceNote: page.source_note,
      orderRank: page.sort_order,
      isArchived: false,
      seo: {
        _type: 'seo',
        metaTitle: `${page.main_title_en} | ProphetChef`,
        metaDescription: buildDescription(page, variants.length).slice(0, 155),
      },
    })
  }

  const featuredProducts = productDocs.slice(0, 8).map((product) => ({
    _type: 'reference',
    _ref: product._id,
    _key: product._id,
  }))

  const pagePatches = [
    {
      _id: 'siteSettings',
      patch: {
        set: {
          title: 'ProphetChef',
          legalName: 'ProphetChef',
          description:
            'ProphetChef manufactures commercial induction cooking equipment, automatic cooking machines, steamers, fryers, griddles and specialty kitchen equipment for global foodservice projects.',
          siteUrl: 'https://prophetchef.com',
          logo: logoLight,
          logoLight,
          logoDark,
          'globalSeo.openGraphImage': productsHero,
          footerProductLinks: categories.map((category, index) => ({
            _key: key('footer-product', index),
            _type: 'navigationLink',
            label: category.name,
            href: `/products?category=${category.slug}`,
          })),
          'globalCta.title': 'Need a ProphetChef product recommendation?',
          'globalCta.description':
            'Share your menu, kitchen layout and target power supply. Our export team will match the right commercial induction equipment and model configuration.',
          'globalCta.whatsappMessage':
            'Hello ProphetChef, I would like to request a quote for commercial kitchen equipment.',
        },
      },
    },
    {
      _id: 'homePage',
      patch: {
        set: {
          title: 'ProphetChef Homepage',
          'hero.eyebrow': 'Commercial Induction Kitchen Equipment',
          'hero.title': 'ProphetChef Commercial Cooking Equipment for Global Foodservice Projects',
          'hero.description':
            'Explore factory-direct induction cooktops, wok cookers, automatic cooking machines, steamers, fryers, griddles and specialty equipment.',
          'hero.trustTags': ['OEM / ODM Available', 'Commercial Induction Specialists', 'Export Project Support'],
          'categorySection.title': 'ProphetChef Product Lines',
          'categorySection.description':
            'Browse commercial induction equipment families built for restaurants, hotels, canteens, central kitchens and foodservice contractors.',
          featuredCategories: categories.map((category) => ({
            _type: 'reference',
            _ref: category.id,
            _key: category.id,
          })),
          'featuredProductsSection.title': 'Featured ProphetChef Equipment Series',
          featuredProducts,
        },
      },
    },
    {
      _id: 'productsPage',
      patch: {
        set: {
          title: 'Products',
          'hero.eyebrow': 'Products',
          'hero.title': 'ProphetChef Commercial Kitchen Equipment',
          'hero.description':
            'Review 34 product series and 168 model configurations from the ProphetChef commercial induction equipment catalog.',
          'hero.backgroundImage': productsHero,
          metrics: [
            {_key: 'products-metric-01', _type: 'statItem', label: 'Product series', value: '34', icon: 'settings'},
            {_key: 'products-metric-02', _type: 'statItem', label: 'Model variants', value: '168', icon: 'clipboardCheck'},
            {_key: 'products-metric-03', _type: 'statItem', label: 'OEM / ODM', value: '', icon: 'badgeCheck'},
          ],
        },
      },
    },
  ]

  return {categoryDocs, productDocs, pagePatches}
}

async function main() {
  const catalog = await readCatalog()
  assertInputs(catalog)

  if (dryRun) {
    await verifyWebpCompression(catalog)
    const reviewRows = catalog.specs.filter((spec) => spec.needs_review)
    console.log(`Rows marked needs_review: ${reviewRows.length}`)
    console.log('Dry run complete. No Sanity documents were changed.')
    return
  }

  if (!client) {
    throw new Error('Missing SANITY_WRITE_TOKEN or SANITY_API_EDITOR_TOKEN.')
  }

  const {categoryDocs, productDocs, pagePatches} = await buildDocuments(catalog)
  const newProductIds = new Set(productDocs.map((product) => product._id))
  const existingProducts = await client.fetch(`*[_type == "product"]{_id}`)
  const existingLegacyCategories = await client.fetch(`*[_type == "category" && _id in $ids]._id`, {
    ids: legacyCategoryIds,
  })

  let transaction = client.transaction()
  for (const product of existingProducts) {
    if (!newProductIds.has(product._id)) {
      transaction = transaction.patch(product._id, {
        set: {isArchived: true},
        unset: ['coverImage', 'gallery', 'category'],
      })
    }
  }
  for (const doc of categoryDocs) transaction = transaction.createOrReplace(doc)
  for (const doc of productDocs) transaction = transaction.createOrReplace(doc)
  for (const legacyCategoryId of existingLegacyCategories) {
    transaction = transaction.patch(legacyCategoryId, {unset: ['image']})
  }
  for (const {patch, _id} of pagePatches) transaction = transaction.patch(_id, patch)
  await transaction.commit()

  console.log(`Imported ${categoryDocs.length} categories and ${productDocs.length} products into ${projectId}/${dataset}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
