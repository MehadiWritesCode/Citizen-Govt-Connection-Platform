"use client";

export default function KPI({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 active:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:active:bg-slate-800">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
          {label}
        </div>
        <div className="text-slate-500 dark:text-slate-400">{icon}</div>
      </div>

      <div className="mt-1 text-2xl font-medium text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}
