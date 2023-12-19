import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateGraduationConditionPage = () => {
  const { request } = useRequestWithState();
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
    <UpdateEntityTemplate
      entityName="Graduation condition"
      entityRequestUrl="graduationCondition"
      entityRouterUrl="graduationCondition"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Graduation condition name',
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
          name: ['idOverView', '_id'],
          label: 'Overview',
          rules: [{ required: true }],
          component: <Select options={listDataOverview} />,
        },
      ]}
    />
  );
};

export default UpdateGraduationConditionPage;
