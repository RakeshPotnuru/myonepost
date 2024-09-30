"use client";

import { CONSTANTS } from "@1post/core/src/config/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import CreateDialog from "./create-dialog";

const FormSchema = z.object({
  text: z
    .string()
    .min(1, "Post is too short")
    .max(CONSTANTS.POST.TEXT_MAX_LENGTH, "Post is too long"),
});

export default function CreateTextPost() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      text: "",
    },
  });
  const watchText = form.watch("text");

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <CreateDialog
      icon={<Icons.TextPost className="size-4" />}
      className="bg-chart-1"
      onConfirm={form.handleSubmit(onSubmit)}
      tooltip="Text Post"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="text"
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
                  {watchText.length}/{CONSTANTS.POST.TEXT_MAX_LENGTH}
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
