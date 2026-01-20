"use client";

import React from "react";
import { cx } from "../../lib/util";

export default function NavItem({
  icon,
  label,
  active,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
        "active:scale-[0.99]",

        danger
          ? cx(
              "text-rose-700 hover:bg-rose-50 active:bg-rose-100",
              "dark:text-rose-300 dark:hover:bg-rose-950/30 dark:active:bg-rose-950/50"
            )
          : active
          ? cx(
              "bg-slate-900 text-white",
              "dark:bg-slate-100 dark:text-slate-900"
            )
          : cx(
              "text-slate-700 hover:bg-slate-50 active:bg-slate-100",
              "dark:text-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            )
      )}
    >
      <span
        className={cx(
          "grid h-8 w-8 place-items-center rounded-md transition",
          danger
            ? cx("bg-rose-50", "dark:bg-rose-950/40")
            : active
            ? cx("bg-white/10", "dark:bg-slate-900/10")
            : cx("bg-slate-100", "dark:bg-slate-800")
        )}
      >
        {icon}
      </span>

      <span className="truncate font-normal">{label}</span>
    </button>
  );
}
