import type { UserThemeConfig } from "valaxy-theme-yun";
import { defineValaxyConfig } from "valaxy";
import { addonWaline } from "valaxy-addon-waline";

// add icons what you will need
const safelist = ["i-ri-home-line"];

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  addons: [
    addonWaline({
      serverURL: "https://damon-waline.vercel.app",
      lang: "zh-CN",
      reaction: false,
      pageview: false,
      comment: true,
    }),
  ],

  theme: "yun",
  devtools: false,

  themeConfig: {
    bg_image: {
      enable: true,
      url: "/day.webp",
      dark: "/night.webp",
      opacity: 1,
    },

    banner: {
      enable: true,
      title: "Damon's Blog",
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
        color: "var(--va-c-text)",
      },
      {
        name: "$locale:menu.tags",
        url: "/tags/",
        icon: "i-ri-price-tag-3-line",
        color: "var(--va-c-text)",
      },
    ],

    footer: {
      since: 2026,
      powered: false,
    },
  },

  unocss: { safelist },
});
