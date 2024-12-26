"use client";
import {
  Plus,
  LogOut,
  CandlestickChart,
  History,
  Gauge,
  BarChart,
  TrendingUp,
  Newspaper,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { ConfirmationDialog } from "./confirmation-dialog";

// Menu items in user-centric order.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Gauge,
  },
  {
    title: "Buy/Sell",
    url: "/user/transaction",
    icon: TrendingUp,
  },
  {
    title: "Positions",
    url: "/user/positions",
    icon: CandlestickChart,
  },
  {
    title: "Watchlist",
    url: "/user/watchlist",
    icon: BarChart,
  },
  {
    title: "Performance",
    url: "/user/performance",
    icon: History,
  },
  {
    title: "News",
    url: "/user/news",
    icon: Newspaper,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [logoutDiaglog, setLogoutDialog] = useState(false);

  return (
    <>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 mb-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-8 h-8 mr-2"
                  />
                  <span className="text-xl">StockTracker</span>
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
                  <SidebarMenuButton onClick={() => setLogoutDialog(true)}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 mb-1">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user.username}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.username}</span>
                </Avatar>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {logoutDiaglog && (
        <ConfirmationDialog
          isOpen={logoutDiaglog}
          onClose={() => setLogoutDialog(false)}
          onConfirm={() => logout()}
          title="Confirm Logout"
          message={`Are you sure you want to logout?`}
          submitting={false}
        />
      )}
    </>
  );
}
