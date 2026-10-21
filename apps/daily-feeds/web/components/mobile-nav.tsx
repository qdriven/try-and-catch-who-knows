"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Menu, X } from "lucide-react";

import { NavList, type SidebarNavItem } from "@/components/nav-list";
import { ThemeLayoutControls } from "@/components/theme-layout-controls";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/registry";
import { cn } from "@/lib/utils";

type CategoryCount = { slug: string; label: string; count: number };

type MobileNavProps = {
  dates: SidebarNavItem[];
  categories: CategoryCount[];
};

/** 移动端：顶部标题栏 + 抽屉式导航（内容与桌面侧栏一致） */
export function MobileNav({ dates, categories }: MobileNavProps) {
  const pathname = usePathname();

  // 路由变化后抽屉自动收起：派生而非 effect（参考 react.dev "You Might Not Need an Effect"）
  const [drawer, setDrawer] = React.useState({ open: false, path: pathname });
  const open = drawer.path === pathname && drawer.open;
  const setOpen = (next: boolean) => setDrawer({ open: next, path: pathname });

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-2.5 backdrop-blur lg:hidden">
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          aria-expanded={open}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
        <Link href="/" className="font-script text-xl leading-none font-semibold">
          Daily
        </Link>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/20 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        className={cn(
          "fixed top-[45px] bottom-0 left-0 z-40 flex w-[min(80vw,19rem)] flex-col border-r border-border bg-background px-4 py-5 transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex-1 space-y-6 overflow-y-auto">
          <section>
            <h2 className="mb-2 px-2.5 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              按日期
            </h2>
            <NavList items={dates} pathname={pathname} onNavigate={() => setOpen(false)} />
          </section>
          <section>
            <h2 className="mb-2 px-2.5 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              按分类
            </h2>
            <NavList
              pathname={pathname}
              onNavigate={() => setOpen(false)}
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
        </div>
      </div>
    </>
  );
}
