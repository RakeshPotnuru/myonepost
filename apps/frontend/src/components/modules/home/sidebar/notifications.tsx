import { Icons } from "@/assets/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarButton from "./sidebar-button";

export default function Notifications() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SidebarButton
          name="Notifications"
          icon={<Icons.Notification className="mr-4 h-6 w-6" />}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
