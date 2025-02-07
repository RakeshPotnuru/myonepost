import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { SidebarMenuButton } from "@/components/ui/reusables/sidebar";
import useUserStore from "@/lib/store/user";

export default function MyPage() {
  const { user } = useUserStore();

  return (
    <Link href={user ? `@${user?.username}` : ""} passHref>
      <SidebarMenuButton size={"lg"} tooltip={"Your Page"}>
        <Avatar className="size-6">
          <AvatarImage src={user?.avatar_url ?? ""} />
          <AvatarFallback className="text-xs">
            {user?.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span>My Page</span>
      </SidebarMenuButton>
    </Link>
  );
}
