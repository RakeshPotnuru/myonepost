import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type MeResponse =
  | (Omit<Tables<"users">, "email"> & {
      subscribed_to: Pick<Tables<"subscribers">, "subscribed_to_id">[];
      likes: Pick<Tables<"post_likes">, "post_id">[];
    })
  | null;

interface IUserState {
  user: MeResponse;
  setUser: (user: MeResponse) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface IUserActions {
  updateUser: (user: Partial<MeResponse>) => void;
  addSubscriber: (targetId: string) => void;
  removeSubscriber: (targetId: string) => void;
  addPostLike: (postId: string) => void;
  removePostLike: (postId: string) => void;
}

const useUserStore = create<IUserState & IUserActions>()(
  immer((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isLoading: true,
    setIsLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    updateUser: (user) =>
      set((state) => {
        if (state.user) {
          state.user = {
            ...state.user,
            ...user,
          };
        }
      }),
    addSubscriber: (targetId) =>
      set((state) => {
        state.user?.subscribed_to.push({ subscribed_to_id: targetId });
      }),
    removeSubscriber: (targetId) =>
      set((state) => {
        if (state.user) {
          state.user.subscribed_to = state.user.subscribed_to.filter(
            (sub) => sub.subscribed_to_id !== targetId,
          );
        }
      }),
    addPostLike: (postId) =>
      set((state) => {
        if (state.user) {
          state.user.likes.push({ post_id: postId });
        }
      }),
    removePostLike: (postId) =>
      set((state) => {
        if (state.user) {
          state.user.likes = state.user.likes.filter(
            (like) => like.post_id !== postId,
          );
        }
      }),
  })),
);

export default useUserStore;
