import { Input } from 'antd';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateRegulationPage = () => {
  return (
    <UpdateEntityTemplate
      entityName="Regulation"
      entityRequestUrl="trainingReg"
      entityRouterUrl="regulation"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Regulation title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Regulation content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default UpdateRegulationPage;
