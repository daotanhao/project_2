import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Typography } from 'antd';

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
          title: 'Content',
          dataIndex: 'content',
          key: 'content',
          render: (text: any) => (
            <Typography.Text style={{ width: 300 }} ellipsis>
              {text}
            </Typography.Text>
          ),
        },
      ]}
    />
  );
};

export default ListGraduationConditionPage;
