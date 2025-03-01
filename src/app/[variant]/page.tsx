import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata, ResolvingMetadata } from "next";
import { Section } from "@/components/ui/section";
import { MapPin, MailIcon, PhoneIcon, GlobeIcon } from "lucide-react";
import { GitHubIcon, MetaLeadLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import parsePhoneNumber from 'libphonenumber-js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { RESUME_DATA } from "@/data/resume-data";
import { AboutCard } from "@/components/about-card";
import { ToolsCard } from "@/components/tools-card-popover";
import { WorkCard } from "@/components/work-card";
import { ProjectCard } from "@/components/project-card";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/theme-toggle";
import Image, { StaticImageData } from "next/image";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ variant: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const variant = (await params).variant as keyof typeof RESUME_DATA.variants
  const summary = ( RESUME_DATA.variants[variant] as any ).summary as 'string' | undefined
  const about = ( RESUME_DATA.variants[variant] as any ).about as 'string' | undefined

  return {
    title: `${RESUME_DATA.name} | ${about ?? RESUME_DATA.about}`,
    description: summary ?? RESUME_DATA.summary,
  }
}

export default async function Page(
  { params }: Props
) {
  const variant = (await params).variant as keyof typeof RESUME_DATA.variants

  if(!RESUME_DATA.variants.hasOwnProperty(variant)) {
    redirect('/default')
  }

  let variant_data = RESUME_DATA.variants[variant]
  let about = variant_data.about ?? RESUME_DATA.about
  let summary = variant_data.summary ?? RESUME_DATA.summary
  let cover_letter = variant_data.cover_letter ?? RESUME_DATA.cover_letter

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto px-4 pt-4 print:pt-0 md:pt-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-4">
        <div>
          <h1 className="text-2xl font-bold sm:hidden">{RESUME_DATA.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-1.5">
              <h1 className="text-2xl font-bold hidden sm:block">{RESUME_DATA.name}</h1>
              <Markdown
                remarkPlugins={[remarkGfm]}
                // components={{ p: React.Fragment, }}
                className="max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
                {about}
              </Markdown>
              <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <a
                  className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                >  <MapPin className="size-3" />
                  {RESUME_DATA.location}
                </a>
              </p>
              <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                {RESUME_DATA.contact.email ? (
                  <Button
                    className="size-8"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={`mailto:${RESUME_DATA.contact.email}`} aria-label="Mail me">
                      <MailIcon className="size-4" />
                    </a>
                  </Button>
                ) : null}
                {RESUME_DATA.contact.tel ? (
                  <Button
                    className="size-8"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={`tel:${RESUME_DATA.contact.tel}`} aria-label="Call me">
                      <PhoneIcon className="size-4" />
                    </a>
                  </Button>
                ) : null}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    className={"size-8".concat(" ", social.hidden ? "hidden" : "")}
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={social.url} target="_blank">
                      <social.icon className="size-4" />
                    </a>
                  </Button>
                ))}
              </div>
              <div className="hidden justify-items-start gap-1 grid-cols-3 font-mono text-sm text-muted-foreground print:grid print:text-[12px]">
                <Button
                  key="location"
                  className="h-4 px-0 text-xs text-muted-foreground"
                  variant="link"
                  size="sm"
                  asChild
                >
                  <a
                    className="gap-1"
                    href={RESUME_DATA.locationLink}
                    target="_blank"
                  >
                    <MapPin className="size-3" />
                    {RESUME_DATA.location}
                  </a>
                </Button>
                {RESUME_DATA.contact.email ? (
                  <Button
                    key="email"
                    className="col-span-2 h-4 px-0 text-xs text-muted-foreground"
                    variant="link"
                    size="sm"
                    asChild
                  >
                    <a
                      className="gap-1"
                      href={`mailto:${RESUME_DATA.contact.email}`}
                    >
                      <MailIcon className="size-3" />
                      {RESUME_DATA.contact.email}
                    </a>
                  </Button>
                  ) : null}
                {RESUME_DATA.contact.tel ? (
                  <Button
                    key="phone"
                    className="h-4 px-0 text-xs text-muted-foreground"
                    variant="link"
                    size="sm"
                    asChild
                  >
                      <a
                        className="gap-1 oldstyle-nums word-spacing"
                        href={`tel:${RESUME_DATA.contact.tel}`}
                      >
                        <PhoneIcon className="size-3" />
                        {parsePhoneNumber(RESUME_DATA.contact.tel)?.formatInternational()}
                      </a>
                    </Button>
                  ) : null}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    className={"col-span-2 h-4 px-0 text-xs text-muted-foreground".concat(" ", social.print ? "" : "hidden")}
                    variant="link"
                    size="sm"
                    asChild
                  >
                    <a
                      className="gap-1"
                      href={social.url}
                    >
                      <social.icon className="size-3"/>
                      {social.url?.replace("https://", "").replace("www.", "").concat(social.name === 'Website' ? "/"+variant : "")}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <Avatar className="size-28 border border-muted">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {cover_letter ? (
          <Section>
            <h2 className="flex items-center justify-between gap-2 text-xl font-bold max-sm:flex-col-reverse max-sm:items-start">
              Сопроводительное письмо
              {cover_letter.logo ? (
                <cover_letter.logo className="h-8 w-auto"/>
              ) : null}
            </h2>
              {cover_letter.letter.map((paragraph, index) => {
                return (
                  <Markdown
                    key={index}
                    // remarkPlugins={[remarkGfm]}
                    className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]"
                  >
                    {paragraph}
                  </Markdown>
              )})}
          </Section>
        ) : null}

        <Section>
          <h2 className="text-xl font-bold">Обо мне</h2>
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
              {summary}
          </Markdown>

          <div className="-mx-3 grid gap-3 grid-cols-2 max-sm:grid-cols-1 print:mx-0 print:border-none">
              {/* <AboutCard
                className="print:col-span-3"
                title="Качества"
                tags={RESUME_DATA.qualities}
              /> */}
              <AboutCard
                title="Навыки"
                tags={RESUME_DATA.skills}
              />
              <ToolsCard
                title="Инструменты"
                tags={RESUME_DATA.tools}
              />
          </div>
        </Section>

        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold">Опыт</h2>
          <div className="-mx-3 grid grid-cols-1 gap-1 sm:gap-3">
            {RESUME_DATA.work.map((work) => {
              return (
                <WorkCard
                  key={work.company}
                  title={work.title}
                  logo={work.logo}
                  link={work.link}
                  badges={work.badges}
                  company={work.company}
                  description={work.description}
                  start={work.start}
                  end={work.end}
                  responsibility={work.responsibility}
                  achievements={work.achievements}
                  quit={work.quit}
                />
              );
            })}
          </div>
        </Section>

        {/* <Section>
          <h2 className="text-xl font-bold">Образование</h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      {education.school}
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 print:text-[12px]">
                  {education.degree}
                </CardContent>
              </Card>
            );
          })}
        </Section> */}

        {/* <Section className="print-force-new-page scroll-mb-16"> */}
        <Section className={"scroll-mb-16".concat(" ", cover_letter ? " print-force-new-page" : "")}>
          <h2 className="text-xl font-bold">Проекты</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-4 print:gap-2 md:grid-cols-2 lg:grid-cols-3 print:mx-0">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  description_short={project.description_short}
                  problems={project.problems ?? undefined}
                  result={project.result ?? undefined}
                  tags={project.techStack}
                  link={project.link ? project.link.href : undefined}
                  images={"images" in project ? project.images : undefined}
                  className="transition-colors hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none print:border-none print:p-0"
                />
              );
            })}
          </div>
        </Section>
      </section>

      <Separator
        orientation="horizontal"
        className="mt-5 mx-auto w-full max-w-2xl data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      />
      <footer className="flex items-center justify-center print:hidden mx-auto w-full max-w-2xl">
        <div className="group flex-1 flex items-center justify-start gap-1 my-2 text-xs text-center font-mono text-muted-foreground hover:text-foreground transition-all max-sm:text-[10px]">
          Based on
          <Button
            className="px-0 text-xs max-sm:text-[10px] text-muted-foreground group-hover:text-foreground focus-visible:ring-offset-[0.01em]"
            variant="link"
            size="sm"
            asChild
          >
            <a
              className="gap-1"
              href="https://github.com/BartoszJarocki/cv"
              target="_blank"
            >
              <GitHubIcon className="size-4"/>
              Bartosz Jarocki&apos;s
            </a>
          </Button>
          excellent work
        </div>
        <ToggleTheme className="flex shrink-0 rounded-full transition-all text-muted-foreground hover:text-foreground hover:bg-transparent ring-inset"/>
      </footer>
    </main>
  );
}