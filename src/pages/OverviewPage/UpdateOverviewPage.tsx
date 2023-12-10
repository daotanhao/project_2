import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
} from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Overview } from '../../types/overview';
import { useForm } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

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

const UpdateOverviewPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataOverview, setDataOverview] = useState<Overview>();

  const loadDataOverview = () => {
    request(`/overview/get/${id}`)
      .then((res) => {
        setDataOverview(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data overview failed',
          description: err.message,
        });
      });
  };

  const onFinish = (values: any) => {
    request(`/overview/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataOverview();
        return notification.success({
          message: 'Update overview successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update overview failed',
          description: err.message,
        });
      });
  };

  useEffect(() => {
    loadDataOverview();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataOverview);
  }, [dataOverview]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      name="overview-form"
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
        rules={[{ required: true, type: 'date' }]}
      >
        <InputNumber />
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
        <Button loading={loading} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOverviewPage;
