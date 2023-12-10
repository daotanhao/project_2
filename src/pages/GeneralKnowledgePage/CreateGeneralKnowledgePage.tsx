import { Button, Form, Input, Layout, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateGeneralKnowledgePage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request('/generalKnowledge/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/generalKnowledge');
        return notification.success({
          message: 'Create general knowledge successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create general knowledge failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="General knowledge title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
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

export default CreateGeneralKnowledgePage;
