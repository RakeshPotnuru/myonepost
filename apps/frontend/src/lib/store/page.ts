import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type PageResponse = {
  id: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  url: string | null;
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
  text: string | null;
  media_url: string | null;
  media_caption: string | null;
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
  updatePage: (page: Partial<PageResponse>) => void;
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
        if (state.page) {
          state.page = {
            ...state.page,
            ...page,
          };
        }
      }),
  })),
);

export default usePageStore;
