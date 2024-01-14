import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Typography,
} from 'antd';
import { useRequest, useRequestWithState } from '../../hooks/useRequest';
import UpdateEntityTemplate from '../../misc/template/UpdateEntityTemplate';
import FormList from 'antd/es/form/FormList';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const data = {
  _id: '659e782e8445146bd7f61875',
  subjectCode: 'SS005',
  title: 'Triết học mác lênin',
  theoryCredits: 2,
  practiseCredits: 0,
  optionCredits: '',
  idSubjectCombination: '659d5f6eb969c9e88ea889e8',
  idOutputStandard: '657966a1b59d9bc820af23f2',
  idClassificationScale: '6581ca8483f47771f660c43c',
  englishTitle: '',
  relationship: [
    {
      idOutputStandard: '657966a1b59d9bc820af23f2',
      idClassificationScale: '6581ca8483f47771f660c43c',
      code: 'L01:N01',
    },
    {
      idOutputStandard: '657d39f1df4e261d5966fcfc',
      idClassificationScale: '6581ca8483f47771f660c43c',
      code: 'L02:N02',
    },
  ],
  synopsis: '',
  idUserLatestEdit: '653f14a44b449936810674fa',
  listIdUserEdited: ['653f14a44b449936810674fa'],
  createdBy: '653f14a44b449936810674fa',
  createdAt: '2024-01-10T10:57:50.987Z',
  updatedAt: '2024-01-10T10:57:50.987Z',
  __v: 0,
};

const UpdateSubjectDetailsPage = () => {
  const request = useRequest();
  const [form] = Form.useForm();
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

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  // const onFinish = (values: any) => {
  //   console.log('update form values', values);
  // };
  return (
    <UpdateEntityTemplate
      entityName="Subject details"
      entityRequestUrl="subjectDetails"
      entityRouterUrl="subjectDetails"
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
          name: ['idSubjectCombination', '_id'],
          label: 'Subject combination',
          rules: [{ required: true }],
          component: (
            <Select
              placeholder="Select subject combination"
              options={listDataSubjectCombination}
            />
          ),
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
    // <Form form={form} onFinish={onFinish}>
    //   <Form.Item key="title" name="title" label="SUbjedct details">
    //     <Input />
    //   </Form.Item>
    //   <Form.Item name="relationship">
    //     <Form.List name="relationship">
    //       {(fields, { add, remove }, { errors }) => (
    //         <>
    //           {fields.map((field, index) => (
    //             <Form.Item
    //               labelCol={{ span: 8 }}
    //               wrapperCol={{ span: 24 }}
    //               required={false}
    //             >
    //               <div
    //                 style={{
    //                   display: 'flex',
    //                   flexDirection: 'row',
    //                 }}
    //               >
    //                 <Form.Item
    //                   {...field}
    //                   validateTrigger={['onChange', 'onBlur']}
    //                   noStyle
    //                   name={[field.name, 'idOutputStandard']}
    //                 >
    //                   <Select
    //                     placeholder="Select output standard"
    //                     options={listDataOutputStandard}
    //                   />
    //                 </Form.Item>
    //                 <Form.Item
    //                   {...field}
    //                   validateTrigger={['onChange', 'onBlur']}
    //                   noStyle
    //                   name={[field.name, 'idClassificationScale']}
    //                 >
    //                   <Select
    //                     placeholder="Select classification scale"
    //                     options={listDataClassificationScale}
    //                   />
    //                 </Form.Item>
    //                 {fields.length > 1 ? (
    //                   <MinusCircleOutlined
    //                     onClick={() => remove(field.name)}
    //                     style={{ marginLeft: '2%' }}
    //                   />
    //                 ) : null}
    //               </div>
    //             </Form.Item>
    //           ))}
    //           <Form.Item>
    //             <Button
    //               type="dashed"
    //               onClick={() => add()}
    //               style={{ width: '100%' }}
    //               icon={<PlusOutlined />}
    //             >
    //               Add field
    //             </Button>
    //           </Form.Item>
    //         </>
    //       )}
    //     </Form.List>
    //   </Form.Item>

    //   <Form.Item
    //     style={{ display: 'flex', justifyContent: 'flex-end', width: '80%' }}
    //   >
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
  );
};

export default UpdateSubjectDetailsPage;
