import type { View } from "../types";

export function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string, locale = "en-GB") {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return iso;
  }
}


export function viewTitle(v: View) {
  switch (v) {
    case "dashboard":
      return "Dashboard";
    case "new":
      return "New Report";
    case "reports":
      return "My Reports";
    case "nearby":
      return "Nearby Services";
    case "profile":
      return "Profile";
    case "settings":
      return "Settings";
    case "help":
      return "Help";
    default:
      return "";
  }
}
