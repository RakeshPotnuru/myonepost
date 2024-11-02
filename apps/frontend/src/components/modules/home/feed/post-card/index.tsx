import type { FeedType } from "@1post/shared";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/reusables/card";
import type { FeedResponse } from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";
import { cn } from "@/utils/cn";

import AudioContent from "./audio-content";
import Author from "./author";
import Comments from "./comment";
import ImageContent from "./image-content";
import Like from "./like";
import MoreMenu from "./more-menu";
import TextContent from "./text-content";
import VideoContent from "./video-content";

interface IPostCardProps extends FeedResponse {
  feedType: FeedType;
}

export default function PostCard({
  author,
  comment_count,
  created_at,
  id,
  like_count,
  post_type,
  text,
  media_url,
  media_caption,
  feedType,
}: Readonly<IPostCardProps>) {
  let component = null;

  switch (post_type) {
    case "TEXT": {
      component = <TextContent text={text ?? ""} />;
      break;
    }
    case "IMAGE": {
      component = (
        <ImageContent
          author={author}
          media_url={media_url}
          media_caption={media_caption}
        />
      );
      break;
    }
    case "VIDEO": {
      component = (
        <VideoContent
          author={author}
          id={id}
          media_url={media_url}
          media_caption={media_caption}
        />
      );
      break;
    }
    case "AUDIO": {
      component = (
        <AudioContent
          author={author}
          id={id}
          media_url={media_url}
          media_caption={media_caption}
        />
      );
      break;
    }
    default: {
      break;
    }
  }

  const { user } = useUserStore();

  return (
    <Card>
      <CardContent
        className={cn("p-0 pb-4", {
          "p-4": post_type === "TEXT",
        })}
      >
        {component}
      </CardContent>
      <div className="flex flex-row justify-between *:p-4 *:pt-0">
        <CardHeader>
          <Author author={author} created_at={created_at} />
        </CardHeader>
        <CardFooter className="gap-1 text-muted-foreground">
          <Like likeCount={like_count} postId={id} feedType={feedType} />
          <Comments commentCount={comment_count} />
          {user?.id !== author.id && <MoreMenu author={author} id={id} />}
        </CardFooter>
      </div>
    </Card>
  );
}
