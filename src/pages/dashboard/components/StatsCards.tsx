import React from 'react';
import { Card, Col, Row } from 'antd';
import type { DashboardStatItem } from '../hooks/types';

const toneMap: Record<DashboardStatItem['tone'], string> = {
  primary: 'text-sky-600 dark:text-sky-400',
  secondary: 'text-cyan-600 dark:text-cyan-400',
  accent: 'text-(--color-accent)',
};

interface StatsCardsProps {
  stats: DashboardStatItem[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col key={stat.key} xs={24} md={8}>
          <Card className="rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${toneMap[stat.tone]}`}>{stat.value}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
