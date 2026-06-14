import {defineField, defineType} from 'sanity'
import {COMMON_ICONS} from './sharedObjects'

const certificateIcons = COMMON_ICONS.filter((icon) =>
  ['badgeCheck', 'clipboardCheck', 'fileCheck', 'plug', 'recycle', 'shieldCheck'].includes(icon.value),
)

export const certificateType = defineType({
  name: 'certificate',
  title: '认证资质',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '认证名称', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'shortLabel',
      title: '短标签',
      type: 'string',
      description: '显示在认证徽章内，例如 CE、ISO、RoHS。',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '认证说明',
      type: 'text',
      rows: 2,
      initialValue: 'Available for selected commercial kitchen equipment models and export projects.',
    }),
    defineField({
      name: 'icon',
      title: '前台图标',
      type: 'string',
      description: '选择用于前台展示的图标，不确定时可使用 badgeCheck 或 shieldCheck。',
      options: {
        list: certificateIcons,
      },
    }),
    defineField({
      name: 'orderRank',
      title: '排序值',
      type: 'number',
      description: '控制前台认证展示顺序，数字越小越靠前。',
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
      subtitle: 'shortLabel',
    },
  },
})
