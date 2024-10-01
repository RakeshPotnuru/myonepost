"use client";

import { useState } from "react";

import EmailStep from "./email-step";
import OtpStep from "./otp-step";

export type Step = "email" | "otp";

export default function AuthForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");

  let component;
  switch (step) {
    case "email": {
      component = <EmailStep setStep={setStep} setEmail={setEmail} />;
      break;
    }
    case "otp": {
      component = <OtpStep email={email} />;
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className="w-full space-y-6 text-center md:w-2/3 md:text-start">
      <h2 className="text-2xl font-bold sm:text-4xl">Join Now</h2>
      {component}
    </div>
  );
}
