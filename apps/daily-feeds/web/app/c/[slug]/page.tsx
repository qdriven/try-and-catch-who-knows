import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { DigestCard } from "@/components/digest-card";
import { getItemsByCategory, zhDate } from "@/lib/data";
import { CATEGORIES } from "@/lib/registry";

/** 分类路由由 registry 驱动 */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getItemsByCategory(slug);

  if (!result) notFound();

  const { category, days, total } = result;
  const Icon = category.icon;

  return (
    <div className="space-y-10">
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-lg"
            style={{ backgroundColor: `${category.accent}1a`, color: category.accent }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{category.label}</h1>
            <p className="text-sm text-muted-foreground">
              {category.desc} · 共 {total} 条
            </p>
          </div>
        </div>
      </header>

      {days.map((group) => (
        <section key={group.date} className="space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {zhDate(group.date)}
            <span className="text-xs tabular-nums opacity-70">({group.items.length})</span>
            <ArrowRight className="size-3 opacity-60" />
          </h2>
          <div className="card-grid grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <DigestCard key={item.url} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
