"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

// ! change view for current locations to destnations

function ChangeView({
  current,
  destination,
}: {
  current: [number, number];
  destination?: [number, number] |null;
}) {
  const map = useMap();

  useEffect(() => {
       if (!destination) {
      map.setView(current, 16);
      return;
     }
        const bounds = L.latLngBounds([current, destination]);
         map.fitBounds(bounds, { padding: [40, 40] });
    },[current,destination,map])
   return null;
}

export default function LeafletMapUi({
  current,
  destination,
}: {
  current: [number, number];
  destination?: [number, number] | null;
}) {
  const customIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
    [],
  );

const sourceIcon = useMemo(
  () =>
    L.divIcon({
      className: "",
      html: `
        <div style="
          width:30px;
          height:30px;
          border-radius:9999px;
          background:#2563eb;
          border:3px solid white;
          box-shadow:0 6px 18px rgba(0,0,0,0.25);
          position:relative;
        ">
          <div style="
            width:0;
            height:0;
            border-left:7px solid transparent;
            border-right:7px solid transparent;
            border-bottom:12px solid white;
            position:absolute;
            left:50%;
            top:5px;
            transform:translateX(-50%);
          "></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    }),
  []
);


  return (
    <MapContainer
      center={current}
      zoom={16}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
      />

      {/* dynamic location */}
      <ChangeView current={current} destination={destination} />

      <Marker position={current} icon={sourceIcon}>
        <Popup>
          <div className="p-1">
            <p className="font-bold text-slate-900">source</p>
          </div>
        </Popup>
      </Marker>

      {destination && (
        <Marker position={destination} icon={customIcon}>
          <Popup>
            <div className="p-1">
              <p className="text-xs text-slate-600">destination</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
