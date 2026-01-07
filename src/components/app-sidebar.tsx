"use client";

import * as React from "react";
import "@fontsource/orbitron";

import { NavMain } from "@/src/components/nav-main";
import { NavSecondary } from "@/src/components/nav-secondary";
import { NavUser } from "@/src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { data } from "@/src/data/sideBarLinks";
import {
  IconCircleDottedLetterK,
  IconInnerShadowTop,
  IconLetterK,
} from "@tabler/icons-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = React.useState<string>("user");

  React.useEffect(() => {
    // Get the real user data from localStorage
    const userData = localStorage.getItem("user"); // Check what key you used
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role || "user");
    }
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconLetterK className="w-32 h-32" strokeWidth={4} />
                <span className="text-base font-semibold">Krii</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} userRole={userRole} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}