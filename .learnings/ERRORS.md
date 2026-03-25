## [ERR-20260320-001] rg_regex_in_powershell

**Logged**: 2026-03-20T22:44:40.1072492+08:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
PowerShell 下复杂 `rg` 正则容易被 shell 先解析，导致命令失效。

### Error
```text
The term 'subtitle:\s*["]|title:\s*[\]' is not recognized as a name of a cmdlet...
```

### Context
- Windows PowerShell
- 使用了带引号和 `|` 的复杂正则

### Suggested Fix
优先用 `--fixed-strings`，或改用 PowerShell 单引号包裹正则。

### Metadata
- Reproducible: yes

---

## [ERR-20260320-002] transient_file_probe

**Logged**: 2026-03-20T22:44:40.1072492+08:00
**Priority**: low
**Status**: pending
**Area**: docs

### Summary
临时文件探针不稳定，前一步没落盘成功时后一步会直接失效。

### Error
```text
Cannot find path 'D:\D_workspace\blogWebsite\valaxy-blog-Damon\tmp_main.ts' because it does not exist.
```

### Context
- 先写临时文件，再读取
- 后续读取时文件不存在

### Suggested Fix
能直接输出就直接输出，少依赖临时文件。

### Metadata
- Reproducible: unknown

---

## [ERR-20260320-003] valaxy_stale_site_config

**Logged**: 2026-03-20T22:55:26.9663531+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Valaxy dev server 可能向浏览器继续注入旧的 `siteConfig`。

### Error
```text
/@valaxyjs/config 中的 subtitle 和多个站点字段仍是旧值，与 site.config.ts 不一致。
```

### Context
- 新进程直接解析 [`site.config.ts`](/d:/D_workspace/blogWebsite/valaxy-blog-Damon/site.config.ts) 是对的
- 旧 dev 进程注入给浏览器的是旧值

### Suggested Fix
不要先怀疑浏览器缓存，先彻底结束 `pnpm dev` 对应的 Node 进程，再重新启动。

### Metadata
- Reproducible: unknown

---
