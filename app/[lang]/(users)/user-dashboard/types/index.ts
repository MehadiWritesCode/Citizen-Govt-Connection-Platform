export type Status = "Pending" | "In Progress" | "Resolved";

export type Category =
  | "Road"
  | "Electricity"
  | "Water"
  | "Crime"
  | "Emergency"
  | "Other";

export type Report = {
  id: string;
  category: Category;
  location: string;
  details: string;
  createdAt: string; // ISO
  status: Status;
};

export type View =
  | "dashboard"
  | "new"
  | "reports"
  | "nearby"
  | "profile"
  | "settings"
  | "help";
