import type { Metadata } from "next";

import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Providers } from "@/components/providers";
import { getAllDays, getCategoryCounts, zhDate } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: "Daily", template: "%s · Daily" },
  description: "每天一份精选摘要。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const days = getAllDays();
  const latest = days[0];

  // 侧栏导航数据：最新一期挂在根路径，其余按日期路由
  const dates = days.map((day) => ({
    href: day.date === latest?.date ? "/" : `/d/${day.date}`,
    label: zhDate(day.date),
    count: day.items.length,
  }));

  const categories = getCategoryCounts(latest);

  return (
    <html lang="zh-CN" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">
        <Providers>
          <div id="daily-root" className="mx-auto flex w-full max-w-[1400px]">
            <AppSidebar dates={dates} categories={categories} />
            <MobileNav dates={dates} categories={categories} />
            <main className="min-w-0 flex-1 px-5 py-6 lg:px-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
