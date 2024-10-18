import Link from "next/link";

import { Icons } from "@/assets/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import { Tooltip } from "@/components/ui/reusables/tooltip";

export default function CommentCard() {
  return (
    <div className="flex gap-2">
      <Link href={"@username"}>
        <Avatar className="h-6 w-6 flex-none">
          <AvatarImage src="https://github.com/rakeshpotnuru.png" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex grow flex-col gap-2">
        <p>
          <Link
            href={"@username"}
            className="text-muted-foreground hover:opacity-80"
          >
            @username
          </Link>{" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum
          iusto praesentium dolorum blanditiis totam eaque! Eos veritatis ad id
          fuga, quisquam reiciendis suscipit numquam, assumenda, quod impedit
          facere placeat.
        </p>
        <div className="flex flex-row gap-2 text-xs text-muted-foreground">
          <span>· 3h</span>
          <span>· 100k likes</span>
        </div>
      </div>
      <div className="flex flex-none flex-col">
        <Tooltip text="Dislike">
          <Button variant={"ghost"} size={"iconSm"}>
            <Icons.Liked />
          </Button>
        </Tooltip>
        <Tooltip text="More">
          <Button variant={"ghost"} size={"iconSm"}>
            <Icons.Menu />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
