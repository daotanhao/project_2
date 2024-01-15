import React from 'react';
import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';
import { Button, Layout, Space, Typography, notification } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import ListSubjectDetailsPage from '../SubjectDetailsPage/ListSubjectDetailsPage';
import Table, { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { useEffect, useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { useRequestWithState } from '../../hooks/useRequest';

const ListSubjectCombinationPage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataEntity, setDataEntity] = useState<any[]>([]);
  const renderGeneralKnowledge = (type: string) => {
    switch (type) {
      case 'general':
        return 'Khối kiến thức giáo dục đại cương';
      case 'professional':
        return 'Khối kiến thức giáo dục chuyên nghiệp';
      case 'graduate':
        return 'Tốt nghiệp';
      default:
        return 'Unknown';
    }
  };

  const loadData = async () => {
    await request('/subjectCombination')
      .then((res) => setDataEntity(res?.data))
      .catch((err) =>
        notification.error({
          message: 'Load subject combination failed',
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (text: any, object: any) => (
        <Link to={`/subjectDetails/list/${object._id}`} replace={true}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Total credits',
      dataIndex: 'totalCredits',
      key: 'totalCredits',
    },
    {
      title: 'Percents',
      dataIndex: 'percents',
      key: 'percents',
    },

    {
      title: 'From general knowledge',
      dataIndex: 'type',
      key: 'type',
      render: (text: any) => <>{renderGeneralKnowledge(text)}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Link to={`/subjectCombination/${record._id}`} title="Edit">
            <Button
              type="text"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
        </Space>
      ),
    },
  ];

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
            Subject combination
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all subject combination of the training program
          </Typography.Paragraph>
        </div>
      </div>
      <Table
        loading={loading}
        dataSource={dataEntity}
        columns={columns}
        style={{ margin: 0 }}
        pagination={{
          pageSize: 5,
        }}
      />
    </Layout>
  );
};

export default ListSubjectCombinationPage;
