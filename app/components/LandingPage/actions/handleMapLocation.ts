"use server";
type response = {
  ok: boolean;
  message: string;
  current?: [number, number];
  destination?: [number, number];
} | null;

// ! geocode claculate --------
async function geoCode(currentLocation: string, destination: string) {
  const key = process.env.LOCATIONIQ_API_KEY;
  if (!key) return { ok: false, message: "LocationIQ api key not found !" };

  async function geoCodeCalculate(
    place: string,
  ): Promise<[number, number] | null> {
    const url = `https://us1.locationiq.com/v1/search?key=${key}&q=${encodeURIComponent(
      place,
    )}&format=json&limit=1&countrycodes=bd`;

    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const lat = Number(data[0].lat);
    const lon = Number(data[0].lon);

    if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
    return [lat, lon];
  }

  const current = await geoCodeCalculate(currentLocation);
  const dest = await geoCodeCalculate(destination);

  if (!current || !dest) return { ok: false, message: "No Location(coordinates) found" };
  return { ok: true, current, dest };
}


//!-----------handle map location-----------
export const handleMapLocation = async (
  prevAction: response,
  formDta: FormData,
): Promise<response> => {
  const initialCurrentLocation = formDta.get("currentLocation");
  const initialDestination = formDta.get("destination");

  const currentLocation = initialCurrentLocation
    ? String(initialCurrentLocation).trim()
    : "";
  const destination = initialDestination
    ? String(initialDestination).trim()
    : "";

  if (!currentLocation || !destination) {
    return { ok: false, message: "Please provide Location" };
  }

  try {
    const geocode = await geoCode(currentLocation, destination);
    if (!geocode.ok) return { ok: false, message: "No geoCode(Location) get" };

    return {
      ok: true,
      message: "Route found successfully !",
      current: geocode.current,
      destination: geocode.dest,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong when fteching lcoations",
    };
  }
};
