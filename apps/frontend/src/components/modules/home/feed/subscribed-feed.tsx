import { useEffect, useState } from "react";

import { FeedType, PostStatus } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import type { FeedResponse } from "@/lib/store/feed";
import useFeedStore from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";

import { useGetSubscribedFeed } from "./api/feed";
import EmptyState from "./common/empty-state";
import Loading from "./common/loading";
import ShowNewPosts from "./common/show-new-posts";
import PostCard from "./post-card";

export default function SubscribedFeed() {
  const [newPosts, setNewPosts] = useState<FeedResponse[]>([]);

  const {
    setSubscribedFeed,
    subscribedFeed,
    activeFeedType,
    addSubscribedPosts,
  } = useFeedStore();
  const { user } = useUserStore();
  const { data, isFetching } = useGetSubscribedFeed(activeFeedType);

  useEffect(() => {
    if (data) {
      setSubscribedFeed(data);
    }
  }, [data, setSubscribedFeed]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("posts:subscribed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: `user_id=in.(${user?.subscribed_to
            .map((s) => s.subscribed_to_id)
            .join(",")})`,
        },
        async (payload) => {
          const post = payload.new as unknown as Omit<
            FeedResponse,
            "author"
          > & { user_id: string; status: PostStatus };

          if (post.status !== PostStatus.APPROVED) {
            return;
          }

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
  }, [user?.subscribed_to]);

  const handleShowNewPosts = () => {
    addSubscribedPosts(newPosts);
    setNewPosts([]);
  };

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.SUBSCRIBED} className="space-y-2 pb-2">
      <ShowNewPosts
        postsLength={newPosts.length}
        onClick={handleShowNewPosts}
      />
      {subscribedFeed.length > 0 ? (
        subscribedFeed.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
