import React, { useEffect, useState } from 'react';
import { Enrollment } from '../../types/AppType';
import { useNavigate } from 'react-router-dom';
import { useRequestWithState } from '../../hooks/useRequest';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Layout,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import InfoCard from '../../components/InfoCard';
import {
  PlusOutlined,
  UserOutlined,
  AntDesignOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import SVGIcon from '../../components/SVGIcon';

const ListEnrollmentPage = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequestWithState();
  const [dataEnrollment, setDataEnrollment] = useState<Enrollment[]>([]);

  const loadData = async () => {
    await request('/enroll')
      .then((res) => setDataEnrollment(res?.data))
      .catch((err) =>
        notification.error({
          message: 'Load enrollment failed',
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteEnrollment = (enrollment: Enrollment) => {
    Modal.confirm({
      title: `Do you want to delete ${enrollment.title}?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        request(`/enroll/delete/${enrollment._id}`, { method: 'DELETE' })
          .then((res) => {
            loadData();
            return notification.success({
              message: 'Delete enrollment successfully',
            });
          })
          .catch((err) => {
            return notification.error({
              message: 'Delete enrollment failed',
              description: err.message,
            });
          });
      },
    });
  };

  const renderListEnrollment = () => {
    if (loading) {
      return <Card style={{ width: 300 }} loading={loading} />;
    } else if (dataEnrollment.length === 0) {
      return <Empty description="No enrollment found" />;
    } else {
      return (
        <Space wrap size={[20, 20]}>
          {dataEnrollment.map((enrollment) => {
            return (
              <InfoCard
                loading={loading}
                title={
                  <Typography.Text ellipsis>{enrollment.title}</Typography.Text>
                }
                bodyStyle={{ padding: 0 }}
              >
                <Typography.Paragraph
                  style={{ margin: 24, height: 68 }}
                  ellipsis={{ rows: 3 }}
                >
                  {enrollment.content}
                </Typography.Paragraph>
                <Divider style={{ marginBottom: 12 }} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 24px 0 24px',
                  }}
                >
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: '#0077e2',
                      backgroundColor: '#e6f7ff',
                      border: 0,
                    }}
                    size="small"
                  >
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                    <Avatar style={{ backgroundColor: '#0077e2' }}>K</Avatar>
                    <Tooltip title="Ant User" placement="bottom">
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{ backgroundColor: '#1677ff' }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Tooltip title="Edit" placement="bottom">
                      <div>
                        <SVGIcon
                          onClick={() =>
                            navigate(`/enrollment/${enrollment._id}`)
                          }
                          style={{ cursor: 'pointer' }}
                          component={EditIcon}
                        />
                      </div>
                    </Tooltip>

                    <Tooltip title="Delete" placement="bottom">
                      <div style={{ marginLeft: 12 }}>
                        <SVGIcon
                          onClick={() => handleDeleteEnrollment(enrollment)}
                          style={{ cursor: 'pointer' }}
                          component={DeleteIcon}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </InfoCard>
            );
          })}
        </Space>
      );
    }
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
            Enrollment
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Display all enrollment of the training program
          </Typography.Paragraph>
        </div>
        <Button
          onClick={() => navigate('/enrollment/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create
        </Button>
      </div>
      <div>{renderListEnrollment()}</div>
    </Layout>
  );
};

export default ListEnrollmentPage;
