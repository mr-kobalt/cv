"use client"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { useState } from "react";
import React from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Markdown from 'react-markdown';

interface Props {
  className?: string;
  title: string;
  tags: readonly any[];
  variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}

interface PopoverProps {
  name: string;
  tooltip: string;
  variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}

function HoverPopover ({name, tooltip, variant}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const debouncedOpen = useDebounce(open, 100);

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  return (
    <Popover key={name} open={debouncedOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="outline-offset-2 rounded-md"
        asChild
      >
        <Badge
          className="p-1 text-2xs font-light font-mono print:py-0.5 print:text-3xs print:leading-tight"
          variant={variant}
          key={name}
        >
          {name}
        </Badge>
      </PopoverTrigger>
      {tooltip ?
        <PopoverContent
          className="p-3 rounded-xl font-mono text-xs text-pretty w-auto max-w-md max-md:max-w-[360px] print:hidden"
        >
          <Markdown components={{ p: ({ children }) => <>{children}</>}}>{tooltip}</Markdown>
        </PopoverContent>
      : null}
    </Popover>
  );
};

export function SkillsCard({ className="", title, tags, variant }: Props) {
  return (
    <Card
      className={"flex flex-col overflow-hidden border border-muted p-3 print:p-0 print:border-none".concat(" ", className)}
    >
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="mt-0 flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => {
            // HoverPopover(tag.name, tag.tooltip)
              if (tag.tooltip || tag.tooltip == "") {
                return (
                  <HoverPopover key={tag.name} name={tag.name} tooltip={tag.tooltip} variant={variant} />
                )
              } else {
                return (
                  <Badge
                    className="p-1 text-2xs font-light font-mono print:py-0.5 print:text-3xs print:leading-tight"
                    variant={variant}
                    key={tag.name}
                  >
                    {tag.name}
                  </Badge>
                )
              }
          })}
        </div>
      </CardContent>
    </Card>
  );
}
