"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Star, UserPlus, MessageSquare, Bell, CheckCheck } from "lucide-react";

interface Notification {
  id: number;
  actor: string;
  action: string;
  target?: string;
  time: string;
  unread: boolean;
  kind: "star" | "follow" | "comment" | "system";
  meta?: string;
}

interface Props {
  setNotificationDropdown: Dispatch<SetStateAction<boolean>>;
}

function Icon({ kind }: { kind: Notification["kind"] }) {
  const cls = "h-4 w-4 text-slate-600 dark:text-slate-300";
  if (kind === "star") return <Star className={cls} />;
  if (kind === "follow") return <UserPlus className={cls} />;
  if (kind === "comment") return <MessageSquare className={cls} />;
  return <Bell className={cls} />;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function NotificationDropdown({ setNotificationDropdown }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const [items, setItems] = useState<Notification[]>([
    {
      id: 1,
      actor: "Invoice",
      action: "was paid",
      target: "#92DD97C4",
      time: "15h",
      unread: true,
      kind: "system",
      meta: "Receipt has been generated.",
    },
    {
      id: 2,
      actor: "Team note",
      action: "added in ticket",
      target: "#PL2REN",
      time: "18h",
      unread: false,
      kind: "comment",
    },
    {
      id: 3,
      actor: "Message received",
      action: "Custom pricing inquiry",
      time: "Nov 25",
      unread: false,
      kind: "comment",
      meta: "Please review and respond.",
    },
    {
      id: 4,
      actor: "Reply sent",
      action: "in ticket",
      target: "#PL2REN",
      time: "Nov 20",
      unread: false,
      kind: "system",
    },
  ]);

  const unreadCount = useMemo(() => items.filter((i) => i.unread).length, [items]);

  const markAllRead = () => setItems((p) => p.map((i) => ({ ...i, unread: false })));

  const openItem = (id: number) => {
    setActiveId(id);
    setItems((p) => p.map((i) => (i.id === id ? { ...i, unread: false } : i)));
  };

  return (
    <>
      {/* overlay */}
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-transparent"
        onClick={() => setNotificationDropdown(false)}
        aria-label="Close notifications"
      />

      {/* dropdown (POSITION UNCHANGED) */}
      <div className="fixed z-50 left-3 right-3 top-37 sm:top-31 sm:left-auto sm:right-14 sm:w-[380px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
          {/* header (compact) */}
          <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Notifications
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                {unreadCount ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={markAllRead}
              className="
                inline-flex items-center gap-1.5 rounded-xl
                border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800
                hover:bg-slate-50 active:bg-slate-100
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30
                dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
                dark:hover:bg-slate-900 dark:active:bg-slate-800
              "
            >
              <CheckCheck className="h-4 w-4" />
              Mark read
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-900" />

          {/* list (compact rows) */}
          <div className="max-h-[320px] overflow-y-auto">
            {items.map((n) => {
              const active = activeId === n.id;

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => openItem(n.id)}
                  onMouseEnter={() => setActiveId(n.id)}
                  className={cx(
                    "relative w-full text-left px-4 py-2.5 transition",
                    "hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-800",
                    active && "bg-slate-50 dark:bg-slate-900/60"
                  )}
                >
                  {/* unread accent (thin + clean) */}
                  <span
                    className={cx(
                      "absolute left-0 top-0 h-full w-0.5",
                      n.unread ? "bg-emerald-600/80 dark:bg-emerald-400/70" : "bg-transparent"
                    )}
                  />

                  <div className="flex items-start gap-2.5">
                    {/* icon bubble (smaller) */}
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <Icon kind={n.kind} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-snug text-slate-900 dark:text-slate-100">
                          <span className={cx("font-semibold", n.unread && "text-slate-950 dark:text-white")}>
                            {n.actor}
                          </span>{" "}
                          <span className="text-slate-700 dark:text-slate-300">{n.action}</span>{" "}
                          {n.target ? (
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {n.target}
                            </span>
                          ) : null}
                        </p>

                        <div className="flex items-center gap-2">
                          {n.unread ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                          ) : null}
                          <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                            {n.time}
                          </span>
                        </div>
                      </div>

                      {n.meta ? (
                        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {n.meta}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-900" />

          {/* footer (compact) */}
          <div className="p-3">
            <button
              type="button"
              className="
                w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white
                hover:opacity-95 active:opacity-90
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40
              "
              onClick={() => setNotificationDropdown(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
