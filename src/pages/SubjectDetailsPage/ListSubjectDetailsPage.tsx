import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Typography } from 'antd';

const ListSubjectDetailsPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Subject Details"
      entityRequestUrl="subjectDetails"
      entityRouterUrl="subjectDetails"
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
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'English name',
          dataIndex: 'englishName',
          key: 'englishName',
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
