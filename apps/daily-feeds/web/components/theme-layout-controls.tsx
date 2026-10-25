"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LayoutGrid, List, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 布局模式持久化 key */
const LAYOUT_KEY = "daily-layout";

/**
 * 布局切换通过 <html data-layout> 驱动，样式规则写在 globals.css：
 * [data-layout="list"] .card-grid { grid-template-columns: 1fr }
 */
type Layout = "masonry" | "list";

function subscribeLayout(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function readLayout(): Layout {
  return (window.localStorage.getItem(LAYOUT_KEY) as Layout | null) ?? "masonry";
}

function LayoutCapsule() {
  // localStorage 作为外部 store 读取，SSR 期间回落到默认值
  const layout = React.useSyncExternalStore(subscribeLayout, readLayout, () => "masonry" as const);

  // DOM 属于外部系统，在 effect 中同步
  React.useEffect(() => {
    document.documentElement.dataset.layout = layout;
  }, [layout]);

  const apply = (next: Layout) => {
    window.localStorage.setItem(LAYOUT_KEY, next);
    window.dispatchEvent(new Event("storage"));
  };

  const items = [
    { key: "masonry" as const, icon: LayoutGrid, label: "瀑布流" },
    { key: "list" as const, icon: List, label: "列表" },
  ];

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5">
      {items.map(({ key, icon: Icon, label }) => (
        <Button
          key={key}
          type="button"
          size="sm"
          variant="ghost"
          aria-pressed={layout === key}
          onClick={() => apply(key)}
          className={cn(
            "h-7 gap-1 px-2 text-[11px]",
            layout === key && "bg-card text-card-foreground shadow-sm",
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </Button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // 客户端挂载后才有 resolvedTheme，用空 store 订阅代替 mounted state
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
      title={dark ? "切换到浅色模式" : "切换到深色模式"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

export function ThemeLayoutControls() {
  return (
    <div className="flex items-center justify-between gap-2">
      <LayoutCapsule />
      <ThemeToggle />
    </div>
  );
}
