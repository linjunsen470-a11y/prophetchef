import {defineField, defineType} from 'sanity'
import {isUniqueSlug} from './slugValidation'

export const newsCategoryType = defineType({
  name: 'newsCategory',
  title: '新闻分类',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '分类名称', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: '网址标识 Slug',
      type: 'slug',
      description: '用于新闻分类相关链接，只能使用小写英文、数字和连字符。',
      options: {source: 'title', maxLength: 96, isUnique: isUniqueSlug},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9-]+$/.test(slug.current) || 'Slug must use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({name: 'description', title: '分类说明', type: 'text', rows: 2}),
    defineField({
      name: 'orderRank',
      title: '排序值',
      type: 'number',
      description: '控制新闻分类展示顺序，数字越小越靠前。',
      validation: (rule) => rule.integer().min(0),
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
      title: 'title',
      subtitle: 'description',
    },
  },
})
