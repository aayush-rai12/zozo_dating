import React from 'react';
import './ThemeToggle.css'; // Assuming you have a CSS file for styles
export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  );
}
