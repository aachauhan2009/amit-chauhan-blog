import React from "react";
import "./dark-mode.css";
import { ThemeToggler } from "gatsby-plugin-dark-mode"

export default function DarkMode() {

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />{" "}
          <div className="toggle-switch">
          </div>
        </label>
      )}
    </ThemeToggler>
  )
  
}