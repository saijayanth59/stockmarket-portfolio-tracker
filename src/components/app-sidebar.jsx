"use client";
import { Plus, LogOut, CandlestickChart, History, Gauge } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

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
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  {
    title: "Buy/Sell",
    url: "/user/transaction",
    icon: Plus,
  },
  {
    title: "Positions",
    url: "/user/positions",
    icon: CandlestickChart,
  },
  {
    title: "Performance",
    url: "/user/performance",
    icon: History,
  },
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Gauge,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-8 h-8 mr-2"
                />
                <span>Admin</span>
              </Avatar>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator orientation="horizontal" className="my-2" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-10">
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator orientation="horizontal" className="my-2" />
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button>
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
