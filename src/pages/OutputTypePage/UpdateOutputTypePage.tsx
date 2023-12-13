import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { OutputType } from '../../types/AppType';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const UpdateOutputTypePage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataOutputType, setDataOutputType] = useState<OutputType>();

  const loadDataOutputType = () => {
    request(`/outputType/get/${id}`)
      .then((res) => {
        setDataOutputType(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data output type failed',
          description: err.message,
        });
      });
  };

  const onFinish = (values: any) => {
    request(`/outputType/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataOutputType();
        return notification.success({
          message: 'Update output type successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update output type failed',
          description: err.message,
        });
      });
  };

  useEffect(() => {
    loadDataOutputType();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataOutputType);
  }, [dataOutputType]);

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item
        name="title"
        label="Output type name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOutputTypePage;
