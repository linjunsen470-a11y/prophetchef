import {defineField, defineType} from 'sanity'
import {isUniqueSlug} from './slugValidation'

export const applicationType = defineType({
  name: 'application',
  title: '应用场景',
  type: 'document',
  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'seo', title: 'SEO 设置'},
    {name: 'settings', title: '排序设置'},
  ],
  fields: [
    defineField({name: 'name', title: '场景名称', type: 'string', group: 'general', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: '网址标识 Slug',
      type: 'slug',
      group: 'general',
      description: '用于应用场景链接，只能使用小写英文、数字和连字符。',
      options: {source: 'name', maxLength: 96, isUnique: isUniqueSlug},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9-]+$/.test(slug.current) || 'Slug must use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({name: 'description', title: '场景说明', type: 'text', rows: 3, group: 'general'}),
    defineField({
      name: 'recommended',
      title: '推荐设备',
      type: 'string',
      group: 'general',
      description: '简短列出该场景适合推荐的设备类型或组合。',
    }),
    defineField({
      name: 'image',
      title: '场景图片',
      type: 'image',
      group: 'general',
      description: '用于应用场景卡片，建议使用真实厨房场景或方案图片。',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: '图片替代文字', type: 'string'})],
    }),
    defineField({
      name: 'quoteProductName',
      title: '询盘默认产品名',
      type: 'string',
      group: 'general',
      description: '留空时会默认使用“场景名称 + Solution”。',
    }),
    defineField({
      name: 'orderRank',
      title: '排序值',
      type: 'number',
      group: 'settings',
      description: '控制前台应用场景展示顺序，数字越小越靠前。',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'seo',
      title: 'SEO 设置',
      description: '预留给未来应用场景落地页使用。',
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
      subtitle: 'recommended',
      media: 'image',
    },
  },
})
