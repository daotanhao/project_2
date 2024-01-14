import React, { useEffect, useState } from 'react';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { Input, InputNumber, Select } from 'antd';
import { useRequest } from '../../hooks/useRequest';

const CreateClassificationScalePage = () => {
  const request = useRequest();
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
    <CreateEntityTemplate
      entityName="Classification Scale"
      entityRequestUrl="classifyScale"
      entityRouterUrl="classificationScale"
      fields={[
        {
          key: 'code',
          name: 'code',
          label: 'Level code',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'title',
          name: 'title',
          label: 'Level name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'level',
          name: 'level',
          label: 'Level',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'discription',
          name: 'discription',
          label: 'Description',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'type',
          name: 'type',
          label: 'Output type',
          rules: [{ required: true }],
          component: (
            <Select
              options={[
                { label: 'Awareness', value: 'awareness' },
                { label: 'Skill', value: 'skill' },
                { label: 'Attitude', value: 'attitude' },
              ]}
            />
          ),
        },
      ]}
    />
  );
};

export default CreateClassificationScalePage;
