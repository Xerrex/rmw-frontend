import React from 'react';
import { Layout } from 'antd';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import type { LandingFeatureItem } from './hooks/types';

const { Content, Footer } = Layout;

export const LandingPage: React.FC = () => {

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
    <Layout className="min-h-screen min-w-screen bg-slate-50 dark:bg-slate-950">
      <Content>
        <HeroSection />
        <FeatureSection features={features} />
      </Content>

      <Footer className="border-t border-slate-200 bg-white dark:bg-slate-800 text-center text-slate-600 dark:text-slate-300 dark:border-slate-700">
        Riding My Way (c) 2026
      </Footer>
    </Layout>
  );
};
