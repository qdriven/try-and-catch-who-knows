"use client";

import Link from "next/link";
import { ArrowUpRight, PenLine, Rss } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/lib/registry";
import type { DigestItem } from "@/lib/data";
import { cn } from "@/lib/utils";

type DigestCardProps = {
  item: DigestItem;
  /** 列表模式下横向排布封面 */
  className?: string;
};

export function DigestCard({ item, className }: DigestCardProps) {
  const category = getCategory(item.category);
  const [from, to] = category?.gradient ?? ["#e5e5e5", "#f5f5f5"];
  const Icon = category?.icon;

  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {/* 封面：无图时用分类渐变占位，保持版式整齐 */}
      <div
        className="card-media relative flex aspect-[4/3] items-end overflow-hidden p-3 transition-[height]"
        style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {Icon ? <Icon className="size-4 opacity-40" aria-hidden /> : null}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,.08), transparent)" }}
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Badge
            variant="outline"
            className="gap-1 border-transparent px-1.5"
            style={{ color: category?.accent }}
          >
            {Icon ? <Icon className="size-3" aria-hidden /> : null}
            {category?.label ?? item.category}
          </Badge>
          <span className="size-[3px] rounded-full bg-current opacity-40" aria-hidden />
          <span className="truncate">{item.domain}</span>
          {item.source ? (
            <>
              <span className="size-[3px] rounded-full bg-current opacity-40" aria-hidden />
              <span className="inline-flex shrink-0 items-center gap-0.5" title={`来源：${item.source.name}`}>
                {item.source.type === "rss" ? (
                  <Rss className="size-3" aria-hidden />
                ) : (
                  <PenLine className="size-3" aria-hidden />
                )}
                <span className="truncate">{item.source.name}</span>
              </span>
            </>
          ) : null}
        </div>

        <h3 className="text-[15px] leading-snug font-semibold text-card-foreground">{item.title}</h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{item.note}</p>
      </div>

      <span
        className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-md border border-border bg-card text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      >
        <ArrowUpRight className="size-3.5" />
      </span>
    </Link>
  );
}
