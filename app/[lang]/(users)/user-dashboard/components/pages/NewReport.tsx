"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import type { Category, Report } from "../../types";
import PageTitle from "../ui/PageTitle";
import Field from "../ui/Field";

export default function NewReport({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: Omit<Report, "id" | "createdAt" | "status">) => void;
  onBack: () => void;
}) {
  const [category, setCategory] = useState<Category>("Road");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const loc = location.trim();
    const det = details.trim();
    if (!loc || !det) {
      setError("Please fill in location and details.");
      return;
    }
    setError(null);
    onSubmit({ category, location: loc, details: det });
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <PageTitle
        title="New report"
        subtitle="Submit an issue with clear location and short details."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Crime">Crime</option>
            <option value="Emergency">Emergency</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Location">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Jessore Sadar"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </Field>

        <Field label="Details">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Write a short description"
            className="w-full min-h-[130px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Example: “Water leakage near market road.”
          </div>
        </Field>

        {error ? (
          <div className="text-sm text-rose-700 dark:text-rose-300">{error}</div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSubmit}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            Submit
          </button>

          <button
            onClick={onBack}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
