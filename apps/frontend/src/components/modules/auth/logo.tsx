"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useTheme } from "next-themes";

import { Images } from "@/assets/images";

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { theme, systemTheme } = useTheme();

  return (
    mounted && (
      <Image
        src={
          (theme === "system" && systemTheme === "dark") || theme === "dark"
            ? Images.logoFullDark
            : Images.logoFullLight
        }
        alt="My One Post logo"
        width={450}
        height={350}
        className="px-5 sm:px-0"
      />
    )
  );
}
