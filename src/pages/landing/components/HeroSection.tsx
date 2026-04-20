// components/HeroSection.tsx
import React from 'react';
import { CheckCircleOutlined, EnvironmentOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import type { LandingFeatureItem } from '../hooks/types';

const { Title, Text } = Typography;

const featureStyles = {
  route: {
    icon: <EnvironmentOutlined style={{ fontSize: 20 }} />,
    iconClassName: 'text-emerald-400',
    backgroundClassName: 'bg-emerald-500/20',
    borderColor: 'hover:border-emerald-500/50',
  },
  matching: {
    icon: <CheckCircleOutlined style={{ fontSize: 20 }} />,
    iconClassName: 'text-cyan-400',
    backgroundClassName: 'bg-cyan-500/20',
    borderColor: 'hover:border-cyan-500/50',
  },
  trust: {
    icon: <SafetyCertificateOutlined style={{ fontSize: 20 }} />,
    iconClassName: 'text-amber-400',
    backgroundClassName: 'bg-amber-500/20',
    borderColor: 'hover:border-amber-500/50',
  },
  social: {
    icon: <TeamOutlined style={{ fontSize: 20 }} />,
    iconClassName: 'text-violet-400',
    backgroundClassName: 'bg-violet-500/20',
    borderColor: 'hover:border-violet-500/50',
  },
} as const;

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

export const HeroSection: React.FC = () => {
  return (
    <section className="flex h-full min-h-140 items-center bg-linear-to-br from-sky-700 via-sky-600 to-cyan-600 px-6 
    py-10 sm:min-h-155 sm:px-8 sm:py-12 lg:min-h-0 lg:px-10">
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Animated Background Elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-48 w-48 animate-pulse rounded-full bg-cyan-300/20 blur-3xl" />
        
        <div className="relative space-y-8">
          {/* App name */}
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
              Riding My Way
            </span>
          </div>

          {/* Hero Content */}
          <div className="space-y-4">
            <Title level={1} className="m-0! text-4xl! font-bold text-white sm:text-5xl! lg:text-6xl! xl:text-7xl!">
              Share the route.
              <br />
              Keep the journey in sync.
            </Title>
            
            <Text className="block max-w-2xl text-base text-sky-100/90 sm:text-lg lg:text-xl">
              Riding My Way helps drivers publish rides and lets passengers join with pickup and drop-off points that stay aligned with the actual route.
            </Text>
          </div>

          {/* Features Grid */}
          <div className="space-y-4 pt-4 px-2">
            <Text className="text-xs font-semibold uppercase tracking-wider text-sky-200">
              Why choose Riding My Way
            </Text>
            
            <div className="grid gap-4">
              {features.map((feature) => {
                const style = featureStyles[feature.key as keyof typeof featureStyles];
                
                return (
                  <div
                    key={feature.key}
                    className={`group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-xl ${style?.borderColor}`}
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${style?.backgroundClassName} transition-transform duration-300 group-hover:scale-110`}>
                      <div className={style?.iconClassName}>{style?.icon}</div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-sky-100/80">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
