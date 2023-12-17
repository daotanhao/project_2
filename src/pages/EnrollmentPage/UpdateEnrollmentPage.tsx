import { Input } from 'antd';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';

const UpdateEnrollmentPage = () => {
  return (
    <UpdateEntityTemplate
      entityName="Enrollment"
      entityRequestUrl="enroll"
      entityRouterUrl="enrollment"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Enrollment title',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'content',
          name: 'content',
          label: 'Enrollment content',
          rules: [{ required: true }],
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default UpdateEnrollmentPage;
