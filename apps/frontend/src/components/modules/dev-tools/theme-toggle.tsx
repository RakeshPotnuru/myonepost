"use client";

import { useTheme } from "next-themes";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <aside>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed bottom-3 right-16 z-50 text-foreground"
        size="icon"
        aria-label="toggle theme"
      >
        <Icons.Sun />
      </Button>
    </aside>
  );
}
