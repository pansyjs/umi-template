import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useLoginService } from './useLoginService';

const LoginPage: React.FC = () => {
  const loginService = useLoginService();

  return (
    <Card>
      <Form form={loginService.form}>
        <Form.Item name="username">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button loading={loginService.loading} type="primary" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
