import { Button } from "@/components/ui/button";

interface SidebarButtonProps {
  name: string;
  icon: React.ReactNode;
}

export default function SidebarButton({
  name,
  icon,
}: Readonly<SidebarButtonProps>) {
  return (
    <Button
      variant={"ghost"}
      className="w-full justify-start text-base font-semibold"
    >
      {icon}
      {name}
    </Button>
  );
}
