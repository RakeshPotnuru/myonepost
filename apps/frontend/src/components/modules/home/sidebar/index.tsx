"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/reusables/sidebar";
import { cn } from "@/utils/cn";

import Create from "./create";
import Logo from "./logo";
import MoreActions from "./more-actions";
import Notifications from "./notifications";
import Profile from "./profile";

export default function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible={"icon"}
      className={cn({
        "p-4": state === "expanded",
      })}
    >
      <Logo />
      <SidebarContent
        className={cn("p-2 mt-8", {
          "p-0": state === "expanded",
        })}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <Notifications />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Profile />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Create />
          <MoreActions />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
