export interface LandingFeatureItem {
  key: string;
  title: string;
  description: string;
}

export type AuthTabKey = 'login' | 'signup';

export interface LandingAuthState {
  activeTab: AuthTabKey;
  onTabChange: (tab: AuthTabKey) => void;
}
