/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeTheme } from './themeUtils';

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
  useSystemTheme: boolean;
  setUseSystemTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = initializeTheme();
  const [isDark, setIsDark] = useState(initialState.isDarkMode);
  const [useSystemTheme, setUseSystemTheme] = useState(initialState.useSystem);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (!useSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [useSystemTheme]);

  const handleSetIsDark = (value: boolean) => {
    setIsDark(value);
    localStorage.setItem('theme-preference', value ? 'dark' : 'light');
    localStorage.setItem('use-system-theme', 'false');
    setUseSystemTheme(false);
  };

  const toggleTheme = () => {
    handleSetIsDark(!isDark);
  };

  const handleSetUseSystemTheme = (value: boolean) => {
    setUseSystemTheme(value);
    localStorage.setItem('use-system-theme', value ? 'true' : 'false');
    
    if (value) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark: handleSetIsDark,
        toggleTheme,
        useSystemTheme,
        setUseSystemTheme: handleSetUseSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
