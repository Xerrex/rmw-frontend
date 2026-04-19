// Initialize theme from localStorage
export const initializeTheme = () => {
  const savedUseSystem = localStorage.getItem('use-system-theme');
  const savedTheme = localStorage.getItem('theme-preference');
  
  const useSystem = savedUseSystem === null ? true : savedUseSystem === 'true';
  
  let isDarkMode = false;
  if (useSystem) {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else if (savedTheme !== null) {
    isDarkMode = savedTheme === 'dark';
  }
  
  return { isDarkMode, useSystem };
};
