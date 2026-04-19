import React from 'react';
import { Button, Col, Row, Space } from 'antd';
import { CarOutlined } from '@ant-design/icons';

// interface HeroSectionProps {
//   onSelectTab: (tab: AuthTabKey) => void;
// }

// export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
export const HeroSection: React.FC = () => {
  return (
    <section className="px-4 py-14 md:py-20">
      <Row gutter={[32, 32]} align="middle" className="mx-auto max-w-7xl">
        <Col xs={24} lg={13}>
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-sky-300/50 bg-sky-100/70 px-3 py-1 text-sm font-medium text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/15 dark:text-sky-200">
              Reliable route-based ride matching
            </div>
            <h1 className="m-0 text-4xl font-extrabold leading-tight md:text-6xl">
              Commute together, pay less, and travel smarter.
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Create rides, share seats, and let passengers join only at pickup and drop-off points that are within your route.
            </p>
            <Space wrap>
              <Button type="primary" size="large" >
                Sign In
              </Button>
              <Button size="large">
                Create Account
              </Button>
            </Space>
          </div>
        </Col>
        <Col xs={24} lg={11}>
          <div className="rounded-3xl border border-slate-200 bg-white dark:bg-slate-800 p-10 shadow-xl dark:border-slate-700">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
              <CarOutlined style={{ fontSize: 52 }} />
            </div>
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Drivers set the route. Riders request pickup and drop-off along that route.
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
};
