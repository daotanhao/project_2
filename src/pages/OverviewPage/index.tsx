import { Button, Layout, Space, Table, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import React, { useEffect, useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useRequestWithState } from '../../hooks/useRequest';
import { Overview } from '../../types/overview';

const OverviewPage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataOverview, setDataOverview] = useState<Overview[]>([]);

  const loadData = async () => {
    await request('/overview').then((res) => setDataOverview(res?.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<Overview> = [
    {
      title: 'Education name',
      dataIndex: 'eduName',
      key: 'eduName',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Education type',
      dataIndex: 'eduType',
      key: 'eduType',
    },
    {
      title: 'Degree',
      dataIndex: 'degreeTraining',
      key: 'degreeTraining',
    },
    {
      title: 'Major',
      dataIndex: 'majorTraining',
      key: 'majorTraining',
    },
    {
      title: 'Credits',
      dataIndex: ['formOfTraining', 'creditsNumber'],
      key: 'creditsNumber',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Link to={'/'} title="Edit">
            <Button
              onClick={() => handleDeleteOverview(record)}
              type="text"
              title="Delete"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
          <Button
            onClick={() => handleDeleteOverview(record)}
            type="text"
            title="Delete"
            shape="circle"
            icon={<SVGIcon component={DeleteIcon} />}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteOverview = (data: Overview) => {
    if (!data) return;
    const { _id } = data;
    request('/overview/delete', {
      method: 'DELETE',
      data: { eduId: _id },
    }).then(() => loadData());
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
            Overview
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
        dataSource={dataOverview}
        columns={columns}
        style={{ margin: 0 }}
      />
    </Layout>
  );
};

export default OverviewPage;
