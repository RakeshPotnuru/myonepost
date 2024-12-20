"use client";

import { useEffect } from "react";
import Link from "next/link";

import { usePostHog } from "posthog-js/react";

import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import { siteConfig } from "@/config/site";
import type { Post } from "@/lib/store/page";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";

import Logo from "../auth/logo";
import { useGetMe } from "../home/api/user";
import { useGetPage } from "./api/page";
import PageBody from "./page-body";

interface ProfilePageProps {
  username: string;
}

export default function ProfilePage({ username }: Readonly<ProfilePageProps>) {
  const { data, isFetching } = useGetPage(username);
  const { data: user, isFetching: isUserFetching } = useGetMe();
  const { setPage, setIsLoading, updatePost } = usePageStore();
  const { setUser, setIsLoading: setIsUserLoading } = useUserStore();
  const posthog = usePostHog();

  useEffect(() => {
    document.title = `${(!isFetching && data?.display_name) || ""} (@${username}) | ${siteConfig.title}`;
  }, [username, data?.display_name, isFetching]);

  useEffect(() => {
    if (data) {
      setPage(data);
      setIsLoading(false);
    }
  }, [data, setPage, setIsLoading]);

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsUserLoading(false);
      posthog.identify(user.username);
    }
  }, [user, setUser, setIsUserLoading, posthog]);

  useEffect(() => {
    if (data?.username !== username) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel("update-post")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
          filter: `user_id=eq.${user?.id}`,
        },
        (payload: { new: Post }) => {
          updatePost({
            status: payload.new.status,
            media_url: payload.new.media_url,
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [updatePost, user, data?.username, username]);

  return (
    <Center className="flex flex-col space-y-8">
      <div className="mt-10 flex w-full flex-col space-y-4 px-5 text-center sm:px-10 lg:w-1/2 lg:px-0">
        {isFetching || isUserFetching ? (
          <Skeleton className="h-96" />
        ) : (
          <PageBody />
        )}
        <Link href={"/"} passHref>
          <Button>Explore more posts</Button>
        </Link>
      </div>
      <Logo />
    </Center>
  );
}
