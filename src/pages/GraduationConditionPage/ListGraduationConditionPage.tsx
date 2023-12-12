import {
  Button,
  Layout,
  Modal,
  Space,
  Table,
  Typography,
  notification,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import React, { useEffect, useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useRequestWithState } from '../../hooks/useRequest';
import { GraduationCondition } from '../../types/AppType';
import { ExclamationCircleFilled } from '@ant-design/icons';

const ListGraduationConditionPage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataGraduationCondition, setDataGraduationCondition] = useState<
    GraduationCondition[]
  >([]);
  const [overviewName, setOverviewName] = useState<string>('');

  const loadData = async () => {
    await request('/graduationCondition')
      .then((res) => {
        const data = res?.data || [];
        const mappedData: GraduationCondition[] = data.map(
          (item: GraduationCondition) => {
            request(`/overview/get/${item.idOverView}`).then((res) => {
              const name = res?.data.name || '';
              setOverviewName(name);
            });
            return { ...item, overviewName: overviewName };
          }
        );
        setDataGraduationCondition(mappedData);
      })
      .catch((err) =>
        notification.error({
          message: 'Load overview failed',
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<GraduationCondition> = [
    {
      title: 'Graduation condition name',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'From overview',
      dataIndex: 'overviewName',
      key: 'overviewName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Link to={`/graduationCondition/${record._id}`} title="Edit">
            <Button
              type="text"
              title="Delete"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
          <Button
            onClick={() => handleDeleteGraduationCondition(record)}
            type="text"
            title="Delete"
            shape="circle"
            icon={<SVGIcon component={DeleteIcon} />}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteGraduationCondition = (data: GraduationCondition) => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'You will not be able to recover this item',
      onOk() {
        if (!data) return;
        const { _id } = data;
        request(`/overview/delete/${_id}`, {
          method: 'DELETE',
        })
          .then(() => {
            loadData();
            return notification.success({
              message: 'Delete overview successfully',
            });
          })
          .catch((err) => {
            return notification.error({
              message: 'Delete overview failed',
              description: err.message,
            });
          });
      },
    });
  };

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            GraduationCondition
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all overview of the training program
          </Typography.Paragraph>
        </div>
        <Button
          onClick={() => navigate('/overview/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={dataGraduationCondition}
        columns={columns}
        style={{ margin: 0 }}
      />
    </Layout>
  );
};

export default ListGraduationConditionPage;
