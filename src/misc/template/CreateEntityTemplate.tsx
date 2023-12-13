import { Button, Form, notification } from 'antd';
import React, { ReactNode } from 'react';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormItemProps, Rule } from 'antd/es/form';

interface Field extends FormItemProps {
  name: string;
  label: React.ReactNode;
  rules?: Rule[];
  component: FormItemProps['children'];
}

type CreateEntityTemplateProps = {
  fields: Field[];
  entityRequestUrl: string;
  entityRouterUrl: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const CreateEntityTemplate = (props: CreateEntityTemplateProps) => {
  const request = useRequest();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    request(`/entity/${props.entityRequestUrl}/new`, {
      method: 'POST',
      data: { ...values, createdBy: user?._id },
    })
      .then((res) => {
        navigate(`/${props.entityRouterUrl}`);
        notification.success({ message: 'Create entity successfully' });
      })
      .catch((err) => {
        notification.error({
          message: 'Create entity failed',
          description: err.message,
        });
      });
  };
  return (
    <Form {...layout} onFinish={onFinish}>
      {props.fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          children={field.component}
        />
      ))}
      <Button
        type="primary"
        htmlType="submit"
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        Submie
      </Button>
    </Form>
  );
};

export default CreateEntityTemplate;
