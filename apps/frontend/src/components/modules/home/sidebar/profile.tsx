import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { SidebarMenuButton } from "@/components/ui/reusables/sidebar";

export default function Profile() {
  return (
    <SidebarMenuButton size={"lg"} tooltip={"Your Page"}>
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/rakeshpotnuru.png" />
        <AvatarFallback>RP</AvatarFallback>
      </Avatar>
      <span>Your Page</span>
    </SidebarMenuButton>
  );
}
