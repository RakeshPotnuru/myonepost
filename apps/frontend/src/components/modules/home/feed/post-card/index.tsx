import Image from "next/image";

import { Icons } from "@/assets/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TextContent from "./text-content";

export default function PostCard({
  postType,
}: Readonly<{
  postType: "text" | "image" | "video" | "audio";
}>) {
  let component = null;
  switch (postType) {
    case "text": {
      component = <TextContent />;
      break;
    }
    case "image": {
      component = (
        <CardContent className="p-0 pb-4">
          <AspectRatio
            ratio={16 / 9}
            className={"rounded-t-xl bg-[url('https://images.unsplash.com/photo-1727056354046-763e34286a8a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"}
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
      break;
    }
    default: {
      break;
    }
  }

  return (
    <Card>
      {component}
      <div className="flex flex-row justify-between *:p-4 *:pt-0">
        <CardHeader>
          <div className="flex flex-row items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/rakeshpotnuru.png" />
              <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div className="">
              <CardTitle>Display Name</CardTitle>
              <CardDescription>@username</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="text-muted-foreground">
          <Button variant={"ghost"} size={"sm"}>
            <Icons.Like className="mr-1" /> 100k
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <Icons.Comment className="mr-1" /> 10
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <Icons.Bookmark className="mr-1" /> 10
          </Button>
          <Button variant={"ghost"} size={"iconSm"}>
            <Icons.Menu />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
