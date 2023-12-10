import { Button, Form, Input, Layout, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateRegulationPage = () => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request('/trainingReg/new', {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate('/regulation');
        return notification.success({
          message: 'Create regulation successfully',
        });
      })
      .catch((err) => {
        return notification.error({
          message: 'Create regulation failed',
          description: err.message,
        });
      });
  };
  return (
    <Layout style={{ width: '80%', marginLeft: '10%' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Regulation title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Regulation content" name="content">
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

export default CreateRegulationPage;
