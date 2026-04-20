// components/SignInSection.tsx
import React, { useState } from 'react';
import { Button, Divider, Form, Input, Alert, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.png';
import { ThemeToggle } from '../../../components/ThemeToggle';

const { Title, Text } = Typography;

type FormMode = 'signin' | 'signup' | 'forgot';

export const SignInSection: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetState = (nextMode: FormMode) => {
    setError(null);
    setSuccessMsg(null);
    setMode(nextMode);
  };

  const handleSignIn = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sign in:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values: { firstName: string; email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log('Sign up:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMsg('Account created! You can now sign in.');
      setMode('signin');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Forgot password:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMsg('If that email is registered, a reset link has been sent.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Theme toggle */}
      <div className="mb-6 flex justify-end">
        <div className="rounded-full border border-slate-200/80 bg-slate-100/80 p-1 shadow-sm
          dark:border-slate-700/80 dark:bg-slate-800/80">
          <ThemeToggle />
        </div>
      </div>

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <img
          src={logo}
          alt="Riding My Way logo"
          className="h-20 w-auto object-contain drop-shadow-md"
        />
        <Title level={3} className="m-0! text-center text-slate-800 dark:text-slate-100">
          {mode === 'signin' && 'Welcome back'}
          {mode === 'signup' && 'Create an account'}
          {mode === 'forgot' && 'Reset your password'}
        </Title>
        <Text type="secondary" className="text-center text-sm">
          {mode === 'signin' && 'Sign in to manage your rides and route matches.'}
          {mode === 'signup' && 'Join Riding My Way and start sharing your commute.'}
          {mode === 'forgot' && "Enter your email and we'll send you a reset link."}
        </Text>
      </div>

      {/* Alerts */}
      {error && (
        <Alert message={error} type="error" showIcon closable className="mb-5" onClose={() => setError(null)} />
      )}
      {successMsg && (
        <Alert message={successMsg} type="success" showIcon closable className="mb-5" onClose={() => setSuccessMsg(null)} />
      )}

      {/* ── Sign In Form ── */}
      {mode === 'signin' && (
        <Form layout="vertical" requiredMark={false} onFinish={handleSignIn}>
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

          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() => resetState('forgot')}
              className="cursor-pointer border-none bg-transparent p-0 text-sm text-sky-600 hover:text-sky-700
                dark:text-sky-400 dark:hover:text-sky-300"
            >
              Forgot password?
            </button>
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
      )}

      {/* ── Sign Up Form ── */}
      {mode === 'signup' && (
        <Form layout="vertical" requiredMark={false} onFinish={handleSignUp}>
          <Form.Item
            label={<Text strong>First name</Text>}
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="Jane"
              className="rounded-lg"
            />
          </Form.Item>

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
            rules={[{ required: true, message: 'Please enter a password' }, { min: 8, message: 'At least 8 characters' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Create a password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Confirm password</Text>}
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Repeat your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-4 mt-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="h-11 rounded-lg text-base font-semibold shadow-sm"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* ── Forgot Password Form ── */}
      {mode === 'forgot' && (
        <Form layout="vertical" requiredMark={false} onFinish={handleForgotPassword}>
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

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="h-11 rounded-lg text-base font-semibold shadow-sm"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* ── Footer links ── */}
      <Divider className="my-4" />

      {mode === 'signin' && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => resetState('signup')}
            className="cursor-pointer border-none bg-transparent p-0 font-semibold text-sky-600
              hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Sign up
          </button>
        </p>
      )}

      {(mode === 'signup' || mode === 'forgot') && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => resetState('signin')}
            className="cursor-pointer border-none bg-transparent p-0 font-semibold text-sky-600
              hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Sign in
          </button>
        </p>
      )}
    </div>
  );
};
