import Link from "next/link";
import "./globals.css"
import { ShieldCheck, ArrowLeft, Phone, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      {/* Official strip */}
      <div className="border-b border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            Citizen Digital Services • Government of Bangladesh
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <LifeBuoy className="w-4 h-4" />
            Support: <span className="font-semibold">333</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left illustration block (official-style panel) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-8 sm:p-10">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Error
              </p>
              <p className="mt-2 text-6xl sm:text-7xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                404
              </p>

              <div className="mt-5 space-y-2">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Page not found
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  The page may have been moved, removed, or the address may be incorrect.
                </p>
              </div>

              <div className="mt-6 h-px bg-slate-200/70 dark:bg-slate-800" />

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Helpline
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    333
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Emergency
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    999
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Health
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    16263
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                We couldn’t find the requested page.
              </h1>

              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[70ch]">
                Please confirm the URL spelling. If you followed a link from within the portal, the page may have been updated.
              </p>

              {/* Actions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900
                             px-5 py-3 text-sm font-semibold
                             hover:opacity-95 active:scale-[0.99] transition
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to home
                </Link>

                <Link
                  href="/login-registration"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             border border-slate-200/70 dark:border-slate-800
                             bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100
                             px-5 py-3 text-sm font-semibold
                             hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-[0.99] transition
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  Sign in / Register
                </Link>
              </div>

              {/* Helpful links */}
              <div className="mt-8 border-t border-slate-200/70 dark:border-slate-800 pt-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Helpful next steps
                </p>

                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    Go back and try again, or use the main navigation menu.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    If this is a recurring issue, contact the service desk.
                  </li>
                </ul>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:333"
                    className="inline-flex items-center justify-center gap-2 rounded-xl
                               border border-slate-200/70 dark:border-slate-800
                               bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100
                               px-4 py-2.5 text-sm font-semibold
                               hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                  >
                    <Phone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    Call 333
                  </a>

                  <a
                    href="tel:999"
                    className="inline-flex items-center justify-center gap-2 rounded-xl
                               border border-slate-200/70 dark:border-slate-800
                               bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100
                               px-4 py-2.5 text-sm font-semibold
                               hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    Call 999 (Emergency)
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
              Tip: Check your URL spelling or return to the previous page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
