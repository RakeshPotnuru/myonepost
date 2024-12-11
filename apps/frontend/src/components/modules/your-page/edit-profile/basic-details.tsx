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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Input } from "@/components/ui/reusables/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/reusables/radio-group";
import { Textarea } from "@/components/ui/reusables/textarea";
import { siteConfig } from "@/config/site";
import usePageStore from "@/lib/store/page";
import client from "@/utils/api-client";

const FormSchema = z.object({
  displayName: z.string().optional(),
  bio: z.string().max(CONSTANTS.USER.BIO.MAX_LENGTH).optional(),
  url: z
    .string()
    .url()
    .max(CONSTANTS.USER.URL.MAX_LENGTH, "URL is too long")
    .optional()
    .or(z.literal("")),
  isPrivate: z.string().optional(),
});

export default function BasicDetails() {
  const { page, updatePage } = usePageStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      displayName: page?.display_name ?? "",
      bio: page?.bio ?? "",
      url: page?.url ?? "",
      isPrivate: page?.is_private?.toString(),
    },
  });
  const watchBio = form.watch("bio");
  const watchDisplayName = form.watch("displayName");

  const { mutateAsync, isPending } = client.useMutation("patch", "/user", {
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutateAsync({
        body: {
          ...data,
          display_name: data.displayName,
          is_private: data.isPrivate === "true",
        },
      });
      updatePage({
        ...data,
        display_name: data.displayName,
        is_private: data.isPrivate === "true",
      });
      toast.success("Profile updated successfully.");
    } catch {
      // ignore
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>Basic Details</Heading>
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
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  maxLength={CONSTANTS.USER.DISPLAY_NAME.MAX_LENGTH}
                  {...field}
                />
              </FormControl>
              {watchDisplayName && (
                <FormDescription>
                  This is your public display name. ({watchDisplayName?.length}/
                  {CONSTANTS.USER.DISPLAY_NAME.MAX_LENGTH})
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  maxLength={CONSTANTS.USER.BIO.MAX_LENGTH}
                  rows={4}
                  {...field}
                />
              </FormControl>
              {watchBio && (
                <FormDescription>
                  {watchBio?.length}/{CONSTANTS.USER.BIO.MAX_LENGTH}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Who can see your page?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Only {siteConfig.shortTitle} users
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Anyone on the internet
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
