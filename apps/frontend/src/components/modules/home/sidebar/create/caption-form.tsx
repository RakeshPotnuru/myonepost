import { CONSTANTS } from "@1post/shared";
import type { useForm } from "react-hook-form";
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

interface CaptionFormProps {
  isDisabled: boolean;
  form: ReturnType<typeof useForm>;
}

export default function CaptionForm({
  isDisabled,
  form,
}: Readonly<CaptionFormProps>) {
  const watchCaption = form.watch("caption", "");

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
