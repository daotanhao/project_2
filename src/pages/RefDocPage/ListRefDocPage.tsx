import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListRefDocPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Reference Document"
      entityRequestUrl="referenceDoc"
      entityRouterUrl="refDoc"
      columns={[
        {
          title: 'Reference document',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListRefDocPage;
