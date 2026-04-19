// components/HowItWorksSection.tsx
import React from 'react';
import { Card, Col, Row, Tag, Typography, Flex } from 'antd';

const { Title, Text } = Typography;

const steps = [
  {
    title: 'Driver creates route',
    description: 'Set start, end, departure time, seats, and optional checkpoints.',
    tag: 'Step 1',
    color: 'blue',
  },
  {
    title: 'Rider requests join',
    description: 'Choose pickup and drop-off points only from locations on the route.',
    tag: 'Step 2',
    color: 'cyan',
  },
  {
    title: 'Driver approves request',
    description: 'Review incoming requests and confirm passengers in one click.',
    tag: 'Step 3',
    color: 'geekblue',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="px-4 py-14 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Flex vertical align="center" className="mb-8 text-center">
          <Title level={2} className="mb-2! text-3xl! md:text-4xl!">
            How RideFlow Works
          </Title>
          <Text className="text-slate-600 dark:text-slate-300">
            A simple, safe, and structured commute experience for both drivers and riders.
          </Text>
        </Flex>

        <Row gutter={[16, 16]}>
          {steps.map((step) => (
            <Col key={step.title} xs={24} md={8}>
              <Card className="h-full shadow-sm" variant="outlined">
                <Flex vertical gap={12}>
                  <Tag color={step.color} className="w-fit">
                    {step.tag}
                  </Tag>
                  <Title level={4} className="mb-0!">
                    {step.title}
                  </Title>
                  <Text type="secondary">{step.description}</Text>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};