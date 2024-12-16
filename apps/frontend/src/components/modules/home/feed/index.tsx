import { useEffect } from "react";

import type { FeedType } from "@1post/shared";

import { Tabs } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";
import { createClient } from "@/utils/supabase/client";

import { CreatePostBlock } from "../sidebar/create";
import FeedTabsList from "./common/tabs-list";
import FreshFeed from "./fresh-feed";
import SubscribedFeed from "./subscribed-feed";
import TrendingFeed from "./trending-feed";

export default function Feed() {
  const { deletePost, activeFeedType, setActiveFeedType } = useFeedStore();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("delete-post")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          deletePost(payload.old.id as string);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [deletePost]);

  return (
    <Tabs
      defaultValue={activeFeedType}
      onValueChange={(v) => setActiveFeedType(v as FeedType)}
    >
      <FeedTabsList />
      <CreatePostBlock className="mt-2 md:hidden" />
      <TrendingFeed />
      <FreshFeed />
      <SubscribedFeed />
    </Tabs>
  );
}
