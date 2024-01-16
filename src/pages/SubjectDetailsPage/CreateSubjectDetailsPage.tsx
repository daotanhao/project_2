import { Button, Form, Input, InputNumber, Select } from 'antd';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const CreateSubjectDetailsPage = () => {
  const request = useRequest();
  const { id } = useParams();
  const [listDataSubjectCombination, setListDataSubjectCombination] = useState<
    any[]
  >([]);
  const [listDataOutputStandard, setListDataOutputStandard] = useState<any[]>(
    []
  );
  const [listDataClassificationScale, setListDataClassificationScale] =
    useState<any[]>([]);

  const loadDataSubjectCombination = () => {
    request('/subjectCombination')
      .then((res) => {
        const dataSubjectCombination = res?.data || [];
        const mappedDataSubjectCombination = dataSubjectCombination.map(
          (item: any) => ({
            label: item.title,
            value: item._id,
          })
        );
        setListDataSubjectCombination(mappedDataSubjectCombination);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const loadDataOutputStandard = () => {
    request('/outputStandard')
      .then((res) => {
        const dataOutputStandard = res?.data || [];
        const mappedDataOutputStandard = dataOutputStandard.map(
          (item: any) => ({
            label: item.id,
            value: item._id,
          })
        );
        setListDataOutputStandard(mappedDataOutputStandard);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const loadDataClassificationScale = () => {
    request('/classifyScale')
      .then((res) => {
        const dataClassificationScale = res?.data || [];
        const mappedDataClassificationScale = dataClassificationScale.map(
          (item: any) => ({
            label: item.code,
            value: item._id,
          })
        );
        setListDataClassificationScale(mappedDataClassificationScale);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadDataSubjectCombination();
    loadDataOutputStandard();
    loadDataClassificationScale();
  }, []);
  return (
    <CreateEntityTemplate
      entityName="Subject detail"
      entityRequestUrl="subjectDetails"
      entityRouterUrl="subjectCombination"
      fields={[
        {
          key: 'title',
          name: 'title',
          label: 'Subject name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'englishTitle',
          name: 'englishTitle',
          label: 'Subject english name',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'subjectCode',
          name: 'subjectCode',
          label: 'Subject code',
          rules: [{ required: true }],
          component: <Input />,
        },
        {
          key: 'theoryCredits',
          name: 'theoryCredits',
          label: 'Theory credits',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'practiseCredits',
          name: 'practiseCredits',
          label: 'Practise credits',
          rules: [{ required: true }],
          component: <InputNumber />,
        },
        {
          key: 'synopsis',
          name: 'synopsis',
          label: 'Synopsis',
          component: <Input.TextArea />,
        },
        {
          key: 'idSubjectCombination',
          name: 'idSubjectCombination',
          label: 'Subject combination',
          initialValue: id,

          component: <Select disabled options={listDataSubjectCombination} />,
        },
        {
          key: 'relationship',
          name: 'relationship',
          label: 'Relationship',
          component: (
            // create a form list with 2 fields: output standard id and classification scale code
            <Form.List name="relationship">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 24 }}
                      required={false}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          noStyle
                          name={[field.name, 'idOutputStandard']}
                        >
                          <Select
                            placeholder="Select output standard"
                            options={listDataOutputStandard}
                          />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          noStyle
                          name={[field.name, 'idClassificationScale']}
                        >
                          <Select
                            placeholder="Select classification scale"
                            options={listDataClassificationScale}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                            style={{ marginLeft: '2%' }}
                          />
                        ) : null}
                      </div>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '100%' }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          ),
        },
      ]}
    />
  );
};

export default CreateSubjectDetailsPage;
