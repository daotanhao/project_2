import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

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
          key: 'id',
          name: 'id',
          label: 'Output standard id',
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
          name: ['idOutputType', '_id'],
          label: 'Output type',
          rules: [{ required: true }],
          component: <Select options={listDataOutputType} />,
        },
      ]}
    />
  );
};

export default UpdateOutputStandardPage;
