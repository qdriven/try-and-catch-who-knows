"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavList, type SidebarNavItem } from "@/components/nav-list";
import { ThemeLayoutControls } from "@/components/theme-layout-controls";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/lib/registry";

type CategoryCount = { slug: string; label: string; count: number };

type AppSidebarProps = {
  dates: SidebarNavItem[];
  categories: CategoryCount[];
};

export function AppSidebar({ dates, categories }: AppSidebarProps) {
  const pathname = usePathname();
  const total = categories.reduce((n, c) => n + c.count, 0);

  return (
    <aside className="sticky top-0 hidden h-screen w-[var(--sidebar-width)] shrink-0 flex-col border-r border-border px-4 py-5 lg:flex">
      <Link href="/" className="font-script text-[28px] leading-none font-semibold tracking-tight">
        Daily
      </Link>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">每天一份精选摘要。</p>

      <div className="mt-6 flex-1 space-y-6 overflow-y-auto pb-4">
        <section>
          <h2 className="mb-2 px-2.5 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            按日期
          </h2>
          <NavList items={dates} pathname={pathname} />
        </section>

        <section>
          <h2 className="mb-2 px-2.5 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            按分类
          </h2>
          <NavList
            pathname={pathname}
            items={categories.map((c) => ({
              href: `/c/${c.slug}`,
              label: c.label,
              count: c.count,
              icon: getCategory(c.slug)?.icon,
            }))}
          />
        </section>
      </div>

      <div className="border-t border-border pt-4">
        <ThemeLayoutControls />
        <Badge variant="soft" className="mt-3 w-full justify-center font-normal">
          {total} 条今日精选
        </Badge>
      </div>
    </aside>
  );
}
