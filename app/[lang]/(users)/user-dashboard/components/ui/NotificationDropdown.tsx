"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Star, UserPlus, MessageSquare, Bell } from "lucide-react";

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
  const base =
    "h-4 w-4 text-slate-400 dark:text-slate-500";

  if (kind === "star") return <Star className={base} />;
  if (kind === "follow") return <UserPlus className={base} />;
  if (kind === "comment") return <MessageSquare className={base} />;
  return <Bell className={base} />;
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
      <div className="fixed inset-0 z-40" onClick={() => setNotificationDropdown(false)} />

      {/* container: desktop absolute, mobile fixed */}
      <div className="z-50 fixed left-3 right-3 top-37 md:top-auto md:left-auto md:right-27 md:fixed md:inset-auto md:absolute md:mt-2 md:w-[340px]">
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-950">
          {/* header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
                  {unreadCount} new
                </span>
              )}
            </div>

          </div>

          {/* list */}
          <div className="max-h-[260px] overflow-y-auto">
            {items.map((n) => {
              const active = activeId === n.id;

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => openItem(n.id)}
                  onMouseEnter={() => setActiveId(n.id)}
                  className={[
                    "w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800/60",
                    "hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-800",
                    active ? "bg-slate-50 dark:bg-slate-900/50" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Icon kind={n.kind} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-normal text-slate-800 dark:text-slate-200 leading-snug">
                          <span className="text-slate-900 dark:text-slate-100 font-medium">
                            {n.actor}
                          </span>{" "}
                          {n.action}{" "}
                          {n.target ? (
                            <span className="text-blue-700 dark:text-blue-400">
                              {n.target}
                            </span>
                          ) : null}
                        </p>

                        <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                          {n.time}
                        </span>
                      </div>

                      {n.meta ? (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 italic">
                          “{n.meta}”
                        </p>
                      ) : null}

                      {n.unread ? (
                        <span className="mt-2 inline-flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          New
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* footer (green CTA like screenshot) */}
          <button
            className="
              w-full bg-emerald-600 px-4 py-3 text-center text-sm font-medium text-white
              hover:bg-emerald-700 active:bg-emerald-800
            "
            onClick={() => {
              // navigate to notifications page
              setNotificationDropdown(false);
            }}
          >
            View all activity
          </button>
        </div>
      </div>
    </>
  );
}
