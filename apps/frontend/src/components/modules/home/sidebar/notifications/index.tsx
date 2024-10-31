import { useEffect } from "react";

import { Center } from "@/components/ui/center";
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
import type { Tables } from "@/types/database.types";
import { fetchClient } from "@/utils/api-client";
import { createClient } from "@/utils/supabase/client";

import { useGetNotifications } from "./api/notification";
import MenuButton from "./menu-button";
import NotificationCard from "./notification-card";

export default function Notifications() {
  const { notifications, setNotifications, addNotification, markAsRead } =
    useNotificationStore();
  const { data, isFetching } = useGetNotifications();

  useEffect(() => {
    if (!data) return;

    setNotifications(data);

    const client = createClient();

    const channel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          addNotification(payload.new as Tables<"notifications">);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe().catch(() => {});
    };
  }, [data, setNotifications, addNotification]);

  const getUnreadNotifications = () => {
    const unreadNotificationIds = notifications
      .filter((n) => !n.is_read)
      .map((n) => n.id);

    return {
      unreadNotificationIds,
      count: unreadNotificationIds.length,
    };
  };

  const handleMarkAsRead = async () => {
    const { count, unreadNotificationIds } = getUnreadNotifications();

    if (count > 0) {
      await fetchClient.PATCH("/notification", {
        body: { ids: unreadNotificationIds },
      });
    }
  };

  const setMarkAsRead = (open: boolean) => {
    const { count, unreadNotificationIds } = getUnreadNotifications();

    if (!open && count > 0) {
      markAsRead(unreadNotificationIds);
    }
  };

  const bodyView =
    notifications.length > 0 ? (
      notifications.map((n) => <NotificationCard key={n.id} {...n} />)
    ) : (
      <Center className="h-24 text-muted-foreground">
        No new notifications
      </Center>
    );

  return (
    <Sheet onOpenChange={setMarkAsRead}>
      <SheetTrigger asChild>
        <SidebarMenuButton
          onClick={handleMarkAsRead}
          size={"lg"}
          tooltip={"Notification"}
          className="relative"
        >
          <MenuButton />
        </SidebarMenuButton>
      </SheetTrigger>
      <SheetContent
        className="p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="p-6">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        {isFetching
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={`skeleton-${i + 1}`}
                className={"mb-0.5 h-24 w-full rounded-none"}
              />
            ))
          : bodyView}
      </SheetContent>
    </Sheet>
  );
}
