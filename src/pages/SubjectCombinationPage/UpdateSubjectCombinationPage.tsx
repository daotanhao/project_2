import { useEffect, useState } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { useRequest, useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateSubjectCombinationPage = () => {
  const request = useRequest();
  const [listDataGeneralKnowledge, setListDataGeneralKnowledge] = useState<
    any[]
  >([]);

  const loadDataGeneralKnowledge = () => {
    request('/generalKnowledge')
      .then((res) => {
        const dataGeneralKnowledge = res?.data || [];
        const mappedDataGeneralKnowledge = dataGeneralKnowledge.map(
          (item: any) => ({
            label: item.title,
            value: item._id,
          })
        );
        setListDataGeneralKnowledge(mappedDataGeneralKnowledge);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataGeneralKnowledge();
  }, []);
  return (
    <UpdateEntityTemplate
      entityName="Subject combination"
      entityRequestUrl="subjectCombination"
      entityRouterUrl="subjectCombination"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'totalCredits',
          name: 'totalCredits',
          label: 'Total credits',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'percents',
          name: 'percents',
          label: 'Percent',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'idGeneralKnowledge',
          name: ['idGeneralKnowledge', '_id'],
          label: 'Output type',
          rules: [{ required: true }],
          component: <Select options={listDataGeneralKnowledge} />,
        },
      ]}
    />
  );
};

export default UpdateSubjectCombinationPage;
