import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import type { FeedResponse } from "@/lib/store/feed";

import Subscribe from "./subscribe";

interface MoreMenuProps extends Pick<FeedResponse, "author" | "id"> {}

export default function MoreMenu({ author }: Readonly<MoreMenuProps>) {
  return (
    <DropdownMenu>
      <Tooltip text="More">
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"iconSm"}>
            <Icons.Menu className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <Subscribe author={author} />
        <DropdownMenuItem>
          <Icons.Flag /> Report post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
