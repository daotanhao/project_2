import { Input } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateGraduationConditionPage = () => {
  return (
    <CreateEntityTemplate
      entityName="Graduation condition"
      entityRequestUrl="graduationCondition"
      entityRouterUrl="graduationCondition"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Graduation condition title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Graduation condition content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default CreateGraduationConditionPage;
