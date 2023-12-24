import { Input, Select } from 'antd';
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
          key: 'type',
          name: 'type',
          label: 'Reference documents type',
          rules: [{ required: true }],
          component: (
            <Select
              options={[
                { label: 'Domestic', value: 'Domestic' },
                { label: 'Foreign', value: 'Foreign' },
              ]}
            />
          ),
        },
      ]}
    />
  );
};

export default CreateRefDocPage;
