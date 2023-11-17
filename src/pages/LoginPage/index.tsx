import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Layout } from 'antd';
import './login.css';
import axios from 'axios';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    login(values.email, values.password);
  };

  return (
    <Layout className="container">
      <Card className="login-card">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Login;
