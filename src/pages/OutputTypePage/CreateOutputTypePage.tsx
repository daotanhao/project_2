import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const CreateOutputTypePage = () => {
  const request = useRequest();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request('/outputType/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/outputType');
        return notification.success({
          message: 'Create overview successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create overview failed',
          description: err.message,
        });
      });
  };
  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Output type name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOutputTypePage;
