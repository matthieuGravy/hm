import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  // Initialiser le thème au montage du composant
  useEffect(() => {
    const storedTheme = localStorage.getItem("vite-ui-theme");
    if (!storedTheme) {
      setTheme("system");
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
