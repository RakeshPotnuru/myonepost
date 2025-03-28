"use client";

import Link from "next/link";

import { Icons } from "@/assets/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/reusables/sidebar";
import useUserStore from "@/lib/store/user";
import { cn } from "@/utils/cn";

import Create, { CreatePostBlock } from "./create";
import Logo from "./logo";
import MoreActions, { MoreActionsContent } from "./more-actions";
import MyPage from "./my-page";
import Notifications from "./notifications";

export default function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useUserStore();

  return (
    <>
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
              <MyPage />
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
      <div className="fixed bottom-0 z-40 flex w-full flex-row justify-between border-t bg-background p-1.5 px-4 md:hidden">
        <Link href={user ? `@${user?.username}` : ""} passHref>
          <Button variant={"ghost"} size={"icon"}>
            <Avatar className="size-6">
              <AvatarImage src={user?.avatar_url ?? ""} />
              <AvatarFallback className="text-xs">
                {user?.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block">Your Page</span>
          </Button>
        </Link>
        <Notifications isMobile />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Icons.Plus className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            aria-describedby="undefined"
          >
            <CreatePostBlock className="border-none" />
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Icons.More className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <MoreActionsContent />
        </DropdownMenu>
      </div>
    </>
  );
}
