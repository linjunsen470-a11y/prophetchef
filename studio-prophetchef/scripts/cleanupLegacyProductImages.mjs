import {createClient} from '@sanity/client'
import {execFile} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {promisify} from 'node:util'
import {fileURLToPath} from 'node:url'

const execFileAsync = promisify(execFile)
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioDir = path.resolve(scriptDir, '..')

loadEnv(path.join(studioDir, '.env'))

const dryRun = process.argv.includes('--dry-run')
const catalogDbPath =
  process.env.CATALOG_DB_PATH ||
  'C:\\Users\\lin\\AppData\\Roaming\\Adobe\\InDesign\\Version 21.0-J\\zh_CN\\Scripts\\Scripts Panel\\catalog.db'
const projectId = process.env.SANITY_PROJECT_ID || '3kytazzh'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_EDITOR_TOKEN

if (!token) {
  throw new Error('Missing SANITY_WRITE_TOKEN or SANITY_API_EDITOR_TOKEN.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-05-05',
  useCdn: false,
})

const knownLegacyFilenames = new Set([
  'hero-wok-range.webp',
  'countertop-flat.webp',
  'built-in-flat.webp',
  'claypot-6-burner.webp',
  'fryer-front.webp',
  'noodle-9-hole.webp',
])

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    process.env[key] ||= value
  }
}

function basename(value) {
  return value ? path.basename(value.replaceAll('\\', '/')) : ''
}

async function readCatalogImageNames() {
  const pythonCode = `
import json, sqlite3, sys
db_path = sys.argv[1]
con = sqlite3.connect(db_path)
names = set()
for row in con.execute('select hero_image_path, three_view_image_path from catalog_page'):
    for value in row:
        if value:
            names.add(value.replace('\\\\', '/').split('/')[-1])
for row in con.execute('select source_image from product_spec where source_image is not null'):
    names.add(row[0].replace('\\\\', '/').split('/')[-1])
print(json.dumps(sorted(names), ensure_ascii=False))
`
  const {stdout} = await execFileAsync('python', ['-c', pythonCode, catalogDbPath], {
    maxBuffer: 1024 * 1024 * 8,
    windowsHide: true,
    env: {...process.env, PYTHONIOENCODING: 'utf-8'},
  })
  return JSON.parse(stdout).map(basename)
}

async function main() {
  for (const name of await readCatalogImageNames()) knownLegacyFilenames.add(name)

  const candidates = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename in $filenames]{
      _id,
      originalFilename,
      url
    }`,
    {filenames: Array.from(knownLegacyFilenames)},
  )

  let deleted = 0
  let kept = 0
  for (const asset of candidates) {
    const referenceCount = await client.fetch(`count(*[references($id)])`, {id: asset._id})
    if (referenceCount > 0) {
      kept += 1
      console.log(`Kept referenced asset (${referenceCount} refs): ${asset.originalFilename}`)
      continue
    }

    if (dryRun) {
      console.log(`Would delete unreferenced asset: ${asset.originalFilename}`)
    } else {
      await client.delete(asset._id)
      console.log(`Deleted unreferenced asset: ${asset.originalFilename}`)
    }
    deleted += 1
  }

  console.log(`${dryRun ? 'Dry run' : 'Cleanup'} complete. Candidates: ${candidates.length}. ${dryRun ? 'Would delete' : 'Deleted'}: ${deleted}. Kept referenced: ${kept}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
