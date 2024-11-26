import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type PageResponse = {
  id: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  display_name: string;
  bio: null;
  avatar_url: string;
  url: null;
  subscriber_count: number;
  email?: string;
  is_private?: boolean;
  next_post_allowed_at?: Date;
  post: Post | null;
} | null;

export interface Post {
  id: string;
  created_at: Date;
  updated_at: Date;
  post_type: string;
  text: null;
  media_url: string;
  media_caption: string;
  comment_count: number;
  like_count: number;
  status?: string;
}

interface IPageState {
  page: PageResponse;
  setPage: (page: PageResponse) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface IPageActions {
  updatePage: (page: PageResponse) => void;
}

const usePageStore = create<IPageState & IPageActions>()(
  immer((set) => ({
    page: null,
    setPage: (page) => set({ page }),
    isLoading: true,
    setIsLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    updatePage: (page) =>
      set((state) => {
        state.page = page;
      }),
  })),
);

export default usePageStore;
