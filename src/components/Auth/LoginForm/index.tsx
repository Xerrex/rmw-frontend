import React from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values);
      message.success('Login successful');
      onSuccess?.();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      message.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto" title="Sign In" bordered={false}>
      <Spin spinning={loginMutation.isPending}>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loginMutation.isPending}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};
