import Link from "next/link";

import { NotificationType } from "@1post/shared";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import type { Tables } from "@/types/database.types";
import { cn } from "@/utils/cn";
import { getRelativeTime } from "@/utils/get-relative-time";

interface NotificationCardProps extends Tables<"notifications"> {}

export default function NotificationCard({
  content,
  is_read,
  type,
  created_at,
}: NotificationCardProps) {
  const parts = content.split(/@(\w+)/);

  let component;
  switch (type) {
    case "NEW_POST_LIKE":
    case "NEW_COMMENT_LIKE": {
      component = (
        <NotificationBody
          parts={parts}
          icon={<Icons.Liked className="h-4 w-4 shrink-0" />}
        />
      );
      break;
    }
    case "NEW_COMMENT": {
      component = (
        <NotificationBody
          parts={parts}
          icon={<Icons.Comment className="h-4 w-4 shrink-0" />}
        />
      );
      break;
    }
    case "NEW_SUBSCRIBER": {
      component = (
        <NotificationBody
          parts={parts}
          icon={<Icons.Subscribe className="h-4 w-4 shrink-0" />}
        />
      );
      break;
    }
    case NotificationType.ALERT: {
      component = (
        <NotificationBody
          parts={["", "", content]}
          icon={<Icons.Alert className="h-4 w-4 shrink-0" />}
        />
      );
      break;
    }
  }

  return (
    <div
      className={cn("flex flex-row justify-between gap-2 text-sm px-6 py-4", {
        "bg-muted/40": !is_read,
      })}
    >
      {component}
      <time
        dateTime={created_at.toString()}
        className="text-xs text-muted-foreground"
      >
        {getRelativeTime(new Date(created_at))}
      </time>
    </div>
  );
}

interface NotificationBodyProps {
  parts: string[];
  icon: React.ReactNode;
}

function NotificationBody({ icon, parts }: Readonly<NotificationBodyProps>) {
  return (
    <div className="flex gap-2">
      {icon}
      <div className="-mt-1">
        {parts[1] && (
          <Link href={parts[1]}>
            <Button variant={"link"} size={"link"}>
              @{parts[1]}
            </Button>
          </Link>
        )}
        {parts[2]}
      </div>
    </div>
  );
}
