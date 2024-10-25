import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { createClient } from "@/utils/supabase/client";

const isDisposableEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${siteConfig.links.disposableEmailChecker}${email}`,
    );

    return response.data.disposable === "true";
  } catch {
    return false;
  }
};

const signIn = async ({
  email,
  captchaToken,
}: {
  email: string;
  captchaToken: string;
}) => {
  if (await isDisposableEmail(email)) {
    throw new Error("Disposable email addresses are not allowed.");
  }

  const client = createClient();

  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      captchaToken,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("OTP sent to your email.");
    },
  });
}

const verifyOtp = async ({
  email,
  otp,
  captchaToken,
}: {
  email: string;
  otp: string;
  captchaToken: string;
}) => {
  const client = createClient();

  const { error } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
    options: { captchaToken },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("OTP verified.");
      window.location.reload();
    },
  });
}
