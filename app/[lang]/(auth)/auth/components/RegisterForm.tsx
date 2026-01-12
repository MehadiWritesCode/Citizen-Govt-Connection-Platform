import { CreateUser, type ActionResult } from "../register.action";
import AuthButton from "./AuthButton";
import { useActionState, useEffect } from "react";

export default function RegisterForm({
  dict,
}: {
  dict: Record<string, string>;
}) {
  const intialState: ActionResult = { ok: true };
  const [state, action] = useActionState(CreateUser, intialState);

  // !field error scrolling view-----------------------
  useEffect(() => {
    if (state.ok) return;
    if (!("field" in state) || !state.field) return;

    const el = document.querySelector(`[data-field="${state.field}"]`) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.focus(), 250);
  }, [state.ok, "field" in state ? state.field : null]);

  //fiedl error text show
  const fieldError = (field: string) =>
    !state.ok && "field" in state && state.field === field
      ? state.message
      : null;

  // global error show text
  const globalError =
    !state.ok && (!("field" in state) || !state.field) ? state.message : null;

  // !------------------------------------------------------------------------

  return (
    <form className="space-y-5" action={action}>
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.nameLabel}
        </label>
        <input
          name="name"
          data-field="name"
          type="text"
          placeholder={dict.namePlaceholder}
          className="
            w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
            border-slate-200/80 placeholder:text-slate-400
            outline-none transition
            focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
            dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
            dark:placeholder:text-slate-500
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
          "
        />
        {fieldError("name") && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {fieldError("name")}
          </p>
        )}
      </div>

      {/* Mobile + NID */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.numberLabel}
          </label>
          <input
            name="phone"
            data-field="phone"
            type="text"
            placeholder={dict.numberPlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80 placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />
          {fieldError("phone") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("phone")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.nidNumberLabel}
          </label>
          <input
            name="nid"
            data-field="nid"
            type="text"
            placeholder={dict.nidNumberPlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80 placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />

          {fieldError("nid") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("nid")}
            </p>
          )}
        </div>
      </div>

      {/* Age + DOB */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.ageLabel}
          </label>
          <input
            name="age"
            data-field="age"
            type="number"
            min={0}
            placeholder={dict.agePlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80 placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />
          {fieldError("age") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("age")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.dobLabel}
          </label>
          <input
            name="dob"
            data-field="dob"
            type="date"
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />

          {fieldError("dob") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("dob")}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.addressLabel}
        </label>
        <textarea
          name="address"
          data-field="address"
          rows={3}
          placeholder={dict.addressPlaceholder}
          className="
            w-full resize-none rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
            border-slate-200/80 placeholder:text-slate-400
            outline-none transition
            focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
            dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
            dark:placeholder:text-slate-500
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
          "
        />

        {fieldError("address") && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {fieldError("address")}
          </p>
        )}
      </div>

      {/* Passwords */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.passwordLabel}
          </label>
          <input
            name="password"
            data-field="password"
            type="password"
            placeholder={dict.passwordPlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80 placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />

          {fieldError("password") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("password")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.confirmPasswordLabel}
          </label>
          <input
            name="confirmPassword"
            data-field="confirmPassword"
            type="password"
            placeholder={dict.confirmPasswordPlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80 placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />

          {fieldError("confirmPassword") && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError("confirmPassword")}
            </p>
          )}
        </div>
      </div>

      {!state.ok && (!("field" in state) || !state.field) && state.message && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {state.message}
        </div>
      )}

      {/* Submit */}
      <AuthButton Btnlabel={dict.registerBtn} />

      {/* Terms */}
      <p className="text-center text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        {dict.termsText}{" "}
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {dict.terms}
        </span>{" "}
        {dict.and}{" "}
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {dict.privacy}
        </span>
        .
      </p>
    </form>
  );
}
