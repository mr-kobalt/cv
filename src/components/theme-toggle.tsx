"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

interface Props {
  className?: string,
}

export function ToggleTheme({className=""}: Props) {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    if (theme === 'light') { setTheme('dark'); }
    else { setTheme('light') }
  }

  return (
    <Button className={className} variant={"ghost"} size={"icon"} onClick={() => handleClick()}>
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
    </Button>
  )
}