import { Icons } from "@/assets/icons";
import { useSidebar } from "@/components/ui/reusables/sidebar";
import useNotificationStore from "@/lib/store/notifications";
import { cn } from "@/utils/cn";

export default function MenuButton() {
  const { notifications } = useNotificationStore();

  const containUnread = notifications.some((n) => !n.isRead);

  const { state } = useSidebar();

  return (
    <>
      <Icons.Notification />
      <span>Notifications</span>
      {containUnread && (
        <span
          className={cn(
            "absolute top-3 left-7 w-2 h-2 rounded-full bg-primary",
            {
              "left-4 top-1": state === "collapsed",
            },
          )}
        />
      )}
    </>
  );
}
