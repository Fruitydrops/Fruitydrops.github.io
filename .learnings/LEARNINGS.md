## [LRN-20260320-001] correction

**Logged**: 2026-03-20T22:44:40.1072492+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
查页面文案时，不要在已有搜索结果后继续说“可能”“可疑”。如果有权限，要尝试得到真实结论、

### Details
应直接说明：找到了什么、没找到什么、实际组件，代码，函数在哪。


### Metadata
- Source: user_feedback
- Pattern-Key: harden.ui_text_trace

---

## [LRN-20260320-002] best_practice

**Logged**: 2026-03-20T22:44:40.1072492+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Valaxy 页面显示和源码不一致时，要优先刷新，如果没用，去看运行时模块，不要只看源码。

### Details
应优先检查 dev server 实际返回的配置和模块内容。

### Suggested Action
先看首页响应、`main.ts`、`@valaxyjs/config`，再判断是不是缓存。

### Metadata
- Source: conversation
- Pattern-Key: simplify.runtime_vs_source_verification

---

## [LRN-20260320-003] knowledge_gap

**Logged**: 2026-03-20T22:44:40.1072492+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
Yun 主题首页文字来源分层，不能把 `title`、`subtitle`、`description`、`banner.title` 混为一谈。

### Details
标签页标题、首页副标题、首页简介、Banner 大字来自不同字段。

### Suggested Action
先定位文字所在层，再决定改 `site.config.ts`、`valaxy.config.ts` 还是页面 frontmatter。

### Metadata
- Source: conversation

---

## [LRN-20260320-004] best_practice

**Logged**: 2026-03-20T22:55:26.9663531+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Valaxy 文案异常时，`/@valaxyjs/config` 才是浏览器当前真正使用的配置。

### Details
这次页面副标题来自 dev server 注入的旧 `siteConfig`，不是浏览器缓存，也不是外部接口。

### Suggested Action
排查顺序：
1. 看 `http://localhost:<port>/@valaxyjs/config`
2. 对比 [`site.config.ts`](/d:/D_workspace/blogWebsite/valaxy-blog-Damon/site.config.ts)
3. 不一致就彻底停掉 `pnpm dev` 再重启

### Metadata
- Source: conversation
- Pattern-Key: harden.valaxy_virtual_config_trace

---
