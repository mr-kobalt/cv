import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { MetrikaScript } from "@/components/metrika";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { Printer } from "@/components/printer";

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
    <html lang="ru-RU" className={inter.className}>
      <body className="overflow-x-clip">
        <div className="transform-none lg:scale-125 origin-top">
          {children}
          {Number(process.env.YMETRIKA)}
        </div>
        <Printer/>
        <MetrikaScript id={ymetrika} />
      </body>
      <Analytics />
    </html>
  );
}
