import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");

// GitHub Pages 没有自定义重写规则，用 404 页面把深链接交还给前端路由。
await copyFile(resolve(distDir, "index.html"), resolve(distDir, "404.html"));

console.log("Created dist/404.html for GitHub Pages SPA routing.");
