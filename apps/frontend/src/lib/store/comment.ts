import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type CommentResponse = Pick<
  Tables<"comments">,
  "id" | "created_at" | "text" | "like_count"
> & {
  author: Pick<Tables<"users">, "id" | "username" | "avatar_url">;
};

export type LikedComment = Pick<Tables<"comment_likes">, "comment_id">;

interface ICommentState {
  comments: CommentResponse[];
  setComments: (comments: CommentResponse[]) => void;
  likedComments: LikedComment[];
  setLikedComments: (likedComments: LikedComment[]) => void;
}

interface ICommentActions {
  addComment: (comment: CommentResponse) => void;
  deleteComment: (commentId: string) => void;
  incrementLikes: (commentId: string) => void;
  decrementLikes: (commentId: string) => void;
  addCommentLike: (commentId: string) => void;
  removeCommentLike: (commentId: string) => void;
}

const useCommentStore = create<ICommentState & ICommentActions>()(
  immer((set) => ({
    comments: [],
    setComments: (comments) => set({ comments }),
    likedComments: [],
    setLikedComments: (likedComments) => set({ likedComments }),
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
    addCommentLike: (commentId) =>
      set((state) => ({
        likedComments: [...state.likedComments, { comment_id: commentId }],
      })),
    removeCommentLike: (commentId) =>
      set((state) => ({
        likedComments: state.likedComments.filter(
          (like) => like.comment_id !== commentId,
        ),
      })),
  })),
);

export default useCommentStore;
