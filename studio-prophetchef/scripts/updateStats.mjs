import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  throw new Error('Missing SANITY_WRITE_TOKEN. Please set it in your environment or .env file.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-05-05',
  useCdn: false,
})

async function run() {
  try {
    console.log('Updating stats in Sanity CMS...')

    // 1. Update homePage settings
    const homeDoc = await client.getDocument('homePage')
    if (homeDoc) {
      console.log('Patching homePage stats...')
      await client
        .patch('homePage')
        .set({
          'hero.proofItems': [
            {_key: 'home-proof-1', _type: 'statItem', value: '10+', label: 'Years Mfg.', icon: 'factory'},
            {_key: 'home-proof-2', _type: 'statItem', value: '7000+', label: 'Area (sqm)', icon: 'maximize'},
            {_key: 'home-proof-3', _type: 'statItem', value: '30+', label: 'Countries', icon: 'globe'},
            {_key: 'home-proof-4', _type: 'statItem', value: '24h', label: 'Service Support', icon: 'clock'},
          ],
          'factoryPreview.bullets': [
            '10+ years manufacturing experience',
            '7000sqm production base',
            'Integrated metal processing and assembly workflow',
            'Export support for distributors and project contractors',
          ]
        })
        .commit()
      console.log('homePage stats patched successfully!')
    } else {
      console.log('homePage document not found, skipping patch.')
    }

    // 2. Update factoryPage settings
    const factoryDoc = await client.getDocument('factoryPage')
    if (factoryDoc) {
      console.log('Patching factoryPage stats...')
      await client
        .patch('factoryPage')
        .set({
          'overview.paragraphs': [
            'With 10+ years of manufacturing experience, a 7000sqm production base and 90+ employees, ProphetChef supports distributors, kitchen contractors and foodservice project buyers in more than 30+ export countries.',
            'Our integrated production line covers commercial induction cooking, wok ranges, built-in modules and specialty foodservice equipment.',
          ],
          stats: [
            {_key: 'factory-stat-01', _type: 'statItem', value: '7000sqm', label: 'Factory', icon: 'factory'},
            {_key: 'factory-stat-02', _type: 'statItem', value: '90+', label: 'Employees', icon: 'users'},
            {_key: 'factory-stat-03', _type: 'statItem', value: '6', label: 'R&D Personnel', icon: 'sparkles'},
            {_key: 'factory-stat-04', _type: 'statItem', value: '8', label: 'QC Inspectors', icon: 'shieldCheck'},
            {_key: 'factory-stat-05', _type: 'statItem', value: '15', label: 'Sales Team', icon: 'mailCheck'},
            {_key: 'factory-stat-06', _type: 'statItem', value: '8', label: 'After-sales Instructors', icon: 'headset'},
          ]
        })
        .commit()
      console.log('factoryPage stats patched successfully!')
    } else {
      console.log('factoryPage document not found, skipping patch.')
    }

    console.log('Successfully completed all CMS stats updates!')
  } catch (err) {
    console.error('Update failed:', err.message)
    process.exit(1)
  }
}

run()
