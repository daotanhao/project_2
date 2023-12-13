import React from 'react';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { Input } from 'antd';

const ExportPDFPage = () => {
  return (
    <CreateEntityTemplate
      fields={[{ label: 'abc', name: 'abc', component: <Input /> }]}
      entityRequestUrl="abc"
      entityRouterUrl="abc"
    />
  );
};

export default ExportPDFPage;
