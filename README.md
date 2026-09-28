# Damon's Blog

基于 Valaxy 与 Yun 主题构建的个人博客，部署地址：<https://fruitydrops.github.io/>。

## 环境

- Node.js 22
- pnpm 10.15.0

首次安装依赖：

```bash
pnpm install --frozen-lockfile
```

## 本地开发

```bash
npm run dev
```

浏览器打开终端显示的本地地址（通常是 <http://localhost:4859/>）。若端口被占用，Valaxy 会自动换用下一个可用端口。修改 `site.config.ts` 或 `valaxy.config.ts` 后，开发进程会自动完整重启。

首页可视化排版工具只在本地开发首页显示。将浏览器窗口加宽到 960 像素以上，点击“开始拖动”调整头像、名字、标题、简介、社交图标和导航；浅色与深色分别保存。调整后点击“复制布局 CSS”，粘贴到 `styles/index.scss` 末尾即可固化布局，再按部署步骤发布。

## 构建与检查

```bash
npm run build
npm run serve
```

构建产物位于 `dist`，成品预览地址为 <http://localhost:4173/>。

生产构建使用静态生成模式，会为文章和页面生成独立 HTML，直接打开深链接时能返回正常页面。

## 部署

推送到 `main` 后，GitHub Actions 会自动：

1. 使用 pnpm 安装锁定依赖；
2. 构建博客；
3. 将 `dist` 发布到 `gh-pages` 分支。

GitHub 仓库的 Pages 来源应设置为 `gh-pages` 分支根目录。

## 评论

前端通过 `valaxy-addon-waline` 连接 `https://damon-waline.vercel.app`。评论由 Waline 后端连接的云数据库持久化，不存储在本机或 Git 仓库中。

## 主要目录

- `pages/posts`：文章
- `pages/about`：关于页面
- `public`：图片与静态资源
- `styles`：主题样式覆盖
- `components`：自定义组件
- `scripts`：本地开发辅助脚本
