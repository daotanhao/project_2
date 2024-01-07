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
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'English name',
          dataIndex: 'englishTitle',
          key: 'englishTitle',
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
