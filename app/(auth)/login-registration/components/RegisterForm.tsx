export default function RegisterForm() {
  return (
    <form className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          FULL NAME
        </label>
        <input
          type="text"
          placeholder="Your full name"
          className="
            mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
            border-slate-200 bg-white text-slate-900
            focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
            dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
          "
        />
      </div>

      {/* Mobile + NID */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            MOBILE NUMBER
          </label>
          <input
            type="text"
            placeholder="01XXXXXXXXX"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            NID NUMBER
          </label>
          <input
            type="text"
            placeholder="NID"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>
      </div>

      {/* Age + DOB */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            AGE
          </label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 22"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            DATE OF BIRTH
          </label>
          <input
            type="date"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          ADDRESS
        </label>
        <textarea
          rows={3}
          placeholder="Village/Area, Thana/Upazila, District"
          className="
            mt-1 w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition
            border-slate-200 bg-white text-slate-900
            focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
            dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
          "
        />
      </div>

      {/* Passwords */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="
              mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
              border-slate-200 bg-white text-slate-900
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
              dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
            "
          />
        </div>
      </div>

      <button
        type="submit"
        className="
          mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3
          text-sm font-semibold text-white shadow-sm transition active:scale-[0.99]
          bg-emerald-800 hover:bg-emerald-900
          dark:bg-emerald-700 dark:hover:bg-emerald-600
        "
      >
        CREATE ACCOUNT <span className="text-base">→</span>
      </button>

      <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
        By registering, you agree to our{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          Terms
        </span>{" "}
        &{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          Privacy
        </span>
        .
      </p>
    </form>
  );
}
