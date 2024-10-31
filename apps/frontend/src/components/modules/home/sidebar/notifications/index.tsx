import { useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/reusables/sheet";
import { SidebarMenuButton } from "@/components/ui/reusables/sidebar";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import useNotificationStore from "@/lib/store/notifications";
import { createClient } from "@/utils/supabase/client";

import { fetchNotifications, useGetNotifications } from "./api/notification";
import MenuButton from "./menu-button";
import NotificationCard from "./notification-card";

export default function Notifications() {
  const { notifications, setNotifications } = useNotificationStore();
  const { data, isFetching } = useGetNotifications();

  useEffect(() => {
    if (!data) return;

    setNotifications(data);

    const client = createClient();

    const channel = client
      .channel("*")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        async () => {
          try {
            const res = await fetchNotifications();

            setNotifications(res);
          } catch {
            // ignore
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe().catch(() => {});
    };
  }, [data, setNotifications]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <SidebarMenuButton
          size={"lg"}
          tooltip={"Notification"}
          className="relative"
        >
          <MenuButton />
        </SidebarMenuButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="pt-4">
          {isFetching ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={`skeleton-${i + 1}`} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div>
              {notifications.map((n) => (
                <NotificationCard key={n.id} {...n} />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
