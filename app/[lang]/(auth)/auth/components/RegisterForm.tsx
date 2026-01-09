export default function RegisterForm({ dict }: { dict: Record<string, string> }) {
  return (
    <form className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.nameLabel}
        </label>
        <input
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
      </div>

      {/* Mobile + NID */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.numberLabel}
          </label>
          <input
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
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.nidNumberLabel}
          </label>
          <input
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
        </div>
      </div>

      {/* Age + DOB */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.ageLabel}
          </label>
          <input
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
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.dobLabel}
          </label>
          <input
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
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.addressLabel}
        </label>
        <textarea
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
      </div>

      {/* Passwords */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.passwordLabel}
          </label>
          <input
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
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.confirmPasswordLabel}
          </label>
          <input
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
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
          mt-1 inline-flex w-full items-center justify-center gap-2
          rounded-xl px-4 py-3 text-sm font-semibold
          bg-slate-900 text-white
          hover:opacity-95 transition
          active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50
          dark:bg-slate-100 dark:text-slate-900
        "
      >
        {dict.registerBtn}
        <span className="text-base leading-none">→</span>
      </button>

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
