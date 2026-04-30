# ProKitchenTech Static Website

## 1. 项目说明

这是一个面向 B2B 外贸询盘转化的 Commercial Kitchen Equipment 商用厨房设备静态英文官网。项目使用纯 HTML、CSS、JavaScript 编写，不使用 Next.js、React、Vue 或任何构建工具。

网站包含：首页、产品页、产品详情页、工厂实力页、应用场景页、证书页、新闻列表页、新闻详情页、联系页。

## 2. 文件结构

```text
/
├── index.html
├── products.html
├── product-detail.html
├── factory.html
├── applications.html
├── certificates.html
├── news.html
├── news-detail.html
├── contact.html
├── style.css
├── script.js
└── README.md
```

## 3. 如何本地预览

直接双击 `index.html`，即可在浏览器中打开。

也可以在项目目录中启动一个本地静态服务器：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 4. 如何替换图片

当前页面使用远程高质量占位图。替换方式：

1. 新建 `images/` 文件夹。
2. 将产品图、工厂图、证书图、应用场景图放入 `images/`。
3. 在 HTML 中将图片地址替换为本地路径，例如：

```html
<img src="images/induction-wok-cooker.jpg" alt="Commercial Induction Wok Cooker">
```

建议图片尺寸：

- Hero 背景图：1600px × 900px 或以上
- 产品图：800px × 600px
- 新闻图：900px × 600px
- 应用场景图：900px × 600px

## 5. 如何修改联系方式

在所有 HTML 文件中搜索并替换以下内容：

- Email: `sales@example.com`
- WhatsApp: `+86 180 0000 0000`
- Phone: `+86 180 0000 0000`
- Address: `Dongguan, Guangdong, China`

同时在 HTML 中修改 WhatsApp 链接：

```html
https://wa.me/8618000000000
```

把号码替换为你的真实 WhatsApp 国际区号号码。

## 6. 如何部署到服务器

1. 将全部文件上传到服务器网站根目录，例如 `/www/wwwroot/your-domain.com/`。
2. 确认 `index.html` 位于根目录。
3. 在 Nginx / Apache 中绑定域名。
4. 开启 HTTPS。
5. 访问域名检查页面和表单交互。

## 7. 如何部署到 Netlify / Vercel 静态站

### Netlify

1. 登录 Netlify。
2. 点击 Add new site。
3. 选择 Deploy manually。
4. 将整个项目文件夹拖拽上传。
5. 部署完成后绑定自定义域名。

### Vercel

1. 登录 Vercel。
2. 新建项目。
3. 上传或导入该静态项目。
4. Framework Preset 选择 Other。
5. Build Command 留空。
6. Output Directory 留空或设为根目录。
7. 部署完成后绑定域名。

## 备注

- 表单提交为前端模拟提示，不会真实发送邮件。
- 如需真实询盘收集，可对接 Formspree、Netlify Forms、后端 API 或 CRM 系统。
- 新闻分类、产品筛选、FAQ 折叠、移动端菜单、缩略图切换和返回顶部均由 `script.js` 实现。
