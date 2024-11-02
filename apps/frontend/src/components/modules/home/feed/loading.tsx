import { Skeleton } from "@/components/ui/reusables/skeleton";

export default function Loading() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array.from({length: 5}).map((_, i) => (
        <Skeleton
          key={`skeleton-${i + 1}`}
          className="h-56 w-full rounded-xl"
        />
      ))}
    </div>
  );
}
