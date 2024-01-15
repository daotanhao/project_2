import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateGraduationConditionPage = () => {
  return (
    <UpdateEntityTemplate
      entityName="Graduation condition"
      entityRequestUrl="graduationCondition"
      entityRouterUrl="graduationCondition"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Graduation condition name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Graduation condition content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default UpdateGraduationConditionPage;
