import { Button, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';

interface Item {
  id: number;
  title: string;
}

interface EntityData {
  [key: string]: Item[];
}

const InputDocument = () => {
  const { request, loading } = useRequestWithState();
  const [entityData, setEntityData] = useState<EntityData>({});
  const [form] = Form.useForm();

  const entityList = [
    {
      name: 'overview',
      label: 'Overview',
    },
    {
      name: 'enroll',
      label: 'Enrollment',
    },
    {
      name: 'trainingReg',
      label: 'Regulation',
    },
    {
      name: 'referenceDoc',
      label: 'Reference documents',
    },
    {
      name: 'generalKnowledge',
      label: 'General knowledge',
    },
    {
      name: 'graduationCondition',
      label: 'Graduation condition',
    },
    {
      name: 'outputType',
      label: 'Output type',
    },
    {
      name: 'outputStandard',
      label: 'Output standard',
    },
    {
      name: 'classifyScale',
      label: 'Classification scale',
    },
    {
      name: 'subjectCombination',
      label: 'Subject combination',
    },
    {
      name: 'subjectDetails',
      label: 'Subject details',
    },
  ];

  useEffect(() => {
    const fetchDataForEntities = async () => {
      const entityDataCopy: EntityData = { ...entityData };

      // Sử dụng Promise.all để đảm bảo rằng tất cả các yêu cầu tải dữ liệu được xử lý trước khi cập nhật state.
      await Promise.all(
        entityList.map(async (entity) => {
          await request(`/${entity.name}`)
            .then((res) => {
              entityDataCopy[entity.name] = res.data;
              return;
            })
            .catch((e) => console.log(e));
        })
      );

      // Cập nhật state với dữ liệu mới
      setEntityData(entityDataCopy);
    };

    fetchDataForEntities();
  }, []); // useEffect sẽ chạy một lần khi component được render.

  console.log('entityData', entityData);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form
        form={form}
        onFinish={(values) => console.log('Form values:', values)}
        style={{ width: '80%' }}
      >
        {entityList.map((entity) => (
          <Form.Item key={entity.name} label={entity.label} name={entity.name}>
            <Select
              placeholder={`Select ${entity.label}`}
              // onChange={value => handleEntityChange(value, entity)}
            >
              {entityData[entity.name]?.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputDocument;
