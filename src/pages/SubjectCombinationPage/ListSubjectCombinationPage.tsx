import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Typography } from 'antd';

const ListSubjectCombinationPage = () => {
  const renderGeneralKnowledge = (type: string) => {
    switch (type) {
      case 'general':
        return 'Khối kiến thức giáo dục đại cương';
      case 'professional':
        return 'Khối kiến thức giáo dục chuyên nghiệp';
      case 'graduate':
        return 'Tốt nghiệp';
      default:
        return 'Unknown';
    }
  };
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
          dataIndex: 'type',
          key: 'type',
          render: (text: any) => <a>{renderGeneralKnowledge(text)}</a>,
        },
      ]}
    />
  );
};

export default ListSubjectCombinationPage;
