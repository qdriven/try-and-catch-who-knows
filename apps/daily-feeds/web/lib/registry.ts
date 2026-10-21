/**
 * 分类 registry —— 所有分类在此登记，新增分类只需加一项。
 * slug 同时用作路由片段：/c/<slug>
 */

import type { LucideIcon } from "lucide-react";
import { Bot, Brush, Megaphone, Newspaper, PenTool, User } from "lucide-react";

export type Category = {
  slug: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  /** 卡片封面渐变：浅色两张色值，深浅主题共用（本身是低饱和色） */
  gradient: [string, string];
  /** 强调色：标签文字、分区标题、计数等 */
  accent: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "ai-news",
    label: "AI 资讯",
    desc: "模型、榜单与行业动向",
    icon: Newspaper,
    gradient: ["#dbeafe", "#eff6ff"],
    accent: "#2563eb",
  },
  {
    slug: "ai-collab",
    label: "AI 协作",
    desc: "代理工作台与工程化实践",
    icon: Bot,
    gradient: ["#cffafe", "#ecfeff"],
    accent: "#0891b2",
  },
  {
    slug: "product",
    label: "产品设计",
    desc: "值得拆开看的产品细节",
    icon: PenTool,
    gradient: ["#fce7f3", "#fdf2f8"],
    accent: "#db2777",
  },
  {
    slug: "aesthetic",
    label: "审美提升",
    desc: "视觉、材质与空间",
    icon: Brush,
    gradient: ["#fef3c7", "#fffbeb"],
    accent: "#d97706",
  },
  {
    slug: "indie",
    label: "一人公司",
    desc: "独立开发者的生意与工具",
    icon: User,
    gradient: ["#dcfce7", "#f0fdf4"],
    accent: "#16a34a",
  },
  {
    slug: "marketing",
    label: "产品营销",
    desc: "获客、转化与分发实验",
    icon: Megaphone,
    gradient: ["#ede9fe", "#f5f3ff"],
    accent: "#7c3aed",
  },
];

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP.get(slug);
}

export function categoryLabel(slug: string): string {
  return CATEGORY_MAP.get(slug)?.label ?? slug;
}
