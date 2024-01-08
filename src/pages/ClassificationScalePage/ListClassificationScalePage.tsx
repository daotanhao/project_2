import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListClassificationScalePage = () => {
  const renderOutputType = (type: string) => {
    switch (type) {
      case 'skill':
        return 'Kỹ năng';
      case 'awareness':
        return 'Nhận thức';
      case 'attitude':
        return 'Thái độ';
      default:
        return 'Unknown';
    }
  };
  return (
    <ListTableEntityTemplate
      entityName="Classification Scale"
      entityRequestUrl="classifyScale"
      entityRouterUrl="classificationScale"
      columns={[
        {
          title: 'Level code',
          dataIndex: 'code',
          key: 'code',
          render: (text: any) => <a>{text}</a>,
        },
        {
          title: 'Level',
          dataIndex: 'level',
          key: 'level',
        },
        {
          title: 'Level name',
          dataIndex: 'nameLevel',
          key: 'nameLevel',
        },
        {
          title: 'Output type',
          dataIndex: 'type',
          key: 'type',
          render: (text: any) => <>{renderOutputType(text)}</>,
        },
      ]}
    />
  );
};

export default ListClassificationScalePage;
