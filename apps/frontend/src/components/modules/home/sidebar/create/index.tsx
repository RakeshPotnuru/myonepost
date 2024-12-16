import { PostStatus } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/reusables/popover";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/reusables/sidebar";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import useUserStore from "@/lib/store/user";
import { cn } from "@/utils/cn";

import CreateImagePost from "./image-post";
import CreateTextPost from "./text-post";
import CreateVideoPost from "./video-post";

export default function Create() {
  const { state } = useSidebar();

  return (
    <SidebarMenuItem>
      {state === "collapsed" ? (
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton tooltip={"Create post"}>
              <Icons.Plus className="size-4" />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-max rounded-lg border-none p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CreatePostBlock />
          </PopoverContent>
        </Popover>
      ) : (
        <CreatePostBlock />
      )}
    </SidebarMenuItem>
  );
}

interface CreatePostBlockProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreatePostBlock({ className }: CreatePostBlockProps) {
  const { user, isLoading } = useUserStore();

  const bodyView =
    user?.next_post_allowed_at &&
    new Date(user.next_post_allowed_at) > new Date() ? (
      <p className="text-sm text-muted-foreground">
        You can update your post{" "}
        {formatDistanceToNow(new Date(user?.next_post_allowed_at), {
          includeSeconds: true,
          addSuffix: true,
        })}
      </p>
    ) : (user?.post_status === PostStatus.PENDING ? (
      <p className="text-sm text-muted-foreground">
        Your previous post is still pending. Please wait for it to be approved.
      </p>
    ) : (
      <>
        <div className="text-sm font-medium">Create your post</div>
        <div className="flex flex-row gap-1">
          <CreateTextPost />
          <CreateImagePost />
          <CreateVideoPost />
          {/* <CreateAudioPost /> */}
          <Tooltip text="Audio Post (coming soon)">
            <Button className={"rounded-sm bg-chart-4 p-3"}>
              <Icons.AudioPost />
            </Button>
          </Tooltip>
        </div>
      </>
    ));

  return (
    <div
      className={cn("space-y-2 rounded-lg border bg-background p-4", className)}
    >
      {isLoading ? <Skeleton className="h-20" /> : bodyView}
    </div>
  );
}
