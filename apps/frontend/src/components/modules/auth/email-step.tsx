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

export default function EmailStep({ setStep, setEmail }: EmailStepProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useSignIn();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setEmail(data.email);

    try {
      await mutateAsync(data.email);
      setStep("otp");
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

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
        <Button type="submit" className="w-full" disabled={isDisabled}>
          Create account or Login
        </Button>
      </form>
    </Form>
  );
}
