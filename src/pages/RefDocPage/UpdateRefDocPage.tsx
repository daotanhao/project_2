import { Input, Select } from 'antd';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateRefDocPage = () => {
  return (
    <UpdateEntityTemplate
      entityName="Reference document"
      entityRequestUrl="referenceDoc"
      entityRouterUrl="refDoc"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Reference document title',
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

export default UpdateRefDocPage;
