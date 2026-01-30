"use server";

import exifr from "exifr";
import divisions from "@/data/divisions.json";
import districts from "@/data/districts.json";
import upazilas from "@/data/upazilas.json";
import unions from "@/data/unions.json";
import { supabaseServer } from "../../../../../../lib/supabase_postgresql/server";
import { redirect } from "next/navigation";
import { after } from "next/server";

type response = {
  ok:boolean,
  message:string
} | null

export const createNewReport = async (prevData:response,formData:FormData):Promise<response> =>{

  const category = String(formData.get("category"));
  const fileValue = formData.get("file");
  const file = fileValue instanceof File ? fileValue : null; // * either file or null
  let eventLocation = String(formData.get("location"));
  const content = String(formData.get("details"));

  if(!category || !eventLocation || !content) return {ok:false,message:"Inavlid information"};

  const divisionId = String(formData.get("division"));
  const districtId = String(formData.get("district"));
  const upazilaId  = String(formData.get("upazila"));
  const unionId    = String(formData.get("union"));

  //! Find Each location by id
  if(!divisionId || !districtId || !upazilaId || !unionId) return {ok:false,message:"Invalid Location Select"};
  const division = divisions.find( d => d.id === divisionId)?.name;
  const district = districts.find( d => d.id === districtId)?.name;
  const upazila = upazilas.find ( u=> u.id === upazilaId)?.name;
  const union = unions.find(u => u.id === unionId)?.name;

  if(!division || !district || !upazila || !union) return {ok:false,message:"Location Id not found"};


  // ! Lat lon by LocationIQ
  const address = `${union},${upazila},${district},${division},Bangladesh`;
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if(!apiKey) return {ok:false,message:"LOCATIONIQ api key not found"};

  const response = await fetch (`https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`)
  const coordinates = await response.json();

  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return { ok: false, message: "Address not found" };
  }
   const lat = coordinates[0]?.lat;
   const lon = coordinates[0]?.lon;

  if(!lat || !lon) return {ok:false,message:"Lattitude/Logitude mot found"}

 // ! Check EXIF data
 let imgLat : number | undefined,imgLon : number | undefined;
  if(file && file instanceof File && file.size > 0){
    try{
     const buffer = Buffer.from(await file.arrayBuffer())
     const gps = await exifr.gps(buffer);

     if(gps && gps.latitude && gps.longitude){
       imgLat = gps.latitude;
       imgLon = gps.longitude;
     }
    }catch(error){
      console.log(error);
      return {ok:false,message:"Error fetching EXIF"}
    }


    // ! if imgae exif data get then take locatoion and add new eventLocation
    if(imgLat !== null && imgLon !== null){
    const imgLocation = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${imgLat}&lon=${imgLon}&format=json`);
    const newLocation = await imgLocation.json();
     if (newLocation?.display_name) {
          eventLocation = newLocation.display_name;
        }
    }
  }

  // ! if image have then upload in supabase storage
  const supabase =  supabaseServer();
  let media_url = "";
  if(file && file.size > 0 ) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `reports/${fileName}`;

    const {error:uploadError} = await supabase.storage.from("reports").upload(filePath,file);
    if(!uploadError){
      const {data:{publicUrl}} = supabase.storage
      .from("reports")
      .getPublicUrl(filePath);
      media_url = publicUrl;
    }
  }

  // ! store in database
  const {data:{user}} = await supabase.auth.getUser();
  if(!user) redirect('/auth');


  const {data:insertedData,error:insertedError} = await supabase
  .from("reports")
  .insert([{
    user_id:user.id,
    category:category,
    location:eventLocation,
    details:content,
    lat:parseFloat(lat),
    lon:parseFloat(lon),
    media_url:media_url,
    media_type:file?.type,
    status:"pending",
    division:division,
    district:district,
    upazila:upazila,
    union:union
  }])
  .select("id")
  .single();

  if(insertedError){
    console.error(insertedError.message);
    return {ok:false,message:"Could not saved report"}
  }


  // ! AI verified
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
after(() => {
  fetch(`${baseUrl}/api/govt-ai/verify-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category:category,
      eventLocation:eventLocation,
      division:division,
      district:district,
      upazila:upazila,
      union:union,
      media_url: media_url,
      details: content,
      reportId: insertedData.id,
    })
  })
  .catch(err => console.error("AI verifying trigger Error", err));
})

  return {ok:true,message:"Report Uploaded ! AI is verifying your report"}
}
