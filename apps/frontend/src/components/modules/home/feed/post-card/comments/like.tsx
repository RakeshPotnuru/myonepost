import { useEffect, useRef, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import useCommentStore from "@/lib/store/comment";
import client from "@/utils/api-client";

interface LikeProps {
  likeCount: number;
  commentId: string;
}

export default function Like({ likeCount, commentId }: Readonly<LikeProps>) {
  const intentRef = useRef<boolean | null>(null);

  const {
    incrementLikes: incrementCommentLikes,
    decrementLikes: decrementCommentLikes,
    addCommentLike,
    removeCommentLike,
    likedComments,
  } = useCommentStore();
  const isInitiallyLiked = likedComments?.some(
    (like) => like.comment_id === commentId,
  );

  const [state, setState] = useState({
    liked: isInitiallyLiked,
    count: likeCount,
  });

  const { mutateAsync: like } = client.useMutation("post", "/like/comment");
  const { mutateAsync: unlike } = client.useMutation(
    "delete",
    "/like/comment/{id}",
  );

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      liked: isInitiallyLiked,
      count: likeCount,
    }));
  }, [isInitiallyLiked, likeCount]);

  const handleLike = useDebouncedCallback(
    async () => {
      if (intentRef.current === null) return;

      const isLiking = intentRef.current;

      try {
        if (isLiking) {
          await like({ body: { commentId } });
          incrementCommentLikes(commentId);
          addCommentLike(commentId);
        } else {
          await unlike({ params: { path: { id: commentId } } });
          decrementCommentLikes(commentId);
          removeCommentLike(commentId);
        }
      } catch {
        if (intentRef.current === isLiking) {
          setState((prev) => ({
            liked: !isLiking,
            count: prev.count + (isLiking ? -1 : 1),
          }));
        }
      }
    },
    1000,
    { leading: true, maxWait: 2000 },
  );

  const handleClick = async () => {
    const newLikedState = !state.liked;
    intentRef.current = newLikedState;

    setState((prev) => ({
      liked: newLikedState,
      count: prev.count + (newLikedState ? 1 : -1),
    }));

    await handleLike();
  };

  return (
    <Tooltip text={state.liked ? "Unlike" : "Like"}>
      <Button variant="ghost" size="iconXs" onClick={handleClick}>
        {state.liked ? <Icons.Liked color="#F44336" /> : <Icons.Like />}
      </Button>
    </Tooltip>
  );
}
