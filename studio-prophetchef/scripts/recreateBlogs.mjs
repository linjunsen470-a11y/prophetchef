import {createClient} from '@sanity/client'
import {Buffer} from 'node:buffer'

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
    // 1. Delete all existing news articles
    console.log('Fetching all existing news articles...')
    const articles = await client.fetch('*[_type == "newsArticle"]')
    console.log(`Found ${articles.length} news articles. Deleting them...`)
    
    for (const article of articles) {
      await client.delete(article._id)
      console.log(`Deleted article: ${article.title} (${article._id})`)
    }
    
    // 2. Fetch and upload the selected realistic cover image
    const imageUrl = 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=80'
    console.log(`Downloading cover image from: ${imageUrl}...`)
    const imgResponse = await fetch(imageUrl)
    if (!imgResponse.ok) {
      throw new Error(`Failed to download image. Status: ${imgResponse.status}`)
    }
    
    const buffer = Buffer.from(await imgResponse.arrayBuffer())
    console.log('Uploading image to Sanity assets...')
    const imageAsset = await client.assets.upload('image', buffer, {
      filename: 'modern-commercial-kitchen.jpg',
      contentType: 'image/jpeg',
    })
    console.log(`Uploaded image asset ID: ${imageAsset._id}`)

    // 3. Find or create news category
    console.log('Checking news categories...')
    let categories = await client.fetch('*[_type == "newsCategory"]')
    let categoryRef = ''
    
    const targetCategory = categories.find(c => c.title === 'Product Knowledge' || c.slug?.current === 'product-knowledge')
    if (targetCategory) {
      categoryRef = targetCategory._id
      console.log(`Found existing category: ${targetCategory.title} (${categoryRef})`)
    } else if (categories.length > 0) {
      categoryRef = categories[0]._id
      console.log(`Using first available category: ${categories[0].title} (${categoryRef})`)
    } else {
      console.log('No categories found. Creating "Product Knowledge" category...')
      const newCategory = await client.create({
        _type: 'newsCategory',
        title: 'Product Knowledge',
        slug: {_type: 'slug', current: 'product-knowledge'},
        description: 'Product Knowledge articles for commercial kitchen buyers.',
        orderRank: 1,
      })
      categoryRef = newCategory._id
      console.log(`Created category: ${newCategory.title} (${categoryRef})`)
    }

    // 4. Create the new simple blog article
    console.log('Creating new blog article: "Cooking Machine Guide"...')
    const newArticle = {
      _id: 'news-cooking-machine-guide',
      _type: 'newsArticle',
      title: 'Cooking Machine Guide',
      slug: {_type: 'slug', current: 'cooking-machine-guide'},
      excerpt: 'How automatic stir-fry machines help chain restaurants standardize recipes, reduce labor costs, and improve kitchen efficiency.',
      publishedAt: new Date().toISOString(),
      category: {_type: 'reference', _ref: categoryRef},
      tags: ['Automation', 'Stir-Fry Machine', 'Kitchen Efficiency'],
      coverImage: {
        _type: 'image',
        asset: {_type: 'reference', _ref: imageAsset._id},
        alt: 'Clean and modern stainless steel commercial kitchen',
      },
      body: [
        {
          _key: 'block1',
          _type: 'block',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _key: 'span1',
              _type: 'span',
              marks: [],
              text: 'In the modern foodservice industry, rising labor costs and the demand for consistent food quality are driving chain restaurants to adopt kitchen automation. Among the most impactful innovations is the automatic stir-fry cooking machine.',
            },
          ],
        },
        {
          _key: 'heading1',
          _type: 'block',
          style: 'h2',
          markDefs: [],
          children: [
            {
              _key: 'span2',
              _type: 'span',
              marks: [],
              text: 'Key Advantages of Automatic Cooking',
            },
          ],
        },
        {
          _key: 'block2',
          _type: 'block',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _key: 'span3',
              _type: 'span',
              marks: [],
              text: 'Standardized Recipes: Programmed rotation speeds and precise induction heat profiles ensure dishes taste identical across all restaurant locations.\nLabor Savings: A single operator can manage multiple stir-fry machines, significantly reducing kitchen staffing requirements.\nEnhanced Safety: Enclosed cooking drums reduce exposure to high heat, grease splatters, and kitchen oil fumes.',
            },
          ],
        },
      ],
      isArchived: false,
      seo: {
        _type: 'seo',
        metaTitle: 'Cooking Machine Guide | ProphetChef',
        metaDescription: 'Learn how automatic stir-fry cooking machines help commercial kitchens save labor and standardize recipes.',
        noIndex: false,
      }
    }

    await client.createOrReplace(newArticle)
    console.log('Successfully created the new blog article!')

  } catch (err) {
    console.error('Operation failed:', err.message)
    process.exit(1)
  }
}

run()
