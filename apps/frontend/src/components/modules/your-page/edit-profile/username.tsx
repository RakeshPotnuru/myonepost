import { useRouter } from "next/navigation";

import { CONSTANTS } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Heading } from "@/components/ui/heading";
import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import { Button } from "@/components/ui/reusables/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Input } from "@/components/ui/reusables/input";
import { queryClient, queryKeys } from "@/lib/providers/react-query";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

const FormSchema = z.object({
  username: z
    .string()
    .min(CONSTANTS.USER.USERNAME.MIN_LENGTH, {
      message: `Username must be at least ${CONSTANTS.USER.USERNAME.MIN_LENGTH} characters long`,
    })
    .max(CONSTANTS.USER.USERNAME.MAX_LENGTH, {
      message: `Username cannot exceed ${CONSTANTS.USER.USERNAME.MAX_LENGTH} characters`,
    })
    .regex(/^\w+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
});

export default function Username() {
  const { page, updatePage } = usePageStore();
  const { updateUser } = useUserStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      username: page?.username,
    },
  });

  const { mutateAsync, isPending } = client.useMutation(
    "patch",
    "/user/username",
    {
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    },
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutateAsync({
        body: data,
      });
      updatePage(data);
      updateUser(data);

      toast.success("Username updated successfully.");
      await queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
      router.replace(`/@${data.username}`);
    } catch {
      // ignore
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>Username</Heading>
          <Button
            type="submit"
            size={"sm"}
            disabled={isDisabled || !form.formState.isDirty}
          >
            <ButtonLoader isLoading={isPending} />
            Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  maxLength={CONSTANTS.USER.USERNAME.MAX_LENGTH}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
