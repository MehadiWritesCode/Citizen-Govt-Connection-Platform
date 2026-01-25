"use client";
import { Menu } from "lucide-react";
import { ModeToggleBtn } from "../../../componentsUi/client/ThemeToogleBtn";

type Props = {
  onMenu: () => void;
};

export default function TopbarUI({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-[#1F2937] dark:bg-[#070B12]">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <button
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            onClick={onMenu}
            aria-label="Open sidebar"
            title="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <ModeToggleBtn />

      </div>
    </header>
  );
}
