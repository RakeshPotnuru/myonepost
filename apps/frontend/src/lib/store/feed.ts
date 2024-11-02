/* eslint-disable security/detect-object-injection */

import { FeedType } from "@1post/shared";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type FeedResponse = Pick<
  Tables<"posts">,
  | "id"
  | "created_at"
  | "post_type"
  | "text"
  | "media_url"
  | "media_caption"
  | "comment_count"
  | "like_count"
> & {
  author: Pick<
    Tables<"users">,
    "id" | "username" | "display_name" | "avatar_url"
  >;
};

interface IFeedState {
  trendingFeed: FeedResponse[];
  setTrendingFeed: (feed: FeedResponse[]) => void;
  freshFeed: FeedResponse[];
  setFreshFeed: (feed: FeedResponse[]) => void;
  subscribedFeed: FeedResponse[];
  setSubscribedFeed: (feed: FeedResponse[]) => void;
}

interface IFeedActions {
  addLike: (postId: string, feedType: FeedType) => void;
  removeLike: (postId: string, feedType: FeedType) => void;
}
const updateFeedLike = (feed: FeedResponse[], postId: string) => {
  const postIndex = feed.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    feed[postIndex] = {
      ...feed[postIndex],
      like_count: (feed[postIndex].like_count || 0) + 1,
    };
  }
};

const updateFeedRemoveLike = (feed: FeedResponse[], postId: string) => {
  const postIndex = feed.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    feed[postIndex] = {
      ...feed[postIndex],
      like_count: Math.max((feed[postIndex].like_count || 0) - 1, 0),
    };
  }
};
const useFeedStore = create<IFeedState & IFeedActions>()(
  immer((set) => ({
    trendingFeed: [],
    setTrendingFeed: (feed) => set({ trendingFeed: feed }),
    freshFeed: [],
    setFreshFeed: (feed) => set({ freshFeed: feed }),
    subscribedFeed: [],
    setSubscribedFeed: (feed) => set({ subscribedFeed: feed }),
    addLike: (postId, feedType) =>
      set((state) => {
        switch (feedType) {
          case FeedType.TRENDING: {
            updateFeedLike(state.trendingFeed, postId);
            break;
          }
          case FeedType.FRESH: {
            updateFeedLike(state.freshFeed, postId);
            break;
          }
          case FeedType.SUBSCRIBED: {
            updateFeedLike(state.subscribedFeed, postId);
            break;
          }
        }
      }),
    removeLike: (postId, feedType) =>
      set((state) => {
        switch (feedType) {
          case FeedType.TRENDING: {
            updateFeedRemoveLike(state.trendingFeed, postId);
            break;
          }
          case FeedType.FRESH: {
            updateFeedRemoveLike(state.freshFeed, postId);
            break;
          }
          case FeedType.SUBSCRIBED: {
            updateFeedRemoveLike(state.subscribedFeed, postId);
            break;
          }
        }
      }),
  })),
);

export default useFeedStore;
