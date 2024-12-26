"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 p-2"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}
