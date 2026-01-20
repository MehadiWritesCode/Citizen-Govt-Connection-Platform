"use client";

import { RefObject, useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  href: string;
};


interface ServicesMenuProps {
  explorer:string,
  design:string
}
// Simple Services links (no sub-actions)
const menu: MenuItem[] = [
  { id: "s1", label: "Report an Issue", href: "/services/1" },
  { id: "s2", label: "Emergency Services", href: "/services/2" },
  { id: "s3", label: "Transparency Dashboard", href: "/services/3" },
  { id: "s4", label: "AI Assistant", href: "/services/4" },
  { id: "s5", label: "Find Safe Route", href: "/services/5" },
];

function useOutsideClose(
  open: boolean,
  refs: Array<RefObject<HTMLElement | null>>,
  onClose: () => void,
) {
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;

      for (const r of refs) {
        if (r.current && r.current.contains(t)) return;
      }
      onClose();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, refs, onClose]);
}

export default function ServicesMenu({ explorer,design }: ServicesMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useOutsideClose(open, [btnRef, panelRef], () => setOpen(false));

  const items = useMemo(() => menu, []);

  const closeAll = () => {
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`${design}`}
      >
        {explorer}
        <ChevronDown className="h-4 w-4 opacity-90" />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id={panelId}
        role="menu"
        aria-label="Services"
        className={
          " rounded-md absolute left-0 z-50 mt-2 w-64 overflow-hidden  border border-slate-200 bg-white shadow-xl " +
          "dark:border-white/10 dark:bg-[#1f1f1f] " +
          (open ? "block" : "hidden")
        }
      >
        <ul>
          {items.map((it) => (
            <li
              key={it.id}
              role="none"
              className="border-b border-slate-100 last:border-b-0 dark:border-white/10"
            >
              <a
                role="menuitem"
                href={it.href}
                onClick={() => closeAll()}
                className="
                  flex items-center justify-between px-4 py-2 text-sm text-slate-700
                  hover:bg-slate-50 hover:text-slate-900
                  dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white
                "
              >
                <span>{it.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
