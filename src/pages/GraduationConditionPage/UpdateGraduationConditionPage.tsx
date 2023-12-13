import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { GraduationCondition } from '../../types/AppType';

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

const UpdateGraduationConditionPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataGraduationCondition, setDataGraduationCondition] =
    useState<GraduationCondition>();
  const [listDataOverview, setListDataOverview] = useState([]);

  const loadDataGraduationCondition = () => {
    request(`/graduationCondition/get/${id}`)
      .then((res) => {
        setDataGraduationCondition(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data graduation condition failed',
          description: err.message,
        });
      });
  };

  const loadDataOverview = () => {
    request('/overview')
      .then((res) => {
        const dataOverview = res?.data || [];
        const mappedDataOverview = dataOverview.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
        setListDataOverview(mappedDataOverview);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onFinish = (values: any) => {
    request(`/graduationCondition/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataGraduationCondition();
        return notification.success({
          message: 'Update graduation condition successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update graduation condition failed',
          description: err.message,
        });
      });
  };

  useEffect(() => {
    loadDataGraduationCondition();
    loadDataOverview();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataGraduationCondition);
  }, [dataGraduationCondition]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      {...layout}
    >
      <Form.Item
        name="title"
        label="Graduation condition name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Graduation condition content"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="idOverView"
        label="Overview"
        rules={[{ required: true }]}
      >
        <Select options={listDataOverview} />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateGraduationConditionPage;
