"use client";

import { Home, MessageSquare, PlusCircle, Trash2, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../../../lib/supabase_postgresql/browser";
import { useRouter } from "next/navigation";
import { useChat } from "./chatContext";
import logo from "@/public/images/logo.png"
type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

type chatRow = {
  id: string;
  title: string | null;
  updated_at?: string | null;
};

export default function SidebarUI({ sidebarOpen, setSidebarOpen }: Props) {
  const [label, setLabel] = useState("Guest");
  const supabase = supabaseBrowser();
  const router = useRouter();

  const { activeChatId, setActiveChatId, setMessages } = useChat();

  const [chats, setChats] = useState<chatRow[]>([]); // to show chats list
  useEffect(() => {
    async function loadUserAndChats() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        setLabel("Guest");
        setChats([]);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      setLabel(profile?.name ?? "User");

      const { data: chatRows } = await supabase
        .from("chats")
        .select("id,title,updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setChats(chatRows ?? []);
    }

    loadUserAndChats();
  }, [activeChatId]);

  return (
    <aside
      className={[
        "fixed z-40 top-0 left-0 h-full w-72 border-r border-slate-200/70 bg-white/95 backdrop-blur",
        "dark:border-[#1F2937] dark:bg-[#0B1220]",
        "transition-transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/70 dark:border-[#1F2937]">
          <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="App Logo"
            width={60}
            height={60}
            className="object-contain p-0"
            priority
          />

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
            onClick={() => {
              setActiveChatId(null);
              setMessages([]); // chat clear
              setSidebarOpen(false);
            }}
            className="flex items-center gap-2 w-full rounded-xl
             bg-slate-900 text-white
             dark:bg-transparent dark:text-white
             px-3 py-2 text-sm font-semibold
             dark:hover:bg-[#242424]"
          >
            <PlusCircle className="h-4 w-4 text-slate-300" />
            New chat
          </button>
        </div>

        {/* Chat list */}
        <div className="px-2 pb-3 flex-1 overflow-auto">
          {chats.map((c) => {
            const isActive = c.id === activeChatId;

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
                <button
                  onClick={async () => {
                    setActiveChatId(c.id);

                    const { data: msgs, error } = await supabase
                      .from("messages")
                      .select("role,content,created_at")
                      .eq("chat_id", c.id)
                      .order("created_at", { ascending: true });

                    if (!error) {
                      setMessages(
                        (msgs ?? []).map((m) => ({
                          role: m.role as "user" | "assistant",
                          content: m.content ?? "",
                        })),
                      );
                    }

                    setSidebarOpen(false);
                  }}
                  className="flex-1 flex items-center gap-2 text-left min-w-0"
                >
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="truncate">{c.title}</span>
                </button>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await supabase.from("chats").delete().eq("id", c.id);
                    setChats((prev) => prev.filter((x) => x.id !== c.id));
                        if (activeChatId === c.id) {
                          setActiveChatId(null);
                          setMessages([]);
                        }
                  }}
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

        <div className="px-4 py-3 border-t border-slate-200/70 dark:border-[#1F2937]">
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
      dark:border-[#1F2937] dark:bg-transparent
      dark:text-slate-200 dark:hover:bg-gray-500 "
            >
              <User className="h-4 w-4 opacity-70" />
              Login
            </button>
          ) : (
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-[#1F2937] dark:bg-transparent dark:hover:bg-[#242424]">
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
          <button
           onClick={()=> router.push('/')}
          className="w-full mb-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-[#1F2937] dark:bg-transparent dark:hover:bg-[#242424]">
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
