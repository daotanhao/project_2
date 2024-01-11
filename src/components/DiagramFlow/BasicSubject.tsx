import { memo, useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { notification } from 'antd';

function SubjectDetails() {
  const { request, loading } = useRequestWithState();
  const [subjectDetails, setSubjectDetails] = useState<any[]>([]);
  const loadData = async () => {
    await request('/subjectDetails')
      .then((res) => {
        console.log(res.data);
        setSubjectDetails(res?.data);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Lý luận chính trị: 13</span>
      <span>Anh văn: 12</span>
      <span>Toán - Tin học - Khoa học tự nhiên: 12</span>
      {subjectDetails.map((subject: any, index: number) => {
        return (
          <div style={{ marginLeft: 36 }} key={subject.id}>
            <span className="custom-node__label">
              {index + 1}.&emsp; {subject.title}:{' '}
            </span>
            <span style={{ marginLeft: 4 }}>{subject.theoryCredits}</span>
          </div>
        );
      })}
    </div>
  );
}

function BasicSubject({ id, data }: { id: any; data: any }) {
  return (
    <div className="react-flow__node-custom">
      <div className="custom-node__header">
        <strong>{data?.label}</strong>
      </div>
      <div
        className="custom-note__body"
        style={{ padding: '8px 16px 8px 16px' }}
      >
        <SubjectDetails />
      </div>
    </div>
  );
}

export default memo(BasicSubject);
