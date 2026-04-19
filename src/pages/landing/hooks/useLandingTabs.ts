import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { AuthTabKey, LandingAuthState } from './types';

interface LandingTabsInput {
  pathname: string;
}

interface LandingTabsResponse {
  activeTab: AuthTabKey;
}

export const useLandingTabs = (): LandingAuthState => {
  const location = useLocation();
  const navigate = useNavigate();

  const input: LandingTabsInput = { pathname: location.pathname };

  const state: LandingTabsResponse = useMemo(() => {
    if (input.pathname === '/signup') {
      return { activeTab: 'signup' };
    }

    return { activeTab: 'login' };
  }, [input.pathname]);

  const onTabChange = (tab: AuthTabKey) => {
    navigate(tab === 'signup' ? '/signup' : '/login');
  };

  return {
    activeTab: state.activeTab,
    onTabChange,
  };
};
