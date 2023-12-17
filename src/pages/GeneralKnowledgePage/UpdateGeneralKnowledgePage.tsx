import { Input } from 'antd';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateGeneralKnowledgePage = () => {
  return (
    <UpdateEntityTemplate
      entityName="General knowledge"
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

export default UpdateGeneralKnowledgePage;
