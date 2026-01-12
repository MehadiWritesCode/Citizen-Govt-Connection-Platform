import { useFormStatus } from "react-dom"
export default function AuthButton({Btnlabel}:{Btnlabel:string}){

  const {pending} = useFormStatus();

return (
    <button
      type="submit"
      disabled={pending}
      className={`
        mt-1 inline-flex w-full items-center justify-center gap-2
        rounded-xl px-4 py-3 text-sm font-semibold
        transition-all duration-200
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40
        ${
          pending
            ? "bg-slate-300 text-slate-600 cursor-not-allowed dark:bg-slate-800 dark:text-slate-300"
            : "bg-slate-900 text-white hover:opacity-95 dark:bg-slate-100 dark:text-slate-900"
        }
      `}
    >
      {pending ? (
        <>
          <span
            className="
              h-4 w-4 animate-spin rounded-full
              border-2 border-slate-600/30 border-t-slate-700
              dark:border-slate-200/30 dark:border-t-slate-50
            "
          />
          <span>Creating...</span>
        </>
      ) : (
        <>
          <span>{Btnlabel}</span>
          <span className="text-base leading-none">→</span>
        </>
      )}
    </button>
  );

}
