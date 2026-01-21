"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import PageTitle from "../ui/PageTitle";
import { Eye, EyeOff } from "lucide-react";
import { ActionPassswordChange } from "../actions/passwordChange";

export default function SettingsPage() {
  const [notify, setNotify] = useState(true);

  const [state,handlePasswordChange,isPending] = useActionState(ActionPassswordChange,null);
  const [showSuccess, setShowSuccess] = useState(false);

  // derive messages from server action state
  const isOk = state?.ok === true;
  const isFail = state?.ok === false;

  const message = useMemo(() => state?.message ?? "", [state]);

  // Show success banner when ok
   useEffect(() => {
  if (!isOk) return;

  setTimeout(() => {
    setShowSuccess(true);
  });

  const t = window.setTimeout(() => setShowSuccess(false), 2200);
  return () => window.clearTimeout(t);
}, [isOk]);

  //  visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (

    <div className="space-y-4">
      <PageTitle title="Settings" subtitle="Preferences." />

{/* Success Toast (better UX) */}
{showSuccess && (
  <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4 w-full max-w-md">
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-xl dark:border-emerald-900/40 dark:bg-slate-900">

      {/* Icon */}
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
        ✓
      </div>

      {/* Text */}
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Success!
        </div>
        <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
          {message || "Password changed successfully."}
        </div>
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setShowSuccess(false)}
        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
      >
        ✕
      </button>
    </div>
  </div>
)}




      <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-700/70 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Security
            </div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your password.
            </div>
          </div>

          <div className="hidden" aria-hidden>
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
            />
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/70 dark:bg-slate-700/70" />

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Change password
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Use a strong password with at least 8 characters.
              </div>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Password
            </span>
          </div>

          <form
          action={handlePasswordChange}
          className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Current password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-200">
                  Current password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/25 focus-visible:border-emerald-400/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-200">
                  New password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/25 focus-visible:border-emerald-400/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-slate-200/70 dark:bg-slate-700/70" />

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">

{/* Error banner (only when fail) */}
{isFail && (
  <div
    role="alert"
    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200"
  >
    <div className="font-semibold">Couldn’t change password</div>
    <div className="mt-0.5 text-xs opacity-90">
      {message || "Something went wrong."}
    </div>
  </div>
)}


              <button
                type="reset"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-white/5"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="sm:ml-auto inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-slate-100 dark:text-slate-900"
              >
                Change
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tip: Avoid using personal info. A password manager can help.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
