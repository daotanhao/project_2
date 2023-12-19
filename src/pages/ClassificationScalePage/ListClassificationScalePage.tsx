import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListClassificationScalePage = () => {
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
          dataIndex: ['idOutputType', 'title'],
          key: 'outputType',
        },
      ]}
    />
  );
};

export default ListClassificationScalePage;
