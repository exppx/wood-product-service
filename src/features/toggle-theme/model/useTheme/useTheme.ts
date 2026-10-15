import { useEffect } from "react";
import { type Theme } from "@/shared/types/theme";
import { useLocalStorage } from "@/shared/lib/hooks";
import { THEME_DEFAULT_VALUE, THEME_LOCAL_STORAGE_KEY } from "../config";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    THEME_LOCAL_STORAGE_KEY,
    THEME_DEFAULT_VALUE,
    (t): t is Theme => {
      return typeof t === "string" && ["light", "dark"].includes(t);
    },
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((currTheme) => (currTheme === "dark" ? "light" : "dark"));
  }

  return [theme, toggleTheme] as const;
}
