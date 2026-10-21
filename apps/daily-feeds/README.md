# Daily-Feeds

由 `daily`（Python 静态生成器）与 `daily-next`（Next.js 站点）合并而成的唯一项目：**每天一份精选摘要**。

## 架构：Source 与 Web Site 分离

```
apps/daily-feeds/
├── sources/              # Source 层 —— 内容从哪里来，与站点无关
│   ├── sources.json      #   来源注册表（rss 订阅 / content 手工内容）
│   └── content/          #   手工整理的每日条目（YYYY-MM-DD.json）
├── scripts/
│   └── collect.mjs       # 数据管线：Source → web/data（承接原 daily/build.py 的角色）
└── web/                  # Web Site 层 —— Next.js 展示（来自 daily-next）
    └── data/             #   由 collect 生成的每日数据
```

- **Source** 可以是个人 RSS 订阅，也可以是手工整理的内容（`sources/content/`）。
- **Web Site** 只消费 `web/data/*.json`，不关心数据是怎么来的；数据重新生成不需要改站点代码。

## 数据模型

每个条目（`DigestItem`）区分「来源」与「目标网站」：

```json
{
  "category": "ai-news",
  "domain": "example-ai.dev",
  "title": "开源推理框架发布轻量运行时",
  "note": "……",
  "url": "https://example.com/ai-news/runtime",
  "source": { "type": "rss", "name": "Hacker News Daily" }
}
```

- `domain` / `url`：条目指向的网站（点开去看什么）。
- `source`：条目从哪里来 —— `rss`（订阅抓取）或 `content`（手工整理），卡片上以图标标注。

## 使用

```bash
# 1. 登记来源：编辑 sources/sources.json（新增分类需同步 web/lib/registry.ts）

# 2. 采集（拉取 RSS + 合并手工内容 → web/data/YYYY-MM-DD.json）
node scripts/collect.mjs                  # 采集今天
node scripts/collect.mjs --date 2026-10-09
node scripts/collect.mjs --offline        # 只合并手工内容，不联网

# 3. 启动站点
cd web && npm install && npm run dev      # http://localhost:3000
```

## 合并说明

| 原项目 | 去向 |
|--------|------|
| `daily/build.py`（数据 → 静态页） | 角色由 `scripts/collect.mjs` 承接：Source → data；站点渲染交给 Next.js |
| `daily` 的主题/布局/分类设计 | 已在 `daily-next`（现 `web/`）中完整实现，直接保留 |
| `daily-next` 全部代码 | 迁移为 `web/`，包名改为 `daily-feeds`，数据模型增加 `source` 字段 |
| `data/*.json`（两项目原本同源） | 迁移到 `sources/content/`，经 collect 重新生成 `web/data/` |

RSS 解析为零依赖的最小实现（RSS 2.0 `<item>` / Atom `<entry>`），够订阅摘要使用；若后续需要媒体、全文等字段，再引入成熟解析库。
