import {defineField, defineType} from 'sanity'
import {isUniqueSlug} from './slugValidation'

export const productType = defineType({
  name: 'product',
  title: '产品资料',
  type: 'document',
  groups: [
    {name: 'basic', title: '基础信息'},
    {name: 'media', title: '图片素材'},
    {name: 'details', title: '卖点与参数'},
    {name: 'faqs', title: '常见问题'},
    {name: 'seo', title: 'SEO 设置'},
    {name: 'settings', title: '排序与状态'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: '产品名称',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameZh',
      title: 'Product name (ZH)',
      type: 'string',
      group: 'basic',
      description: 'Internal Chinese reference from the catalog database.',
    }),
    defineField({
      name: 'slug',
      title: '网址标识 Slug',
      type: 'slug',
      group: 'basic',
      description: '用于生成产品详情页地址，只能使用小写英文、数字和连字符，例如 commercial-oven。',
      options: {source: 'name', maxLength: 96, isUnique: isUniqueSlug},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9-]+$/.test(slug.current) || 'Slug must use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({
      name: 'category',
      title: '产品分类',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'basic',
      description: '决定产品在前台分类区块中的归属。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '产品简介',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: '展示在产品卡片和详情页头部，建议 1-2 句话说明核心用途。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      group: 'media',
      description: '产品列表和详情页主图，建议使用清晰的设备实拍或白底图。',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: '图片替代文字',
          type: 'string',
          validation: (rule) => rule.required(),
          description: '用于无障碍和 SEO，简要描述图片内容。',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: '产品图册',
      type: 'array',
      group: 'media',
      description: '补充展示细节图、场景图、结构图等。',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: '图片替代文字',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: '核心卖点',
      type: 'array',
      group: 'details',
      description: '用于详情页卖点列表，建议 3-6 条。',
      of: [{type: 'productFeature'}],
    }),
    defineField({
      name: 'specifications',
      title: '技术参数',
      type: 'array',
      group: 'details',
      description: '填写规格、功率、尺寸、材质等结构化参数。',
      of: [{type: 'productSpecification'}],
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      group: 'details',
      description: '用于补充产品关键词，方便前台展示或后续筛选。',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'modelCode',
      title: '型号编码',
      type: 'string',
      group: 'details',
      description: '如果产品有内部型号或客户常用型号，可填写在这里。',
    }),
    defineField({
      name: 'variants',
      title: 'Product variants',
      type: 'array',
      group: 'details',
      description: 'Structured model rows imported from the catalog database.',
      of: [{type: 'productVariant'}],
    }),
    defineField({
      name: 'catalogPageId',
      title: 'Catalog page ID',
      type: 'number',
      group: 'settings',
      readOnly: true,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'catalogPageNo',
      title: 'Catalog page number',
      type: 'number',
      group: 'settings',
      readOnly: true,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'catalogPageCode',
      title: 'Catalog page code',
      type: 'string',
      group: 'settings',
      readOnly: true,
    }),
    defineField({
      name: 'sourceNote',
      title: 'Source note',
      type: 'text',
      rows: 2,
      group: 'settings',
    }),
    defineField({
      name: 'faqs',
      title: '常见问题',
      type: 'array',
      group: 'faqs',
      description: '产品详情页问答，最多 8 条。',
      of: [{type: 'faqItem'}],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'isArchived',
      title: '归档隐藏',
      type: 'boolean',
      group: 'settings',
      description: '开启后前台不展示该产品，适合停售或暂不推广的产品。',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      title: '排序值',
      type: 'number',
      group: 'settings',
      description: '数字越小越靠前。建议按 10、20、30 留出插入空间。',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'seo',
      title: 'SEO 设置',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: '按排序值从小到大',
      name: 'orderRankAsc',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      categoryName: 'category.name',
      media: 'coverImage',
    },
    prepare({title, categoryName, media}) {
      return {
        title,
        subtitle: categoryName ? `分类：${categoryName}` : '未选择分类',
        media,
      }
    },
  },
})
