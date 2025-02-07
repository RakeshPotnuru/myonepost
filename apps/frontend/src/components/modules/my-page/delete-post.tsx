import { formatDistanceToNow } from "date-fns";

import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/reusables/alert-dialog";
import { Button } from "@/components/ui/reusables/button";
import { queryClient, queryKeys } from "@/lib/providers/react-query";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

export default function DeletePost() {
  const { user } = useUserStore();
  const { updatePage, page } = usePageStore();

  const { mutateAsync, isPending } = client.useMutation("delete", "/post");

  const onConfirm = async () => {
    try {
      await mutateAsync({});
      updatePage({
        post: null,
      });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
    } catch {
      // ignore
    }
  };

  if (!page?.post || page.post.status === "PENDING") {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} disabled={isPending}>
          <ButtonLoader isLoading={isPending} />
          Delete post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.{" "}
            {user?.next_post_allowed_at &&
            new Date(user.next_post_allowed_at) > new Date()
              ? `You have to wait until
            ${formatDistanceToNow(new Date(user?.next_post_allowed_at), {
              includeSeconds: true,
            })}
            to post again.`
              : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isPending}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
