import { PostType } from "@prisma/client";
import { format } from "date-fns";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import type { FeedResponse } from "@/lib/store/feed";

import AudioContent from "../home/feed/post-card/audio-content";
import ImageContent from "../home/feed/post-card/image-content";
import TextContent from "../home/feed/post-card/text-content";
import VideoContent from "../home/feed/post-card/video-content";
import { useGetArchive } from "./api/page";

interface ArchiveProps {
  username: string;
  author: Pick<FeedResponse, "author">["author"];
}

export default function Archive({ username, author }: Readonly<ArchiveProps>) {
  const { data, isFetching } = useGetArchive(username);

  return (
    <div className="space-y-4">
      <Heading level={3}>Archive</Heading>
      <div className="grid grid-cols-3 gap-2">
        {isFetching
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={`skeleton-${i + 1}`} className="h-36" />
            ))
          : data?.map((post) => {
              let postComponent;
              switch (post.post_type) {
                case PostType.TEXT: {
                  postComponent = <TextContent text={post.text ?? ""} />;
                  break;
                }
                case PostType.IMAGE: {
                  postComponent = (
                    <ImageContent
                      author={author}
                      media_url={post.media_url}
                      media_caption={post.media_caption}
                      className="rounded-xl"
                    />
                  );
                  break;
                }
                case PostType.VIDEO: {
                  postComponent = (
                    <VideoContent
                      author={author}
                      id={post.id}
                      media_url={post.media_url}
                      media_caption={post.media_caption}
                      className="rounded-xl"
                    />
                  );
                  break;
                }
                case PostType.AUDIO: {
                  postComponent = (
                    <AudioContent
                      author={author}
                      id={post.id}
                      media_url={post.media_url}
                      media_caption={post.media_caption}
                      className="rounded-xl"
                    />
                  );
                  break;
                }
                default: {
                  break;
                }
              }

              return (
                <div
                  key={post.id}
                  className="flex h-full flex-col rounded-lg border p-2"
                >
                  {postComponent}
                  <div className="mt-auto flex justify-between font-semibold text-muted-foreground">
                    <time dateTime={post.created_at}>
                      {format(post.created_at, "dd MMM, yyyy")}
                    </time>
                    <div className="flex flex-row items-center gap-1">
                      <Icons.Liked color="#F44336" /> {post.like_count}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
