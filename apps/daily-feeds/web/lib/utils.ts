import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 类名合并：clsx 负责条件拼接，tailwind-merge 负责去掉冲突的 Tailwind 类。 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
