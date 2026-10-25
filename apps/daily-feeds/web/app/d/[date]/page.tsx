import { notFound } from "next/navigation";

import { CategorySection } from "@/components/category-section";
import { DayHeader } from "@/components/day-header";
import { getAllDays, getDay, getSectionsByDay, zhDate } from "@/lib/data";

/** 全部日期都参与预渲染；数据源新增文件后重新构建即可 */
export function generateStaticParams() {
  return getAllDays().map((day) => ({ date: day.date }));
}

export default async function DatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const day = getDay(date);

  if (!day) notFound();

  const sections = getSectionsByDay(day);

  return (
    <div className="space-y-12">
      <DayHeader date={zhDate(day.date)} title={`${zhDate(day.date)} 精选`} total={day.items.length} tags={[]} />
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
