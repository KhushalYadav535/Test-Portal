import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme} className="toggle-button">
         {theme === 'light' ? 'Dark' : 'Light'} 
      </button>
    </div>
  );
};

export default ThemeToggle;
