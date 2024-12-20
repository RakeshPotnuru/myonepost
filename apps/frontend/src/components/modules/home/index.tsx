"use client";

import { useEffect } from "react";

import { usePostHog } from "posthog-js/react";

import Footer from "@/components/common/layouts/footer";
import { SidebarProvider } from "@/components/ui/reusables/sidebar";
import useUserStore from "@/lib/store/user";

import { useGetMe } from "./api/user";
import Feed from "./feed";
import AppSidebar from "./sidebar";

export default function HomePage() {
  const posthog = usePostHog();
  const { setUser, setIsLoading } = useUserStore();

  const { data } = useGetMe();

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsLoading(false);
      posthog.identify(data.username, {
        username: data.username,
      });
    }
  }, [data, setUser, setIsLoading, posthog]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-row justify-center lg:mx-10 lg:gap-10 xl:mx-20 xl:gap-20">
        <div className="mx-5 mb-12 w-full md:mx-20 lg:mx-0 lg:basis-1/2">
          <Feed />
        </div>
        <div className="hidden basis-1/3 lg:block">
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
