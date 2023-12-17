import { Input, Select } from 'antd';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateGraduationConditionPage = () => {
  const request = useRequest();
  const [listDataOverview, setListDataOverview] = useState<any[]>([]);

  const loadDataOverview = () => {
    request('/overview')
      .then((res) => {
        const dataOverview = res?.data || [];
        const mappedDataOverview = dataOverview.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
        setListDataOverview(mappedDataOverview);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataOverview();
  }, []);

  return (
    <CreateEntityTemplate
      entityName="Graduation condition"
      entityRequestUrl="graduationCondition"
      entityRouterUrl="graduationCondition"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Graduation condition title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Graduation condition content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'idOverView',
          name: 'idOverView',
          label: 'Overview',
          rules: [{ required: true }],
          component: <Select options={listDataOverview} />,
        },
      ]}
    />
  );
};

export default CreateGraduationConditionPage;
