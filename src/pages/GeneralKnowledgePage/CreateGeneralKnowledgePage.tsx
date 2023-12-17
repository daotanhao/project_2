import { Input } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateGeneralKnowledgePage = () => {
  return (
    <CreateEntityTemplate
      entityName="General Knowledge"
      entityRequestUrl="generalKnowledge"
      entityRouterUrl="generalKnowledge"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'General knowledge title',
          rules: [{ required: true }],
          component: <Input />,
        },
      ]}
    />
  );
};

export default CreateGeneralKnowledgePage;
