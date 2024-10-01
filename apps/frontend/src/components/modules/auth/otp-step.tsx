import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/reusables/input-otp";
import { useCoolDown } from "@/hooks/use-cool-down";

import { useSignIn, useVerifyOtp } from "./api/auth";

interface OtpStepProps {
  email: string;
}

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OtpStep({ email }: OtpStepProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      pin: "",
    },
  });

  const { mutateAsync, isPending } = useVerifyOtp();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutateAsync({
        email,
        otp: data.pin,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { coolDown, startCoolDown } = useCoolDown(60);
  const { mutateAsync: resend, isPending: isResending } = useSignIn();

  const handleResend = async () => {
    if (coolDown > 0) return;

    try {
      await resend(email);
      startCoolDown(60);
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const isDisabled = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem className="flex flex-col items-center md:items-start">
              <FormLabel>One-Time Password</FormLabel>
              <div className="flex flex-col gap-2 xl:flex-row">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <Button
                  variant={"secondary"}
                  onClick={handleResend}
                  disabled={isResending || coolDown > 0}
                  type="button"
                >
                  {coolDown > 0 ? `Resend OTP in ${coolDown}s` : "Resend OTP"}
                </Button>
              </div>
              <FormDescription>
                Please enter the one-time password sent to your email. Check
                your spam folder if you don&apos;t see it in your inbox.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
