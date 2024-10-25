import { ButtonLoader } from "@/components/ui/loaders/button-loader";
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
  onConfirm?: () => void;
  tooltip: string;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CreateDialog({
  children,
  className,
  icon,
  onConfirm,
  tooltip,
  isLoading,
  isOpen,
  setIsOpen,
}: Readonly<CreateDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip text={tooltip} asChild>
        <DialogTrigger asChild>
          <Button className={cn("p-3 rounded-sm", className)}>{icon}</Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent
        className="max-w-2xl"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} type="button" disabled={isLoading}>
            <ButtonLoader isLoading={isLoading} />
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
