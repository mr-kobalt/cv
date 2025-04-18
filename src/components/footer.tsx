import { GitHubIcon } from "./icons/GitHubIcon";
import { ToggleTheme } from "./theme-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Props {
  className?: string;
}

export function Footer({ className=""}: Props) {
  return (
    <footer className={"mx-auto".concat(" ", className)}>
      <Separator
        orientation="horizontal"
        className="mt-5 mx-auto w-full data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      />
      <div className="flex items-center justify-between print:hidden mx-auto w-full">
        {/* <div className="group flex-1 flex items-center justify-start gap-1 my-2 text-xs text-center font-mono text-muted-foreground hover:text-foreground transition-all max-sm:text-2xs"> */}
        <div className="group gap-1 my-2 text-xs text-left font-mono text-muted-foreground hover:text-foreground focus:text-foreground transition-all max-sm:text-3xs max-md:text-2xs">
          Based on&nbsp;
          <a
            // className="gap-1 inline-flex items-baseline rounded-sm ring-offset-background ring-offset-2 transition-colors"
            className="gap-1 inline-flex items-baseline transition-colors"
            href="https://github.com/BartoszJarocki/cv"
            target="_blank"
          >
            <GitHubIcon className="self-center size-4 max-sm:size-3"/>
            Bartosz Jarocki&apos;s
          </a>
          &nbsp;excellent work
        </div>
        <ToggleTheme className="flex shrink-0 rounded-full text-muted-foreground bg-background focus-visible:ring-offset-0 hover:text-foreground focus:text-foreground hover:bg-transparent"/>
      </div>
    </footer>
  )
}