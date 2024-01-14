import { Menu, Image, Typography, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import SVGIcon from '../../components/SVGIcon';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as OverviewIcon } from '../../assets/icons/overview.svg';
import { ReactComponent as AngleDoubleLeft } from '../../assets/icons/angle-double-left.svg';
import { ReactComponent as AngleDoubleRight } from '../../assets/icons/angle-double-right.svg';
import { ReactComponent as EnrollmentIcon } from '../../assets/icons/enrollment.svg';
import { ReactComponent as RegulationIcon } from '../../assets/icons/regulation.svg';
import { ReactComponent as RefDocIcon } from '../../assets/icons/refDoc.svg';
import { ReactComponent as GeneralKnowledgeIcon } from '../../assets/icons/knowledge.svg';
import { ReactComponent as GraduationConditionIcon } from '../../assets/icons/graduation.svg';
import { ReactComponent as OutputTypeIcon } from '../../assets/icons/type.svg';
import { ReactComponent as OutputStandardIcon } from '../../assets/icons/standard.svg';
import { ReactComponent as ClassificationScaleIcon } from '../../assets/icons/classify.svg';
import { ReactComponent as SubjectCombinationIcon } from '../../assets/icons/subjectCombination.svg';
import { ReactComponent as SubjectDetailsIcon } from '../../assets/icons/subjectDetail.svg';
import { FilePdfOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'collapse') {
      setCollapsed(!collapsed);
    } else if (e.key === 'home') {
      navigate('/');
      setCurrent('home');
    } else {
      navigate(`/${e.key}`);
      setCurrent(e.key);
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
      label: 'Enrollment',
      key: 'enrollment',
      icon: <SVGIcon component={EnrollmentIcon} />,
    },
    {
      label: 'Regulation',
      key: 'regulation',
      icon: <SVGIcon component={RegulationIcon} />,
    },
    {
      label: 'Ref Documents',
      key: 'refDoc',
      icon: <SVGIcon component={RefDocIcon} />,
    },
    {
      label: 'Graduation Condition',
      key: 'graduationCondition',
      icon: <SVGIcon component={GraduationConditionIcon} />,
    },
    {
      label: 'Output Standard',
      key: 'outputStandard',
      icon: <SVGIcon component={OutputStandardIcon} />,
    },
    {
      label: 'Classification Scale',
      key: 'classificationScale',
      icon: <SVGIcon component={ClassificationScaleIcon} />,
    },
    {
      label: 'Subject Combination',
      key: 'subjectCombination',
      icon: <SVGIcon component={SubjectCombinationIcon} />,
    },
    // {
    //   label: 'Subject Details',
    //   key: 'subjectDetails',
    //   icon: <SVGIcon component={GeneralKnowledgeIcon} />,
    // },
    {
      label: 'Export',
      key: 'export',
      icon: <FilePdfOutlined />,
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
        // background: 'transparent',
        display: 'flex',
        flexDirection: 'row-reverse',
        // width: '90%',
        // top: '85%',
        // position: 'absolute',
      },
    },
  ];

  useEffect(() => {
    const regex = /\/([^/]+)/;
    const match = location.pathname.match(regex);
    if (match) {
      setCurrent(match[1]);
    } else {
      setCurrent('home');
    }
  }, [location]);

  return (
    <Sider
      collapsed={collapsed}
      width={'205'}
      // style={{
      //   borderRight: '0.5px solid #DBDBDB',
      //   overflow: 'scroll',
      //   height: 'auto',
      // }}
      // width="10%"
      style={{
        overflow: 'auto',
        height: window.innerHeight - 64,
        // position: 'fixed',
        left: 0,
        borderRight: '0.5px solid #DBDBDB',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[current]}
        style={{ height: 'auto', paddingTop: 20, borderRight: 0 }}
        onClick={onMenuClick}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
