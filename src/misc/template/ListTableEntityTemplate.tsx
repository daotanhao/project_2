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
import { useEffect, useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useRequestWithState } from '../../hooks/useRequest';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { DataIndex } from 'rc-table/lib/interface';

interface Columns {
  title: string;
  dataIndex?: DataIndex;
  key: string;
  width?: number;
  render?: (text: any) => JSX.Element;
}

type ListEntityTemplateProps = {
  entityName: string;
  entityRequestUrl: string;
  entityRouterUrl: string;
  columns: Columns[];
};

const ListTableEntityTemplate = (props: ListEntityTemplateProps) => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataEntity, setDataEntity] = useState<any[]>([]);

  const loadData = async () => {
    await request(`/${props.entityRequestUrl}`)
      .then((res) => setDataEntity(res?.data))
      .catch((err) =>
        notification.error({
          message: `Load ${props.entityName} failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<any> = [
    ...props.columns,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Link to={`/${props.entityRouterUrl}/${record._id}`} title="Edit">
            <Button
              type="text"
              shape="circle"
              icon={<SVGIcon component={EditIcon} />}
            />
          </Link>
          <Button
            onClick={() => handleDeleteEntity(record)}
            type="text"
            title="Delete"
            shape="circle"
            icon={<SVGIcon component={DeleteIcon} />}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteEntity = (data: any) => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'You will not be able to recover this item',
      onOk() {
        if (!data) return;
        const { _id } = data;
        request(`/${props.entityRequestUrl}/delete/${_id}`, {
          method: 'DELETE',
        })
          .then(() => {
            loadData();
            return notification.success({
              message: `Delete ${props.entityName} successfully`,
            });
          })
          .catch((err) => {
            return notification.error({
              message: `Delete ${props.entityName} failed`,
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
            {props.entityName}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all {props.entityName} of the training program
          </Typography.Paragraph>
        </div>
        <Button
          onClick={() => navigate(`/${props.entityRouterUrl}/create`)}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create
        </Button>
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

export default ListTableEntityTemplate;
