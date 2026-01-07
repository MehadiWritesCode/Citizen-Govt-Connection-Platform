import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGCP",
  description: "Citizen Government Connection platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>{children}</div>
  );
}
