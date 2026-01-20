"use client";

export default function Service({
  icon,
  name,
  contact,
}: {
  icon: React.ReactNode;
  name: string;
  contact: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 transition
                    hover:bg-slate-50 active:bg-slate-100
                    dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-slate-700
                      dark:bg-slate-800 dark:text-slate-200">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
          {name}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Hotline: {contact}
        </div>
      </div>
    </div>
  );
}
