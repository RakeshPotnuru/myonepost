import { Button } from "@/components/ui/reusables/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";
import { Tooltip } from "@/components/ui/reusables/tooltip";
import { cn } from "@/utils/cn";

interface CreateDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  icon: React.ReactNode;
  onConfirm: () => void;
  tooltip: string;
}

export default function CreateDialog({
  children,
  className,
  icon,
  onConfirm,
  tooltip,
}: Readonly<CreateDialogProps>) {
  return (
    <Dialog>
      <Tooltip text={tooltip} asChild>
        <DialogTrigger asChild>
          <Button className={cn("p-6 rounded-md", className)}>{icon}</Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent className="max-w-2xl">
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} type="button">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
