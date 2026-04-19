import React from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useSignUp } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const onFinish = async (values: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      const { confirmPassword: _confirmPassword, ...signUpData } = values;
      await signUpMutation.mutateAsync(signUpData);
      message.success('Sign up successful');
      onSuccess?.();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      message.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto" title="Create Account" bordered={false}>
      <Spin spinning={signUpMutation.isPending}>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^[0-9\-+()\s]{10,}$/, message: 'Invalid phone number' },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Create a password" size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={signUpMutation.isPending}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};
