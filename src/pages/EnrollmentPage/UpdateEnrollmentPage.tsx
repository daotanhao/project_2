import { Button, Form, Input, Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { Enrollment } from '../../types/AppType';

const UpdateEnrollmentPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataEnrollment, setDataEnrollment] = useState<Enrollment>();

  const loadDataEnrollment = () => {
    request(`/enroll/get/${id}`)
      .then((res) => {
        setDataEnrollment(res.data);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data enrollment failed',
          description: err.message,
        });
      });
  };
  useEffect(() => {
    loadDataEnrollment();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataEnrollment);
  }, [dataEnrollment]);

  const onFinish = (values: any) => {
    request(`/enroll/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataEnrollment();
        return notification.success({
          message: 'Update enrollment successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update enrollment failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Enrollment title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Enrollment content" name="content">
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

export default UpdateEnrollmentPage;
