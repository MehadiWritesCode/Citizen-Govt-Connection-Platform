"use client";

import { useState } from "react";
import PageTitle from "../ui/PageTitle";
import Field from "../ui/Field";

export default function Profile({ onSaved }: { onSaved: () => void }) {
  const [name, setName] = useState("Mehedi Hasan");
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-4">
      <PageTitle title="Profile" subtitle="Update your information (demo)." />

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <Field label="Full name">
          <input
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Phone">
          <input
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
          />
        </Field>

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
