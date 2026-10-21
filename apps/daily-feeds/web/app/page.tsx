import { CategorySection } from "@/components/category-section";
import { DayHeader } from "@/components/day-header";
import { getAllDays, getSectionsByDay, zhDate } from "@/lib/data";
import { CATEGORIES } from "@/lib/registry";

export default function HomePage() {
  const days = getAllDays();
  const latest = days[0];

  if (!latest) {
    return (
      <p className="text-sm text-muted-foreground">暂无数据，请在 data/ 下放入 YYYY-MM-DD.json。</p>
    );
  }

  const sections = getSectionsByDay(latest);

  return (
    <div className="space-y-12">
      <DayHeader
        date={zhDate(latest.date)}
        title="今日精选"
        total={latest.items.length}
        tags={CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))}
      />

      {sections.map((section) => (
        <CategorySection
          key={section.category.slug}
          category={section.category}
          items={section.items}
        />
      ))}
    </div>
  );
}
