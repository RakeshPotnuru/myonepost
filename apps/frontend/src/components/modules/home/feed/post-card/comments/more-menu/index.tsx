import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import type { CommentResponse } from "@/lib/store/comment";
import useUserStore from "@/lib/store/user";

import Report from "../../report";
import DeleteComment from "./delete-comment";

interface MoreMenuProps extends Pick<CommentResponse, "author" | "id"> {}

export default function MoreMenu({ author, id }: MoreMenuProps) {
  const { user } = useUserStore();

  return (
    <DropdownMenu>
      <Tooltip text="More">
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"iconXs"}>
            <Icons.Menu />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      >
        {author.id === user?.id && <DeleteComment commentId={id} />}
        {author.id !== user?.id && (
          <Report reportedUserId={author.id} commentId={id} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
