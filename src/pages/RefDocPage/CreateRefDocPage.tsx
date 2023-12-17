import { Input } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateRefDocPage = () => {
  return (
    <CreateEntityTemplate
      entityName="Reference documents"
      entityRequestUrl="referenceDoc"
      entityRouterUrl="refDoc"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Reference documents title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'domesticDocument',
          name: 'domesticDocument',
          label: 'Domestic documents',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'nonDomesticDocument',
          name: 'nonDomesticDocument',
          label: 'Foreign documents',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default CreateRefDocPage;
