import { Icons } from "@/assets/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/reusables/card";
import { Tooltip } from "@/components/ui/reusables/tooltip";

import AudioContent from "./audio-content";
import ImageContent from "./image-content";
import TextContent from "./text-content";
import VideoContent from "./video-content";

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
      component = <ImageContent />;
      break;
    }
    case "video": {
      component = <VideoContent />;
      break;
    }
    case "audio": {
      component = <AudioContent />;
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
            <div>
              <CardTitle>Display Name</CardTitle>
              <CardDescription>@username</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="text-muted-foreground">
          <Tooltip text="Dislike">
            <Button variant={"ghost"} size={"sm"}>
              <Icons.Liked className="mr-1" /> 100k
            </Button>
          </Tooltip>
          <Tooltip text="Comment">
            <Button variant={"ghost"} size={"sm"}>
              <Icons.Comment className="mr-1" /> 10
            </Button>
          </Tooltip>
          <Tooltip text="Views">
            <Button variant={"ghost"} size={"sm"}>
              <Icons.Views className="mr-1" /> 10
            </Button>
          </Tooltip>
          <Tooltip text="More">
            <Button variant={"ghost"} size={"iconSm"}>
              <Icons.Menu />
            </Button>
          </Tooltip>
        </CardFooter>
      </div>
    </Card>
  );
}
