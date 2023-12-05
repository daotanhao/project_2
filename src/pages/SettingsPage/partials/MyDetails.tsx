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
import { beforeUploadImage, getBase64Image } from '../../../utils';

const { Title, Paragraph } = Typography;

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
      getBase64Image(info.file.originFileObj as RcFile, (url) => {
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
              beforeUpload={beforeUploadImage}
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
