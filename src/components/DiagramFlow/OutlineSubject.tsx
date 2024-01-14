import { memo, useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { notification } from 'antd';
import { Handle, Position } from 'reactflow';

function SubjectDetails() {
  const { request, loading } = useRequestWithState();
  const [outlineSubject, setOutlineSubject] = useState<any[]>([]);
  const loadData1 = async () => {
    await request('/subjectCombination/get/659d5f6eb969c9e88ea889e8')
      .then((res) => {
        setOutlineSubject((prevOutlineSubject) => [
          ...prevOutlineSubject,
          ...res?.data.listSubjectDetails,
        ]);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };
  const loadData2 = async () => {
    await request('/subjectCombination/get/659d5f5cb969c9e88ea889de')
      .then((res) => {
        setOutlineSubject((prevOutlineSubject) => [
          ...prevOutlineSubject,
          ...res?.data.listSubjectDetails,
        ]);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };
  const loadData3 = async () => {
    await request('/subjectCombination/get/659d5f65b969c9e88ea889e3')
      .then((res) => {
        setOutlineSubject((prevOutlineSubject) => [
          ...prevOutlineSubject,
          ...res?.data.listSubjectDetails,
        ]);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData1();
    loadData2();
    loadData3();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Lý luận chính trị: 13</span>
      <span>Anh văn: 12</span>
      <span>Toán - Tin học - Khoa học tự nhiên: 12</span>
      {outlineSubject.map((subject: any, index: number) => {
        return (
          <div style={{ marginLeft: 36 }} key={subject.id}>
            <span className="custom-node__label">
              {index + 1}.&nbsp; {subject.title}:{' '}
            </span>
            <span style={{ marginLeft: 4 }}>{subject.theoryCredits}</span>
          </div>
        );
      })}
    </div>
  );
}

function OutlineSubject({ id, data }: { id: any; data: any }) {
  return (
    <>
      <Handle type="source" position={Position.Bottom} />
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
    </>
  );
}

export default memo(OutlineSubject);
