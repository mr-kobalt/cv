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
      <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:block"/>
      <Moon className="h-[1.2rem] w-[1.2rem] block dark:hidden"/>
    </Button>
  )
}