import MuxPlayer from "@mux/mux-player-react";

import { CardContent } from "@/components/ui/reusables/card";
import { siteConfig } from "@/config/site";

export default function VideoContent() {
  return (
    <CardContent className="p-0 pb-4">
      <MuxPlayer
        playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
        maxResolution="720p"
        muted
        accentColor={siteConfig.theme.color}
      />
    </CardContent>
  );
}
