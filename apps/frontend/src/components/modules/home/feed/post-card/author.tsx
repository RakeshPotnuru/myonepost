import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { CardDescription, CardTitle } from "@/components/ui/reusables/card";
import type { FeedResponse } from "@/lib/store/feed";
import { getRelativeTime } from "@/utils/get-relative-time";

interface IAuthorProps extends Pick<FeedResponse, "author" | "created_at"> {}

export default function Author({
  author: { avatar_url, display_name, username },
  created_at,
}: IAuthorProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Link href={`@${username}`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar_url ?? ""} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <CardTitle>{display_name}</CardTitle>
        <CardDescription>
          <Link href={`@${username}`} className="hover:underline">
            @{username}
          </Link>{" "}
          ·{" "}
          <time dateTime={created_at.toString()}>
            {getRelativeTime(new Date(created_at))}
          </time>
        </CardDescription>
      </div>
    </div>
  );
}
