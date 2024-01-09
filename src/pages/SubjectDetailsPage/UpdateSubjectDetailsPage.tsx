import { useEffect, useState } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { useRequest, useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateSubjectDetailsPage = () => {
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
    <UpdateEntityTemplate
      entityName="Subject details"
      entityRequestUrl="subjectDetails"
      entityRouterUrl="subjectDetails"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Subject name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'englishTitle',
          name: 'englishTitle',
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
          label: 'Subject Combination',
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
          label: 'Classification scale',
          rules: [{ required: true }],
          component: <Select options={listDataClassificationScale} />,
        },
      ]}
    />
  );
};

export default UpdateSubjectDetailsPage;
