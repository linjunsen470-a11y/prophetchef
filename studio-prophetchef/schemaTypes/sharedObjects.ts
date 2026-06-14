import {defineArrayMember, defineField, defineType} from 'sanity'

export const COMMON_ICONS = [
  {title: '认证徽章 / Badge Check', value: 'badgeCheck'},
  {title: '建筑 / Building', value: 'building'},
  {title: '日历 / Calendar', value: 'calendar'},
  {title: '勾选圆圈 / Check Circle', value: 'checkCircle'},
  {title: '清单核验 / Clipboard Check', value: 'clipboardCheck'},
  {title: '时间 / Clock', value: 'clock'},
  {title: '指南针 / Compass', value: 'compass'},
  {title: '工厂 / Factory', value: 'factory'},
  {title: '文件核验 / File Check', value: 'fileCheck'},
  {title: '实验 / Flask', value: 'flask'},
  {title: '全球 / Globe', value: 'globe'},
  {title: '客服 / Headset', value: 'headset'},
  {title: '地标 / Landmark', value: 'landmark'},
  {title: '邮件确认 / Mail Check', value: 'mailCheck'},
  {title: '地图 / Map', value: 'map'},
  {title: '定位 / Map Pin', value: 'mapPin'},
  {title: '尺寸扩展 / Maximize', value: 'maximize'},
  {title: '飞机 / Plane', value: 'plane'},
  {title: '插头 / Plug', value: 'plug'},
  {title: '回收 / Recycle', value: 'recycle'},
  {title: '剪刀 / Scissors', value: 'scissors'},
  {title: '设置 / Settings', value: 'settings'},
  {title: '安全认证 / Shield Check', value: 'shieldCheck'},
  {title: '船运 / Ship', value: 'ship'},
  {title: '亮点 / Sparkles', value: 'sparkles'},
  {title: '用户 / Users', value: 'users'},
  {title: '水波 / Waves', value: 'waves'},
  {title: '工具 / Wrench', value: 'wrench'},
  {title: '闪电 / Zap', value: 'zap'},
]

const hrefValidation = (rule: any) =>
  rule.required().custom((value: string | undefined) => {
    if (!value) return true
    if (/^(\/|https?:\/\/|mailto:|tel:)/.test(value)) return true
    return 'Use an internal path (/contact), http(s) URL, mailto:, or tel: link.'
  })

export const ctaButtonType = defineType({
  name: 'ctaButton',
  title: '按钮',
  type: 'object',
  fields: [
    defineField({name: 'text', title: '按钮文字', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'href',
      title: '链接地址',
      type: 'string',
      description: '支持站内路径、http(s)、mailto: 和 tel:。',
      validation: hrefValidation,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'href',
    },
  },
})

export const pageHeroType = defineType({
  name: 'pageHero',
  title: '页面首屏 Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: '眉标题', type: 'string'}),
    defineField({name: 'title', title: '主标题', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: '说明文案', type: 'text', rows: 3}),
    defineField({
      name: 'backgroundImage',
      title: '背景图',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: '图片替代文字', type: 'string'})],
    }),
    defineField({name: 'primaryCta', title: '主按钮', type: 'ctaButton'}),
    defineField({name: 'secondaryCta', title: '次按钮', type: 'ctaButton'}),
  ],
})

export const sectionHeaderType = defineType({
  name: 'sectionHeader',
  title: '区块标题',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: '眉标题', type: 'string'}),
    defineField({name: 'title', title: '标题', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: '说明文案', type: 'text', rows: 2}),
    defineField({name: 'cta', title: '按钮', type: 'ctaButton'}),
  ],
})

export const statItemType = defineType({
  name: 'statItem',
  title: '数据指标',
  type: 'object',
  description:
    '可用于数字背书（如 20+ / 15000+）或纯文字徽章（如 Factory direct）。纯徽章场景可只填标签，数值留空。',
  fields: [
    defineField({
      name: 'label',
      title: '标签',
      type: 'string',
      description: '前台展示的主文案，例如 Factory direct、Years Mfg.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: '数值（可选）',
      type: 'string',
      description: '可选前缀数字或短语，例如 20+、24h。产品页徽章、页脚能力标签可留空。',
    }),
    defineField({name: 'icon', title: '前台图标', type: 'string', options: {list: COMMON_ICONS}}),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle || '纯文字徽章',
      }
    },
  },
})

export const textCardType = defineType({
  name: 'textCard',
  title: '文本卡片',
  type: 'object',
  fields: [
    defineField({name: 'title', title: '标题', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: '说明文案', type: 'text', rows: 3}),
    defineField({name: 'icon', title: '前台图标', type: 'string', options: {list: COMMON_ICONS}}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

export const mediaTextSectionType = defineType({
  name: 'mediaTextSection',
  title: '图文模块',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: '眉标题', type: 'string'}),
    defineField({name: 'title', title: '标题', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'paragraphs',
      title: '段落',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'image',
      title: '图片',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: '图片替代文字', type: 'string'})],
    }),
    defineField({
      name: 'bullets',
      title: '要点列表',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'cta', title: '按钮', type: 'ctaButton'}),
  ],
})

export const faqItemType = defineType({
  name: 'faqItem',
  title: '常见问题',
  type: 'object',
  fields: [
    defineField({name: 'question', title: '问题', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'answer', title: '回答', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
})

export const productFeatureType = defineType({
  name: 'productFeature',
  title: '产品卖点',
  type: 'object',
  fields: [
    defineField({name: 'title', title: '卖点标题', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: '说明文案', type: 'text', rows: 2}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

export const productSpecificationType = defineType({
  name: 'productSpecification',
  title: '产品参数',
  type: 'object',
  fields: [
    defineField({name: 'label', title: '参数名', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'value', title: '参数值', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
})

export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({name: 'productNameEn', title: 'Product name (EN)', type: 'string'}),
    defineField({name: 'productNameZh', title: 'Product name (ZH)', type: 'string'}),
    defineField({name: 'modelCode', title: 'Model code', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lengthMm', title: 'Length (mm)', type: 'string'}),
    defineField({name: 'widthMm', title: 'Width (mm)', type: 'string'}),
    defineField({name: 'heightMm', title: 'Height (mm)', type: 'string'}),
    defineField({name: 'powerKw', title: 'Power (kW)', type: 'string'}),
    defineField({name: 'voltageV', title: 'Voltage (V)', type: 'string'}),
    defineField({name: 'frequencyHz', title: 'Frequency (Hz)', type: 'string'}),
    defineField({name: 'extraLabelEn', title: 'Extra label', type: 'string'}),
    defineField({name: 'extraValue', title: 'Extra value', type: 'string'}),
    defineField({name: 'extraUnit', title: 'Extra unit', type: 'string'}),
    defineField({name: 'sourceImage', title: 'Source image file', type: 'string'}),
    defineField({name: 'sourceNote', title: 'Source note', type: 'text', rows: 2}),
    defineField({name: 'needsReview', title: 'Needs review', type: 'boolean', initialValue: false}),
    defineField({name: 'orderRank', title: 'Sort order', type: 'number', validation: (rule) => rule.integer()}),
  ],
  preview: {
    select: {
      title: 'modelCode',
      subtitle: 'productNameEn',
    },
  },
})

export const globalCtaType = defineType({
  name: 'globalCta',
  title: '全站 CTA',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: '眉标题', type: 'string'}),
    defineField({name: 'title', title: '标题', type: 'string'}),
    defineField({name: 'description', title: '说明文案', type: 'text', rows: 2}),
    defineField({name: 'primaryCta', title: '主按钮', type: 'ctaButton'}),
    defineField({name: 'whatsappText', title: 'WhatsApp 按钮文字', type: 'string'}),
    defineField({name: 'whatsappMessage', title: 'WhatsApp 预填消息', type: 'text', rows: 2}),
  ],
})

export const navigationLinkType = defineType({
  name: 'navigationLink',
  title: '导航链接',
  type: 'object',
  fields: [
    defineField({name: 'label', title: '链接文字', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'href', title: '链接地址', type: 'string', validation: hrefValidation}),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
