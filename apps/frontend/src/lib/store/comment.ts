import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type CommentResponse = Pick<
  Tables<"comments">,
  "id" | "created_at" | "text" | "like_count"
> & {
  author: Pick<Tables<"users">, "id" | "username" | "avatar_url">;
};

interface ICommentState {
  comments: CommentResponse[];
  setComments: (comments: CommentResponse[]) => void;
}

interface ICommentActions {
  addComment: (comment: CommentResponse) => void;
  deleteComment: (commentId: string) => void;
  incrementLikes: (commentId: string) => void;
  decrementLikes: (commentId: string) => void;
}

const useCommentStore = create<ICommentState & ICommentActions>()(
  immer((set) => ({
    comments: [],
    setComments: (comments) => set({ comments }),
    addComment: (comment) =>
      set((state) => ({ comments: [comment, ...state.comments] })),
    deleteComment: (commentId) =>
      set((state) => ({
        comments: state.comments.filter((c) => c.id !== commentId),
      })),
    incrementLikes: (commentId) =>
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId ? { ...c, like_count: c.like_count + 1 } : c,
        ),
      })),
    decrementLikes: (commentId) =>
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId ? { ...c, like_count: c.like_count - 1 } : c,
        ),
      })),
  })),
);

export default useCommentStore;
