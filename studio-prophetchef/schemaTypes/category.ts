import {defineField, defineType} from 'sanity'
import {isUniqueSlug} from './slugValidation'

export const categoryType = defineType({
  name: 'category',
  title: '产品分类',
  type: 'document',
  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'seo', title: 'SEO 设置'},
    {name: 'settings', title: '排序设置'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: '分类名称',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '网址标识 Slug',
      type: 'slug',
      group: 'general',
      description: '用于分类相关链接，只能使用小写英文、数字和连字符。',
      options: {source: 'name', maxLength: 96, isUnique: isUniqueSlug},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9-]+$/.test(slug.current) || 'Slug must use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({
      name: 'description',
      title: '分类简介',
      type: 'text',
      group: 'general',
      rows: 3,
      description: '展示在分类卡片或产品页区块中，建议说明该分类适合的厨房场景。',
    }),
    defineField({
      name: 'image',
      title: '分类图片',
      type: 'image',
      group: 'general',
      description: '用于分类卡片，建议选择能代表该类设备的清晰图片。',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: '图片替代文字',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: '排序值',
      group: 'settings',
      description: '控制前台分类展示顺序，数字越小越靠前。',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'SEO 设置',
      group: 'seo',
      description: '预留给未来分类落地页使用，目前前台暂未渲染。',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
