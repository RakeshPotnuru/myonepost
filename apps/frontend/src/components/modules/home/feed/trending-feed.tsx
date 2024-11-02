import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetTrendingFeed } from "./api/feed";
import EmptyState from "./empty-state";
import Loading from "./loading";
import PostCard from "./post-card";

interface TrendingFeedProps {
  activeTab: FeedType;
}

export default function TrendingFeed({
  activeTab,
}: Readonly<TrendingFeedProps>) {
  const { data, isFetching } = useGetTrendingFeed(activeTab);
  const { setTrendingFeed, trendingFeed } = useFeedStore();

  useEffect(() => {
    if (data) {
      setTrendingFeed(data);
    }
  }, [data, setTrendingFeed]);

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.TRENDING} className="space-y-2 pb-2">
      {trendingFeed.length > 0 ? (
        trendingFeed.map((post) => (
          <PostCard key={post.id} {...post} feedType={FeedType.TRENDING} />
        ))
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
