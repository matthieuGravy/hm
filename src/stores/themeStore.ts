import { create } from "zustand";
import { Theme } from "@/types/context";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "vite-ui-theme";

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(STORAGE_KEY) as Theme) || "system",
  setTheme: (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  },
}));
