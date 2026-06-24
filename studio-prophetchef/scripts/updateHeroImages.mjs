import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const factoryDir = path.join(repoRoot, 'factory')

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_EDITOR_TOKEN
const dryRun = process.argv.includes('--dry-run')

if (!dryRun && !token) {
  throw new Error('Missing SANITY_WRITE_TOKEN or SANITY_API_EDITOR_TOKEN.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-05-05',
  useCdn: false,
})

const heroImages = [
  {
    documentId: 'homePage',
    documentType: 'homePage',
    title: 'Homepage',
    filePrefix: '01_',
    alt: 'ProphetChef factory exterior and production buildings',
  },
  {
    documentId: 'productsPage',
    documentType: 'productsPage',
    title: 'Products',
    filePrefix: '04_',
    alt: 'ProphetChef commercial kitchen equipment showroom',
  },
  {
    documentId: 'factoryPage',
    documentType: 'factoryPage',
    title: 'Factory',
    filePrefix: '03_',
    alt: 'ProphetChef factory workshop main road',
  },
  {
    documentId: 'applicationsPage',
    documentType: 'applicationsPage',
    title: 'Applications',
    filePrefix: '24_',
    alt: 'Commercial smart kitchen equipment installed in a working kitchen',
  },
  {
    documentId: 'certificatesPage',
    documentType: 'certificatesPage',
    title: 'Certificates',
    filePrefix: '17_',
    alt: 'ProphetChef sheet metal processing workshop',
  },
  {
    documentId: 'newsPage',
    documentType: 'newsPage',
    title: 'News',
    filePrefix: '08_',
    alt: 'ProphetChef intelligent kitchen equipment showroom',
  },
  {
    documentId: 'contactPage',
    documentType: 'contactPage',
    title: 'Contact',
    filePrefix: '02_',
    alt: 'ProphetChef factory exterior and office building',
  },
]

function resolveFactoryImage(filePrefix) {
  const file = fs.readdirSync(factoryDir).find((name) => name.startsWith(filePrefix))
  if (!file) throw new Error(`Hero image not found for prefix: ${filePrefix}`)
  return {file, imagePath: path.join(factoryDir, file)}
}

async function uploadHeroImage({filePrefix, alt}) {
  const {file, imagePath} = resolveFactoryImage(filePrefix)
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Hero image not found: ${imagePath}`)
  }

  if (dryRun) {
    return {_type: 'image', asset: {_type: 'reference', _ref: 'dry-run-image'}, alt}
  }

  const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
    filename: file,
    contentType: 'image/jpeg',
  })

  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt,
  }
}

const transaction = client.transaction()

for (const item of heroImages) {
  const image = await uploadHeroImage(item)
  const {file} = resolveFactoryImage(item.filePrefix)

  transaction
    .createIfNotExists({_id: item.documentId, _type: item.documentType, title: item.title})
    .patch(item.documentId, {
      setIfMissing: {hero: item.documentType === 'homePage' ? {} : {_type: 'pageHero'}},
      set: {'hero.backgroundImage': image},
    })

  console.log(`${dryRun ? 'Would update' : 'Prepared'} ${item.documentId}: ${file}`)
}

if (!dryRun) {
  await transaction.commit()
}

console.log(
  `${dryRun ? 'Dry run complete' : 'Updated hero images'} for ${heroImages.length} pages in ${projectId}/${dataset}.`,
)
