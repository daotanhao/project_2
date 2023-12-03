import { Badge } from 'antd';
import React from 'react';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';

const NotificationBlock = () => {
  return (
    <Badge dot={true} offset={[-24, 2]}>
      <SVGIcon
        component={NotificationIcon}
        style={{ marginRight: 20, fontSize: 20, cursor: 'pointer' }}
      />
    </Badge>
  );
};

export default NotificationBlock;
