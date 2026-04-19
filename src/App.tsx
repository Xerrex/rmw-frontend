import React, { useMemo } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { queryClient } from './lib/queryClient';
import { getThemeToken } from './config/theme';
import { LandingPage } from './pages/landing/LandingPage';
import './index.css';


/**
 * AppContent component that uses the theme context
 */
const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  const themeConfig = useMemo(
    () => ({
      token: getThemeToken(isDark),
      algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    }),
    [isDark]
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

/**
 * Main App component
 */
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
