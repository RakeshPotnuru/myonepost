import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetTrendingFeed } from "./api/feed";
import PostCard from "./post-card";

export default function TrendingFeed() {
  const { data } = useGetTrendingFeed();
  const { setTrendingFeed, trendingFeed } = useFeedStore();

  useEffect(() => {
    if (data) {
      setTrendingFeed(data);
    }
  }, [data, setTrendingFeed]);

  return (
    <TabsContent value={FeedType.TRENDING} className="space-y-2 pb-2">
      {trendingFeed.map((post) => (
        <PostCard key={post.id} {...post} feedType={FeedType.TRENDING} />
      ))}
    </TabsContent>
  );
}
