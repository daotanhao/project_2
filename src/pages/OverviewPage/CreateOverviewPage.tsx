import { Input, InputNumber, Select } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';

const CreateOverviewPage = () => {
  return (
    <CreateEntityTemplate
      entityName="Overview"
      entityRequestUrl="overview"
      entityRouterUrl="overview"
      fields={[
        {
          key: 'name',
          name: 'name',
          label: 'Education name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'type',
          name: 'type',
          label: 'Education type',
          rules: [{ required: true }],
          component: <Select options={[{ key: 'anc', value: 'abc' }]} />,
        },
        {
          key: 'degree',
          name: 'degree',
          label: 'Training degree',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'major',
          name: 'major',
          label: 'Training major',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'availableYear',
          name: 'availableYear',
          label: 'Available from',
          rules: [{ required: true, type: 'date' }],
          component: <InputNumber />,
        },
        {
          key: 'method',
          name: 'method',
          label: 'Training method',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'credits',
          name: 'credits',
          label: 'Credits required',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'duration',
          name: 'duration',
          label: 'Training duration',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'goals',
          name: 'goals',
          label: 'Training goal',
          component: <Input.TextArea />,
        },
        {
          key: 'prospectAfterGraduation',
          name: 'prospectAfterGraduation',
          label: 'After graduation',
          component: <Input.TextArea />,
        },
        {
          key: 'perspectives',
          name: 'perspectives',
          label: 'Program perspectives',
          component: <Input.TextArea />,
        },
      ]}
    />
  );
};

export default CreateOverviewPage;
