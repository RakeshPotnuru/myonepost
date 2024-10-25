import { useState } from "react";

import { CONSTANTS } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Input } from "@/components/ui/reusables/input";

export default function CaptionForm({ isDisabled }: { isDisabled: boolean }) {
  const { form, watchCaption } = useCaptionForm();

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="caption"
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <div />
              <FormControl>
                <Input placeholder="Write a caption..." {...field} />
              </FormControl>
              <FormDescription>
                {watchCaption?.length}/
                {CONSTANTS.POST.POST_MEDIA_CAPTION.MAX_LENGTH}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export const CaptionFormSchema = z.object({
  caption: z
    .string()
    .max(CONSTANTS.POST.POST_MEDIA_CAPTION.MAX_LENGTH, "Caption is too long")
    .optional(),
});

export function useCaptionForm() {
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof CaptionFormSchema>>({
    resolver: zodResolver(CaptionFormSchema),
    mode: "onBlur",
    defaultValues: {
      caption: "",
    },
  });
  const watchCaption = form.watch("caption", "");

  return {
    form,
    file,
    setFile,
    watchCaption,
  };
}
