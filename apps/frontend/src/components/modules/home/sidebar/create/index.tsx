import { formatDistanceToNow } from "date-fns";

import { Icons } from "@/assets/icons";
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
import useUserStore from "@/lib/store/user";

import CreateAudioPost from "./audio-post";
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

function CreatePostBlock() {
  const { user, isLoading } = useUserStore();

  const bodyView =
    user?.nextPostAllowedAt && new Date(user.nextPostAllowedAt) > new Date() ? (
      <p className="text-sm text-muted-foreground">
        You can update your post{" "}
        {formatDistanceToNow(new Date(user?.nextPostAllowedAt), {
          includeSeconds: true,
          addSuffix: true,
        })}
      </p>
    ) : (
      <>
        <div className="text-sm font-medium">Create your post</div>
        <div className="flex flex-row gap-1">
          <CreateTextPost />
          <CreateImagePost />
          <CreateVideoPost />
          <CreateAudioPost />
        </div>
      </>
    );

  return (
    <div className="space-y-2 rounded-lg border bg-background p-4">
      {isLoading ? <Skeleton className="h-20" /> : bodyView}
    </div>
  );
}
