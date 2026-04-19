import React from 'react';
import { Card, Col, Row } from 'antd';
import { CheckCircleOutlined, EnvironmentOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import type { LandingFeatureItem } from '../hooks/types';

const icons = {
  route: <EnvironmentOutlined style={{ fontSize: 28 }} />,
  matching: <CheckCircleOutlined style={{ fontSize: 28 }} />,
  trust: <SafetyOutlined style={{ fontSize: 28 }} />,
  social: <TeamOutlined style={{ fontSize: 28 }} />,
};

interface FeatureSectionProps {
  features: LandingFeatureItem[];
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <section className="bg-slate-50 px-4 py-14 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-3xl md:text-4xl">Why Riders Choose RideFlow</h2>
        <Row gutter={[20, 20]}>
          {features.map((feature) => (
            <Col key={feature.key} xs={24} sm={12} lg={6}>
              <Card className="h-full rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700">
                <div className="mb-3 text-cyan-600 dark:text-cyan-400">{icons[feature.key as keyof typeof icons]}</div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};
