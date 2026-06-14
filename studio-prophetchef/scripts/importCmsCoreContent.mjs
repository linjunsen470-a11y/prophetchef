import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')

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
  if (!imageCache.has(url)) {
    let buffer
    let contentType = 'image/jpeg'
    let filename = path.basename(url).split('?')[0] || 'cms-image.jpg'

    if (/^https?:\/\//.test(url)) {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch image: ${url}`)
      contentType = response.headers.get('content-type') || contentType
      buffer = Buffer.from(await response.arrayBuffer())
    } else {
      const localPath = url.startsWith('factory:')
        ? resolveFactoryImage(url.slice('factory:'.length))
        : path.resolve(repoRoot, url)
      if (!fs.existsSync(localPath)) throw new Error(`Image not found: ${localPath}`)
      buffer = fs.readFileSync(localPath)
      contentType = path.extname(localPath).toLowerCase() === '.png' ? 'image/png' : contentType
      filename = path.basename(localPath)
    }

    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType,
    })
    imageCache.set(url, asset._id)
  }
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: imageCache.get(url)},
    alt,
  }
}

function resolveFactoryImage(filePrefix) {
  const factoryDir = path.join(repoRoot, 'factory')
  const file = fs.readdirSync(factoryDir).find((name) => name.startsWith(`${filePrefix}_`))
  if (!file) throw new Error(`Factory image not found for prefix: ${filePrefix}`)
  return path.join(factoryDir, file)
}

function key(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const heroHomeImage = 'factory:01'
const productsHeroImage = 'factory:04'
const factoryImage = 'factory:03'
const applicationImage = 'factory:24'
const certificatesHeroImage = 'factory:17'
const newsHeroImage = 'factory:08'
const contactHeroImage = 'factory:02'
const kitchenImage = productsHeroImage
const cookingImage = certificatesHeroImage

const applications = [
  ['School Cafeteria', 'Large-batch cooking, food warming and dishwashing for daily meal service.', 'Induction wok cooker, combi oven, hood type dishwasher', applicationImage],
  ['Hotel Kitchen', 'All-day production equipment for breakfast, banquets and a la carte service.', 'Combi oven, gas cooker, dishwasher, modular range', kitchenImage],
  ['Chain Restaurant', 'Standardized cooking equipment for consistent recipes across locations.', 'Automatic cooking machine, pasta cooker, induction cooker', cookingImage],
  ['Central Kitchen', 'High-volume cooking and dispatch systems for prepared food production.', 'Automatic cooking kettle, modular line, dishwashing system', factoryImage],
  ['Fast Food Restaurant', 'Compact equipment for fast cooking, boiling and washing workflow.', 'Pasta cooker, induction hob, undercounter dishwasher', kitchenImage],
  ['Asian Restaurant', 'High-output wok cooking and soup preparation equipment.', 'Induction wok cooker, stock pot stove, gas range', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80'],
  ['Food Factory', 'Processing and batch cooking equipment for packaged food production.', 'Sauce kettle, automatic cooker, custom line', cookingImage],
  ['Catering Service', 'Mobile-friendly and reliable equipment for event meal preparation.', 'Combi oven, dishwasher, modular equipment', applicationImage],
]

const certificates = [
  ['CE', 'CE', 'badgeCheck'],
  ['ISO 9001', 'ISO', 'shieldCheck'],
  ['RoHS', 'RoHS', 'recycle'],
  ['ETL', 'ETL', 'plug'],
  ['Quality Inspection Report', 'Quality', 'clipboardCheck'],
  ['Patent Certificate', 'Patent', 'fileCheck'],
  ['Utility Model Certificate', 'Utility', 'fileCheck'],
  ['Export Compliance Document', 'Export', 'fileCheck'],
]

const appDocs = await Promise.all(
  applications.map(async ([name, description, recommended, imageUrl], index) => ({
    _id: `application-${slug(name)}`,
    _type: 'application',
    name,
    slug: {_type: 'slug', current: slug(name)},
    description,
    recommended,
    image: await image(imageUrl, name),
    quoteProductName: `${name} Solution`,
    orderRank: index + 1,
  })),
)

const certDocs = certificates.map(([title, shortLabel, icon], index) => ({
  _id: `certificate-${slug(title)}`,
  _type: 'certificate',
  title,
  shortLabel,
  description: 'Available for selected commercial kitchen equipment models and export projects.',
  icon,
  orderRank: index + 1,
}))

const docs = [
  ...appDocs,
  ...certDocs,
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'ProKitchenTech',
    legalName: 'ProKitchenTech',
    description:
      'ProKitchenTech is a commercial kitchen equipment manufacturer offering induction cookers, automatic cooking machines, combi ovens, dishwashers and complete kitchen solutions.',
    siteUrl: 'https://prophetchef.com',
    contactInfo: {
      email: 'sales@example.com',
      phone: '+86 180 0000 0000',
      whatsapp: '8618000000000',
      address: 'Dongguan, Guangdong, China',
    },
    mainNavigation: [
      ['Home', '/'],
      ['Products', '/products'],
      ['Factory', '/factory'],
      ['Applications', '/applications'],
      ['Certificates', '/certificates'],
      ['News', '/news'],
      ['Contact', '/contact'],
    ].map(([label, href], index) => ({_key: key('nav', index), _type: 'navigationLink', label, href})),
    footerProductLinks: [
      ['Commercial Induction Cookers', '/products#Commercial-Induction-Cookers'],
      ['Automatic Cooking Machines', '/products#Automatic-Cooking-Machines'],
      ['Combi Ovens', '/products#Combi-Ovens'],
      ['Commercial Dishwashers', '/products#Commercial-Dishwashers'],
      ['Modular Cooking Systems', '/products#Modular-Cooking-Systems'],
      ['Custom Kitchen Solutions', '/products#Custom-Kitchen-Solutions'],
    ].map(([label, href], index) => ({_key: key('product-link', index), _type: 'navigationLink', label, href})),
    footerCompanyLinks: [
      ['Factory', '/factory'],
      ['Applications', '/applications'],
      ['Certificates', '/certificates'],
      ['News', '/news'],
      ['Contact', '/contact'],
    ].map(([label, href], index) => ({_key: key('company-link', index), _type: 'navigationLink', label, href})),
    footerBadges: [
      {_key: 'footer-badge-1', _type: 'statItem', value: '', label: 'OEM / ODM', icon: 'badgeCheck'},
      {_key: 'footer-badge-2', _type: 'statItem', value: '', label: 'CE / ISO', icon: 'badgeCheck'},
      {_key: 'footer-badge-3', _type: 'statItem', value: '', label: 'Factory Direct', icon: 'factory'},
    ],
    globalCta: {
      _type: 'globalCta',
      eyebrow: 'Project Inquiry',
      title: 'Get a Free Quote Today',
      description:
        'Tell us your kitchen project requirements. Our team will recommend suitable equipment and provide a fast quotation.',
      primaryCta: {_type: 'ctaButton', text: 'Send Inquiry', href: '/contact'},
      whatsappText: 'Chat on WhatsApp',
      whatsappMessage: 'Hello ProKitchenTech, I would like to request a quote.',
    },
  },
  {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Prophetchef Homepage',
    hero: {
      eyebrow: 'Commercial Foodservice Equipment Factory',
      title: 'Commercial Kitchen Equipment for Global Foodservice Projects',
      description:
        'Factory-direct induction cooking, automatic cooking machines, combi ovens, dishwashers and complete stainless steel kitchen solutions.',
      backgroundImage: await image(heroHomeImage, 'ProphetChef factory exterior and production buildings').catch(() => undefined),
      primaryCta: {_type: 'ctaButton', text: 'View Products', href: '/products'},
      secondaryCta: {_type: 'ctaButton', text: 'Contact Supplier', href: '/contact'},
      trustTags: ['OEM / ODM Available', 'CE / ISO Certified', 'Fast Quotation Within 24 Hours'],
      proofItems: [
        {_key: 'home-proof-1', _type: 'statItem', value: '20+', label: 'Years Mfg.', icon: 'factory'},
        {_key: 'home-proof-2', _type: 'statItem', value: '15000+', label: 'Area (sqm)', icon: 'maximize'},
        {_key: 'home-proof-3', _type: 'statItem', value: '50+', label: 'Countries', icon: 'globe'},
        {_key: 'home-proof-4', _type: 'statItem', value: '24h', label: 'Fast Quote', icon: 'clock'},
      ],
    },
    categorySection: {
      _type: 'sectionHeader',
      eyebrow: 'Product Categories',
      title: 'Commercial Kitchen Equipment for B2B Buyers',
      description:
        'Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects.',
    },
    featuredProductsSection: {
      _type: 'sectionHeader',
      eyebrow: 'Featured Products',
      title: 'Factory Direct Commercial Foodservice Equipment',
      cta: {_type: 'ctaButton', text: 'View All Products', href: '/products'},
    },
    factoryPreview: {
      _type: 'mediaTextSection',
      eyebrow: 'Factory Strength',
      title: 'Built for Stable Supply and Global Project Delivery',
      paragraphs: [
        'Our production base integrates laser cutting, bending, welding, assembly and testing lines, supported by R&D, QC, sales and after-sales teams.',
      ],
      image: await image(factoryImage, 'Commercial kitchen equipment production base'),
      bullets: [
        '20+ years manufacturing experience',
        '15000sqm production base',
        'Integrated metal processing and assembly workflow',
        'Export support for distributors and project contractors',
      ],
      cta: {_type: 'ctaButton', text: 'Explore Our Factory', href: '/factory'},
    },
    applicationsPreviewSection: {
      _type: 'sectionHeader',
      eyebrow: 'Applications',
      title: 'Solutions for Different Kitchen Projects',
      cta: {_type: 'ctaButton', text: 'View Applications', href: '/applications'},
    },
    featuredApplications: appDocs.slice(0, 4).map((doc) => ({_type: 'reference', _ref: doc._id})),
    certificatesPreviewSection: {
      _type: 'sectionHeader',
      eyebrow: 'Certificates',
      title: 'Compliance Support for Global Buyers',
      cta: {_type: 'ctaButton', text: 'View Certificates', href: '/certificates'},
    },
    featuredCertificates: certDocs.slice(0, 6).map((doc) => ({_type: 'reference', _ref: doc._id})),
    newsSection: {
      title: 'Industry Insights and Product Knowledge',
      subtitle: 'Selection advice, product guides and company updates for commercial kitchen buyers.',
    },
  },
  {
    _id: 'productsPage',
    _type: 'productsPage',
    title: 'Products',
    hero: {
      _type: 'pageHero',
      eyebrow: 'Products',
      title: 'Commercial Kitchen Equipment Products',
      description: 'Explore our complete product range for restaurants, hotels, canteens and central kitchens.',
      backgroundImage: await image(productsHeroImage, 'ProphetChef commercial kitchen equipment showroom'),
    },
    metrics: [
      {_key: 'products-metric-1', _type: 'statItem', value: '', label: 'Factory direct', icon: 'factory'},
      {_key: 'products-metric-2', _type: 'statItem', value: '', label: 'OEM / ODM', icon: 'badgeCheck'},
      {_key: 'products-metric-3', _type: 'statItem', value: '', label: 'Export-ready', icon: 'globe'},
    ],
  },
  {
    _id: 'newsPage',
    _type: 'newsPage',
    title: 'News',
    hero: {
      _type: 'pageHero',
      eyebrow: 'News',
      title: 'News & Industry Insights',
      description: 'Commercial kitchen equipment knowledge, product selection guides and company updates.',
      backgroundImage: await image(newsHeroImage, 'ProphetChef intelligent kitchen equipment showroom'),
    },
  },
  {
    _id: 'factoryPage',
    _type: 'factoryPage',
    title: 'Factory',
    hero: {
      _type: 'pageHero',
      eyebrow: 'Factory',
      title: 'Factory Strength You Can Trust',
      description:
        'Integrated manufacturing capability for commercial kitchen equipment, OEM projects and global distribution partners.',
      backgroundImage: await image(factoryImage, 'Commercial kitchen equipment factory'),
    },
    overview: {
      _type: 'mediaTextSection',
      eyebrow: 'Factory Overview',
      title: 'One-Stop Manufacturing for Commercial Foodservice Equipment',
      paragraphs: [
        'With 20+ years of manufacturing experience, a 15000sqm production base and 750+ employees, ProKitchenTech supports distributors, kitchen contractors and foodservice project buyers in more than 50 export countries.',
        'Our integrated production line covers induction cooking, gas cooking, dishwashing, ovens and custom kitchen equipment.',
      ],
      image: await image(factoryImage, 'Commercial kitchen equipment factory overview'),
      cta: {_type: 'ctaButton', text: 'Request Factory Price', href: '/contact'},
    },
    stats: [
      ['15000sqm', 'Factory', 'factory'],
      ['750+', 'Employees', 'users'],
      ['18', 'R&D Personnel', 'sparkles'],
      ['75', 'QC Inspectors', 'shieldCheck'],
      ['114', 'Sales Team', 'mailCheck'],
      ['64', 'After-sales Instructors', 'headset'],
    ].map(([value, label, icon], index) => ({_key: key('factory-stat', index), _type: 'statItem', value, label, icon})),
    productionHeader: {_type: 'sectionHeader', eyebrow: 'Production Capability', title: 'From Sheet Metal to Final Testing'},
    productionSteps: [
      ['Laser Cutting', 'Precise sheet metal processing for stainless steel components.', 'scissors'],
      ['Sheet Metal Workshop', 'Stable manufacturing workflow for commercial-grade equipment bodies.', 'building'],
      ['Bending', 'Accurate forming for durable panels and structural parts.', 'wrench'],
      ['Welding', 'Professional welding for heavy-duty stainless steel construction.', 'zap'],
      ['Assembly Line', 'Organized assembly for induction, gas, dishwashing and oven products.', 'settings'],
      ['Aging Test', 'Electrical and performance checks before packing.', 'clipboardCheck'],
      ['Salt Spray Test', 'Corrosion-resistance evaluation for key metal parts.', 'flask'],
      ['Quality Inspection', 'Final QC before shipment and export packaging.', 'shieldCheck'],
    ].map(([title, description, icon], index) => ({_key: key('production', index), _type: 'textCard', title, description, icon})),
    teamHeader: {_type: 'sectionHeader', eyebrow: 'Team Structure', title: 'Specialized Teams for Global B2B Orders'},
    teamItems: [
      ['R&D Team', 'Product improvement, electrical design and custom development.'],
      ['Engineering Team', 'Project layout support and technical matching.'],
      ['Production Team', 'Stable production scheduling and assembly execution.'],
      ['QC Team', 'Incoming, in-process and pre-shipment inspection.'],
      ['Sales Team', 'Quotation, export documents and distributor support.'],
      ['After-sales Team', 'Installation guidance, spare parts and troubleshooting support.'],
    ].map(([title, description], index) => ({_key: key('team', index), _type: 'textCard', title, description})),
    marketsHeader: {_type: 'sectionHeader', eyebrow: 'Global Export', title: 'Export Markets We Support'},
    exportMarkets: [
      ['Southeast Asia', 'waves'],
      ['Middle East', 'landmark'],
      ['Europe', 'map'],
      ['North America', 'plane'],
      ['South America', 'ship'],
      ['Africa', 'mapPin'],
      ['Australia', 'compass'],
    ].map(([label, icon], index) => ({_key: key('market', index), _type: 'statItem', value: '', label, icon})),
  },
  {
    _id: 'applicationsPage',
    _type: 'applicationsPage',
    title: 'Applications',
    hero: {
      _type: 'pageHero',
      eyebrow: 'Applications',
      title: 'Commercial Kitchen Solutions for Different Applications',
      description:
        'Recommended commercial kitchen equipment combinations for foodservice projects and professional buyers.',
      backgroundImage: await image(applicationImage, 'Commercial kitchen applications'),
    },
    gridHeader: {_type: 'sectionHeader', eyebrow: 'Application Grid', title: 'Find the Right Equipment for Your Kitchen Type'},
    featuredApplications: appDocs.map((doc) => ({_type: 'reference', _ref: doc._id})),
    solutionsHeader: {_type: 'sectionHeader', eyebrow: 'Detailed Solutions', title: 'Project Planning Examples'},
    solutionDetails: [
      {
        _key: 'solution-central-kitchen',
        _type: 'object',
        title: 'Central Kitchen Solution',
        painPoints:
          'Central kitchens need high-capacity production, safe workflows, stable recipes and efficient cleaning zones.',
        recommendedEquipment:
          'Automatic cooking machines, induction kettles, combi ovens, modular cooking lines and rack dishwashers.',
        benefits:
          'Improved production consistency, reduced labor dependency, better energy use and easier quality control.',
        cta: {_type: 'ctaButton', text: 'Request Project Consultation', href: '/contact?product=Central%20Kitchen%20Solution'},
      },
      {
        _key: 'solution-chain-restaurant',
        _type: 'object',
        title: 'Chain Restaurant Solution',
        painPoints:
          'Multi-store restaurant brands need standardized taste, fast staff training and equipment that is easy to maintain.',
        recommendedEquipment:
          'Automatic stir-fry machines, pasta cookers, countertop induction cookers, combi ovens and undercounter dishwashers.',
        benefits: 'Repeatable recipes, faster service speed, controlled operating costs and scalable procurement.',
        cta: {_type: 'ctaButton', text: "Discuss Your Chain's Needs", href: '/contact?product=Chain%20Restaurant%20Solution'},
      },
    ],
  },
  {
    _id: 'certificatesPage',
    _type: 'certificatesPage',
    title: 'Certificates',
    hero: {
      _type: 'pageHero',
      eyebrow: 'Certificates',
      title: 'Certified for Global Commercial Kitchen Markets',
      description: 'Product compliance documents and quality control support for commercial kitchen equipment importers.',
      backgroundImage: await image(certificatesHeroImage, 'ProphetChef sheet metal processing workshop'),
    },
    certificatesHeader: {_type: 'sectionHeader', eyebrow: 'Certificate Wall', title: 'Documents for B2B Procurement and Import Clearance'},
    featuredCertificates: certDocs.map((doc) => ({_type: 'reference', _ref: doc._id})),
    processHeader: {_type: 'sectionHeader', eyebrow: 'Quality Control Process', title: 'Inspection from Raw Material to Shipment'},
    processSteps: [
      'Raw material inspection',
      'Production inspection',
      'Electrical safety test',
      'Aging test',
      'Packing inspection',
      'Pre-shipment inspection',
    ],
    documentationCta: {
      title: 'Need certificates for import clearance?',
      description: 'Contact us to get product documents for your selected models and destination market.',
      button: {_type: 'ctaButton', text: 'Request Full Documentation', href: '/contact'},
    },
  },
  {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact',
    hero: {
      _type: 'pageHero',
      title: 'Contact ProKitchenTech',
      description: 'Get in touch with our sales team for product catalogs, quotations and kitchen project planning.',
      backgroundImage: await image(contactHeroImage, 'ProphetChef factory exterior and office building'),
    },
    eyebrow: 'Get in Touch',
    heading: 'How Can We Help Your Foodservice Project?',
    lead: 'Our experts are ready to assist you with equipment selection, technical specifications and factory-direct supply chains.',
  },
]

const transaction = client.transaction()

for (const doc of docs) {
  transaction.createOrReplace(doc)
}

await transaction.commit()

console.log(`Imported ${docs.length} core CMS documents into ${projectId}/${dataset}.`)
