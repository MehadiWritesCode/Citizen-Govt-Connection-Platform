import type { Report } from "../types";

//Generate new report ID
export function nextReportId(existing: Report[]) {
  const nums = existing
    .map((r) => Number(String(r.id).split("-")[1]))
    .filter((n) => Number.isFinite(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `RC-${max + 1}`;
}
