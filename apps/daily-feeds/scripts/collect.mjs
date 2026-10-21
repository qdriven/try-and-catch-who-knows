#!/usr/bin/env node
/**
 * collect —— Source 层到 Web Site 层的数据管线（承接原 daily/build.py 的角色）。
 *
 * 用法:
 *     node scripts/collect.mjs                        # 采集今天
 *     node scripts/collect.mjs --date 2026-10-09      # 采集指定日期
 *     node scripts/collect.mjs --offline              # 跳过 RSS 拉取，只合并手工内容
 *
 * 约定:
 *     - 来源在 sources/sources.json 中注册（rss / content）。
 *     - content 来源：sources/content/YYYY-MM-DD.json，手工整理。
 *     - rss 来源：抓取并解析 RSS 2.0 / Atom，按 limit 截取。
 *     - 输出：web/data/YYYY-MM-DD.json，条目按分类 registry 顺序排序。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------- config

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES_FILE = path.join(ROOT, "sources", "sources.json");
const OUT_DIR = path.join(ROOT, "web", "data");

// 与 web/lib/registry.ts 保持一致的分类顺序
const CATEGORY_ORDER = [
  "ai-news",
  "ai-collab",
  "product",
  "aesthetic",
  "indie",
  "marketing",
];

// ---------------------------------------------------------------- args

function parseArgs(argv) {
  const args = { date: null, offline: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--date") args.date = argv[++i];
    else if (argv[i] === "--offline") args.offline = true;
    else {
      console.error(`未知参数: ${argv[i]}`);
      process.exit(1);
    }
  }
  if (!args.date) {
    const now = new Date();
    args.date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate(),
    ).padStart(2, "0")}`;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) {
    console.error(`--date 格式应为 YYYY-MM-DD，收到: ${args.date}`);
    process.exit(1);
  }
  return args;
}

// ---------------------------------------------------------------- text helpers

function decodeEntities(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

function stripTags(html) {
  return decodeEntities(String(html))
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, max = 80) {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------- rss parsing
// 零依赖的最小解析：覆盖 RSS 2.0 <item> 与 Atom <entry>，够订阅摘要使用。

function pick(block, tags) {
  for (const tag of tags) {
    const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
    if (m?.[1]) return m[1].trim();
  }
  return "";
}

function parseFeed(xml) {
  const blocks = [
    ...(xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/g) ?? []),
    ...(xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/g) ?? []),
  ];

  return blocks.map((block) => {
    const title = stripTags(pick(block, ["title"]));
    let link = stripTags(pick(block, ["link"]));
    if (!link) {
      // Atom: <link rel="alternate" href="..." />
      const m = block.match(/<link[^>]*href="([^"]+)"/);
      link = m?.[1] ?? "";
    }
    const note = truncate(
      stripTags(pick(block, ["description", "summary", "content:encoded", "content"])).replace(
        /^title:\s*/i,
        "",
      ),
    );
    return { title, link, note };
  });
}

// ---------------------------------------------------------------- collectors

function collectContent(source, date) {
  const file = path.join(ROOT, "sources", source.path, `${date}.json`);
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
  return (raw.items ?? []).map((item) => ({
    ...item,
    source: item.source ?? { type: "content", name: source.name },
  }));
}

async function collectRss(source) {
  const res = await fetch(source.url, {
    headers: { "user-agent": "daily-feeds-collect/0.1" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const entries = parseFeed(await res.text())
    .filter((e) => e.title && e.link)
    .slice(0, source.limit ?? 5);

  return entries.map((e) => ({
    category: source.category,
    domain: domainOf(e.link),
    title: e.title,
    note: e.note,
    url: e.link,
    source: { type: "rss", name: source.name },
  }));
}

// ---------------------------------------------------------------- main

async function main() {
  const { date, offline } = parseArgs(process.argv.slice(2));
  const registry = JSON.parse(fs.readFileSync(SOURCES_FILE, "utf-8"));

  const items = [];
  for (const source of registry.sources ?? []) {
    if (source.enabled === false) {
      console.log(`跳过（未启用）: ${source.id}`);
      continue;
    }
    try {
      if (source.type === "content") {
        const got = collectContent(source, date);
        items.push(...got);
        console.log(`content ${source.id}: ${got.length} 条`);
      } else if (source.type === "rss") {
        if (offline) {
          console.log(`跳过（离线模式）: ${source.id}`);
          continue;
        }
        const got = await collectRss(source);
        items.push(...got);
        console.log(`rss     ${source.id}: ${got.length} 条`);
      } else {
        console.warn(`未知来源类型，忽略: ${source.id} (${source.type})`);
      }
    } catch (err) {
      console.error(`来源 ${source.id} 采集失败: ${err.message}`);
    }
  }

  if (items.length === 0) {
    console.error(`${date} 没有采集到任何条目，不写数据文件`);
    process.exit(1);
  }

  // 按分类 registry 顺序排序，保证数据文件稳定
  items.sort(
    (a, b) =>
      (CATEGORY_ORDER.indexOf(a.category) + 1 || CATEGORY_ORDER.length + 1) -
        (CATEGORY_ORDER.indexOf(b.category) + 1 || CATEGORY_ORDER.length + 1),
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${date}.json`);
  fs.writeFileSync(out, `${JSON.stringify({ items }, null, 2)}\n`, "utf-8");
  console.log(`已生成 ${path.relative(ROOT, out)}（${items.length} 条）`);
}

main();
