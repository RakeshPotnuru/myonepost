import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetSubscribedFeed } from "./api/feed";
import EmptyState from "./empty-state";
import Loading from "./loading";
import PostCard from "./post-card";

export default function SubscribedFeed() {
  const { setSubscribedFeed, subscribedFeed, activeFeedType } = useFeedStore();
  const { data, isFetching } = useGetSubscribedFeed(activeFeedType);

  useEffect(() => {
    if (data) {
      setSubscribedFeed(data);
    }
  }, [data, setSubscribedFeed]);

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.SUBSCRIBED} className="space-y-2 pb-2">
      {subscribedFeed.length > 0 ? (
        subscribedFeed.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
