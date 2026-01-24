"use server"
 type response ={
   ok:boolean,
   message:string
 }|null
export const handleMapLocation = async (prevAction:response,formDta:FormData):Promise<response>=>{

const initialCurrentLocation = formDta.get("currentLocation");
const initialDestination = formDta.get("destination");

const currentLocation = initialCurrentLocation ? String(initialCurrentLocation).trim() : "";
const destination = initialDestination ? String(initialDestination).trim() : "";


if (!currentLocation || !destination) {
  return { ok: false, message: "Please provide Location"};
}
  return {ok:true,message:"hello world"}
}
