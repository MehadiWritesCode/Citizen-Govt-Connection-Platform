"use client";

import {
  Plus,
  ClipboardList,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import type { Report, View } from "../../types";
import { formatDate } from "../../lib/util";
import PageTitle from "../ui/PageTitle";
import KPI from "../ui/KeyPerformance";
import StatusBadge from "../ui/StatusBadge";

export default function Dashboard({
  setView,
  reports,
  onOpenReport,
}: {
  setView: (v: View) => void;
  reports: Report[];
  onOpenReport: (r: Report) => void;
}) {
  const total = reports.length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;
  const inProgress = reports.filter((r) => r.status === "In Progress").length;
  const pending = reports.filter((r) => r.status === "Pending").length;

  return (
    <div className="space-y-4">
      <PageTitle
        title="Dashboard"
        subtitle="A calm overview of your submitted requests."
        right={
          <>
            <button
              onClick={() => setView("new")}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              <Plus className="h-4 w-4" />
              New report
            </button>

            <button
              onClick={() => setView("reports")}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            >
              <ClipboardList className="h-4 w-4" />
              View reports
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KPI
          label="Total"
          value={String(total)}
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <KPI
          label="Pending"
          value={String(pending)}
          icon={<Clock className="h-4 w-4" />}
        />
        <KPI
          label="In Progress"
          value={String(inProgress)}
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <KPI
          label="Resolved"
          value={String(resolved)}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white lg:col-span-2 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Recent reports
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Click any item to view details.
              </div>
            </div>

            <button
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              onClick={() => setView("reports")}
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {reports.slice(0, 4).map((r) => (
              <button
                key={r.id}
                onClick={() => onOpenReport(r)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {r.id}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 truncate dark:text-slate-400">
                      {r.category} • {r.location} • {formatDate(r.createdAt)}
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Guidance
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              For faster processing.
            </div>
          </div>

          <div className="p-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="text-xs font-medium text-slate-700 dark:text-slate-100">
                Write clear location
              </div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Example: “Jessore Sadar — Bridge road.”
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="text-xs font-medium text-slate-700 dark:text-slate-100">
                Keep details short
              </div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                What happened + urgency.
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="text-xs font-medium text-slate-700 dark:text-slate-100">
                Emergency
              </div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Call 999 for immediate help.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
