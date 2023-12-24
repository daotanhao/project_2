import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListOverviewPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Overview"
      entityRequestUrl="overview"
      entityRouterUrl="overview"
      columns={[
        {
          title: 'Education name',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
        {
          title: 'Education type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Degree',
          dataIndex: 'degree',
          key: 'degree',
        },
        {
          title: 'Major',
          dataIndex: 'major',
          key: 'major',
        },
        {
          title: 'Credits',
          dataIndex: 'credits',
          key: 'credits',
        },
      ]}
    />
  );
};

export default ListOverviewPage;
