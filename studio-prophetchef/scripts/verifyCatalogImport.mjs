import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '3kytazzh',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-05-05',
  useCdn: false,
})

const result = await client.fetch(`{
  "products": count(*[_type == "product" && !isArchived]),
  "oldActiveProducts": count(*[_type == "product" && !isArchived && !defined(catalogPageId)]),
  "variants": math::sum(*[_type == "product" && !isArchived]{"n": count(variants)}.n),
  "homeDocs": *[_type == "homePage"]{_id, title, "featuredCategorySlugs": featuredCategories[]->slug.current},
  "productsPageDocs": *[_type == "productsPage"]{_id, title, "heroImage": hero.backgroundImage.asset->originalFilename},
  "sampleSlugs": *[_type == "product" && !isArchived] | order(orderRank asc)[0...5].slug.current,
  "categories": *[_type == "category" && slug.current in [
    "tabletop-built-in-induction-equipment",
    "automatic-cooking-machines",
    "steamers-ovens-soup-kettles",
    "freestanding-wok-soup-cookers",
    "freestanding-induction-line",
    "specialty-cooking-equipment"
  ]] | order(orderRank asc){
    name,
    "image": image.asset->originalFilename
  },
  "productsHero": *[_id == "productsPage"][0].hero.backgroundImage.asset->originalFilename,
  "globalSeoImage": *[_id == "siteSettings"][0].globalSeo.openGraphImage.asset->originalFilename
}`)

console.log(JSON.stringify(result, null, 2))
