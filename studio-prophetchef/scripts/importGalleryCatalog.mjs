import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const galleryDir = path.join(repoRoot, 'gallery')
const factoryDir = path.join(repoRoot, 'factory')

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token =
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_EDITOR_TOKEN ||
  process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error(
    'Missing Sanity write token. Set SANITY_WRITE_TOKEN or SANITY_API_EDITOR_TOKEN before running this script.',
  )
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-05-05',
  useCdn: false,
})

const imageCache = new Map()
const uploadQueue = []

function key(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`
}

function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadWithRetry(buffer, options, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await client.assets.upload('image', buffer, options)
    } catch (error) {
      const retryable = error?.statusCode === 429 || error?.statusCode >= 500
      if (!retryable || attempt === attempts) throw error
      const delay = Number(error?.response?.headers?.['retry-after'] || attempt) * 1000
      console.warn(`Upload throttled for ${options.filename}. Retrying in ${delay}ms...`)
      await sleep(delay)
    }
  }
  return undefined
}

async function uploadLocalImage(relativePath, alt) {
  const cacheKey = relativePath
  if (!imageCache.has(cacheKey)) {
    const filePath = path.join(galleryDir, relativePath)
    const factoryPath = path.join(factoryDir, relativePath)
    const resolvedPath = fs.existsSync(filePath) ? filePath : factoryPath
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Image not found: ${relativePath}`)
    }
    const buffer = fs.readFileSync(resolvedPath)
    const ext = path.extname(resolvedPath).toLowerCase()
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg'
    const asset = await uploadWithRetry(buffer, {
      filename: path.basename(resolvedPath),
      contentType,
    })
    imageCache.set(cacheKey, asset._id)
    await sleep(150)
  }
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: imageCache.get(cacheKey)},
    alt,
  }
}

async function queueImageUpload(relativePath, alt) {
  const task = uploadQueue.length
    ? uploadQueue[uploadQueue.length - 1].then(() => uploadLocalImage(relativePath, alt))
    : uploadLocalImage(relativePath, alt)
  uploadQueue.push(task)
  return task
}

const categories = [
  {
    id: 'category-countertop-induction',
    name: 'Countertop Induction Cookers',
    slug: 'countertop-induction',
    description:
      'High-power countertop induction cookers for prep stations, wok lines and modular cook suites.',
    coverFile: '台式平面.png',
    orderRank: 1,
  },
  {
    id: 'category-commercial-wok-ranges',
    name: 'Commercial Wok Ranges',
    slug: 'commercial-wok-ranges',
    description:
      'Single and dual burner wok ranges for restaurants, hotels and high-volume stir-fry production.',
    coverFile: '双头大炒.png',
    orderRank: 2,
  },
  {
    id: 'category-claypot-burners',
    name: 'Claypot Burners',
    slug: 'claypot-burners',
    description: 'Multi-burner claypot stoves for specialty rice dishes and fast-casual service lines.',
    coverFile: '六头煲仔炉.png',
    orderRank: 3,
  },
  {
    id: 'category-built-in-induction',
    name: 'Built-in Induction Cookers',
    slug: 'built-in-induction',
    description:
      'Built-in flat and concave induction modules for island kitchens and custom stainless projects.',
    coverFile: '嵌入平面炉.png',
    orderRank: 4,
  },
  {
    id: 'category-fryers-griddles',
    name: 'Fryers & Griddles',
    slug: 'fryers-griddles',
    description: 'Commercial fryers and griddles for quick-service restaurants and snack production lines.',
    coverFile: '单缸双筛炸炉（万向轮）正面.png',
    orderRank: 5,
  },
  {
    id: 'category-noodle-steaming',
    name: 'Noodle & Steaming Equipment',
    slug: 'noodle-steaming',
    description: 'Noodle cookers, steamers and specialty equipment for noodle shops and dim sum kitchens.',
    coverFile: '九孔煮面炉.png',
    orderRank: 6,
  },
]

const defaultFeatures = [
  'High thermal efficiency for commercial workloads',
  'Stainless steel body for daily kitchen operation',
  'Stable power control for consistent output',
  'OEM / ODM customization available',
]

const defaultSpecs = [
  ['Power', 'Contact for specifications'],
  ['Voltage', '380V / 220V (customizable)'],
  ['Material', 'Stainless steel'],
]

const defaultFaqs = [
  {
    question: 'Is OEM customization available?',
    answer:
      'Yes. ProphetChef supports OEM branding, electrical configuration and project-based customization for export orders.',
  },
  {
    question: 'What documents are provided for export?',
    answer:
      'We provide commercial invoices, packing lists and product compliance documents based on your destination market requirements.',
  },
]

function productTemplate({
  slug,
  name,
  categorySlug,
  description,
  coverFile,
  galleryFiles = [],
  tags = [],
  modelCode,
  orderRank,
}) {
  return {
    id: `product-${slug}`,
    slug,
    name,
    categorySlug,
    description,
    coverFile,
    galleryFiles,
    tags,
    modelCode,
    orderRank,
  }
}

const products = [
  productTemplate({
    slug: 'countertop-flat-induction',
    name: 'Countertop Flat Induction Cooker',
    categorySlug: 'countertop-induction',
    description:
      'ProphetChef countertop flat induction cooker for restaurant prep lines, hotel kitchens and catering stations.',
    coverFile: '台式平面.png',
    tags: ['Flat Top', 'Countertop', 'Induction'],
    orderRank: 1,
  }),
  productTemplate({
    slug: 'countertop-concave-induction',
    name: 'Countertop Concave Induction Wok Cooker',
    categorySlug: 'countertop-induction',
    description:
      'Concave induction wok cooker for stir-fry stations that need fast heat response and easy power adjustment.',
    coverFile: '台式凹面.png',
    tags: ['Concave', 'Wok', 'Induction'],
    orderRank: 2,
  }),
  productTemplate({
    slug: 'countertop-flat-6-key',
    name: 'Countertop Flat Induction Cooker (6-Key Control)',
    categorySlug: 'countertop-induction',
    description:
      'Flat induction cooker with 6-key control layout for operators who need quick preset power levels.',
    coverFile: '台式平面-6按键.png',
    tags: ['6-Key', 'Flat Top', 'Induction'],
    orderRank: 3,
  }),
  productTemplate({
    slug: 'countertop-concave-6-key',
    name: 'Countertop Concave Induction Cooker (6-Key Control)',
    categorySlug: 'countertop-induction',
    description:
      'Concave induction cooker with 6-key control for wok stations and high-turnover restaurant lines.',
    coverFile: '台式凹面-6按键.png',
    tags: ['6-Key', 'Concave', 'Induction'],
    orderRank: 4,
  }),
  productTemplate({
    slug: 'dual-burner-countertop-flat',
    name: 'Dual Burner Countertop Flat Induction Cooker',
    categorySlug: 'countertop-induction',
    description:
      'Dual flat induction burner unit for compact cooking lines that need two independent heat zones.',
    coverFile: '台式平面-双头炉.png',
    tags: ['Dual Burner', 'Flat Top', 'Induction'],
    orderRank: 5,
  }),
  productTemplate({
    slug: 'dual-burner-countertop-concave',
    name: 'Dual Burner Countertop Concave Induction Cooker',
    categorySlug: 'countertop-induction',
    description:
      'Dual concave induction cooker for restaurants running parallel wok stations on one countertop base.',
    coverFile: '台式双头凹面炉.png',
    tags: ['Dual Burner', 'Concave', 'Induction'],
    orderRank: 6,
  }),
  productTemplate({
    slug: 'countertop-flat-concave-combo',
    name: 'Countertop Flat & Concave Combo Induction Cooker',
    categorySlug: 'countertop-induction',
    description:
      'Combination flat and concave induction cooker for kitchens that need both saucepan and wok workflows.',
    coverFile: '台式一平一凹炉.png',
    tags: ['Combo', 'Flat + Concave', 'Induction'],
    orderRank: 7,
  }),
  productTemplate({
    slug: 'countertop-induction-pc-668',
    name: 'Countertop Induction Cooker PC-668',
    categorySlug: 'countertop-induction',
    description:
      'ProphetChef PC-668 countertop induction cooker for distributors and project buyers needing a compact export model.',
    coverFile: '台式炉-668.png',
    tags: ['PC-668', 'Countertop', 'Induction'],
    modelCode: 'PC-668',
    orderRank: 8,
  }),
  productTemplate({
    slug: 'countertop-induction-pc-670',
    name: 'Countertop Induction Cooker PC-670',
    categorySlug: 'countertop-induction',
    description:
      'ProphetChef PC-670 countertop induction cooker designed for stable daily use in commercial foodservice kitchens.',
    coverFile: '台式炉-670.png',
    tags: ['PC-670', 'Countertop', 'Induction'],
    modelCode: 'PC-670',
    orderRank: 9,
  }),
  productTemplate({
    slug: 'single-burner-wok-range',
    name: 'Single Burner Commercial Wok Range',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Single burner commercial wok range for restaurants, canteens and hotel kitchens with focused stir-fry output.',
    coverFile: '单头小炒.png',
    tags: ['Single Burner', 'Wok Range', 'Commercial'],
    orderRank: 10,
  }),
  productTemplate({
    slug: 'single-burner-wok-single-tail',
    name: 'Single Burner Wok Range with Single Tail',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Single burner wok range with one tail section for sauce prep, finishing and compact line layouts.',
    coverFile: '单头单尾小炒.png',
    tags: ['Single Tail', 'Wok Range', 'Commercial'],
    orderRank: 11,
  }),
  productTemplate({
    slug: 'single-burner-flat-top-range',
    name: 'Single Burner Flat-Top Wok Range',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Single burner flat-top range for operators who need a versatile commercial cooking surface beyond wok work.',
    coverFile: '单头平头炉.png',
    tags: ['Flat Top', 'Single Burner', 'Commercial'],
    orderRank: 12,
  }),
  productTemplate({
    slug: 'single-burner-large-wok',
    name: 'Single Burner Large Wok Range',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Large single-burner wok range for banquet kitchens, central food production and high-volume stir-fry service.',
    coverFile: '单头大炒.png',
    tags: ['Large Wok', 'Single Burner', 'Commercial'],
    orderRank: 13,
  }),
  productTemplate({
    slug: 'single-tail-wok-with-large-wok',
    name: 'Single-Tail Wok Range with Large Wok',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Wok range combining a large wok station with a tail section for finishing, sauce work and plating support.',
    coverFile: '单尾小炒连大炒.png',
    tags: ['Large Wok', 'Single Tail', 'Commercial'],
    orderRank: 14,
  }),
  productTemplate({
    slug: 'dual-burner-flat-top-range-compact',
    name: 'Dual Burner Flat-Top Wok Range (Compact)',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Space-saving dual flat-top wok range for medium-volume kitchens that need two burners in a compact footprint.',
    coverFile: '双头平头.png',
    tags: ['Compact', 'Dual Burner', 'Flat Top'],
    orderRank: 15,
  }),
  productTemplate({
    slug: 'dual-burner-wok-single-tail',
    name: 'Dual Burner Wok Range with Single Tail',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Dual burner wok range with one tail section for restaurants balancing stir-fry output and finishing tasks.',
    coverFile: '双头单尾小炒.png',
    tags: ['Dual Burner', 'Single Tail', 'Wok Range'],
    orderRank: 16,
  }),
  productTemplate({
    slug: 'dual-burner-wok-double-tail',
    name: 'Dual Burner Wok Range with Double Tail',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Dual burner wok range with double tail sections for busy kitchens that need dedicated finishing zones.',
    coverFile: '双头双尾小炒.png',
    tags: ['Dual Burner', 'Double Tail', 'Wok Range'],
    orderRank: 17,
  }),
  productTemplate({
    slug: 'dual-burner-flat-top-commercial',
    name: 'Dual Burner Flat-Top Commercial Range',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Full-scale dual flat-top commercial range for high-volume service lines and export project kitchens.',
    coverFile: '双头平头炉.png',
    tags: ['Commercial', 'Dual Burner', 'Flat Top'],
    orderRank: 18,
  }),
  productTemplate({
    slug: 'dual-burner-large-wok',
    name: 'Dual Burner Large Wok Range',
    categorySlug: 'commercial-wok-ranges',
    description:
      'Dual large wok range for hotels, catering centers and restaurants running parallel high-heat stir-fry production.',
    coverFile: '双头大炒.png',
    tags: ['Large Wok', 'Dual Burner', 'Commercial'],
    orderRank: 19,
  }),
  productTemplate({
    slug: '4-burner-claypot-stove',
    name: '4-Burner Claypot Stove',
    categorySlug: 'claypot-burners',
    description:
      'Four-burner claypot stove for specialty rice dishes, fast-casual concepts and compact specialty menus.',
    coverFile: '四头煲仔炉.png',
    tags: ['4-Burner', 'Claypot', 'Commercial'],
    orderRank: 20,
  }),
  productTemplate({
    slug: '6-burner-claypot-stove',
    name: '6-Burner Claypot Stove',
    categorySlug: 'claypot-burners',
    description:
      'Six-burner claypot stove for high-throughput claypot rice service and multi-flavor menu operations.',
    coverFile: '六头煲仔炉.png',
    tags: ['6-Burner', 'Claypot', 'Commercial'],
    orderRank: 21,
  }),
  productTemplate({
    slug: 'built-in-flat-induction',
    name: 'Built-in Flat Induction Cooker',
    categorySlug: 'built-in-induction',
    description:
      'Built-in flat induction module for island kitchens, buffet lines and custom stainless equipment projects.',
    coverFile: '嵌入平面炉.png',
    tags: ['Built-in', 'Flat Top', 'Induction'],
    orderRank: 22,
  }),
  productTemplate({
    slug: 'built-in-concave-induction',
    name: 'Built-in Concave Induction Wok Cooker',
    categorySlug: 'built-in-induction',
    description:
      'Built-in concave induction wok module for open kitchens and integrated commercial cooking suites.',
    coverFile: '嵌入凹面炉.png',
    tags: ['Built-in', 'Concave', 'Induction'],
    orderRank: 23,
  }),
  productTemplate({
    slug: 'built-in-flat-top-module',
    name: 'Built-in Flat-Top Induction Module',
    categorySlug: 'built-in-induction',
    description:
      'Low-profile built-in flat-top induction module for custom counters and modular foodservice equipment lines.',
    coverFile: '平底炉.png',
    tags: ['Built-in', 'Module', 'Induction'],
    orderRank: 24,
  }),
  productTemplate({
    slug: 'built-in-induction-control-panel',
    name: 'Built-in Induction Control Panel',
    categorySlug: 'built-in-induction',
    description:
      'Built-in induction control panel for custom equipment integration and project-based kitchen manufacturing.',
    coverFile: '嵌入控制面板.png',
    tags: ['Control Panel', 'Built-in', 'OEM'],
    orderRank: 25,
  }),
  productTemplate({
    slug: 'countertop-induction-fryer',
    name: 'Countertop Induction Fryer',
    categorySlug: 'fryers-griddles',
    description:
      'Countertop induction fryer for snack bars, quick-service concepts and compact frying workflows.',
    coverFile: '台式炸炉.png',
    tags: ['Countertop', 'Fryer', 'Commercial'],
    orderRank: 26,
  }),
  productTemplate({
    slug: 'single-tank-dual-basket-fryer',
    name: 'Single Tank Dual Basket Commercial Fryer',
    categorySlug: 'fryers-griddles',
    description:
      'Single tank dual basket fryer for restaurants and fast-food operators that need efficient frying throughput.',
    coverFile: '单缸双筛炸炉（万向轮）正面.png',
    galleryFiles: ['单缸双筛炸炉.png', '单缸双筛炸炉（万向轮）侧面.png'],
    tags: ['Dual Basket', 'Fryer', 'Commercial'],
    orderRank: 27,
  }),
  productTemplate({
    slug: 'commercial-griddle',
    name: 'Commercial Griddle',
    categorySlug: 'fryers-griddles',
    description:
      'Commercial griddle for breakfast service, snack production and flat-top cooking applications.',
    coverFile: '扒炉.png',
    tags: ['Griddle', 'Flat Top', 'Commercial'],
    orderRank: 28,
  }),
  productTemplate({
    slug: 'countertop-commercial-griddle',
    name: 'Countertop Commercial Griddle',
    categorySlug: 'fryers-griddles',
    description:
      'Countertop commercial griddle for compact kitchens, food courts and mobile foodservice setups.',
    coverFile: '台式扒炉.png',
    tags: ['Countertop', 'Griddle', 'Commercial'],
    orderRank: 29,
  }),
  productTemplate({
    slug: '9-hole-noodle-cooker',
    name: '9-Hole Commercial Noodle Cooker',
    categorySlug: 'noodle-steaming',
    description:
      'Nine-hole commercial noodle cooker for noodle shops, canteens and high-volume pasta or noodle service.',
    coverFile: '九孔煮面炉.png',
    tags: ['9-Hole', 'Noodle Cooker', 'Commercial'],
    orderRank: 30,
  }),
  productTemplate({
    slug: '4-hole-countertop-noodle-cooker',
    name: '4-Hole Countertop Noodle Cooker',
    categorySlug: 'noodle-steaming',
    description:
      'Four-hole countertop noodle cooker for compact noodle concepts and prep stations with limited floor space.',
    coverFile: '台式四孔煮面炉.png',
    tags: ['4-Hole', 'Countertop', 'Noodle Cooker'],
    orderRank: 31,
  }),
  productTemplate({
    slug: 'commercial-bun-steamer',
    name: 'Commercial Steamer for Buns',
    categorySlug: 'noodle-steaming',
    description:
      'Commercial bun steamer for dim sum kitchens, breakfast operations and prepared food warming lines.',
    coverFile: '蒸包炉.png',
    tags: ['Steamer', 'Buns', 'Commercial'],
    orderRank: 32,
  }),
  productTemplate({
    slug: 'rice-noodle-roll-steamer',
    name: 'Commercial Rice Noodle Roll Steamer',
    categorySlug: 'noodle-steaming',
    description:
      'Rice noodle roll steamer for specialty breakfast menus, Cantonese concepts and export foodservice projects.',
    coverFile: '肠粉炉.png',
    tags: ['Rice Noodle Roll', 'Steamer', 'Commercial'],
    orderRank: 33,
  }),
  productTemplate({
    slug: 'integrated-soup-stock-cooker',
    name: 'Integrated Soup Stock Cooker',
    categorySlug: 'noodle-steaming',
    description:
      'Integrated soup stock cooker for broth preparation, hotel kitchens and supporting lines behind wok stations.',
    coverFile: '一体式煲汤炉.png',
    tags: ['Soup Cooker', 'Integrated', 'Commercial'],
    orderRank: 34,
  }),
]

const featuredProductSlugs = [
  'countertop-flat-induction',
  'countertop-concave-induction',
  'dual-burner-large-wok',
  'built-in-flat-induction',
  '9-hole-noodle-cooker',
  'single-tank-dual-basket-fryer',
  '6-burner-claypot-stove',
  'countertop-flat-concave-combo',
]

const categoryDocs = []
for (const category of categories) {
  categoryDocs.push({
    _id: category.id,
    _type: 'category',
    name: category.name,
    slug: {_type: 'slug', current: category.slug},
    description: category.description,
    image: await queueImageUpload(category.coverFile, category.name),
    orderRank: category.orderRank,
  })
}

const categoryIdBySlug = Object.fromEntries(categories.map((category) => [category.slug, category.id]))

const productDocs = []
for (const product of products) {
  const gallery = []
  for (const [index, file] of product.galleryFiles.entries()) {
    const image = await queueImageUpload(file, `${product.name} view ${index + 2}`)
    gallery.push({
      ...image,
      _key: key(`gallery-${product.slug}`, index),
    })
  }

  productDocs.push({
    _id: product.id,
    _type: 'product',
    name: product.name,
    slug: {_type: 'slug', current: product.slug},
    category: {_type: 'reference', _ref: categoryIdBySlug[product.categorySlug]},
    description: product.description,
    coverImage: await queueImageUpload(product.coverFile, product.name),
    gallery,
    features: defaultFeatures.map((title, index) => ({
      _key: key(`feature-${product.slug}`, index),
      _type: 'productFeature',
      title,
    })),
    specifications: defaultSpecs.map(([label, value], index) => ({
      _key: key(`spec-${product.slug}`, index),
      _type: 'productSpecification',
      label,
      value,
    })),
    tags: product.tags,
    modelCode: product.modelCode,
    faqs: defaultFaqs.map((faq, index) => ({
      _key: key(`faq-${product.slug}`, index),
      _type: 'faqItem',
      question: faq.question,
      answer: faq.answer,
    })),
    orderRank: product.orderRank,
    isArchived: false,
  })
  console.log(`Prepared product: ${product.name}`)
}

const existingProducts = await client.fetch(`*[_type == "product"]{_id, "slug": slug.current}`)
const archiveTransaction = client.transaction()
for (const product of existingProducts) {
  if (!products.some((entry) => entry.id === product._id)) {
    archiveTransaction.patch(product._id, {set: {isArchived: true}})
  }
}
if (existingProducts.length > 0) {
  await archiveTransaction.commit()
  console.log(`Archived ${existingProducts.filter((p) => !products.some((entry) => entry.id === p._id)).length} legacy products.`)
}

const factoryHeroImage = await queueImageUpload(
  '01_厂区外景_办公楼与车间通道1.jpg',
  'ProphetChef factory exterior',
)
const factoryOverviewImage = await queueImageUpload('03_厂区外景_车间主干道.jpg', 'ProphetChef production facility')
const productsHeroImage = await queueImageUpload('双头大炒.png', 'ProphetChef commercial wok range')

const pagePatches = [
  {
    _id: 'siteSettings',
    patch: {
      set: {
        title: 'ProphetChef',
        legalName: '东莞市惠和机电有限公司',
        description:
          'ProphetChef manufactures commercial induction cookers, wok ranges, built-in induction modules, fryers and noodle cooking equipment for global foodservice projects.',
        siteUrl: 'https://prophetchef.com',
        contactInfo: {
          email: 'service@prophetchef.com',
          phone: '+86 18351834957',
          whatsapp: '8618351834957',
          address: 'Room 112, Building 1, No. 13 Jiangcheng East Road, Gaobu Town, Dongguan, Guangdong, China (东莞市惠和机电有限公司)',
        },
        footerProductLinks: categories.map((category, index) => ({
          _key: key('footer-product', index),
          _type: 'navigationLink',
          label: category.name,
          href: `/products?category=${category.slug}`,
        })),
        'globalCta.whatsappMessage': 'Hello ProphetChef, I would like to request a quote.',
      },
    },
  },
  {
    _id: 'homePage',
    patch: {
      set: {
        title: 'ProphetChef Homepage',
        'hero.eyebrow': 'Commercial Induction Equipment Manufacturer',
        'hero.title': 'Commercial Induction Cookers for Global Foodservice Projects',
        'hero.description':
          'Factory-direct countertop induction cookers, commercial wok ranges, built-in modules, fryers and noodle cooking equipment for export buyers.',
        'hero.backgroundImage': factoryHeroImage,
        'hero.trustTags': ['OEM / ODM Available', 'CE / ISO Certified', 'Fast Quotation Within 24 Hours'],
        'categorySection.title': 'Commercial Induction Equipment for B2B Buyers',
        'categorySection.description':
          'Browse ProphetChef core product families for restaurants, hotels, school canteens and central kitchen projects.',
        featuredCategories: categories.map((category) => ({
          _type: 'reference',
          _ref: category.id,
          _key: category.id,
        })),
        'featuredProductsSection.title': 'Featured Commercial Induction Equipment',
        featuredProducts: featuredProductSlugs.map((slug) => ({
          _type: 'reference',
          _ref: `product-${slug}`,
          _key: `product-${slug}`,
        })),
        factoryPreview: {
          _type: 'mediaTextSection',
          eyebrow: 'Factory Strength',
          title: 'Built for Stable Supply and Global Project Delivery',
          paragraphs: [
            'Our production base integrates sheet metal processing, bending, welding, assembly and testing lines, supported by R&D, QC, sales and after-sales teams.',
          ],
          image: factoryOverviewImage,
          bullets: [
            '20+ years manufacturing experience',
            '15000sqm production base',
            'Integrated metal processing and assembly workflow',
            'Export support for distributors and project contractors',
          ],
          cta: {_type: 'ctaButton', text: 'Explore Our Factory', href: '/factory'},
        },
      },
    },
  },
  {
    _id: 'productsPage',
    patch: {
      set: {
        'hero.title': 'Commercial Induction Cooker Products',
        'hero.description':
          'Explore ProphetChef commercial induction cookers, wok ranges, built-in modules and specialty cooking equipment.',
        'hero.backgroundImage': productsHeroImage,
      },
    },
  },
  {
    _id: 'factoryPage',
    patch: {
      set: {
        'hero.backgroundImage': factoryHeroImage,
        'overview.image': factoryOverviewImage,
        'overview.paragraphs': [
          'With 20+ years of manufacturing experience, a 15000sqm production base and 750+ employees, ProphetChef supports distributors, kitchen contractors and foodservice project buyers in more than 50 export countries.',
          'Our integrated production line covers commercial induction cooking, wok ranges, built-in modules and specialty foodservice equipment.',
        ],
      },
    },
  },
  {
    _id: 'contactPage',
    patch: {
      set: {
        'hero.title': 'Contact ProphetChef',
        'hero.description':
          'Get in touch with our export sales team for product catalogs, quotations and commercial kitchen equipment planning.',
      },
    },
  },
]

const transaction = client.transaction()
for (const doc of categoryDocs) {
  transaction.createOrReplace(doc)
}
for (const doc of productDocs) {
  transaction.createOrReplace(doc)
}
for (const {patch, _id} of pagePatches) {
  transaction.patch(_id, patch)
}
await transaction.commit()

console.log(
  `Imported ${categoryDocs.length} categories and ${productDocs.length} products into ${projectId}/${dataset}.`,
)