"use client";

import { Home, MessageSquare, PlusCircle, Trash2, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../../../lib/supabase_postgresql/browser";
import { useRouter } from "next/navigation";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

const chats = [
  { id: "1", title: "NID issue" },
  { id: "2", title: "Passport help" },
];

export default function SidebarUI({ sidebarOpen, setSidebarOpen }: Props) {
  const [label, setLabel] = useState("Guest");
  const supabase = supabaseBrowser();
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      // 1️⃣ get session
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setLabel("Guest");
        return;
      }

      // 2️⃣ get profile name
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", data.session.user.id)
        .single();

      setLabel(profile?.name ?? "User");
    }

    loadUser();
  }, []);
  return (
    <aside
      className={[
        "fixed z-40 top-0 left-0 h-full w-72 border-r border-slate-200/70 bg-white/95 backdrop-blur",
        "dark:border-slate-800 dark:bg-[#181818]",
        "transition-transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-sm overflow-hidden bg-white/80 dark:bg-transparent
                                        flex items-center justify-center ring-1 ring-slate-200 dark:ring-slate-800"
            >
              <Image
                src="/images/logo.png"
                alt="App Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>

            <span className="text-sm font-semibold">CGCP AI</span>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New chat */}
        <div className="p-3">
<button
  className="flex items-center gap-2 w-full rounded-xl
             bg-slate-900 text-white
             dark:bg-transparent dark:text-white
             px-3 py-2 text-sm font-semibold
             dark:hover:bg-[#242424]"
>
  <PlusCircle className="h-4 w-4 text-slate-300" />
  New chat
</button>
          {/* <button className="text-left w-full rounded-xl bg-slate-900 text-white dark:bg-transparent dark:text-white px-3 py-2 text-sm font-semibold dark:hover:bg-[#242424]">
            + New chat
          </button> */}
        </div>

        {/* Chat list */}
        <div className="px-2 pb-3 flex-1 overflow-auto">
          {chats.map((c, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={c.id}
                className={[
                  "group w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm",
                  isActive
                    ? "bg-slate-100 dark:bg-[#242424]"
                    : "hover:bg-slate-100 dark:hover:bg-[#242424]",
                ].join(" ")}
              >
                <button className="flex-1 flex items-center gap-2 text-left min-w-0">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="truncate">{c.title}</span>
                </button>

                <button
                  className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-red-500"
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom */}

        <div className="px-4 py-3 border-t border-slate-200/70 dark:border-slate-800">
          {/* User info (UI only) */}

          {label === "Guest" ? (
            <button
              onClick={() => router.push("/auth")}
              className="
      mb-3 w-full flex items-center justify-center gap-2
      rounded-xl border border-slate-200/70
      bg-white/80 px-3 py-2 text-sm font-semibold
      text-slate-700
      hover:bg-slate-100 hover:text-slate-900
      transition
      dark:border-slate-800 dark:bg-transparent
      dark:text-slate-200 dark:hover:bg-gray-500
    "
            >
              <User className="h-4 w-4 opacity-70" />
              Login
            </button>
          ) : (
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-slate-800 dark:bg-transparent dark:hover:bg-[#242424]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-transparent dark:text-slate-300">
                <User className="h-4 w-4" />
              </span>

              <div className="leading-tight">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Signed in as
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {label}
                </p>
              </div>
            </div>
          )}

          {/* Home button */}
          <button className="w-full mb-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:bg-transparent dark:hover:bg-[#242424]">
            <Home className="h-4 w-4" />
            Home
          </button>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Don’t share OTP/passwords.
          </p>
        </div>
      </div>
    </aside>
  );
}
