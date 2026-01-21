"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { supabaseBrowser } from "../../../../../../lib/supabase_postgresql/browser";
import { useToasts } from "../../hooks/useToasts";
import { useRouter } from "next/navigation";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function LogoutModal({ setOpen }: Props) {
  const supabase = supabaseBrowser();
  const { push } = useToasts();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
        push({ title: "Error", message: "Logout failed!" });
      } else {
        setOpen(false);
        push({ title: "Logged Out", message: "Logout Successful" });
        router.push("/");
      }
    } catch (error) {
      console.error("unexpected error when logout : ", error);
    }
  };

  // ESC close (UX only)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      aria-describedby="logout-desc"
    >
      {/* Backdrop (theme match) */}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        className="
          relative w-full max-w-md overflow-hidden
          rounded-2xl bg-white
          shadow-2xl ring-1 ring-slate-200
          animate-in fade-in zoom-in-95 duration-150
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header soft gradient */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-slate-50 to-white">
          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="
              absolute right-4 top-4 rounded-xl p-2 text-slate-400
              hover:bg-slate-100 hover:text-slate-700
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
            "
          >
            ✕
          </button>

          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-700"
            >
              <path
                d="M10 17L15 12L10 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Title + desc */}
          <div className="mt-4 text-center">
            <h2
              id="logout-title"
              className="text-lg font-semibold text-slate-900 tracking-tight"
            >
              Sign out?
            </h2>
            <p
              id="logout-desc"
              className="mt-2 text-sm leading-relaxed text-slate-500"
            >
              You’ll be signed out of your account. You can sign in again anytime
              to access your dashboard.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <div className="mt-2 grid gap-3">
            {/* Primary (theme matched - dark slate like dashboard buttons) */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full rounded-2xl bg-slate-900 px-4 py-3
                text-sm font-semibold text-white
                shadow-sm hover:bg-slate-800
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
                active:scale-[0.99] transition
              "
            >
              Sign out
            </button>

            {/* Secondary */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                w-full rounded-2xl bg-white px-4 py-3
                text-sm font-semibold text-slate-700
                ring-1 ring-slate-200
                hover:bg-slate-50
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
                active:scale-[0.99] transition
              "
            >
              Cancel
            </button>
          </div>

          {/* Small helper text */}
          <p className="mt-4 text-center text-xs text-slate-400">
            Tip: Press <span className="font-medium text-slate-500">ESC</span>{" "}
            to close
          </p>
        </div>
      </div>
    </div>
  );
}

