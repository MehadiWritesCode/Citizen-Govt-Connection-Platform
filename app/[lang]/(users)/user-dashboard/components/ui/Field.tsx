"use client";

export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}
