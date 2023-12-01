import { Menu, Image, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as OverviewIcon } from '../../assets/icons/overview.svg';
import { ReactComponent as AngleDoubleLeft } from '../../assets/icons/angle-double-left.svg';
import { ReactComponent as AngleDoubleRight } from '../../assets/icons/angle-double-right.svg';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onMenuClick = (e: any) => {
    console.log('click', e.key);
  };
  return (
    <Sider
      collapsed={collapsed}
      width={200}
      style={{ borderRight: '1px solid #DBDBDB' }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        style={{ height: 'auto', paddingTop: 8 }}
        onClick={onMenuClick}
      >
        <Menu.Item key="0" icon={<SVGIcon component={HomeIcon} />}>
          Home
        </Menu.Item>
        <Menu.Item key="1" icon={<SVGIcon component={OverviewIcon} />}>
          Overview
        </Menu.Item>
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
        <Menu.Item
          style={{
            cursor: 'pointer',
            background: 'transparent',
            marginTop: window.innerHeight * 0.7,
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '90%',
          }}
          onClick={() => setCollapsed(!collapsed)}
          icon={
            <SVGIcon
              style={{ justifyContent: 'flex-end' }}
              component={collapsed ? AngleDoubleRight : AngleDoubleLeft}
            />
          }
        />
      </Menu>
    </Sider>
  );
};

export default Sidebar;
