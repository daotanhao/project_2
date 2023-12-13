import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { OutputStandard } from '../../types/AppType';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const UpdateOutputStandardPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataOutputStandard, setDataOutputStandard] =
    useState<OutputStandard>();

  const loadDataOutputStandard = () => {
    request(`/outputStandard/get/${id}`)
      .then((res) => {
        setDataOutputStandard(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data overview failed',
          description: err.message,
        });
      });
  };

  const onFinish = (values: any) => {
    request(`/outputStandard/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataOutputStandard();
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
    loadDataOutputStandard();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataOutputStandard);
  }, [dataOutputStandard]);

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item
        name="title"
        label="Output standard name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Output standard content"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="idOverView"
        label="Output type"
        rules={[{ required: true }]}
      >
        <Select />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOutputStandardPage;
