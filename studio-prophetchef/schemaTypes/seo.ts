import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO 与分享设置',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: '搜索标题',
      type: 'string',
      description: '用于搜索引擎和浏览器标题，建议 50-60 个英文字符以内。',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: '搜索描述',
      type: 'text',
      rows: 3,
      description: '页面摘要，用于搜索结果描述，建议 150-160 个英文字符以内。',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'canonicalUrl',
      title: '规范链接 Canonical URL',
      type: 'url',
      description: '可选。除非该页面需要指向另一个规范地址，否则保持为空。',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'openGraphTitle',
      title: '社媒分享标题',
      type: 'string',
      description: '可选，社交媒体分享时使用的标题。',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'openGraphDescription',
      title: '社媒分享描述',
      type: 'text',
      rows: 3,
      description: '可选，社交媒体分享时使用的描述。',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'openGraphImage',
      title: '社媒分享图片',
      type: 'image',
      description: '分享链接时展示的图片，建议 1200x630。',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: '图片替代文字',
          type: 'string',
          description: '用于社媒分享图片的无障碍说明。',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      title: '禁止索引',
      type: 'boolean',
      description: '开启后该页面不会出现在搜索结果中，并会从站点地图排除。',
      initialValue: false,
    }),
  ],
})
