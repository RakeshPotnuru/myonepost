import { FeedType } from "@1post/shared";

import { Icons } from "@/assets/icons";
import { TabsList, TabsTrigger } from "@/components/ui/reusables/tabs";
import { cn } from "@/utils/cn";

export default function FeedTabsList() {
  const triggerClassName =
    "data-[state=active]:bg-muted data-[state=active]:shadow-none hover:bg-muted/40";

  return (
    <TabsList className="sticky top-0 z-50 grid h-12 w-full grid-cols-3 divide-x rounded-none rounded-b-xl border border-t-0 bg-background/30 p-0 backdrop-blur-xl *:h-full *:rounded-none *:font-semibold">
      <TabsTrigger
        value={FeedType.TRENDING}
        className={cn("data-[state=active]:rounded-bl-xl", triggerClassName)}
      >
        Trending <Icons.Trending className="ml-2" />
      </TabsTrigger>
      <TabsTrigger value={FeedType.FRESH} className={triggerClassName}>
        Fresh <Icons.Fresh className="ml-2" />
      </TabsTrigger>
      <TabsTrigger
        value={FeedType.SUBSCRIBED}
        className={cn("data-[state=active]:rounded-br-xl", triggerClassName)}
      >
        Subscribed <Icons.Subscribe className="ml-2" />
      </TabsTrigger>
    </TabsList>
  );
}
