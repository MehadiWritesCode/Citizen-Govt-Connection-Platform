"use client";

import { useEffect,useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useChat } from "./chatContext";

export default function ComposerUI() {

  const {sendMessage,setLang,loading} = useChat();

  const pathname = usePathname();
  const taken = pathname.split("/")[1];
  const lang = taken === "en" ? "en" : "bn";

  useEffect(()=>{
    setLang(lang);
  },[lang,setLang])

  const [text, setText] = useState("");
  // const [files, setFiles] = useState<File[]>([]);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const SendData = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = text.trim();
    if (!data) {
      setText("");
      return;
    }

    // const formData = new FormData();
    // formData.append("message", data);
    // files.forEach((file)=>{
    // formData.append("files", file);
    // })

    setText("");
    await sendMessage(data);
  };

  return (
    <form
      onSubmit={SendData}
      className="fixed inset-x-0 bottom-0 border-t border-slate-200/70 bg-white/95 backdrop-blur
                 dark:border-[#1F2937] dark:bg-[#070B12] md:pl-72"
      aria-label="Message composer"
    >
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="flex items-end gap-2">
          <input
            // onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            name="file"
            // ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
          />

          <button
            type="button"
            className="h-11 w-11 rounded-xl border border-slate-200/70 bg-white/80
                       hover:bg-slate-100 dark:border-[#1F2937] dark:bg-[#303030]
                       dark:hover:bg-[#242424] flex items-center justify-center"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type your message…"
            className="flex-1 h-11 rounded-xl border border-slate-300 px-4 text-sm
                       focus:outline-none focus:ring-2
                       dark:border-slate-700 dark:bg-[#303030]"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-11 rounded-xl bg-slate-900 text-white
                       dark:bg-[#1D4ED8] dark:text-white dark:hover:bg-[#2563EB]
                       flex items-center justify-center cursor-pointer"
            aria-label="Send"
            title="Send"
          >
            <Send className="h-4 w-4 text-[#F8FAFC]" />
          </button>
        </div>

        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          This conversation is secured and monitored for service quality.
        </p>
      </div>
    </form>
  );
}
