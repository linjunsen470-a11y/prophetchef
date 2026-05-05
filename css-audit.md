下面这份可以直接保存为：

```txt
docs/global-css-refactor-guide.md
```

或者拆成：

```txt
AGENTS.md
docs/global-css-refactor-guide.md
```

````md
# Next.js + Tailwind 项目 global.css 失控治理方案

## 目标

当前项目的 `app/globals.css` 已经膨胀，存在页面样式、组件样式、重复样式、废弃样式混杂的问题。

本次治理目标不是一次性重写全部样式，而是：

1. 阻止 `global.css` 继续膨胀
2. 将页面级、组件级样式迁移到更合理的位置
3. 保留真正需要全局存在的基础样式
4. 降低后续 AI Agent 修改页面时污染全局样式的概率
5. 建立长期可维护的样式边界

---

# 一、强制规则

## 1. 默认禁止修改 global.css

除非任务明确要求，否则 AI Agent 不允许修改：

```txt
app/globals.css
src/app/globals.css
styles/globals.css
````

如确实需要修改，必须先说明：

```txt
为什么这个样式必须是全局样式？
为什么不能放在组件 className、CSS Module 或局部样式文件里？
```

---

## 2. global.css 只能包含以下内容

`global.css` 只允许保留：

```txt
1. Tailwind import
2. CSS reset / base 样式
3. html、body、:root 等基础样式
4. design tokens / CSS variables
5. 字体变量
6. 第三方库必要 override
7. 极少量真正全局的 utility class
```

允许示例：

```css
@import "tailwindcss";

:root {
  --radius: 12px;
  --background: #ffffff;
  --foreground: #171717;
}

html,
body {
  min-height: 100%;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

---

## 3. 禁止写入 global.css 的内容

以下内容禁止继续写进 `global.css`：

```txt
1. 页面专属样式
2. 某个组件专属样式
3. hero、pricing、dashboard、sidebar、card 等业务类名
4. 临时修复样式
5. 重复的按钮、卡片、标题样式
6. 针对单个页面的响应式样式
7. 无法确认用途的新 class
```

禁止示例：

```css
.hero-title {
  font-size: 48px;
}

.pricing-card {
  border-radius: 24px;
}

.dashboard-sidebar {
  width: 280px;
}
```

这些样式应该迁移到：

```txt
1. React 组件中的 Tailwind className
2. 对应组件的 CSS Module
3. 抽象后的 UI 组件
```

---

# 二、推荐目录结构

推荐将样式按作用域拆分：

```txt
app/
  globals.css

components/
  ui/
    Button.tsx
    Card.tsx
    Section.tsx

features/
  home/
    Hero.tsx
    Hero.module.css
    Pricing.tsx
    Pricing.module.css

  dashboard/
    Sidebar.tsx
    Sidebar.module.css
    DashboardLayout.tsx

styles/
  legacy.css
  tokens.css
```

说明：

```txt
app/globals.css
  只放真正全局样式

components/ui/
  放可复用 UI 组件

features/
  按业务页面或模块组织组件

*.module.css
  放复杂、局部、无法优雅用 Tailwind 表达的样式

styles/legacy.css
  临时存放未确认是否可删除的旧样式
```

---

# 三、治理流程

## 第一步：冻结 global.css

AI Agent 在开始治理前，应先确认：

```txt
后续页面修改不得继续向 global.css 添加样式。
```

如果项目允许，可以临时执行：

```bash
chmod -w app/globals.css
```

如果不适合锁文件，则至少在 `AGENTS.md` 或项目规则文件中写入：

```md
Do not edit app/globals.css unless explicitly instructed.
Do not add page-specific styles to global.css.
Prefer Tailwind className, CSS Modules, or React components.
```

---

## 第二步：备份当前 global.css

在修改前复制一份：

```bash
cp app/globals.css app/globals.backup.css
```

或者：

```bash
cp src/app/globals.css src/app/globals.backup.css
```

备份文件仅用于回滚，不应继续维护。

---

## 第三步：给 global.css 做分类

AI Agent 需要先阅读 `global.css`，并将样式分成以下 5 类：

```txt
A. 基础样式
B. design tokens / CSS variables
C. 第三方库 override
D. 页面或组件专属样式
E. 疑似废弃或重复样式
```

分类标准：

## A. 基础样式

可保留在 `global.css`。

示例：

```css
html,
body {
  min-height: 100%;
}
```

---

## B. design tokens / CSS variables

可保留，或迁移到 `styles/tokens.css`。

示例：

```css
:root {
  --color-primary: #1677ff;
  --radius-lg: 16px;
}
```

---

## C. 第三方库 override

可以保留，但必须加注释说明来源。

示例：

```css
/* Required override for third-party date picker */
.react-datepicker {
  font-family: inherit;
}
```

---

## D. 页面或组件专属样式

必须迁移。

示例：

```css
.hero-section {}
.pricing-card {}
.dashboard-layout {}
.sidebar-menu {}
```

迁移目标：

```txt
Tailwind className
对应组件的 CSS Module
抽象后的 React 组件
```

---

## E. 疑似废弃或重复样式

不要直接删除。

先迁移到：

```txt
styles/legacy.css
```

并添加注释：

```css
/* Legacy: usage not confirmed. Move here before final deletion. */
.old-card-style {
  ...
}
```

---

# 四、迁移策略

## 1. 优先使用 Tailwind className

原始 CSS：

```css
.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
}
```

迁移后：

```tsx
<h1 className="text-5xl font-bold leading-tight tracking-tight">
  Title
</h1>
```

---

## 2. 多处重复样式应抽组件

不要这样重复：

```tsx
<div className="rounded-2xl border bg-white p-6 shadow-sm">
```

如果出现多次，应抽象为：

```tsx
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}
```

---

## 3. 复杂样式使用 CSS Module

适合 CSS Module 的情况：

```txt
1. 动画较复杂
2. 多层选择器较多
3. 伪元素较多
4. Tailwind 表达不清晰
5. 某个组件内部有独立视觉系统
```

示例：

```txt
features/home/Hero.module.css
```

```css
.backgroundGlow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
```

组件中使用：

```tsx
import styles from "./Hero.module.css";

export function Hero() {
  return <div className={styles.backgroundGlow} />;
}
```

---

## 4. 不要为了“复用”创建大量全局 class

避免：

```css
.card {}
.card-large {}
.card-dark {}
.card-featured {}
.card-home {}
.card-dashboard {}
```

推荐：

```txt
1. 抽 React 组件
2. 用 props 控制 variant
3. 用 Tailwind className 组合
```

示例：

```tsx
type CardProps = {
  variant?: "default" | "muted" | "highlight";
  children: React.ReactNode;
};

export function Card({ variant = "default", children }: CardProps) {
  const variantClass = {
    default: "bg-white",
    muted: "bg-muted",
    highlight: "bg-primary text-primary-foreground",
  }[variant];

  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${variantClass}`}>
      {children}
    </div>
  );
}
```

---

# 五、AI Agent 执行顺序

AI Agent 不要一次性重构全部 `global.css`。

应按页面或模块分批处理。

推荐顺序：

```txt
1. 找出 global.css 中与某一个页面相关的样式
2. 找到对应页面或组件
3. 将样式迁移到 Tailwind className 或 CSS Module
4. 保证页面视觉不变
5. 删除 global.css 中已迁移的样式
6. 运行 lint / typecheck / build
7. 输出迁移清单
```

---

# 六、每次迁移的工作单元

每次只处理一个范围：

```txt
Home 页面
Dashboard 页面
Landing 页面
Pricing 模块
Sidebar 组件
Header 组件
Footer 组件
```

禁止一次性处理：

```txt
整个 global.css
整个 app 目录
所有页面样式
全部组件样式
```

---

# 七、AI Agent 单次任务模板

可以直接复制以下 prompt 给 IDE AI Agent：

```md
请治理当前 Next.js + Tailwind 项目中失控的 global.css。

本次只处理一个范围：Home 页面相关样式。

要求：

1. 不要重写整个 global.css
2. 不要删除不确定是否使用的 class
3. 找出 global.css 中明显属于 Home 页面或 Home 组件的样式
4. 将这些样式迁移到对应组件的 Tailwind className 或 Home.module.css
5. 如果样式复杂，优先使用 CSS Module
6. 如果样式可用 Tailwind 表达，优先写入 className
7. 如果样式被多个地方复用，考虑抽 React 组件
8. 保留真正全局的 reset、tokens、html、body、:root 样式
9. 对疑似废弃但不确定的样式，移动到 styles/legacy.css，不要直接删除
10. 修改完成后输出迁移清单

输出格式：

- 修改了哪些文件
- 从 global.css 迁出了哪些 class
- 这些 class 迁移到了哪里
- 哪些样式被保留在 global.css
- 哪些样式被移动到 legacy.css
- 是否存在不确定项
```

---

# 八、global.css 最终目标

治理完成后，`global.css` 应接近以下结构：

```css
@import "tailwindcss";

/* Theme tokens */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --radius: 12px;
}

/* Base styles */
html,
body {
  min-height: 100%;
}

body {
  background: var(--background);
  color: var(--foreground);
}

/* Third-party overrides */
/* Add only when absolutely necessary */
```

目标行数：

```txt
理想：小于 100 行
可接受：100 ~ 200 行
需要警惕：200 ~ 300 行
再次失控：300 行以上
```

---

# 九、长期约束

## 1. 增加 CI 检查

可以添加简单检查：

```bash
MAX_LINES=200
LINES=$(wc -l < app/globals.css)

if [ "$LINES" -gt "$MAX_LINES" ]; then
  echo "app/globals.css is too large: $LINES lines. Max allowed: $MAX_LINES."
  exit 1
fi
```

如果项目使用 `src/app/globals.css`，改为：

```bash
MAX_LINES=200
LINES=$(wc -l < src/app/globals.css)

if [ "$LINES" -gt "$MAX_LINES" ]; then
  echo "src/app/globals.css is too large: $LINES lines. Max allowed: $MAX_LINES."
  exit 1
fi
```

---

## 2. Code Review 规则

任何修改 `global.css` 的 PR 都必须回答：

```txt
1. 这个样式为什么必须是全局？
2. 是否可以放到组件里？
3. 是否可以用 Tailwind className？
4. 是否可以用 CSS Module？
5. 是否会影响其他页面？
```

---

## 3. AI Agent 规则

建议写入 `AGENTS.md`：

```md
# Styling Rules

## global.css

Do not add page-specific or component-specific styles to `app/globals.css`.

`global.css` is reserved for:

- Tailwind imports
- base styles
- CSS variables
- design tokens
- html/body/:root styles
- required third-party overrides

## Preferred styling order

When implementing UI changes, use the following order:

1. Tailwind utility classes in JSX
2. Existing reusable React components
3. New reusable React components
4. CSS Modules for complex scoped styles
5. global.css only when the style is truly global

## Refactoring rule

When touching a component, do not add new styles to global.css.

If the component depends on global.css classes, consider migrating those classes into the component using Tailwind or CSS Modules.

Do not delete uncertain global styles directly. Move them to `styles/legacy.css` and document them.
```

---

# 十、禁止行为

AI Agent 禁止执行以下操作：

```txt
1. 一次性重写全部 global.css
2. 为了快速完成页面，继续向 global.css 添加业务样式
3. 删除无法确认是否使用的 class
4. 创建大量新的全局 class
5. 把所有样式都迁移到一个新的巨大 CSS 文件
6. 为了减少行数破坏页面视觉
7. 不检查引用关系就删除样式
8. 把 Tailwind 能表达的简单样式继续写成 CSS class
```

---

# 十一、推荐完成标准

一次迁移任务完成后，应满足：

```txt
1. global.css 行数减少
2. 页面视觉基本不变
3. 页面或组件样式迁移到了对应作用域
4. 不确定样式进入 legacy.css
5. 没有新增全局业务 class
6. build / lint / typecheck 通过
7. 输出了清晰迁移清单
```

---

# 十二、核心原则

不要试图“整理一个越来越大的 global.css”。

正确方向是：

```txt
让 global.css 重新变小。
让组件负责自己的样式。
让复用通过 React 组件完成。
让 AI Agent 失去污染全局样式的机会。
```

```
```
