import { Button } from "@/components/ui/reusables/button";

interface SidebarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: React.ReactNode;
}

export default function SidebarButton({
  name,
  icon,
  ...props
}: Readonly<SidebarButtonProps>) {
  return (
    <Button
      variant={"ghost"}
      className="w-full justify-start text-base font-semibold"
      {...props}
    >
      {icon}
      {name}
    </Button>
  );
}
