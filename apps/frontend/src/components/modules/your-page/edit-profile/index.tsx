import { Button } from "@/components/ui/reusables/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";

import UserAvatar from "./avatar";
import BasicDetails from "./basic-details";
import Username from "./username";

export default function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="divide-y p-0 pt-2" aria-describedby="undefined">
        <UserAvatar />
        <Username />
        <BasicDetails />
      </DialogContent>
    </Dialog>
  );
}
