import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../componentsUi/client/theme-provider";
export const metadata: Metadata = {
  title: "CGCP",
  description: "Citizen Government Connection platform",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
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

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}
