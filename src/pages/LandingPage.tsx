import React from 'react';
import { Layout } from 'antd';
import { HeroSection } from './landing/components/HeroSection';
import { FeatureSection } from './landing/components/FeatureSection';
import { AuthSection } from './landing/components/AuthSection';
import { useLandingTabs } from './landing/hooks/useLandingTabs';
import type { LandingFeatureItem } from './landing/hooks/types';

const { Content, Footer } = Layout;

export const LandingPage: React.FC = () => {
  const { activeTab, onTabChange } = useLandingTabs();

  const features: LandingFeatureItem[] = [
    {
      key: 'route',
      title: 'Route-constrained stops',
      description: 'Pickup and drop-off choices stay aligned with the driver route for smoother trips.',
    },
    {
      key: 'matching',
      title: 'Smart ride matching',
      description: 'Passengers quickly discover active rides with relevant route and timing filters.',
    },
    {
      key: 'trust',
      title: 'Trusted interactions',
      description: 'Clear request states and transparent ride details keep drivers and riders informed.',
    },
    {
      key: 'social',
      title: 'Commute community',
      description: 'Turn recurring commutes into collaborative, cost-effective shared rides.',
    },
  ];

  return (
    <Layout className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Content>
        <HeroSection onSelectTab={onTabChange} />
        <FeatureSection features={features} />
        <AuthSection activeTab={activeTab} onTabChange={onTabChange} />
      </Content>

      <Footer className="border-t border-slate-200 bg-white dark:bg-slate-800 text-center text-slate-600 dark:text-slate-300 dark:border-slate-700">
        RideFlow (c) 2026
      </Footer>
    </Layout>
  );
};
