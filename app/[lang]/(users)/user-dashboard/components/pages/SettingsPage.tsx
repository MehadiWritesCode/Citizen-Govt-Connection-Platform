"use client";

import { useState } from "react";
import PageTitle from "../ui/PageTitle";

type Lang = "bn" | "en";

export default function SettingsPage({ onSaved }: { onSaved: () => void }) {
  const [notify, setNotify] = useState(true);
  const [lang, setLang] = useState<Lang>("bn");

  return (
    <div className="space-y-4">
      <PageTitle title="Settings" subtitle="Preferences (demo)." />

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Notifications
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Enable report updates.
            </div>
          </div>

          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="h-5 w-5 accent-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
            aria-label="Toggle notifications"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Language
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Choose interface language.
            </div>
          </div>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Select language"
          >
            <option value="bn">BN</option>
            <option value="en">EN</option>
          </select>
        </div>

        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-slate-100 dark:text-slate-900"
          onClick={onSaved}
        >
          Save
        </button>
      </div>
    </div>
  );
}
