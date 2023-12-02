import { Avatar, Badge, Button, Dropdown, Menu } from 'antd';
import type { DropdownProps, MenuProps } from 'antd';
import React, { useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as LogOutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as AngleDownIcon } from '../../assets/icons/angle-down.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const HeaderBar = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      setOpen(false);
      logout();
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Click',
      key: '1',
    },
    {
      label: 'Click',
      key: '2',
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: (
        <SVGIcon
          component={LogOutIcon}
          style={{ marginRight: 10, alignSelf: 'center', display: 'flex' }}
        />
      ),
    },
  ];

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
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Badge dot={true} offset={[-24, 2]}>
          <SVGIcon
            component={NotificationIcon}
            style={{ marginRight: 20, fontSize: 20, cursor: 'pointer' }}
          />
        </Badge>
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
          }}
          onOpenChange={handleOpenChange}
          open={open}
          align={{ offset: [15, 10] } as DropdownProps['align']}
        >
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
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
