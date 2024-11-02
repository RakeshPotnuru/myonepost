import { CONSTANTS } from "@1post/shared";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { FeedResponse } from "@/lib/store/feed";
import { createClient } from "@/utils/supabase/client";

const fetchTrendingFeed = async (): Promise<FeedResponse[]> => {
  const supabase = createClient();

  const { data } = await supabase
    .from("post_scores")
    .select(
      `
        score,
        post:posts (
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
        )
    `,
    )
    .order("score", {
      ascending: false,
    });

  const { data: currentUserSubscribedTo } = await supabase
    .from("subscribers")
    .select("subscribed_to_id");

  // add subscriber bonus to score
  const finalData = data
    ?.map((d) => {
      const subscriberBonus = currentUserSubscribedTo?.find(
        (s) => s.subscribed_to_id === d.post?.author?.id,
      )?.subscribed_to_id
        ? CONSTANTS.WEIGHTS.SUBSCRIBER_BONUS
        : 0;

      return {
        ...d,
        score: d.score + d.score * subscriberBonus,
      };
    })
    .sort((a, b) => b.score - a.score);

  return finalData?.map((d) => ({
    ...d.post,
    author: d.post?.author,
  })) as FeedResponse[];
};

export function useGetTrendingFeed() {
  return useQuery({
    queryKey: [queryKeys.trendingFeed],
    queryFn: fetchTrendingFeed,
  });
}

const fetchFreshFeed = async (): Promise<FeedResponse[]> => {
  const supabase = createClient();

  const { data } = await supabase
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
        status,
        author:users (
            id,
            username,
            display_name,
            avatar_url
        )
    `,
    )
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  return data?.map((d) => ({
    ...d,
    author: d.author,
  })) as FeedResponse[];
};

export function useGetFreshFeed() {
  return useQuery({
    queryKey: [queryKeys.freshFeed],
    queryFn: fetchFreshFeed,
  });
}

const fetchSubscribedFeed = async (): Promise<FeedResponse[]> => {
  const supabase = createClient();
  const { data: currentUserSubscribedTo } = await supabase
    .from("subscribers")
    .select("subscribed_to_id");

  const { data } = await supabase
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
    status,
    user_id,
    user:users (
      id,
      username,
      display_name,
      avatar_url
    ),
    post_score:post_scores (
      score
    )
  `,
    )
    .in(
      "user_id",
      currentUserSubscribedTo?.map((s) => s.subscribed_to_id) ?? [],
    )
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  const posts = data
    ?.map((post) => ({
      ...post,
      score: post.post_score?.[0].score || 0,
      post_score: undefined,
    }))
    .sort((a, b) => b.score - a.score);

  return posts?.map((d) => ({
    ...d,
    author: d.user,
  })) as FeedResponse[];
};

export function useGetSubscribedFeed() {
  return useQuery({
    queryKey: [queryKeys.subscribedFeed],
    queryFn: fetchSubscribedFeed,
  });
}
