import { Card, CardProps, Row } from 'antd';
import React from 'react';

const InfoCard = (props: CardProps) => {
  return (
    <Card
      title={props.title}
      style={{
        width: 300,
        height: 220,
        boxShadow: '0px 0 4px 0 rgba(0, 0, 0, .1)',
      }}
      actions={props.actions}
      bodyStyle={props.bodyStyle}
    >
      {props.children}
    </Card>
  );
};

export default InfoCard;
