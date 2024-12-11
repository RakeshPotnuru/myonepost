import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { DropdownMenuItem } from "@/components/ui/reusables/dropdown-menu";
import type { FeedResponse } from "@/lib/store/feed";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

interface SubscribeProps extends Pick<FeedResponse, "author"> {}

export default function Subscribe({
  author: { id, username },
}: SubscribeProps) {
  const { user, addSubscriber, removeSubscriber } = useUserStore();

  const { mutateAsync: subscribe, isPending: isSubscribing } =
    client.useMutation("post", "/subscribe", {
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    });

  const handleSubscribe = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await subscribe({ body: { subscribedToId: id } });
      addSubscriber(id);
    } catch {
      // ignore
    }
  };

  const { mutateAsync: unsubscribe, isPending: isUnSubscribing } =
    client.useMutation("delete", "/subscribe/{id}", {
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    });

  const handleUnSubscribe = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await unsubscribe({ params: { path: { id: id } } });
      removeSubscriber(id);
    } catch {
      // ignore
    }
  };

  return user?.subscribed_to.find((s) => s.subscribed_to_id === id) ? (
    <DropdownMenuItem onClick={handleUnSubscribe} disabled={isUnSubscribing}>
      <ButtonLoader isLoading={isUnSubscribing}>
        <Icons.UnSubscribe />
      </ButtonLoader>
      Unsubscribe @{username}
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem onClick={handleSubscribe} disabled={isSubscribing}>
      <ButtonLoader isLoading={isSubscribing}>
        <Icons.Subscribe />
      </ButtonLoader>
      Subscribe @{username}
    </DropdownMenuItem>
  );
}
