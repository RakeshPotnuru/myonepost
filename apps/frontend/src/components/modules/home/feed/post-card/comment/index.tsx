import { Center } from "@/components/ui/center";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/reusables/drawer";
import { ScrollArea } from "@/components/ui/reusables/scroll-area";
import { Separator } from "@/components/ui/reusables/separator";
import { Tooltip } from "@/components/ui/reusables/tooltip";

import ImageContent from "../image-content";
import CommentCard from "./comment-card";
import CommentInputBox from "./comment-input-box";
import PostAuthor from "./post-author";

interface CommentProps extends React.HTMLAttributes<HTMLDialogElement> {}

export default function Comments({ children }: CommentProps) {
  return (
    <Drawer>
      <Tooltip text="Comments">
        <DrawerTrigger asChild>{children}</DrawerTrigger>
      </Tooltip>
      <DrawerContent
        className="h-[90dvh]"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex w-full flex-row gap-10 px-20 pt-5 *:h-[85dvh]">
          <ScrollArea className="w-2/3 p-4">
            <Center className="pointer-events-auto h-[80dvh] w-full">
              {/* <VideoContent
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="rounded-xl"
              /> */}

              <ImageContent />
            </Center>
          </ScrollArea>
          <ScrollArea className="relative w-1/3 rounded-lg border text-sm">
            <PostAuthor />
            <Separator />
            {/* <Center className="text-muted-foreground p-4">
              No comments yet
            </Center> */}
            <div className="space-y-4 p-4">
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <CommentInputBox />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
