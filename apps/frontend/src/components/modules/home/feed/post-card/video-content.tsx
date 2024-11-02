import MuxPlayer from "@mux/mux-player-react/lazy";

import { siteConfig } from "@/config/site";
import type { FeedResponse } from "@/lib/store/feed";
import { cn } from "@/utils/cn";

interface VideoContentProps extends React.HTMLAttributes<HTMLSlotElement> {}

export default function VideoContent({
  className,
  id,
  media_caption,
  media_url,
  author,
  ...props
}: VideoContentProps &
  Pick<FeedResponse, "media_url" | "media_caption" | "id" | "author">) {
  return (
    <slot onClick={(e) => e.stopPropagation()} {...props}>
      <MuxPlayer
        playbackId={media_url ?? ""}
        metadata={{
          video_id: id,
          video_title: media_caption,
          viewer_user_id: author.id,
        }}
        maxResolution="720p"
        muted
        accentColor={siteConfig.theme.color}
        title={media_caption ?? ""}
        className={cn(
          "aspect-video rounded-t-xl overflow-hidden shadow-xl",
          className,
        )}
      />
    </slot>
  );
}
