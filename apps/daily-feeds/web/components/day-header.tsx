import Link from "next/link";

/** 页面顶部：日期 + 总量 + 分类快捷跳转 */
export function DayHeader({
  date,
  title,
  total,
  tags,
}: {
  date?: string;
  title: string;
  total: number;
  tags: { slug: string; label: string }[];
}) {
  return (
    <header className="border-b border-border pb-6">
      {date ? (
        <p className="text-xs text-muted-foreground">{date}</p>
      ) : null}

      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <span className="text-sm text-muted-foreground tabular-nums">{total} 条</span>
      </div>

      <nav className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/c/${tag.slug}`}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {tag.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
