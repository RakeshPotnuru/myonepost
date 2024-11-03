import Link from "next/link";

import { Icons } from "@/assets/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import type { CommentResponse } from "@/lib/store/comment";
import { getBrowserLocale } from "@/utils/get-locale";
import { getRelativeTime } from "@/utils/get-relative-time";

import MoreMenu from "./more-menu";

interface CommentCardProps extends CommentResponse {}

export default function CommentCard({
  author,
  created_at,
  like_count,
  text,
}: Readonly<CommentCardProps>) {
  const { avatar_url, username } = author;
  return (
    <div className="flex gap-2">
      <Link href={`@${username}`}>
        <Avatar className="h-6 w-6 flex-none">
          <AvatarImage src={avatar_url ?? ""} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex grow flex-col gap-2">
        <p>
          <Link
            href={`@${username}`}
            className="text-muted-foreground hover:opacity-80"
          >
            @{username}
          </Link>{" "}
          {text}
        </p>
        <div className="flex flex-row gap-2 text-xs text-muted-foreground">
          <span>
            ·{" "}
            <time dateTime={created_at.toString()}>
              {getRelativeTime(new Date(created_at))}
            </time>
          </span>
          <span>
            ·{" "}
            {Intl.NumberFormat(getBrowserLocale(), {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(like_count)}{" "}
            likes
          </span>
        </div>
      </div>
      <div className="flex flex-none flex-col">
        <Tooltip text="Dislike">
          <Button variant={"ghost"} size={"iconXs"}>
            <Icons.Liked />
          </Button>
        </Tooltip>
        <MoreMenu />
      </div>
    </div>
  );
}
