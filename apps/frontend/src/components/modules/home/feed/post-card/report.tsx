import { useState } from "react";

import { CONSTANTS, ReportReason } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "@/assets/icons";
import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { Button } from "@/components/ui/reusables/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";
import { DropdownMenuItem } from "@/components/ui/reusables/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/reusables/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/reusables/radio-group";
import { Textarea } from "@/components/ui/reusables/textarea";
import client from "@/utils/api-client";

interface ReportProps {
  reportedUserId: string;
  postId?: string;
  commentId?: string;
}

const FormSchema = z
  .object({
    description: z
      .string()
      .max(CONSTANTS.REPORT.DESCRIPTION.MAX_LENGTH)
      .optional(),
    reason: z.nativeEnum(ReportReason),
    reportedUserId: z.string(),
    postId: z.string().optional(),
    commentId: z.string().optional(),
  })
  .refine((data) => data.reason !== ReportReason.OTHER || !!data.description, {
    message: "Description is required when reason is 'Other'.",
    path: ["description"],
  });

export default function Report({
  reportedUserId,
  postId,
  commentId,
}: Readonly<ReportProps>) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      reportedUserId,
      postId,
      commentId,
    },
  });

  const { mutateAsync, isPending } = client.useMutation("post", "/report", {
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);

    try {
      await mutateAsync({
        body: data,
      });
      setOpen(false);
      form.reset();
      toast.success("Report submitted successfully");
    } catch {
      // ignore
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Icons.Flag /> Report
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report reason</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              disabled={isDisabled}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {Object.values(ReportReason).map((reason) => (
                        <FormItem
                          key={reason}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={reason} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {reason.replaceAll("_", " ").toLowerCase()}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              disabled={isDisabled}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant={"destructive"}
                size={"sm"}
                disabled={isDisabled || !form.formState.isDirty}
              >
                <ButtonLoader isLoading={isPending} />
                Submit Report
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
