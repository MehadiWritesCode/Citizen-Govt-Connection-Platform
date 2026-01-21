"use client";

import type { Report, Status } from "../../types";
import { cx, formatDate } from "../../lib/util";
import StatusBadge from "./StatusBadge";

export default function ReportDetails({
  report,
  onUpdateStatus,
}: {
  report: Report;
  onUpdateStatus: (id: string, status: Status) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Top details card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {report.category}
          </div>
          <StatusBadge status={report.status} />
        </div>

        <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Created:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {formatDate(report.createdAt)}
          </span>
        </div>

        <div className="mt-3">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Location
          </div>
          <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
            {report.location}
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Details
          </div>
          <div className="mt-1 text-sm text-slate-700 leading-relaxed dark:text-slate-200">
            {report.details}
          </div>
        </div>
      </div>

      {/* Status update card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
          Update status (demo)
        </div>

        <div className="mt-3 grid gap-2">
          {(["Pending", "In Progress", "Resolved"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => onUpdateStatus(report.id, s)}
              className={cx(
                "w-full rounded-md border px-3 py-2 text-sm font-medium text-left transition",
                "hover:bg-slate-50 active:bg-slate-100",
                "dark:hover:bg-slate-800 dark:active:bg-slate-700",
                report.status === s
                  ? "border-slate-900 dark:border-slate-100"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400">
        Local-only demo drawer.
      </div>
    </div>
  );
}
