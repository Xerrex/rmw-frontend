import React from 'react';
import { Card, Col, Input, Row } from 'antd';
import type { AvailableRideFilters } from '../hooks/types';

interface RidesFiltersProps {
  filters: AvailableRideFilters;
  onChange: (next: AvailableRideFilters) => void;
}

export const RidesFilters: React.FC<RidesFiltersProps> = ({ filters, onChange }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 dark:border-slate-700">
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <Input
            value={filters.startLocation}
            placeholder="Start location"
            onChange={(event) => onChange({ ...filters, startLocation: event.target.value })}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input
            value={filters.endLocation}
            placeholder="End location"
            onChange={(event) => onChange({ ...filters, endLocation: event.target.value })}
          />
        </Col>
      </Row>
    </Card>
  );
};
