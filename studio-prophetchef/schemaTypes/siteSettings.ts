import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '全站设置',
  type: 'document',
  groups: [
    {name: 'general', title: '基础设置'},
    {name: 'contact', title: '联系方式'},
    {name: 'navigation', title: '导航菜单'},
    {name: 'footer', title: '页脚与 CTA'},
    {name: 'seo', title: '默认 SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: '网站标题',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: '公司法定名称',
      type: 'string',
      group: 'general',
      description: '用于 Organization 结构化数据；留空时使用网站标题。',
    }),
    defineField({
      name: 'description',
      title: '网站简介',
      type: 'text',
      group: 'general',
      rows: 2,
    }),
    defineField({
      name: 'siteUrl',
      title: '网站正式域名',
      type: 'url',
      group: 'general',
      description: '用于 canonical、站点地图和结构化数据，请填写正式线上域名。',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'logo',
      title: '网站 Logo',
      type: 'image',
      group: 'general',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: '图片替代文字', type: 'string', validation: (rule) => rule.required()})],
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo for dark backgrounds',
      type: 'image',
      group: 'general',
      description: 'Use the white transparent logo for dark header/footer backgrounds.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()})],
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo for light backgrounds',
      type: 'image',
      group: 'general',
      description: 'Use the black transparent logo for light backgrounds or future layouts.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()})],
    }),
    defineField({
      name: 'contactInfo',
      title: '联系信息',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({name: 'email', title: '邮箱', type: 'string', validation: (rule) => rule.email()}),
        defineField({name: 'phone', title: '电话', type: 'string'}),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp 号码',
          type: 'string',
          description: '只填写数字，用于生成 wa.me 链接，不要包含 +、空格或横线。',
          validation: (rule) =>
            rule.regex(/^[0-9]+$/).error('WhatsApp must contain digits only. Do not include +, spaces, or hyphens.'),
        }),
        defineField({name: 'address', title: '地址', type: 'text', rows: 2}),
      ],
    }),
    defineField({
      name: 'mainNavigation',
      title: '顶部主导航',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({type: 'navigationLink'})],
    }),
    defineField({
      name: 'footerProductLinks',
      title: '页脚产品链接',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({type: 'navigationLink'})],
    }),
    defineField({
      name: 'footerCompanyLinks',
      title: '页脚公司链接',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({type: 'navigationLink'})],
    }),
    defineField({
      name: 'footerBadges',
      title: '页脚能力徽章',
      type: 'array',
      group: 'footer',
      description: '页脚展示的能力标签，通常只需填写标签和图标，数值可留空。',
      of: [defineArrayMember({type: 'statItem'})],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'socialLinks',
      title: '社媒链接',
      description: '展示在网站页脚。',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: '社媒链接',
          type: 'object',
          fields: [
            defineField({name: 'platform', title: '平台名称', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: '链接地址',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'globalCta',
      title: '全站 CTA',
      type: 'globalCta',
      group: 'footer',
    }),
    defineField({
      name: 'globalSeo',
      title: '全站默认 SEO',
      description: '当页面没有单独填写 SEO 时，前台会使用这里的默认信息。',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '全站设置',
        subtitle: '导航、联系方式、页脚和默认 SEO',
      }
    },
  },
})
