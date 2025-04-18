import { IBM_Plex_Mono, IBM_Plex_Sans, Martian_Mono } from "next/font/google";

export const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: '--font-plex',
});
export const plex_mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: '--font-plex-mono',
});
export const martian_mono = Martian_Mono({
  subsets: ["latin", "cyrillic"],
  variable: '--font-martian-mono',
});