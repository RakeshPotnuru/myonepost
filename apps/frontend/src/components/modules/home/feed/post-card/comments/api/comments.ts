import { CONSTANTS } from "@1post/shared";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { CommentResponse } from "@/lib/store/comment";
import { createClient } from "@/utils/supabase/client";

const calculateCommentScore = (likeCount: number, createdAt: Date): number => {
  const likeScore = likeCount * CONSTANTS.WEIGHTS.LIKE;
  const timeDiff = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
  const timeScore = 1 / (1 + CONSTANTS.WEIGHTS.TIME_DECAY_FACTOR * timeDiff);

  return likeScore * timeScore;
};

const fetchPostComments = async (
  postId?: string,
): Promise<CommentResponse[]> => {
  if (!postId) return [];

  const supabase = createClient();

  const { data } = await supabase
    .from("comments")
    .select(
      `
        id,
        created_at,
        text,
        like_count,
        author:users (
            id,
            username,
            avatar_url
        )
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  const comments = data?.map((comment) => ({
    ...comment,
    score: calculateCommentScore(
      comment.like_count,
      new Date(comment.created_at),
    ),
  }));

  comments?.sort((a, b) => b.score - a.score);

  return comments?.map((c) => {
    return {
      ...c,
      author: c.author,
    };
  }) as CommentResponse[];
};

export function useGetPostComments(postId?: string) {
  return useQuery({
    queryKey: [queryKeys.postComments, postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });
}
