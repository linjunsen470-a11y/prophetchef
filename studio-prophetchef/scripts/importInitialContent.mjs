import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  throw new Error('Missing SANITY_WRITE_TOKEN. Create a write token in Sanity and set it before running this script.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-05-05',
  useCdn: false,
})

const imageCache = new Map()

async function image(url, alt) {
  if (!url) return undefined
  try {
    if (!imageCache.has(url)) {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
      if (!response.ok) {
        console.warn(`Failed to fetch image: ${url}, status: ${response.status}. Skipping image.`);
        return undefined;
      }
      const contentType = response.headers.get('content-type') || 'image/jpeg'
      const buffer = Buffer.from(await response.arrayBuffer())
      const asset = await client.assets.upload('image', buffer, {
        filename: url.split('/').pop()?.split('?')[0] || 'seed-image.jpg',
        contentType,
      })
      imageCache.set(url, asset._id)
    }
    return {
      _type: 'image',
      asset: {_type: 'reference', _ref: imageCache.get(url)},
      alt,
    }
  } catch (err) {
    console.warn(`Failed to process image ${url}: ${err.message}. Skipping image.`);
    return undefined;
  }
}

function key(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`
}

function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const products = [
  ['01', 'Heavy Duty Commercial Induction Wok Cooker', 'heavy-duty-commercial-induction-wok-cooker', 'Cooking', 'High-power wok station for hotel, canteen and central kitchen cooking lines.', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80', ['8-30kW', 'SUS304', 'CE']],
  ['02', '360 Automatic Stir-fry Cooking Machine', '360-automatic-stir-fry-cooking-machine', 'Cooking', 'Programmable rotating cooker for standardized recipes and chain restaurants.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', ['Auto Stir', 'Touch Panel', 'OEM']],
  ['03', 'Commercial Combi Steam Oven', 'commercial-combi-steam-oven', 'Cooking', 'Steam, convection and mixed cooking modes for efficient batch production.', 'https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80', ['6/10/20 Trays', 'Steam', 'Digital']],
  ['04', 'Hood Type Commercial Dishwasher', 'hood-type-commercial-dishwasher', 'Dishwashing', 'High-temperature washing system for hotels, schools and catering kitchens.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', ['Rack Type', 'Low Water', 'Fast Cycle']],
  ['05', 'Modular Induction Cooking Range', 'modular-induction-cooking-range', 'Cooking', 'Integrated commercial cooking line for professional open kitchens.', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80', ['Modular', 'Custom', 'Heavy Duty']],
  ['06', 'Automatic Pasta Cooker', 'automatic-pasta-cooker', 'Cooking', 'Stainless steel electric pasta boiler for fast food and restaurant chains.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', ['6 Baskets', 'Timer', 'Easy Clean']],
  ['07', 'Heavy Duty Gas Stock Pot Stove', 'heavy-duty-gas-stock-pot-stove', 'Cooking', 'Durable gas cooking equipment for soups, stocks and large-volume cooking.', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80', ['LPG/NG', 'Cast Iron', 'Durable']],
  ['08', 'Countertop Commercial Induction Cooker', 'countertop-commercial-induction-cooker', 'Cooking', 'Compact high-efficiency induction hob for restaurant prep stations.', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80', ['3.5-5kW', 'Portable', 'Safe']],
  ['09', 'Automatic Sauce Cooking Kettle', 'automatic-sauce-cooking-kettle', 'Cooking', 'Tilting mixing kettle for sauces, fillings and prepared food production.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', ['Tilting', 'Mixer', 'Steam Jacket']],
  ['10', 'Bakery Electric Convection Oven', 'bakery-electric-convection-oven', 'Cooking', 'Reliable baking oven for bakeries, hotels and foodservice operations.', 'https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80', ['Multi Tray', 'Even Heat', 'Timer']],
  ['11', 'Undercounter Commercial Dishwasher', 'undercounter-commercial-dishwasher', 'Dishwashing', 'Space-saving dishwasher for bars, cafes and small restaurants.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', ['Compact', 'Fast Wash', 'Stainless']],
  ['12', 'Custom Central Kitchen Equipment Line', 'custom-central-kitchen-equipment-line', 'Preparation', 'Turnkey equipment planning and customized manufacturing for project buyers.', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80', ['Turnkey', 'OEM/ODM', 'Layout Support']],
]

const newsItems = [
  [1, 'Why Commercial Kitchens Are Switching to Induction Cooking', 'Induction cooking is becoming a practical upgrade for restaurants, canteens and central kitchens seeking cleaner heat and lower operating costs.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-04-18', 'Industry News', 'why-switching-to-induction'],
  [2, 'How to Choose an Automatic Cooking Machine for Chain Restaurants', 'Key points for evaluating capacity, recipe standardization, cleaning convenience and after-sales support.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-04-10', 'Product Knowledge', 'how-to-choose-automatic-cooking-machine'],
  [3, 'Complete Commercial Kitchen Equipment Checklist for New Restaurants', 'A practical planning checklist for new foodservice projects, covering cooking, dishwashing, preparation and storage.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-03-28', 'Product Knowledge', 'kitchen-equipment-checklist'],
  [4, 'The Real Cost-Saving Benefits of Commercial Induction Cookers', 'A clear look at energy efficiency, maintenance reduction and working environment improvements.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-03-15', 'Industry News', 'cost-saving-benefits-induction'],
  [5, 'How Combi Ovens Improve Kitchen Efficiency', 'Combi ovens help operators reduce equipment footprint while improving production consistency.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-03-02', 'Product Knowledge', 'how-combi-ovens-improve-efficiency'],
  [6, 'Commercial Dishwasher Buying Guide for Hotels', 'Selection advice for hotel buyers comparing undercounter, hood type and conveyor dishwashers.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-02-20', 'Product Knowledge', 'commercial-dishwasher-buying-guide'],
  [7, 'Central Kitchen Equipment Planning Tips', 'How to plan cooking lines, washing zones and preparation areas for central kitchen projects.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-02-06', 'Company News', 'central-kitchen-planning-tips'],
  [8, 'OEM Kitchen Equipment: What Distributors Should Know', 'Important considerations for brand customization, certification documents and stable supply.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-01-22', 'Company News', 'oem-kitchen-equipment-distributors'],
  [9, 'Gas vs Induction Cooking in Commercial Kitchens', 'A balanced comparison of power source, heat control, installation requirements and kitchen workflow.', 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80', '2026-01-10', 'Industry News', 'gas-vs-induction-cooking'],
]

function block(_key, text, style = 'normal') {
  return {
    _key,
    _type: 'block',
    style,
    markDefs: [],
    children: [{_key: `${_key}c`, _type: 'span', marks: [], text}],
  }
}

const productCategoryNames = [...new Set(products.map(([, , , category]) => category))]
const newsCategoryNames = [...new Set(newsItems.map(([, , , , , category]) => category))]

const productCategoryDocs = productCategoryNames.map((name, index) => ({
  _id: `product-category-${toSlug(name)}`,
  _type: 'category',
  name,
  slug: {_type: 'slug', current: toSlug(name)},
  description: `${name} equipment for commercial foodservice projects.`,
  orderRank: index + 1,
}))

const newsCategoryDocs = newsCategoryNames.map((title, index) => ({
  _id: `news-category-${toSlug(title)}`,
  _type: 'newsCategory',
  title,
  slug: {_type: 'slug', current: toSlug(title)},
  description: `${title} articles for commercial kitchen buyers.`,
  orderRank: index + 1,
}))

const productDocs = await Promise.all(
  products.map(async ([id, name, slug, category, description, imageUrl, tags], index) => ({
    _id: `product-${slug}`,
    _type: 'product',
    name,
    slug: {_type: 'slug', current: slug},
    category: {_type: 'reference', _ref: `product-category-${toSlug(category)}`},
    description,
    coverImage: await image(imageUrl, name),
    features: tags.map((tag, tagIndex) => ({
      _key: key(`feature-${slug}`, tagIndex),
      _type: 'productFeature',
      title: tag,
    })),
    specifications: [
      {_key: key(`spec-${slug}`, 0), _type: 'productSpecification', label: 'Model series', value: `PKT-${id}-Series`},
      {_key: key(`spec-${slug}`, 1), _type: 'productSpecification', label: 'Category', value: category},
    ],
    tags,
    modelCode: `PKT-${id}-Series`,
    orderRank: index + 1,
    isArchived: false,
  })),
)

const newsDocs = await Promise.all(
  newsItems.map(async ([id, title, excerpt, imageUrl, date, category, slug]) => {
    let body = [
      block(`intro${id}`, excerpt),
      block(`heading${id}`, 'Key Benefits & Industry Impact', 'h2'),
      block(
        `body${id}`,
        'Modern commercial kitchen equipment helps professional buyers improve production consistency, energy efficiency and long-term maintenance workflows. By adopting advanced technologies like induction cooking and automated stir-fry systems, restaurants can significantly reduce labor costs while maintaining high-quality output.',
      ),
      block(
        `closing${id}`,
        'Our factory supports OEM customization, export packaging and project quotation support for distributors and foodservice operators globally.',
      ),
    ]

    if (slug === 'why-switching-to-induction') {
      body = [
        block(
          'intro1',
          'Commercial kitchens are under pressure to improve productivity, reduce operating costs and create safer working environments. For many restaurants, hotels and canteens, commercial induction cooking has become a practical upgrade from traditional open-flame cooking.',
        ),
        block('h1', 'Energy efficiency', 'h2'),
        block(
          'p1',
          'Induction cooking transfers heat directly to compatible cookware. This helps reduce wasted heat in the kitchen and supports better energy management for operators handling long service hours.',
        ),
        block('h2', 'Safety benefits', 'h2'),
        block(
          'p2',
          'Because induction cooking does not rely on an open flame, it can improve kitchen safety and reduce excess ambient heat. This is useful for dense cooking lines and teams working through long shifts.',
        ),
        block('h3', 'Faster heating', 'h2'),
        block(
          'p3',
          'High-power induction cookers reach working temperature quickly and respond rapidly to power adjustments. For stir-fry stations, boiling and batch cooking, this can improve speed and consistency.',
        ),
        block(
          'conclusion',
          'Induction cooking is not only a technology trend. It is a practical equipment choice for commercial kitchens looking for energy efficiency, safer operation, fast heating and cleaner workflows.',
        ),
      ]
    }

    return {
      _id: `newsArticle-${slug}`,
      _type: 'newsArticle',
      title,
      slug: {_type: 'slug', current: slug},
      excerpt,
      coverImage: await image(imageUrl, title),
      publishedAt: `${date}T00:00:00.000Z`,
      category: {_type: 'reference', _ref: `news-category-${toSlug(category)}`},
      tags: [category],
      body,
      isArchived: false,
    }
  }),
)

const mutations = [...productCategoryDocs, ...newsCategoryDocs, ...productDocs, ...newsDocs]

const transaction = client.transaction()

for (const document of mutations) {
  transaction.createOrReplace(document)
}

await transaction.commit()

console.log(
  `Imported ${productDocs.length} products, ${productCategoryDocs.length} product categories, ${newsDocs.length} news articles, and ${newsCategoryDocs.length} news categories into ${projectId}/${dataset}.`,
)
