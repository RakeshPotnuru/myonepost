import { cn } from "@/utils/cn";

type CenterProps = React.HTMLAttributes<HTMLDivElement>;

export function Center({ className, ...props }: Readonly<CenterProps>) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
}
