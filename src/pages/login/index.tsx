import React from 'react';
import { Form, Input, Button } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import SignInLayout from '@/layouts/SignInLayout';
import { useLoginService } from './useLoginService';

const LoginPage: React.FC = () => {
  const loginService = useLoginService();

  return (
    <SignInLayout>
      <Form form={loginService.form} onFinish={loginService.handleLogin}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!'
            }
          ]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!'
            }
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Button size="large" loading={loginService.loading} htmlType="submit" type="primary" block>
          登录
        </Button>
      </Form>
    </SignInLayout>
  );
};

export default LoginPage;
