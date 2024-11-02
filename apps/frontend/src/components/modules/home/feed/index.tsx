import { FeedType } from "@1post/shared";

import { Tabs } from "@/components/ui/reusables/tabs";

import FreshFeed from "./fresh-feed";
import SubscribedFeed from "./subscribed-feed";
import FeedTabsList from "./tabs-list";
import TrendingFeed from "./trending-feed";

export default function Feed() {
  return (
    <Tabs defaultValue={FeedType.TRENDING}>
      <FeedTabsList />
      <TrendingFeed />
      <FreshFeed />
      <SubscribedFeed />
    </Tabs>
  );
}
