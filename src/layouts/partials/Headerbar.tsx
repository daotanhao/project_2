import { Avatar, Button, Menu } from 'antd';
import React from 'react';
import { Header } from 'antd/es/layout/layout';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as LogOutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as AngleDownIcon } from '../../assets/icons/angle-down.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { UserOutlined } from '@ant-design/icons';

const Headerbar = () => {
  return (
    <Header
      style={{
        borderBottom: '1px solid #DBDBDB',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        padding: 30,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            alt="logo"
            src={require('../../assets/images/logo.png')}
            style={{ width: 24, marginRight: 12 }}
          />
          <span style={{ fontWeight: 'bold' }}>
            Training Program Management
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SVGIcon
          component={NotificationIcon}
          style={{ marginRight: 20, fontSize: 20, cursor: 'pointer' }}
        />
        <div
          style={{
            width: 52,
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            cursor: 'pointer',
          }}
        >
          <Avatar icon={<UserOutlined />} />
          <SVGIcon
            component={AngleDownIcon}
            style={{ marginTop: 4, fontSize: 12 }}
          />
        </div>
      </div>
    </Header>
  );
};

export default Headerbar;
