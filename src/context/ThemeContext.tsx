import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeColorContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeColorProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = Cookies.get("user-theme") as Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    Cookies.set("user-theme", newTheme, { expires: 365, path: "/" });
  };

  return (
    <ThemeColorContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export default ThemeColorProvider;
