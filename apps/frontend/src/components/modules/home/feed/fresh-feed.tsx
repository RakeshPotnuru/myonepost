import { useEffect, useState } from "react";

import { FeedType } from "@1post/shared";
import { PostStatus } from "@prisma/client";

import { TabsContent } from "@/components/ui/reusables/tabs";
import type { FeedResponse } from "@/lib/store/feed";
import useFeedStore from "@/lib/store/feed";
import { createClient } from "@/utils/supabase/client";

import { useGetFreshFeed } from "./api/feed";
import EmptyState from "./common/empty-state";
import Loading from "./common/loading";
import ShowNewPosts from "./common/show-new-posts";
import PostCard from "./post-card";

export default function FreshFeed() {
  const [newPosts, setNewPosts] = useState<FeedResponse[]>([]);

  const { setFreshFeed, freshFeed, activeFeedType, addFreshPosts } =
    useFeedStore();
  const { data, isFetching } = useGetFreshFeed(activeFeedType);

  useEffect(() => {
    if (data) {
      setFreshFeed(data);
    }
  }, [data, setFreshFeed]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("posts:fresh")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: `status=eq.${PostStatus.APPROVED}`,
        },
        async (payload) => {
          const post = payload.new as unknown as Omit<
            FeedResponse,
            "author"
          > & { user_id: string };

          const { data: user } = await supabase
            .from("users")
            .select(
              `
              id,
              username,
              display_name,
              avatar_url
              `,
            )
            .eq("id", post.user_id)
            .limit(1)
            .single();

          if (!user) {
            return;
          }

          setNewPosts((prev) => [
            {
              ...post,
              author: user,
            },
            ...prev,
          ]);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const handleShowNewPosts = () => {
    addFreshPosts(newPosts);
    setNewPosts([]);
  };

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.FRESH} className="space-y-2 pb-2">
      <ShowNewPosts
        postsLength={newPosts.length}
        onClick={handleShowNewPosts}
      />
      {freshFeed.length > 0 ? (
        freshFeed.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
