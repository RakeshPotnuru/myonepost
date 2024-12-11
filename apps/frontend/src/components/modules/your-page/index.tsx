"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";
import { Skeleton } from "@/components/ui/reusables/skeleton";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";

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
  const { setPage, setIsLoading } = usePageStore();
  const { setUser, setIsLoading: setIsUserLoading } = useUserStore();

  useEffect(() => {
    if (data) {
      setPage(data);
      setIsLoading(false);
    }
    if (user) {
      setUser(user);
      setIsUserLoading(false);
    }
  }, [data, setPage, setIsLoading, setIsUserLoading, user, setUser]);

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
