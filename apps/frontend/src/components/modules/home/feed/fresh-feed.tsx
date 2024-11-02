import { useEffect } from "react";

import { FeedType } from "@1post/shared";

import { TabsContent } from "@/components/ui/reusables/tabs";
import useFeedStore from "@/lib/store/feed";

import { useGetFreshFeed } from "./api/feed";
import EmptyState from "./empty-state";
import Loading from "./loading";
import PostCard from "./post-card";

interface FreshFeedProps {
  activeTab: FeedType;
}

export default function FreshFeed({ activeTab }: Readonly<FreshFeedProps>) {
  const { data, isFetching } = useGetFreshFeed(activeTab);
  const { setFreshFeed, freshFeed } = useFeedStore();

  useEffect(() => {
    if (data) {
      setFreshFeed(data);
    }
  }, [data, setFreshFeed]);

  return isFetching ? (
    <Loading />
  ) : (
    <TabsContent value={FeedType.FRESH} className="space-y-2 pb-2">
      {freshFeed.length > 0 ? (
        freshFeed.map((post) => (
          <PostCard key={post.id} {...post} feedType={FeedType.FRESH} />
        ))
      ) : (
        <EmptyState />
      )}
    </TabsContent>
  );
}
