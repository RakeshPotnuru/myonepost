import { FeedType } from "@1post/core/src/config/constants";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import PostCard from "./post-card";
import FeedTabsList from "./tabs-list";

export default function Feed() {
  return (
    <Tabs defaultValue={FeedType.TRENDING}>
      <FeedTabsList />
      <TabsContent value={FeedType.TRENDING} className="space-y-2 pb-2">
        <PostCard postType="text" />
        <PostCard postType="image" />
        <PostCard postType="text" />
        <PostCard postType="image" />
      </TabsContent>
    </Tabs>
  );
}
