import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { DropdownMenuItem } from "@/components/ui/reusables/dropdown-menu";
import useCommentStore from "@/lib/store/comment";
import useFeedStore from "@/lib/store/feed";
import client from "@/utils/api-client";

interface DeleteCommentProps {
  commentId: string;
}

export default function DeleteComment({ commentId }: DeleteCommentProps) {
  const { mutateAsync, isPending } = client.useMutation(
    "delete",
    "/comment/{postId}",
    {
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    },
  );
  const { deleteComment } = useCommentStore();
  const { activePost } = useFeedStore();

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!activePost) return;

    e.preventDefault();
    try {
      await mutateAsync({
        params: {
          path: { postId: activePost.id },
        },
      });
      deleteComment(commentId);
    } catch {
      // ignore
    }
  };

  return (
    <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
      <ButtonLoader isLoading={isPending}>
        <Icons.Delete />
      </ButtonLoader>
      Delete
    </DropdownMenuItem>
  );
}
