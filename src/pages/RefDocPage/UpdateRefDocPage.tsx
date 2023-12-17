import { Input } from 'antd';
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
          key: 'domesticContent',
          name: 'domesticContent',
          label: 'Domestic documents',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
        {
          key: 'nonDomesticContent',
          name: 'nonDomesticContent',
          label: 'Foreign documents',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default UpdateRefDocPage;
