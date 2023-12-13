import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CreateGraduationConditionPage = () => {
  const request = useRequest();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listDataOverview, setListDataOverview] = useState([]);

  const loadDataOverview = () => {
    request('/overview')
      .then((res) => {
        const dataOverview = res?.data || [];
        const mappedDataOverview = dataOverview.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
        setListDataOverview(mappedDataOverview);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataOverview();
  }, []);

  const onFinish = (values: any) => {
    request('/graduationCondition/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/graduationCondition');
        return notification.success({
          message: 'Create graduation condition successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create graduation condition failed',
          description: err.message,
        });
      });
  };

  return (
    <Form onFinish={onFinish} validateMessages={validateMessages} {...layout}>
      <Form.Item
        name="title"
        label="Graduation condition name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Graduation condition content"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="idOverView"
        label="Overview"
        rules={[{ required: true }]}
      >
        <Select options={listDataOverview} />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGraduationConditionPage;
