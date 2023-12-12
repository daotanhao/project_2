import { Button, Form, Input, Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { Regulation } from '../../types/AppType';

const UpdateRegulationPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataRegulation, setDataRegulation] = useState<Regulation>();

  const loadDataRegulation = () => {
    request(`/trainingReg/get/${id}`)
      .then((res) => {
        setDataRegulation(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data regulation failed',
          description: err.message,
        });
      });
  };
  useEffect(() => {
    loadDataRegulation();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataRegulation);
  }, [dataRegulation]);

  const onFinish = (values: any) => {
    request(`/trainingReg/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataRegulation();
        return notification.success({
          message: 'Update regulation successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update regulation failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Regulation title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Regulation content" name="content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default UpdateRegulationPage;
