import { useEffect, useState } from "react";

import { FeedType } from "@1post/shared";

import { Tabs } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";
import { createClient } from "@/utils/supabase/client";

import FreshFeed from "./fresh-feed";
import SubscribedFeed from "./subscribed-feed";
import FeedTabsList from "./tabs-list";
import TrendingFeed from "./trending-feed";

export default function Feed() {
  const [activeTab, setActiveTab] = useState(FeedType.TRENDING);

  const { deletePost } = useFeedStore();

  useEffect(() => {
    const client = createClient();

    const channel = client
      .channel("custom-delete-channel")
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
      channel.unsubscribe().catch(() => {});
    };
  }, [deletePost]);

  return (
    <Tabs
      defaultValue={FeedType.TRENDING}
      onValueChange={(v) => setActiveTab(v as FeedType)}
    >
      <FeedTabsList />
      <TrendingFeed activeTab={activeTab} />
      <FreshFeed activeTab={activeTab} />
      <SubscribedFeed activeTab={activeTab} />
    </Tabs>
  );
}
