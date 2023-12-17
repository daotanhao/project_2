import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListGraduationConditionPage = () => {
  return (
    <ListTableEntityTemplate
      entityName="Graduation Condition"
      entityRequestUrl="graduationCondition"
      entityRouterUrl="graduationCondition"
      columns={[
        {
          title: 'Graduation condition name',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
        {
          title: 'From overview',
          dataIndex: ['idOverView', 'name'],
          key: 'overviewName',
        },
      ]}
    />
  );
};

export default ListGraduationConditionPage;
