import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { CardDescription, CardTitle } from "@/components/ui/reusables/card";
import useFeedStore from "@/lib/store/feed";
import { getRelativeTime } from "@/utils/get-relative-time";

import Like from "../like";
import MoreMenu from "../more-menu";

export default function PostAuthor() {
  const { activePost } = useFeedStore();

  if (!activePost) return null;

  const { author, created_at, media_caption, like_count, id } = activePost;
  const { username, display_name, avatar_url } = author;

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between">
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
        <div className="flex flex-row gap-1 text-muted-foreground">
          <Like likeCount={like_count} postId={id} />
          <MoreMenu author={author} id={id} />
        </div>
      </div>
      {media_caption && (
        <p className="text-sm text-muted-foreground">{media_caption}</p>
      )}
    </div>
  );
}
