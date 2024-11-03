import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/reusables/card";
import type { FeedResponse } from "@/lib/store/feed";
import useFeedStore from "@/lib/store/feed";
import { cn } from "@/utils/cn";

import AudioContent from "./audio-content";
import Author from "./author";
import Comments from "./comments";
import ImageContent from "./image-content";
import Like from "./like";
import MoreMenu from "./more-menu";
import TextContent from "./text-content";
import VideoContent from "./video-content";

interface IPostCardProps extends FeedResponse {}

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
}: Readonly<IPostCardProps>) {
  const { setActivePost } = useFeedStore();

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

  const handleSetActivePost = () =>
    setActivePost({
      author,
      created_at,
      id,
      like_count,
      post_type,
      text,
      media_url,
      media_caption,
      comment_count,
    });

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
          <Like likeCount={like_count} postId={id} />
          <Comments
            onSetActivePost={handleSetActivePost}
            commentCount={comment_count}
          />
          <MoreMenu author={author} id={id} />
        </CardFooter>
      </div>
    </Card>
  );
}
