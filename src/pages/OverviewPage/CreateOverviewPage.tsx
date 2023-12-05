import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CreateOverviewPage = () => {
  const { request, loading } = useRequestWithState();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      name="overview-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      {...layout}
    >
      <Form.Item
        name="name"
        label="Education name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="type"
        label="Education type"
        rules={[{ required: true }]}
      >
        <Select options={[{ key: 'anc', value: 'abc' }]} />
      </Form.Item>
      <Form.Item
        name="degree"
        label="Training degree"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="major"
        label="Training major"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="availableYear"
        label="Available from"
        rules={[{ required: true }]}
      >
        <DatePicker picker="year" />
      </Form.Item>
      <Form.Item
        name="method"
        label="Training method"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="credits"
        label="Credits required"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Training duration"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="goals" label="Training goal">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="prospectAfterGraduation" label="After graduation">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="perspectives" label="Program perspectives">
        <Input.TextArea />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOverviewPage;
