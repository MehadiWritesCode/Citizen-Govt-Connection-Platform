"use client";

import {
  ShieldCheck,
  ClipboardList,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PhoneCall,
  FileText,
} from "lucide-react";

export default function ReportGuidelines() {
  return (
    <div className="space-y-5 p-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Report guidelines
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Submit clear and verifiable issues for faster action by authorities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="tel:999"
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90"
          >
            <PhoneCall className="h-4 w-4" />
            Emergency: 999
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-800"
          >
            <FileText className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Top info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 ring-1 ring-emerald-600/20 dark:bg-emerald-400/10 dark:ring-emerald-400/20">
              <ShieldCheck className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Verified reports
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Evidence + accurate location helps faster processing.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 ring-1 ring-blue-600/20 dark:bg-blue-400/10 dark:ring-blue-400/20">
              <ClipboardList className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Minimum requirements
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Category, location, short details, and photo/video evidence.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/10 ring-1 ring-amber-600/20 dark:bg-amber-400/10 dark:ring-amber-400/20">
              <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-300" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Emergency
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                For immediate danger, call 999 instead of submitting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Checklist + Examples */}
        <div className="lg:col-span-2 space-y-4">
          {/* Checklist */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Checklist before submit
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Follow these to avoid rejection and delays.
                </p>
              </div>

              <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
                60 seconds
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Accurate location
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Add area + landmark (road name, market, school, etc.).
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <Camera className="mt-0.5 h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Clear evidence
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Capture the issue clearly (avoid blur, avoid old photos).
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Short & factual details
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      What happened + impact + urgency. Avoid opinions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-rose-700 dark:text-rose-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      No duplicates
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      If same issue already reported, add comment instead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Do / Don't */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Do / Don’t
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Do
                </p>
                <ul className="mt-2 space-y-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">
                  <li>• Use exact area + landmark</li>
                  <li>• Add one clear photo/video</li>
                  <li>• Mention impact (traffic blocked, water leak spreading)</li>
                  <li>• Keep details short and factual</li>
                </ul>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
                <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                  Don’t
                </p>
                <ul className="mt-2 space-y-2 text-sm text-rose-900/80 dark:text-rose-100/80">
                  <li>• Don’t upload unrelated/old photos</li>
                  <li>• Don’t write abusive content</li>
                  <li>• Don’t submit emergency cases here</li>
                  <li>• Don’t submit same report multiple times</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ (no JS, using details) */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Frequently asked questions
            </h2>

            <div className="mt-4 space-y-3">
              <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-slate-100">
                  What makes a report “verified”?
                  <span className="float-right text-slate-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Clear evidence + correct location + non-duplicate content.
                </p>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Can I edit my report after submitting?
                  <span className="float-right text-slate-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  If allowed, edit is available while status is Pending. Otherwise add a comment/update.
                </p>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-slate-100">
                  What if I don’t know the exact address?
                  <span className="float-right text-slate-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Use area + nearby landmark + direction (e.g., “100m east of …”).
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Right: Example card + emergency */}
        <aside className="space-y-4">
          {/* Example */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Example of a good report
            </h3>

            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Category
              </p>
              <p className="mt-1 text-sm font-semibold">Water</p>

              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="mt-1 text-sm">
                Jessore Sadar — Market Road (near City College gate)
              </p>

              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Details
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                Water leakage from broken pipe, spreading into the main road. Traffic is slowing down.
              </p>
            </div>
          </div>

          {/* Emergency */}
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 sm:p-5 dark:border-rose-500/30 dark:bg-rose-500/10">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 ring-1 ring-rose-200 dark:bg-slate-950 dark:ring-rose-500/30">
                <AlertTriangle className="h-5 w-5 text-rose-700 dark:text-rose-300" />
              </span>
              <div>
                <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                  Emergency?
                </p>
                <p className="mt-1 text-sm text-rose-900/80 dark:text-rose-100/80">
                  If life-threatening, call <span className="font-semibold">999</span>.
                </p>

                <a
                  href="tel:999"
                  className="mt-3 inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 active:opacity-90"
                >
                  Call 999 now
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
