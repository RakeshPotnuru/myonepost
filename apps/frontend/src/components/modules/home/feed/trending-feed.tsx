import { useEffect, useState } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import type { FeedResponse } from "@/lib/store/feed";
import useFeedStore from "@/lib/store/feed";
import { createClient } from "@/utils/supabase/client";

import { useGetTrendingFeed } from "./api/feed";
import EmptyState from "./common/empty-state";
import Loading from "./common/loading";
import ShowNewPosts from "./common/show-new-posts";
import PostCard from "./post-card";

export default function TrendingFeed() {
  const [newPosts, setNewPosts] = useState<FeedResponse[]>([]);

  const { setTrendingFeed, trendingFeed, activeFeedType, addTrendingPosts } =
    useFeedStore();
  const { data, isFetching } = useGetTrendingFeed(activeFeedType);

  useEffect(() => {
    if (data) {
      setTrendingFeed(data);
    }
  }, [data, setTrendingFeed]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("posts:trending")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "post_scores",
        },
        async (payload) => {
          const newPost = payload.new as unknown as {
            post_id: string;
            score: number;
          };

          const { data: post } = await supabase
            .from("posts")
            .select(
              `
              id,
              created_at,
              post_type,
              text,
              media_url,
              media_caption,
              comment_count,
              like_count,
              author:users (
                  id,
                  username,
                  display_name,
                  avatar_url
              )
              `,
            )
            .eq("id", newPost.post_id)
            .limit(1)
            .single();

          if (!post) {
            return;
          }

          setNewPosts((prev) => {
            if (!post.author) return prev;

            return [
              {
                ...post,
                author: post.author,
              },
              ...prev,
            ];
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const handleShowNewPosts = () => {
    addTrendingPosts(newPosts);
    setNewPosts([]);
  };

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.TRENDING} className="space-y-2 pb-2">
      <ShowNewPosts
        postsLength={newPosts.length}
        onClick={handleShowNewPosts}
      />
      {trendingFeed.length > 0 ? (
        trendingFeed.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
