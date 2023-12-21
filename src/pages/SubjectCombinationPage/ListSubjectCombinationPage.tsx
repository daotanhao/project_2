import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Typography } from 'antd';

const ListSubjectCombinationPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Subject Combination"
      entityRequestUrl="subjectCombination"
      entityRouterUrl="subjectCombination"
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 200,
          render: (text: any) => (
            <Typography.Text ellipsis>{text}</Typography.Text>
          ),
        },
        {
          title: 'Total credits',
          dataIndex: 'totalCredits',
          key: 'totalCredits',
        },
        {
          title: 'Percents',
          dataIndex: 'percents',
          key: 'percents',
        },

        {
          title: 'From general knowledge',
          dataIndex: ['idGeneralKnowledge', 'title'],
          key: 'generalKnowledge',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListSubjectCombinationPage;
