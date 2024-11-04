"use client";

import { useState } from "react";

import { CONSTANTS } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "@/assets/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Textarea } from "@/components/ui/reusables/textarea";
import { queryClient, queryKeys } from "@/lib/providers/react-query";
import client from "@/utils/api-client";

import CreateDialog from "./create-dialog";

const FormSchema = z.object({
  text: z
    .string()
    .min(1, "Post is too short")
    .max(CONSTANTS.POST.TEXT.MAX_LENGTH, "Post is too long"),
});

export default function CreateTextPost() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });
  const watchText = form.watch("text", "");

  const { mutateAsync, isPending } = client.useMutation("post", "/post/text", {
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutateAsync({ body: { text: data.text } });

      toast.success("Posted successfully.");
      setIsOpen(false);
      form.reset({
        text: "",
      });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
    } catch {
      // ignore
    }
  };

  const isLoading = isPending || form.formState.isSubmitting;

  return (
    <CreateDialog
      icon={<Icons.TextPost className="size-4" />}
      className="bg-chart-1"
      onConfirm={form.handleSubmit(onSubmit)}
      tooltip="Text Post"
      isLoading={isLoading}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="text"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <div />
                <FormControl>
                  <Textarea
                    placeholder="Write something..."
                    rows={20}
                    className="resize-none border-none shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {watchText.length}/{CONSTANTS.POST.TEXT.MAX_LENGTH}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CreateDialog>
  );
}
