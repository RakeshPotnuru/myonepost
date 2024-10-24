import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/reusables/sidebar";
import { createClient } from "@/utils/supabase/client";

const handleSignOut = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return toast.error("Failed to sign out. Please try again.");
  }

  return window.location.reload();
};

export default function MoreActions() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size={"lg"}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            tooltip={"More"}
          >
            <Icons.More />
            <span>More</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Icons.Sun />
            Toggle Appearance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <Icons.Logout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
