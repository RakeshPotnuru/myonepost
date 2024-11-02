import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetFreshFeed } from "./api/feed";
import PostCard from "./post-card";

export default function FreshFeed() {
  const { data } = useGetFreshFeed();
  const { setFreshFeed, freshFeed } = useFeedStore();

  useEffect(() => {
    if (data) {
      setFreshFeed(data);
    }
  }, [data, setFreshFeed]);

  return (
    <TabsContent value={FeedType.FRESH} className="space-y-2 pb-2">
      {freshFeed.map((post) => (
        <PostCard key={post.id} {...post} feedType={FeedType.FRESH} />
      ))}
    </TabsContent>
  );
}
