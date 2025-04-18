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
      <Sun className="h-5 w-5 hidden dark:block"/>
      <Moon className="h-5 w-5 block dark:hidden"/>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}