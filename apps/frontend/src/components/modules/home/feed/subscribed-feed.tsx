import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetSubscribedFeed } from "./api/feed";
import PostCard from "./post-card";

export default function SubscribedFeed() {
  const { data } = useGetSubscribedFeed();
  const { setSubscribedFeed, subscribedFeed } = useFeedStore();

  useEffect(() => {
    if (data) {
      setSubscribedFeed(data);
    }
  }, [data, setSubscribedFeed]);

  return (
    <TabsContent value={FeedType.SUBSCRIBED} className="space-y-2 pb-2">
      {subscribedFeed.map((post) => (
        <PostCard key={post.id} {...post} feedType={FeedType.SUBSCRIBED} />
      ))}
    </TabsContent>
  );
}
