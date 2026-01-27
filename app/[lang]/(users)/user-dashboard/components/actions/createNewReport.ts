"use server";
type response = {
  ok:boolean,
  message:string
} | null
export const createNewReport = async (prevData:response,formData:FormData):Promise<response> =>{

  const category = String(formData.get("category"));
  const files = formData.get("file");
  const location = String(formData.get("location"));
  const content = String(formData.get("details"));

  if(!category || !location || !content) return {ok:false,message:"Inavlid information"};
  let name;
  if(files)  name ="file";
  console.log(name,category,location,content);

  return {ok:true,message:"Currectly work still"}
}
