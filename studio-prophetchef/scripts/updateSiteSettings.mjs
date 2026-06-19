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
    console.log('Updating siteSettings in Sanity...')
    
    // Check if the document exists first
    const doc = await client.getDocument('siteSettings')
    if (!doc) {
      console.log('siteSettings document does not exist. Creating it...')
      await client.createOrReplace({
        _id: 'siteSettings',
        _type: 'siteSettings',
        title: 'ProphetChef',
        legalName: '东莞市惠和机电有限公司',
        description:
          'ProphetChef manufactures commercial induction cooking equipment, automatic cooking machines, steamers, fryers, griddles and specialty kitchen equipment for global foodservice projects.',
        siteUrl: 'https://prophetchef.com',
        contactInfo: {
          email: 'service@prophetchef.com',
          phone: '+86 18351834957',
          whatsapp: '8618351834957',
          address: 'Room 112, Building 1, No. 13 Jiangcheng East Road, Gaobu Town, Dongguan, Guangdong, China (东莞市惠和机电有限公司)',
        },
      })
    } else {
      await client
        .patch('siteSettings')
        .set({
          title: 'ProphetChef',
          legalName: '东莞市惠和机电有限公司',
          description:
            'ProphetChef manufactures commercial induction cooking equipment, automatic cooking machines, steamers, fryers, griddles and specialty kitchen equipment for global foodservice projects.',
          siteUrl: 'https://prophetchef.com',
          contactInfo: {
            email: 'service@prophetchef.com',
            phone: '+86 18351834957',
            whatsapp: '8618351834957',
            address: 'Room 112, Building 1, No. 13 Jiangcheng East Road, Gaobu Town, Dongguan, Guangdong, China (东莞市惠和机电有限公司)',
          },
        })
        .commit()
    }

    console.log('Successfully updated siteSettings in Sanity!')
  } catch (err) {
    console.error('Failed to update siteSettings:', err.message)
    process.exit(1)
  }
}

run()
