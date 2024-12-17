import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

import { useSignIn } from "./api/auth";
import type { Step } from "./auth-form";

interface EmailStepProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function EmailStep({
  setStep,
  setEmail,
}: Readonly<EmailStepProps>) {
  const [captchaToken, setCaptchaToken] = useState<string>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useSignIn();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!captchaToken) {
      toast.error("Please wait for captcha verification.");
      return;
    }

    const email = data.email;
    setEmail(email);

    try {
      await mutateAsync({
        email,
        captchaToken,
      });
      setStep("otp");
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Turnstile siteKey={siteKey} onSuccess={setCaptchaToken} />
        <Button type="submit" className="w-full" disabled={isDisabled}>
          Create account or Login
        </Button>
      </form>
    </Form>
  );
}
