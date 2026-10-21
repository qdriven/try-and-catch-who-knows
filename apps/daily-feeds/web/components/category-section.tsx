import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DigestCard } from "@/components/digest-card";
import { Badge } from "@/components/ui/badge";
import type { DigestItem } from "@/lib/data";
import type { Category } from "@/lib/registry";

type CategorySectionProps = {
  category: Category;
  items: DigestItem[];
  /** 是否显示“查看全部”入口（首页显示，分类页不显示） */
  showMore?: boolean;
};

/** 正文分区：一个分类一块，标题用强调色，卡片走响应式网格 */
export function CategorySection({ category, items, showMore = true }: CategorySectionProps) {
  const Icon = category.icon;

  return (
    <section id={category.slug} className="scroll-mt-8">
      <header className="mb-4 flex items-center gap-3">
        <span
          className="grid size-8 shrink-0 place-items-center rounded-lg"
          style={{ backgroundColor: `${category.accent}1a`, color: category.accent }}
        >
          <Icon className="size-4" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold tracking-tight">{category.label}</h2>
            <Badge variant="soft" className="font-normal tabular-nums">
              {items.length}
            </Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">{category.desc}</p>
        </div>

        {showMore ? (
          <Link
            href={`/c/${category.slug}`}
            className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            查看全部
            <ArrowRight className="size-3.5" />
          </Link>
        ) : null}
      </header>

      <div className="card-grid grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DigestCard key={item.url} item={item} />
        ))}
      </div>
    </section>
  );
}
