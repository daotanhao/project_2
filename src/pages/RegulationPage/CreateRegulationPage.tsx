import { Input } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateRegulationPage = () => {
  return (
    <CreateEntityTemplate
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

export default CreateRegulationPage;
