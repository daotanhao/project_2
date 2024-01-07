import React, { useEffect, useState } from 'react';
import { Button, Form, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useParams } from 'react-router-dom';
import { FormItemProps, Rule } from 'antd/es/form';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

interface Field {
  key?: React.Key | null | undefined;
  name: any;
  label: React.ReactNode;
  rules?: Rule[];
  component: FormItemProps['children'];
}

type UpdateEntityTemplateProps = {
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

const UpdateEntityTemplate = (props: UpdateEntityTemplateProps) => {
  const { request, loading } = useRequestWithState();
  const { user } = useAuth();
  const { id } = useParams();
  const { setPathname } = useBreadcrumbs();
  const location = useLocation();
  const [form] = Form.useForm();
  const [dataEntity, setDataEntity] = useState<any>();

  const loadDataEntity = () => {
    request(`/${props.entityRequestUrl}/get/${id}`)
      .then((res) => {
        setDataEntity(res.data);
        setPathname(location.pathname, `Update ${res.data.title}`);
      })
      .catch((err) => {
        return notification.error({
          message: 'Load data overview failed',
          description: err.message,
        });
      });
  };

  const onFinish = (values: any) => {
    console.log('update form values', values);
    request(`/${props.entityRequestUrl}/${id}`, {
      method: 'PUT',
      data: { ...values, idUserLatestEdit: user?._id },
    })
      .then((res) => {
        loadDataEntity();
        return notification.success({
          message: `Update ${props.entityName} successfully`,
        });
      })
      .catch((err) => {
        return notification.error({
          message: `Update ${props.entityName} failed`,
          description: err.message,
        });
      });
  };

  useEffect(() => {
    loadDataEntity();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataEntity);
  }, [dataEntity]);

  return (
    <Form
      {...layout}
      form={form}
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      {props.fields.map((field) => (
        <Form.Item
          key={field.key}
          name={field.name}
          label={field.label}
          rules={field.rules}
          children={field.component}
        />
      ))}
      <Form.Item
        style={{ display: 'flex', justifyContent: 'flex-end', width: '80%' }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateEntityTemplate;
