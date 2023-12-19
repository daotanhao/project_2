import { Button, Form, notification } from 'antd';
import React from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormItemProps, Rule } from 'antd/es/form';

interface Field {
  key?: React.Key | null | undefined;
  name: any;
  label: React.ReactNode;
  rules?: Rule[];
  component: FormItemProps['children'];
}

type CreateEntityTemplateProps = {
  entityName: string;
  entityRequestUrl: string;
  entityRouterUrl: string;
  fields: Field[];
};

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

const CreateEntityTemplate = (props: CreateEntityTemplateProps) => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request(`/${props.entityRequestUrl}/new`, {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate(`/${props.entityRouterUrl}`);
        return notification.success({
          message: `Create ${props.entityName} successfully`,
        });
      })
      .catch((err) => {
        return notification.error({
          message: `Create ${props.entityName} failed`,
          description: err.message,
        });
      });
  };
  return (
    <Form {...layout} validateMessages={validateMessages} onFinish={onFinish}>
      {props.fields.map((field) => (
        <Form.Item
          key={field.key}
          name={field.name}
          label={field.label}
          rules={field.rules}
          children={field.component}
        />
      ))}
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEntityTemplate;
