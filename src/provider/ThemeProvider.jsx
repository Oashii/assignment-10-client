import { createContext, useEffect, useState } from "react";
import { colors, darkColors } from "../theme/theme";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.style.backgroundColor = darkColors.background;
      document.documentElement.style.color = darkColors.text;
    } else {
      document.documentElement.style.backgroundColor = colors.background;
      document.documentElement.style.color = colors.text;
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkColors : colors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
