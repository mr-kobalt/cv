import React from "react";
import { Metadata } from "next";
import path from "path";
import { promises as fs } from 'fs';

import { JSDOM } from 'jsdom';

import { RESUME_DATA } from "@/data/resume-data";
import { Footer } from "@/components/footer";

import "@/styles/jupyter/theme.css";

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

  var filePath = path.join(process.cwd(), 'src', 'data', project + '.html');
  const jupyter_notebook = await fs.readFile(filePath, 'utf8');

  const dom = new JSDOM(jupyter_notebook);
  // dom.window.document.head.querySelectorAll('style').forEach(el => el.remove());
  // dom.window.document.body.removeAttribute('data-jp-theme-light');
  // dom.window.document.body.removeAttribute('data-jp-theme-name');

  // const jupyter_notebook_cleaned = dom.serialize();
  const jupyter_notebook_cleaned = dom.window.document.body.innerHTML;

  return (
    <main className="container mx-auto px-4 pt-4 print:pt-0 md:pt-16">
      <section className="w-full mx-auto max-w-4xl space-y-8 print:space-y-4">
        <div
          dangerouslySetInnerHTML={{ __html: jupyter_notebook_cleaned }}
          className="jupyter-html"
        />
      </section>

      <Footer className="max-w-4xl"/>
    </main>
    )
}
