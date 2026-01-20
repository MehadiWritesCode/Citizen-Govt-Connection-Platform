import LandingPage from "../components/LandingPage/LandingPage";
import { Dictionary } from "../../dict_interface/dict_interface";
import { getDictionary } from "../../lib/dictionaries/get-dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // redirect(`/${lang}/auth`)
  const dict = (await getDictionary(
    lang as "en" | "bn",
  )) as unknown as Dictionary;
  return (
    <>
      <LandingPage lang={lang} dict={dict} />
    </>
  );
}
