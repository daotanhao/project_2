import {
  Button,
  Form,
  Select,
  Typography,
  Upload,
  UploadProps,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import FormList from '../../components/FormList';
import { beforeUploadImage, getBase64Image } from '../../misc/Utils';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text } = Typography;
interface Item {
  id: number;
  title: string;
}

interface EntityData {
  [key: string]: Item[];
}

const entityList = [
  {
    name: 'overview',
    label: 'Overview',
  },
  {
    name: 'enroll',
    label: 'Enrollment',
  },
  {
    name: 'trainingReg',
    label: 'Regulation',
  },
  {
    name: 'referenceDoc',
    label: 'Reference documents',
  },
  {
    name: 'generalKnowledge',
    label: 'General knowledge',
  },
  {
    name: 'graduationCondition',
    label: 'Graduation condition',
  },
  {
    name: 'outputType',
    label: 'Output type',
  },
  {
    name: 'outputStandard',
    label: 'Output standard',
  },
  {
    name: 'classifyScale',
    label: 'Classification scale',
  },
  {
    name: 'subjectCombination',
    label: 'Subject combination',
  },
  {
    name: 'subjectDetails',
    label: 'Subject details',
  },
];

function transformObject(originalObject: any) {
  const transformedObject: Record<string, any> = {};
  for (const key in originalObject) {
    if (originalObject.hasOwnProperty(key) && originalObject[key]._id) {
      transformedObject[key] = originalObject[key]._id;
    }
  }
  return transformedObject;
}

const InputDocument = () => {
  const { request, loading } = useRequestWithState();
  const [entityData, setEntityData] = useState<EntityData>({});
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  const { user, getMe, pdfData } = useAuth();

  const handleUploadChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64Image(info.file.originFileObj as RcFile, (url) => {
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

  const dataEntity = useCallback(
    (name: string) => {
      return (
        entityData[name]?.map((item: any) => {
          return { label: item.title, value: item._id };
        }) || []
      );
    },
    [entityData]
  );

  useEffect(() => {
    const fetchDataForEntities = async () => {
      const entityDataCopy: EntityData = { ...entityData };

      // Sử dụng Promise.all để đảm bảo rằng tất cả các yêu cầu tải dữ liệu được xử lý trước khi cập nhật state.
      await Promise.all(
        entityList.map(async (entity) => {
          await request(`/${entity.name}`)
            .then((res) => {
              entityDataCopy[entity.name] = res.data;
              return;
            })
            .catch((e) => console.log(e));
        })
      );

      setEntityData(entityDataCopy);
    };

    fetchDataForEntities();
  }, []);

  useEffect(() => {
    setImageUrl(pdfData?.programImage);
  }, [pdfData]);

  useEffect(() => {
    const formPDF = transformObject(pdfData);
    if (formPDF) {
      form.setFieldsValue(formPDF);
    }
  });

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    request(`/user/${user._id}`, {
      method: 'PUT',
      data: { pdfData: { ...values, programImage: imageUrl } },
    })
      .then((res) => {
        getMe();
        return notification.success({
          message: 'Update pdf form data successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Update pdf form data failed',
          description: err.message,
        });
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          width: '95%',
          height: window.innerHeight * 0.8,
          paddingRight: 8,
        }}
      >
        <Title level={5}>Giới thiệu chung</Title>
        <Form.Item name="overview">
          <Select
            placeholder="Select overview"
            options={dataEntity('overview')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>Đối tượng tuyển sinh</Title>
        <Form.Item name="enroll">
          <Select
            placeholder="Select enrollment"
            options={dataEntity('enroll')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>Quy chế đào tạo</Title>
        <Form.Item name="trainingReg">
          <Select
            placeholder="Select regulation"
            options={dataEntity('trainingReg')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>Điều kiện tốt nghiệp</Title>
        <Form.Item name="graduationCondition">
          <Select
            placeholder="Select graduation condition"
            options={dataEntity('graduationCondition')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>Chương trình đào tạo</Title>

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
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputDocument;
