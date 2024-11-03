import { useEffect, useRef, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import useFeedStore from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";
import { getBrowserLocale } from "@/utils/get-locale";

interface LikeProps {
  likeCount: number;
  postId: string;
}

export default function Like({ likeCount, postId }: Readonly<LikeProps>) {
  const intentRef = useRef<boolean | null>(null);

  const { user, addPostLike, removePostLike } = useUserStore();
  const isInitiallyLiked =
    user?.likes.some((like) => like.post_id === postId) ?? false;

  const [state, setState] = useState({
    liked: isInitiallyLiked,
    count: likeCount,
  });

  const {
    incrementLikes: incrementPostLikes,
    decrementLikes: decrementPostLikes,
    activeFeedType,
  } = useFeedStore();
  const { mutateAsync: like } = client.useMutation("post", "/like/post");
  const { mutateAsync: unlike } = client.useMutation(
    "delete",
    "/like/post/{id}",
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
          await like({ body: { postId } });
          incrementPostLikes(postId, activeFeedType);
          addPostLike(postId);
        } else {
          await unlike({ params: { path: { id: postId } } });
          decrementPostLikes(postId, activeFeedType);
          removePostLike(postId);
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
    500,
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
    <div className="flex items-center">
      <Tooltip text={state.liked ? "Unlike" : "Like"}>
        <Button variant="ghost" size="iconSm" onClick={handleClick}>
          {state.liked ? (
            <Icons.Liked className="size-4" color="#F44336" />
          ) : (
            <Icons.Like className="size-4" />
          )}
        </Button>
      </Tooltip>
      <p className="text-xs text-muted-foreground">
        {Intl.NumberFormat(getBrowserLocale(), {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(state.count)}
      </p>
    </div>
  );
}
