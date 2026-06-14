import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3kytazzh',
    dataset: 'production'
  },
  typegen: {
    enabled: true,
    path: '../my-app/sanity/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../my-app/sanity.types.ts',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
