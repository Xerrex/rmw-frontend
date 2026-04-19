import React, { useMemo } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { queryClient } from './lib/queryClient';
import { getThemeToken } from './config/theme';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AvailableRidesPage } from './pages/AvailableRidesPage';
import { JoinRequestsPage } from './pages/JoinRequestsPage';
import { CreateRidePage } from './pages/CreateRidePage';
import './index.css';

/**
 * ProtectedRoute component for authenticated routes
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

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
            <Route path="/login" element={<LandingPage />} />
            <Route path="/signup" element={<LandingPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rides"
              element={
                <ProtectedRoute>
                  <AvailableRidesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rides/create"
              element={
                <ProtectedRoute>
                  <CreateRidePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <JoinRequestsPage />
                </ProtectedRoute>
              }
            />

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
