"use client";

export default function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  renderLabel,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
  renderLabel?: (o: T) => string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none
                   focus:border-slate-400 focus:ring-2 focus:ring-slate-200
                   active:bg-slate-50
                   dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100
                   dark:focus:border-slate-500 dark:focus:ring-slate-700 dark:active:bg-slate-800"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {renderLabel ? renderLabel(o) : o}
          </option>
        ))}
      </select>
    </div>
  );
}
