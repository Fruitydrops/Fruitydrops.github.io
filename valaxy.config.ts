import type { UserThemeConfig } from "valaxy-theme-yun";
import { defineValaxyConfig } from "valaxy";

// add icons what you will need
const safelist = ["i-ri-home-line"];

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: "yun",
  devtools: true,

  themeConfig: {
    banner: {
      enable: true,
      title: "Damon's Blog",//这里的格式有问题 总是竖直的 可能
      //后期要去样式里面修改格式 不然英文看不了 可以是Z型的
    },

    say: {
      enable: false,
    },

    fireworks: {
      enable: false,
      colors: ['#ff4d6d', '#ffd166', '#06d6a0'],
    },

    pages: [
      {
        name: "$locale:menu.categories",
        url: "/categories/",
        icon: "i-ri-folder-2-line",
        color: "dodgerblue",
      },
      {
        name: "$locale:menu.tags",
        url: "/tags/",
        icon: "i-ri-price-tag-3-line",
        color: "dodgerblue",
      },
    ],

    footer: {
      since: 2026,
      powered: false,
    },
  },

  unocss: { safelist },
});
