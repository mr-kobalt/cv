"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
  CardContent,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "./ui/collapsible";
import Markdown from 'react-markdown';


interface Props {
  company: string;
  link: string;
  badges: readonly string[];
  title: string;
  logo?: any;
  start: string;
  end: string;
  description: string;
  responsibility: string;
  achievements?: readonly string[];
  quit?: readonly string[];
}

export function WorkCard({
  company,
  link,
  badges,
  title,
  logo,
  start,
  end,
  description,
  responsibility,
  achievements,
  quit
 }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild>
        <Card key={company} className="group bg-background flex flex-col overflow-hidden px-3 py-1">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-baseline justify-center gap-x-1 font-semibold leading-none">
                <a
                  className="hover:underline"
                  target="_blank"
                  href={link}
                  onClick={(event) => event.stopPropagation()}>
                  {company}
                </a>

                <span className="inline-flex gap-x-1">
                  {badges.map((badge) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs print:text-3xs print:leading-tight print:px-1 print:py-0.5"
                      key={badge}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              </h3>
              <div className="text-sm tabular-nums text-gray-500">
                {start}&nbsp;- {end ?? "по настоящее время"}
              </div>
            </div>
            <h4 className="font-mono group-hover:underline max-md:underline underline-offset-3 decoration-dashed text-sm leading-none print:no-underline print:text-xs">
              {title}
            </h4>
          </CardHeader>
          <CardContent className="flex font-extralight text-foreground gap-2 mt-2 text-xs print:text-2xs">
            <div>
              <div className="markdown"><Markdown components={{ p: ({ children }) => <>{children}</>}}>{description}</Markdown></div>
              <CollapsibleContent
                className="text-xs print:text-2xs print:hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
              >
                <h4 className="mt-2 text-sm font-semibold">Обязанности</h4>
                <div className="markdown text-xs print:text-2xs"><Markdown components={{ p: ({ children }) => <>{children}</>}}>{responsibility}</Markdown></div>
                {achievements ? (
                  <div>
                    <h4 className="mt-2 text-sm font-semibold">Достижения</h4>
                    <ul className="ml-6 text-xs print:text-2xs list-square">
                      {achievements.map((achievement) => (
                        <li className="markdown" key={achievement}><Markdown components={{ p: ({ children }) => <>{children}</>}}>{achievement}</Markdown></li>
                      ))}
                    </ul>
                  </div>
                ) : null }
                {quit ? (
                  <div>
                    <h4 className="mt-2 text-sm font-semibold">Почему ушёл</h4>
                    <ul className="ml-6 text-xs print:text-2xs list-square">
                      {quit.map((quit) => (
                        <li className="markdown" key={quit}><Markdown components={{ p: ({ children }) => <>{children}</>}}>{quit}</Markdown></li>
                      ))}
                    </ul>
                  </div>
                ) : null }
              </CollapsibleContent>
            </div>
          </CardContent>
        </Card>
      </CollapsibleTrigger>
    </Collapsible>
  )
}