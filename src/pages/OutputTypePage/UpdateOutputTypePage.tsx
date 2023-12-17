import { Input } from 'antd';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateOutputTypePage = () => {
  return (
    <UpdateEntityTemplate
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

export default UpdateOutputTypePage;
