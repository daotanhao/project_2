import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Layout,
  Select,
  Typography,
  Upload,
  UploadFile,
  message,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import InfoRow from '../../../components/InfoRow';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUploadImage, getBase64Image } from '../../../misc/Utils';
import { useAuth } from '../../../hooks/useAuth';
import { useRequestWithState } from '../../../hooks/useRequest';

const { Title, Paragraph } = Typography;

const Password = () => {
  const [form] = Form.useForm();
  const { user, getMe } = useAuth();
  const { request } = useRequestWithState();

  const onFinish = (values: any) => {
    request(`/user/${user._id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        getMe();
        return notification.success({
          message: 'Update user data successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update user data failed',
          description: err.message,
        });
      });
  };

  const renderTitle = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #DBDBDB',
          width: '100%',
        }}
      >
        <div>
          <Title level={5} style={{ marginTop: 10 }}>
            Change password
          </Title>
          <Paragraph type="secondary">Update your password here.</Paragraph>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button>Cancel</Button>
          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ marginLeft: 10 }}>
              Save
            </Button>
          </Form.Item>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <Form form={form} onFinish={onFinish}>
        <div>{renderTitle()}</div>
        <InfoRow
          title="New password"
          component={
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 kí tự!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          }
        />
        <InfoRow
          title="Confirm new password"
          component={
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          }
        />
      </Form>
    </Layout>
  );
};

export default Password;
