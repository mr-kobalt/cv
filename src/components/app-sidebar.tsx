import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SiJupyter } from "@icons-pack/react-simple-icons";
import { ToggleTheme } from "./theme-toggle";

export type Header = {
  title: string;
  url: string;
  level: number;
  subheaders: Header[];
};

interface Props {
  items: Header[],
}

export default function AppSidebar({ items,...props }: Props & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
              {/* <SidebarMenuButton size="lg" asChild> */}
                {/* <a href="#"> */}
                  <div className="flex aspect-square size-8 m-2 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                    <SiJupyter className="size-8" color="#F37626" />
                  </div>
                  {/* <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Documentation</span>
                    <span className="">v1.0.0</span>
                  </div> */}
                {/* </a> */}
              {/* </SidebarMenuButton> */}
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="font-normal">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="font-normal">
              {items[0].subheaders.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.subheaders.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ToggleTheme />
      </SidebarFooter>
    </Sidebar>
  )
}
