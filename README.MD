# ProphetChef 项目说明

ProphetChef 是一个面向商用厨房设备的官网项目，当前生产前端位于 `my-app`，内容管理由 Sanity Studio 提供，旧版静态页面保留在 `html_files` 中作为视觉和内容参考。

## 仓库结构

```text
.
├── my-app/              # 当前生产前端：Next.js App Router + TypeScript + Sanity
├── studio-prophetchef/  # Sanity Studio CMS（如存在于当前工作区）
├── html_files/          # 旧版静态站点，仅作参考
├── AGENTS.MD            # 仓库级开发/审计协作规范
└── README.MD            # 中文项目说明
```

## 技术栈

### 前端 `my-app`

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next-sanity` 内容读取
- Lucide React 图标
- pnpm 包管理

### CMS `studio-prophetchef`

- Sanity Studio
- Schema 与前端查询需要协同维护

## 快速开始

进入前端目录并安装依赖：

```bash
cd my-app
pnpm install
```

启动开发服务器：

```bash
pnpm run dev
```

默认访问地址：

```text
http://localhost:3000
```

如果 3000 端口已被占用，可以指定其他端口：

```bash
pnpm run dev -- -p 3005
```

如需清理本地 Next.js 缓存并重启开发环境：

```bash
pnpm run dev:clean
```

## 常用命令

### 前端

```bash
cd my-app
pnpm run dev
pnpm run lint
pnpm run build
pnpm run start
```

### Sanity Studio

```bash
cd studio-prophetchef
pnpm dev
pnpm build
```

## 环境变量

前端 Sanity 连接配置读取自 `my-app/sanity/env.ts`。本地开发通常需要在 `my-app/.env.local` 中配置：

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_STUDIO_URL=
SANITY_API_READ_TOKEN=
```

询盘邮件发送使用 Resend。未配置真实 API Key 时，询盘接口会在校验 payload 后进入 sandbox 模式：

```text
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
```

## 开发注意事项

- 当前生产前端只在 `my-app` 中维护。
- `html_files` 仅用于旧版视觉、文案和结构参考，不是生产源码。
- 前端代码默认优先使用 Server Components；只有需要浏览器状态或交互时才使用 Client Components。
- 不要批量删除或重写 `my-app/app/globals.css`。
- CMS 提供的 URL、图片、日期、slug、数组字段应按可选或不可信数据处理，并提供安全 fallback。
- 对外链或 CMS 管理的链接应复用前端中的 URL 清理逻辑。
- 修改 Studio schema 时，需要同步检查前端查询、类型和空状态渲染。

## 验证流程

提交前端变更前，至少运行：

```bash
cd my-app
pnpm run lint
pnpm run build
```

如果涉及 UI、布局或样式变更，请在浏览器中检查：

```text
/
/products
/news
/contact
```

涉及产品或新闻详情页数据时，还应检查代表性的详情路由，例如：

```text
/products/[slug]
/news/[slug]
```

`pnpm run build` 在预渲染阶段会请求 Sanity 数据。如果当前环境无法解析或访问 Sanity CDN，构建可能在 page data collection 阶段失败；这种情况应在测试说明中记录具体 DNS/网络错误。

## 代码审计与安全加固原则

- 优先做小范围、可审查的修复，避免无关的大规模格式化。
- 对每个审计发现明确说明：已修复、暂缓处理或无法复现。
- 安全逻辑应尽量沉淀为共享 helper，而不是分散在多个组件中。
- 生产日志不要输出 PII；开发日志如需输出，应明确限制在 development 环境。
- 表单接口应保留请求大小限制、基础校验、honeypot、限流和安全错误响应。

## 提交规范

- 不提交 `node_modules`、构建产物、临时截图或浏览器 trace。
- 提交信息保持事实性和范围明确。
- 前端、CMS schema、旧版参考文件的改动应尽量分开提交。
