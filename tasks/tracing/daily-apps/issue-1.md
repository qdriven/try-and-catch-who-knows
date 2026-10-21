# Issue #1: Daily Apps

- **Repo**: qdriven/try-and-catch-who-knows
- **Issue**: https://github.com/qdriven/try-and-catch-who-knows/issues/1
- **Branch**: qdriven/daily-apps
- **状态**: 已实现，PR 待合并

## Task

1. merge Daily and Daily next into One App in the App folder
2. Merge Into New Project:  Daily-Feeds
3. Separate Source, Web Site , Source could be personal RSS or just Content

## Agent Expansion

**分析**: `apps/daily`（Python 静态生成器）与 `apps/daily-next`（Next.js 站点）共享同一份 `data/*.json` 数据与分类 registry；`daily-next` 的 UI 是 `daily` 的超集（主题/布局切换、日期归档、分类页）。`daily` 剩余的独特价值是"数据 → 站点"的构建管线概念（build.py）。

**验收标准**:
- 合并后的唯一项目为 `apps/daily-feeds`
- Source 层（个人 RSS 或手工内容）与 Web Site 层（Next.js 展示）在目录与数据模型上明确分离
- 数据模型中每个条目可标注来源（rss / content），与目标网站（domain/url）区分
- `npm run build` 通过；collect 管线可离线从 Source 生成 data

## Plan

1. 将 `daily-next` 源码复制为 `apps/daily-feeds/web`，包名改为 `daily-feeds`
2. 新增 `sources/` 层：`sources/sources.json`（来源注册表）+ `sources/content/`（迁移现有手工数据）
3. 实现 `scripts/collect.mjs`（零依赖，承接 daily/build.py 的管线角色）
4. `web/lib/data.ts` 数据模型增加 `source` 字段，卡片上展示来源标识
5. 用 collect 重新生成 web/data，`next build` 验证
6. 编写 README 说明 Source/Web 分离架构；提交并创建 PR

## Execution

- 新建 `apps/daily-feeds/`：`sources/`（sources.json 注册表 + content/ 手工内容，自原 data/ 迁移）、`scripts/collect.mjs`（RSS 2.0/Atom 抓取解析 + 内容合并 → `web/data/YYYY-MM-DD.json`，零依赖）、`web/`（自 daily-next 迁移，包名 daily-feeds）
- 数据模型：`DigestItem` 增加 `source?: {type: "rss"|"content", name}`，与 `domain`/`url`（目标网站）区分；`digest-card` 展示来源图标与名称
- 修复迁移中发现的构建阻断 bug：`layout.tsx` 向客户端组件传递含 Lucide 图标函数的 `categories` props，Next 16 下 `next build` 报 "Functions cannot be passed directly to Client Components"；改为传可序列化的 `{slug,label,count}`，客户端经 registry 解析图标
- 修复 4 个预存 lint 错误（react-hooks 新规则）：mobile-nav 以派生 state 代替 effect 收起抽屉；theme-layout-controls 用 `useSyncExternalStore` 读 localStorage / 判断 mounted
- 验证：collect 离线/在线（本地 mock RSS+Atom）均通过；`next build` 14 页全部预渲染；`eslint` 0 错误；`next start` 冒烟测试 `/`、`/d/2026-10-08`、`/c/ai-news` 均 200 且内容与来源标识正确渲染

## Result

`daily` 与 `daily-next` 已合并为唯一项目 `apps/daily-feeds`，Source（个人 RSS / 手工内容）与 Web Site（Next.js）在目录、数据模型与管线三层分离。构建、lint、运行时冒烟测试全部通过。
