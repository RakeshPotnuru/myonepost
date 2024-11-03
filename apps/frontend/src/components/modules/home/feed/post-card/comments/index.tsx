import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { Drawer, DrawerTrigger } from "@/components/ui/reusables/drawer";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import { getBrowserLocale } from "@/utils/get-locale";

import CommentContent from "./comment-content";

interface CommentProps {
  onSetActivePost: () => void;
  commentCount: number;
}

export default function Comments({
  onSetActivePost,
  commentCount,
}: Readonly<CommentProps>) {
  return (
    <Drawer>
      <DrawerTrigger onClick={onSetActivePost} asChild>
        <div className="flex items-center">
          <Tooltip text={"Comments"}>
            <Button variant={"ghost"} size={"iconSm"}>
              <Icons.Comment />
            </Button>
          </Tooltip>
          <p className="text-xs text-muted-foreground">
            {Intl.NumberFormat(getBrowserLocale(), {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(commentCount)}
          </p>
        </div>
      </DrawerTrigger>
      <CommentContent />
    </Drawer>
  );
}
