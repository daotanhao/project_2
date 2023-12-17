import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { OutputStandard } from '../../types/AppType';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const UpdateOutputStandardPage = () => {
  const { request } = useRequestWithState();
  const [listDataOutputType, setListDataOutputType] = useState<any[]>([]);

  const loadDataOutputType = () => {
    request('/outputType')
      .then((res) => {
        const dataOutputType = res?.data || [];
        const mappedDataOutputType = dataOutputType.map((item: any) => ({
          label: item.title,
          value: item._id,
        }));
        setListDataOutputType(mappedDataOutputType);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataOutputType();
  }, []);

  return (
    <UpdateEntityTemplate
      entityName="Output standard"
      entityRequestUrl="outputStandard"
      entityRouterUrl="outputStandard"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Output standard title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Output standard content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'idOutputType',
          name: ['idOutputType', 'title'],
          label: 'Output type',
          rules: [{ required: true }],
          component: <Select options={listDataOutputType} />,
        },
      ]}
    />
  );
};

export default UpdateOutputStandardPage;
