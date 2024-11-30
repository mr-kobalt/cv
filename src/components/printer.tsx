"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { PrinterIcon } from "lucide-react";

interface Props {
  className?: string,
}

export function Printer ({className=""}: Props) {
  // const { resolvedTheme, theme, setTheme } = useTheme();
  // var currentTheme: string = 'light'

  // window.addEventListener("beforeprint", () => {
  //   // currentTheme = resolvedTheme ?? 'light';
  //   setTheme('light')
  // });
  // window.addEventListener("afterprint", () => {
  //   setTheme(currentTheme);
  // });

  return (
    <Button
      className={"fixed transform-none bottom-4 right-4 size-16 rounded-full shadow-2xl print:hidden "+className}
      onClick={() => window.print()}
      title="Print cv button"
    >
      <PrinterIcon />
    </Button>
  );
};
