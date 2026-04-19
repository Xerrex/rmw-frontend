// LandingPage.tsx
import React from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { HeroSection } from './components/HeroSection';
import { SignInSection } from './components/SignInSection';
import type { LandingFeatureItem } from './hooks/types';

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
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="fixed right-4 top-4 z-50 rounded-full border border-slate-200/80 bg-white/85 p-1 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <main className="flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid flex-1 grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-black/20 lg:grid-cols-2">
          {/* Hero Section - Left */}
          <div className="relative overflow-hidden">
            <HeroSection features={features} />
          </div>

          {/* Sign In Section - Right */}
          <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 lg:bg-transparent lg:backdrop-blur-none">
            <SignInSection />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-slate-600 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
        <div className="container mx-auto px-4">
          <p>Riding My Way © {new Date().getFullYear()} — Share the route. Keep the journey in sync.</p>
        </div>
      </footer>
    </div>
  );
};