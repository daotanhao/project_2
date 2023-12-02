import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: window.innerHeight,
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => navigate('/')} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
