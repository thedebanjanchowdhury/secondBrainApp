import React from "react";
import { FiTwitter } from "react-icons/fi";
import { GoVideo } from "react-icons/go";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { TiTags } from "react-icons/ti";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Tweets",
    url: "#",
    icon: <FiTwitter className="w-5 h-5" />,
  },
  {
    title: "Videos",
    url: "#",
    icon: <GoVideo className="w-5 h-5" />,
  },
  {
    title: "Documents",
    url: "#",
    icon: <MdOutlineDocumentScanner className="w-5 h-5" />,
  },
  {
    title: "Links",
    url: "#",
    icon: <FaLink className="w-5 h-5" />,
  },
  {
    title: "Tags",
    url: "#",
    icon: <TiTags className="w-5 h-5" />,
  },
];

const AppSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-4 ml-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brain"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
                  <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
                  <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
                  <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
                  <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
                  <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
                </svg>
                <h1 className="text-lg font-bold">Second Brain</h1>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="ml-6 mt-6">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 w-full"
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar;
