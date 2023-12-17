import { Input } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateOutputTypePage = () => {
  return (
    <CreateEntityTemplate
      entityName="Output type"
      entityRequestUrl="outputType"
      entityRouterUrl="outputType"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Output type title',
          rules: [{ required: true }],
          component: <Input />,
        },
      ]}
    />
  );
};

export default CreateOutputTypePage;
