"use client";

import Link from "next/link";
import {
  ArrowLeft,
  UploadCloud,
  Image as ImageIcon,
  Video,
  Info,
  PhoneCall,
  FileText,
} from "lucide-react";

import type { Category } from "../../types";
import PageTitle from "../ui/PageTitle";
import Field from "../ui/Field";

export default function NewReportDesignOnly({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageTitle
          title="New report"
          subtitle="Submit an issue with clear location and short details."
        />

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <Link
            href="/report-guidelines"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700 sm:w-auto"
          >
            <FileText className="h-4 w-4" />
            Guidelines
          </Link>

          <a
            href="tel:999"
            aria-label="Call emergency number 999"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D3281B] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 sm:w-auto"
          >
            <PhoneCall className="h-4 w-4" />
            Call 999
          </a>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main card */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Report details
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Provide category, evidence, location, and short details.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:flex">
              <Info className="h-4 w-4" />
              Verified submissions process faster
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {/* Category */}
            <Field label="Category">
              <select
                defaultValue={"Road" as Category}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="Road">Road</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Crime">Crime</option>
                <option value="Emergency">Emergency</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            {/* Evidence (UI only) */}
            <Field label="Evidence (photo/video) *">
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-900">
                      <UploadCloud className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Upload evidence
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Upload at least one photo/video • JPG/PNG/MP4
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  >
                    Choose files
                  </button>
                </div>

                {/* static chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <ImageIcon className="h-4 w-4" />
                    <span className="max-w-[180px] truncate">photo_01.jpg</span>
                    <span className="ml-1 rounded-lg px-2 py-1 text-slate-500 dark:text-slate-400">
                      ✓
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <Video className="h-4 w-4" />
                    <span className="max-w-[180px] truncate">video_01.mp4</span>
                    <span className="ml-1 rounded-lg px-2 py-1 text-slate-500 dark:text-slate-400">
                      ✓
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                Tip: Clear photo/video helps faster verification.
              </div>
            </Field>

            {/* Location */}
            <Field label="Location">
              <input
                placeholder="e.g., Jessore Sadar — Bridge road"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                Add a landmark to make it easier to verify.
              </div>
            </Field>

            {/* Details */}
            <Field label="Details">
              <textarea
                placeholder="Write what happened + urgency."
                className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Example: “Water leakage near market road. Spreading fast.”</span>
                <span>0/300</span>
              </div>
            </Field>

            {/* Bottom actions (design-only) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              >
                Cancel
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Add evidence + fill location & details to submit.
              </span>
            </div>
          </div>
        </div>

        {/* Guidance card */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Guidance
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            For faster processing.
          </p>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold">Write clear location</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Example: “Jessore Sadar — Bridge road.”
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold">Keep details short</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                What happened + urgency.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold">Emergency</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Call 999 for immediate help.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
