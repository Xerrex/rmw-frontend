// components/SignInSection.tsx
import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, Alert, Space, Typography } from 'antd';
import { CarOutlined, LockOutlined, MailOutlined, GoogleOutlined, AppleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const SignInSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sign in values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-cyan-600 shadow-lg">
            <CarOutlined style={{ fontSize: 32, color: 'white' }} />
          </div>
          <Title level={2} className="mb-2! text-2xl! sm:text-3xl!">
            Welcome back
          </Title>
          <Text type="secondary" className="text-sm">
            Sign in to manage your rides, requests, and route-based trip matches.
          </Text>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            className="mb-6"
            onClose={() => setError(null)}
          />
        )}

        {/* Sign In Form */}
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="space-y-2"
        >
          <Form.Item
            label={<Text strong>Email address</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-slate-400" />}
              placeholder="you@example.com"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Password</Text>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <Checkbox className="text-slate-600 dark:text-slate-300">Remember me</Checkbox>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              Forgot password?
            </a>
          </div>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="h-11 rounded-lg text-base font-semibold shadow-sm"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Social Sign In */}
        <Divider className="my-6">
          <span className="text-xs text-slate-400">OR CONTINUE WITH</span>
        </Divider>

        <Space direction="vertical" size="middle" className="w-full">
          <Button
            size="large"
            block
            icon={<GoogleOutlined />}
            className="flex items-center justify-center gap-2 rounded-lg border-slate-200 dark:border-slate-700"
            onClick={() => console.log('Google sign in')}
          >
            Sign in with Google
          </Button>
          <Button
            size="large"
            block
            icon={<AppleOutlined />}
            className="flex items-center justify-center gap-2 rounded-lg border-slate-200 dark:border-slate-700"
            onClick={() => console.log('Apple sign in')}
          >
            Sign in with Apple
          </Button>
        </Space>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <Text type="secondary">Need an account? </Text>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};