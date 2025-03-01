import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetrikaScript } from "@/components/metrika";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { Printer } from "@/components/printer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ymetrika = Number(process.env.YMETRIKA);

  return (
    <html lang="ru-RU" className={inter.className} suppressHydrationWarning>
      <body className="overflow-x-clip">
        <ThemeProvider
          // attribute="data-mode"
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="transform-none lg:scale-125 origin-top">
            {children}
          </div>
          <Printer />
        </ThemeProvider>
        <MetrikaScript id={ymetrika} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
