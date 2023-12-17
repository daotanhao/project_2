import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListOutputTypePage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Output Type"
      entityRequestUrl="outputType"
      entityRouterUrl="outputType"
      columns={[
        {
          title: 'Output type',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListOutputTypePage;
