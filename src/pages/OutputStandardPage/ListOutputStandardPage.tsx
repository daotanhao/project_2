import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListOutputStandardPage = () => {
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
      entityName="Output Standard"
      entityRequestUrl="outputStandard"
      entityRouterUrl="outputStandard"
      columns={[
        {
          title: 'Output standard id',
          dataIndex: 'id',
          key: 'id',
          render: (text: any) => <a>{text}</a>,
        },
        {
          title: 'Output standard',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },

        {
          title: 'From output type',
          dataIndex: 'type',
          key: 'type',
          render: (text: any) => <>{renderOutputType(text)}</>,
        },
      ]}
    />
  );
};

export default ListOutputStandardPage;
