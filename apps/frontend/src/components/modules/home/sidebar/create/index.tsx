import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { cn } from "@/utils/cn";

import CreateTextPost from "./text-post";

export default function Create() {
  return (
    <div className="w-max space-y-2 rounded-lg border p-4">
      <div className="font-medium">Create your post</div>
      <div className="flex flex-wrap gap-2">
        <CreateTextPost />
        <Block
          icon={<Icons.ImagePost className="size-4" />}
          className="bg-chart-2"
        />
        <Block
          icon={<Icons.VideoPost className="size-4" />}
          className="bg-chart-3"
        />
        <Block
          icon={<Icons.AudioPost className="size-4" />}
          className="bg-chart-4"
        />
      </div>
    </div>
  );
}

interface BlockProps {
  icon: React.ReactNode;
  className: string;
}

function Block({ icon, className }: Readonly<BlockProps>) {
  return <Button className={cn("p-6 rounded-md", className)}>{icon}</Button>;
}
