import { useContext } from "react";
import { ThemeColorContext } from "../context/ThemeContext";

const ThemeSwitch = (): React.JSX.Element => {
  const { theme, toggleTheme } = useContext(ThemeColorContext);
  const isDark = theme === "dark";

  return (
    <div className="d-flex align-items-center me-2">
      <i className="fa-solid fa-sun"></i>
      <div className="form-check form-switch ps-5">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="theme-switch"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Switch theme color"
        />
      </div>
      <i className="fa-solid fa-moon"></i>
    </div>
  );
};

export default ThemeSwitch;
