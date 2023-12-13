import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const CreateOutputStandardPage = () => {
  const request = useRequest();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request('/outputStandard/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/outputStandard');
        return notification.success({
          message: 'Create output standard successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create output standard failed',
          description: err.message,
        });
      });
  };
  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Output standard name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Output standard content"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="idOverView"
        label="Output type"
        rules={[{ required: true }]}
      >
        <Select />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOutputStandardPage;
