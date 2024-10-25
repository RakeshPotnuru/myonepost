import { Icons } from "@/assets/icons";
import { cn } from "@/utils/cn";

interface ButtonLoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
  iconSide?: "left" | "right";
}

export function ButtonLoader({
  isLoading,
  children,
  iconSide = "left",
}: ButtonLoaderProps) {
  const renderLoading = () => (
    <Icons.Loading
      className={cn("animate-spin", {
        "mr-2": iconSide === "left",
        "ml-2": iconSide === "right",
      })}
    />
  );
  const renderChildren = () => children;

  return isLoading ? renderLoading() : renderChildren();
}
