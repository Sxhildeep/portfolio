import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme || getPreferredTheme();
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((value) => (value === "dark" ? "light" : "dark"));

  return { theme, dark: theme === "dark", toggle };
}
