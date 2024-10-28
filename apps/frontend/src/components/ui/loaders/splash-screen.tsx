"use client";

import Image from "next/image";

import { useTheme } from "next-themes";

import { Images } from "@/assets/images";
import { Center } from "@/components/ui/center";

export default function SplashScreen() {
  const { theme } = useTheme();

  return (
    <Center className="h-screen w-screen">
      <Image
        src={theme === "light" ? Images.logoFullLight : Images.logoFullDark}
        alt="myonepost logo"
        width={250}
        height={150}
      />
    </Center>
  );
}
