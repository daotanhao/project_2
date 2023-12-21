import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListOutputStandardPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Output Standard"
      entityRequestUrl="subjectCombination"
      entityRouterUrl="subjectCombination"
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
          dataIndex: ['idOutputType', 'title'],
          key: 'outputType',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListOutputStandardPage;
