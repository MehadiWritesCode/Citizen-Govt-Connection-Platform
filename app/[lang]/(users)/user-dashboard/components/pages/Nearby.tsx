"use client";

import { Hospital, ShieldCheck, Phone } from "lucide-react";

import PageTitle from "../ui/PageTitle";
import Service from "../ui/Service";

export default function Nearby() {
  return (
    <div className="space-y-4">
      <PageTitle
        title="Nearby services"
        subtitle="Emergency and important services (demo)."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Service
          icon={<Hospital className="h-5 w-5" />}
          name="Jessore General Hospital"
          contact="999"
        />
        <Service
          icon={<ShieldCheck className="h-5 w-5" />}
          name="Kotwali Police Station"
          contact="999"
        />
        <Service
          icon={<Phone className="h-5 w-5" />}
          name="Fire Service"
          contact="999"
        />
        <Service
          icon={<Phone className="h-5 w-5" />}
          name="Ambulance"
          contact="999"
        />
      </div>
    </div>
  );
}
