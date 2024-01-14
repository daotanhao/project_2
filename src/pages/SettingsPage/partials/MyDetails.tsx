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

const MyDetails = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { user, getMe } = useAuth();
  const { request } = useRequestWithState();

  const handleUploadChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64Image(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(user);
    setImageUrl(user?.avatar);
  }, []);

  const onFinish = (values: any) => {
    request(`/user/${user._id}`, {
      method: 'PUT',
      data: { ...values, avatar: imageUrl, idUserLatestEdit: user?._id },
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
            Personal Info
          </Title>
          <Paragraph type="secondary">
            Update your photo and personal details here.
          </Paragraph>
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
          title="Name"
          component={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Form.Item name="firstName" style={{ width: '48%' }}>
                <Input />
              </Form.Item>
              <Form.Item name="lastName" style={{ width: '48%' }}>
                <Input />
              </Form.Item>
            </div>
          }
        />
        <InfoRow
          title="Phone number"
          component={
            <Form.Item name="phoneNumber">
              <Input type="tel" />
            </Form.Item>
          }
        />
        <InfoRow
          title="Gender"
          component={
            <Form.Item name="gender">
              <Select
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            </Form.Item>
          }
        />
        <InfoRow
          title="Your photo"
          description="This will be displayed on your profile."
          component={
            <Upload
              listType="picture-card"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUploadImage}
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <img src={imageUrl} style={{ width: '85%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          }
        />
      </Form>
    </Layout>
  );
};

export default MyDetails;
