"use client";

import PageTitle from "../ui/PageTitle";
import Field from "../ui/Field";
import { useActionState, useEffect, useMemo, useState } from "react";
import { handleUpdateProfile } from "../actions/updateProfile";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Profile() {
  const [state, formAction, isPending] = useActionState(handleUpdateProfile, null);

  // only for success banner
  const [showSuccess, setShowSuccess] = useState(false);

  // derive messages from server action state
  const isOk = state?.ok === true;
  const isFail = state?.ok === false;

  const message = useMemo(() => state?.message ?? "", [state]);

  // Show success banner when ok
useEffect(() => {
  if (!isOk) return;

  //push into next tick
  setTimeout(() => {
    setShowSuccess(true);
  });

  const t = window.setTimeout(() => setShowSuccess(false), 2200);
  return () => window.clearTimeout(t);
}, [isOk]);


  return (
    <form action={formAction} className="space-y-4">
      <PageTitle title="Profile" subtitle="Update your information" />

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-700 dark:bg-slate-900">

        {/*  Success  banner*/}
        {showSuccess && isOk && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Profile updated</p>
              <p className="text-sm opacity-90">{message}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="ml-auto rounded-lg px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              Close
            </button>
          </div>
        )}

        <Field label="Full name">
          <input
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            name="name"
          />
        </Field>

        <Field label="Address">
          <input
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            name="address"
            placeholder="area/upazila/zilla"
          />
        </Field>

        {/* Fail message just above button */}
        {isFail && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Update failed</p>
              <p className="text-sm opacity-90">{message}</p>
            </div>
          </div>
        )}

        <button
          disabled={isPending}
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
