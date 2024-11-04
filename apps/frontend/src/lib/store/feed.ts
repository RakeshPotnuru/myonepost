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
  activePost: FeedResponse | null;
  setActivePost: (post: FeedResponse) => void;
  activeFeedType: FeedType;
  setActiveFeedType: (feedType: FeedType) => void;
}

interface IFeedActions {
  incrementLikes: (postId: string, feedType: FeedType) => void;
  decrementLikes: (postId: string, feedType: FeedType) => void;
  deletePost: (postId: string) => void;
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
    activePost: null,
    setActivePost: (post) => set({ activePost: post }),
    activeFeedType: FeedType.TRENDING,
    setActiveFeedType: (feedType) => set({ activeFeedType: feedType }),
    incrementLikes: (postId, feedType) =>
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

        if (state.activePost?.id === postId) {
          state.activePost = {
            ...state.activePost,
            like_count: (state.activePost?.like_count || 0) + 1,
          };
        }
      }),
    decrementLikes: (postId, feedType) =>
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

        if (state.activePost?.id === postId) {
          state.activePost = {
            ...state.activePost,
            like_count: Math.max((state.activePost?.like_count || 0) - 1, 0),
          };
        }
      }),
    deletePost: (postId) =>
      set((state) => {
        state.trendingFeed = state.trendingFeed.filter(
          (post) => post.id !== postId,
        );
        state.freshFeed = state.freshFeed.filter((post) => post.id !== postId);
        state.subscribedFeed = state.subscribedFeed.filter(
          (post) => post.id !== postId,
        );
      }),
  })),
);

export default useFeedStore;
