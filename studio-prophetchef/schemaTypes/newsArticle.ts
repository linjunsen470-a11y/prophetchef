import {defineField, defineType} from 'sanity'
import {isUniqueSlug} from './slugValidation'

export const newsArticleType = defineType({
  name: 'newsArticle',
  title: '新闻文章',
  type: 'document',
  groups: [
    {name: 'basic', title: '基础信息'},
    {name: 'media', title: '图片素材'},
    {name: 'body', title: '正文内容'},
    {name: 'faqs', title: '常见问题'},
    {name: 'seo', title: 'SEO 设置'},
    {name: 'settings', title: '发布状态'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: '文章标题',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '网址标识 Slug',
      type: 'slug',
      group: 'basic',
      description: '用于新闻详情页地址，只能使用小写英文、数字和连字符。',
      options: {source: 'title', maxLength: 96, isUnique: isUniqueSlug},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9-]+$/.test(slug.current) || 'Slug must use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({
      name: 'excerpt',
      title: '文章摘要',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: '展示在新闻列表和分享摘要中，建议 1-2 句话。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      group: 'media',
      description: '用于新闻列表、详情页和分享卡片，建议 1200px 以上宽度。',
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
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      group: 'basic',
      description: '前台会按该时间排序；可设置过去或未来时间。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: '新闻分类',
      type: 'reference',
      to: [{type: 'newsCategory'}],
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      group: 'basic',
      description: '用于补充文章关键词。',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      title: '正文',
      type: 'array',
      group: 'body',
      description: '文章主体内容，支持标题、段落、列表等富文本。',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'faqs',
      title: '常见问题',
      type: 'array',
      group: 'faqs',
      description: '文章页底部问答，最多 8 条。',
      of: [{type: 'faqItem'}],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'isArchived',
      title: '归档隐藏',
      type: 'boolean',
      group: 'settings',
      description: '开启后前台不展示该文章。',
      initialValue: false,
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
      title: '按发布时间从新到旧',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      categoryTitle: 'category.title',
      media: 'coverImage',
    },
    prepare({title, categoryTitle, media}) {
      return {
        title,
        subtitle: categoryTitle,
        media,
      }
    },
  },
})
