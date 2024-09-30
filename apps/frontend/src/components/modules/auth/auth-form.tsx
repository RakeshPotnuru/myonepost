"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/reusables/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Input } from "@/components/ui/reusables/input";
import { createClient } from "@/utils/supabase/client";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function AuthForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const client = createClient();

      const { data: user, error } = await client.auth.signUp({
        email: data.email,
        password: "password",
      });

      console.log({ user, error });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 md:w-2/3"
      >
        <h2 className="text-2xl font-bold sm:text-4xl">Join Now</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create account or Login
        </Button>
      </form>
    </Form>
  );
}
