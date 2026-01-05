"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6fbf9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Dotted pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-400/15" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-rose-400/15 blur-3xl dark:bg-rose-400/10" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-14">
        <div className="w-full max-w-xl">
          {/* Badge */}
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur dark:bg-slate-950/60 dark:text-slate-200 dark:ring-slate-800">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
              🏛️
            </span>
            Citizen Digital Services • Government of Bangladesh
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/80 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.12)] ring-1 ring-slate-200 backdrop-blur dark:bg-slate-950/65 dark:ring-slate-800 dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)] sm:p-10">
            {/* Big 404 */}
            <div className="relative">
              <div className="text-center text-7xl font-extrabold tracking-tight sm:text-8xl">
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-200 dark:to-emerald-300">
                  404
                </span>
              </div>

              {/* Small icon chip */}
              <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-600/15 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-400/20">
                <span className="text-lg">🚫</span>
                Page Not Found
              </div>
            </div>

            <p className="mt-5 text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The page you’re trying to access doesn’t exist, may have been moved,
              or the URL is incorrect. Please return to a safe location below.
            </p>

            {/* Actions */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 active:scale-[0.99] dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                ⬅ Home
              </Link>

              <Link
                href="/login-registration"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.99] dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900"
              >
                🔐 Login / Register
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-slate-800">
                Helpline: <b className="text-slate-700 dark:text-slate-200">333</b>
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-slate-800">
                Emergency: <b className="text-slate-700 dark:text-slate-200">999</b>
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-slate-800">
                Health: <b className="text-slate-700 dark:text-slate-200">16263</b>
              </span>
            </div>
          </div>

          {/* Bottom hint */}
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Tip: Check your URL spelling or go back to the previous page.
          </p>
        </div>
      </div>
    </div>
  );
}

