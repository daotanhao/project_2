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
import { GeneralKnowledge } from '../../types/generalKnowledge';
import { ExclamationCircleFilled } from '@ant-design/icons';

const ListGeneralKnowledgePage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataGeneralKnowledge, setDataGeneralKnowledge] = useState<
    GeneralKnowledge[]
  >([]);

  const loadData = async () => {
    await request('/generalKnowledge')
      .then((res) => setDataGeneralKnowledge(res?.data))
      .catch((err) =>
        notification.error({
          message: 'Load general knowledge failed',
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<GeneralKnowledge> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Link to={`/generalKnowledge/${record._id}`} title="Edit">
            <Button
              type="text"
              title="Delete"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
          <Button
            onClick={() => handleDeleteGeneralKnowledge(record)}
            type="text"
            title="Delete"
            shape="circle"
            icon={<SVGIcon component={DeleteIcon} />}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteGeneralKnowledge = (data: GeneralKnowledge) => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'You will not be able to recover this item',
      onOk() {
        if (!data) return;
        const { _id } = data;
        request(`/generalKnowledge/delete/${_id}`, {
          method: 'DELETE',
        })
          .then(() => {
            loadData();
            return notification.success({
              message: 'Delete general knowledge successfully',
            });
          })
          .catch((err) => {
            return notification.error({
              message: 'Delete general knowledge failed',
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
            General Knowledge
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all general knowledge of the training program
          </Typography.Paragraph>
        </div>
        <Button
          onClick={() => navigate('/generalKnowledge/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={dataGeneralKnowledge}
        columns={columns}
        style={{ margin: 0 }}
      />
    </Layout>
  );
};

export default ListGeneralKnowledgePage;
