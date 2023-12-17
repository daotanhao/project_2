import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListOutputStandardPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Output Standard"
      entityRequestUrl="outputStandard"
      entityRouterUrl="outputStandard"
      columns={[
        {
          title: 'Output standard',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
        {
          title: 'From output type',
          dataIndex: ['idOutputType', 'title'],
          key: 'outputType',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListOutputStandardPage;
