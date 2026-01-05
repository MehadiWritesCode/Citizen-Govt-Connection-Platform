import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/client/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
