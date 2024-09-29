import Link from "next/link";

import { Icons } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Create from "./create";
import Notifications from "./notifications";
import SidebarButton from "./sidebar-button";

export default function Sidebar() {
  return (
    <div className="sticky top-0 h-dvh p-6">
      {/* <Image src={"/myonepost logo text.png"} alt="" width={400} height={100} /> */}
      <p>myonepost</p>
      <div className="flex h-full w-min flex-col items-start justify-between py-4">
        <div className="flex flex-col items-start space-y-2">
          <Create />
          <Notifications />
          <Link href={"/@username"} className="w-full" passHref>
            <SidebarButton
              name="My Page"
              icon={
                <Avatar className="mr-4 h-6 w-6">
                  <AvatarImage src="https://github.com/rakeshpotnuru.png" />
                  <AvatarFallback>RP</AvatarFallback>
                </Avatar>
              }
            />
          </Link>
        </div>
        <SidebarButton
          name="Logout"
          icon={<Icons.Logout className="mr-4 h-6 w-6" />}
        />
      </div>
    </div>
  );
}
