"use client";

import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { createClient } from "@/utils/supabase/client";

import SidebarButton from "./sidebar-button";

const handleSignOut = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return toast.error("Failed to sign out. Please try again.");
  }

  return window.location.reload();
};

export default function Logout() {
  return (
    <SidebarButton
      onClick={handleSignOut}
      name="Logout"
      icon={<Icons.Logout className="mr-4 h-6 w-6" />}
    />
  );
}
