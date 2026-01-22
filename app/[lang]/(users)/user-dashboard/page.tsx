import { redirect } from "next/navigation";
import { supabaseServer } from "../../../../lib/supabase_postgresql/server";
import CitizenPortalMVP from "./components/pages/CitizenPortalClient";


export const dynamic = "force-dynamic";
export default async function Page() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userName = "Guest";
  if (!user) redirect("/auth");
  if (user) {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (profile && !error) userName = profile.name;
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const {data:nearby ,error} = await supabase
  .from("nearby")
  .select("service_name,service_type,map_link")
  .eq("user_id",user.id)

 const  nearbyData = nearby || [];

  return <CitizenPortalMVP userName={userName} nearbyLocations={nearbyData} />;
}
