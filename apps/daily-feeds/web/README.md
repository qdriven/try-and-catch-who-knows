# Daily-Feeds · Web Site

Daily-Feeds 的 Web Site 层（Next.js）。数据来自 `../web/data/*.json`，由根目录 `scripts/collect.mjs` 从 Source 层生成——架构与用法见[项目 README](../README.md)。

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 静态构建（全部日期与分类页预渲染）
```
