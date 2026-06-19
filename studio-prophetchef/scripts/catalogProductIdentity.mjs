export const catalogProductOverrides = {
  1: {
    name: 'Built-in Flat Induction Cooktop',
    slug: 'built-in-flat-induction-cooktop',
  },
  2: {
    name: 'Built-in Wok Induction Cooktop',
    slug: 'built-in-wok-induction-cooktop',
  },
}

export function toSlug(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getCatalogProductName(page) {
  return catalogProductOverrides[page.page_id]?.name || page.main_title_en
}

export function getCatalogProductSlug(page) {
  return catalogProductOverrides[page.page_id]?.slug || toSlug(page.main_title_en)
}