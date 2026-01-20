"use client";

import PageTitle from "../ui/PageTitle";

export default function Help() {
  return (
    <div className="space-y-4">
      <PageTitle title="Help" subtitle="Support and emergency hotline." />

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Emergency
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300">
            Call 999
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700" />

        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            How reports work
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1 dark:text-slate-300">
            <li>Submit a report with location + details.</li>
            <li>Status updates appear in My Reports.</li>
            <li>Authorities resolve issues based on priority.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
