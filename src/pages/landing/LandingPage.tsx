// LandingPage.tsx
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { SignInSection } from './components/SignInSection';

export const LandingPage: React.FC = () => {

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left panel — app details with primary gradient background */}
      <div className="hidden w-3/5 overflow-y-auto lg:flex">
        <HeroSection />
      </div>

      {/* Right panel — logo + auth forms */}
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto
        bg-white px-6 py-10 dark:bg-slate-950 lg:w-2/5">
        <SignInSection />
      </div>
    </div>
  );
};