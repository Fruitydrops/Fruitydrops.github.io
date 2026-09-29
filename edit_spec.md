# 文章编辑说明

本文档记录这个博客的文章（`pages/posts/*.md`）可选 frontmatter 字段和正文写法。未设置的字段使用 Valaxy 或主题默认值；某个主题功能未启用时，对应字段可能不起作用。

## 新建文章

在 `pages/posts/` 下新建 Markdown 文件，例如 `my-note.md`：

```md
---
title:
  zh-CN: 中文标题
  en: English title
date: 2026-09-28
categories: 随笔
tags:
  - 日常
toc: false
---

::: zh-CN
中文正文。
:::

::: en
English body.
:::
```

文章头部由两行 `---` 包围，是 YAML frontmatter。需要哪个选项就在这里添加；不要把普通标签当作功能开关。

## 常用选项

| 字段 | 用途与可选值 |
| --- | --- |
| `title` | 必填标题。双语写法见上例；单语可直接写 `title: 标题`。 |
| `date` | 必填，发布日期，建议使用 `YYYY-MM-DD`。 |
| `updated` | 最后更新日期；修改文章内容后可更新。 |
| `categories` | 分类字符串，或用数组表示多级分类，例如 `[生活, 随笔]`。 |
| `tags` | 标签列表，例如 `- 视频`。标签只用于分类和检索，不会自动隐藏目录或改变布局。 |
| `cover` | 文章封面图片路径。站内图片可放在 `public/`，例如 `cover: /images/example.webp`。 |
| `excerpt` | 手动摘要。 |
| `excerpt_type` | 摘要类型：`md`、`html`、`text` 或 `ai`。使用 `excerpt` 时优先显示手动摘要。 |
| `author` | 本篇文章的作者；未设置时使用站点默认作者。 |
| `icon` | 文章标题前显示的图标。 |
| `canonical` | 搜索引擎使用的规范链接；通常无需设置。 |

## 页面显示开关

这些选项写在文章或单独页面的 frontmatter 中；不写时采用主题默认行为。

| 字段 | 设置为 `false` 时 |
| --- | --- |
| `toc` | 隐藏本篇右侧目录，即使文章有 `##`、`###` 标题也不显示。 |
| `aside` | 隐藏本篇右侧侧栏（包括目录区域）。 |
| `sidebar` | 隐藏本篇左侧侧栏。 |
| `nav` | 隐藏上一篇/下一篇导航。 |
| `comment` | 隐藏本篇/本页评论区。 |
| `copyright` | 隐藏本篇底部版权信息。 |
| `sponsor` | 不显示赞助信息。 |
| `katex` | 关闭本篇数学公式渲染；只有站点启用了 KaTeX 时才有意义。 |
| `medium_zoom` | 关闭本篇图片点击放大。 |
| `end` | 不在文章结尾显示主题的完结标记。 |

例如，只隐藏某篇的目录：

```yaml
toc: false
```

只隐藏某篇的整个右侧区域：

```yaml
aside: false
```

## 评论区开关

站点级开关位于 `site.config.ts`：

```ts
comment: {
  enable: true,
},
```

保持站点评论启用后，可以在任意一篇文章或单独页面的 frontmatter 中关闭评论区：

```yaml
comment: false
```

例如，在某篇文章或 `pages/about/site.md` 的 `---` 区块内添加这行。它会隐藏该页面整个评论组件（评论列表和输入框）；不会删除 Waline 中已有的评论。删除这行或设为 `comment: true` 后，在全局评论仍启用的前提下会重新显示。

全局 `comment.enable: false` 会关闭所有页面的评论；单页 `comment: true` 不能覆盖全局关闭。当前仓库的分类页和归档页已通过 `comment: false` 关闭评论；标签页目前未设置该项，因此仍使用默认行为。

## 列表、草稿与跳转

| 字段 | 用途与可选值 |
| --- | --- |
| `top` | 置顶权重，数字越大越靠前，例如 `top: 2`；不置顶可省略。 |
| `draft` | `true` 表示草稿，只在开发预览中显示，不作为正式文章发布。 |
| `hide` | `true` 隐藏于首页和归档；`index` 仅隐藏于首页。 |
| `url` | 覆盖文章地址并直接跳转到指定 URL，普通文章不要设置。 |
| `type` | 特殊文章卡片类型，需对应主题或插件支持；普通文章不要设置。 |
| `postTitleClass` | 自定义文章列表卡片标题样式类，需有对应 CSS。 |
| `pageTitleClass` | 自定义文章页面标题样式类，需有对应 CSS。 |
| `codepen` | 启用 CodePen 嵌入支持；需对应功能可用。 |
| `codeHeightLimit` | 限制代码块高度，单位为 px。 |
| `time_warning` | 控制更新时间提示；可设为 `false` 关闭，或填写毫秒数调整阈值。 |

## 正文与目录

- 用 `##`、`###` 等 Markdown 标题组织章节；它们会成为目录条目，除非 frontmatter 设置了 `toc: false`。
- 中英文内容可分别放进 `::: zh-CN` 和 `::: en` 区块；访问者切换语言时会看到对应部分。
- 普通段落、外部视频链接、图片和随笔都可以直接写在正文里，不需要特殊标签。

### 统计分享链接点击

普通裸 URL 会自动变成可点击链接，但不会单独记录点击。要在 Umami 统计某个分享链接，用 `TrackLink` 包起来：

```md
<TrackLink href="https://example.com/video/123" />
```

组件默认原样显示 `href` 中的完整 URL，并在新标签页打开。多个被包裹的链接会使用同一个 `shared-link-click` 事件名，并将目标 URL 作为事件属性发送；在 Umami 的事件数据中按 `url` 区分每个链接。没有包裹的链接不计入这项统计。

## 不要手动填写的生成字段

`path`、`abbrlink`、`readingTime`、`wordCount`、`firstImage` 等由 Valaxy 或插件生成。不要手工添加它们，也不要把密码、令牌等私密信息写进公开文章。

## 发布前检查

1. 确认标题、日期、分类和标签符合预期。
2. 本地预览中文、英文版本；检查链接、图片和目录。
3. 草稿不要设为 `draft: true` 后就直接期待它上线；草稿只用于开发预览。
4. 只有明确要隐藏某篇目录时，才在该篇 frontmatter 写 `toc: false`。
