"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useTheme } from "next-themes";

import { Images } from "@/assets/images";

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();

  return (
    mounted && (
      <Image
        src={theme === "light" ? Images.logoFullLight : Images.logoFullDark}
        alt="My One Post logo"
        width={450}
        height={350}
      />
    )
  );
}
