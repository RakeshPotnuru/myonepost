import Image from "next/image";

import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import type { FeedResponse } from "@/lib/store/feed";
import { cn } from "@/utils/cn";

interface ImageContentProps
  extends Pick<FeedResponse, "media_url" | "media_caption" | "author"> {}

export default function ImageContent({
  media_url,
  media_caption,
  author,
  className,
}: Readonly<ImageContentProps & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <AspectRatio
      ratio={16 / 9}
      style={{ ["--image-url" as string]: `url(${media_url})` }}
      className={cn(
        "rounded-t-xl bg-[image:var(--image-url)] bg-cover bg-no-repeat",
        className,
      )}
    >
      <Image
        src={media_url ?? ""}
        alt={media_caption ?? `Photo by @${author.username}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "aspect-video h-full w-full rounded-t-xl object-contain backdrop-blur-md",
          className,
        )}
        priority={false}
      />
    </AspectRatio>
  );
}
