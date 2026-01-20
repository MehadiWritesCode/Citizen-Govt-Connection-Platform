"use cleint"

import { Dispatch, SetStateAction } from "react";
import { supabaseBrowser } from "../../../../../../lib/supabase_postgresql/browser";
import { useToasts } from "../../hooks/useToasts";
import { useRouter } from "next/navigation";

interface Props{
  setOpen:Dispatch<SetStateAction<boolean>>
}
export function LogoutModal({setOpen}:Props) {
  const supabase = supabaseBrowser();
  const {push} = useToasts();
  const router = useRouter();

  const handleLogout = async() =>{

    try{
      const {error} = await supabase.auth.signOut();
      if(error){
        console.error("Error logging out:", error.message);
        push({ title: "Error", message: "Logout failed!" });
      }else{
        setOpen(false)
        push({title:"Logged Out",message:"Logout Successfull"})
        router.push('/');
      }
    }catch(error){
       console.error("unexpected error when logout : ",error)
    }
  }
  return (
    <div
      className={`flex fixed inset-0 z-50  items-center justify-center`}

      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      aria-describedby="logout-desc"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={()=>setOpen(false)}
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-900/25"
      />

      {/* Dialog (matches the latest screenshot style) */}
      <div className="relative mx-4 w-full max-w-xs rounded-xl bg-white p-4 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={()=> setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <span aria-hidden>✕</span>
        </button>

        {/* Icon */}
        <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
          <svg

            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-900"
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

        {/* Title + copy */}
        <div className="mt-3 text-center">
          <h2 id="logout-title" className="text-base font-semibold text-slate-900">
            Sign out of account
          </h2>
          <p id="logout-desc" className="mt-2 text-xs leading-snug text-slate-500">
            Are you sure you want to log out? You will need to sign in again to access your dashboard.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            signOut
            {/* {loading ? "Signing out…" : "Sign Out"} */}
          </button>

          <button
            type="button"
            onClick={()=>setOpen(false)}
            className="mx-auto mt-4 block text-xs font-medium text-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
