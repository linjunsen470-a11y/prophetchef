import type {StructureBuilder, StructureResolver} from 'sanity/structure'

const singletonTypes = [
  'siteSettings',
  'homePage',
  'productsPage',
  'newsPage',
  'factoryPage',
  'applicationsPage',
  'certificatesPage',
  'contactPage',
]

const hiddenDocumentTypes = [
  ...singletonTypes,
  'product',
  'category',
  'application',
  'certificate',
  'newsCategory',
  'newsArticle',
]

function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .id(type)
    .title(title)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id('content-root')
    .title('内容管理')
    .items([
      S.listItem()
        .id('pages-group')
        .title('全站与页面')
        .child(
          S.list()
            .id('pages')
            .title('全站与页面')
            .items([
              singleton(S, 'siteSettings', '全站设置'),
              singleton(S, 'homePage', '首页'),
              singleton(S, 'productsPage', '产品页'),
              singleton(S, 'newsPage', '新闻页'),
              singleton(S, 'factoryPage', '工厂页'),
              singleton(S, 'applicationsPage', '应用方案页'),
              singleton(S, 'certificatesPage', '认证资质页'),
              singleton(S, 'contactPage', '联系我们页'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id('content-data-group')
        .title('内容资料')
        .child(
          S.list()
            .id('content-data')
            .title('内容资料')
            .items([
              S.documentTypeListItem('product').id('product').title('产品资料'),
              S.documentTypeListItem('category').id('category').title('产品分类'),
              S.documentTypeListItem('application').id('application').title('应用场景'),
              S.documentTypeListItem('certificate').id('certificate').title('认证资质'),
              S.documentTypeListItem('newsCategory').id('newsCategory').title('新闻分类'),
              S.documentTypeListItem('newsArticle').id('newsArticle').title('新闻文章'),
            ]),
        ),
      // Filter out manually configured items from the generated document type list.
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenDocumentTypes.includes(listItem.getId() || ''),
      ),
    ])