import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the singleton types
const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'productsPage',
  'newsPage',
  'factoryPage',
  'applicationsPage',
  'certificatesPage',
  'contactPage',
])

export default defineConfig({
  name: 'default',
  title: 'prophetchef',

  projectId: '3kytazzh',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    media(),
    presentationTool({
      allowOrigins: [previewUrl],
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
          shareAccess: true,
        },
      },
      resolve: {
        mainDocuments: [
          {route: '/', type: 'homePage'},
          {route: '/products', type: 'productsPage'},
          {
            route: '/products/:slug',
            filter: `_type == "product" && slug.current == $slug`,
            params: ({params}) => ({slug: params.slug}),
          },
          {route: '/news', type: 'newsPage'},
          {
            route: '/news/:slug',
            filter: `_type == "newsArticle" && slug.current == $slug`,
            params: ({params}) => ({slug: params.slug}),
          },
          {route: '/factory', type: 'factoryPage'},
          {route: '/applications', type: 'applicationsPage'},
          {route: '/certificates', type: 'certificatesPage'},
          {route: '/contact', type: 'contactPage'},
        ],
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from new document options
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not applicable (e.g., delete, duplicate)
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
      }
      return prev
    },
  },
})
