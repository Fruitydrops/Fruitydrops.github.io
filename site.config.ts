import { defineSiteConfig } from "valaxy";

export default defineSiteConfig({
  url: "https://Damon.github.io/", //set in advance
  lang: "zh-CN",
  languages: ["zh-CN", "en"],
  title: "Damon's Blog",
  author: {
    name: "Damon",
    avatar: "/favicon.png",
  },
  favicon: "/favicon.png?v=2",
  description: "Sharing some of my thoughts and experiences.",
  social: [
    {
      name: "GitHub",
      link: "https://github.com/Fruitydrops",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    // {
    //   name: "RSS",
    //   link: "/atom.xml",
    //   icon: "i-ri-rss-line",
    //   color: "orange",
    // },
    // {
    //   name: "豆瓣",
    //   link: "https://www.douban.com/people/yunyoujun/",
    //   icon: "i-ri-douban-line",
    //   color: "#007722",
    // },
    // {
    //   name: '网易云音乐',
    //   link: 'https://music.163.com/#/user/home?id=247102977',
    //   icon: 'i-ri-netease-cloud-music-line',
    //   color: '#C20C0C',
    // },
    // {
    //   name: '知乎',
    //   link: 'https://www.zhihu.com/people/yunyoujun/',
    //   icon: 'i-ri-zhihu-line',
    //   color: '#0084FF',
    // },
    // {
    //   name: '哔哩哔哩',
    //   link: 'https://space.bilibili.com/1579790',
    //   icon: 'i-ri-bilibili-line',
    //   color: '#FF8EB3',
    // },
    // {
    //   name: '微信公众号',
    //   link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
    //   icon: 'i-ri-wechat-2-line',
    //   color: '#1AAD19',
    // },
    // {
    //   name: 'Twitter',
    //   link: 'https://twitter.com/YunYouJun',
    //   icon: 'i-ri-twitter-x-fill',
    //   color: 'black',
    // },
    // {
    //   name: "Telegram Channel",
    //   link: "https://t.me/elpsycn",
    //   icon: "i-ri-telegram-line",
    //   color: "#0088CC",
    // },
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
    enable: false,
  },
});
