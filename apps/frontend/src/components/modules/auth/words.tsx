"use client";

import { TypeAnimation } from "react-type-animation";

export function Words() {
  return (
    <TypeAnimation
      sequence={["noise", 1000, "drama", 1000, "spam", 1000, "hate", 1000]}
      className="text-destructive"
      repeat={Number.POSITIVE_INFINITY}
      cursor={false}
      speed={20}
      preRenderFirstString
      style={{
        width: "190px",
        display: "inline-block",
      }}
    />
  );
}
