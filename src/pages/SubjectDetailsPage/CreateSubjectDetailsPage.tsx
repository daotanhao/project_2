import { Input, InputNumber, Select } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';

const CreateSubjectDetailsPage = () => {
  const request = useRequest();
  const [listDataSubjectCombination, setListDataSubjectCombination] = useState<
    any[]
  >([]);
  const [listDataOutputStandard, setListDataOutputStandard] = useState<any[]>(
    []
  );
  const [listDataClassificationScale, setListDataClassificationScale] =
    useState<any[]>([]);

  const loadDataSubjectCombination = () => {
    request('/subjectCombination')
      .then((res) => {
        const dataSubjectCombination = res?.data || [];
        const mappedDataSubjectCombination = dataSubjectCombination.map(
          (item: any) => ({
            label: item.title,
            value: item._id,
          })
        );
        setListDataSubjectCombination(mappedDataSubjectCombination);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const loadDataOutputStandard = () => {
    request('/outputStandard')
      .then((res) => {
        const dataOutputStandard = res?.data || [];
        const mappedDataOutputStandard = dataOutputStandard.map(
          (item: any) => ({
            label: item.title,
            value: item._id,
          })
        );
        setListDataOutputStandard(mappedDataOutputStandard);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const loadDataClassificationScale = () => {
    request('/classifyScale')
      .then((res) => {
        const dataClassificationScale = res?.data || [];
        const mappedDataClassificationScale = dataClassificationScale.map(
          (item: any) => ({
            label: item.nameLevel,
            value: item._id,
          })
        );
        setListDataClassificationScale(mappedDataClassificationScale);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataSubjectCombination();
    loadDataOutputStandard();
    loadDataClassificationScale();
  }, []);
  return (
    <CreateEntityTemplate
      entityName="Subject detail"
      entityRequestUrl="subjectDetails"
      entityRouterUrl="subjectDetails"
      fields={[
        {
          key: 'name',
          name: 'name',
          label: 'Subject name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'englishName',
          name: 'englishName',
          label: 'Subject english name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'subjectCode',
          name: 'subjectCode',
          label: 'Subject code',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'theoryCredits',
          name: 'theoryCredits',
          label: 'Theory credits',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'practiseCredits',
          name: 'practiseCredits',
          label: 'Practise credits',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'synopsis',
          name: 'synopsis',
          label: 'Synopsis',
          component: <Input.TextArea />,
        },
        {
          key: 'idSubjectCombination',
          name: ['idSubjectCombination', '_id'],
          label: 'Subject combination',
          rules: [{ required: true }],
          component: <Select options={listDataSubjectCombination} />,
        },
        {
          key: 'idOutputStandard',
          name: ['idOutputStandard', '_id'],
          label: 'Output standard',
          rules: [{ required: true }],
          component: <Select options={listDataOutputStandard} />,
        },
        {
          key: 'idClassificationScale',
          name: ['idClassificationScale', '_id'],
          label: 'Classification Scale',
          rules: [{ required: true }],
          component: <Select options={listDataClassificationScale} />,
        },
      ]}
    />
  );
};

export default CreateSubjectDetailsPage;
