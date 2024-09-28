import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardContent } from "@/components/ui/card";

export default function ImageContent() {
  return (
    <CardContent className="p-0 pb-4">
      <AspectRatio
        ratio={16 / 9}
        className={
          "rounded-t-xl bg-[url('https://images.unsplash.com/photo-1727056354046-763e34286a8a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1727056354046-763e34286a8a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by Drew Beamer"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full rounded-t-xl object-contain backdrop-blur-md"
          priority={false}
        />
      </AspectRatio>
    </CardContent>
  );
}
