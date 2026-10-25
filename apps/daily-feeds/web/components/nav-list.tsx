"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  href: string;
  label: string;
  count?: number;
  icon?: React.ComponentType<{ className?: string }>;
};

/** 侧栏导航列表：日期与分类共用同一套渲染逻辑 */
export function NavList({
  items,
  pathname,
  onNavigate,
}: {
  items: SidebarNavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
              active
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            {Icon ? <Icon className={cn("size-3.5 shrink-0", !active && "opacity-80")} /> : null}
            <span className="flex-1 truncate">{item.label}</span>
            {typeof item.count === "number" ? (
              <span className="text-[11px] tabular-nums text-muted-foreground">{item.count}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
