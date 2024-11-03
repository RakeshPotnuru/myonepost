import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import { Tooltip } from "@/components/ui/reusables/tooltip";

export default function MoreMenu() {
  return (
    <DropdownMenu>
      <Tooltip text="More">
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"iconXs"}>
            <Icons.Menu />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      ></DropdownMenuContent>
    </DropdownMenu>
  );
}
