import { Header } from 'antd/es/layout/layout';
import NotificationBlock from '../blocks/NotificationBlock';
import UserBlock from '../blocks/UserBlock';
import { Typography } from 'antd';

const HeaderBar = () => {
  return (
    <Header
      style={{
        borderBottom: '1px solid #DBDBDB',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        padding: 28,
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
          style={{ width: 28, marginRight: 12 }}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          Training Program Management
        </Typography.Title>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <NotificationBlock />
        <UserBlock />
      </div>
    </Header>
  );
};

export default HeaderBar;
