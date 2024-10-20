import { Icons } from "@/assets/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/reusables/sheet";
import { SidebarMenuButton } from "@/components/ui/reusables/sidebar";

export default function Notifications() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SidebarMenuButton size={"lg"} tooltip={"Notification"}>
          <Icons.Notification />
          <span>Notifications</span>
        </SidebarMenuButton>
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
