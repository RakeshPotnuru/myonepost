import { useEffect } from "react";
import Image from "next/image";

import { Center } from "@/components/ui/center";
import { DrawerContent } from "@/components/ui/reusables/drawer";
import { ScrollArea } from "@/components/ui/reusables/scroll-area";
import { Separator } from "@/components/ui/reusables/separator";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import useCommentStore from "@/lib/store/comment";
import useFeedStore from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";

import AudioContent from "../audio-content";
import TextContent from "../text-content";
import VideoContent from "../video-content";
import { useGetPostComments } from "./api/comments";
import CommentCard from "./comment-card";
import CommentInputBox from "./comment-input-box";
import PostAuthor from "./post-author";

export default function CommentContent() {
  const { activePost } = useFeedStore();
  const { data, isFetching } = useGetPostComments(activePost?.id);
  const { comments, setComments, setLikedComments } = useCommentStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (data) {
      setComments(data.comments);
      setLikedComments(data.likedComments);
    }
  }, [data, setComments, setLikedComments]);

  if (!activePost) return null;

  const commentsView =
    comments.length > 0 ? (
      <div className="space-y-4 p-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>
    ) : (
      <Center className="h-24 text-muted-foreground">No comments yet</Center>
    );

  const { author, media_caption, id, post_type, text, media_url } = activePost;

  let component = null;

  switch (post_type) {
    case "TEXT": {
      component = <TextContent text={text ?? ""} />;
      break;
    }
    case "IMAGE": {
      component = (
        <Image
          src={media_url ?? ""}
          alt={media_caption ?? `Photo by @${author.username}`}
          fill
          className="h-full w-full object-contain"
          priority={false}
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
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="rounded-xl"
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
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="rounded-xl"
        />
      );
      break;
    }
    default: {
      break;
    }
  }

  const isCommented = comments.some(
    (comment) => comment.author.id === user?.id,
  );

  return (
    <DrawerContent
      className="h-[90dvh]"
      onCloseAutoFocus={(e) => e.preventDefault()}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div className="flex w-full flex-row gap-10 pt-5 *:h-[85dvh] sm:px-10 md:px-20">
        <ScrollArea className="hidden w-2/3 p-4 lg:block">
          <Center className="pointer-events-auto h-[80dvh] w-full">
            {component}
          </Center>
        </ScrollArea>
        <ScrollArea className="relative w-full rounded-none rounded-t-lg border text-sm sm:rounded-lg lg:w-1/3">
          <PostAuthor />
          <Separator />
          {isFetching ? (
            <div className="space-y-4 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={`comment-skeleton-${i + 1}`}
                  className="h-24 w-full"
                />
              ))}
            </div>
          ) : (
            commentsView
          )}
          <div className="absolute inset-x-0 bottom-0 border-t p-4">
            {isCommented ? (
              <Center className="text-muted-foreground">
                You already commented
              </Center>
            ) : (
              <CommentInputBox postId={id} />
            )}
          </div>
        </ScrollArea>
      </div>
    </DrawerContent>
  );
}
