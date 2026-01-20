"use client";
import { useState } from "react";

export type Toast = { id: string; title: string; message?: string };

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  function push(t: Omit<Toast, "id">) {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [{ id, ...t }, ...prev].slice(0, 2));
    window.setTimeout(
      () => setToasts((prev) => prev.filter((x) => x.id !== id)),
      2200
    );
  }
  return {
    toasts,
    push,
    remove: (id: string) => setToasts((p) => p.filter((x) => x.id !== id)),
  };
}
