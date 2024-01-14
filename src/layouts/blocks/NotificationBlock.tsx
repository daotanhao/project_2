import { Badge, Typography } from 'antd';
import React from 'react';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { useAuth } from '../../hooks/useAuth';

const NotificationBlock = () => {
  const { user } = useAuth();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: 12,
        alignItems: 'flex-end',
      }}
    >
      <Typography.Text style={{ padding: 0, margin: 0, fontSize: 12 }} strong>
        Hello,
      </Typography.Text>
      <Typography.Text style={{ padding: 0, margin: 0, fontSize: 12 }} strong>
        {user.firstName} {user.lastName}
      </Typography.Text>
    </div>
  );
};

export default NotificationBlock;
