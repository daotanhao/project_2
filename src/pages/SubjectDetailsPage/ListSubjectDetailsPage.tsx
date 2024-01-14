import React, { useEffect, useState } from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Typography, notification } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import { useParams, useSearchParams } from 'react-router-dom';

const ListSubjectDetailsPage = () => {
  const { request, loading } = useRequestWithState();
  const [dataSubjectList, setDataSubjectList] = useState<any[]>([]);
  const { id } = useParams();
  const loadData = async () => {
    await request(`/subjectCombination/get/${id}`).then((res) =>
      setDataSubjectList(res?.data.listSubjectDetails)
    );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <ListTableEntityTemplate
      dataSource={dataSubjectList}
      entityRouterUrl="subjectDetails"
      entityName="Subject details"
      columns={[
        {
          title: 'Code',
          dataIndex: 'subjectCode',
          key: 'subjectCode',
          width: 100,
          render: (text: any) => (
            <Typography.Text ellipsis>{text}</Typography.Text>
          ),
        },
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Output standard id',
          dataIndex: ['idOutputStandard', 'id'],
          key: 'outputStandardId',
        },
        {
          title: 'Classification scale code',
          dataIndex: ['idClassificationScale', 'code'],
          key: 'classificationScaleCode',
        },
        {
          title: 'Theory credits',
          dataIndex: 'theoryCredits',
          key: 'theoryCredits',
        },
        {
          title: 'Practise credits',
          dataIndex: 'practiseCredits',
          key: 'practiseCredits',
        },
      ]}
    />
  );
};

export default ListSubjectDetailsPage;
