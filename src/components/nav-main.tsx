"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

export function NavMain({
  items,
  userRole,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    adminOnly?: boolean;
  }[];
  userRole: string;
}) {
  const pathname = usePathname();

  // Filter items based on user role
  const filteredItems = items.filter((item) => {
    if (item.adminOnly) {
      return userRole === "admin";
    }
    return true;
  });

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {filteredItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground [&[data-active=true]]:bg-primary [&[data-active=true]]:text-primary-foreground"
                      : ""
                  }
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}