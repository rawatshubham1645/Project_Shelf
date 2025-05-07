import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="glass"
      size="icon"
      className="rounded-full h-10 w-10 dark:bg-black/40 bg-white/80 border dark:border-white/20 border-black/10 shadow-md"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-orange-500 rotate-0 scale-100 transition-all duration-300 dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 text-primary rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
