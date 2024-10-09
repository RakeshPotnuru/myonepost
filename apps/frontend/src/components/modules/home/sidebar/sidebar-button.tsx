import { forwardRef } from "react";

import { Button } from "@/components/ui/reusables/button";

interface SidebarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: React.ReactNode;
}

const SideBarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ name, icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={"ghost"}
        className="w-full justify-start text-base font-semibold"
        {...props}
      >
        {icon}
        {name}
      </Button>
    );
  },
);
SideBarButton.displayName = "SideBarButton";

export default SideBarButton;
