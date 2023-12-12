import { Button, Form, Input, Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { ReferenceDocument } from '../../types/AppType';

const UpdateRefDocPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataRefDoc, setDataRefDoc] = useState<ReferenceDocument>();

  const loadDataRefDoc = () => {
    request(`/referenceDoc/get/${id}`)
      .then((res) => {
        setDataRefDoc(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data reference documents failed',
          description: err.message,
        });
      });
  };
  useEffect(() => {
    loadDataRefDoc();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataRefDoc);
  }, [dataRefDoc]);

  const onFinish = (values: any) => {
    request(`/referenceDoc/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataRefDoc();
        return notification.success({
          message: 'Update reference document successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update reference document failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Reference documents title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Domestic documents" name="domesticContent">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Foreign documents" name="nonDomesticContent">
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

export default UpdateRefDocPage;
