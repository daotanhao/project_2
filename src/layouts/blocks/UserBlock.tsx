import { Avatar, Dropdown, DropdownProps, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as LogOutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as AngleDownIcon } from '../../assets/icons/angle-down.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserBlock = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'logout':
        setOpen(false);
        logout();
        break;
      case 'settings':
        setOpen(false);
        navigate('/settings');
        break;
      default:
        break;
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
      label: 'Settings',
      key: 'settings',
      icon: (
        <SVGIcon
          component={SettingsIcon}
          style={{ marginRight: 10, alignSelf: 'center', display: 'flex' }}
        />
      ),
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
        <Avatar src={user.avatar} />
        <SVGIcon
          component={AngleDownIcon}
          style={{ marginTop: 4, fontSize: 12 }}
        />
      </div>
    </Dropdown>
  );
};

export default UserBlock;
