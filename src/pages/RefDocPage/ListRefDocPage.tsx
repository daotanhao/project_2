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
import { ReferenceDocument } from '../../types/refDoc';
import { ExclamationCircleFilled } from '@ant-design/icons';

const ListRefDocPage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataRefDoc, setDataRefDoc] = useState<ReferenceDocument[]>([]);

  const loadData = async () => {
    await request('/referenceDoc')
      .then((res) => setDataRefDoc(res?.data))
      .catch((err) =>
        notification.error({
          message: 'Load reference document failed',
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<ReferenceDocument> = [
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
          <Link to={`/refDoc/${record._id}`} title="Edit">
            <Button
              type="text"
              title="Delete"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
          <Button
            onClick={() => handleDeleteRefDoc(record)}
            type="text"
            title="Delete"
            shape="circle"
            icon={<SVGIcon component={DeleteIcon} />}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteRefDoc = (data: ReferenceDocument) => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'You will not be able to recover this item',
      onOk() {
        if (!data) return;
        const { _id } = data;
        request(`/referenceDoc/delete/${_id}`, {
          method: 'DELETE',
        })
          .then(() => {
            loadData();
            return notification.success({
              message: 'Delete reference document successfully',
            });
          })
          .catch((err) => {
            return notification.error({
              message: 'Delete reference document failed',
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
            Reference Documents
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all reference documents of the training program
          </Typography.Paragraph>
        </div>
        <Button
          onClick={() => navigate('/refDoc/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={dataRefDoc}
        columns={columns}
        style={{ margin: 0 }}
      />
    </Layout>
  );
};

export default ListRefDocPage;
