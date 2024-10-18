import { Icons } from "@/assets/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import { CardDescription, CardTitle } from "@/components/ui/reusables/card";
import { Tooltip } from "@/components/ui/reusables/tooltip";

export default function PostAuthor() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between">
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
        <div className="text-muted-foreground">
          <Tooltip text="Dislike">
            <Button variant={"ghost"} size={"sm"}>
              <Icons.Liked className="mr-1" /> 100k
            </Button>
          </Tooltip>
          <Tooltip text="More">
            <Button variant={"ghost"} size={"iconSm"}>
              <Icons.Menu />
            </Button>
          </Tooltip>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis p
      </p>
    </div>
  );
}
