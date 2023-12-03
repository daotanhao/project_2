import { Typography } from 'antd';
import React from 'react';

const { Text, Paragraph } = Typography;

interface InfoRowProps {
  title: string;
  description?: string;
  component: React.ReactNode;
}

const InfoRow = (props: InfoRowProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 28,
        paddingBottom: 28,
        borderBottom: '1px solid #DBDBDB',
      }}
    >
      <div style={{ width: '40%', paddingRight: 28 }}>
        <Text>{props.title}</Text>
        <Paragraph type="secondary">{props.description}</Paragraph>
      </div>
      <div style={{ width: '50%' }}>{props.component}</div>
    </div>
  );
};

export default InfoRow;
