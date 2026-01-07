"use client"

import {
  IconDotsVertical,
  IconLogout,
  IconShield,
  IconUser,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar"
import { useAuth } from "@/src/context/AuthContext"
import { Badge } from "@/src/components/ui/badge"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { moderator, logout } = useAuth()
  const router = useRouter()

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Get moderator display data
  const userName = moderator?.username || 'Moderator'
  const userRole = moderator?.role || 'moderator'
  
  // Get first letter for avatar fallback
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  // Get role color
  const getRoleBadgeVariant = (role: 'admin' | 'moderator') => {
    return role === 'admin' ? 'default' : 'secondary'
  }

  if (!moderator) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="text-muted-foreground truncate text-xs capitalize">
                  {userRole}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <Badge 
                    variant={getRoleBadgeVariant(userRole as 'admin' | 'moderator')} 
                    className="w-fit text-xs capitalize mt-1"
                  >
                    {userRole}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUser />
                Profile
              </DropdownMenuItem>
              {moderator.role === 'admin' && (
                <DropdownMenuItem>
                  <IconShield />
                  Admin Settings
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}