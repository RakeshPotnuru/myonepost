import { PostStatus } from "@1post/shared";

import { Icons } from "@/assets/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/reusables/alert";
import usePageStore from "@/lib/store/page";

export default function PostStatusAlert() {
  const { page } = usePageStore();

  if (!page?.post) {
    return null;
  }

  const status = page.post.status;

  switch (status) {
    case PostStatus.FLAGGED: {
      return (
        <Alert className="mb-4 border-warning">
          <Icons.Flag className="h-4 w-4" />
          <AlertTitle>Post flagged</AlertTitle>
          <AlertDescription>
            Your post has been flagged by our system. It&apos;s currently in
            review.
          </AlertDescription>
        </Alert>
      );
    }
    case PostStatus.REJECTED: {
      return (
        <Alert className="mb-4 border-destructive">
          <Icons.Reject className="h-4 w-4" />
          <AlertTitle>Post rejected</AlertTitle>
          <AlertDescription>
            Your post has been rejected due to violation of our community
            guidelines. Please delete and create a new post.
          </AlertDescription>
        </Alert>
      );
    }
    case PostStatus.PENDING: {
      return (
        <Alert className="mb-4">
          <Icons.Clock className="h-4 w-4" />
          <AlertTitle>Post pending</AlertTitle>
          <AlertDescription>
            Your post is going through a moderation process. You will be
            notified when it&apos;s published.
          </AlertDescription>
        </Alert>
      );
    }
    default: {
      break;
    }
  }
}
