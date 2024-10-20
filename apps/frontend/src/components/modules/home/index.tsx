"use client";

import { useEffect } from "react";

import Footer from "@/components/common/layouts/footer";
import { SidebarProvider } from "@/components/ui/reusables/sidebar";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

import Feed from "./feed";
import AppSidebar from "./sidebar";

export default function HomePage() {
  const { setUser } = useUserStore();

  const { data } = client.useQuery("get", "/user/me");

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-row justify-end">
        <div className="basis-2/3 px-20">
          <Feed />
        </div>
        <div className="basis-1/3">
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
