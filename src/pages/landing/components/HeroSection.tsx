// components/HeroSection.tsx
import React from 'react';
import { CheckCircleOutlined, EnvironmentOutlined, SafetyCertificateOutlined, TeamOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Typography, Tag } from 'antd';
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

interface HeroSectionProps {
  features: LandingFeatureItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ features }) => {
  return (
    <section className="flex h-full min-h-140 items-center bg-linear-to-br from-sky-700 via-sky-600 to-cyan-600 px-6 py-10 sm:min-h-155 sm:px-8 sm:py-12 lg:min-h-0 lg:px-10 lg:py-14 xl:px-12">
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Animated Background Elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-48 w-48 animate-pulse rounded-full bg-cyan-300/20 blur-3xl" />
        
        <div className="relative space-y-8">
          {/* Badge */}
          <Tag className="inline-flex w-fit items-center gap-2 border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Riding My Way
          </Tag>

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

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button type="primary" size="large" className="h-12 px-8 text-base font-semibold shadow-lg">
              Get Started
              <ArrowRightOutlined />
            </Button>
            <Button size="large" className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20">
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="space-y-4 pt-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-sky-200">
              Why choose Riding My Way
            </Text>
            
            <div className="grid gap-4 sm:grid-cols-2">
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
