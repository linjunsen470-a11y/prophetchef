import {defineArrayMember, defineField, defineType} from 'sanity'

export const productsPageType = defineType({
  name: 'productsPage',
  title: '产品页',
  type: 'document',
  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'Products'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({
      name: 'metrics',
      title: '首屏数据指标',
      type: 'array',
      group: 'general',
      description: '展示在产品页首屏的能力徽章，最多 4 个。通常只需填写标签和图标，数值可留空。',
      of: [defineArrayMember({type: 'statItem'})],
      validation: (rule) => rule.max(4),
    }),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '产品页', subtitle: '产品列表页首屏和 SEO'}
    },
  },
})

export const newsPageType = defineType({
  name: 'newsPage',
  title: '新闻页',
  type: 'document',

  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'News'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '新闻页', subtitle: '新闻列表页首屏和 SEO'}
    },
  },
})

export const factoryPageType = defineType({
  name: 'factoryPage',
  title: '工厂页',
  type: 'document',

  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'overview', title: '工厂概览与数据'},
    {name: 'production', title: '生产流程'},
    {name: 'team', title: '团队能力'},
    {name: 'markets', title: '出口市场'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'Factory'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({name: 'overview', title: '工厂概览', type: 'mediaTextSection', group: 'overview'}),
    defineField({
      name: 'stats',
      title: '工厂数据',
      type: 'array',
      group: 'overview',
      description: '工厂页数据卡片，建议数值和标签都填写，例如 20+ / Years Experience。',
      of: [defineArrayMember({type: 'statItem'})],
    }),
    defineField({name: 'productionHeader', title: '生产流程标题', type: 'sectionHeader', group: 'production'}),
    defineField({
      name: 'productionSteps',
      title: '生产流程步骤',
      type: 'array',
      group: 'production',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({name: 'teamHeader', title: '团队能力标题', type: 'sectionHeader', group: 'team'}),
    defineField({
      name: 'teamItems',
      title: '团队能力条目',
      type: 'array',
      group: 'team',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({name: 'marketsHeader', title: '出口市场标题', type: 'sectionHeader', group: 'markets'}),
    defineField({
      name: 'exportMarkets',
      title: '出口市场数据',
      type: 'array',
      group: 'markets',
      description: '出口市场标签。可只填国家/地区名称；如需展示数量前缀，再填写数值。',
      of: [defineArrayMember({type: 'statItem'})],
    }),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '工厂页', subtitle: '工厂概览、生产流程、团队和市场'}
    },
  },
})

export const applicationsPageType = defineType({
  name: 'applicationsPage',
  title: '应用方案页',
  type: 'document',

  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'applications', title: '精选应用'},
    {name: 'solutions', title: '方案详情'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'Applications'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({name: 'gridHeader', title: '应用列表标题', type: 'sectionHeader', group: 'applications'}),
    defineField({
      name: 'featuredApplications',
      title: '精选应用场景',
      description: '留空时按排序值展示全部应用场景。',
      type: 'array',
      group: 'applications',
      of: [defineArrayMember({type: 'reference', to: [{type: 'application'}]})],
    }),
    defineField({name: 'solutionsHeader', title: '方案详情标题', type: 'sectionHeader', group: 'solutions'}),
    defineField({
      name: 'solutionDetails',
      title: '项目方案示例',
      type: 'array',
      group: 'solutions',
      of: [
        defineArrayMember({
          name: 'solutionDetail',
          title: '方案详情',
          type: 'object',
          fields: [
            defineField({name: 'title', title: '标题', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'painPoints', title: '客户痛点', type: 'text', rows: 3}),
            defineField({name: 'recommendedEquipment', title: '推荐设备', type: 'text', rows: 3}),
            defineField({name: 'benefits', title: '方案收益', type: 'text', rows: 3}),
            defineField({name: 'cta', title: '按钮', type: 'ctaButton'}),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'recommendedEquipment',
            },
          },
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '应用方案页', subtitle: '应用列表和方案详情'}
    },
  },
})

export const certificatesPageType = defineType({
  name: 'certificatesPage',
  title: '认证资质页',
  type: 'document',

  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'certificates', title: '认证列表'},
    {name: 'process', title: '流程与 CTA'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'Certificates'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({name: 'certificatesHeader', title: '认证列表标题', type: 'sectionHeader', group: 'certificates'}),
    defineField({
      name: 'featuredCertificates',
      title: '精选认证资质',
      description: '留空时按排序值展示全部认证资质。',
      type: 'array',
      group: 'certificates',
      of: [defineArrayMember({type: 'reference', to: [{type: 'certificate'}]})],
    }),
    defineField({name: 'processHeader', title: '流程标题', type: 'sectionHeader', group: 'process'}),
    defineField({
      name: 'processSteps',
      title: '流程步骤',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'documentationCta',
      title: '资料下载 CTA',
      type: 'object',
      group: 'process',
      fields: [
        defineField({name: 'title', title: '标题', type: 'string'}),
        defineField({name: 'description', title: '说明文案', type: 'text', rows: 2}),
        defineField({name: 'button', title: '按钮', type: 'ctaButton'}),
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'description',
        },
      },
    }),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '认证资质页', subtitle: '认证列表、流程和资料 CTA'}
    },
  },
})

export const contactPageType = defineType({
  name: 'contactPage',
  title: '联系我们页',
  type: 'document',

  groups: [
    {name: 'general', title: '基础信息'},
    {name: 'seo', title: 'SEO 设置'},
  ],
  fields: [
    defineField({name: 'title', title: '页面标题', type: 'string', group: 'general', initialValue: 'Contact'}),
    defineField({name: 'hero', title: '首屏 Hero', type: 'pageHero', group: 'general'}),
    defineField({name: 'eyebrow', title: '联系区眉标题', type: 'string', group: 'general'}),
    defineField({name: 'heading', title: '联系区标题', type: 'string', group: 'general'}),
    defineField({name: 'lead', title: '引导文案', type: 'text', rows: 3, group: 'general'}),
    defineField({name: 'seo', title: 'SEO 设置', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: '联系我们页', subtitle: '联系方式页面文案和 SEO'}
    },
  },
})
