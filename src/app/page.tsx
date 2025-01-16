import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MapPin, MailIcon, PhoneIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import parsePhoneNumber from 'libphonenumber-js';
import Markdown from 'react-markdown';

import { RESUME_DATA } from "@/data/resume-data";
import { AboutCard } from "@/components/about-card";
import { ToolsCard } from "@/components/tools-card-popover";
import { WorkCard } from "@/components/work-card";
import { ProjectCard } from "@/components/project-card";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/theme-toggle";

import { redirect, permanentRedirect } from 'next/navigation'


export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  permanentRedirect('/default');
}