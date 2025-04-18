import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetrikaScript } from "@/components/metrika";
import { plex, plex_mono, martian_mono } from "./fonts";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Ковальчук Василий | Резюме",
  description: "Навыки, опыт работы и проекты",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ymetrika = Number(process.env.YMETRIKA);

  return (
    <html lang="ru-RU" className={`${plex.variable} ${plex_mono.variable} ${martian_mono.variable} font-extralight`} suppressHydrationWarning>
      <body className="overflow-x-clip">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <MetrikaScript id={ymetrika} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
