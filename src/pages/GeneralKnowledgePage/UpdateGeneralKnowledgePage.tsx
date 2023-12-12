import { Button, Form, Input, Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { GeneralKnowledge } from '../../types/AppType';

const UpdateGeneralKnowledgePage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataGeneralKnowledge, setDataGeneralKnowledge] =
    useState<GeneralKnowledge>();

  const loadDataGeneralKnowledge = () => {
    request(`/generalKnowledge/get/${id}`)
      .then((res) => {
        setDataGeneralKnowledge(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data general knowledge failed',
          description: err.message,
        });
      });
  };
  useEffect(() => {
    loadDataGeneralKnowledge();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataGeneralKnowledge);
  }, [dataGeneralKnowledge]);

  const onFinish = (values: any) => {
    request(`/generalKnowledge/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataGeneralKnowledge();
        return notification.success({
          message: 'Update general knowledge successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update general knowledge failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="General knowledge title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
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

export default UpdateGeneralKnowledgePage;
