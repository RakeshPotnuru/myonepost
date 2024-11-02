import Image from "next/image";

import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import type { FeedResponse } from "@/lib/store/feed";

type ImageContentProps = Pick<
  FeedResponse,
  "media_url" | "media_caption" | "author"
>;

export default function ImageContent({
  media_url,
  media_caption,
  author,
}: Readonly<ImageContentProps>) {
  return (
    <AspectRatio
      ratio={16 / 9}
      style={{ ["--image-url" as string]: `url(${media_url})` }}
      className={
        "rounded-t-xl bg-[image:var(--image-url)] bg-cover bg-no-repeat"
      }
    >
      <Image
        src={media_url ?? ""}
        alt={media_caption ?? `Photo by @${author.username}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="aspect-video h-full w-full rounded-t-xl object-contain backdrop-blur-md"
        priority={false}
      />
    </AspectRatio>
  );
}
