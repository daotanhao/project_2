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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const InputDocument = () => {
  const { request } = useRequestWithState();
  const [entityData, setEntityData] = useState<EntityData>({});
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  const { user, getMe } = useAuth();

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
    const formPDF = localStorage.getItem('formPDF');
    if (formPDF) {
      form.setFieldsValue(JSON.parse(formPDF));
    }
  });

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    localStorage.setItem('formPDF', JSON.stringify(values));
    // request(`/user/${user._id}`, {
    //   method: 'PUT',
    //   data: { pdfData: values, idUserLatestEdit: user?._id },
    // })
    //   .then((res) => {
    //     getMe();
    //     return notification.success({
    //       message: 'Update user data successfully',
    //     });
    //   })
    //   .catch((err) => {
    //     return notification.error({
    //       message: 'Update user data failed',
    //       description: err.message,
    //     });
    //   });
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
          overflowY: 'scroll',
          height: window.innerHeight * 0.8,
          paddingRight: 8,
        }}
      >
        <Title level={5}>1. Giới thiệu chung</Title>
        <Form.Item name="overview">
          <Select
            placeholder="Select overview"
            options={dataEntity('overview')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>2. Đối tượng tuyển sinh</Title>
        <Form.Item name="enroll">
          <Select
            placeholder="Select enrollment"
            options={dataEntity('enroll')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>3. Quy chế đào tạo</Title>
        <Form.Item name="trainingReg">
          <Select
            placeholder="Select regulation"
            options={dataEntity('trainingReg')}
            allowClear
          />
        </Form.Item>

        <Title level={5}>4. Chuẩn đầu ra</Title>
        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Về nhận thức:</Text>
        </div>
        <FormList name={['outputType', 'awareness']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('outputStandard')}
            style={{ width: '92%' }}
          />
        </FormList>

        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Về kỹ năng:</Text>
        </div>
        <FormList name={['outputType', 'skill']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('outputStandard')}
            style={{ width: '92%' }}
          />
        </FormList>

        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Về thái độ:</Text>
        </div>
        <FormList name={['outputType', 'attitude']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('outputStandard')}
            style={{ width: '92%' }}
          />
        </FormList>

        <Title level={5}>5. Thang phân loại kiến thức, kỹ năng, thái độ</Title>
        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Thang phân loại về "Nhận thức":</Text>
        </div>
        <FormList name={['classifyScale', 'awareness']}>
          <Select
            placeholder="Select output standard"
            style={{ width: '92%' }}
          />
        </FormList>

        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Thang phân loại về "Kỹ năng":</Text>
        </div>
        <FormList name={['classifyScale', 'skill']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('classifyScale')}
            style={{ width: '92%' }}
          />
        </FormList>

        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Thang phân loại về "Thái độ":</Text>
        </div>
        <FormList name={['classifyScale', 'attitude']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('classifyScale')}
            style={{ width: '92%' }}
            key={1}
          />
        </FormList>

        <Title level={5}>6. Chương trình đào tạo</Title>

        <Form.Item
          name="image"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            name="image"
            beforeUpload={beforeUploadImage}
            listType="picture"
          >
            <Button>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        {/* <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; 6.1 Tỷ lệ các khối kiến thức:</Text>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Khối kiến thức giáo dục đại cương:</Text>
        </div>
        <FormList name={['subjectCombination', 'general']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('subjectCombination')}
            style={{ width: '92%' }}
            key={1}
          />
        </FormList>
        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Khối kiến thức giáo dục chuyên nghiệp:</Text>
        </div>
        <FormList name={['subjectCombination', 'professional']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('subjectCombination')}
            style={{ width: '92%' }}
            key={1}
          />
        </FormList>
        <div style={{ marginBottom: 12 }}>
          <Text strong>&emsp; - Tốt nghiệp:</Text>
        </div>
        <FormList name={['subjectCombination', 'graduate']}>
          <Select
            placeholder="Select output standard"
            options={dataEntity('subjectCombination')}
            style={{ width: '92%' }}
            key={1}
          />
        </FormList> */}
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputDocument;
