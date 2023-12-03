import {
  Button,
  Card,
  Input,
  Layout,
  Typography,
  Upload,
  UploadFile,
  message,
} from 'antd';
import React, { useState } from 'react';
import InfoRow from '../../../components/InfoRow';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const MyDetails = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleUploadChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
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
          <Button type="primary" style={{ marginLeft: 10 }}>
            Save
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <div>{renderTitle()}</div>
      <div>
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
              <Input style={{ width: '48%' }} />
              <Input style={{ width: '48%' }} />
            </div>
          }
        />
        <InfoRow title="Email address" component={<Input />} />
        <InfoRow
          title="Your photo"
          description="This will be displayed on your profile."
          component={
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '85%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          }
        />
      </div>
    </Layout>
  );
};

export default MyDetails;
