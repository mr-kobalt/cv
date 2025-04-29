import React from "react";
import { Metadata } from "next";
import path from "path";
import { promises as fs } from 'fs';

import { JSDOM } from 'jsdom';

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar, { Header } from "@/components/app-sidebar"

import { RESUME_DATA } from "@/data/resume-data";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/ui/section";


import "@/styles/jupyter/theme.css";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";

type Props = {
  params: Promise<{ project: string }>
}

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default async function Page({ params }: Props) {
  // remove all styles in HEAD of jupyter notebook
  const { project } = await params;
  const project_data = RESUME_DATA.projects.find(item => item.slug === project);

  var filePath = path.join(process.cwd(), 'src', 'data', project + '.html');
  const jupyter_notebook = await fs.readFile(filePath, 'utf8');

  const dom = new JSDOM(jupyter_notebook);
  const doc = dom.window.document;
  const jupyter_notebook_cleaned = doc.body.innerHTML;

  const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    .map(element => {
      const level = parseInt(element.tagName.substring(1), 10);
      const id = element.id;

      if (!id) {
        console.warn(`Header element without ID found: ${element.textContent}`);
      }

      return {
        element,
        level,
        title: element.textContent?.trim().replace(/\u00A0/g, ' ').replace(/\p{C}/gu, '').slice(0, -1) || '',
        url: id ? `#${id}` : '',
      };
    });

  const root: Header[] = [];
  const stack: Header[] = [];

  headers.forEach(current => {
    const header: Header = {
      title: current.title,
      url: current.url,
      level: current.level,
      subheaders: []
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= current.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(header);
    } else {
      stack[stack.length - 1].subheaders.push(header);
    }

    stack.push(header);
  });

  return (

    <SidebarProvider >
      <AppSidebar items={root} />
      <SidebarInset>
        <main className="container max-w-4xl mx-auto px-4 pt-4 print:pt-0 md:pt-16">
          {project_data ? (
            <Section className="text-base font-mono">
              <h1 className="text-3xl font-semibold font-sans leading-none tracking-tight">{project_data.title}</h1>
              <div className="flex flex-wrap gap-1">
                {project_data.techStack.map(tag => (
                  <Badge
                    className="px-1 py-0 text-sm print:leading-tight"
                    variant="secondary"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="markdown">
                <Markdown>
                  {project_data.description ? project_data.description : project_data.description_short}
                </Markdown>
              </div>
              {project_data.problems ? (
                <div>
                  <h2 className="mt-2 text-xl font-semibold font-sans">Предпосылки</h2>
                  <ul className="mt-1">
                    {project_data.problems.map((problem) => (
                      <li key={problem}>{problem}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project_data.result ? (
                <div>
                  <h2 className="mt-2 text-xl font-semibold font-sans">Результат</h2>
                  <ul className="mt-1">
                    {project_data.result.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Section>
          ) : null}
          <Separator
            orientation="horizontal"
            className="mt-5 mx-auto data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
          />
        {/* <main className="flex shrink-0 items-center gap-2 border-b"> */}
          <Section className="w-full mx-auto space-y-8 print:space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: jupyter_notebook_cleaned }}
            className="jupyter-html"
          />
          </Section>
          {/* <Footer className="max-w-4xl"/> */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
