/**
 * 数据层 —— 读取 data/*.json（文件名即日期），构建目录由服务器完成，
 * 因此这里直接用 fs 同步读取，无需额外的 API 或数据库。
 */

import fs from "node:fs";
import path from "node:path";

import { CATEGORIES, getCategory } from "./registry";

/** 条目来源：与目标网站（domain/url）区分，rss 为订阅源，content 为手工整理 */
export type ItemSource = {
  type: "rss" | "content";
  name: string;
};

export type DigestItem = {
  category: string;
  domain: string;
  title: string;
  note: string;
  url: string;
  source?: ItemSource;
};

export type Day = {
  date: string;
  items: DigestItem[];
};

const DATA_DIR = path.join(process.cwd(), "data");

/** 中文日期展示：2026-10-09 -> 10月9日 */
export function zhDate(date: string): string {
  const [, m, d] = date.split("-");
  return `${Number(m)}月${Number(d)}日`;
}

/** 全部日期，倒序（最新在前） */
export function getAllDays(): Day[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse()
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf-8"));
      const date = f.replace(/\.json$/, "");
      return { date, items: raw.items ?? [] };
    });
}

/** 按日期取单日数据 */
export function getDay(date: string): Day | undefined {
  return getAllDays().find((d) => d.date === date);
}

/** 页面主体：某一天的数据按分类分区（顺序遵循 registry） */
export function getSectionsByDay(day: Day) {
  return CATEGORIES.map((category) => ({
    category,
    items: day.items.filter((it) => it.category === category.slug),
  })).filter((section) => section.items.length > 0);
}

/** 某一天的分类计数，用于侧栏（不含 icon 等函数字段，保证可序列化跨 server/client 边界） */
export function getCategoryCounts(day: Day | undefined) {
  const counts = new Map<string, number>();
  for (const item of day?.items ?? []) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return CATEGORIES.map((c) => ({ slug: c.slug, label: c.label, count: counts.get(c.slug) ?? 0 }));
}

/** 跨日期：某分类下的全部条目（归档视角） */
export function getItemsByCategory(slug: string) {
  const category = getCategory(slug);
  if (!category) return undefined;
  const days = getAllDays()
    .map((day) => ({
      date: day.date,
      items: day.items.filter((it) => it.category === slug),
    }))
    .filter((group) => group.items.length > 0);
  return { category, days, total: days.reduce((n, g) => n + g.items.length, 0) };
}
