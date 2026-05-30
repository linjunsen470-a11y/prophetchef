# Sanity CMS Schema 分析与优化建议报告

本报告针对 Prophetchef 网站项目的 Sanity CMS Schema 设计进行了审计与优化跟进。经过跟进评估，目前前期发现的大部分 Schema 结构缺陷均已得到重构和修复，运营体验及前后端数据一致性显著提升。

---

## 1. CTA 数据结构不统一 🟢【已优化完成】
### 🚨 历史问题
在 `homePage.ts` 中，Hero 区域的主按钮与次按钮采用了两种不同的数据结构：
* **主按钮 (cta)**：采用临时内联的 `object` 定义，字段为 `text` 和 `link`。
* **次按钮 (secondaryCta)**：引用了 `sharedObjects.ts` 中定义的 `ctaButton` 类型，字段为 `text` 和 `href`。
这导致前端 GROQ 查询中不得不写出兼容两者的“补丁”代码。

### 🛠️ 优化状态
已重构 `homePage.ts`。主按钮已替换为统一的 `primaryCta`，类型为 `ctaButton`。前端 GROQ 查询统一获取 `href` 属性，简化了查询逻辑，并去除了冗余的 `link` 字段。

---

## 2. 新闻分类采用代码硬编码 🟢【已优化完成】
### 🚨 历史问题
新闻分类在 `newsArticle.ts` 中以静态字符串数组列表硬编码，导致运营编辑无法在后台直接新增或修改新闻分类，必须联系开发重新部署代码。

### 🛠️ 优化状态
已新建动态文档类型 `newsCategory`，并在 `newsArticle.ts` 的分类字段中改用 `type: 'reference', to: [{type: 'newsCategory'}]` 形式关联。运营目前可在 Sanity Studio 中任意新增、删除或重命名新闻分类。

---

## 3. 关键字段缺乏格式校验 🟢【已优化完成】
### 🚨 历史问题
用于生成 wa.me 链接的 WhatsApp 号码和联系人电子邮箱在后台没有任何录入规则拦截，编辑录入带 `+` 号或连字符等非法格式会导致前端外链完全失效。

### 🛠️ 优化状态
在 `siteSettings.ts` 中引入了内置校验：
* **Email**：强制限制必须符合 `Rule.email()` 校验规范。
* **WhatsApp**：添加了纯数字正则表达式验证 `Rule.regex(/^[0-9]+$/)`，禁止输入任何非数字字符（如空格、加号或减号），防止生成坏链。

---

## 4. 内联对象数组缺少 Preview 配置 🟢【已优化完成】
### 🚨 历史问题
产品特点（features）和技术参数（specifications）的数组以匿名 object 方式直接内联，导致编辑添加多个列表项后在后台只显示一排无意义的 "Object" 文字，编辑体验极差。

### 🛠️ 优化状态
已将这两种结构提取为 `sharedObjects.ts` 中通用的 `productFeature` 和 `productSpecification` schema 类型，配置了显式的 `preview` 属性，并在 `product.ts` 中进行引用。当前在后台列表可以直接预览每项的标题/参数名与对应的值。

---

## 5. 重复且未同步的图标可选列表 🟢【已优化完成】
### 🚨 历史问题
全局图标选项在 `sharedObjects.ts` 和证书 `certificate.ts` 中各自维护，存在多处硬编码。

### 🛠️ 优化状态
已将所有通用图标集中在 `sharedObjects.ts` 中定义为 `COMMON_ICONS` 常量并导出。`certificate.ts` 导入该常量并通过 `.filter` 过滤出其特定适用的子集。现在新增或删除图标仅需在一处修改，保持了前后台图标一致。

---

## 6. 手动数字排序的低效性 🟡【待优化 - 建议引入拖拽排序插件】
### 🚨 潜在隐患
目前 `product`、`category`、`application` 和 `certificate` 仍使用手动的 `number` 类型字段 `orderRank` 来控制前端顺序。当数据较多时，运营调整顺序需要手动录入数字，极易冲突且不直观。

### 🛠️ 建议方案
在 `studio-prophetchef` 的依赖中加入官方拖拽排序插件：
1. 引入 `@sanity/orderable-document-list`。
2. 在 `structure.ts` 中将对应文档的列表切换为 Orderable List 渲染。
3. 运营将能直接在 Sanity Studio 列表中通过拖动鼠标调整显示次序，自动写入内部 orderRank。

---

## 优化状态总结与跟进

| 序号 | 改进项 | 影响范围 | 当前状态 | 优先级 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 统一 CTA 数据结构 | 前后端联调 / GROQ 查询 | 🟢 **已完成** | - |
| 2 | 新闻分类动态化 | 运营独立管理 / CMS 扩展性 | 🟢 **已完成** | - |
| 3 | WhatsApp/Email 录入校验 | 数据完整性 / 防死链 | 🟢 **已完成** | - |
| 4 | 完善内联 Object 数组 Preview | 后台可视化编辑体验 | 🟢 **已完成** | - |
| 5 | 提取并共享 Icon 选项 | 代码可维护性 | 🟢 **已完成** | - |
| 6 | 接入拖拽排序插件 | 运营顺序调整工作流优化 | 🟡 **未开始（建议后续加入）** | Low |
