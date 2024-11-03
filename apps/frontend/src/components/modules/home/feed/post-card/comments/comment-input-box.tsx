import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { Button } from "@/components/ui/reusables/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Textarea } from "@/components/ui/reusables/textarea";
import useCommentStore from "@/lib/store/comment";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

const FormSchema = z.object({
  comment: z.string(),
});

interface CommentInputBoxProps {
  postId: string;
}

export default function CommentInputBox({
  postId,
}: Readonly<CommentInputBoxProps>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { mutateAsync, isPending } = client.useMutation("post", "/comment", {
    onError: () => {
      toast.error("Failed to post comment. Please try again.");
    },
  });
  const { addComment } = useCommentStore();
  const { user } = useUserStore();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = (await mutateAsync({
        body: { postId, text: data.comment },
      })) as { id: string };

      if (!user) return;

      addComment({
        author: {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url,
        },
        id: res.id,
        text: data.comment,
        created_at: new Date().toISOString(),
        like_count: 0,
      });
      form.reset();
    } catch {
      // ignore
    }
  };

  const isLoading = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-4 items-center gap-2"
      >
        <FormField
          control={form.control}
          name="comment"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
                  className="min-h-9 resize-none border-none shadow-none focus-visible:ring-0"
                  rows={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={"sm"} disabled={isLoading}>
          <ButtonLoader isLoading={isPending} /> Submit
        </Button>
      </form>
    </Form>
  );
}
