import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "next-themes";

import { Images } from "@/assets/images";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/reusables/sidebar";

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();
  const { state } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={""}>
            {state === "collapsed" ? (
              <Image
                src={Images.logoIcon}
                alt="My One Post logo"
                width={30}
                height={30}
                className="rounded-md"
              />
            ) : (
              mounted && (
                <Image
                  src={
                    theme === "light"
                      ? Images.logoFullLight
                      : Images.logoFullDark
                  }
                  alt="My One Post logo"
                  width={150}
                  height={50}
                />
              )
            )}
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
