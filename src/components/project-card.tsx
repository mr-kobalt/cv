"use client"

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmblaCarousel from "./ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll"
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "start",
  dragFree: true,
  containScroll: false,
}
const PLUGINS: EmblaPluginType[] = [
  AutoScroll({
    playOnInit: true,
    speed: 1,
    startDelay: 0,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  }),
  WheelGesturesPlugin({forceWheelAxis: "y"})
]

interface Props {
  slug?: string;
  title: string;
  description: string;
  description_short: string;
  problems?: readonly string[];
  result?: readonly string[];
  tags: readonly string[];
  link?: string;
  images?: any[];
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  description_short,
  description,
  problems,
  result,
  tags,
  link,
  images,
  className=""
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [openCarousel, setOpenCarousel] = React.useState(false);

  function onKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") setOpen(true);
  }

  function onKeyUpCarousel(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") setOpenCarousel(!openCarousel);
  }

  function handleClose() {
    if (openCarousel && window.matchMedia("(min-width: 768px)").matches) {
      setOpenCarousel(!openCarousel)
    } else {
      setOpen(!open)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogTrigger asChild tabIndex={0}>
        <Card
          className={"flex flex-col overflow-hidden border border-muted cursor-pointer p-3"+" "+className}
          onKeyUp={event => onKeyUp(event)}
        >
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-base">
                {title}
              </CardTitle>
              <div className="hidden font-mono text-xs underline print:visible">
                {link?.replace("https://", "").replace("www.", "").replace("/", "")}
              </div>
              <CardDescription className="font-mono text-xs print:text-2xs">
                {description_short}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-auto print:mt-0 flex">
            <div className="mt-2 flex flex-wrap gap-1">
            {/* <div className="mt-2 flex flex-wrap-reverse gap-1"> */}
              {tags.map((tag) => (
                <Badge
                  className="px-1 py-0 text-2xs print:px-1 print:py-0.5 print:text-3xs print:leading-tight"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent
        className={"grid items-center content-stretch grid-cols-1 gap-5 min-w-sm h-auto max-h-svh md:max-h-[90svh] lg:max-h-[70svh] lg:scale-125 border border-muted overflow-auto"+(images ? " md:grid-cols-2 max-w-[60svw]" : " md:grid-cols-1 max-w-xl")}
        aria-description="Project description"
      >
        {images ?
          <div
            id="carouselWrapper"
            aria-description="Project slides"
            className={"md:cursor-grab order-last md:order-first"+(openCarousel ? " md:col-span-2 md:pr-4" : "")}
            onClick={() => setOpenCarousel(!openCarousel)}
            onKeyUp={event => onKeyUpCarousel(event)}
          >
            <EmblaCarousel
              slides={images}
              options={OPTIONS}
              plugins={PLUGINS}
            />
          </div>
        : null}
        <Card
          className={"flex flex-col gap-2 bg-background h-full"+(openCarousel ? " md:hidden" : "")}
          aria-description="Project details"
        >
          <DialogHeader className="text-left space-y-0">
            <DialogTitle asChild>
              <CardHeader>
                <CardTitle className="text-base">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      className="inline-flex items-center gap-1 hover:underline outline-offset-4 focus-visible:underline"
                    >
                      {title}
                      <span className="pl-1 size-1 rounded-full bg-green-500"></span>
                    </a>
                  ) : (
                    title
                  )}
                </CardTitle>
                <div className="hidden font-mono text-xs underline print:visible">
                  {link?.replace("https://", "").replace("www.", "").replace("/", "")}
                </div>
              </CardHeader>
            </DialogTitle>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge
                  className="px-1 py-0 text-2xs print:px-1 print:py-0.5 print:text-3xs print:leading-tight"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogHeader>
          <CardContent>
            {/* <DialogDescription className="markdown font-mono text-xs print:text-2xs"> */}
              {/* <CardDescription className="markdown font-mono text-xs print:text-2xs" > */}
                <div className="markdown font-mono text-xs print:text-2xs">
                  {/* <Markdown unwrapDisallowed disallowedElements={["p"]}> */}
                  <Markdown>
                    {description ? description : description_short}
                  </Markdown>
                </div>
              {/* </CardDescription> */}
            {/* </DialogDescription> */}
              {problems ? (
                <>
                  <h4 className="mt-2 text-sm font-sans font-semibold">Предпосылки</h4>
                  <ul className="ml-6 text-xs print:text-2xs list-square">
                    {problems.map((problem) => (
                      <li key={problem}>{problem}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {result ? (
                <>
                  <h4 className="mt-2 text-sm font-sans font-semibold">Результат</h4>
                  <ul className="ml-6 text-xs print:text-2xs list-square">
                    {result.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {slug ? (
                <Button
                  className="mt-2 text-xs gap-2 cursor-pointer hover:no-underline"
                  size={"sm"}
                  asChild
                >
                  <a href={`./project/${slug}`}>Подробнее<MoveRight className="size-4"/></a>
                </Button>
              ) : null}
          </CardContent>
          {/* <CardFooter className="mt-auto">

          </CardFooter> */}
        </Card>
      </DialogContent>
    </Dialog>
  );
}
