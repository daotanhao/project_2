import React from 'react';
import { Button, Card, Form, Input, Layout, Select } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import '../LoginPage/login.css';

const SignUpPage: React.FC = () => {
  const { signUp, loading } = useAuth();
  const onFinish = (values: any) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (values.email.match(validRegex)) {
      signUp(values);
    }
    console.log('Received values of form: ', values);
  };

  return (
    <Layout className="container">
      <Card className="login-card">
        <Form
          name="normal_login"
          className="signUp-form"
          initialValues={{ role: 'user', gender: 'male' }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              type="email"
              pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your First Name!' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your Last Name!' },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please input your Phone Number!' },
            ]}
          >
            <Input type="number" addonBefore="+84" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Select
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Sign Up
            </Button>
            Or <a href="/login">login now</a>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
