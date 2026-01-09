import AuthNavbar from "./components/AuthNavbar";
import { getDictionary } from "../../../../lib/dictionaries/get-dictionary";
import ToogleLoginRegister from "./components/ToogleLoginRegister";

import { Dictionary} from "../../../../dict_interface/dict_interface";
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

 const dict = (await getDictionary(lang as "en" | "bn")) as unknown as Dictionary;

  return (
    <div className="min-h-screen bg-[#f6fbf9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AuthNavbar dict={dict} />

      {/* Main */}
      <main className="relative">
        {/* dotted background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* dotted background darker on dark mode */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* center glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10),transparent_55%)]" />

        <div className="relative mx-auto flex max-w-7xl justify-center px-4 py-12 md:px-8">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                <span className="text-2xl text-emerald-700 dark:text-emerald-300">
                  🏛️
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {dict.loginRegUi.title}
              </h1>
              <p className="mt-1 text-xs tracking-wide text-slate-500 dark:text-slate-400">
                {dict.loginRegUi.subtitle}
              </p>
            </div>

            {/* Handle toogel between login and register */}
            <ToogleLoginRegister dict={dict.auth} />


            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {dict.loginRegUi.help} <span className="font-semibold">{dict.loginRegUi.num1}</span> or{" "}
              <span className="font-semibold">{dict.loginRegUi.num2}</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 text-xs text-slate-600 dark:text-slate-400 md:grid-cols-3 md:px-8">
          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              {dict.loginRegUi.support}
            </p>
            <p>
              {dict.loginRegUi.supportText}
            </p>
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              {dict.loginRegUi.links}
            </p>
            <ul className="space-y-1">
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                {dict.loginRegUi.link1}
              </li>
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                {dict.loginRegUi.link2}
              </li>
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                {dict.loginRegUi.link3}
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              {dict.loginRegUi.contactUs}
            </p>
            <p>{dict.loginRegUi.helpline}</p>
            <a href="mailto:mehadi.hasan.engr@gmail.com" className="hover:text-emerald-600 underline">Email: mehadi.hasan.engr@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}







