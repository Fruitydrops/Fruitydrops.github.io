import { defineSiteConfig } from "valaxy";

export default defineSiteConfig({
  url: "https://fruitydrops.github.io/",
  mode: "auto",
  lang: "zh-CN",
  languages: ["zh-CN", "en"],
  title: "Damon's Blog",
  subtitle: "I am Groot.",
  author: {
    name: "Damon",
    avatar: "/avatar.webp?v=2",
  },
  favicon: "/favicon_icon.png?v=4",
  description: "Sharing some of my thoughts and experiences.",
  social: [
    {
      name: "GitHub",
      link: "https://github.com/Fruitydrops",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    {
      name: "RSS",
      link: "/atom.xml",
      icon: "i-ri-rss-line",
      color: "orange",
    },
    {
      name: "E-Mail",
      link: "mailto:2597582283@qq.com",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
  ],
  frontmatter: {
    time_warning: false,
  },
  license: {
    enabled: false,
  },
  comment: {
    enable: true,
  },
  search: {
    enable: true,
  },
});
