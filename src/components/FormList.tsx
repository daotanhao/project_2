import { Button, Form } from 'antd';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface FormListProps {
  name: string[];
  children: React.ReactNode;
}

const FormList = (props: FormListProps) => {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              // {...(index === 0
              //   ? formItemLayout
              //   : formItemLayoutWithOutLabel)}
              // label={index === 0 ? 'Passengers' : ''}
              required={false}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                noStyle
                name={field.name}
              >
                {props.children}
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  style={{ marginLeft: '2%' }}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormList;
