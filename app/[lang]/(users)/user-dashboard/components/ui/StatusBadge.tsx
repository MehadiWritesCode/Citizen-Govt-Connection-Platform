"use client";

import type { Status } from "../../types";

export default function StatusBadge({ status }: { status: Status }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium";

  if (status === "Resolved")
    return (
      <span
        className={
          base +
          " bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
        }
      >
        Resolved
      </span>
    );

  if (status === "In Progress")
    return (
      <span
        className={
          base +
          " bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
        }
      >
        In Progress
      </span>
    );

  return (
    <span
      className={
        base +
        " bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
      }
    >
      Pending
    </span>
  );
}
