import { toast } from "sonner";

import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { Button } from "@/components/ui/reusables/button";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

export default function Subscribe() {
  const { user, addSubscriber, removeSubscriber } = useUserStore();
  const { page } = usePageStore();

  if (!page) {
    return null;
  }

  if (user?.username === page.username) {
    return null;
  }

  const { mutateAsync: subscribe, isPending: isSubscribing } =
    client.useMutation("post", "/subscribe", {
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    });

  const handleSubscribe = async () => {
    try {
      await subscribe({ body: { subscribedToId: page.id } });
      addSubscriber(page.id);
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

  const handleUnSubscribe = async () => {
    try {
      await unsubscribe({ params: { path: { id: page.id } } });
      removeSubscriber(page.id);
    } catch {
      // ignore
    }
  };

  return user?.subscribed_to.find((s) => s.subscribed_to_id === page.id) ? (
    <Button
      onClick={handleUnSubscribe}
      variant={"outline"}
      disabled={isUnSubscribing}
    >
      <ButtonLoader isLoading={isUnSubscribing} />
      Unsubscribe
    </Button>
  ) : (
    <Button onClick={handleSubscribe} disabled={isSubscribing}>
      <ButtonLoader isLoading={isSubscribing} />
      Subscribe
    </Button>
  );
}