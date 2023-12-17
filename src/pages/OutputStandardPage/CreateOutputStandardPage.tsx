import { Input, Select } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';

const CreateOutputStandardPage = () => {
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
          name: 'idOutputType',
          label: 'Output type',
          rules: [{ required: true }],
          component: <Select options={listDataOutputType} />,
        },
      ]}
    />
  );
};

export default CreateOutputStandardPage;
