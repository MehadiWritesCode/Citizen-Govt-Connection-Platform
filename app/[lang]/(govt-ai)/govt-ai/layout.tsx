import type { Metadata } from "next";
import { ChatProvider } from "../components/chatContext";

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
        <ChatProvider initialLang="bn">
         <div>{children}</div>
        </ChatProvider>
  );
}
