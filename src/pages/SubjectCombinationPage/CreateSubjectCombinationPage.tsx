import { Input, InputNumber, Select } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';

const CreateSubjectCombinationPage = () => {
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
    <CreateEntityTemplate
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
          key: 'percent',
          name: 'percent',
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

export default CreateSubjectCombinationPage;
