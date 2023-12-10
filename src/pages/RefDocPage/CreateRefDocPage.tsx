import { Button, Form, Input, Layout, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateRefDocPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request('/referenceDoc/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/refDoc');
        return notification.success({
          message: 'Create reference document successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create reference document failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Reference documents title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Domestic documents" name="domesticContent">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Foreign documents" name="nonDomesticContent">
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

export default CreateRefDocPage;
