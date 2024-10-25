import MuxPlayer from "@mux/mux-player-react/lazy";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

interface VideoContentProps extends React.HTMLAttributes<HTMLSlotElement> {}

export default function VideoContent({
  className,
  ...props
}: VideoContentProps) {
  return (
    <slot onClick={(e) => e.stopPropagation()} {...props}>
      <MuxPlayer
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
        maxResolution="720p"
        muted
        accentColor={siteConfig.theme.color}
        title="Test video title"
        className={cn(
          "aspect-video rounded-t-xl overflow-hidden shadow-xl",
          className,
        )}
      />
    </slot>
  );
}
