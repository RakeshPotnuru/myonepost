import { CONSTANTS } from "@1post/shared";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { CommentResponse, LikedComment } from "@/lib/store/comment";
import { createClient } from "@/utils/supabase/client";

const calculateCommentScore = (likeCount: number, createdAt: Date): number => {
  const likeScore = likeCount * CONSTANTS.WEIGHTS.LIKE;
  const timeDiff = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
  const timeScore = 1 / (1 + CONSTANTS.WEIGHTS.TIME_DECAY_FACTOR * timeDiff);

  return likeScore * timeScore;
};

const fetchPostComments = async (
  postId?: string,
): Promise<{ comments: CommentResponse[]; likedComments: LikedComment[] }> => {
  if (!postId) return { comments: [], likedComments: [] };

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

  const sortedComments = comments
    ?.map((c) => {
      return {
        ...c,
        author: c.author,
      };
    })
    .sort((a, b) => b.score - a.score) as CommentResponse[];

  const { data: likedComments } = await supabase
    .from("comment_likes")
    .select("comment_id")
    .eq(
      "comment_id",
      sortedComments.map((c) => c.id),
    );

  return {
    comments: sortedComments,
    likedComments: likedComments as LikedComment[],
  };
};

export function useGetPostComments(postId?: string) {
  return useQuery({
    queryKey: [queryKeys.postComments, postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });
}
