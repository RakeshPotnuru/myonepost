import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import { siteConfig } from "@/config/site";
import type { FeedResponse } from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";

import Report from "../report";
import Subscribe from "./subscribe";

interface MoreMenuProps extends Pick<FeedResponse, "author" | "id"> {}

export default function MoreMenu({ author, id }: Readonly<MoreMenuProps>) {
  const { user } = useUserStore();
  const postLink = `${siteConfig.url}/@${author.username}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(postLink);
    toast.success("Link copied to clipboard");
  };

  const handleShareVia = async () => {
    await navigator.share({ url: postLink });
  };

  return (
    <DropdownMenu>
      <Tooltip text="More">
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"iconSm"}>
            <Icons.Menu className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.Share className="mr-2" /> Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Icons.Link /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShareVia}>
              <Icons.ShareVia /> Share via
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {user?.id !== author.id && (
          <>
            <Subscribe author={author} />
            <Report reportedUserId={author.id} postId={id} />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
