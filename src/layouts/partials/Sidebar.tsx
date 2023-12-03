import { Menu, Image, Typography, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as OverviewIcon } from '../../assets/icons/overview.svg';
import { ReactComponent as AngleDoubleLeft } from '../../assets/icons/angle-double-left.svg';
import { ReactComponent as AngleDoubleRight } from '../../assets/icons/angle-double-right.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'collapse') {
      setCollapsed(!collapsed);
    } else if (e.key === 'home') {
      navigate('/');
    } else {
      navigate(`/${e.key}`);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'home',
      icon: <SVGIcon component={HomeIcon} />,
    },
    {
      label: 'Overview',
      key: 'overview',
      icon: <SVGIcon component={OverviewIcon} />,
    },
    {
      key: 'collapse',
      icon: (
        <SVGIcon
          style={{ justifyContent: 'flex-end' }}
          component={collapsed ? AngleDoubleRight : AngleDoubleLeft}
        />
      ),
      style: {
        cursor: 'pointer',
        background: 'transparent',
        marginTop: window.innerHeight * 0.7,
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '90%',
      },
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      width={200}
      style={{ borderRight: '0.5px solid #DBDBDB' }}
    >
      <Menu
        mode="inline"
        // selectedKeys={[current]}
        style={{ height: 'auto', paddingTop: 20, borderRight: 0 }}
        onClick={onMenuClick}
        items={items}
      >
        {/* <Menu.Item key="2" icon={<SVGIcon component={HomeIcon} />}>
          Enrollment
        </Menu.Item>
        <Menu.Item key="3" icon={<SVGIcon component={HomeIcon} />}>
          Training Regulations
        </Menu.Item>
        <Menu.Item key="4" icon={<SVGIcon component={HomeIcon} />}>
          Classification Scale
        </Menu.Item>
        <Menu.Item key="5" icon={<SVGIcon component={HomeIcon} />}>
          Output Standard
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
